using System.ComponentModel;

namespace WinUI_APP.Classes
{
    internal class Licences : INotifyPropertyChanged
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

        private string estado;
        public string Estado
        {
            get {
                if (estado=="True")
                {
                    return "Válida";
                }
                else
                {
                    return "Expirada";
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

        private string obs;
        public string Obs
        {
            get { return obs; }
            set
            {

                if (value != obs)
                {
                    obs = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Obs)));
                }
            }
        }

        private string startedAt;
        public string StartedAt
        {
            get { return startedAt.Split('T')[0]; }
            set
            {

                if (value != startedAt)
                {
                    startedAt = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(StartedAt)));
                }
            }
        }

        private string endedAt;
        public string EndedAt
        {
            get { return endedAt.Split('T')[0]; }
            set
            {

                if (value != endedAt)
                {
                    endedAt = value;
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(EndedAt)));
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

    }
}
