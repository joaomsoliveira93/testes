using Microsoft.UI.Xaml;
using WinRT;
using System;
using System.Threading.Tasks;
using Windows.Storage;
using System.Security.Cryptography;
using System.Text;
using Microsoft.UI.Xaml.Controls;
using System.Net.Http;
using System.Text.Json;
using System.IO;
using WinUIEx;
using Windows.Storage.Streams;
using System.Diagnostics;

namespace WinUI_APP
{

    public sealed partial class LoginWindow : Window
    {
        string apiServer = Properties.Resources.apiServer;
        public LoginWindow()
        { 
            this.InitializeComponent();
            this.ExtendsContentIntoTitleBar = true;  
            this.SetTitleBar(AppTitleBar);
            TrySetMicaBackdrop();
            IntPtr hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this);
            var windowId = Microsoft.UI.Win32Interop.GetWindowIdFromWindow(hWnd);
            var appWindow = Microsoft.UI.Windowing.AppWindow.GetFromWindowId(windowId);
            appWindow.Resize(new Windows.Graphics.SizeInt32 { Width = 380, Height = 600 });
            WindowManager.Get(this).IsResizable = false;


            if (appWindow is not null)
            {
                Microsoft.UI.Windowing.DisplayArea displayArea = Microsoft.UI.Windowing.DisplayArea.GetFromWindowId(windowId, Microsoft.UI.Windowing.DisplayAreaFallback.Nearest);
                if (displayArea is not null)
                {
                    var CenteredPosition = appWindow.Position;
                    CenteredPosition.X = ((displayArea.WorkArea.Width - appWindow.Size.Width) / 2);
                    CenteredPosition.Y = ((displayArea.WorkArea.Height - appWindow.Size.Height) / 2);
                    appWindow.Move(CenteredPosition);
                }
            }
        }

