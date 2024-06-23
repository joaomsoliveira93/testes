using Microsoft.UI;
using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media.Animation;
using Microsoft.UI.Xaml.Navigation;
using System.Collections.Generic;
using System;
using System.Runtime.InteropServices;
using Windows.Storage;
using WinRT;
using WinRT.Interop;
using System.Diagnostics;
using Microsoft.UI.Xaml.Media;

namespace WinUI_APP
{
    public sealed partial class MainWindow : Window
    {
        private bool manageUsers = (bool)ApplicationData.Current.LocalSettings.Values["users"];
        private string name = ApplicationData.Current.LocalSettings.Values["name"] as string;
        private string email = ApplicationData.Current.LocalSettings.Values["email"] as string;
        private string profileImage = ApplicationData.Current.LocalSettings.Values["img"] as string;
        private bool isAdmin = (ApplicationData.Current.LocalSettings.Values["tipo"] as string)=="admin" ? true : false;
        private AppWindow m_AppWindow;

        public MainWindow()
        {
            this.InitializeComponent();
            m_AppWindow = GetAppWindowForCurrentWindow();

            if (AppWindowTitleBar.IsCustomizationSupported())
            {
                var titleBar = m_AppWindow.TitleBar;
                titleBar.ExtendsContentIntoTitleBar = true;
                AppTitleBar.Loaded += AppTitleBar_Loaded;
                AppTitleBar.SizeChanged += AppTitleBar_SizeChanged;
            }
            else
            {
                AppTitleBar.Visibility = Visibility.Collapsed;
            }


            TrySetMicaBackdrop();
            sidebar.ItemInvoked += Sidebar_ItemInvoked;

            foreach (var item in sidebar.MenuItems)
            {
                if (item is NavigationViewItem navItem && navItem.Tag as string == "Clientes")
                {
                    sidebar.SelectedItem = navItem;
                    content.Navigate(typeof(Clientes), null, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
                    break;
                }
            }
        }

        private void AppTitleBar_Loaded(object sender, RoutedEventArgs e)
        {
            if (AppWindowTitleBar.IsCustomizationSupported())
            {
                SetDragRegionForCustomTitleBar(m_AppWindow);
            }
        }

        private void AppTitleBar_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            if (AppWindowTitleBar.IsCustomizationSupported()
                && m_AppWindow.TitleBar.ExtendsContentIntoTitleBar)
            {
                SetDragRegionForCustomTitleBar(m_AppWindow);
            }
        }

        private AppWindow GetAppWindowForCurrentWindow()
        {
            IntPtr hWnd = WindowNative.GetWindowHandle(this);
            WindowId wndId = Microsoft.UI.Win32Interop.GetWindowIdFromWindow(hWnd);
            return AppWindow.GetFromWindowId(wndId);
        }

        [DllImport("Shcore.dll", SetLastError = true)]
        internal static extern int GetDpiForMonitor(IntPtr hmonitor, Monitor_DPI_Type dpiType, out uint dpiX, out uint dpiY);

        internal enum Monitor_DPI_Type : int
        {
            MDT_Effective_DPI = 0,
            MDT_Angular_DPI = 1,
            MDT_Raw_DPI = 2,
            MDT_Default = MDT_Effective_DPI
        }

        private double GetScaleAdjustment()
        {
            IntPtr hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this);
            WindowId wndId = Win32Interop.GetWindowIdFromWindow(hWnd);
            DisplayArea displayArea = DisplayArea.GetFromWindowId(wndId, DisplayAreaFallback.Primary);
            IntPtr hMonitor = Win32Interop.GetMonitorFromDisplayId(displayArea.DisplayId);

            int result = GetDpiForMonitor(hMonitor, Monitor_DPI_Type.MDT_Default, out uint dpiX, out uint _);
            if (result != 0)
            {
                throw new Exception("Could not get DPI for monitor.");
            }

            uint scaleFactorPercent = (uint)(((long)dpiX * 100 + (96 >> 1)) / 96);
            return scaleFactorPercent / 100.0;
        }

