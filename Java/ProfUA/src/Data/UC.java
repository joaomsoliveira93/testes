package Data;

import java.util.ArrayList;

/**
 * Classe Pública de Objetos "UC"
 * Armazena informação sobre a Unidade Curricular
 * Informação que pode ser obtida pelos métodos Get()
 * @author Grupo 4
 */
public class UC extends Curso{
    private int codigo, ano;
    private String nome;

    /**
     * Construtor da classe UC
     * @param codigo Código da UC
     * @param nome Nome da UC
     * @param ano Ano Curricular da UC
     * @param nomecurso Nome do Curso
     * @param tipo Tipo do Curso
     * @param codigocurso Código do Curso
     * @param departamento Nome do Departamento
     * @param codigodepart Código do Departamento
     */
    public UC(int codigo, String nome,int ano, String nomecurso, TipoCurso tipo, int codigocurso, String departamento, int codigodepart) {
        super(nomecurso, tipo, codigocurso, departamento, codigodepart);
        this.codigo = codigo;
        this.nome = nome;
        this.ano = ano;
    }
    /**
     * Método toString
     * @return Informação da Unidade Curricular
     */
    @Override
    public String toString() {
        return super.toString() + "\nAno: " + this.getAno() + " Codigo UC: " + this.getCodigoUC() + " UC: " + this.getNome();
    }    
    /**
     * Método de acesso ao Ano Curricular
     * @return Ano Curricular da UC
     */
    public int getAno() {
        return ano;
    }
    /**
     * Método de acesso ao Código da UC
     * @return Código da UC
     */
    public int getCodigoUC() {
        return codigo;
    }
    /**
     * Método de acesso ao Nome da UC
     * @return Nome da UC 
     */
    public String getNome() {
        return nome;
    }
    /**
     * Método de acesso ao Tipo de Curso
     * @return Tipo do Curso Associado
     */
    @Override
    public TipoCurso getTipo() {        
        return super.getTipo();
    }
    /**
     * Método de acesso ao Código do Curso
     * @return Código do Curso Associado
     */
    @Override
    public int getCodigoCurso() {
        return super.getCodigoCurso();
    }
    /**
     * Método de acesso ao Nome do Curso
     * @return Nome do Curso
     */
    @Override
    public String getNomeCurso() {
        return super.getNomeCurso(); 
    }
    /**
     * Método de acesso ao Código do Departamento Associado
     * @return Código do Departamento Associado
     */
    @Override
    public int getCodigoDepart() {
        return super.getCodigoDepart(); 
    }
    /**
     * Método de acesso ao Nome do Departamento Associado
     * @return Nome do Departamento Associado
     */
    @Override
    public String getNomeDepartamento() {
        return super.getNomeDepartamento();
    }   
    /**
     * Método de adição de um telefone ao departamento
     * @param telefone 
     */
    @Override
    public void setTelefone(String telefone) {
        super.setTelefone(telefone);
    }
    
    /**
     * Método de acesso aos telefones dos departamentos
     * @return Lista dos telefones associados ao departamento em que a UC se encontra introduzida
     */
    @Override
    public ArrayList<String> getTelefones() {
        return super.getTelefones();
    }
}
