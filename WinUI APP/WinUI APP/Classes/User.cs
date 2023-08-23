using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WinUI_APP.Classes
{
    internal class User : INotifyPropertyChanged
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

        private string username;
        public string Username
        {
            get { return username; }
            set
            {

                if (value != username)
                {
                    username = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Username)));
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

        private string tipo;
        public string Tipo
        {
            get {
                if (tipo == "admin")
                {
                    return "Administrador";
                }
                else
                {
                    return "Utilizador";
                }
            }
            set
            {
                if (value != tipo)
                {
                    tipo = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Tipo)));
                }
            }

        }

        private string estado;
        public string Estado
        {
            get { if (estado=="1") {
                    return "Ativo";
                }
                else
                {
                    return "Inativo";
                }
            }
            set
            {
                if (value != estado)
                {
                    estado = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Estado)));
                }
            }
        }

        public string getEstado()
        {
            if (estado == "Ativo")
            {
                return "1";
            }
            else
            {
                return "0";
            }
        }

        public string getTipo()
        {
            if (tipo == "Administrador")
            {
                return "admin";
            }
            else
            {
                return "user";
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
