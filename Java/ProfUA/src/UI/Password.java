package UI;

import Data.Perfil;
import Database.ConnectionFactory;
import Database.DatabaseManipulation;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

/**
 * Classe relativa à interface de alteração da password
 * @author Grupo 4
 */
public class Password extends javax.swing.JDialog {
    private String email;
    DatabaseManipulation bd = new DatabaseManipulation();
    /**
     * Construtor da interface de alteração da password
     */
    public Password(java.awt.Frame parent, boolean modal) {
        
        super(parent, modal);
        initComponents();
        this.setAlwaysOnTop(true);
        this.setModal(true);
    }

    /**
     * Método chamado dentro do construtor da classe - Inicialização de todos os componentes de interface
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        closeLabel = new javax.swing.JLabel();
        hidePasswordLabel = new javax.swing.JLabel();
        showPasswordLabel = new javax.swing.JLabel();
        hideNovaLabel = new javax.swing.JLabel();
        showNovaLabel = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        jLabel3 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
        atualPasswordField = new javax.swing.JPasswordField();
        novaPasswordField = new javax.swing.JPasswordField();
        repetePasswordField = new javax.swing.JPasswordField();
        jButton1 = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setBackground(new java.awt.Color(51, 153, 0));
        setUndecorated(true);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowOpened(java.awt.event.WindowEvent evt) {
                formWindowOpened(evt);
            }
        });

        jPanel1.setBackground(new java.awt.Color(51, 153, 0));
        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        closeLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_close_sign_50px_1.png"))); // NOI18N
        closeLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        closeLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                closeLabelMouseClicked(evt);
            }
        });
        jPanel1.add(closeLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(300, 10, -1, -1));

        hidePasswordLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_invisible_32px.png"))); // NOI18N
        hidePasswordLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        hidePasswordLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                hidePasswordLabelMouseClicked(evt);
            }
        });
        jPanel1.add(hidePasswordLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 90, -1, -1));

        showPasswordLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_eye_32px.png"))); // NOI18N
        showPasswordLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        showPasswordLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                showPasswordLabelMouseClicked(evt);
            }
        });
        jPanel1.add(showPasswordLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 90, -1, -1));

        hideNovaLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_invisible_32px.png"))); // NOI18N
        hideNovaLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        hideNovaLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                hideNovaLabelMouseClicked(evt);
            }
        });
        jPanel1.add(hideNovaLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 120, -1, -1));

        showNovaLabel.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_eye_32px.png"))); // NOI18N
        showNovaLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        showNovaLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                showNovaLabelMouseClicked(evt);
            }
        });
        jPanel1.add(showNovaLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 120, -1, -1));

        jPanel2.setBackground(new java.awt.Color(51, 153, 0));

        jLabel3.setText("Repita Nova Palavra-Passe");

        jLabel2.setText("Nova Palavra-Passe");

        jLabel1.setText("Palavra-Passe atual");

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel1)
                    .addComponent(jLabel2)
                    .addComponent(jLabel3))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(atualPasswordField)
                    .addComponent(novaPasswordField)
                    .addComponent(repetePasswordField, javax.swing.GroupLayout.DEFAULT_SIZE, 137, Short.MAX_VALUE))
                .addContainerGap())
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(15, 15, 15)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(atualPasswordField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(novaPasswordField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2))
                .addGap(9, 9, 9)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel3)
                    .addComponent(repetePasswordField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(24, Short.MAX_VALUE))
        );

        jPanel1.add(jPanel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(30, 80, 290, 120));

        jButton1.setText("Alterar Palavra-Passe");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });
        jPanel1.add(jButton1, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 210, -1, -1));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, 373, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, 308, javax.swing.GroupLayout.PREFERRED_SIZE)
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents
    /**
     * Método de definição do email introduzido
     * @param email 
     */
    public void setEmail(String email){
        this.email=email;
    }
    private void closeLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_closeLabelMouseClicked
        this.dispose();
    }//GEN-LAST:event_closeLabelMouseClicked
    /**
     * Método relativo ao mostrar a password introduzida
     * @param evt 
     */
    private void showPasswordLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_showPasswordLabelMouseClicked
        hidePasswordLabel.setVisible(true);
        atualPasswordField.setEchoChar((char)0);
        showPasswordLabel.setVisible(false); 
    }//GEN-LAST:event_showPasswordLabelMouseClicked
    /**
     * Método relativo ao esconder a password introduzida
     * @param evt 
     */
    private void hidePasswordLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_hidePasswordLabelMouseClicked
        showPasswordLabel.setVisible(true);
        atualPasswordField.setEchoChar((char)42);  /*Valor relativo ao caractere que esconde cada caractere da password //Conseguido pela linha de código seguinte: //(int)jPasswordField1.getEchoChar() //Refere o valor da tabela ASCII relativo ao caractere */
        hidePasswordLabel.setVisible(false);
    }//GEN-LAST:event_hidePasswordLabelMouseClicked
    private void formWindowOpened(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowOpened
        hidePasswordLabel.setVisible(false);    
        hideNovaLabel.setVisible(false);
    }//GEN-LAST:event_formWindowOpened
    /**
     * Método relativo ao esconder a password introduzida
     * @param evt 
     */
    private void hideNovaLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_hideNovaLabelMouseClicked
        showNovaLabel.setVisible(true);
        novaPasswordField.setEchoChar((char)42);  /*Valor relativo ao caractere que esconde cada caractere da password //Conseguido pela linha de código seguinte: //(int)jPasswordField1.getEchoChar() //Refere o valor da tabela ASCII relativo ao caractere */
        hideNovaLabel.setVisible(false);
    }//GEN-LAST:event_hideNovaLabelMouseClicked
    /**
     * Método relativo ao mostrar a password introduzida
     * @param evt 
     */
    private void showNovaLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_showNovaLabelMouseClicked
        hideNovaLabel.setVisible(true);
        novaPasswordField.setEchoChar((char)0);
        showNovaLabel.setVisible(false); 
    }//GEN-LAST:event_showNovaLabelMouseClicked
    /**
     * Método de seleção da opção de alteração da password
     * @param evt 
     */
    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        if(this.novaPasswordField.getText().equals(this.repetePasswordField.getText())){
            
            if(!(bd.verificaUser(this.email, this.atualPasswordField.getText())==null)){
                bd.mudaPassUtilizador(email,this.novaPasswordField.getText());
                this.atualPasswordField.setText("");
                this.novaPasswordField.setText("");
                this.repetePasswordField.setText("");
            }
        }else{
            JOptionPane.showMessageDialog(this,"As palavras-passe não coincidem!");            
            this.novaPasswordField.setText("");
            this.repetePasswordField.setText("");
        }            
    }//GEN-LAST:event_jButton1ActionPerformed

    /**
     * @param args the command line arguments
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
            java.util.logging.Logger.getLogger(Password.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Password.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Password.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Password.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the dialog */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                Password dialog = new Password(new javax.swing.JFrame(), true);
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
    private javax.swing.JPasswordField atualPasswordField;
    private javax.swing.JLabel closeLabel;
    private javax.swing.JLabel hideNovaLabel;
    private javax.swing.JLabel hidePasswordLabel;
    private javax.swing.JButton jButton1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPasswordField novaPasswordField;
    private javax.swing.JPasswordField repetePasswordField;
    private javax.swing.JLabel showNovaLabel;
    private javax.swing.JLabel showPasswordLabel;
    // End of variables declaration//GEN-END:variables
}
