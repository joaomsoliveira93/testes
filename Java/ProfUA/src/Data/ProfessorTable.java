package Data;

/**
 * Classe Pública de Objetos "ProfessorTable"
 * Armazena informação sobre o docente apresentada na tabela de resultados
 * Informação que pode ser obtida pelos métodos Get()
 * @author Grupo 4
 */
public class ProfessorTable {
    private int nmec;
    private String nome, uc, departamento, curso;
    /**
     * Construtor da classe Professor Table
     * @param nmec Número Mecanográfico do Docente
     * @param nome Nome do Docente
     * @param uc Nome da UC
     * @param departamento Nome do Departamento
     * @param curso Nome do Curso
     */
    public ProfessorTable(int nmec, String nome, String uc, String departamento, String curso) {
        this.nmec = nmec;
        this.nome = nome;
        this.uc = uc;
        this.departamento = departamento;
        this.curso = curso;
    }
    /**
     * Método de acesso ao Nome do Departamento
     * @return Nome do departamento
     */
    public String getDepartamento() {
        return departamento;
    }
    /**
     * Método de acesso ao Número Mecanográfico do Docente
     * @return Número Mecanográfico
     */
    public int getNmec() {
        return nmec;
    }
    /**
     * Método de acesso ao Nome do Docente
     * @return Nome do Docente
     */
    public String getNome() {
        return nome;
    }
    /**
     * Método de definição do Número Mecanográfico do Docente
     * @param nmec 
     */
    public void setNmec(int nmec) {
        this.nmec = nmec;
    }
    /**
     * Método de definição do Departamento Associado
     * @param departamento 
     */
    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }
    /**
     * Método de acesso à UC Associada
     * @return 
     */
    public String getUc() {
        return uc;
    }
    /**
     * Método de definição da UC Associada
     * @param uc 
     */
    public void setUc(String uc) {
        this.uc = uc;
    }
    /**
     * Método de acesso ao Curso Associada
     * @return 
     */
    public String getCurso() {
        return curso;
    }
    /**
     * Método de definição do curso Associado
     * @param curso 
     */
    public void setCurso(String curso) {
        this.curso = curso;
    }
    /**
     * Método de definição do nome do Docente
     * @param nome 
     */
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    
    
    
}
