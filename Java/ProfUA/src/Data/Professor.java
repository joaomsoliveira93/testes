package Data;

import java.util.ArrayList;

/**
 * Classe Pública de Objetos "Professor"
 * Armazena informação sobre o docente
 * Informação que pode ser obtida pelos métodos Get()
 * @author Grupo 4
 */
public class Professor {
    private ArrayList<String> telefones;
    private int nmec;
    private String nome, email, area, descricao;
    private ArrayList<UC> curriculares;
    private ArrayList<Gabinete> gabinetes; 
    private UC uc;

    //Telefones do departamento e docente acessados por query externa
    /**
     * Construtor da classe de Informação do Professor (Informação a apresentar ao utilizador da aplicação perante a seleção de uma linha da tabela de pesquisa)
     * @param nmec Número Mecanográfico do Docente
     * @param nome Nome do Docente
     * @param email Email do Docente
     * @param area Área Científica do Docente
     * @param descricao Descrição sobre o Docente
     */
    public Professor(int nmec, String nome, String email, String area, String descricao) {
        this.nmec = nmec;
        this.nome = nome;
        this.email = email;
        this.area = area;
        this.descricao = descricao;
        curriculares = new ArrayList<>();
        gabinetes = new ArrayList<>();
        telefones = new ArrayList<>();
    }

    /**
     * Método de associação de Unidade Curricular com o docente
     * Utilizado aquando do fim da Query da base de dados exercido pela seleção de uma linha da tabela
     * @param codigo Código da Unidade Curricular
     * @param nome Nome da Unidade Curricular
     * @param ano Ano do Curso em que a UC é lecionada
     * @param codigocurso Código do Curso
     * @param nomecurso Nome do Curso
     * @param tipo Tipo de Curso (Licenciatura, Mestrado ou CTESP)
     * @param codigodepart Código do Departamento Associado ao Curso
     * @param departamento Nome do Departamento
     */
    public void setCurriculares(int codigo, String nome, int ano, int codigocurso, String nomecurso, TipoCurso tipo, int codigodepart, String departamento) {
        uc = new UC(codigo, nome, ano, nomecurso, tipo, codigocurso, departamento, codigodepart);
        this.curriculares.add(uc);
    }

    /**
     * Método de associação de gabinetes com o Docente
     * @param numero Número do Gabinete
     * @param telefone Telefone do Gabinete
     * @param nome Nome do Departamento Associado
     * @param codigo Número do Departamento
     */
    public void setGabinetes(int numero, String telefone, String nome, int codigo) {
        Gabinete gabinete = new Gabinete(numero, telefone, nome, codigo,0);
        this.gabinetes.add(gabinete);
    }
    /**
     * Método de adição de telefones ao professor
     * @param telefone Telefone do docente
     */
    public void setTelefones(String telefone){
        this.telefones.add(telefone);
    }
    /**
     * Método de adição de telefones ao departamento
     * @param telefone Telefone do departamento 
     */
    public void setTelefonesDepartamento(String telefone) {
        uc.setTelefone(telefone);
    }
    /**
     * Método de acesso dos telefones do docente
     * @return Lista de Strings com os telefones do docente
     */
    public ArrayList<String> getTelefones(){
        return this.telefones;
    }
    /**
     * Método de acesso dos telefones do departamento
     * @return Lista de Strings com os telefones do departamento
     */
    public ArrayList<String> getTelefonesDepartamento() {
        return uc.getTelefones();
    }
    /**
     * Método utilizado para obter o valor do departamento associado à UC
     * Permite, exteriormente, obter os contactos telefónicos do departamento
     * @return Código do Departamento Associado à UC
     */
    public int getDepartamento(){
        return uc.getCodigoDepart();
    }

    /**
     * Método de acesso ao Número Mecanográfico do Docente
     * @return Número Mecanográfico do Docente
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
     * Método de acesso ao Email do Docente
     * @return Email do Docente
     */
    public String getEmail() {
        return email;
    }

    
    /**
     * Método de acesso à Área Científica do Docente
     * @return Área Científica do Docente
     */
    public String getArea() {
        return area;
    }

    /**
     * Método de acesso à descrição do Docente
     * @return Descrição sobre o Docente
     */
    public String getDescricao() {
        return descricao;
    }

    /**
     * Método de acesso às Unidades Curriculares do Docente
     * @return Unidades Curriculares do Docente
     */
    public ArrayList<UC> getCurriculares() {
        return curriculares;
    }

    /**
     * Método de acesso aos Gabinetes do Docente
     * @return Gabinetes associados ao Docente
     */
    public ArrayList<Gabinete> getGabinetes() {
        return gabinetes;
    }
    /**
     * Método de acesso à Uc através do Curso e Código
     * @param cod
     * @param course
     * @return 
     */
    public UC getUCbyCodeandCourse(int cod, int course){
        for (UC uc: curriculares){
            if (uc.getCodigoUC() == cod && uc.getCodigoCurso() == course){
                return uc;
            }
        }
        return null;
    }
    /**
     * Método de acesso aos telefones dos departamentos pelo código da UC
     * @param cod
     * @return 
     */
    public ArrayList<String> getTelDepartbyCod(int cod) {
        for (UC uc: curriculares) {
            if (uc.getCodigoDepart() == cod){
                return uc.getTelefones();
            }
        }
        return null;
    }
    /**
     * Método utilizado para teste de acesso à informação da BD
     * @return StringBuilder com a informação de cada UC associada ao docente
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Número Mecanográfico: " + this.nmec +
                "\nNome do docente: " + this.nome + 
                "\nEmail: " + this.email +
                "\nArea: " + this.area +
                "\nDescricao: " + this.descricao);
                for (UC a: this.curriculares){
                    sb.append("\nUCs: " + a.toString());
                }
        return sb.toString();
    }
    
    
    
}
