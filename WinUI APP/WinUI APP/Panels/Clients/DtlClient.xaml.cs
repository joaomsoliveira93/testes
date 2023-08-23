using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;
using System.Collections.ObjectModel;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using WinUI_APP.Classes;
using System.Diagnostics;
using System.Linq;
using Microsoft.UI.Xaml.Data;
using System.Globalization;

namespace WinUI_APP
{
    public sealed partial class Detalhes : Page
    {
        private string clientId = "";
        private Clients clientInfo = new Clients();
        private ObservableCollection<Licences> licences;
        private Licences selectedLicence;
        string apiServer = Properties.Resources.apiServer;
        public Detalhes()
        {            
            this.InitializeComponent();   
        }

        protected override async void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);            

            if (e.Parameter != null)
            {
                clientId = e.Parameter.ToString();
                GetClientFromApi();
                licences = await GetLicencesFromApi();
                licencesGrid.ItemsSource = licences;
            }
        }

        private async void GetClientFromApi()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{apiServer}/client/{clientId}");
                string responseText = await response.Content.ReadAsStringAsync();
                if (responseText != "NOK" && responseText != "null")
                {
                    using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                    {
                        var document = await JsonDocument.ParseAsync(responseStream);

                        var element = document.RootElement;
                        
                        element.TryGetProperty("_id", out var idProperty);
                        string id = idProperty.GetString();
                        clientInfo.Id = id;

                        element.TryGetProperty("name", out var nameProperty);
                        string name = nameProperty.GetString();
                        clientInfo.Name = name;

                        element.TryGetProperty("ncont", out var nContProperty);
                        string ncont = nContProperty.GetString();
                        clientInfo.Ncont = ncont;

                        element.TryGetProperty("morada", out var moradaProperty);
                        string morada = moradaProperty.GetString();
                        clientInfo.Morada = morada;

                        element.TryGetProperty("cidade", out var cidadeProperty);
                        string cidade = cidadeProperty.GetString();
                        clientInfo.Cidade = cidade;

                        element.TryGetProperty("codPost", out var codPostProperty);
                        string codPost = codPostProperty.GetString();
                        clientInfo.CodPost = codPost;

                        element.TryGetProperty("contacto", out var contactoProperty);
                        string contacto = contactoProperty.GetString();
                        clientInfo.Contacto = contacto;

                        element.TryGetProperty("email", out var emailProperty);
                        string email = emailProperty.GetString();
                        clientInfo.Email = email;

                        element.TryGetProperty("rep", out var repProperty);
                        string rep = repProperty.GetString();
                        clientInfo.Rep = rep;

                        element.TryGetProperty("repContacto", out var repContactoProperty);
                        string repContacto = repContactoProperty.GetString();
                        clientInfo.RepContacto = repContacto;

                        element.TryGetProperty("repEmail", out var repEmailProperty);
                        string repEmail = repEmailProperty.GetString();
                        clientInfo.RepEmail = repEmail;                        
                    }
                }
                else if (responseText == "NOK") 
                {
                    ContentDialog dialog2 = new ContentDialog();
                    dialog2.XamlRoot = this.XamlRoot;
                    dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                    dialog2.Title = "O cliente não existe!";
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
            nCont.IsEnabled = true;
            morada.IsEnabled = true;
            codPost.IsEnabled = true;
            cidade.IsEnabled = true;
            email.IsEnabled = true;
            contacto.IsEnabled = true;
            rep.IsEnabled = true;
            repContacto.IsEnabled = true;
            repEmail.IsEnabled = true;
            Editar.Visibility= Visibility.Collapsed;
            Apagar.Visibility = Visibility.Collapsed;
            Guardar.Visibility = Visibility.Visible;
            Cancelar.Visibility = Visibility.Visible;
        }

        private void hideDisable()
        {
            name.IsEnabled = false;
            nCont.IsEnabled = false;
            morada.IsEnabled = false;
            codPost.IsEnabled = false;
            cidade.IsEnabled = false;
            email.IsEnabled = false;
            contacto.IsEnabled = false;
            rep.IsEnabled = false;
            repContacto.IsEnabled = false;
            repEmail.IsEnabled = false;
            Editar.Visibility = Visibility.Visible;
            Apagar.Visibility = Visibility.Visible;
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
                GetClientFromApi();
                hideDisable();
            }
                
        }

        private async void Guardar_Click(object sender, RoutedEventArgs e)
        {
            if (clientInfo.Name != "" && clientInfo.Ncont != "" && clientInfo.Morada != "" && clientInfo.Cidade != "" && clientInfo.CodPost != "" && clientInfo.Contacto != "" && clientInfo.Email != "")
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
                        var updatedClient = new
                        {
                            _id = clientInfo.Id,
                            name = clientInfo.Name,
                            ncont = clientInfo.Ncont,
                            morada = clientInfo.Morada,
                            cidade = clientInfo.Cidade,
                            codpost = clientInfo.CodPost,
                            contacto = clientInfo.Contacto,
                            email = clientInfo.Email,
                            rep = clientInfo.Rep,
                            repEmail = clientInfo.RepEmail,
                            repContacto = clientInfo.RepContacto
                        };

                        var requestData = new
                        {
                            UserId = userId,
                            Client = updatedClient,
                        };

                        var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        };
                        string requestDataJson = JsonSerializer.Serialize(requestData, options);

                        var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                        HttpResponseMessage response = await httpClient.PutAsync($"{apiServer}/client/update", content);
                        string responseText = await response.Content.ReadAsStringAsync();
                        if (responseText != "NOK" && responseText != "null")
                        {
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "O Cliente foi atualizado com sucesso!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "NOK")
                        {
                            GetClientFromApi();
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível atualizar o Cliente!";
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
                    GetClientFromApi();
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
            dialog.Title = "O cliente e as licenças seram apagados. Tem a certeza?";
            dialog.PrimaryButtonText = "Apagar";
            dialog.CloseButtonText = "Cancelar";
            dialog.DefaultButton = ContentDialogButton.Primary;
            var result = await dialog.ShowAsync();

            if (result == ContentDialogResult.Primary)
            {
                using (var httpClient = new HttpClient())
                {

                    HttpResponseMessage response = await httpClient.DeleteAsync($"{apiServer}/client/delete/{clientInfo.Id}");
                    string responseText = await response.Content.ReadAsStringAsync();
                    if (responseText != "NOK" && responseText != "null")
                    {
                        ContentDialog dialog2 = new ContentDialog();
                        dialog2.XamlRoot = this.XamlRoot;
                        dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                        dialog2.Title = "O Cliente e as licenças foram apagadas com sucesso!";
                        dialog2.CloseButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        await dialog2.ShowAsync();
                        Frame.GoBack();
                    }
                    else if(responseText == "NOK")
                    {
                        GetClientFromApi();
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

        private async Task<ObservableCollection<Licences>> GetLicencesFromApi()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{apiServer}/alllicences/{clientId}");

                List<Licences> licenceData = new List<Licences>();
                string responseText = await response.Content.ReadAsStringAsync();
                if (responseText != "null")
                {
                    using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                    {
                        var document = await JsonDocument.ParseAsync(responseStream);
                        foreach (var element in document.RootElement.EnumerateArray())
                        {
                            Licences temp = new Licences();

                            element.TryGetProperty("_id", out var idProperty);
                            string id = idProperty.GetString();
                            temp.Id = id;

                            element.TryGetProperty("estado", out var estadoProperty);
                            string estado = estadoProperty.GetBoolean().ToString();
                            temp.Estado = estado;

                            element.TryGetProperty("tipo", out var tipoProperty);
                            string tipo = tipoProperty.GetString();
                            temp.Tipo = tipo;

                            element.TryGetProperty("obs", out var obsProperty);
                            string obs = obsProperty.GetString();
                            temp.Obs = obs;

                            element.TryGetProperty("startedAt", out var startedAtProperty);
                            string startedAt = startedAtProperty.GetString();
                            temp.StartedAt = startedAt;

                            element.TryGetProperty("endedAt", out var endedAtProperty);
                            string endedAt = endedAtProperty.GetString();
                            temp.EndedAt = endedAt;

                            licenceData.Add(temp);
                        }
                        return new ObservableCollection<Licences>(licenceData);
                    }
                }
                else
                {
                    return new ObservableCollection<Licences>();
                }
            }
        }

        private async void EditLicenceButton_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Licences dataItem)
            {
                selectedLicence = new Licences();
                selectedLicence = licences.FirstOrDefault(licence => licence.Id.Contains(dataItem.Id));
                addEditDialog.DataContext = selectedLicence;
                addEditDialog.Title = "Editar Licença";
                addEditDialog.XamlRoot = this.XamlRoot;
                ContentDialogResult result = await addEditDialog.ShowAsync();
            }
        }

        private void addEditDialog_Opened(ContentDialog sender, ContentDialogOpenedEventArgs args)
        {
            if (selectedLicence.Id != null)
            {               
                tipoLicenca.Text= selectedLicence.Tipo;
                obsLicenca.Text = selectedLicence.Obs;
                startedAtLicenca.Date = DateTime.ParseExact(selectedLicence.StartedAt, "yyyy-MM-dd", null);
                endedAtLicenca.Date = DateTime.ParseExact(selectedLicence.EndedAt, "yyyy-MM-dd", null);
            }
            else
            {
                startedAtLicenca.Date = DateTime.Now;
                endedAtLicenca.Date = DateTime.Now;
            }

        }

        private async void addEditDialog_PrimaryButtonClick(ContentDialog sender, ContentDialogButtonClickEventArgs args)
        {
            string userId = "64d6c5195da9d3c2d466ded5";
            if (tipoLicenca.Text != "")
            {   
                if (selectedLicence.Id != null)
                {
                    using (var httpClient = new HttpClient())
                    {
                        string tempEstado = "";
                        if (startedAtLicenca.Date < endedAtLicenca.Date)
                        {
                            tempEstado = "true";
                        }
                        else
                        {
                            tempEstado = "false";
                        }
                        var updatedLicence = new
                        {
                            _id = selectedLicence.Id,
                            tipo = tipoLicenca.Text,
                            estado = tempEstado,
                            obs = obsLicenca.Text,
                            startedAt = startedAtLicenca.Date,
                            endedAt = endedAtLicenca.Date
                        };

                        var requestData = new
                        {
                            UserId = userId,
                            Licence = updatedLicence,
                        };

                        var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        };
                        string requestDataJson = JsonSerializer.Serialize(requestData, options);

                        var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                        HttpResponseMessage response = await httpClient.PutAsync($"{apiServer}/licence/update", content);
                        string responseText = await response.Content.ReadAsStringAsync();
                        if (responseText != "NOK" && responseText != "null")
                        {
                            licences = await GetLicencesFromApi();
                            licencesGrid.ItemsSource = licences;
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "A Licença foi atualizada com sucesso!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "NOK")
                        {
                            selectedLicence = null;
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível atualizar a Licença!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else
                        {
                            selectedLicence = null;
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
                    using (var httpClient = new HttpClient())
                    {
                        string tempEstado = "";
                        if (startedAtLicenca.Date < endedAtLicenca.Date)
                        {
                            tempEstado = "true";
                        }
                        else
                        {
                            tempEstado = "false";
                        }
                        var newLicence = new
                        {
                            clientId=clientId,
                            tipo = tipoLicenca.Text,
                            estado = tempEstado,
                            obs = obsLicenca.Text,
                            startedAt = startedAtLicenca.Date,
                            endedAt = endedAtLicenca.Date
                        };

                        var requestData = new
                        {
                            userId = userId,
                            licence = newLicence,
                        };

                        var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        };
                        string requestDataJson = JsonSerializer.Serialize(requestData, options);

                        var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                        HttpResponseMessage response = await httpClient.PostAsync($"{apiServer}/licence/add", content);
                        string responseText = await response.Content.ReadAsStringAsync();
                        if (responseText != "NOK" && responseText != "null")
                        {
                            licences = await GetLicencesFromApi();
                            licencesGrid.ItemsSource = licences;
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "A Licença foi adicionada com sucesso!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "NOK")
                        {
                            selectedLicence = null;
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível adicionar a Licença!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else
                        {
                            selectedLicence = null;
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

        private async void addEditDialog_CloseButtonClick(ContentDialog sender, ContentDialogButtonClickEventArgs args)
        {
            sender.Hide();
            ContentDialog dialog = new ContentDialog();
            dialog.XamlRoot = this.XamlRoot;
            dialog.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
            dialog.Title = "As alterações serão descartadas. Tem a certeza?";
            dialog.PrimaryButtonText = "Sim";
            dialog.CloseButtonText = "Cancelar";
            dialog.DefaultButton = ContentDialogButton.Primary;
            var result = await dialog.ShowAsync();

            if (result == ContentDialogResult.Primary)
            {
                selectedLicence = null;
            }
            else
            {                
                addEditDialog.DataContext = selectedLicence;
                addEditDialog.XamlRoot = this.XamlRoot;
                await addEditDialog.ShowAsync();
            }

        }

        private async void DeleteLicenceButton_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Licences dataItem)
            {
                ContentDialog dialog = new ContentDialog();
                dialog.XamlRoot = this.XamlRoot;
                dialog.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                dialog.Title = "O licença será apagada. Tem a certeza?";
                dialog.PrimaryButtonText = "Apagar";
                dialog.CloseButtonText = "Cancelar";
                dialog.DefaultButton = ContentDialogButton.Primary;
                var result = await dialog.ShowAsync();

                if (result == ContentDialogResult.Primary)
                {
                    using (var httpClient = new HttpClient())
                    {

                        HttpResponseMessage response = await httpClient.DeleteAsync($"{apiServer}/licence/delete/{dataItem.Id}");
                        string responseText = await response.Content.ReadAsStringAsync();
                        if (responseText != "NOK" && responseText != "null")
                        {
                            licences = await GetLicencesFromApi();
                            licencesGrid.ItemsSource = licences;
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "A licença foi apagada com sucesso!";
                            dialog2.CloseButtonText = "OK";
                            dialog2.DefaultButton = ContentDialogButton.Primary;
                            await dialog2.ShowAsync();
                        }
                        else if (responseText == "NOK")
                        {
                            GetClientFromApi();
                            ContentDialog dialog2 = new ContentDialog();
                            dialog2.XamlRoot = this.XamlRoot;
                            dialog2.Style = Application.Current.Resources["DefaultContentDialogStyle"] as Style;
                            dialog2.Title = "Não foi possível apagar a licença!";
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

        private async void addLicenceButton_Click(object sender, RoutedEventArgs e)
        {
            selectedLicence = new Licences();
            addEditDialog.DataContext = selectedLicence;
            addEditDialog.Title = "Adicionar Licença";
            addEditDialog.XamlRoot = this.XamlRoot;
            ContentDialogResult result = await addEditDialog.ShowAsync();
        }
    }
}
