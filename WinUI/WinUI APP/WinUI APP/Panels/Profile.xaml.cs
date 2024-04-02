using System;
using System.IO;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using Windows.Storage;
using WinUI_APP.Classes;
using System.Diagnostics;
using Windows.Storage.Pickers;
using Microsoft.UI.Xaml.Media.Imaging;

namespace WinUI_APP.Panels
{
    public sealed partial class Profile : Page
    {
        private string userId = ApplicationData.Current.LocalSettings.Values["userId"] as string;
        private string profileImage = ApplicationData.Current.LocalSettings.Values["img"] as string;
        private readonly User userInfo = new User();
        private string apiServer = Properties.Resources.apiServer;
        private StorageFile newImage = null;

        public Profile()
        {
            this.InitializeComponent();
            GetUserFromApi();

        }

        private async void GetUserFromApi()
        {
            BitmapImage bitmapImage = new BitmapImage(new Uri(profileImage, UriKind.Absolute));
            profileImg.Source = bitmapImage;
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
            email.IsEnabled = true;
            PickAPhotoButton.Visibility = Visibility.Visible;
            Editar.Visibility = Visibility.Collapsed;
            Reset.Visibility = Visibility.Collapsed;
            Guardar.Visibility = Visibility.Visible;
            Cancelar.Visibility = Visibility.Visible;
        }

        private void hideDisable()
        {
            name.IsEnabled = false;
            email.IsEnabled = false;
            PickAPhotoButton.Visibility = Visibility.Collapsed;
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
                        StorageFolder localFolder = ApplicationData.Current.LocalFolder;

                        StorageFile profilePictureFile = await localFolder.CreateFileAsync("profilePicture.jpg", CreationCollisionOption.ReplaceExisting);

                        if(newImage != null)
                        {
                             using (var newImageStream = await newImage.OpenReadAsync())
                            {
                                using (var profilePictureStream = await profilePictureFile.OpenStreamForWriteAsync())
                                {
                                    await newImageStream.AsStreamForRead().CopyToAsync(profilePictureStream);
                                }
                            } 
                            profileImage = profilePictureFile.Path;
                            ApplicationData.Current.LocalSettings.Values["img"] = profilePictureFile.Path;
                            profileImage = profilePictureFile.Path;
                            byte[] imageBytes;
                            using (var stream = await newImage.OpenReadAsync())
                            {
                                using (var reader = new BinaryReader(stream.AsStreamForRead()))
                                {
                                    imageBytes = reader.ReadBytes((int)stream.Size);
                                }
                            }
                            string newImage64 = Convert.ToBase64String(imageBytes);
                            this.userInfo.Img = $"data:image/jpeg;base64,{newImage64}";
                        }    


                        var updatedUser = new
                        {
                            _id = userInfo.Id,
                            username = userInfo.Username,
                            name = userInfo.Name,
                            email = userInfo.Email,
                            estado = userInfo.Estado,
                            tipo = userInfo.Tipo,
                            img = userInfo.Img,
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
                            ShowContentDialog("A Palavra-Passe foi alteradas!");
                        }
                        else if (responseText == "errada")
                        {

                            ShowContentDialog("A Palavra-Passe atual está Errada!");
                        }
                        else if (responseText == "NOK")
                        {
                            ShowContentDialog("Não foi possível alterar a palavra-passe!");
                        }
                        else
                        {
                            ShowContentDialog("Não foi possível realizar a ligação com o servidor, por favor tente mais tarde!");
                        }
                    }
                }
                else
                {
                    ShowContentDialog("As palavras-passe não coincidem!");
                }
            }
            else
            {
                ShowContentDialog("Tem que preencher todas as palavras-passe!");
            }
        }

        private async void PickAPhotoButton_Click(object sender, RoutedEventArgs e)
        {
            FileOpenPicker fileOpenPicker = new FileOpenPicker();

            fileOpenPicker.ViewMode = PickerViewMode.Thumbnail;
            fileOpenPicker.SuggestedStartLocation = PickerLocationId.PicturesLibrary;
            fileOpenPicker.FileTypeFilter.Add(".jpg");
            fileOpenPicker.FileTypeFilter.Add(".jpeg");
            fileOpenPicker.FileTypeFilter.Add(".png");

            MainWindow window = new MainWindow();

            var hwnd = WinRT.Interop.WindowNative.GetWindowHandle(window);
            WinRT.Interop.InitializeWithWindow.Initialize(fileOpenPicker, hwnd);

            newImage = await fileOpenPicker.PickSingleFileAsync();

            if (newImage != null)
            {
                BitmapImage bitmapImage = new BitmapImage();
                using (var stream = await newImage.OpenAsync(FileAccessMode.Read))
                {
                    await bitmapImage.SetSourceAsync(stream);
                }
                profileImg.Source = bitmapImage;
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

