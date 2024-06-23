package Data;

import java.util.ArrayList;

/**
 * Classe Pública de Objetos "Departamento"
 * Armazena informação sobre o departamento
 * Informação que pode ser obtida pelos métodos Get()
 * @author Grupo 4
 */
public class Departamento {
    private ArrayList<String> telefones;
    private String departamento;
    private int codigo;
    /**
     * Construtor da classe Departamento
     * @param nome
     * @param codigo 
     */
    public Departamento(String nome, int codigo) {
        this.departamento = nome;
        this.codigo = codigo;
        telefones = new ArrayList<>();
    }
    /**
     * Método to String
     * @return Informação do Departamento
     */
    @Override
    public String toString() {
        return "Departamento nº: " + this.getCodigoDepart() + " Departamento: " + this.getNomeDepartamento();
    }   
    /**
     * Método de acesso ao Nome do Departamento
     * @return Nome do Departamento
     */
    public String getNomeDepartamento() {
        return departamento;
    }

    /**
     * Método de acesso ao Código do Departamento
     * @return Código do Departamento
     */
    public int getCodigoDepart() {
        return codigo;
    }
    /**
     * Método de adição de um telefone ao Departamento
     * @param telefone Telefone do Departamento
     */
    public void setTelefone(String telefone) {
        this.telefones.add(telefone);
    }

    /**
     * Método de acesso aos telefones do departamento
     * @return Lista de telemóveis associados ao departamento
     */
    public ArrayList<String> getTelefones() {
        return telefones;
    }   
    
}
