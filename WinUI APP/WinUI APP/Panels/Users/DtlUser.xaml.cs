using System;
using System.IO;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using WinUI_APP.Classes;
using System.Diagnostics;
using Microsoft.UI.Xaml.Data;
using System.Xml.Linq;

namespace WinUI_APP.Panels.Users
{
    public sealed partial class DtlUser : Page
    {
        private string userId = "";
        private readonly User userInfo = new User();
     
        string apiServer = Properties.Resources.apiServer;
        public DtlUser()
        {
            this.InitializeComponent();
        }


        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);

            if (e.Parameter != null)
            {
                userId = e.Parameter.ToString();
                GetUserFromApi();
            }
        }

        private async void GetUserFromApi()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{apiServer}/user/{userId}");
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

                    }
                }
                else if (responseText == "NOK")
                {
                    ContentDialog dialog2 = new ContentDialog();
                    dialog2.XamlRoot = this.XamlRoot;
                    dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                    dialog2.Title = "O utilizador não existe!";
                    dialog2.CloseButtonText = "OK";
                    dialog2.DefaultButton = ContentDialogButton.Primary;
                    await dialog2.ShowAsync();
                }
                else
                {
                    ContentDialog dialog2 = new ContentDialog();
                    dialog2.XamlRoot = this.XamlRoot;
                    dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                    dialog2.Title = "Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!";
                    dialog2.CloseButtonText = "OK";
                    dialog2.DefaultButton = ContentDialogButton.Primary;
                    await dialog2.ShowAsync();
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

                string userId = "64d6c5195da9d3c2d466ded5";
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
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "O utilizador foi atualizado com sucesso!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "NOK")
                        {
                            GetUserFromApi();
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível atualizar o utilizador!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else
                        {
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                    }
                }
                else
                {
                    GetUserFromApi();
                    ContentDialog dialog2 = new ContentDialog();
                    dialog2.XamlRoot = this.XamlRoot;
                    dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                    dialog2.Title = "As alterações foram descartadas!";
                    dialog2.CloseButtonText = "OK";
                    dialog2.DefaultButton = ContentDialogButton.Primary;
                    await dialog2.ShowAsync();
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
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "O utilizador foi apagado com sucesso!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
                        Frame.GoBack();
                    }
                    else if (responseText == "NOK")
                    {
                        GetUserFromApi();
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "Não foi possível apagar!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
                    }
                    else
                    {
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
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

            string userId = "64d6c5195da9d3c2d466ded5";
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
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "A Palavra-Passe foi restaurada!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
                    }
                    else if (responseText == "NOK")
                    {
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "Não foi possível restaurar a Palavr-Passe!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
                    }
                    else
                    {
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
                    }
                }
            }
        }
    }
}

