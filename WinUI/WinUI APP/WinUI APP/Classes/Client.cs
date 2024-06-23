using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WinUI_APP.Classes
{
    class Clients : INotifyPropertyChanged
    {

        private string id;
        public string Id
        {
            get { return id; }
            set
            {

                if (value != id)
                {
                    id = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Id)));
                }
            }
        }

        private string name;
        public string Name
        {
            get { return name; }
            set
            {
                if (value != name)
                {
                    name = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
                }
            }
        }

        private string ncont;
        public string Ncont
        {
            get { return ncont; }
            set
            {
                if (value != ncont)
                {
                    ncont = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Ncont)));
                }
            }
        }

        private string morada;
        public string Morada
        {
            get { return morada; }
            set
            {
                if (value != morada)
                {
                    morada = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Morada)));
                }
            }
        }

        private string cidade;
        public string Cidade
        {
            get { return cidade; }
            set
            {
                if (value != cidade)
                {
                    cidade = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Cidade)));
                }
            }
        }

        private string codPost;
        public string CodPost
        {
            get { return codPost; }
            set
            {
                if (value != codPost)
                {
                    codPost = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(codPost)));
                }
            }
        }

        private string contacto;
        public string Contacto
        {
            get { return contacto; }
            set
            {
                if (value != contacto)
                {
                    contacto = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Contacto)));
                }
            }
        }

        private string email;
        public string Email
        {
            get { return email; }
            set
            {
                if (value != email)
                {
                    email = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Email)));
                }
            }
        }

        private string rep;
        public string Rep
        {
            get { return rep; }
            set
            {
                if (value != rep)
                {
                    rep = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Rep)));
                }
            }
        }

        private string repContacto;
        public string RepContacto
        {
            get { return repContacto; }
            set
            {
                if (value != repContacto)
                {
                    repContacto = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(RepContacto)));
                }
            }
        }

        private string repEmail;
        public string RepEmail
        {
            get { return repEmail; }
            set
            {
                if (value != repEmail)
                {
                    repEmail = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(RepEmail)));
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
