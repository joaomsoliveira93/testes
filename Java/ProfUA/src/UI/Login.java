package UI;

import Data.Perfil;
import Database.ConnectionFactory;
import Database.DatabaseManipulation;
import java.awt.Color;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Classe associada à interface de Login 
 * @author Grupo 4
 */
public class Login extends javax.swing.JDialog {
    DatabaseManipulation bd = new DatabaseManipulation();
    /**
     * Definição de variáveis globais do sistema
     */
    Perfil perfil;
    private String email;
    boolean login;
    /**
     * Construtor da classe Login
     * @param parent
     * @param modal 
     */
    public Login(java.awt.Frame parent, boolean modal) {
        super(parent, modal);
        initComponents();
        this.setModal(true);
        this.setAlwaysOnTop(true);
        EmailField.setText("Email");
        jPasswordField1.setText("Password");
        HidePasswordLabel.setVisible(false);
        HidePasswordLabel.setEnabled(false);
        ErrorMessageLabel.setVisible(false);
        perfil = null;
        login = false;
    }
    /**
     * Método chamado dentro do construtor da classe - Inicialização de todos os componentes de interface
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        ErrorMessageLabel = new javax.swing.JLabel();
        jPasswordField1 = new javax.swing.JPasswordField();
        EmailField = new javax.swing.JTextField();
        LoginButton = new javax.swing.JLabel();
        ShowPasswordLabel = new javax.swing.JLabel();
        HidePasswordLabel = new javax.swing.JLabel();
        CloseButton = new javax.swing.JLabel();
        Background = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setAlwaysOnTop(true);
        setName(""); // NOI18N
        setUndecorated(true);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowOpened(java.awt.event.WindowEvent evt) {
                formWindowOpened(evt);
            }
        });
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        ErrorMessageLabel.setFont(new java.awt.Font("Dialog", 1, 10)); // NOI18N
        ErrorMessageLabel.setForeground(new java.awt.Color(153, 0, 0));
        ErrorMessageLabel.setHorizontalAlignment(javax.swing.SwingConstants.RIGHT);
        ErrorMessageLabel.setText("O email ou password introduzidos estão incorretos!!");
        ErrorMessageLabel.setHorizontalTextPosition(javax.swing.SwingConstants.RIGHT);
        getContentPane().add(ErrorMessageLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(48, 400, 280, 20));

        jPasswordField1.setFont(new java.awt.Font("Dialog", 0, 18)); // NOI18N
        jPasswordField1.setForeground(new java.awt.Color(51, 51, 51));
        jPasswordField1.setHorizontalAlignment(javax.swing.JTextField.RIGHT);
        jPasswordField1.setText(" Password  ");
        jPasswordField1.setBorder(null);
        jPasswordField1.setOpaque(false);
        jPasswordField1.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                jPasswordField1FocusGained(evt);
            }
            public void focusLost(java.awt.event.FocusEvent evt) {
                jPasswordField1FocusLost(evt);
            }
        });
        getContentPane().add(jPasswordField1, new org.netbeans.lib.awtextra.AbsoluteConstraints(48, 357, 280, 40));

        EmailField.setFont(new java.awt.Font("Dialog", 0, 18)); // NOI18N
        EmailField.setForeground(new java.awt.Color(51, 51, 51));
        EmailField.setHorizontalAlignment(javax.swing.JTextField.RIGHT);
        EmailField.setText(" Email  ");
        EmailField.setBorder(null);
        EmailField.setOpaque(false);
        EmailField.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                EmailFieldFocusGained(evt);
            }
            public void focusLost(java.awt.event.FocusEvent evt) {
                EmailFieldFocusLost(evt);
            }
        });
        getContentPane().add(EmailField, new org.netbeans.lib.awtextra.AbsoluteConstraints(47, 270, 280, 40));

        LoginButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                LoginButtonMouseClicked(evt);
            }
        });
        getContentPane().add(LoginButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(273, 451, 55, 55));

        ShowPasswordLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_eye_32px.png"))); // NOI18N
        ShowPasswordLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                ShowPasswordLabelMouseClicked(evt);
            }
        });
        getContentPane().add(ShowPasswordLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(338, 365, 30, 30));

        HidePasswordLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_invisible_32px.png"))); // NOI18N
        HidePasswordLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                HidePasswordLabelMouseClicked(evt);
            }
        });
        getContentPane().add(HidePasswordLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(338, 364, 30, 30));

        CloseButton.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_close_sign_50px_1.png"))); // NOI18N
        CloseButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                CloseButtonMouseClicked(evt);
            }
        });
        getContentPane().add(CloseButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 10, 50, 40));

        Background.setHorizontalAlignment(javax.swing.SwingConstants.RIGHT);
        Background.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/LoginPanel.png"))); // NOI18N
        Background.setHorizontalTextPosition(javax.swing.SwingConstants.CENTER);
        Background.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                BackgroundMouseClicked(evt);
            }
        });
        getContentPane().add(Background, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 375, 667));

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents
    /**
     * Método de definição do email introduzido
     * @param email 
     */
    private void setEmail(String email){
        this.email=email;
    }
    /**
     * Método de obter o email introduzido
     * @return Email introduzido
     */
    public String getEmail(){
        return this.email;
    }
    private void BackgroundMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_BackgroundMouseClicked
        // TODO add your handling code here:
    }//GEN-LAST:event_BackgroundMouseClicked
    /**
     * Método associado ao fechar da interface
     * BOTÃO: Ícone de fecho
     * @param evt 
     */
    private void CloseButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_CloseButtonMouseClicked
        // TODO add your handling code here:
        this.setVisible(false);
        this.jPasswordField1.setText("");
    }//GEN-LAST:event_CloseButtonMouseClicked

    private void formWindowOpened(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowOpened
    }//GEN-LAST:event_formWindowOpened
    /**
     * Método relativo ao clique sobre a área de texto de inserção do email
     * @param evt 
     */
    private void EmailFieldFocusGained(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_EmailFieldFocusGained
        // TODO add your handling code here:
        if (EmailField.getText().trim().equals("Email")) EmailField.setText("");
    }//GEN-LAST:event_EmailFieldFocusGained
    /**
     * Método relativo à perda de foco da área de texto de inserção do email
     * @param evt 
     */
    private void EmailFieldFocusLost(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_EmailFieldFocusLost
        // TODO add your handling code here:
        if (EmailField.getText().isBlank()) {
            EmailField.setText("Email");
        }
    }//GEN-LAST:event_EmailFieldFocusLost
    /**
     * Método relativo ao mostrar a password introduzida
     * @param evt 
     */
    private void ShowPasswordLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ShowPasswordLabelMouseClicked
        // TODO add your handling code here:
        HidePasswordLabel.setVisible(true);
        HidePasswordLabel.setEnabled(true);
        jPasswordField1.setEchoChar((char)0);
        ShowPasswordLabel.setVisible(false);
        ShowPasswordLabel.setEnabled(false);        
    }//GEN-LAST:event_ShowPasswordLabelMouseClicked
    /**
     * Método relativo ao esconder a password introduzida
     * @param evt 
     */
    private void HidePasswordLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_HidePasswordLabelMouseClicked
        // TODO add your handling code here:
        ShowPasswordLabel.setVisible(true);
        ShowPasswordLabel.setEnabled(true); 
        jPasswordField1.setEchoChar((char)42);  /*Valor relativo ao caractere que esconde cada caractere da password //Conseguido pela linha de código seguinte: //(int)jPasswordField1.getEchoChar() //Refere o valor da tabela ASCII relativo ao caractere */
        HidePasswordLabel.setVisible(false);
        HidePasswordLabel.setEnabled(false);
    }//GEN-LAST:event_HidePasswordLabelMouseClicked
    /**
     * Método relativo ao clique sobre a área de texto de inserção da password
     * @param evt 
     */
    private void jPasswordField1FocusGained(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_jPasswordField1FocusGained
        if (jPasswordField1.getText().trim().equals("Password")) jPasswordField1.setText("");
    }//GEN-LAST:event_jPasswordField1FocusGained
    /**
     * Método relativo à perda de foco da área de texto de inserção da password
     * @param evt 
     */
    private void jPasswordField1FocusLost(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_jPasswordField1FocusLost
        if (jPasswordField1.getText().isBlank()) {
            jPasswordField1.setText("Password");
        }
    }//GEN-LAST:event_jPasswordField1FocusLost
    /**
     * Método de execução de login
     * BOTÃO: Login
     * RESULTADO PERANTE LOGIN CORRETO: Fecho da interface
     * RESULTADO PERANTE LOGIN INCORRETO: Apresentação de uma mensagem de erro
     * @param evt 
     */
    private void LoginButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_LoginButtonMouseClicked
        String email, password;
        if ((!EmailField.getText().equals("Email") && !EmailField.getText().trim().isEmpty()) &&
             (!jPasswordField1.equals("Password") && !jPasswordField1.getText().trim().isEmpty())){
            perfil= bd.verificaUser(this.EmailField.getText(), this.jPasswordField1.getText());
         
            if (perfil == null) {
                ErrorMessageLabel.setVisible(true);
            }else {
                if (ErrorMessageLabel.isVisible()) ErrorMessageLabel.setVisible(false);
                login = true;
                this.setEmail(this.EmailField.getText());
                this.CloseButtonMouseClicked(evt);
            }
           
        }        
    }//GEN-LAST:event_LoginButtonMouseClicked
    /**
     * Método Main da Interface de Login
     * @param args Argumentos da linha de comandos
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Login.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Login.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Login.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Login.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the dialog */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                Login dialog = new Login(new javax.swing.JFrame(), true);
                dialog.addWindowListener(new java.awt.event.WindowAdapter() {
                    @Override
                    public void windowClosing(java.awt.event.WindowEvent e) {
                        System.exit(0);
                    }
                });
                dialog.setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel Background;
    private javax.swing.JLabel CloseButton;
    private javax.swing.JTextField EmailField;
    private javax.swing.JLabel ErrorMessageLabel;
    private javax.swing.JLabel HidePasswordLabel;
    private javax.swing.JLabel LoginButton;
    private javax.swing.JLabel ShowPasswordLabel;
    private javax.swing.JPasswordField jPasswordField1;
    // End of variables declaration//GEN-END:variables
}