        private void SetDragRegionForCustomTitleBar(AppWindow appWindow)
        {
            if (AppWindowTitleBar.IsCustomizationSupported()
                && appWindow.TitleBar.ExtendsContentIntoTitleBar)
            {
                double scaleAdjustment = GetScaleAdjustment();

                RightPaddingColumn.Width = new GridLength(appWindow.TitleBar.RightInset / scaleAdjustment);
                LeftPaddingColumn.Width = new GridLength(appWindow.TitleBar.LeftInset / scaleAdjustment);

                List<Windows.Graphics.RectInt32> dragRectsList = new();

                Windows.Graphics.RectInt32 dragRectL;
                dragRectL.X = (int)((LeftPaddingColumn.ActualWidth) * scaleAdjustment);
                dragRectL.Y = 0;
                dragRectL.Height = (int)(AppTitleBar.ActualHeight * scaleAdjustment);
                dragRectL.Width = (int)((IconColumn.ActualWidth + TitleColumn.ActualWidth + LeftDragColumn.ActualWidth) * scaleAdjustment);
                dragRectsList.Add(dragRectL);

                Windows.Graphics.RectInt32 dragRectR;
                dragRectR.X = (int)((LeftPaddingColumn.ActualWidth + IconColumn.ActualWidth + TitleColumn.ActualWidth + LeftDragColumn.ActualWidth + SearchColumn.ActualWidth) * scaleAdjustment);
                
                if (this.AppTitleBar.ActualSize.X < 620)
                {
                    TitleTextBlock.Visibility = Visibility.Collapsed;
                }
                else
                {
                    TitleTextBlock.Visibility = Visibility.Visible;
                }

                dragRectR.Y = 0;
                dragRectR.Height = (int)(AppTitleBar.ActualHeight * scaleAdjustment);
                dragRectR.Width = (int)(RightDragColumn.ActualWidth * scaleAdjustment);
                dragRectsList.Add(dragRectR);

                Windows.Graphics.RectInt32[] dragRects = dragRectsList.ToArray();

                appWindow.TitleBar.SetDragRectangles(dragRects);
            }
        }

        private void NavigationView_BackRequested(NavigationView sender, NavigationViewBackRequestedEventArgs args)
        {
            if (content.CanGoBack)
            {
                content.GoBack();
            }
        }

        private void ContentFrame_Navigated(object sender, NavigationEventArgs e)
        {
            sidebar.IsBackEnabled = content.CanGoBack;
        }

        WindowsSystemDispatcherQueueHelper m_wsdqHelper; 
        Microsoft.UI.Composition.SystemBackdrops.MicaController m_micaController;
        Microsoft.UI.Composition.SystemBackdrops.SystemBackdropConfiguration m_configurationSource;

        bool TrySetMicaBackdrop()
        {
            if (Microsoft.UI.Composition.SystemBackdrops.MicaController.IsSupported())
            {
                m_wsdqHelper = new WindowsSystemDispatcherQueueHelper();
                m_wsdqHelper.EnsureWindowsSystemDispatcherQueueController();

                m_configurationSource = new Microsoft.UI.Composition.SystemBackdrops.SystemBackdropConfiguration();
                this.Activated += Window_Activated;
                this.Closed += Window_Closed;
                ((FrameworkElement)this.Content).ActualThemeChanged += Window_ThemeChanged;

                m_configurationSource.IsInputActive = true;
                SetConfigurationSourceTheme();

                m_micaController = new Microsoft.UI.Composition.SystemBackdrops.MicaController();

                m_micaController.AddSystemBackdropTarget(this.As<Microsoft.UI.Composition.ICompositionSupportsSystemBackdrop>());
                m_micaController.SetSystemBackdropConfiguration(m_configurationSource);
                return true; 
            }

            return false;
        }

        private void Window_Activated(object sender, WindowActivatedEventArgs args)
        {
            m_configurationSource.IsInputActive = args.WindowActivationState != WindowActivationState.Deactivated;
        }

        private void Window_Closed(object sender, WindowEventArgs args)
        {
            if (m_micaController != null)
            {
                m_micaController.Dispose();
                m_micaController = null;
            }
            this.Activated -= Window_Activated;
            m_configurationSource = null;
        }

        private void Window_ThemeChanged(FrameworkElement sender, object args)
        {
            if (m_configurationSource != null)
            {
                SetConfigurationSourceTheme();
            }
        }

