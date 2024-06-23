package Database;

import Data.Curso;
import Data.Departamento;
import Data.Gabinete;
import Data.Professor;
import Data.Perfil;
import Data.ProfessorTable;
import Data.TipoCurso;
import Data.UC;
import UI.Login;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Classe associada à manipulação da base de dados
 * MEMBROS: Métodos relativos a queries à base de dados
 * RETURNS: Informação recolhida da BD
 * @author Grupo 4
 */
public class DatabaseManipulation {
    /**
     * Pesquisa de informação a apresentar na pesquisa principal
     * @param pesquisa Informação colocada no motor de busca
     * @return Lista de Professores resultantes da pesquisa
     */
    public ArrayList<ProfessorTable> selectdocente(String pesquisa){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        
        ArrayList<ProfessorTable> professores = new ArrayList<>();
        try {
            statement = connection.prepareCall("{CALL PesquisaGeral(?)}");
            statement.setString(1, pesquisa);
            result = statement.executeQuery();
            while (result.next()) {
                ProfessorTable prof = new ProfessorTable(result.getInt("Número Mecanográfico"),
                result.getString("Docente"),result.getString("UC"), result.getString("Departamento"),result.getString("Curso"));
                professores.add(prof);
            }
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
        return professores;
    }
    
    
    /**
     * Método de recolha de informação sobre docentes aos quais estão associadas UC's
     * @param nmec Número Mecanográfico
     * @return Professor criado com a informação da BD relativa ao professor cujo número mecanográfico entra como parâmetro
     */
    public Professor infodocente (int nmec){
        Professor prof = null;
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result= null;
        try {
            statement = connection.prepareCall("{CALL InfoProfessor(?)}");
            statement.setString(1, String.valueOf(nmec));
            result = statement.executeQuery();
            while (result.next()){
                if (result.isFirst()) {
                    prof = new Professor(nmec, result.getString("Docente"), result.getString("Email"),
                        result.getString("Area"), result.getString("Descricao"));
                }
                TipoCurso tipo = null;
                if (result.getString("Tipo").equals("Licenciatura")) tipo = TipoCurso.LICENCIATURA;
                if (result.getString("Tipo").equals("Mestrado")) tipo = TipoCurso.MESTRADO;
                if (result.getString("Tipo").equals("CTESP")) tipo = TipoCurso.CTESP; 
                
                prof.setCurriculares(result.getInt("Cod. UC"), result.getString("UC"),
                    result.getInt("Ano"), result.getInt("Cod. Curso"), result.getString("Curso"),
                    tipo, result.getInt("Num. Departamento"), result.getString("Departamento")
                );
                this.contactosdepartamento(prof.getDepartamento(), prof);
            }
            this.gabineteprofessor(prof);
            this.contactosdocente(nmec, prof);
        } catch (SQLException ex) {} finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
        return prof;
    }
    /**
     * Método de recolha de informação sobre os contactos do docente
     * @param nmec Número Mecanográfico
     * @param prof Objeto da classe Professor no qual se irá guardar a informação dos contactos
     */
    private void contactosdocente(int nmec, Professor prof){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            statement = connection.prepareCall("{CALL ContactoDocente(?)}");
            statement.setInt(1, nmec);
            result = statement.executeQuery();
            while (result.next()){
                if (result.getString("Contacto")!=null) {
                    prof.setTelefones(result.getString("Contacto"));
                }
            }
        } catch (SQLException e){} finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de recolha de informação sobre os contactos do departamento
     * @param depart Número do departamento
     * @param prof Objeto da classe Professor no qual se irá guardar a informação dos contactos
     */
    private void contactosdepartamento(int depart, Professor prof){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            statement = connection.prepareCall("{CALL ContactoDepartamento(?)}");
            statement.setInt(1, depart);
            result = statement.executeQuery();
            while (result.next()){
                prof.setTelefonesDepartamento(result.getString("Contacto"));
            }
        } catch (SQLException e){} finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de recolha de informação sobre os gabinetes associados ao docente
     * @param prof Objeto da classe Professor no qual se irá guardar a informação dos contactos
     */
    private void gabineteprofessor(Professor prof){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            
            statement = connection.prepareCall("{CALL InfoGabinete(?)}");
            statement.setInt(1, prof.getNmec());
            result = statement.executeQuery();
            while (result.next()){
                prof.setGabinetes(result.getInt("Gabinete"), result.getString("Tel. Gabinete"), result.getString("Nome do Departamento"), result.getInt("Departamento"));
            }
        } catch (SQLException ex) {}finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }

