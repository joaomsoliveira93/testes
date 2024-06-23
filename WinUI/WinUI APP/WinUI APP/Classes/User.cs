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
            get { return tipo; }
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
            get { return estado; }
            set
            {
                if (value != estado)
                {
                    estado = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Estado)));
                }
            }
        }

        private bool canManageClients;
        public bool CanManageClients
        {
            get { return canManageClients; }
            set
            {
                if (value != canManageClients)
                {
                    canManageClients = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(CanManageClients)));
                }
            }
        }

        private bool canManageLicences;
        public bool CanManageLicences
        {
            get { return canManageLicences; }
            set
            {
                if (value != canManageLicences)
                {
                    canManageLicences = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(CanManageLicences)));
                }
            }
        }

        private bool canManageUsers;
        public bool CanManageUsers
        {
            get { return canManageUsers; }
            set
            {
                if (value != canManageUsers)
                {
                    canManageUsers = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(CanManageUsers)));
                }
            }
        }

        private bool canManagePermissions;
        public bool CanManagePermissions
        {
            get { return canManagePermissions; }
            set
            {
                if (value != canManagePermissions)
                {
                    canManagePermissions = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(CanManagePermissions)));
                }
            }
        }

        private string img;
        public string Img
        {
            get { return img; }
            set
            {
                if (value != img)
                {
                    img = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Img)));
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
