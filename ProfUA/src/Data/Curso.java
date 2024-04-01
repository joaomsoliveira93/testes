package Data;

import java.util.ArrayList;

/**
 * Classe Pública de Objetos "Curso"
 * Armazena informação sobre o curso
 * Informação que pode ser obtida pelos métodos Get()
 * @author Paulo Branco
 */
public class Curso extends Departamento{
    private String nome;
    private TipoCurso tipo;
    private int codigo;
    private int resp;
    /**
     * Construtor da classe Curso
     * @param nome Nome do Curso
     * @param tipo Tipo de Curso
     * @param codigo Codigo do curso
     * @param departamento Nome do Departamento
     * @param codigodepart Número do Departamento
     */
    public Curso(String nome, TipoCurso tipo, int codigo, String departamento, int codigodepart) {
        super(departamento, codigodepart);
        this.nome = nome;
        this.tipo = tipo;
        this.codigo = codigo;
    }
    /**
     * Método toString
     * @return Texto com informação do curso
     */
    @Override
    public String toString() {
        return super.toString() + "\nNome curso: " + this.getNomeCurso() + " Codigo Curso: " + this.getCodigoCurso() + " Tipo: " + this.getTipo();
    }
    /**
     * Método de acesso à informação do curso
     * @return Informação do Curso
     */
    public String infoCurso(){
        return "Codigo Curso: " + this.getCodigoCurso() +"\nNome curso: " + this.getNomeCurso() + "\nTipo: " + this.getTipo();
    }
    /**
     * Método de acesso ao Nome do Curso
     * @return Nome do Curso
     */
    public String getNomeCurso() {
        return nome;
    }
    /**
     * Método de acesso ao Tipo do Curso
     * @return Tipo do Curso
     */
    public TipoCurso getTipo() {
        return tipo;
    }
    /**
     * Método de acesso ao Código do Curso
     * @return Código do Curso
     */
    public int getCodigoCurso() {
        return codigo;
    }
    /**
     * Método de acesso ao código do departamento
     * @return Código do Departamento Associado
     */
    @Override
    public int getCodigoDepart() {
        return super.getCodigoDepart();
    }
    /**
     * Método de adição de um telefone ao departamento associado
     * @param telefone 
     */
    @Override
    public void setTelefone(String telefone) {
        super.setTelefone(telefone);
    }
    /**
     * Método de acesso ao Número Mecanográfico Responsável do Curso
     * @return Número Mecanográfico do Professor Responsável
     */
    public int getResp() {
        return resp;
    }
    /**
     * Método de adição de um responsável 
     * @param resp 
     */
    public void setResp(int resp) {
        this.resp = resp;
    }
    
    /**
     * Método de acesso aos telefones do departamento associado
     * @return Telemóveis associados ao departamento em que o curso se encontra introduzido
     */
    @Override
    public ArrayList<String> getTelefones() {
        return super.getTelefones();
    }

    /**
     * Método de acesso ao Nome do Departamento associado
     * @return Nome do Departamento Associado
     */
    @Override
    public String getNomeDepartamento() {
        return super.getNomeDepartamento();
    }
    
    
    
    
    
}