    /**
     * Método de recolha de informação sobre o docente sem UC associadas
     * @param nmec Número Mecanográfico
     * @return Objeto da classe Professor onde foi armazenada toda a informação
     */
    public Professor infodocentesemuc(int nmec) {
        Professor prof =  null;
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            statement = connection.prepareCall("{CALL InfoProfessorSemUC(?)}");
            statement.setInt(1, nmec);
            result = statement.executeQuery();
            while (result.next()){
                if (result.isFirst()) {
                    prof = new Professor(nmec, result.getString("Nome"), result.getString("Email"),
                        result.getString("Area"), result.getString("Descricao"));
                }
                prof.setCurriculares(-1, null,-1, -1, null, null, result.getInt("Num. Departamento"), result.getString("Nome Departamento"));
                this.contactosdepartamento(result.getInt("Num. Departamento"), prof);
            }
            this.contactosdocente(nmec, prof);
            System.out.println(nmec);
            this.gabineteprofessor(prof);
        } catch (SQLException ex){}finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        } 
        return prof;
    }
    
    /**
     * Método de recolha de informação sobre o curso pelo qual o docente responsável
     * @param nmec Número Mecanográfico
     * @return Texto com informação do curso responsável
     */
    public String cursoresponsavel(int nmec){
        Curso responsavel =  null;
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            statement = connection.prepareCall("{CALL InfoResponsavel(?)}");
            statement.setInt(1, nmec);
            result = statement.executeQuery();
            while (result.next()){
                TipoCurso tipo = null;
                if (result.getString("Tipo de Curso").equals("Licenciatura")) tipo = TipoCurso.LICENCIATURA;
                if (result.getString("Tipo de Curso").equals("Mestrado")) tipo = TipoCurso.MESTRADO;
                if (result.getString("Tipo de Curso").equals("CTESP")) tipo = TipoCurso.CTESP;
                responsavel = new Curso(result.getString("Nome do Curso"), tipo, result.getInt("Cod. Curso"), result.getString("Nome Departamento"), result.getInt("Departamento"));
            }
        } catch (SQLException ex){}finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        } 
        return responsavel.infoCurso();
    }
    /**
     * Método de inserção de um utilizador
     * NOTA: A palavra passe é definida automaticamente, assumindo o valor do email
     * @param email Email do utilizador
     * @param perf Perfil do utilizador
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public Boolean insereUtilizador(String email, Perfil perf){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL InsertUtilizador(?,?,?)}");
            statement.setString(1, email);
            statement.setString(2, email);
            statement.setString(3, String.valueOf(perf).toLowerCase());
            statement.executeUpdate();
            ConnectionFactory.closeConnection(connection, statement);
            return true;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(connection, statement);
            return false;
        } 
    }
    /**
     * Método de inserção de um docente
     * @param nMec Número Mecanográfico
     * @param nome Nome do docente
     * @param email Email do docente
     * @param area Área do docente
     * @param descricao Descrição do docente
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereDocente(int nMec, String nome, String email, String area, String descricao){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        
        try{
            stat = con.prepareCall("{CALL InsertDocente(?,?,?,?,?)}");
            stat.setInt(1, nMec);
            stat.setString(2, nome);
            stat.setString(3, email);
            stat.setString(4, area);
            stat.setString(5, descricao);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        }
    }
    /**
     * Método de inserção de um departamento
     * @param nome Nome do departamento
     * @param num Número do departamento
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereDepartamento(String nome, int num){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertDepartamento(?,?)}");
            stat.setString(1, nome);
            stat.setInt(2, num);            
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        } 
    }
    /**
     * Método de inserção de um curso
     * @param cod Código do curso
     * @param nome Nome do curso
     * @param dep Número do departamento assocaido ao curso
     * @param resp Número Mecanográfico do Responsável
     * @param tipo Tipo de Curso (Licenciatura, Mestrado ou CTeSP)
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereCurso(int cod, String nome,int dep,int resp,TipoCurso tipo){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertCurso(?,?,?,?,?)}");
            stat.setInt(1, cod);
            stat.setString(2, nome);
            stat.setInt(3, dep);
            stat.setInt(4, resp); 
            if(tipo == TipoCurso.CTESP)
                stat.setString(5, "CTESP");
            else if(tipo == TipoCurso.LICENCIATURA)
                stat.setString(5, "Licenciatura");
            else
                stat.setString(5, "Mestrado");
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        } 
    }
    /**
     * Método de inserção de uma relação entre um docente e um departamento 
     * Utilizado para docentes aos quais não estão associadas UCs
     * @param docente Número Mecanográfico do docente
     * @param dep Número do departamento
     */
    public void insereDepartamentoDocente(int docente, int dep){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertDepartamentoDocente(?,?)}");
            stat.setInt(1, docente);
            stat.setInt(2, dep);
            stat.executeUpdate();
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de inserção de uma relação entre um docente e um gabinete
     * @param docente Número Mecanográfico do docente
     * @param gabinete Número do departamento
     */
    public void insereDocenteGabinte(int docente, int gabinete){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertDocenteGabinete(?,?)}");
            stat.setInt(1, docente);
            stat.setInt(2, gabinete);
            stat.executeUpdate();
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de inserção de uma relação entre um docente e uma Unidade Curricular
     * @param docente Número Mecanográfico do docente
     * @param uc Código da UC
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereDocenteUC(int docente, int uc){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertDocenteUC(?,?)}");
            stat.setInt(1, docente);
            stat.setInt(2, uc);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        } 
    }
    /**
     * Método de inserção de um gabinete
     * @param num Número do gabinete
     * @param dep Número do departamento associado
     * @param telefone Telefone do Gabinete
     */
    public void insereGabinete(int num,int dep,String telefone){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertGabinete(?,?,?)}");
            stat.setInt(1, num);
            stat.setInt(2, dep);
            stat.setString(3, telefone);
            stat.executeUpdate();
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de pesquisa sobre a informação de um utilizador
     * A utilizar na interface de administração
     * @param email Email do utilizador
     * @return O tipo de perfil do utilizador (Básico ou Administrativo)
     */
    public Perfil procuraUser(String email){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        String resultEmail = "";
       
        try {
            statement = connection.prepareCall("{CALL InfoUtilizador(?)}");
            statement.setString(1, email);
            result = statement.executeQuery();
            while (result.next()) {
                resultEmail = result.getString("Perfil");
            }
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
        if(resultEmail.equals("basico"))
            return Perfil.BASICO;
        else if (resultEmail.equals("admin"))
            return Perfil.ADMIN;
        else
            return null;
    }
    /**
     * Método de alterar a informação de um utiizador
     * @param email Email do utilizador
     * @param perf Perfil do utilizador
     */
    public void updateUtilizador(String email, Perfil perf){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL EditUtilizador(?,?)}");
            statement.setString(1, email);
            statement.setString(2, String.valueOf(perf).toLowerCase());
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de remoção de um utilizador
     * @param email Email do utilizador a remover
     */
    public void delUtilizador(String email){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL DeleteUtilizador(?)}");
            statement.setString(1, email);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de alteração da password do utilizador
     * @param email Email do utilizador
     * @param password Password nova
     */
    public void mudaPassUtilizador(String email,String password){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL EditPassword(?,?)}");
            statement.setString(1, email);
            statement.setString(2, password);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de procura de departamento
     * @param num Número do departamento
     * @return Objeto da classe Departamento com a respetiva informação
     */
    public Departamento procuraDepartamento(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        Departamento d = new Departamento("teste",0);
        try {
            statement = connection.prepareCall("{CALL InfoDepartamento(?)}");
            statement.setInt(1, num);
            result = statement.executeQuery();
            
            while (result.next()) {
                if(d.getNomeDepartamento().equals("teste"))
                    d =  new Departamento(result.getString("Nome"),result.getInt("Codigo"));
                d.setTelefone(result.getString("Número"));
            }
            return d;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de alterar a informação de um departamento
     * @param num Número do departamento
     * @param nome Nome do departamento
     */
    public void updateDepartamento(int num,String nome){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL EditDepartamento(?,?)}");
            statement.setString(1, nome);
            statement.setInt(2, num);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de remoção de um departamento
     * @param num Número do Departamento
     */
    public void delDepartamento(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL DeleteDepartamento(?)}");
            statement.setInt(1, num);
            statement.executeUpdate();           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de inserção de um telefone a um departamento
     * @param num Número do departamento
     * @param tel Número de Telefone
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereTelDepartamento(int num, String tel){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertTelDepartamento(?,?)}");
            stat.setInt(1, num);
            stat.setString(2, tel);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        }
    }
    /**
     * Método de remoção de um telefone de um departamento
     * @param num Número do Departamento
     * @param tel Número de Telefone
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean delTelDepartamento(int num, String tel){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL DeleteTelDepartamento(?,?)}");
            stat.setInt(1, num);
            stat.setString(2, tel);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        }
    }
    /**
     * Método de procura de todos os departamentos
     * @return Lista de objetos da classe Departamento, com a informação sobre cada departamento
     */
    public ArrayList<Departamento> allDepartamentos(){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        ArrayList<Departamento> d = new ArrayList();
        try {
            statement = connection.prepareCall("{CALL AllDepartamentos()}");         
            result = statement.executeQuery();
            
            while (result.next()) {             
                Departamento t =  new Departamento(result.getString("Nome"),result.getInt("Codigo"));
                d.add(t);
            }
            return d;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de procura de um docente
     * @param num Número Mecanográfco do docente em questão
     * @return Objeto da classe Professor
     */
    public Professor procuraDocente(int num){
       Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        Professor p = null;
        try {
            statement = connection.prepareCall("{CALL InfoDocente(?)}"); 
            statement.setInt(1, num);
            result = statement.executeQuery();
            
            while (result.next()) {             
                p =  new Professor(num,result.getString("Docente"),result.getString("Email"),result.getString("Area"),result.getString("Descricao"));
            }
            
            this.gabineteprofessor(p);
            this.contactosdocente(num, p);          
             
            return p;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de procura de um curso
     * @param num Código do curso
     * @return Objeto da classe Curso
     */
    public Curso procuraCurso(int num){
       Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        Curso c = null;
        try {
            statement = connection.prepareCall("{CALL InfoCurso(?)}"); 
            statement.setInt(1, num);
            result = statement.executeQuery();
            
            while (result.next()) { 
                String t= result.getString("Tipo");
                TipoCurso tipo;
                if(t.equals( "CTESP"))
                    tipo = TipoCurso.CTESP;
                else if(t.equals("Licenciatura"))
                    tipo = TipoCurso.LICENCIATURA;
                else
                    tipo = TipoCurso.MESTRADO;
                c =  new Curso(result.getString("Nome"),tipo,num,"",Integer.parseInt(result.getString("Departamento")));
                c.setResp(Integer.parseInt(result.getString("Responsavel")));
            }
            return c;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de alteração de um curso
     * @param num Código do Curso
     * @param nome Nome do Curso
     * @param codDep Número do Departamento
     * @param codResp Número do Docente Responsável
     * @param tipo Tipo de curso - Enumerado TipoCurso.java
     */
    public void updateCurso(int num,String nome,int codDep,int codResp,String tipo){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL EditCurso(?,?,?,?,?)}");
            statement.setInt(1, num);
            statement.setString(2, nome);
            statement.setInt(3, codDep);
            statement.setInt(4, codResp);
            statement.setString(5, tipo);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
   /**
    * Método de remoção de um curso
    * @param num Código do curso
    */
    public void delCurso(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL DeleteCurso(?)}");
            statement.setInt(1, num);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de procura de uma Unidade Curricular
     * @param num Código da Unidade Curricular
     * @return Lista de objetos da classe UC
     */
    public ArrayList<UC> procuraUC(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        ArrayList<UC> uc = new ArrayList<>();
        try {
            statement = connection.prepareCall("{CALL InfoUC(?)}"); 
            statement.setInt(1, num);
            result = statement.executeQuery();
            
            while (result.next()) {               
                uc.add(new UC(result.getInt("Codigo"),result.getString("Nome"),result.getInt("Ano Curricular"),result.getString("Nome Curso"),TipoCurso.CTESP,result.getInt("Cod. Curso"),result.getString("Nome Curso"),0));
            }
            
            return uc;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }    
    /**
     * Método de procura de uma UC vazia
     * @param num Código da UC
     * @return Texto com informação do nome da UC
     */
    public String procuraUCVazia(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        String nome="";
        try {
            statement = connection.prepareCall("{CALL InfoUCVazia(?)}"); 
            statement.setInt(1, num);
            result = statement.executeQuery();          
            
            while (result.next()) {               
                nome=result.getString("Nome");
            }
            
            return nome;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return nome;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }    
    /**
     * Método de procura de uma relação entre um docente e uma UC
     * @param codUc Código da UC
     * @return Lista de Professores associados a uma UC
     */      
    public ArrayList<Professor> procuraDocenteUC(int codUc){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        ArrayList<Professor> p = new ArrayList<>();
        try {
            statement = connection.prepareCall("{CALL InfoDocenteUC(?)}"); 
            statement.setInt(1, codUc);
            result = statement.executeQuery();
            
            while (result.next()) {                  
                p.add(new Professor(result.getInt("Numero"),result.getString("Nome"),"","",""));
            }
            return p;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de inserção de uma UC
     * @param num Código da UC
     * @param nome Nome da UC
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereUC(int num,String nome){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertUC(?,?)}");
            stat.setInt(1, num);
            stat.setString(2, nome);            
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        } 
    }
    /**
     * Método de allteração de uma UC
     * @param num Código da UC
     * @param nome Nome da UC
     */
    public void updateUC(int num,String nome){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL EditUC(?,?)}");
            statement.setInt(1, num);
            statement.setString(2, nome);
            statement.executeUpdate();           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de remoção de uma UC
     * @param num Código da UC
     */
    public void delUc(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL DeleteUC(?)}");
            statement.setInt(1, num);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de pesquisa de todos os cursos
     * @return Lista de objetos da classe Curso
     */
    public ArrayList<Curso> allCursos(){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        ArrayList<Curso> cursos = new ArrayList();
        try {
            statement = connection.prepareCall("{CALL AllCursos()}");         
            result = statement.executeQuery();
            
            while (result.next()) {             
                Curso c =  new Curso(result.getString("Nome"),TipoCurso.CTESP,result.getInt("Codigo"),"",0);
                cursos.add(c);
            }
            return cursos;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de Inserção de uma relação entre uma UC e um Curso, resultante num ano curricular
     * @param uc Código da UC
     * @param curso Código do Curso
     * @param ano Ano Curricular da UC no Curso
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereAno(int uc, int curso, int ano){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertAno(?,?,?)}");
            stat.setInt(1, uc);
            stat.setInt(2, curso);
            stat.setInt(3, ano);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        }
    }
    /**
     * Método de remoção da associação entre uma UC e um Curso
     * @param uc Código da UC
     * @param curso Código do Curso
     * @param ano Ano Curricular da UC no Curso
     */
    public void delAno(int uc, int curso, int ano){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL DeleteAno(?,?,?)}");
            stat.setInt(1, uc);
            stat.setInt(2, curso);
            stat.setInt(3, ano);
            stat.executeUpdate();            
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);      
        }finally{
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de remoção de um docente associado a uma UC
     * @param uc Código da UC
     * @param num Número Mecanográfico do Docente
     */
    public void delDocenteUc(int uc, int num){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL DeleteDocenteUC(?,?)}");
            stat.setInt(1, uc);
            stat.setInt(2, num);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de procura de um gabinete
     * @param num Número do Gabinete
     * @return Lista de Objetos da Classe Gabinete
     */
    public ArrayList<Gabinete> procuraGabinete(int num){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        ArrayList<Gabinete> g = new ArrayList<>();
        try {
            statement = connection.prepareCall("{CALL InfoGabinete(?)}"); 
            statement.setInt(1, num);
            result = statement.executeQuery();
            
            while (result.next()) {                  
                g.add(new Gabinete(result.getInt("Gabinete"),result.getString("Tel. Gabinete"),result.getString("Nome do Departamento"),result.getInt("Departamento"),0));
            }
            return g;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de alteração de um docente
     * @param num Número Mecanográfico do docente
     * @param nome Nome do Docente
     * @param mail Email do Docente
     * @param area Área do Docente
     * @param desc Descrição do Docente
     */
    public void updateDocente(int num,String nome,String mail,String area,String desc){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        try {
            statement = connection.prepareCall("{CALL EditDocente(?,?,?,?,?)}");
            statement.setInt(1, num);
            statement.setString(2, nome);
            statement.setString(3, mail);
            statement.setString(4, area);
            statement.setString(5, desc);
            statement.executeUpdate();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(connection, statement);
        }
    }
    /**
     * Método de remoção de um docente
     * @param num Número Mecanográfico do docente
     */
    public void delDocente( int num){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL DeleteDocente(?)}");
            stat.setInt(1, num);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de inserção de um telefone a um docente
     * @param docente Número Mecanográfico do Docente
     * @param tel Número de telefone
     * @return Verdadeiro ou Falso - Depende da possibilidade de inserção ou não
     */
    public boolean insereTelefoneDocente(int docente, String tel){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL InsertTelDocente(?,?)}");
            stat.setInt(1, docente);
            stat.setString(2, tel);
            stat.executeUpdate();
            ConnectionFactory.closeConnection(con, stat);
            return true;
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            ConnectionFactory.closeConnection(con, stat);
            return false;
        } 
    }
    /**
     * Método de remoção do telefone de um docente
     * @param num Número Mecanográfico do Docente
     * @param tel Número de Telefone
     */
    public void delTelDoc(int num, String tel){
       Connection con = ConnectionFactory.getConnection();
       PreparedStatement stat = null;
       try{
           stat = con.prepareCall("{CALL DeleteTelDocente(?,?)}");
           stat.setInt(1, num);
           stat.setString(2, tel);
           stat.executeUpdate();
           ConnectionFactory.closeConnection(con, stat);

       }catch(SQLException ex){
           Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
           ConnectionFactory.closeConnection(con, stat);

       }
    }
    /**
     * Método de procura de gabinetes associados a um departamento 
     * @param dep Número do Departamento
     * @return Lista de objetos da classe Gabinete
     */
    public ArrayList<Gabinete> procuraGabineteDep(int dep){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        ArrayList<Gabinete> g = new ArrayList<>();
        try {
            statement = connection.prepareCall("{CALL InfoGabineteSala(?)}"); 
            statement.setInt(1, dep);
            result = statement.executeQuery();
            
            while (result.next()) {                  
                g.add(new Gabinete(result.getInt("Sala"),result.getString("Telefone"),"",result.getInt("Departamento"),0));
            }
            return g;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de procura do índice de um gabinete
     * @param dep Número do Departamento
     * @param sala Número do Gabinete
     * @return Valor do Índice do gabinete
     */ 
    public int procuraGabineteIndice(int dep,int sala){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            
            statement = connection.prepareCall("{CALL InfoGabineteIndice(?,?)}"); 
            statement.setInt(1, dep);
            statement.setInt(2, sala);
            result = statement.executeQuery();
            while(result.next()){
                return result.getInt("Indice");
            }
            return -1;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return -1;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de procura de gabinete
     * @param dep Número do Departamento 
     * @param sala Número do Gabinete
     * @return 
     */
    public Gabinete procuraGabinete(int dep,int sala){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
            
            statement = connection.prepareCall("{CALL InfoGabineteIndice(?,?)}"); 
            statement.setInt(1, dep);
            statement.setInt(2, sala);
            result = statement.executeQuery();
            while(result.next()){
                return new Gabinete(sala,result.getString("Telefone"),"",dep,-1);
            }
            return null;
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
    }
    /**
     * Método de remoção do gabinete de um docente
     * @param num Número Mecanográfico do Docente
     * @param indice Indíce do Gabinete
     */
    public void delGabDoc(int num, int indice){
       Connection con = ConnectionFactory.getConnection();
       PreparedStatement stat = null;
       try{
           stat = con.prepareCall("{CALL DeleteGabineteDocente(?,?)}");
           stat.setInt(1, num);
           stat.setInt(2, indice);
           stat.executeUpdate();
           ConnectionFactory.closeConnection(con, stat);

       }catch(SQLException ex){
           Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
           ConnectionFactory.closeConnection(con, stat);

       }
    }
    /**
     * Método de alteração do gabinete
     * @param num Número do Gabinete
     * @param dep Número do Departamento 
     * @param telefone Número de Telefone
     */
    public void updateGabinete(int num,int dep,String telefone){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL EditGabinete(?,?,?)}");
            stat.setInt(1, num);
            stat.setInt(2, dep);
            stat.setString(3, telefone);
            stat.executeUpdate();
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de remoção de um gabinete
     * @param num Número do Gabinete
     * @param dep Número do Departamento
     */
    public void delGabinte(int num,int dep){
        Connection con = ConnectionFactory.getConnection();
        PreparedStatement stat = null;
        try{
            stat = con.prepareCall("{CALL DeleteGabinete(?,?)}");
            stat.setInt(1, num);
            stat.setInt(2, dep);
            stat.executeUpdate();
        }catch(SQLException ex){
            Logger.getLogger(DatabaseManipulation.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            ConnectionFactory.closeConnection(con, stat);
        }
    }
    /**
     * Método de verificação do login
     * @param email Email do utilizador
     * @param password Password do utilizador
     * @return O perfil do utilizador inserido ou null caso o utilizador ou a password não existam/estejam corretos
     */
    public Perfil verificaUser(String email,String password){
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        try {
               statement = connection.prepareCall("CALL LoginVerificacao(?,?)");
               statement.setString(1, email);
               statement.setString(2, password);
               result = statement.executeQuery();                 
               if (!result.next()) {
                   return null;
               }
               else {
                   String p = result.getString("perfil");
                   if(p.equals("basico")) return Perfil.BASICO;
                   if (p.equals("admin"))return Perfil.ADMIN;
               }
           } catch (SQLException ex) {
               Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
               return null;
           } finally {
                ConnectionFactory.closeConnection(connection, statement, result);
           }
        return null;
    }
    /**
     * Método de registo na aplicação da informação de um docente
     * @param nmec Número Mecanográfico
     * @return Objeto da Classe Professor com a informação relativa ao professor selecionado
     */
    public Professor infoAddDocente (int nmec){
        Professor prof = null;
        Connection connection = ConnectionFactory.getConnection();
        PreparedStatement statement = null;
        ResultSet result= null;
        try {
            statement = connection.prepareCall("{CALL InfoDocente(?)}");
            statement.setString(1, String.valueOf(nmec));
            result = statement.executeQuery();
            while (result.next()){
                if (result.isFirst()) {
                    prof = new Professor(nmec, result.getString("Docente"), result.getString("Email"),
                        result.getString("Area"), result.getString("Descricao"));
                }
                TipoCurso tipo = null;
                if (result.getString("Tipo").equals("Licenciatura")) tipo = TipoCurso.LICENCIATURA;
                if (result.getString("Tipo").equals("Mestrado")) tipo = TipoCurso.MESTRADO;
                if (result.getString("Tipo").equals("CTESP")) tipo = TipoCurso.CTESP; 
                
                prof.setCurriculares(result.getInt("Cod. UC"), result.getString("UC"),
                    result.getInt("Ano"), result.getInt("Cod. Curso"), result.getString("Curso"),
                    tipo, result.getInt("Num. Departamento"), result.getString("Departamento")
                );
                this.contactosdepartamento(prof.getDepartamento(), prof);
            }
            this.gabineteprofessor(prof);
            this.contactosdocente(nmec, prof);
        } catch (SQLException ex) {} finally {
            ConnectionFactory.closeConnection(connection, statement, result);
        }
        return prof;
    }
     
}