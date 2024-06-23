using System;
using System.IO;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using WinUI_APP.Classes;
using Windows.Storage;

namespace WinUI_APP.Panels.Users
{
    public sealed partial class DtlUser : Page
    {
        private string userId = ApplicationData.Current.LocalSettings.Values["userId"] as string;
        private string seeUserId = "";
        private readonly User userInfo = new User();
        private bool perm = (bool)ApplicationData.Current.LocalSettings.Values["permissions"];
        private string apiServer = Properties.Resources.apiServer;
        public DtlUser()
        {
            this.InitializeComponent();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);

            if (e.Parameter != null)
            {
                seeUserId = e.Parameter.ToString();
                GetUserFromApi();
            }
        }

        private async void GetUserFromApi()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{apiServer}/user/{seeUserId}");
                string responseText = await response.Content.ReadAsStringAsync();
                if (responseText != "NOK" && responseText != "null")
                {
                    using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                    {
                        var document = await JsonDocument.ParseAsync(responseStream);

                        var element = document.RootElement;

                        element.TryGetProperty("_id", out var idProperty);
                        string id = idProperty.GetString();
                        userInfo.Id = id;

                        element.TryGetProperty("username", out var usernameProperty);
                        string username = usernameProperty.GetString();
                        userInfo.Username = username;

                        element.TryGetProperty("name", out var nameProperty);
                        string name = nameProperty.GetString();
                        userInfo.Name = name;

                        element.TryGetProperty("email", out var emailProperty);
                        string email = emailProperty.GetString();
                        userInfo.Email = email;

                        element.TryGetProperty("estado", out var estadoProperty);
                        string tempestado = estadoProperty.GetInt64().ToString();
                        userInfo.Estado = tempestado;

                        element.TryGetProperty("tipo", out var tipoProperty);
                        string temptipo = tipoProperty.GetString();
                        userInfo.Tipo = temptipo;

                        element.TryGetProperty("canManageClients", out var canManageClientsProperty);
                        bool tempcanManageClients = canManageClientsProperty.GetBoolean();
                        userInfo.CanManageClients = tempcanManageClients;

                        element.TryGetProperty("canManageLicences", out var canManageLicencesProperty);
                        bool tempcanManageLicences = canManageLicencesProperty.GetBoolean();
                        userInfo.CanManageLicences = tempcanManageLicences;

                        element.TryGetProperty("canManageUsers", out var canManageUsersProperty);
                        bool tempcanManageUsers = canManageUsersProperty.GetBoolean();
                        userInfo.CanManageUsers = tempcanManageUsers;

                        element.TryGetProperty("canManagePermissions", out var canManagePermissionsProperty);
                        bool tempcanManagePermissions = canManagePermissionsProperty.GetBoolean();
                        userInfo.CanManagePermissions = tempcanManagePermissions;

                    }
                }
                else if (responseText == "NOK")
                {
                    ShowContentDialog("O utilizador não existe!");
                }
                else
                {
                    ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");
                }
            }
        }

        private void Editar_Click(object sender, RoutedEventArgs e)
        {                
            name.IsEnabled = true;        
            email.IsEnabled = true;
            comboTipo.IsEnabled = true;
            comboEstado.IsEnabled = true;
            email.IsEnabled = true;
            if (perm)
            {
                ClientsCheckBox.IsEnabled = true;
                LicencesCheckBox.IsEnabled = true;
                UsersCheckBox.IsEnabled = true;
                PermissionsAllCheckBox.IsEnabled = true;
                PermissionsCheckBox.IsEnabled = true;
            }
            Editar.Visibility = Visibility.Collapsed;
            Apagar.Visibility = Visibility.Collapsed;
            Reset.Visibility = Visibility.Collapsed;
            Guardar.Visibility = Visibility.Visible;
            Cancelar.Visibility = Visibility.Visible;
        }

        private void hideDisable()
        {
            name.IsEnabled = false;
            email.IsEnabled = false;
            comboTipo.IsEnabled = false;
            comboEstado.IsEnabled = false;
            ClientsCheckBox.IsEnabled = false;
            LicencesCheckBox.IsEnabled = false;
            UsersCheckBox.IsEnabled = false;
            PermissionsAllCheckBox.IsEnabled = false;
            PermissionsCheckBox.IsEnabled = false;
            Editar.Visibility = Visibility.Visible;
            Apagar.Visibility = Visibility.Visible;
            Reset.Visibility = Visibility.Visible;
            Guardar.Visibility = Visibility.Collapsed;
            Cancelar.Visibility = Visibility.Collapsed;
        }

        private async void Cancelar_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog dialog = new ContentDialog();
            dialog.XamlRoot = this.XamlRoot;
            dialog.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
            dialog.Title = "Todas as alterações serão perdidas. Te a certeza?";
            dialog.PrimaryButtonText = "Sim";
            dialog.CloseButtonText = "Não";
            dialog.DefaultButton = ContentDialogButton.Primary;
            var result = await dialog.ShowAsync();

            if (result == ContentDialogResult.Primary)
            {
                GetUserFromApi();
                hideDisable();
            }

        }

        private async void Guardar_Click(object sender, RoutedEventArgs e)
        {
            if (userInfo.Name != "" && userInfo.Estado != "" && userInfo.Tipo != "" && userInfo.Email != "")
            {
                ContentDialog dialog = new ContentDialog();
                dialog.XamlRoot = this.XamlRoot;
                dialog.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                dialog.Title = "Tem a certeza?";
                dialog.PrimaryButtonText = "Guardar";
                dialog.CloseButtonText = "Cancelar";
                dialog.DefaultButton = ContentDialogButton.Primary;
                var result = await dialog.ShowAsync();

                if (result == ContentDialogResult.Primary)
                {
                    using (var httpClient = new HttpClient())
                    {
                        var updatedUser = new
                        {
                            _id = userInfo.Id,
                            username = userInfo.Username,
                            name = userInfo.Name,
                            email = userInfo.Email,
                            estado = userInfo.Estado,
                            tipo = userInfo.Tipo,
                            canManageClients = userInfo.CanManageClients,
                            canManageLicences = userInfo.CanManageLicences,
                            canManageUsers = userInfo.CanManageUsers,
                            canManagePermissions = userInfo.CanManagePermissions,
                        };

                        var requestData = new
                        {
                            UserId = userId,
                            User = updatedUser,
                        };

                        var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        };
                        string requestDataJson = JsonSerializer.Serialize(requestData, options);

                        var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                        HttpResponseMessage response = await httpClient.PutAsync($"{apiServer}/user/update", content);
                        string responseText = await response.Content.ReadAsStringAsync();
                        if (responseText != "NOK" && responseText != "null")
                        {
                            ShowContentDialog("O utilizador foi atualizado com sucesso!");
                        }
                        else if (responseText == "NOK")
                        {
                            GetUserFromApi();
                            ShowContentDialog("Não foi possível atualizar o utilizador!");
                        }
                        else
                        {
                            ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");
                        }
                    }
                }
                else
                {
                    GetUserFromApi();
                    ShowContentDialog("As alterações foram descartadas!");
                }
                hideDisable();
            }
        }

        private async void Apagar_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog dialog = new ContentDialog();
            dialog.XamlRoot = this.XamlRoot;
            dialog.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
            dialog.Title = "O utilizador vai ser apagado. Tem a certeza?";
            dialog.PrimaryButtonText = "Apagar";
            dialog.CloseButtonText = "Cancelar";
            dialog.DefaultButton = ContentDialogButton.Primary;
            var result = await dialog.ShowAsync();

            if (result == ContentDialogResult.Primary)
            {
                using (var httpClient = new HttpClient())
                {

                    HttpResponseMessage response = await httpClient.DeleteAsync($"{apiServer}/user/delete/{userInfo.Id}");
                    string responseText = await response.Content.ReadAsStringAsync();
                    if (responseText != "NOK" && responseText != "null")
                    {
                        ShowContentDialog("O utilizador foi apagado com sucesso!");
                        Frame.GoBack();
                    }
                    else if (responseText == "NOK")
                    {
                        GetUserFromApi();
                        ShowContentDialog("Não foi possível apagar!");
                    }
                    else
                    {
                        ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");
                    }
                }
            }
            hideDisable();
        }
        private void validation(object sender, TextChangedEventArgs e)
        {
            TextBox text = sender as TextBox;
            TextBlock block = this.FindName($"{text.Name}Validator") as TextBlock;
            if (text.Text.Length > 0)
            {
                block.Visibility = Visibility.Collapsed;
            }
            else
            {
                block.Visibility = Visibility.Visible;
            }
        }

        private async void Reset_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog dialog = new ContentDialog();
            dialog.XamlRoot = this.XamlRoot;
            dialog.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
            dialog.Title = "A Palavra-Pase do utilizador será restaurada. Tem a certeza?";
            dialog.PrimaryButtonText = "Sim";
            dialog.CloseButtonText = "Cancelar";
            dialog.DefaultButton = ContentDialogButton.Primary;
            var result = await dialog.ShowAsync();

            if (result == ContentDialogResult.Primary)
            {
                using (var httpClient = new HttpClient())
                {
                    var updatedUser = new
                    {
                        _id = userInfo.Id,
                    };

                    var requestData = new
                    {
                        UserId = userId,
                        User = updatedUser,
                    };

                    var options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    };
                    string requestDataJson = JsonSerializer.Serialize(requestData, options);

                    var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await httpClient.PutAsync($"{apiServer}/user/resetpassword", content);
                    string responseText = await response.Content.ReadAsStringAsync();
                    if (responseText != "NOK" && responseText != "null")
                    {

                        ShowContentDialog("A Palavra-Passe foi restaurada!");
                    }
                    else if (responseText == "NOK")
                    {
                        ShowContentDialog("Não foi possível restaurar a Palavr-Passe!");
                    }
                    else
                    {
                        ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");
                    }
                }
            }
        }

        private void PermissionsAll_Checked(object sender, RoutedEventArgs e)
        {
            UsersCheckBox.IsChecked = PermissionsCheckBox.IsChecked = LicencesCheckBox.IsChecked = ClientsCheckBox.IsChecked = true;
        }

        private void PermissionsAll_Unchecked(object sender, RoutedEventArgs e)
        {
            UsersCheckBox.IsChecked = PermissionsCheckBox.IsChecked = LicencesCheckBox.IsChecked = ClientsCheckBox.IsChecked = false;
        }

        private void PermissionsAll_Indeterminate(object sender, RoutedEventArgs e)
        {

            if (ClientsCheckBox.IsChecked == true &&
                LicencesCheckBox.IsChecked == true &&
                UsersCheckBox.IsChecked == true &&
                PermissionsCheckBox.IsChecked == true)
            {
                PermissionsAllCheckBox.IsChecked = false;
            }
        }

        private void SetCheckedState()
        {
            if (ClientsCheckBox != null)
            {
                if (ClientsCheckBox.IsChecked == true &&
                    LicencesCheckBox.IsChecked == true &&
                    UsersCheckBox.IsChecked == true &&
                    PermissionsCheckBox.IsChecked == true)
                {
                    PermissionsAllCheckBox.IsChecked = true;
                }
                else if (ClientsCheckBox.IsChecked == false &&
                    LicencesCheckBox.IsChecked == false &&
                    UsersCheckBox.IsChecked == false &&
                    PermissionsCheckBox.IsChecked == false)
                {
                    PermissionsAllCheckBox.IsChecked = false;
                }
                else
                {
                    PermissionsAllCheckBox.IsChecked = null;
                }
            }
        }

        private void Option_Checked(object sender, RoutedEventArgs e)
        {
            SetCheckedState();
        }

        private void Option_Unchecked(object sender, RoutedEventArgs e)
        {
            SetCheckedState();
        }

        private void comboTipo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {         
            ComboBox temp = (ComboBox)sender;
            if (temp.SelectedValue.ToString() == "admin")
            {
                ClientsCheckBox.IsChecked = true;
                LicencesCheckBox.IsChecked = true;
                UsersCheckBox.IsChecked = true;
                PermissionsCheckBox.IsChecked = true;
            }
            else
            {
                ClientsCheckBox.IsChecked = false;
                LicencesCheckBox.IsChecked = false;
                UsersCheckBox.IsChecked = false;
                PermissionsCheckBox.IsChecked = false;
            }            
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

