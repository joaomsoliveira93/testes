package Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Classe de Ligação à Base de Dados
 * @author Grupo 4
 */
public class ConnectionFactory {
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String URL = "jdbc:mysql://johnnycorp.online:3306/profua?useTimezone=true&serverTimezone=UTC";
    private static final String USER = "admin";
    private static final String PASSWORD = "JohnnyServerMySql2023#";
    /**
     * Método de criação da conexão à BD
     * @return Conexão efetuada
     */
    public static Connection getConnection() {
        try {
            Class.forName(DRIVER);            
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException ex) {
            throw new RuntimeException("Erro na conexão com a base de dados!" + ex, ex);
        } catch (SQLException ex) {
            System.out.println("SQLState: " + ex.getSQLState());
            throw new RuntimeException("Erro", ex);
        }
    }
    /**
     * Método de fecho da conexão
     * @param connect Conexão iniciada anteriormente
     */
    public static void closeConnection(Connection connect){
        try {
            if (connect != null) {
                connect.close();
            }   
        } catch (SQLException ex) {
            throw new RuntimeException("Erro no término da conexão com a base de dados!", ex);
        }
    }
    /**
     * Método de fecho da conexão
     * @param connect Conexão iniciada anteriormente
     * @param statement Query declarada anteriormente
     */
    public static void closeConnection(Connection connect, PreparedStatement statement){
        try {
            closeConnection(connect);
            if (statement != null) {
                statement.close();
            }   
        } catch (SQLException ex) {
            throw new RuntimeException("Erro no término da conexão com a base de dados!", ex);
        }
    }
    /**
     * Método de fecho da conexão
     * @param connect Conexão iniciada anteriormente
     * @param statement Query declarada anteriormente
     * @param set Resultado declarado anteriormente
     */
    public static void closeConnection(Connection connect, PreparedStatement statement, ResultSet set){
        try {
            closeConnection(connect, statement);
            if (set != null) {
                set.close();
            }   
        } catch (SQLException ex) {
            throw new RuntimeException("Erro no término da conexão com a base de dados!", ex);
        }
    }
}
