using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media.Animation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WinUI_APP.Classes;

namespace WinUI_APP.Panels.Users
{
    public sealed partial class Users : Page
    {
        private ObservableCollection<User> users;
        private User newUser = new User();
        private ObservableCollection<User> filteredUsers;
        string apiServer = Properties.Resources.apiServer;
        string filtertipo = "Todos";
        string filterestado = "Todos";
        string newTipo = "user";
        string newEstado = "1";
        public Users()
        {
            this.InitializeComponent();
            LoadData();
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
            ComboBox temp = sender as ComboBox;
            filtertipo = temp.SelectedValue.ToString();
            handleFilter();
        }

        private void estado_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ComboBox temp = sender as ComboBox;
            filterestado = temp.SelectedValue.ToString();
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
            filteredUsers = new ObservableCollection<User>(users.Where(user => 
             user.Username.ToLower().Contains(filterUsername.Text)
          && ( filterNome.Text == "" || user.Name.ToLower().Contains((filterNome.Text).ToLower()))
          && ( filterEmail.Text == "" || user.Email.ToLower().Contains((filterEmail.Text).ToLower()))
          && ( filtertipo == "Todos" || user.Tipo == filtertipo)
          && ( filterestado == "Todos" || user.Estado == filterestado)
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
            string userId = "64d6c5195da9d3c2d466ded5";
            if (username.Text != "" && name.Text != "" && email.Text != "")
            {
                using (var httpClient = new HttpClient())
                {
                    var newUser = new
                    {
                        username = username.Text,
                        name = name.Text,
                        email = email.Text,
                        estado = newEstado,
                        tipo = newTipo,
                    };

                    var requestData = new
                    {
                        UserId = userId,
                        user = newUser,
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
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();

                    }
                    else if (responseText == "NOK")
                    {
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "Não foi possível adicionar o utilizador!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
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

        private void newtipo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ComboBox tmp = sender as ComboBox;
            if (tmp.SelectedValue.ToString() == "Administrador")
            {
                newTipo = "admin";
            }
            else
            {
                newTipo = "user";
            }

        }

    }
}