        private void SetConfigurationSourceTheme()
        {
            switch (((FrameworkElement)this.Content).ActualTheme)
            {
                case ElementTheme.Dark: m_configurationSource.Theme = Microsoft.UI.Composition.SystemBackdrops.SystemBackdropTheme.Dark; break;
                case ElementTheme.Light: m_configurationSource.Theme = Microsoft.UI.Composition.SystemBackdrops.SystemBackdropTheme.Light; break;
                case ElementTheme.Default: m_configurationSource.Theme = Microsoft.UI.Composition.SystemBackdrops.SystemBackdropTheme.Default; break;
            }
        }

        private void Sidebar_ItemInvoked(NavigationView sender, NavigationViewItemInvokedEventArgs args)
        {
            if (args.IsSettingsInvoked)
            {
                content.Navigate(typeof(Panels.Settings), null, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
            }
            else
            {
                if (args.InvokedItemContainer != null)
                {
                    string tag = args.InvokedItemContainer.Tag.ToString();
                    switch (tag)
                    {
                        case "Clientes":
                            content.Navigate(typeof(Clientes),null, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
                            break;
                        case "Users":
                            content.Navigate(typeof(Panels.Users.Users), null, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
                            break;
                        case "Profile":
                            content.Navigate(typeof(Panels.Profile), null, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
                            break;
                        case "Logout":                            
                            ApplicationData.Current.LocalSettings.Values["userId"] = "";
                            ApplicationData.Current.LocalSettings.Values["username"] = "";
                            ApplicationData.Current.LocalSettings.Values["name"] = "";
                            ApplicationData.Current.LocalSettings.Values["tipo"] = "";
                            ApplicationData.Current.LocalSettings.Values["email"] = "";
                            ApplicationData.Current.LocalSettings.Values["token"] = "";
                            ApplicationData.Current.LocalSettings.Values["tokenValidDate"] = "";
                            ApplicationData.Current.LocalSettings.Values["clients"] = "";
                            ApplicationData.Current.LocalSettings.Values["licences"] = "";
                            ApplicationData.Current.LocalSettings.Values["users"] = "";
                            ApplicationData.Current.LocalSettings.Values["permissions"] = "";
                            ApplicationData.Current.LocalSettings.Values["img"] = "";

                            var Window = new LoginWindow();
                            Window.Activate();
                            this.Close();
                            break;
                    }
                }
            }
        }


        private void LogOutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationData.Current.LocalSettings.Values["userId"] = "";
            ApplicationData.Current.LocalSettings.Values["username"] = "";
            ApplicationData.Current.LocalSettings.Values["name"] = "";
            ApplicationData.Current.LocalSettings.Values["tipo"] = "";
            ApplicationData.Current.LocalSettings.Values["email"] = "";
            ApplicationData.Current.LocalSettings.Values["token"] = "";
            ApplicationData.Current.LocalSettings.Values["tokenValidDate"] = "";
            ApplicationData.Current.LocalSettings.Values["clients"] = "";
            ApplicationData.Current.LocalSettings.Values["licences"] = "";
            ApplicationData.Current.LocalSettings.Values["users"] = "";
            ApplicationData.Current.LocalSettings.Values["permissions"] = "";
            ApplicationData.Current.LocalSettings.Values["img"] = "";

            var Window = new LoginWindow();
            Window.Activate();
            this.Close();
        }
    }

    class WindowsSystemDispatcherQueueHelper
    {
        [StructLayout(LayoutKind.Sequential)]
        struct DispatcherQueueOptions
        {
            internal int dwSize;
            internal int threadType;
            internal int apartmentType;
        }

        [DllImport("CoreMessaging.dll")]
        private static extern int CreateDispatcherQueueController([In] DispatcherQueueOptions options, [In, Out, MarshalAs(UnmanagedType.IUnknown)] ref object dispatcherQueueController);

        object m_dispatcherQueueController = null;
        public void EnsureWindowsSystemDispatcherQueueController()
        {
            if (Windows.System.DispatcherQueue.GetForCurrentThread() != null)
            {
                // one already exists, so we'll just use it.
                return;
            }

            if (m_dispatcherQueueController == null)
            {
                DispatcherQueueOptions options;
                options.dwSize = Marshal.SizeOf(typeof(DispatcherQueueOptions));
                options.threadType = 2;    // DQTYPE_THREAD_CURRENT
                options.apartmentType = 2; // DQTAT_COM_STA

                CreateDispatcherQueueController(options, ref m_dispatcherQueueController);
            }
        }
    }

}
