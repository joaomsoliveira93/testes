using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using Microsoft.WindowsAppSDK.Runtime.Packages;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using System.Xml.Linq;
using Windows.Storage;
using WinUI_APP.Classes;
using System.Diagnostics;

namespace WinUI_APP.Panels
{
    public sealed partial class Profile : Page
    {
        private string userId = ApplicationData.Current.LocalSettings.Values["userId"] as string;
        private readonly User userInfo = new User();

        string apiServer = Properties.Resources.apiServer;
        public Profile()
        {
            this.InitializeComponent();
            GetUserFromApi();
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
            email.IsEnabled = true;
            Editar.Visibility = Visibility.Collapsed;
            Reset.Visibility = Visibility.Collapsed;
            Guardar.Visibility = Visibility.Visible;
            Cancelar.Visibility = Visibility.Visible;
        }

        private void hideDisable()
        {
            name.IsEnabled = false;
            email.IsEnabled = false;
            Editar.Visibility = Visibility.Visible;
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
            alterarDialog.XamlRoot = this.XamlRoot;
            ContentDialogResult result = await alterarDialog.ShowAsync();
        }

        private async void alterarDialog_PrimaryButtonClick(ContentDialog sender, ContentDialogButtonClickEventArgs args)
        {
            if (oldPassword.Password != "" && newPassword.Password != "" && confirmPassword.Password != "" )
            {
                if (newPassword.Password == confirmPassword.Password)
                {
                    using (var httpClient = new HttpClient())
                    {

                        var requestData = new
                        {
                            password = oldPassword.Password,
                            newpassword = newPassword.Password,
                            userId = userId,
                        };

                        var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        };
                        string requestDataJson = JsonSerializer.Serialize(requestData, options);

                        var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                        HttpResponseMessage response = await httpClient.PutAsync($"{apiServer}/user/changepassword", content);
                        string responseText = await response.Content.ReadAsStringAsync();
                        Debug.WriteLine(responseText);
                        if (responseText != "NOK" && responseText != "errada" && responseText != "null")
                        {
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "A Palavra-Passe foi alteradas!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "errada")
                        {
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "A Palavra-Passe atual está Errada!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "NOK")
                        {
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível alterar a palavra-passe!";
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
                    ContentDialog dialog2 = new ContentDialog();
                    dialog2.XamlRoot = this.XamlRoot;
                    dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                    dialog2.Title = "As palavras-passe não coincidem!";
                    dialog2.CloseButtonText = "OK";
                    dialog2.DefaultButton = ContentDialogButton.Primary;
                    await dialog2.ShowAsync();
                }
            }
            else
            {
                ContentDialog dialog2 = new ContentDialog();
                dialog2.XamlRoot = this.XamlRoot;
                dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                dialog2.Title = "Tem que preencher todas as palavras-passe!";
                dialog2.CloseButtonText = "OK";
                dialog2.DefaultButton = ContentDialogButton.Primary;
                await dialog2.ShowAsync();
            }
        }
    }
}

