using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Media.Animation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Windows.Storage;
using WinUI_APP.Classes;

namespace WinUI_APP.Panels.Users
{
    public sealed partial class Users : Page
    {
        private string userId = ApplicationData.Current.LocalSettings.Values["userId"] as string;
        private bool perm = (bool)ApplicationData.Current.LocalSettings.Values["permissions"];
        private ObservableCollection<User> users;
        private User newUser = new User();
        private ObservableCollection<User> filteredUsers;
        private string apiServer = Properties.Resources.apiServer;
        private string filtertipo = "Todos";
        private string filterestado = "Todos";
        private string newTipo = "user";

        public Users()
        {
            this.InitializeComponent();
            LoadData();
            DataContext = this;
        }

        private async void LoadData()
        {
            users = await GetUsersFromApi();
            filteredUsers = users;
            grid.ItemsSource = filteredUsers;
            if (filteredUsers.Count() == 0)
            {
                nothing.Visibility = Visibility.Visible;
            }
            else
            {
                nothing.Visibility = Visibility.Collapsed;
            }
        }

        private async Task<ObservableCollection<User>> GetUsersFromApi()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{apiServer}/allusers");

                List<User> userData = new List<User>();
                string responseText = await response.Content.ReadAsStringAsync();
                if (responseText != "null")
                {
                    using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                    {
                        var document = await JsonDocument.ParseAsync(responseStream);
                        foreach (var element in document.RootElement.EnumerateArray())
                        {
                            User temp = new User();
                            element.TryGetProperty("_id", out var idProperty);
                            string id = idProperty.GetString();
                            temp.Id = id;

                            element.TryGetProperty("username", out var usernameProperty);
                            string username = usernameProperty.GetString();
                            temp.Username = username;

                            element.TryGetProperty("name", out var nameProperty);
                            string name = nameProperty.GetString();
                            temp.Name = name;

                            element.TryGetProperty("email", out var emailProperty);
                            string email = emailProperty.GetString();
                            temp.Email = email;

                            element.TryGetProperty("tipo", out var tipoProperty);
                            string tipo = tipoProperty.GetString();
                            temp.Tipo = tipo;

                            element.TryGetProperty("estado", out var estadoProperty);
                            string estado = estadoProperty.GetInt64().ToString();
                            temp.Estado = estado;


                            userData.Add(temp);
                        }
                        return new ObservableCollection<User>(userData);
                    }
                }
                else
                {
                    return new ObservableCollection<User>();
                }
            }
        }

        private void tipo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            handleFilter();
        }

        private void estado_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            handleFilter();
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

        private void filter(object sender, TextChangedEventArgs e)
        {
            handleFilter();
        }

        private void handleFilter()
        {
            if (filteredUsers != null)
            {
                filteredUsers = new ObservableCollection<User>(users.Where(user =>
                 user.Username.ToLower().Contains(filterUsername.Text)
              && (filterNome.Text == "" || user.Name.ToLower().Contains((filterNome.Text).ToLower()))
              && (filterEmail.Text == "" || user.Email.ToLower().Contains((filterEmail.Text).ToLower()))
              && (filtertipo == "Todos" || user.Tipo == filtertipo)
              && (filterestado == "Todos" || user.Estado == filterestado)
              ));
                grid.ItemsSource = filteredUsers;
                if (filteredUsers.Count() == 0)
                {
                    nothing.Visibility = Visibility.Visible;
                }
                else
                {
                    nothing.Visibility = Visibility.Collapsed;
                }
            }
        }

        private void ViewUserButton_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is User dataItem)
            {
                string itemId = dataItem.Id;
                Frame.Navigate(typeof(DtlUser), itemId, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
            }
        }

        private async void AddUserButton_Click(object sender, RoutedEventArgs e)
        {
            addUserDialog.XamlRoot = this.XamlRoot;
            ContentDialogResult result = await addUserDialog.ShowAsync();
        }

        private async void addUserDialog_PrimaryButtonClick(ContentDialog sender, ContentDialogButtonClickEventArgs args)
        {
            if (username.Text != "" && name.Text != "" && email.Text != "")
            {
                using (var httpClient = new HttpClient())
                {
                    var addUser = new
                    {
                        username = this.newUser.Username,
                        name = this.newUser.Name,
                        email = this.newUser.Email,
                        tipo = this.newUser.Tipo,
                        canManageClients = this.newUser.CanManageClients,
                        canManageLicences = this.newUser.CanManageLicences,
                        canManageUsers = this.newUser.CanManageUsers,
                        canManagePermissions = this.newUser.CanManagePermissions,
                    };


                    var requestData = new
                    {
                        UserId = userId,
                        user = addUser,
                    };

                    var options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    };
                    string requestDataJson = JsonSerializer.Serialize(requestData, options);

                    var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await httpClient.PostAsync($"{apiServer}/user/add", content);
                    string responseText = await response.Content.ReadAsStringAsync();
                    if (responseText == "null")
                    {
                        ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");
                    }
                    else if (responseText == "NOK")
                    {
                        ShowContentDialog("Não foi possível adicionar o utilizador!");
                    }
                    else
                    {
                        responseText = responseText.Replace("\"", ""); ;
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "O utilizador foi adicionado com sucesso!";
                        dialog2.PrimaryButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        var result = await dialog2.ShowAsync();

                        if (result == ContentDialogResult.Primary)
                        {
                            Frame.Navigate(typeof(DtlUser), responseText, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
                        }
                    }
                }
            }
            else
            {
                args.Cancel = true;
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

        private void newtipo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ComboBox temp = (ComboBox)sender;
            newUser.Tipo = temp.SelectedValue.ToString();
            if (temp.SelectedValue.ToString() == "admin")
            {
                ClientsCheckBox.IsChecked = true;
                LicencesCheckBox.IsChecked= true;
                UsersCheckBox.IsChecked= true;
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

    public class EstadoDisplayConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, string language)
        {
            string estadoValue = value as string;
            if (estadoValue == "1")
            {
                return "Ativo";
            }
            else if (estadoValue == "0")
            {
                return "Inativo";
            }
            return string.Empty;
        }

        public object ConvertBack(object value, Type targetType, object parameter, string language)
        {
            string estadoString = value as string;
            if (estadoString == "Ativo")
            {
                return "1";
            }
            else if (estadoString == "Inativo")
            {
                return "0";
            }
            return string.Empty;
        }

    }

    public class TipoDisplayConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, string language)
        {
            string tipoValue = value as string;
            if (tipoValue == "admin")
            {
                return "Administrador";
            }
            else if (tipoValue == "user")
            {
                return "Utilizador";
            }
            return string.Empty;
        }

        public object ConvertBack(object value, Type targetType, object parameter, string language)
        {
            string tipoString = value as string;
            if (tipoString == "Administrador")
            {
                return "admin";
            }
            else if (tipoString == "Utilizador")
            {
                return "user";
            }
            return string.Empty;
        }
    }
}