        private async void OnLoginButtonClick(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text;
            string password = PasswordBox.Password;

            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                await PerformLoginAsync(username, password);
            }
            else
            {
                ShowContentDialog("O Nome de utilizador e a palavra-passe são obrigatórias!");
            }
        }

        private async Task PerformLoginAsync(string username, string password)
        {
            try
            {
                bool loginSuccessful = await AutoLoginAsync(username, password);

                if (loginSuccessful)
                {
                    // Delay opening the new window
                    await Task.Delay(100); // Adjust the delay time as needed
                    OpenMainWindow();
                    CloseCurrentWindow();
                }
                else
                {
                    ShowContentDialog("Credenciais inválidas ou problemas de conexão.");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Ocorreu um erro durante o login: {ex.Message}");
            }
        }

        private async Task<bool> AutoLoginAsync(string username, string password)
        {
            StringBuilder stringBuilder = new StringBuilder();            

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(bytes);

                foreach (byte b in hashBytes)
                {
                    stringBuilder.Append(b.ToString("x2"));
                }
            }

            using (var httpClient = new HttpClient())
            {
                var login = new
                {
                    userName = username,
                    password = stringBuilder.ToString(),
                    token = ApplicationData.Current.LocalSettings.Values["token"] as string,
                };

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                };
                string requestDataJson = JsonSerializer.Serialize(login, options);

                var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await httpClient.PostAsync($"{apiServer}/login", content);
                string responseText = await response.Content.ReadAsStringAsync();
                if (responseText == "null")
                {

                    ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");

                }
                else if (responseText == "NOK")
                {
                   ShowContentDialog("As suas credenciais estão erradas!");

                }
                else if (responseText == "inactive")
                {
                     ShowContentDialog("O seu utilizador não se encontra ativo!");            
                }
                else
                {
                    using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                    {
                        var document = await JsonDocument.ParseAsync(responseStream);
                        var element = document.RootElement;

                        element.TryGetProperty("_id", out var idProperty);
                        ApplicationData.Current.LocalSettings.Values["userId"] = idProperty.GetString();

                        element.TryGetProperty("username", out var usernameProperty);
                        ApplicationData.Current.LocalSettings.Values["username"] = usernameProperty.GetString();

                        element.TryGetProperty("name", out var nameProperty);
                        ApplicationData.Current.LocalSettings.Values["name"] = nameProperty.GetString();

                        element.TryGetProperty("tipo", out var tipoProperty);
                        ApplicationData.Current.LocalSettings.Values["tipo"] = tipoProperty.GetString();

                        element.TryGetProperty("email", out var emailProperty);
                        ApplicationData.Current.LocalSettings.Values["email"] = emailProperty.GetString();

                        element.TryGetProperty("token", out var tokenProperty);
                        ApplicationData.Current.LocalSettings.Values["token"] = tokenProperty.GetString();

                        element.TryGetProperty("tokenValidDate", out var tokenValidDateProperty);
                        ApplicationData.Current.LocalSettings.Values["tokenValidDate"] = tokenValidDateProperty.GetString();

                        element.TryGetProperty("canManageClients", out var clientsProperty);
                        ApplicationData.Current.LocalSettings.Values["clients"] = clientsProperty.GetBoolean();

                        element.TryGetProperty("canManageLicences", out var licencesProperty);
                        ApplicationData.Current.LocalSettings.Values["licences"] = licencesProperty.GetBoolean();

                        element.TryGetProperty("canManageUsers", out var usersProperty);
                        ApplicationData.Current.LocalSettings.Values["users"] = usersProperty.GetBoolean();

                        element.TryGetProperty("canManagePermissions", out var permissionsProperty);
                        ApplicationData.Current.LocalSettings.Values["permissions"] = permissionsProperty.GetBoolean();

                        element.TryGetProperty("img", out var imgProperty);

                        string base64Image = imgProperty.GetString().Split(',')[1];
                        byte[] imageBytes = Convert.FromBase64String(base64Image);
                        StorageFolder localFolder = ApplicationData.Current.LocalFolder;
                        StorageFile profilePictureFile = await localFolder.CreateFileAsync("profilePicture.jpg", CreationCollisionOption.ReplaceExisting);

                        using (IRandomAccessStream stream = await profilePictureFile.OpenAsync(FileAccessMode.ReadWrite))
                        {
                            using (IOutputStream outputStream = stream.GetOutputStreamAt(0))
                            {
                                DataWriter dataWriter = new DataWriter(outputStream);
                                dataWriter.WriteBytes(imageBytes);
                                await dataWriter.StoreAsync();
                                dataWriter.DetachStream();
                            }
                        }
                        ApplicationData.Current.LocalSettings.Values["img"] = profilePictureFile.Path;
                    }

                    return true;

                }
                return false;                
            }
        }


        WindowsSystemDispatcherQueueHelper m_wsdqHelper; // See separate sample below for implementation
        Microsoft.UI.Composition.SystemBackdrops.MicaController m_micaController;
        Microsoft.UI.Composition.SystemBackdrops.SystemBackdropConfiguration m_configurationSource;

        bool TrySetMicaBackdrop()
        {
            if (Microsoft.UI.Composition.SystemBackdrops.MicaController.IsSupported())
            {
                m_wsdqHelper = new WindowsSystemDispatcherQueueHelper();
                m_wsdqHelper.EnsureWindowsSystemDispatcherQueueController();

                // Hooking up the policy object
                m_configurationSource = new Microsoft.UI.Composition.SystemBackdrops.SystemBackdropConfiguration();
                this.Activated += Window_Activated;
                this.Closed += Window_Closed;
                ((FrameworkElement)this.Content).ActualThemeChanged += Window_ThemeChanged;

                // Initial configuration state.
                m_configurationSource.IsInputActive = true;
                SetConfigurationSourceTheme();

                m_micaController = new Microsoft.UI.Composition.SystemBackdrops.MicaController();

                // Enable the system backdrop.
                // Note: Be sure to have "using WinRT;" to support the Window.As<...>() call.
                m_micaController.AddSystemBackdropTarget(this.As<Microsoft.UI.Composition.ICompositionSupportsSystemBackdrop>());
                m_micaController.SetSystemBackdropConfiguration(m_configurationSource);
                return true; // succeeded
            }

            return false; // Mica is not supported on this system
        }

        private void Window_Activated(object sender, WindowActivatedEventArgs args)
        {
            m_configurationSource.IsInputActive = args.WindowActivationState != WindowActivationState.Deactivated;
        }

        private void Window_Closed(object sender, WindowEventArgs args)
        {
            // Make sure any Mica/Acrylic controller is disposed so it doesn't try to
            // use this closed window.
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

        private void OpenMainWindow()
        {    
            var mainWindow = new MainWindow();
            mainWindow.Activate();     
        }

        private void CloseCurrentWindow()
        {
            this.Close();
        }

        private async void ShowContentDialog(string message)
        {
            ContentDialog dialog = new ContentDialog
            {
                XamlRoot = this.Content.XamlRoot,
                Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style,
                Title = message,
                CloseButtonText = "OK",
                DefaultButton = ContentDialogButton.Primary
            };

            await dialog.ShowAsync();
        }

    }

    
}
