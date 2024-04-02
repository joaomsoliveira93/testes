package Data;

/**
 * Classe Pública de Objetos "Gabinete"
 * Armazena informação sobre o gabinete
 * Informação que pode ser obtida pelos métodos Get()
 * @author PGrupo 4
 */
public class Gabinete extends Departamento{
    private int numero;
    private String telefone;
    private int capacidade;
    /**
     * Construtor da classe Gabinete
     * @param numero Número do Gabinete
     * @param telefone Telefone do Gabinete
     * @param nome Nome do Departamento
     * @param codigo Código do Departamento
     * @param capacidade Capacidade do Gabinete
     */
    public Gabinete(int numero, String telefone, String nome, int codigo,int capacidade) {
        super(nome, codigo);
        this.numero = numero;
        this.telefone = telefone;
        this.capacidade=capacidade;
    }
    /**
     * Método de acesso à capacidade do gabinete
     * @return Capacidade do Gabinete
     */
    public int getCapacidade() {
        return capacidade;
    }
    /**
     * Método de definição da capacidade do gabinete
     * @param capacidade Capacidade do Gabinete
     */
    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }
    /**
     * Método de acesso ao número do gabinete
     * @return Número do Gabinete
     */
    public int getNumero() {
        return numero;
    }
    /**
     * Método de acesso ao telefone do gabinete
     * @return Número do Telefone do Gabinete
     */
    public String getTelefone() {
        return telefone;
    }
    /**
     * Método toString
     * @return Informação do gabinete
     */
    @Override
    public String toString() {
        return "Gabinete " + this.numero + "| Departamento " + super.getCodigoDepart() + "| Telefone: " + this.telefone;
    }

    
}
