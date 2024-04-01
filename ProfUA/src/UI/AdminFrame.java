package UI;

import Data.Curso;
import Data.Departamento;
import Data.Gabinete;
import Data.Perfil;
import Data.Professor;
import Data.TipoCurso;
import Data.UC;
import Database.DatabaseManipulation;
import java.awt.Color;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import javax.swing.DefaultListModel;
import javax.swing.Icon;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.border.Border;
import javax.swing.border.LineBorder;
import javax.swing.table.DefaultTableModel;

/**
 * Classe relativa à interface de administração
 * @author Grupo 4
 */
public class AdminFrame extends javax.swing.JDialog{
    private DatabaseManipulation bd;
    private boolean editUser=false;
    private boolean editUc = false;
    private boolean editDep = false;
    private boolean editDoc = false;
    private boolean editCur = false;
    private boolean editGab = false;
    /**
     * Construtor da classe relativa à interface de administração
     */
    public AdminFrame() {
        bd = new DatabaseManipulation();
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

        jScrollPane3 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jPanel1 = new javax.swing.JPanel();
        titlePanel = new javax.swing.JPanel();
        closeButton = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
        optionsPanel = new javax.swing.JPanel();
        cursoButton = new javax.swing.JLabel();
        docenteButton = new javax.swing.JLabel();
        departamentosButton = new javax.swing.JLabel();
        ucButton = new javax.swing.JLabel();
        usersButton = new javax.swing.JLabel();
        gabinetesButton = new javax.swing.JLabel();
        contentPanel = new javax.swing.JPanel();
        usersPanel = new javax.swing.JPanel();
        editUserButton = new javax.swing.JButton();
        delUserButton = new javax.swing.JButton();
        procUserButton = new javax.swing.JButton();
        jLabel25 = new javax.swing.JLabel();
        emailUserTextField = new javax.swing.JTextField();
        jLabel26 = new javax.swing.JLabel();
        UserPerfilComboBox = new javax.swing.JComboBox<>();
        reporPasswordButton = new javax.swing.JButton();
        addUserButton = new javax.swing.JButton();
        ucPanel = new javax.swing.JPanel();
        novaUcButton = new javax.swing.JButton();
        editUcButton = new javax.swing.JButton();
        delUcButton = new javax.swing.JButton();
        jLabel5 = new javax.swing.JLabel();
        codUcTextField = new javax.swing.JTextField();
        procUcButton = new javax.swing.JButton();
        jLabel22 = new javax.swing.JLabel();
        nomeUcTextField = new javax.swing.JTextField();
        jPanel5 = new javax.swing.JPanel();
        jScrollPane5 = new javax.swing.JScrollPane();
        cursosjTable = new javax.swing.JTable();
        addUcCursoButton = new javax.swing.JButton();
        remCursoUcButton = new javax.swing.JButton();
        jPanel6 = new javax.swing.JPanel();
        jScrollPane6 = new javax.swing.JScrollPane();
        docjTable = new javax.swing.JTable();
        addDocCursoButton = new javax.swing.JButton();
        remDocCursoButton = new javax.swing.JButton();
        departamentosPanel = new javax.swing.JPanel();
        addDepButton = new javax.swing.JButton();
        editDepButton = new javax.swing.JButton();
        delDepButton = new javax.swing.JButton();
        jLabel4 = new javax.swing.JLabel();
        numDepTextField = new javax.swing.JTextField();
        jLabel20 = new javax.swing.JLabel();
        nomeDepTextField = new javax.swing.JTextField();
        jLabel21 = new javax.swing.JLabel();
        jScrollPane4 = new javax.swing.JScrollPane();
        telDepList = new javax.swing.JList<>();
        addTelDepButton = new javax.swing.JButton();
        delTelDepButton = new javax.swing.JButton();
        procDepButton = new javax.swing.JButton();
        docentesPanel = new javax.swing.JPanel();
        jLabel7 = new javax.swing.JLabel();
        numMecTextField = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        nomeDocTextField = new javax.swing.JTextField();
        jLabel8 = new javax.swing.JLabel();
        emailDocTextField = new javax.swing.JTextField();
        jLabel9 = new javax.swing.JLabel();
        areaDocTextField = new javax.swing.JTextField();
        jLabel10 = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        descDocTextArea = new javax.swing.JTextArea();
        jPanel2 = new javax.swing.JPanel();
        jScrollPane7 = new javax.swing.JScrollPane();
        gabineteTable = new javax.swing.JTable();
        addGabDocButton = new javax.swing.JButton();
        remGabDocButton = new javax.swing.JButton();
        procuraDocButton = new javax.swing.JButton();
        addDocButton = new javax.swing.JButton();
        editDocButton = new javax.swing.JButton();
        delDocButton = new javax.swing.JButton();
        jPanel4 = new javax.swing.JPanel();
        jScrollPane2 = new javax.swing.JScrollPane();
        telDocList = new javax.swing.JList<>();
        remTelDocButton = new javax.swing.JButton();
        addTelDocButton = new javax.swing.JButton();
        cursoPanel = new javax.swing.JPanel();
        addCursoButton = new javax.swing.JButton();
        editCursoButton = new javax.swing.JButton();
        delCursoButton = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        codCursoTextField = new javax.swing.JTextField();
        procCursoButton = new javax.swing.JButton();
        jLabel15 = new javax.swing.JLabel();
        nomeCursoTextField = new javax.swing.JTextField();
        jLabel16 = new javax.swing.JLabel();
        depCursoComboBox = new javax.swing.JComboBox<>();
        jLabel17 = new javax.swing.JLabel();
        tipoCursoComboBox = new javax.swing.JComboBox<>();
        jPanel3 = new javax.swing.JPanel();
        jLabel18 = new javax.swing.JLabel();
        numRespTextField = new javax.swing.JTextField();
        jLabel19 = new javax.swing.JLabel();
        nomeRespTextField = new javax.swing.JTextField();
        procRespButton = new javax.swing.JButton();
        gabinetesPanel = new javax.swing.JPanel();
        novoGabButton = new javax.swing.JButton();
        editGabButton = new javax.swing.JButton();
        delGabButton = new javax.swing.JButton();
        jLabel6 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        jLabel12 = new javax.swing.JLabel();
        depComboBox = new javax.swing.JComboBox<>();
        telGabTextField = new javax.swing.JTextField();
        salaComboBox = new javax.swing.JComboBox<>();

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane3.setViewportView(jTable1);

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("Adminstração");
        setAlwaysOnTop(true);
        setUndecorated(true);
        setPreferredSize(new java.awt.Dimension(1000, 600));
        setResizable(false);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowOpened(java.awt.event.WindowEvent evt) {
                formWindowOpened(evt);
            }
        });
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jPanel1.setBackground(new java.awt.Color(0, 102, 102));
        jPanel1.setBorder(javax.swing.BorderFactory.createEmptyBorder(1, 1, 1, 1));
        jPanel1.setForeground(new java.awt.Color(204, 204, 204));

        titlePanel.setBackground(new java.awt.Color(51, 153, 0));

        closeButton.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_close_sign_50px_1.png"))); // NOI18N
        closeButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        closeButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                closeButtonMouseClicked(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        jLabel1.setText("Administração");

        javax.swing.GroupLayout titlePanelLayout = new javax.swing.GroupLayout(titlePanel);
        titlePanel.setLayout(titlePanelLayout);
        titlePanelLayout.setHorizontalGroup(
            titlePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, titlePanelLayout.createSequentialGroup()
                .addGap(390, 390, 390)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(closeButton, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(146, 146, 146))
        );
        titlePanelLayout.setVerticalGroup(
            titlePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(titlePanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(titlePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(closeButton, javax.swing.GroupLayout.PREFERRED_SIZE, 39, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel1))
                .addContainerGap(15, Short.MAX_VALUE))
        );

        optionsPanel.setBackground(new java.awt.Color(0, 102, 102));
        optionsPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        cursoButton.setBackground(new java.awt.Color(0, 204, 102));
        cursoButton.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        cursoButton.setForeground(new java.awt.Color(0, 0, 0));
        cursoButton.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        cursoButton.setText("Cursos");
        cursoButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        cursoButton.setOpaque(true);
        cursoButton.setRequestFocusEnabled(false);
        cursoButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                cursoButtonMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                cursoButtonMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                cursoButtonMouseExited(evt);
            }
        });
        optionsPanel.add(cursoButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 70, 200, 50));

        docenteButton.setBackground(new java.awt.Color(0, 204, 102));
        docenteButton.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        docenteButton.setForeground(new java.awt.Color(0, 0, 0));
        docenteButton.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        docenteButton.setText("Docentes");
        docenteButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        docenteButton.setOpaque(true);
        docenteButton.setPreferredSize(new java.awt.Dimension(118, 54));
        docenteButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                docenteButtonMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                docenteButtonMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                docenteButtonMouseExited(evt);
            }
        });
        optionsPanel.add(docenteButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 130, 200, 50));

        departamentosButton.setBackground(new java.awt.Color(0, 204, 102));
        departamentosButton.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        departamentosButton.setForeground(new java.awt.Color(0, 0, 0));
        departamentosButton.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        departamentosButton.setText("Departamentos");
        departamentosButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        departamentosButton.setOpaque(true);
        departamentosButton.setPreferredSize(new java.awt.Dimension(118, 54));
        departamentosButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                departamentosButtonMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                departamentosButtonMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                departamentosButtonMouseExited(evt);
            }
        });
        optionsPanel.add(departamentosButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 190, 200, 50));

        ucButton.setBackground(new java.awt.Color(0, 204, 102));
        ucButton.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        ucButton.setForeground(new java.awt.Color(0, 0, 0));
        ucButton.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        ucButton.setText("Unidades Curriculares");
        ucButton.setToolTipText("");
        ucButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        ucButton.setOpaque(true);
        ucButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                ucButtonMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                ucButtonMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                ucButtonMouseExited(evt);
            }
        });
        optionsPanel.add(ucButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 250, 200, 50));

        usersButton.setBackground(new java.awt.Color(51, 153, 0));
        usersButton.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        usersButton.setForeground(new java.awt.Color(0, 0, 0));
        usersButton.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        usersButton.setText("Utilizadores");
        usersButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        usersButton.setOpaque(true);
        usersButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                usersButtonMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                usersButtonMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                usersButtonMouseExited(evt);
            }
        });
        optionsPanel.add(usersButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 10, 200, 50));

        gabinetesButton.setBackground(new java.awt.Color(0, 204, 102));
        gabinetesButton.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        gabinetesButton.setForeground(new java.awt.Color(0, 0, 0));
        gabinetesButton.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        gabinetesButton.setText("Gabinetes");
        gabinetesButton.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        gabinetesButton.setOpaque(true);
        gabinetesButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                gabinetesButtonMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                gabinetesButtonMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                gabinetesButtonMouseExited(evt);
            }
        });
        optionsPanel.add(gabinetesButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 310, 200, 50));

        contentPanel.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(0, 0, 0), 1, true));
        contentPanel.setLayout(new javax.swing.OverlayLayout(contentPanel));

        editUserButton.setBackground(new java.awt.Color(0, 204, 102));
        editUserButton.setText("Editar");
        editUserButton.setToolTipText("Editar Utilizador");
        editUserButton.setEnabled(false);
        editUserButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editUserButtonActionPerformed(evt);
            }
        });

        delUserButton.setBackground(new java.awt.Color(0, 204, 102));
        delUserButton.setText("Eliminar");
        delUserButton.setToolTipText("Eliminar Utilizador");
        delUserButton.setEnabled(false);
        delUserButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delUserButtonActionPerformed(evt);
            }
        });

        procUserButton.setBackground(new java.awt.Color(0, 204, 102));
        procUserButton.setText("Procurar");
        procUserButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                procUserButtonActionPerformed(evt);
            }
        });

        jLabel25.setText("Email");

        jLabel26.setText("Perfil");

        UserPerfilComboBox.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Básico", "Administrador" }));
        UserPerfilComboBox.setEnabled(false);

        reporPasswordButton.setBackground(new java.awt.Color(0, 204, 102));
        reporPasswordButton.setText("Repor Palavra-Passe");
        reporPasswordButton.setEnabled(false);
        reporPasswordButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                reporPasswordButtonActionPerformed(evt);
            }
        });

        addUserButton.setBackground(new java.awt.Color(0, 204, 102));
        addUserButton.setText("Novo");
        addUserButton.setToolTipText("Novo Utilizador");
        addUserButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addUserButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout usersPanelLayout = new javax.swing.GroupLayout(usersPanel);
        usersPanel.setLayout(usersPanelLayout);
        usersPanelLayout.setHorizontalGroup(
            usersPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(usersPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(usersPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(usersPanelLayout.createSequentialGroup()
                        .addComponent(addUserButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editUserButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delUserButton))
                    .addGroup(usersPanelLayout.createSequentialGroup()
                        .addComponent(jLabel25)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(emailUserTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 254, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(procUserButton))
                    .addGroup(usersPanelLayout.createSequentialGroup()
                        .addComponent(jLabel26)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(UserPerfilComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, 145, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(reporPasswordButton))
                .addContainerGap(406, Short.MAX_VALUE))
        );
        usersPanelLayout.setVerticalGroup(
            usersPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(usersPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(usersPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(editUserButton)
                    .addComponent(delUserButton)
                    .addComponent(addUserButton))
                .addGap(18, 18, 18)
                .addGroup(usersPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel25)
                    .addComponent(emailUserTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(procUserButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(usersPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel26)
                    .addComponent(UserPerfilComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(reporPasswordButton)
                .addContainerGap(417, Short.MAX_VALUE))
        );

        contentPanel.add(usersPanel);

        novaUcButton.setBackground(new java.awt.Color(0, 204, 102));
        novaUcButton.setText("Novo");
        novaUcButton.setToolTipText("Adicionar Unidade Curricular");
        novaUcButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                novaUcButtonActionPerformed(evt);
            }
        });

        editUcButton.setBackground(new java.awt.Color(0, 204, 102));
        editUcButton.setText("Editar");
        editUcButton.setToolTipText("Editar Unidade Curricular");
        editUcButton.setEnabled(false);
        editUcButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editUcButtonActionPerformed(evt);
            }
        });

        delUcButton.setBackground(new java.awt.Color(0, 204, 102));
        delUcButton.setText("Eliminar");
        delUcButton.setToolTipText("Eliminar Unidade Curricular");
        delUcButton.setEnabled(false);
        delUcButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delUcButtonActionPerformed(evt);
            }
        });

        jLabel5.setText("Código");

        procUcButton.setBackground(new java.awt.Color(0, 204, 102));
        procUcButton.setText("Procurar");
        procUcButton.setToolTipText("Procurar Unidade Curricular");
        procUcButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                procUcButtonActionPerformed(evt);
            }
        });

        jLabel22.setText("Nome");

        nomeUcTextField.setEnabled(false);

        jPanel5.setBorder(javax.swing.BorderFactory.createTitledBorder("Cursos"));

        cursosjTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "Código", "Nome", "Ano"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jScrollPane5.setViewportView(cursosjTable);

        addUcCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        addUcCursoButton.setText("+");
        addUcCursoButton.setToolTipText("Adicionar Curso");
        addUcCursoButton.setEnabled(false);
        addUcCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addUcCursoButtonActionPerformed(evt);
            }
        });

        remCursoUcButton.setBackground(new java.awt.Color(0, 204, 102));
        remCursoUcButton.setText("-");
        remCursoUcButton.setToolTipText("Remover Curso");
        remCursoUcButton.setEnabled(false);
        remCursoUcButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                remCursoUcButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane5, javax.swing.GroupLayout.PREFERRED_SIZE, 491, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(addUcCursoButton)
                    .addComponent(remCursoUcButton))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addComponent(jScrollPane5, javax.swing.GroupLayout.PREFERRED_SIZE, 110, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 10, Short.MAX_VALUE))
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(addUcCursoButton)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(remCursoUcButton)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jPanel6.setBorder(javax.swing.BorderFactory.createTitledBorder("Docentes"));

        docjTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "Número Mecanográfico", "Nome"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jScrollPane6.setViewportView(docjTable);

        addDocCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        addDocCursoButton.setText("+");
        addDocCursoButton.setToolTipText("Adicionar Docente");
        addDocCursoButton.setEnabled(false);
        addDocCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addDocCursoButtonActionPerformed(evt);
            }
        });

        remDocCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        remDocCursoButton.setText("-");
        remDocCursoButton.setToolTipText("Remover Docente");
        remDocCursoButton.setEnabled(false);
        remDocCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                remDocCursoButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel6Layout = new javax.swing.GroupLayout(jPanel6);
        jPanel6.setLayout(jPanel6Layout);
        jPanel6Layout.setHorizontalGroup(
            jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel6Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane6, javax.swing.GroupLayout.PREFERRED_SIZE, 491, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(addDocCursoButton)
                    .addComponent(remDocCursoButton))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel6Layout.setVerticalGroup(
            jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel6Layout.createSequentialGroup()
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane6, javax.swing.GroupLayout.PREFERRED_SIZE, 128, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(jPanel6Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(addDocCursoButton)
                        .addGap(4, 4, 4)
                        .addComponent(remDocCursoButton)))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout ucPanelLayout = new javax.swing.GroupLayout(ucPanel);
        ucPanel.setLayout(ucPanelLayout);
        ucPanelLayout.setHorizontalGroup(
            ucPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(ucPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(ucPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(ucPanelLayout.createSequentialGroup()
                        .addComponent(novaUcButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editUcButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delUcButton))
                    .addGroup(ucPanelLayout.createSequentialGroup()
                        .addComponent(jLabel5)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(codUcTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 92, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(procUcButton))
                    .addGroup(ucPanelLayout.createSequentialGroup()
                        .addComponent(jLabel22)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(nomeUcTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 279, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(jPanel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel6, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap(241, Short.MAX_VALUE))
        );
        ucPanelLayout.setVerticalGroup(
            ucPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(ucPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(ucPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(novaUcButton)
                    .addComponent(editUcButton)
                    .addComponent(delUcButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(ucPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel5)
                    .addComponent(codUcTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(procUcButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(ucPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel22)
                    .addComponent(nomeUcTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jPanel6, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(145, Short.MAX_VALUE))
        );

        contentPanel.add(ucPanel);

        addDepButton.setBackground(new java.awt.Color(0, 204, 102));
        addDepButton.setText("Novo");
        addDepButton.setToolTipText("Adicionar Departamento");
        addDepButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addDepButtonActionPerformed(evt);
            }
        });

        editDepButton.setBackground(new java.awt.Color(0, 204, 102));
        editDepButton.setText("Editar");
        editDepButton.setToolTipText("Editar Departamento");
        editDepButton.setEnabled(false);
        editDepButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editDepButtonActionPerformed(evt);
            }
        });

        delDepButton.setBackground(new java.awt.Color(0, 204, 102));
        delDepButton.setText("Eliminar");
        delDepButton.setToolTipText("Eliminar Departamento");
        delDepButton.setEnabled(false);
        delDepButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delDepButtonActionPerformed(evt);
            }
        });

        jLabel4.setText("Número");

        jLabel20.setText("Nome");

        nomeDepTextField.setEnabled(false);

        jLabel21.setText("Telefone");

        jScrollPane4.setViewportView(telDepList);

        addTelDepButton.setBackground(new java.awt.Color(0, 204, 102));
        addTelDepButton.setText("+");
        addTelDepButton.setToolTipText("Adicionar Telefone");
        addTelDepButton.setEnabled(false);
        addTelDepButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addTelDepButtonActionPerformed(evt);
            }
        });

        delTelDepButton.setBackground(new java.awt.Color(0, 204, 102));
        delTelDepButton.setText("-");
        delTelDepButton.setToolTipText("Remover Telefone");
        delTelDepButton.setEnabled(false);
        delTelDepButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delTelDepButtonActionPerformed(evt);
            }
        });

        procDepButton.setBackground(new java.awt.Color(0, 204, 102));
        procDepButton.setText("Procurar");
        procDepButton.setToolTipText("Procurar Departamento");
        procDepButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                procDepButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout departamentosPanelLayout = new javax.swing.GroupLayout(departamentosPanel);
        departamentosPanel.setLayout(departamentosPanelLayout);
        departamentosPanelLayout.setHorizontalGroup(
            departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(departamentosPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(departamentosPanelLayout.createSequentialGroup()
                        .addComponent(addDepButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editDepButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delDepButton))
                    .addGroup(departamentosPanelLayout.createSequentialGroup()
                        .addComponent(jLabel4)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(numDepTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 85, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(procDepButton))
                    .addGroup(departamentosPanelLayout.createSequentialGroup()
                        .addComponent(jLabel20)
                        .addGap(18, 18, 18)
                        .addComponent(nomeDepTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 262, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(departamentosPanelLayout.createSequentialGroup()
                        .addComponent(jLabel21)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jScrollPane4)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(addTelDepButton)
                    .addComponent(delTelDepButton))
                .addContainerGap(441, Short.MAX_VALUE))
        );
        departamentosPanelLayout.setVerticalGroup(
            departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(departamentosPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(addDepButton)
                    .addComponent(editDepButton)
                    .addComponent(delDepButton))
                .addGap(18, 18, 18)
                .addGroup(departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel4)
                    .addComponent(numDepTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(procDepButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel20)
                    .addComponent(nomeDepTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(departamentosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel21)
                    .addComponent(jScrollPane4, javax.swing.GroupLayout.PREFERRED_SIZE, 70, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(departamentosPanelLayout.createSequentialGroup()
                        .addComponent(addTelDepButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delTelDepButton)))
                .addContainerGap(369, Short.MAX_VALUE))
        );

        contentPanel.add(departamentosPanel);

        jLabel7.setText("Número Mecanográfico");

        numMecTextField.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                numMecTextFieldActionPerformed(evt);
            }
        });

        jLabel3.setText("Nome");

        nomeDocTextField.setEnabled(false);

        jLabel8.setText("Email");

        emailDocTextField.setEnabled(false);

        jLabel9.setText("Area");

        areaDocTextField.setEnabled(false);

        jLabel10.setText("Descrição");

        descDocTextArea.setColumns(20);
        descDocTextArea.setRows(5);
        descDocTextArea.setEnabled(false);
        jScrollPane1.setViewportView(descDocTextArea);

        jPanel2.setBorder(javax.swing.BorderFactory.createTitledBorder("Gabinetes"));

        gabineteTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "Num. Departamento", "Nome", "Sala", "Telefone"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jScrollPane7.setViewportView(gabineteTable);

        addGabDocButton.setBackground(new java.awt.Color(0, 204, 102));
        addGabDocButton.setText("+");
        addGabDocButton.setEnabled(false);
        addGabDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addGabDocButtonActionPerformed(evt);
            }
        });

        remGabDocButton.setBackground(new java.awt.Color(0, 204, 102));
        remGabDocButton.setText("-");
        remGabDocButton.setEnabled(false);
        remGabDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                remGabDocButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane7)
                .addGap(18, 18, 18)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(addGabDocButton)
                    .addComponent(remGabDocButton))
                .addContainerGap())
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addComponent(addGabDocButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(remGabDocButton))
                    .addComponent(jScrollPane7, javax.swing.GroupLayout.PREFERRED_SIZE, 89, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        procuraDocButton.setBackground(new java.awt.Color(0, 204, 102));
        procuraDocButton.setText("Procurar");
        procuraDocButton.setToolTipText("Procurar Docente");
        procuraDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                procuraDocButtonActionPerformed(evt);
            }
        });

        addDocButton.setBackground(new java.awt.Color(0, 204, 102));
        addDocButton.setText("Novo");
        addDocButton.setToolTipText("Adicionar Docente");
        addDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addDocButtonActionPerformed(evt);
            }
        });

        editDocButton.setBackground(new java.awt.Color(0, 204, 102));
        editDocButton.setText("Editar");
        editDocButton.setToolTipText("Editar Docente");
        editDocButton.setEnabled(false);
        editDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editDocButtonActionPerformed(evt);
            }
        });

        delDocButton.setBackground(new java.awt.Color(0, 204, 102));
        delDocButton.setText("Eliminar");
        delDocButton.setToolTipText("Eliminar Docente");
        delDocButton.setEnabled(false);
        delDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delDocButtonActionPerformed(evt);
            }
        });

        jPanel4.setBorder(javax.swing.BorderFactory.createTitledBorder("Telefones"));

        jScrollPane2.setViewportView(telDocList);

        remTelDocButton.setBackground(new java.awt.Color(0, 204, 102));
        remTelDocButton.setText("-");
        remTelDocButton.setToolTipText("Remover Telefone");
        remTelDocButton.setEnabled(false);
        remTelDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                remTelDocButtonActionPerformed(evt);
            }
        });

        addTelDocButton.setBackground(new java.awt.Color(0, 204, 102));
        addTelDocButton.setText("+");
        addTelDocButton.setToolTipText("Adicionar Telefone");
        addTelDocButton.setEnabled(false);
        addTelDocButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addTelDocButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 128, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(addTelDocButton)
                    .addComponent(remTelDocButton))
                .addContainerGap())
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addComponent(addTelDocButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(remTelDocButton)
                        .addGap(0, 50, Short.MAX_VALUE)))
                .addContainerGap())
        );

        javax.swing.GroupLayout docentesPanelLayout = new javax.swing.GroupLayout(docentesPanel);
        docentesPanel.setLayout(docentesPanelLayout);
        docentesPanelLayout.setHorizontalGroup(
            docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(docentesPanelLayout.createSequentialGroup()
                .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(docentesPanelLayout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(addDocButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editDocButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delDocButton))
                    .addGroup(docentesPanelLayout.createSequentialGroup()
                        .addGap(14, 14, 14)
                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(docentesPanelLayout.createSequentialGroup()
                                .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, docentesPanelLayout.createSequentialGroup()
                                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(jLabel9)
                                            .addComponent(jLabel8))
                                        .addGap(30, 30, 30)
                                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(emailDocTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 251, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(areaDocTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 250, javax.swing.GroupLayout.PREFERRED_SIZE))
                                        .addGap(196, 196, 196))
                                    .addGroup(docentesPanelLayout.createSequentialGroup()
                                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addGroup(docentesPanelLayout.createSequentialGroup()
                                                .addComponent(jLabel7)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(numMecTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(7, 7, 7)
                                                .addComponent(procuraDocButton))
                                            .addGroup(docentesPanelLayout.createSequentialGroup()
                                                .addComponent(jLabel3)
                                                .addGap(26, 26, 26)
                                                .addComponent(nomeDocTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 398, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(docentesPanelLayout.createSequentialGroup()
                                .addComponent(jLabel10)
                                .addGap(8, 8, 8)
                                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 637, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(0, 0, Short.MAX_VALUE))
                            .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
                .addGap(16, 16, 16))
        );
        docentesPanelLayout.setVerticalGroup(
            docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(docentesPanelLayout.createSequentialGroup()
                .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(docentesPanelLayout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(addDocButton)
                            .addComponent(editDocButton)
                            .addComponent(delDocButton))
                        .addGap(15, 15, 15)
                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel7)
                            .addComponent(numMecTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(procuraDocButton))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel3)
                            .addComponent(nomeDocTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel8)
                            .addComponent(emailDocTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel9)
                            .addComponent(areaDocTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(docentesPanelLayout.createSequentialGroup()
                        .addGap(15, 15, 15)
                        .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(18, 18, 18)
                .addGroup(docentesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel10))
                .addGap(12, 12, 12)
                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(24, Short.MAX_VALUE))
        );

        contentPanel.add(docentesPanel);

        addCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        addCursoButton.setText("Novo");
        addCursoButton.setToolTipText("Adicionar Curso");
        addCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addCursoButtonActionPerformed(evt);
            }
        });

        editCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        editCursoButton.setText("Editar");
        editCursoButton.setToolTipText("Editar Curso");
        editCursoButton.setEnabled(false);
        editCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editCursoButtonActionPerformed(evt);
            }
        });

        delCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        delCursoButton.setText("Eliminar");
        delCursoButton.setToolTipText("Eliminar Curso");
        delCursoButton.setEnabled(false);
        delCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delCursoButtonActionPerformed(evt);
            }
        });

        jLabel2.setText("Código");

        procCursoButton.setBackground(new java.awt.Color(0, 204, 102));
        procCursoButton.setText("Procurar");
        procCursoButton.setToolTipText("Procurar Curso");
        procCursoButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                procCursoButtonActionPerformed(evt);
            }
        });

        jLabel15.setText("Nome");

        nomeCursoTextField.setEnabled(false);

        jLabel16.setText("Departamento");

        depCursoComboBox.setEnabled(false);

        jLabel17.setText("Tipo");

        tipoCursoComboBox.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "CTESP", "Licenciatura", "Mestrado" }));
        tipoCursoComboBox.setEnabled(false);

        jPanel3.setBorder(javax.swing.BorderFactory.createTitledBorder("Docente Responsável"));

        jLabel18.setText("Número Mecanográfico");

        numRespTextField.setEnabled(false);

        jLabel19.setText("Nome");

        nomeRespTextField.setEnabled(false);

        procRespButton.setBackground(new java.awt.Color(0, 204, 102));
        procRespButton.setText("Procurar");
        procRespButton.setToolTipText("Procurar Docente");
        procRespButton.setEnabled(false);
        procRespButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                procRespButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addComponent(jLabel18)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(numRespTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 91, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(procRespButton))
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addComponent(jLabel19)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(nomeRespTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 434, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel18)
                    .addComponent(numRespTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(procRespButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel19)
                    .addComponent(nomeRespTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout cursoPanelLayout = new javax.swing.GroupLayout(cursoPanel);
        cursoPanel.setLayout(cursoPanelLayout);
        cursoPanelLayout.setHorizontalGroup(
            cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(cursoPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(cursoPanelLayout.createSequentialGroup()
                        .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(cursoPanelLayout.createSequentialGroup()
                                .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addGroup(cursoPanelLayout.createSequentialGroup()
                                        .addComponent(jLabel2)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(codCursoTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 76, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(procCursoButton))
                                    .addGroup(cursoPanelLayout.createSequentialGroup()
                                        .addComponent(jLabel15)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                        .addComponent(nomeCursoTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 361, javax.swing.GroupLayout.PREFERRED_SIZE))
                                    .addGroup(cursoPanelLayout.createSequentialGroup()
                                        .addComponent(jLabel16)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(depCursoComboBox, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel17)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(tipoCursoComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, 182, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(0, 0, Short.MAX_VALUE))
                            .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addGap(159, 159, 159))
                    .addGroup(cursoPanelLayout.createSequentialGroup()
                        .addComponent(addCursoButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editCursoButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delCursoButton)
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
        );
        cursoPanelLayout.setVerticalGroup(
            cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(cursoPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(addCursoButton)
                    .addComponent(editCursoButton)
                    .addComponent(delCursoButton))
                .addGap(18, 18, 18)
                .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2)
                    .addComponent(codCursoTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(procCursoButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel15)
                    .addComponent(nomeCursoTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel17)
                    .addComponent(tipoCursoComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(cursoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel16)
                    .addComponent(depCursoComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jPanel3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(326, Short.MAX_VALUE))
        );

        contentPanel.add(cursoPanel);

        novoGabButton.setBackground(new java.awt.Color(0, 204, 102));
        novoGabButton.setText("Novo");
        novoGabButton.setToolTipText("Novo Gabinete");
        novoGabButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                novoGabButtonActionPerformed(evt);
            }
        });

        editGabButton.setBackground(new java.awt.Color(0, 204, 102));
        editGabButton.setText("Editar");
        editGabButton.setToolTipText("Editar Gabinete");
        editGabButton.setEnabled(false);
        editGabButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editGabButtonActionPerformed(evt);
            }
        });

        delGabButton.setBackground(new java.awt.Color(0, 204, 102));
        delGabButton.setText("Eliminar");
        delGabButton.setToolTipText("Eliminar Gabinete");
        delGabButton.setEnabled(false);
        delGabButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                delGabButtonActionPerformed(evt);
            }
        });

        jLabel6.setText("Departamento");

        jLabel11.setText("Sala");

        jLabel12.setText("Telefone");

        depComboBox.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                depComboBoxActionPerformed(evt);
            }
        });

        telGabTextField.setEnabled(false);
        telGabTextField.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                telGabTextFieldActionPerformed(evt);
            }
        });

        salaComboBox.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                salaComboBoxActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout gabinetesPanelLayout = new javax.swing.GroupLayout(gabinetesPanel);
        gabinetesPanel.setLayout(gabinetesPanelLayout);
        gabinetesPanelLayout.setHorizontalGroup(
            gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(gabinetesPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(gabinetesPanelLayout.createSequentialGroup()
                        .addComponent(novoGabButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editGabButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(delGabButton))
                    .addGroup(gabinetesPanelLayout.createSequentialGroup()
                        .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel6)
                            .addComponent(jLabel11)
                            .addComponent(jLabel12))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(depComboBox, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(telGabTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 124, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(salaComboBox, 0, 258, Short.MAX_VALUE))))
                .addContainerGap(428, Short.MAX_VALUE))
        );
        gabinetesPanelLayout.setVerticalGroup(
            gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(gabinetesPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(novoGabButton)
                    .addComponent(editGabButton)
                    .addComponent(delGabButton))
                .addGap(18, 18, 18)
                .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel6)
                    .addComponent(depComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel11)
                    .addComponent(salaComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(gabinetesPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel12)
                    .addComponent(telGabTextField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(403, Short.MAX_VALUE))
        );

        contentPanel.add(gabinetesPanel);

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(optionsPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 206, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(contentPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 781, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 139, Short.MAX_VALUE))
                    .addComponent(titlePanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addComponent(titlePanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(contentPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 549, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(optionsPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 379, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap())
        );

        getContentPane().add(jPanel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 1140, 690));

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents
    /**
     * Método de esconder todos os painés
     * Utilizado numa fase inicial do boot do programa
     */
    private void hidePanels(){
        this.cursoPanel.setVisible(false);
        this.departamentosPanel.setVisible(false);
        this.usersPanel.setVisible(false);
        this.docentesPanel.setVisible(false);
        this.ucPanel.setVisible(false);
        this.gabinetesPanel.setVisible(false);
    }
    /**
     * Nétodo de definição das cores dos diferentes botões
     */
    private void resetColor(){
        this.docenteButton.setBackground(new java.awt.Color(0,204,102));
        this.cursoButton.setBackground(new java.awt.Color(0,204,102));
        this.ucButton.setBackground(new java.awt.Color(0,204,102));
        this.usersButton.setBackground(new java.awt.Color(0,204,102));
        this.departamentosButton.setBackground(new java.awt.Color(0,204,102));
        this.gabinetesButton.setBackground(new java.awt.Color(0,204,102));
    }
    /**
     * Método relativo ao clicar do botão de fechar a interface
     * BOTÃO: Ícone de fecho
     * @param evt 
     */
    private void closeButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_closeButtonMouseClicked
       this.dispose();
    }//GEN-LAST:event_closeButtonMouseClicked
    /**
     * Método relativo ao entrar do rato no botão de curso
     * @param evt 
     */
    private void cursoButtonMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_cursoButtonMouseEntered
        this.cursoButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_cursoButtonMouseEntered
    /**
     * Método relativo ao sair do rato do botão de curso
     * @param evt 
     */
    private void cursoButtonMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_cursoButtonMouseExited
        if(!this.cursoPanel.isVisible())
            this.cursoButton.setBackground(new java.awt.Color(0,204,102));   
    }//GEN-LAST:event_cursoButtonMouseExited
    /**
     * Método relativo ao entrar do rato no botão de docente
     * @param evt 
     */
    private void docenteButtonMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_docenteButtonMouseEntered
        this.docenteButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_docenteButtonMouseEntered
    /**
     * Método relativo ao sair do rato do botão de docente
     * @param evt 
     */
    private void docenteButtonMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_docenteButtonMouseExited
        if(!this.docentesPanel.isVisible())            
            this.docenteButton.setBackground(new java.awt.Color(0,204,102));
    }//GEN-LAST:event_docenteButtonMouseExited
    /**
     * Método relativo ao entrar do rato no botão de departamento
     * @param evt 
     */
    private void departamentosButtonMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_departamentosButtonMouseEntered
        this.departamentosButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_departamentosButtonMouseEntered
    /**
     * Método relativo ao sair do rato do botão de departamento
     * @param evt 
     */
    private void departamentosButtonMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_departamentosButtonMouseExited
        if(!this.departamentosPanel.isVisible())    
            this.departamentosButton.setBackground(new java.awt.Color(0,204,102));
    }//GEN-LAST:event_departamentosButtonMouseExited
    /**
     * Método relativo ao entrar do rato no botão de uc
     * @param evt 
     */
    private void ucButtonMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ucButtonMouseEntered
         this.ucButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_ucButtonMouseEntered
    /**
     * Método relativo ao sair do rato do botão de uc
     * @param evt 
     */
    private void ucButtonMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ucButtonMouseExited
        if(!this.ucPanel.isVisible())
            this.ucButton.setBackground(new java.awt.Color(0,204,102));
    }//GEN-LAST:event_ucButtonMouseExited
    /**
     * Método relativo ao entrar do rato no botão de utilizador
     * @param evt 
     */
    private void usersButtonMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_usersButtonMouseEntered
        this.usersButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_usersButtonMouseEntered
    /**
     * Método relativo ao sair do rato do botão de utilizador
     * @param evt 
     */
    private void usersButtonMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_usersButtonMouseExited
        if(!this.usersPanel.isVisible())
            this.usersButton.setBackground(new java.awt.Color(0,204,102));
    }//GEN-LAST:event_usersButtonMouseExited
    /**
     * Método que decorre aquando do ativar da interface presente
     * @param evt 
     */
    private void formWindowOpened(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowOpened
        this.hidePanels();
        this.usersPanel.setVisible(true);
        try{
            ArrayList<Departamento> d = bd.allDepartamentos();
            this.depComboBox.removeAll();
         
            for(Departamento i: d){            
                 this.depComboBox.addItem(i.getCodigoDepart() + " - "+ i.getNomeDepartamento());
             }
        }catch(Exception ex){}       
    }//GEN-LAST:event_formWindowOpened
    /**
     * Método relativo ao clicar do botão de curso
     * BOTÃO: Cursos
     * RESULTADO: Apresentação da interface de gestão de cursos
     * @param evt 
     */
    private void cursoButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_cursoButtonMouseClicked
        this.hidePanels();
        this.resetColor();
        this.cursoPanel.setVisible(true);
        this.cursoButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_cursoButtonMouseClicked
    /**
     * Método relativo ao clicar do botão de docentes
     * BOTÃO: Docentes
     * RESULTADO: Apresentação da interface de gestão de docentes
     * @param evt 
     */
    private void docenteButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_docenteButtonMouseClicked
        this.hidePanels();
        this.resetColor();
        this.docentesPanel.setVisible(true);
        this.docenteButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_docenteButtonMouseClicked
    /**
     * Método relativo ao clicar do botão de departamentos
     * BOTÃO: Departamentos
     * RESULTADO: Apresentação da interface de gestão de departamentos
     * @param evt 
     */
    private void departamentosButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_departamentosButtonMouseClicked
        this.hidePanels();
        this.resetColor();
        this.departamentosPanel.setVisible(true);
        this.departamentosButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_departamentosButtonMouseClicked
    /**
     * Método relativo ao clicar do botão de UC
     * BOTÃO: Unidades Curriculares
     * RESULTADO: Apresentação da interface de gestão de UCs
     * @param evt 
     */
    private void ucButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ucButtonMouseClicked
        this.hidePanels();
        this.resetColor();
        this.ucPanel.setVisible(true);
        this.ucButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_ucButtonMouseClicked
    /**
     * Método relativo ao clicar do botão de utilizadores
     * BOTÃO: Utilizadores
     * RESULTADO: Apresentação da interface de gestão de utilizadores
     * @param evt 
     */
    private void usersButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_usersButtonMouseClicked
        this.hidePanels();
        this.resetColor();
        this.usersPanel.setVisible(true);
        this.usersButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_usersButtonMouseClicked

    private void numMecTextFieldActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_numMecTextFieldActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_numMecTextFieldActionPerformed
    /**
     * Método relativo à  inserção de um telefone a um docente
     * @param evt 
     */
    private void addTelDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addTelDocButtonActionPerformed
      
        String t =JOptionPane.showInputDialog(this, "Insira o número de telefone","Número de telefone", JOptionPane.PLAIN_MESSAGE);
        if( bd.insereTelefoneDocente(Integer.parseInt(this.numMecTextField.getText()), t)){
            this.procDoc();
        }else{
            JOptionPane.showMessageDialog(this,"Docente já contém este telefone");
        }
        
    }//GEN-LAST:event_addTelDocButtonActionPerformed
    /**
     * Método de adição de um utilizador ao sistema
     * BOTÃO: Novo + Guardar
     * RESULTADO: Utilizador adicionado à Base de Dados
     * @param evt 
     */
    private void addUserButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addUserButtonActionPerformed
        if(!this.editUser){
            this.procUserButton.setEnabled(false);
            this.addUserButton.setText("Guardar");
            this.delUserButton.setText("Cancelar");
            this.emailUserTextField.setText("");
            this.UserPerfilComboBox.setSelectedIndex(0);
            this.editUserButton.setVisible(false);
            this.delUserButton.setEnabled(true);
            this.emailUserTextField.setEnabled(true);
            this.UserPerfilComboBox.setEnabled(true);
            this.editUser=true;
        }else{
            if(this.emailUserTextField.getText().length()>0){
                Perfil p;
                this.procUserButton.setEnabled(true);
                this.addUserButton.setText("Novo");
                this.delUserButton.setText("Eliminar");
                this.editUserButton.setVisible(true);
                this.editUserButton.setEnabled(true);
                this.UserPerfilComboBox.setEnabled(false);
                this.editUser=false;
                if(this.UserPerfilComboBox.getSelectedIndex()==0)
                    p=Perfil.BASICO;
                else
                    p=Perfil.ADMIN;
                
                if(!bd.insereUtilizador(this.emailUserTextField.getText(), p)){            
                    JOptionPane.showMessageDialog(this,"Utilizador já existente!"); 
                    this.emailUserTextField.setText("");
                    this.UserPerfilComboBox.setSelectedIndex(0);
                    this.editUserButton.setEnabled(false);
                    this.delUserButton.setEnabled(false);
                }
                
            }
            else
                JOptionPane.showMessageDialog(this,"Deve preencher todos os dados necessários!");
        }
        
    }//GEN-LAST:event_addUserButtonActionPerformed
    /**
     * Método de edição de um utilizador ao sistema
     * BOTÃO: Editar + Guardar
     * RESULTADO: Utilizador editado na Base de Dados
     * @param evt 
     */
    private void editUserButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editUserButtonActionPerformed
        Perfil p;
        if(!this.editUser){
            this.procUserButton.setEnabled(false);
            this.editUserButton.setText("Guardar");
            this.delUserButton.setText("Cancelar");
            this.emailUserTextField.setEnabled(false);
            this.delUserButton.setEnabled(true);
            this.addUserButton.setVisible(false);
            this.UserPerfilComboBox.setEnabled(true);
            this.reporPasswordButton.setEnabled(true);
            this.editUser=true;
        }else{
            this.procUserButton.setEnabled(true);
            this.editUserButton.setText("Editar");
            this.delUserButton.setText("Eliminar");
            this.emailUserTextField.setEnabled(true);
            this.delUserButton.setEnabled(true);           
            this.addUserButton.setVisible(true);
            this.UserPerfilComboBox.setEnabled(false);
            this.reporPasswordButton.setEnabled(false);
            this.editUser=false;
            if(this.UserPerfilComboBox.getSelectedIndex()==0)
                    p=Perfil.BASICO;
                else
                    p=Perfil.ADMIN;
            bd.updateUtilizador(this.emailUserTextField.getText(), p);
        }
    }//GEN-LAST:event_editUserButtonActionPerformed
    /**
     * Método de remoção de um utilizador ao sistema
     * BOTÃO: Apagar + Sim
     * RESULTADO: Utilizador removido da Base de Dados
     * @param evt 
     */
    private void delUserButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delUserButtonActionPerformed
        if(this.addUserButton.isVisible() && this.editUser){
            this.procUserButton.setEnabled(true);
            this.addUserButton.setText("Novo");
            this.delUserButton.setText("Eliminar");
            this.editUserButton.setEnabled(false);
            this.editUserButton.setVisible(true);
            this.delUserButton.setEnabled(false);
            this.emailUserTextField.setEnabled(false);
            this.emailUserTextField.setText("");
            this.UserPerfilComboBox.setEnabled(false);
            this.UserPerfilComboBox.setSelectedIndex(0);
            this.editUser=false;
        }else if(this.editUserButton.isVisible()&& this.editUser){
            this.procUserButton.setEnabled(true);
            this.editUserButton.setText("Editar");
            this.delUserButton.setText("Eliminar");
            this.emailUserTextField.setEnabled(true);
            if (this.emailUserTextField.getText().length()>0){
                this.delUserButton.setEnabled(true);
            }else{
                this.delUserButton.setEnabled(false);
            }
            this.addUserButton.setVisible(true);
            this.UserPerfilComboBox.setEnabled(false);
            this.reporPasswordButton.setEnabled(false);
            this.editUser=false;
        }else if(!this.editUser){
            if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende eliminar este Utilizador", "Aviso", JOptionPane.YES_NO_OPTION) == 0) {
                bd.delUtilizador(this.emailUserTextField.getText());
                this.editUserButton.setEnabled(false);
                this.delUserButton.setEnabled(false);
                this.emailUserTextField.setText("");
                this.UserPerfilComboBox.setSelectedIndex(0);
            }
        }
    }//GEN-LAST:event_delUserButtonActionPerformed
    /**
     * Método de adição de uma unidade curricular ao sistema
     * BOTÃO: Novo + Guardar
     * RESULTADO: UC adicionada à Base de Dados
     * @param evt 
     */
    private void novaUcButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_novaUcButtonActionPerformed
        if(!this.editUc){
            this.novaUcButton.setText("Guardar");
            this.procUcButton.setEnabled(false);
            this.editUcButton.setVisible(false);
            this.delUcButton.setText("Cancelar");
            this.delUcButton.setEnabled(true);
            this.nomeUcTextField.setEnabled(true);
            this.editUc=true;
        }else{
            if(this.codUcTextField.getText().length()>0 && this.nomeUcTextField.getText().length()>0){
                try{
                    if(bd.insereUC(Integer.parseInt(this.codUcTextField.getText()), this.nomeUcTextField.getText())){
                        this.novaUcButton.setText("Novo");
                        this.procUcButton.setEnabled(true);
                        this.editUcButton.setVisible(true);
                        this.delUcButton.setText("Eliminar");
                        this.delUcButton.setEnabled(false);
                        this.nomeUcTextField.setEnabled(false);
                        this.editUcButton.setEnabled(true);
                        this.delUcButton.setEnabled(true);
                        this.editUc=false;
                    }else
                        JOptionPane.showMessageDialog(this,"Unidade Curricular já existente!");
                }catch(Exception ex){
                    JOptionPane.showMessageDialog(this,"Unidade Curricular do Curso Inválido!");
                }
            }else
                JOptionPane.showMessageDialog(this,"Deve preencher todos os dados!");
            
            
        }
    }//GEN-LAST:event_novaUcButtonActionPerformed
    /**
     * Método de edição de uma unidade curricular ao sistema
     * BOTÃO: Editar + Guardar
     * RESULTADO: UC editada na Base de Dados
     * @param evt 
     */
    private void editUcButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editUcButtonActionPerformed
        if(!this.editUc){
            this.editUcButton.setText("Guardar");
            this.novaUcButton.setVisible(false);
            this.delUcButton.setEnabled(true);
            this.delUcButton.setText("Cancelar");
            this.procUcButton.setEnabled(false);
            this.codUcTextField.setEnabled(false);
            this.nomeUcTextField.setEnabled(true);
            this.addUcCursoButton.setEnabled(true);
            this.remCursoUcButton.setEnabled(true);
            this.addDocCursoButton.setEnabled(true);
            this.remDocCursoButton.setEnabled(true);
            this.editUc=true;         
        }else{
            bd.updateUC(Integer.parseInt(this.codUcTextField.getText()), this.nomeUcTextField.getText());
            this.editUcButton.setText("Editar");
            this.novaUcButton.setVisible(true);
            this.delUcButton.setEnabled(true);
            this.delUcButton.setText("Eliminar");
            this.procUcButton.setEnabled(true);
            this.codUcTextField.setEnabled(true);
            this.nomeUcTextField.setEnabled(false);
            this.addUcCursoButton.setEnabled(false);
            this.remCursoUcButton.setEnabled(false);
            this.addDocCursoButton.setEnabled(false);
            this.remDocCursoButton.setEnabled(false);
            this.editUc=false;
        }
    }//GEN-LAST:event_editUcButtonActionPerformed
    /**
     * Método de remoção de uma unidade curricular ao sistema
     * BOTÃO: Apagar + Sim
     * RESULTADO: UC removida da Base de Dados
     * @param evt 
     */
    private void delUcButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delUcButtonActionPerformed
        if(this.novaUcButton.isVisible() && this.editUc){
            this.novaUcButton.setText("Novo");
            this.procUcButton.setEnabled(true);
            this.editUcButton.setVisible(true);
            this.delUcButton.setText("Eliminar");
            this.delUcButton.setEnabled(false);
            this.codCursoTextField.setText("");
            this.nomeUcTextField.setEnabled(false);
            this.nomeUcTextField.setText("");
        }else if(this.editUcButton.isVisible() && this.editUc){
            this.editUcButton.setText("Editar");
            this.novaUcButton.setVisible(true);
            this.delUcButton.setEnabled(false);
            this.delUcButton.setText("Eliminar");
            this.procUcButton.setEnabled(true);
            this.codUcTextField.setEnabled(true);
            this.nomeUcTextField.setEnabled(false);
            this.addUcCursoButton.setEnabled(true);
            this.remCursoUcButton.setEnabled(true);
            this.addUcCursoButton.setEnabled(false);
            this.remCursoUcButton.setEnabled(false);
             this.addDocCursoButton.setEnabled(false);
            this.remDocCursoButton.setEnabled(false);
        }else if(!this.editUc){
            if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende eliminar esta Unidade Curricular", "Aviso", JOptionPane.YES_NO_OPTION) == 0) {
                bd.delUc(Integer.parseInt(this.codUcTextField.getText()));
                this.editUcButton.setEnabled(false);
                this.delUcButton.setEnabled(false);
                this.codUcTextField.setText("");
                this.nomeUcTextField.setText("");
                DefaultTableModel cursos =(DefaultTableModel) this.cursosjTable.getModel();
                DefaultTableModel docentes =(DefaultTableModel) this.docjTable.getModel();
                cursos.setRowCount(0);//Limpa os dados que estavam na tabela
                docentes.setRowCount(0);//Limpa os dados que estavam na tabela
            }
        }
        this.editUc=false;
        
    }//GEN-LAST:event_delUcButtonActionPerformed
    /**
     * Método de adição de um departamento ao sistema
     * BOTÃO: Novo + Guardar
     * RESULTADO: Departamento adicionado à Base de Dados
     * @param evt 
     */
    private void addDepButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addDepButtonActionPerformed
        if(!this.editDep){
            this.addDepButton.setText("Guardar");
            this.editDepButton.setVisible(false);
            this.delDepButton.setEnabled(true);
            this.delDepButton.setText("Cancelar");
            this.procDepButton.setEnabled(false);
            this.nomeDepTextField.setEnabled(true);
            this.nomeDepTextField.setText("");
            this.numDepTextField.setText("");
            telDepList.setModel(new javax.swing.AbstractListModel<String>(){
                public int getSize() {return 0;}
                public String getElementAt (int i) {return "";}
            });
            this.editDep=true;
        }else{
            if(this.nomeDepTextField.getText().length()>0 && this.numDepTextField.getText().length()>0){
                try{
                    if(!bd.insereDepartamento(this.nomeDepTextField.getText(), Integer.parseInt(this.numDepTextField.getText())))
                        JOptionPane.showMessageDialog(this,"Departamento já existente!");
                    else{
                        this.addDepButton.setText("Novo");
                        this.editDepButton.setVisible(true);
                        this.editDepButton.setEnabled(true);
                        this.delDepButton.setEnabled(true);
                        this.delDepButton.setText("Eliminar");
                        this.procDepButton.setEnabled(true);
                        this.nomeDepTextField.setEnabled(false);
                        this.editDep=false; 
                    }
                }catch(Exception ex){
                    JOptionPane.showMessageDialog(this,"O código do Departamento não é válido!");
                }   
            }else
                JOptionPane.showMessageDialog(this,"Deve preencher todos os dados!");
        }
    }//GEN-LAST:event_addDepButtonActionPerformed
    /**
     * Método de edição de um departamento ao sistema
     * BOTÃO: Editar + Guardar
     * RESULTADO: Departamento editado na Base de Dados
     * @param evt 
     */
    private void editDepButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editDepButtonActionPerformed
        if (!this.editDep) {
            this.editDepButton.setText("Guardar");
            this.addDepButton.setVisible(false);
            this.delDepButton.setText("Cancelar");
            this.delDepButton.setEnabled(true);
            this.procDepButton.setEnabled(false);
            this.editDepButton.setEnabled(true);
            this.numDepTextField.setEnabled(false);
            this.nomeDepTextField.setEnabled(true);
            this.addTelDepButton.setEnabled(true);
            this.delTelDepButton.setEnabled(true);
            this.editDep = true;
            
        }else{
            this.editDepButton.setText("Editar");
            this.addDepButton.setVisible(true);
            this.delDepButton.setText("Eliminar");
            this.delDepButton.setEnabled(true);
            this.procDepButton.setEnabled(true);
            this.numDepTextField.setEnabled(true);
            this.nomeDepTextField.setEnabled(false);
            this.addTelDepButton.setEnabled(false);
            this.delTelDepButton.setEnabled(false);
            this.editDep = false;
            bd.updateDepartamento(Integer.parseInt(this.numDepTextField.getText()), this.nomeDepTextField.getText());
        }
    }//GEN-LAST:event_editDepButtonActionPerformed
    /**
     * Método de remoção de um departamento ao sistema
     * BOTÃO: Apagar + Sim
     * RESULTADO: Departamento removido da Base de Dados
     * @param evt 
     */
    private void delDepButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delDepButtonActionPerformed
        if (this.addDepButton.isVisible() && this.editDep) {
            this.addDepButton.setText("Novo");
            this.editDepButton.setVisible(true);
            this.editDepButton.setEnabled(false);
            this.delDepButton.setEnabled(false);
            this.delDepButton.setText("Eliminar");
            this.procDepButton.setEnabled(true);
            this.numDepTextField.setText("");
            this.nomeDepTextField.setEnabled(false);
            this.nomeDepTextField.setText("");
        }else if (this.editDepButton.isVisible() && this.editDep) {
            this.editDepButton.setText("Editar");
            this.addDepButton.setVisible(true);
            this.delDepButton.setText("Eliminar");
            this.delDepButton.setEnabled(true);
            this.procDepButton.setEnabled(true);
            this.numDepTextField.setEnabled(true);
            this.nomeDepTextField.setEnabled(false);
            this.addTelDepButton.setEnabled(false);
            this.delTelDepButton.setEnabled(false);
        }else if(!this.editDep){
            if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende eliminar este Departamento?", "Aviso", JOptionPane.YES_NO_OPTION)     == 0) {
                bd.delDepartamento(Integer.parseInt(this.numDepTextField.getText()));
                this.editDepButton.setEnabled(false);
                this.delDepButton.setEnabled(false);
                this.numDepTextField.setText("");
                this.nomeDepTextField.setText("");
                telDepList.setModel(new javax.swing.AbstractListModel<String>(){
                    public int getSize() {return 0;}
                    public String getElementAt (int i) {return "";}
                });
            }
        }
            this.editDep=false;
    }//GEN-LAST:event_delDepButtonActionPerformed
    /**
     * Método de adição de um docente ao sistema
     * BOTÃO: Novo + Guardar
     * RESULTADO: Docente adicionado à Base de Dados
     * @param evt 
     */
    private void addDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addDocButtonActionPerformed
        if (!this.editDoc) {
            this.addDocButton.setText("Guardar");
            this.editDocButton.setVisible(false);
            this.delDocButton.setEnabled(true);
            this.delDocButton.setText("Cancelar");
            this.procuraDocButton.setEnabled(false);
            this.nomeDocTextField.setEnabled(true);
            this.numMecTextField.setText("");
            this.nomeDocTextField.setText("");
            this.emailDocTextField.setEnabled(true);
            this.emailDocTextField.setText("");
            this.areaDocTextField.setEnabled(true);
            this.areaDocTextField.setText("");
            this.descDocTextArea.setEnabled(true);
            this.descDocTextArea.setText("");
            this.editDoc = true;
        }else{
            try{
                if(this.numMecTextField.getText().length() > 0 && this.nomeDocTextField.getText().length() > 0 && this.emailDocTextField.getText().length() > 0 && this.areaDocTextField.getText().length() > 0 && this.descDocTextArea.getText().length() > 0){
                    if(!bd.insereDocente(Integer.parseInt(this.numMecTextField.getText()), this.nomeDocTextField.getText(), this.emailDocTextField.getText(), this.areaDocTextField.getText(), this.descDocTextArea.getText())) 
                        JOptionPane.showMessageDialog(this,"Já existe um docente com o mesmo número mecanográfico");

                    this.addDocButton.setText("Novo");
                    this.editDocButton.setVisible(true);
                    this.delDocButton.setEnabled(false);
                    this.delDocButton.setText("Eliminar");
                    this.procuraDocButton.setEnabled(true);
                    this.nomeDocTextField.setEnabled(false);
                    this.emailDocTextField.setEnabled(false);
                    this.areaDocTextField.setEnabled(false);
                    this.descDocTextArea.setEnabled(false);
                    this.editDocButton.setEnabled(true);
                    this.delDocButton.setEnabled(true);
                    this.editDoc = false;           
                }else{
                    JOptionPane.showMessageDialog(this,"Existem dados em falta!");
                }
            }catch(Exception ex){
                JOptionPane.showMessageDialog(this,"O número mecanográfico deve conter um número inteiro!");
            }
        }
    }//GEN-LAST:event_addDocButtonActionPerformed
    /**
     * Método de edição de um docente ao sistema
     * BOTÃO: Editar + Guardar
     * RESULTADO: Docente editado na Base de Dados
     * @param evt 
     */
    private void editDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editDocButtonActionPerformed
        if (!this.editDoc) {
            this.editDocButton.setText("Guardar");
            this.addDocButton.setVisible(false);
            this.delDocButton.setEnabled(true);
            this.delDocButton.setText("Cancelar");
            this.procuraDocButton.setEnabled(false);
            this.numMecTextField.setEnabled(false);
            this.nomeDocTextField.setEnabled(true);
            this.emailDocTextField.setEnabled(true);
            this.areaDocTextField.setEnabled(true);
            this.descDocTextArea.setEnabled(true);
            this.addTelDocButton.setEnabled(true);
            this.remTelDocButton.setEnabled(true);
            this.addGabDocButton.setEnabled(true);
            this.remGabDocButton.setEnabled(true);
            this.editDoc = true;
        }else{
            this.editDocButton.setText("Editar");
            this.addDocButton.setVisible(true);
            this.delDocButton.setEnabled(true);
            this.delDocButton.setText("Eliminar");
            this.procuraDocButton.setEnabled(true);
            this.numMecTextField.setEnabled(true);
            this.nomeDocTextField.setEnabled(false);
            this.emailDocTextField.setEnabled(false);
            this.areaDocTextField.setEnabled(false);
            this.descDocTextArea.setEnabled(false);
            this.addTelDocButton.setEnabled(false);
            this.remTelDocButton.setEnabled(false);
            this.addGabDocButton.setEnabled(false);
            this.remGabDocButton.setEnabled(false);
            bd.updateDocente(Integer.parseInt(this.numMecTextField.getText()), this.nomeDocTextField.getText(), this.emailDocTextField.getText(), this.areaDocTextField.getText(), this.descDocTextArea.getText());
            this.editDoc = false;
        }
    }//GEN-LAST:event_editDocButtonActionPerformed
    /**
     * Método de remoção de um docente ao sistema
     * BOTÃO: Apagar + Sim
     * RESULTADO: Docente removido da Base de Dados
     * @param evt 
     */
    private void delDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delDocButtonActionPerformed
        if (this.addDocButton.isVisible() && this.editDoc) {
            this.addDocButton.setText("Novo");
            this.editDocButton.setVisible(true);
            this.delDocButton.setEnabled(false);
            this.delDocButton.setText("Eliminar");
            this.procuraDocButton.setEnabled(true);
            this.numMecTextField.setText("");
            this.nomeDocTextField.setEnabled(false);
            this.nomeDocTextField.setText("");
            this.emailDocTextField.setEnabled(false);
            this.emailDocTextField.setText("");
            this.areaDocTextField.setEnabled(false);
            this.areaDocTextField.setText("");
            this.descDocTextArea.setEnabled(false);
            this.descDocTextArea.setText("");
        }else if(this.editDocButton.isVisible() && this.editDoc){
            this.editDocButton.setText("Editar");
            this.addDocButton.setVisible(true);
            this.delDocButton.setEnabled(true);
            this.delDocButton.setText("Eliminar");
            this.procuraDocButton.setEnabled(true);
            this.numMecTextField.setEnabled(true);
            this.nomeDocTextField.setEnabled(false);
            this.emailDocTextField.setEnabled(false);
            this.areaDocTextField.setEnabled(false);
            this.descDocTextArea.setEnabled(false);
            this.addTelDocButton.setEnabled(false);
            this.remTelDocButton.setEnabled(false);
            this.addGabDocButton.setEnabled(false);
            this.remGabDocButton.setEnabled(false);
        }else if(!this.editDoc){
            if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende eliminar este Docente?", "Aviso", JOptionPane.YES_NO_OPTION) == 0) {
                bd.delDocente(Integer.parseInt(this.numMecTextField.getText()));
                this.editDocButton.setEnabled(false);
                this.delDocButton.setEnabled(false);
                this.numMecTextField.setText("");
                this.nomeDocTextField.setText("");
                this.areaDocTextField.setText("");
                this.descDocTextArea.setText("");
                this.emailDocTextField.setText("");
                telDocList.setModel(new javax.swing.AbstractListModel<String>(){
                    public int getSize() {return 0;}
                    public String getElementAt (int i) {return "";}
                });
                DefaultTableModel gabinetes =(DefaultTableModel) this.gabineteTable.getModel();
                gabinetes.setRowCount(0);//Limpa os dados que estavam na tabela
            }
        }
        this.editDoc=false;
    }//GEN-LAST:event_delDocButtonActionPerformed
    /**
     * Método de adição de um curso ao sistema
     * BOTÃO: Novo + Guardar
     * RESULTADO: Curso adicionado à Base de Dados
     * @param evt 
     */
    private void addCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addCursoButtonActionPerformed
        if (!this.editCur) {
            this.procCursoButton.setEnabled(false);
            this.addCursoButton.setText("Guardar");
            this.editCursoButton.setVisible(false);
            this.delCursoButton.setEnabled(true);
            this.delCursoButton.setText("Cancelar");
            this.nomeCursoTextField.setEnabled(true);
            this.depCursoComboBox.setEnabled(true);
            this.tipoCursoComboBox.setEnabled(true);
            this.numRespTextField.setEnabled(true);
            this.procRespButton.setEnabled(true);
            this.codCursoTextField.setText("");
            this.nomeCursoTextField.setText("");
            this.numRespTextField.setText("");
            this.nomeRespTextField.setText("");
            this.editCur = true;
            ArrayList<Departamento> d = bd.allDepartamentos();
                
            for(Departamento i: d){
                this.depCursoComboBox.addItem(i.getCodigoDepart() + " - "+ i.getNomeDepartamento());
            }
        }else{
            if (this.codCursoTextField.getText().length()>0 && this.nomeCursoTextField.getText().length() > 0) {
                TipoCurso t = TipoCurso.CTESP;
              
                
                if(this.tipoCursoComboBox.getSelectedItem().toString() == "CTESP")
                    t = TipoCurso.CTESP;
                else if(this.tipoCursoComboBox.getSelectedItem().toString() == "Licenciatura")
                    t = TipoCurso.LICENCIATURA;
                else
                    t = TipoCurso.MESTRADO;
                String dep = this.depCursoComboBox.getSelectedItem().toString();
                String[] s = dep.split(" - ");
                
                if(!bd.insereCurso(Integer.parseInt(this.codCursoTextField.getText()), this.nomeCursoTextField.getText(), Integer.parseInt(s[0]), Integer.parseInt(this.numRespTextField.getText()), t)){
                    JOptionPane.showMessageDialog(this,"Curso já existe!");
                }else{
                    this.procCursoButton.setEnabled(true);
                    this.addCursoButton.setText("Novo");
                    this.editCursoButton.setVisible(true);
                    this.delCursoButton.setEnabled(false);
                    this.delCursoButton.setText("Eliminar");
                    this.nomeCursoTextField.setEnabled(false);
                    this.depCursoComboBox.setEnabled(false);
                    this.tipoCursoComboBox.setEnabled(false);
                    this.numRespTextField.setEnabled(false);
                    this.procRespButton.setEnabled(false);
                    this.editCursoButton.setEnabled(true);
                    this.delCursoButton.setEnabled(true);
                }
                this.editCur = false;
            }else{
                JOptionPane.showMessageDialog(this,"Existem dados em falta!");
            }
            
            
            
        }
    }//GEN-LAST:event_addCursoButtonActionPerformed
    /**
     * Método de edição de um curso ao sistema
     * BOTÃO: Editar + Guardar
     * RESULTADO: Curso editado na Base de Dados
     * @param evt 
     */
    private void editCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editCursoButtonActionPerformed
        if (!this.editCur) {
            this.codCursoTextField.setEnabled(false);
            this.procCursoButton.setEnabled(false);
            this.addCursoButton.setVisible(false);
            this.editCursoButton.setText("Guardar");
            this.delCursoButton.setEnabled(true);
            this.delCursoButton.setText("Cancelar");
            this.nomeCursoTextField.setEnabled(true);
            this.depCursoComboBox.setEnabled(true);
            this.tipoCursoComboBox.setEnabled(true);
            this.numRespTextField.setEnabled(true);
            this.procRespButton.setEnabled(true);
            this.editCur = true;
        }else{
            String dep = this.depCursoComboBox.getSelectedItem().toString();
            String[] s = dep.split(" - ");
            bd.updateCurso(Integer.parseInt(this.codCursoTextField.getText()),this.nomeCursoTextField.getText(),Integer.parseInt(s[0]),Integer.parseInt(this.numRespTextField.getText()),this.tipoCursoComboBox.getSelectedItem().toString());
            this.codCursoTextField.setEnabled(true);
            this.procCursoButton.setEnabled(true);
            this.addCursoButton.setVisible(true);
            this.editCursoButton.setText("Editar");
            this.delCursoButton.setEnabled(true);
            this.delCursoButton.setText("Eliminar");
            this.nomeCursoTextField.setEnabled(false);
            this.depCursoComboBox.setEnabled(false);
            this.tipoCursoComboBox.setEnabled(false);
            this.numRespTextField.setEnabled(false);
            this.procRespButton.setEnabled(false);
            this.editCur = false;
        }
    }//GEN-LAST:event_editCursoButtonActionPerformed
    /**
     * Método de remoção de um curso ao sistema
     * BOTÃO: Apagar + Sim
     * RESULTADO: Curso removido da Base de Dados
     * @param evt 
     */
    private void delCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delCursoButtonActionPerformed
        if (this.addCursoButton.isVisible() && this.editCur) {
            this.procCursoButton.setEnabled(true);
            this.addCursoButton.setText("Novo");
            this.editCursoButton.setVisible(true);
            this.editCursoButton.setEnabled(false);
            this.delCursoButton.setEnabled(false);
            this.delCursoButton.setText("Eliminar");
            this.codCursoTextField.setText("");
            this.nomeCursoTextField.setEnabled(false);
            this.nomeCursoTextField.setText("");
            this.depCursoComboBox.setEnabled(false);
            this.tipoCursoComboBox.setEnabled(false);
            this.numRespTextField.setEnabled(false);
            this.numRespTextField.setText("");
            this.procRespButton.setEnabled(false);           
        }else if (this.editCursoButton.isVisible() && this.editCur) {
            this.codCursoTextField.setEnabled(true);
            this.procCursoButton.setEnabled(true);
            this.addCursoButton.setVisible(true);
            this.editCursoButton.setText("Editar");
            this.delCursoButton.setEnabled(false);
            this.delCursoButton.setText("Eliminar");
            this.nomeCursoTextField.setEnabled(false);
            this.depCursoComboBox.setEnabled(false);
            this.tipoCursoComboBox.setEnabled(false);
            this.numRespTextField.setEnabled(false);
            this.procRespButton.setEnabled(false);
        }else if(!this.editCur){
            if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende eliminar este Curso?", "Aviso", JOptionPane.YES_NO_OPTION) == 0) {
                bd.delCurso(Integer.parseInt(this.codCursoTextField.getText()));
                this.editCursoButton.setEnabled(false);
                this.delCursoButton.setEnabled(false);
                this.codCursoTextField.setText("");
                this.nomeCursoTextField.setText("");
                this.numRespTextField.setText("");
                this.nomeRespTextField.setText("");
            }
        }
        this.editCur = false;
    }//GEN-LAST:event_delCursoButtonActionPerformed
    /**
     * Método de pesquisa de utilizador
     * RESULTADO: Email do utilizador apresentado caso este exista
     * @param evt 
     */
    private void procUserButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_procUserButtonActionPerformed
        Perfil p;
        if(this.emailUserTextField.getText().length()>0){
           p = bd.procuraUser(this.emailUserTextField.getText());
           
           if (p == Perfil.BASICO){
                this.UserPerfilComboBox.setSelectedIndex(0);
                this.editUserButton.setEnabled(true);
                this.delUserButton.setEnabled(true);
           }else if(p == Perfil.ADMIN){
               this.UserPerfilComboBox.setSelectedIndex(1);
               this.editUserButton.setEnabled(true);
               this.delUserButton.setEnabled(true);
           }else{
               JOptionPane.showMessageDialog(this,"Utilizador não encontrado!");
               this.editUserButton.setEnabled(false);
               this.delUserButton.setEnabled(false);
               
           }   
        }
    }//GEN-LAST:event_procUserButtonActionPerformed
    /**
     * Método de reposição da palavra-passe
     * BOTÃO: Repor palavra-passe
     * RESULTADO: Reposição da palavra-passe ficando esta igual ao email do utilizador
     * @param evt 
     */
    private void reporPasswordButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_reporPasswordButtonActionPerformed
        if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende repor a Palavra-Passe Para este Utilizador", "Aviso", JOptionPane.YES_NO_OPTION) == 0) {
            bd.mudaPassUtilizador(this.emailUserTextField.getText(),this.emailUserTextField.getText());
        }
    }//GEN-LAST:event_reporPasswordButtonActionPerformed
    /**
     * Método de apresentação das informações dos departamentos
     */
    private void procuraDep(){
        DefaultListModel telList = new DefaultListModel();
        try{
            Departamento d = bd.procuraDepartamento(Integer.parseInt(this.numDepTextField.getText()));
            if(!d.getNomeDepartamento().equals("teste")){
                this.nomeDepTextField.setText(d.getNomeDepartamento());
                ArrayList<String> telefones = d.getTelefones();
                this.editDepButton.setEnabled(true);
                this.delDepButton.setEnabled(true);
                telDepList.setModel(new javax.swing.AbstractListModel<String>(){
                    public int getSize() {return telefones.size();}
                    public String getElementAt (int i) {return telefones.get(i);}
                });
            }else{
                this.editDepButton.setEnabled(false);
                this.delDepButton.setEnabled(false);
                this.nomeDepTextField.setText("");
                telDepList.setModel(new javax.swing.AbstractListModel<String>(){
                    public int getSize() {return 0;}
                    public String getElementAt (int i) {return "";}
                });
                JOptionPane.showMessageDialog(this,"Departamento não encontrado!");
            }
        }catch(Exception ex){
            this.editDepButton.setEnabled(false);
            this.delDepButton.setEnabled(false);
            this.nomeDepTextField.setText("");
            telDepList.setModel(new javax.swing.AbstractListModel<String>(){
                public int getSize() {return 0;}
                public String getElementAt (int i) {return "";}
            });
            JOptionPane.showMessageDialog(this,"O código do Departamento não é válido!");
        }
        
    }
    /**
     * Método resultante da seleção do botão de procura dentro da interface relativa à administração de departamentos
     * @param evt 
     */
    private void procDepButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_procDepButtonActionPerformed
        procuraDep();
    }//GEN-LAST:event_procDepButtonActionPerformed
    /**
     * Método de adição de um telefone a um departamento
     * BOTÃO: + na interface de administração do utilizador
     * @param evt 
     */
    private void addTelDepButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addTelDepButtonActionPerformed
        String s = "";
        while(s==""){
            try{
                s = JOptionPane.showInputDialog(this, "Insira o número de telefone","Número de telefone", JOptionPane.PLAIN_MESSAGE);
                int i = Integer.parseInt(s);
            }catch(Exception e){
                JOptionPane.showMessageDialog(this,"O número de telefone deve ser apenas constuidos por valores númericos!");
                s="";
            }          
        }
        if(!bd.insereTelDepartamento(Integer.parseInt(this.numDepTextField.getText()), s)){
            JOptionPane.showMessageDialog(this,"O departamento já contem esse Telefone");
        }else
            procuraDep();  
    
    }//GEN-LAST:event_addTelDepButtonActionPerformed
    /**
     * Método de remoção de um telefone a um departamento
     * BOTÃO: - na interface de administração do utilizador
     * @param evt 
     */
    private void delTelDepButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delTelDepButtonActionPerformed
        bd.delTelDepartamento(Integer.parseInt(this.numDepTextField.getText()), this.telDepList.getSelectedValue().toString());
        procuraDep();
    }//GEN-LAST:event_delTelDepButtonActionPerformed
    /**
     * Método de apresentação do nome do responsável do curso
     */
    private void procRespButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_procRespButtonActionPerformed
        try{
            Professor p = bd.procuraDocente(Integer.parseInt(this.numRespTextField.getText()));
            this.nomeRespTextField.setText(p.getNome());
        }catch(Exception ex){
            JOptionPane.showMessageDialog(this,"O número mecanográfico do docente não é válido!");
        }
        
    }//GEN-LAST:event_procRespButtonActionPerformed
    /**
     * Método de procura de um curso
     * @param evt 
     */
    private void procCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_procCursoButtonActionPerformed
       try{
           Curso c = bd.procuraCurso(Integer.parseInt(this.codCursoTextField.getText()));
        
            ArrayList<Departamento> d = bd.allDepartamentos();
            this.depCursoComboBox.removeAll();
            int numDep =0;
            try{
                for(Departamento i: d){
                     if(!(c.getCodigoDepart() == i.getCodigoDepart()))
                         numDep++;
                     this.depCursoComboBox.addItem(i.getCodigoDepart() + " - "+ i.getNomeDepartamento());
                 }
                 int tipo;
                 if(c.getTipo()==TipoCurso.LICENCIATURA)
                     tipo=1;
                 else if(c.getTipo() == TipoCurso.MESTRADO)
                     tipo=2;
                 else
                     tipo=0;

                 this.nomeCursoTextField.setText(c.getNomeCurso());
                 this.depCursoComboBox.setSelectedIndex(numDep);
                 this.tipoCursoComboBox.setSelectedIndex(tipo);
                 this.numRespTextField.setText(String.valueOf(c.getResp()));
                 Professor p = bd.procuraDocente(c.getResp());
                 this.nomeRespTextField.setText(p.getNome());
                 this.editCursoButton.setEnabled(true);
                 this.delCursoButton.setEnabled(true);
            }catch(Exception ex){
                this.editCursoButton.setEnabled(false);
                this.delCursoButton.setEnabled(false);
                this.nomeCursoTextField.setText("");
                this.depCursoComboBox.setSelectedIndex(0);
                this.tipoCursoComboBox.setSelectedIndex(0);
                this.numRespTextField.setText("");
                this.nomeRespTextField.setText("");
                JOptionPane.showMessageDialog(this,"O curso não existe!");
            }
       }catch(Exception ex){
            this.editCursoButton.setEnabled(false);
            this.delCursoButton.setEnabled(false);
            this.nomeCursoTextField.setText("");
            this.depCursoComboBox.setSelectedIndex(0);
            this.tipoCursoComboBox.setSelectedIndex(0);
            this.numRespTextField.setText("");
            this.nomeRespTextField.setText("");
            JOptionPane.showMessageDialog(this,"O código do curso não é válido!");
       }
    }//GEN-LAST:event_procCursoButtonActionPerformed
    /**
     * Método de procura e apresentação da informação de um docente
     */
    private void procDoc(){  
        DefaultTableModel gabinetes =(DefaultTableModel) this.gabineteTable.getModel();
        try{
            Professor p = bd.procuraDocente(Integer.parseInt(this.numMecTextField.getText()));             
            
            gabinetes.setRowCount(0);
            this.nomeDocTextField.setText(p.getNome());
            this.emailDocTextField.setText(p.getEmail());
            this.descDocTextArea.setText(p.getDescricao());
            this.areaDocTextField.setText(p.getArea());
            this.editDocButton.setEnabled(true);
            this.delDocButton.setEnabled(true);
            ArrayList<String> t = p.getTelefones();
            ArrayList<Gabinete> g = p.getGabinetes();

            telDocList.setModel(new javax.swing.AbstractListModel<String>(){
                public int getSize() {return t.size();}
                public String getElementAt (int i) {return t.get(i);}
            });

        for(Gabinete temp:g){
            gabinetes.addRow(new Object[]{temp.getCodigoDepart(), temp.getNomeDepartamento(),temp.getNumero(),temp.getTelefone()});         
        }          
        }catch(Exception ex){
            this.editDocButton.setEnabled(false);
            this.delDocButton.setEnabled(false);
            this.nomeDocTextField.setText("");
            this.emailDocTextField.setText("");
            this.descDocTextArea.setText("");
            this.areaDocTextField.setText("");
            gabinetes.setRowCount(0);
            telDocList.setModel(new javax.swing.AbstractListModel<String>(){
                public int getSize() {return 0;}
                public String getElementAt (int i) {return "";}
            });
            JOptionPane.showMessageDialog(this,"O Docente não existe!");
        }
       
    }
    
    private void procuraDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_procuraDocButtonActionPerformed
        procDoc();
    }//GEN-LAST:event_procuraDocButtonActionPerformed
    /**
     * Método de procura e apresentação da informação de uma UC
     */
    private void procUC(){
        DefaultTableModel cursos =(DefaultTableModel) this.cursosjTable.getModel();
        DefaultTableModel docentes =(DefaultTableModel) this.docjTable.getModel();
        try{
            ArrayList<UC> ucs = bd.procuraUC(Integer.parseInt(this.codUcTextField.getText()));
            String nome = bd.procuraUCVazia(Integer.parseInt(this.codUcTextField.getText()));
            ArrayList<Professor> ps = bd.procuraDocenteUC(Integer.parseInt(this.codUcTextField.getText()));           
            
            if(!(ucs.size()==0)){
                cursos.setRowCount(0);//Limpa os dados que estavam na tabela
                docentes.setRowCount(0);//Limpa os dados que estavam na tabela
                this.editUcButton.setEnabled(true);
                this.delUcButton.setEnabled(true);
                for(UC uc:ucs){
                    if(!(this.nomeUcTextField.getText().length()>0)){
                        this.nomeUcTextField.setText(uc.getNome());
                    }
                    cursos.addRow(new Object[]{uc.getCodigoCurso(),uc.getNomeCurso(),uc.getAno()});         
                }                
                for(Professor p:ps){
                    docentes.addRow(new Object[]{p.getNmec(),p.getNome()});         
                }
            }else if(!nome.equals("")){
                cursos.setRowCount(0);//Limpa os dados que estavam na tabela
                docentes.setRowCount(0);//Limpa os dados que estavam na tabela
                this.editUcButton.setEnabled(true);
                this.delUcButton.setEnabled(true);
                this.nomeUcTextField.setText(nome);
            }else{
                this.nomeUcTextField.setText("");
                this.editUcButton.setEnabled(false);
                this.delUcButton.setEnabled(false);
                cursos.setRowCount(0);//Limpa os dados que estavam na tabela
                docentes.setRowCount(0);//Limpa os dados que estavam na tabela
                JOptionPane.showMessageDialog(this,"A Unidade Curricular não existe!");                 
            }
            
        }catch(Exception ex){
            this.nomeUcTextField.setText("");
            this.editUcButton.setEnabled(false);
            this.delUcButton.setEnabled(false);
            cursos.setRowCount(0);//Limpa os dados que estavam na tabela
            docentes.setRowCount(0);//Limpa os dados que estavam na tabela
           JOptionPane.showMessageDialog(this,"O código da Unidade Curricular não é válido!"); 
        }
        
    }
    private void procUcButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_procUcButtonActionPerformed
        procUC();
    }//GEN-LAST:event_procUcButtonActionPerformed
    /**
     * Método de adição de uma associação criada entre uma UC e um curso
     * @param evt 
     */
    private void addUcCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addUcCursoButtonActionPerformed
        ArrayList<Curso> c = bd.allCursos();
        Object[] s = new String[c.size()];
        Icon icon = null ;
        
        int i=0;
        for(Curso p:c){
            s[i]=p.getCodigoCurso() + " - " + p.getNomeCurso();
            i++;
        }
        
        String selected = (String)JOptionPane.showInputDialog(this,"Curso","Selecione o curso",JOptionPane.PLAIN_MESSAGE,icon, s,s[0]);
        String[] temp = selected.split(" - ");
        int curso = Integer.parseInt(temp[0]);
        
        Object[] ano = {1,2,3,4,5};
        int a = (int)JOptionPane.showInputDialog(this,"Ano","Selecione o ano",JOptionPane.PLAIN_MESSAGE,icon, ano,ano[0]);
        
        
            if(!bd.insereAno(Integer.parseInt(this.codUcTextField.getText()), curso, a)){          
                JOptionPane.showMessageDialog(this,"Unidade Curricular já inserida!");
                procUC();
            }
        
        
    }//GEN-LAST:event_addUcCursoButtonActionPerformed
    /**
     * Método de remoção de uma associação criada entre uma UC e um curso
     * @param evt 
     */
    private void remCursoUcButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_remCursoUcButtonActionPerformed
        int row = this.cursosjTable.getSelectedRow();
        
        int uc = Integer.parseInt(this.codUcTextField.getText());
        int curso = Integer.parseInt(this.cursosjTable.getModel().getValueAt(row, 0).toString());
        int ano = Integer.parseInt(this.cursosjTable.getModel().getValueAt(row, 2).toString());
        
        bd.delAno(uc, curso, ano);
        procUC();
    }//GEN-LAST:event_remCursoUcButtonActionPerformed
    /**
     * Método de adição de uma associação criada entre uma UC e um docente
     * @param evt 
     */
    private void addDocCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addDocCursoButtonActionPerformed
        try{
            int d = Integer.parseInt(JOptionPane.showInputDialog(this,"Número Mecanográfico","Docente",JOptionPane.PLAIN_MESSAGE));
            Professor p= bd.infoAddDocente(d);
            if(!bd.insereDocenteUC(d, Integer.parseInt(this.codUcTextField.getText()))){
                JOptionPane.showMessageDialog(this,"O Docente já lecciona esta unidade curricular!");
            }
            procUC();
        }catch(Exception ex){
            JOptionPane.showMessageDialog(this,"Número Mecanografico Inválido!");
        }
        
    }//GEN-LAST:event_addDocCursoButtonActionPerformed
    /**
     * Método de remoção de uma associação criada entre uma UC e um docente
     * @param evt 
     */
    private void remDocCursoButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_remDocCursoButtonActionPerformed
         int row = this.docjTable.getSelectedRow();
        
        int uc = Integer.parseInt(this.codUcTextField.getText());
        int num = Integer.parseInt(this.docjTable.getModel().getValueAt(row, 0).toString());
        
        
        bd.delDocenteUc(uc, num);
        procUC();
    }//GEN-LAST:event_remDocCursoButtonActionPerformed
    /**
     * Método de remoção de um telefone de um docente
     * @param evt 
     */
    private void remTelDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_remTelDocButtonActionPerformed
        bd.delTelDoc(Integer.parseInt(this.numMecTextField.getText()), this.telDocList.getSelectedValue());
        this.procDoc();
    }//GEN-LAST:event_remTelDocButtonActionPerformed
    /**
     * Método de adição de um gabinete a um docente
     * @param evt 
     */
    private void addGabDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addGabDocButtonActionPerformed
        ArrayList<Departamento> d = bd.allDepartamentos();
        Object[] s = new String[d.size()];
        Icon icon = null ;
        
        int i=0;
        for(Departamento p:d){
            s[i]=p.getCodigoDepart() + " - " + p.getNomeDepartamento();
            i++;
        }
        
        String selected = (String)JOptionPane.showInputDialog(this,"Departamento","Selecione o Departamento",JOptionPane.PLAIN_MESSAGE,icon, s,s[0]);
        String[] temp = selected.split(" - ");
        int dep = Integer.parseInt(temp[0]);
        
        ArrayList<Gabinete> salas = bd.procuraGabineteDep(dep);
        i=0;
        s = new String[salas.size()];
        
        for(Gabinete p:salas){
            s[i] = String.valueOf(p.getNumero());
            i++;
        }
        try{
            String sala = (String)JOptionPane.showInputDialog(this,"Salas","Selecione a Sala",JOptionPane.PLAIN_MESSAGE,icon, s,s[0]);
            
            int indice = bd.procuraGabineteIndice(dep, Integer.parseInt(sala));
            
            bd.insereDocenteGabinte(Integer.parseInt(this.numMecTextField.getText()), indice);
            procDoc();
        }catch(Exception ex){
            JOptionPane.showMessageDialog(this,"Departamento sem salas disponiveis!");
        }
        
    }//GEN-LAST:event_addGabDocButtonActionPerformed
    /**
     * Método de remoção de um gabinete a um docente
     * @param evt 
     */
    private void remGabDocButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_remGabDocButtonActionPerformed
        int row = this.gabineteTable.getSelectedRow();
        int dep = Integer.parseInt(this.gabineteTable.getModel().getValueAt(row, 0).toString());
        int sala = Integer.parseInt(this.gabineteTable.getModel().getValueAt(row, 2).toString());
        
        int indice = bd.procuraGabineteIndice(dep, sala);
        
        bd.delGabDoc(Integer.parseInt(this.numMecTextField.getText()), indice);
        procDoc();
    }//GEN-LAST:event_remGabDocButtonActionPerformed
    /**
     * Método relativo ao clicar do botão de gabinetes
     * BOTÃO: Gabinetes
     * RESULTADO: Apresentação da interface de gestão de gabinetes
     * @param evt 
     */
    private void gabinetesButtonMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_gabinetesButtonMouseClicked
        this.hidePanels();
        this.resetColor();
        this.gabinetesPanel.setVisible(true);
        this.gabinetesButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_gabinetesButtonMouseClicked
    /**
     * Método relativo ao entrar do rato no botão de gabinetes
     * @param evt 
     */
    private void gabinetesButtonMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_gabinetesButtonMouseEntered
        this.gabinetesButton.setBackground(new java.awt.Color(51,153,0));
    }//GEN-LAST:event_gabinetesButtonMouseEntered
    /**
     * Método relativo ao sair do rato no botão de gabinetes
     * @param evt 
     */
    private void gabinetesButtonMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_gabinetesButtonMouseExited
        if(!this.gabinetesPanel.isVisible())
            this.gabinetesButton.setBackground(new java.awt.Color(0,204,102));
    }//GEN-LAST:event_gabinetesButtonMouseExited

    private void telGabTextFieldActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_telGabTextFieldActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_telGabTextFieldActionPerformed
    /**
     * Método para criação do drop-down menu de departamentos
     * @param evt 
     */
    private void depComboBoxActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_depComboBoxActionPerformed
        String temp = this.depComboBox.getSelectedItem().toString();
        String[] dep = temp.split(" - ");
        ArrayList<Gabinete> g;
        g = bd.procuraGabineteDep(Integer.parseInt(dep[0]));
        this.salaComboBox.removeAllItems();
        for(Gabinete t:g){
            this.salaComboBox.addItem(String.valueOf(t.getNumero()));
        }
    }//GEN-LAST:event_depComboBoxActionPerformed
    /**
     * Método para criação do drop-down menu de gabinetes
     * @param evt 
     */
    private void salaComboBoxActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_salaComboBoxActionPerformed
       
        String temp = this.depComboBox.getSelectedItem().toString();
        String[] dep = temp.split(" - ");
        try{
            Gabinete g = bd.procuraGabinete(Integer.parseInt(dep[0]), Integer.parseInt(this.salaComboBox.getSelectedItem().toString()));
            this.telGabTextField.setText(g.getTelefone());
            this.editGabButton.setEnabled(true);
            this.delGabButton.setEnabled(true);
        }catch(Exception ex){
            this.telGabTextField.setText("");
            this.editGabButton.setEnabled(false);
            this.delGabButton.setEnabled(false);
            this.novoGabButton.setText("Novo");
            this.delGabButton.setText("Eliminar");
            this.editGabButton.setText("Editar");
            this.editGabButton.setVisible(true);
            this.novoGabButton.setVisible(true);
        }
        
        
        
    }//GEN-LAST:event_salaComboBoxActionPerformed
    /**
     * Método de adição de um gabinete ao sistema
     * BOTÃO: Adicionar + Guardar
     * RESULTADO: Gabinete adicionado à base de dados
     * @param evt 
     */
    private void novoGabButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_novoGabButtonActionPerformed
        
        if(!this.editGab){
            String selected = (JOptionPane.showInputDialog(this,"Número","Inserir nova sala",JOptionPane.PLAIN_MESSAGE));
            Boolean novaSala = false;   
            for(int i=0;i<this.salaComboBox.getItemCount();i++){
                if(selected.equals(this.salaComboBox.getItemAt(i))){
                    JOptionPane.showMessageDialog(this,"Sala já disponivel no Departamento !");
                    novaSala=true;
                }
            }
            if(!novaSala){
                this.editGab=true;
                this.salaComboBox.addItem(selected);
                this.salaComboBox.setSelectedItem(selected);
                this.novoGabButton.setText("Guardar");
                this.editGabButton.setVisible(false);
                this.delGabButton.setText("Cancelar");
                this.delGabButton.setEnabled(true);
                this.telGabTextField.setEnabled(true);
                this.depComboBox.setEnabled(false);
                this.salaComboBox.setEnabled(false);
            }
        }else{
            try{
                String temp = this.depComboBox.getSelectedItem().toString();
                String[] dep = temp.split(" - ");
                bd.insereGabinete(Integer.parseInt(this.salaComboBox.getSelectedItem().toString()), Integer.parseInt(dep[0]), this.telGabTextField.getText());
                this.editGab=false;
                this.novoGabButton.setText("Novo");
                this.editGabButton.setVisible(true);
                this.editGabButton.setEnabled(true);
                this.delGabButton.setText("Eliminar");
                this.delGabButton.setEnabled(true);
                this.telGabTextField.setEnabled(false);
                this.depComboBox.setEnabled(true);
                this.salaComboBox.setEnabled(true);
                }catch(Exception ex){
                    JOptionPane.showMessageDialog(this,"Número da capacidade inválida!");
                }            
        }
        
        
        
    }//GEN-LAST:event_novoGabButtonActionPerformed
    /**
     * Método de edição de um gabinete ao sistema
     * BOTÃO: Editar + Guardar
     * RESULTADO: Gabinete editado na base de dados
     * @param evt 
     */
    private void editGabButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editGabButtonActionPerformed
        if(!this.editGab){
            this.editGab=true;
            this.editGabButton.setText("Guardar");
            this.novoGabButton.setVisible(false);
            this.delGabButton.setText("Cancelar");
            this.telGabTextField.setEnabled(true);
            
        }else{
            try{
                String temp = this.depComboBox.getSelectedItem().toString();
                String[] dep = temp.split(" - ");
                bd.updateGabinete(Integer.parseInt(this.salaComboBox.getSelectedItem().toString()), Integer.parseInt(dep[0]), this.telGabTextField.getText());
                this.editGab=false;
                this.editGabButton.setText("Editar");
                this.novoGabButton.setVisible(true);
                this.delGabButton.setText("Eliminar");
                this.delGabButton.setEnabled(true);
                this.telGabTextField.setEnabled(false);
                }catch(Exception ex){
                    JOptionPane.showMessageDialog(this,"Número da capacidade inválida!");
                }
            
        }
    }//GEN-LAST:event_editGabButtonActionPerformed
    /**
     * Método de remoção de um gabinete ao sistema
     * BOTÃO: Remover + Sim
     * RESULTADO: Gabinete adicionado à base de dados
     * @param evt 
     */
    private void delGabButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_delGabButtonActionPerformed
        if(this.novoGabButton.isVisible() && this.editGab){
            this.novoGabButton.setText("Novo");
            this.editGabButton.setVisible(true);
            this.editGabButton.setEnabled(true);
            this.delGabButton.setText("Eliminar");
            this.delGabButton.setEnabled(true);
            this.telGabTextField.setEnabled(false);
            this.depComboBox.setEnabled(true);
            this.salaComboBox.setEnabled(true);
            
        }else if(this.editGabButton.isVisible() && this.editGab){
            this.editGabButton.setText("Editar");
            this.novoGabButton.setVisible(true);
            this.delGabButton.setText("Eliminar");
            this.delGabButton.setEnabled(true);
            this.telGabTextField.setEnabled(false);
        }else if (!this.editGab){
            String temp = this.depComboBox.getSelectedItem().toString();
            String[] dep = temp.split(" - ");
            if (JOptionPane.showConfirmDialog(this, "Tem a certeza que pretende eliminar este Gabinete?", "Aviso", JOptionPane.YES_NO_OPTION) == 0)
                bd.delGabinte(Integer.parseInt(this.salaComboBox.getSelectedItem().toString()), Integer.parseInt(dep[0]));
                
        }
        this.depComboBox.setSelectedIndex(0);
        this.editGab=false;
    }//GEN-LAST:event_delGabButtonActionPerformed

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
            java.util.logging.Logger.getLogger(AdminFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(AdminFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(AdminFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(AdminFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new AdminFrame().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JComboBox<String> UserPerfilComboBox;
    private javax.swing.JButton addCursoButton;
    private javax.swing.JButton addDepButton;
    private javax.swing.JButton addDocButton;
    private javax.swing.JButton addDocCursoButton;
    private javax.swing.JButton addGabDocButton;
    private javax.swing.JButton addTelDepButton;
    private javax.swing.JButton addTelDocButton;
    private javax.swing.JButton addUcCursoButton;
    private javax.swing.JButton addUserButton;
    private javax.swing.JTextField areaDocTextField;
    private javax.swing.JLabel closeButton;
    private javax.swing.JTextField codCursoTextField;
    private javax.swing.JTextField codUcTextField;
    private javax.swing.JPanel contentPanel;
    private javax.swing.JLabel cursoButton;
    private javax.swing.JPanel cursoPanel;
    private javax.swing.JTable cursosjTable;
    private javax.swing.JButton delCursoButton;
    private javax.swing.JButton delDepButton;
    private javax.swing.JButton delDocButton;
    private javax.swing.JButton delGabButton;
    private javax.swing.JButton delTelDepButton;
    private javax.swing.JButton delUcButton;
    private javax.swing.JButton delUserButton;
    private javax.swing.JComboBox<String> depComboBox;
    private javax.swing.JComboBox<String> depCursoComboBox;
    private javax.swing.JLabel departamentosButton;
    private javax.swing.JPanel departamentosPanel;
    private javax.swing.JTextArea descDocTextArea;
    private javax.swing.JLabel docenteButton;
    private javax.swing.JPanel docentesPanel;
    private javax.swing.JTable docjTable;
    private javax.swing.JButton editCursoButton;
    private javax.swing.JButton editDepButton;
    private javax.swing.JButton editDocButton;
    private javax.swing.JButton editGabButton;
    private javax.swing.JButton editUcButton;
    private javax.swing.JButton editUserButton;
    private javax.swing.JTextField emailDocTextField;
    private javax.swing.JTextField emailUserTextField;
    private javax.swing.JTable gabineteTable;
    private javax.swing.JLabel gabinetesButton;
    private javax.swing.JPanel gabinetesPanel;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel15;
    private javax.swing.JLabel jLabel16;
    private javax.swing.JLabel jLabel17;
    private javax.swing.JLabel jLabel18;
    private javax.swing.JLabel jLabel19;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel20;
    private javax.swing.JLabel jLabel21;
    private javax.swing.JLabel jLabel22;
    private javax.swing.JLabel jLabel25;
    private javax.swing.JLabel jLabel26;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JPanel jPanel6;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JScrollPane jScrollPane5;
    private javax.swing.JScrollPane jScrollPane6;
    private javax.swing.JScrollPane jScrollPane7;
    private javax.swing.JTable jTable1;
    private javax.swing.JTextField nomeCursoTextField;
    private javax.swing.JTextField nomeDepTextField;
    private javax.swing.JTextField nomeDocTextField;
    private javax.swing.JTextField nomeRespTextField;
    private javax.swing.JTextField nomeUcTextField;
    private javax.swing.JButton novaUcButton;
    private javax.swing.JButton novoGabButton;
    private javax.swing.JTextField numDepTextField;
    private javax.swing.JTextField numMecTextField;
    private javax.swing.JTextField numRespTextField;
    private javax.swing.JPanel optionsPanel;
    private javax.swing.JButton procCursoButton;
    private javax.swing.JButton procDepButton;
    private javax.swing.JButton procRespButton;
    private javax.swing.JButton procUcButton;
    private javax.swing.JButton procUserButton;
    private javax.swing.JButton procuraDocButton;
    private javax.swing.JButton remCursoUcButton;
    private javax.swing.JButton remDocCursoButton;
    private javax.swing.JButton remGabDocButton;
    private javax.swing.JButton remTelDocButton;
    private javax.swing.JButton reporPasswordButton;
    private javax.swing.JComboBox<String> salaComboBox;
    private javax.swing.JList<String> telDepList;
    private javax.swing.JList<String> telDocList;
    private javax.swing.JTextField telGabTextField;
    private javax.swing.JComboBox<String> tipoCursoComboBox;
    private javax.swing.JPanel titlePanel;
    private javax.swing.JLabel ucButton;
    private javax.swing.JPanel ucPanel;
    private javax.swing.JLabel usersButton;
    private javax.swing.JPanel usersPanel;
    // End of variables declaration//GEN-END:variables
}
