using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using Microsoft.UI.Xaml.Shapes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace WinUI_APP
{

    public partial class App : Application
    {

        public App()
        {
            this.InitializeComponent();
        }

 
        protected override void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
        {
            string validtoken = ApplicationData.Current.LocalSettings.Values["tokenValidDate"] as string;
            if (validtoken == "" || validtoken == null)
            {
                m_window = new LoginWindow();
            }
            else
            {
                DateTime tokenExpirationDate = DateTime.Parse(validtoken);
                DateTime currentSystemDate = DateTime.Now;

                if (tokenExpirationDate > currentSystemDate)
                {
                    m_window = new MainWindow();
                }
                else
                {
                    m_window = new LoginWindow();
                }
            }    

            m_window.Activate();
        }

        private Window m_window;
    }
}
