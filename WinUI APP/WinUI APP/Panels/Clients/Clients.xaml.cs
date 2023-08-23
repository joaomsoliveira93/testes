using Microsoft.UI.Xaml.Controls;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.UI.Xaml;
using System;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Text;
using Microsoft.UI.Xaml.Media.Animation;
using WinUI_APP.Classes;

namespace WinUI_APP
{
    public sealed partial class Clientes : Page
    {
        private ObservableCollection<Clients> clients;
        private Clients newClient = new Clients();
        private ObservableCollection<Clients> filteredClients;
        string apiServer = Properties.Resources.apiServer;
        public Clientes()
        {            
            this.InitializeComponent();
            LoadData();
        }

        private async void LoadData()
        {
            clients = await GetClientsFromApi();
            filteredClients = clients;
            grid.ItemsSource = filteredClients;
            if(filteredClients.Count()==0) {
                nothing.Visibility = Visibility.Visible;
            }
            else
            {
                nothing.Visibility = Visibility.Collapsed;
            }
        }

        private async Task<ObservableCollection<Clients>> GetClientsFromApi()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{apiServer}/allclients");

                List<Clients> clientData = new List<Clients>();
                string responseText = await response.Content.ReadAsStringAsync();
                if (responseText !="null")
                {
                    using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                    {                        
                        var document = await JsonDocument.ParseAsync(responseStream);
                        foreach (var element in document.RootElement.EnumerateArray())
                        {
                            Clients temp = new Clients();
                            element.TryGetProperty("_id", out var idProperty);                            
                            string id = idProperty.GetString();
                            temp.Id= id;

                            element.TryGetProperty("name", out var nameProperty);                            
                            string name = nameProperty.GetString();
                            temp.Name = name;

                            element.TryGetProperty("ncont", out var nContProperty);                            
                            string ncont = nContProperty.GetString();
                            temp.Ncont = ncont;

                            element.TryGetProperty("morada", out var moradaProperty);                            
                            string morada = moradaProperty.GetString();
                            temp.Morada = morada;

                            element.TryGetProperty("cidade", out var cidadeProperty);                            
                            string cidade = cidadeProperty.GetString();
                            temp.Cidade = cidade;

                            element.TryGetProperty("codPost", out var codPostProperty);                            
                            string codPost = codPostProperty.GetString();
                            temp.CodPost = codPost;

                            element.TryGetProperty("contacto", out var contactoProperty);                            
                            string contacto = contactoProperty.GetString();
                            temp.Contacto = contacto;

                            element.TryGetProperty("email", out var emailProperty);                            
                            string email = emailProperty.GetString();
                            temp.Email = email;

                            element.TryGetProperty("rep", out var repProperty);                            
                            string rep = repProperty.GetString();
                            temp.Rep = rep;

                            element.TryGetProperty("repContacto", out var repContactoProperty);                            
                            string repContacto = repContactoProperty.GetString();
                            temp.RepContacto = repContacto;

                            element.TryGetProperty("repEmail", out var repEmailProperty);                            
                            string repEmail = repEmailProperty.GetString();
                            temp.RepEmail = repEmail;
                            
                            clientData.Add(temp);
                        }
                        return new ObservableCollection<Clients>(clientData);
                    }
                }
                else
                {
                    return new ObservableCollection<Clients>();
                }
            }
        }

        private void filter(object sender, TextChangedEventArgs e)
        {              
            filteredClients = new ObservableCollection<Clients>(clients.Where(client => client.Name.ToLower().Contains(filterNome.Text) 
            && client.Ncont.ToLower().Contains(filterNcont.Text) 
            && client.Morada.ToLower().Contains(filterMorada.Text)
            && client.CodPost.ToLower().Contains(filterCodPost.Text)
            && client.CodPost.ToLower().Contains(filterCidade.Text)
            && client.CodPost.ToLower().Contains(filterContacto.Text)
            && client.CodPost.ToLower().Contains(filterEmail.Text)
            ));
            grid.ItemsSource = filteredClients;
            if (filteredClients.Count() == 0)
            {
                nothing.Visibility = Visibility.Visible;
            }
            else
            {
                nothing.Visibility = Visibility.Collapsed;
            }
        }

        private void detalhes_ButtonClick(object sender, Microsoft.UI.Xaml.RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Clients dataItem)
            {
                string itemId = dataItem.Id;
                Frame.Navigate(typeof(Detalhes), itemId,new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
            }
        }

        private async void addClient_Click(object sender, RoutedEventArgs e)
        {
            addClientDialog.XamlRoot = this.XamlRoot;
            ContentDialogResult result = await addClientDialog.ShowAsync();
        }

        private async void addClientDialog_PrimaryButtonClick(ContentDialog sender, ContentDialogButtonClickEventArgs args)
        {
            string userId = "64d6c5195da9d3c2d466ded5";
            if (newClient.Name != "" && newClient.Ncont != "" && newClient.Morada != "" && newClient.Cidade != "" && newClient.CodPost != "" && newClient.Contacto != "" && newClient.Email != "")
            {
                using (var httpClient = new HttpClient())
                {
                    var client = new
                    {
                        name = newClient.Name,
                        ncont = newClient.Ncont,
                        morada = newClient.Morada,
                        cidade = newClient.Cidade,
                        codPost = newClient.CodPost,
                        contacto = newClient.Contacto,
                        email = newClient.Email,
                        rep = newClient.Rep,
                        repEmail = newClient.RepEmail,
                        repContacto = newClient.RepContacto
                    };

                    var requestData = new
                    {
                        UserId = userId,
                        Client = client,
                    };

                    var options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    };
                    string requestDataJson = JsonSerializer.Serialize(requestData, options);

                    var content = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await httpClient.PostAsync($"{apiServer}/client/add", content);
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
                        dialog2.Title = "Não foi possível adicionar o Cliente!";
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
                        dialog2.Title = "O Cliente foi adicionado com sucesso!";
                        dialog2.PrimaryButtonText = "OK";
                        dialog2.DefaultButton = ContentDialogButton.Primary;
                        var result = await dialog2.ShowAsync();

                        if (result == ContentDialogResult.Primary)
                        {
                            Frame.Navigate(typeof(Detalhes), responseText, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });
                        }
                    }
                }
            }
            else
            {
                args.Cancel = true;
            }
        }

        private void validation(object sender, TextChangedEventArgs e)
        {
            TextBox text = sender as TextBox;
            TextBlock block = this.FindName($"{text.Name}Validator") as TextBlock;
            if(text.Text.Length> 0)
            {
                block.Visibility = Visibility.Collapsed;
            }
            else
            {
                block.Visibility = Visibility.Visible;
            }
        }
    }
}
