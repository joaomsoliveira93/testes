/*
 * Classe relativa à interface principal
 */
package UI;

/**
 * Importação das librarias necessárias
 */
import Data.Departamento;
import Data.Gabinete;
import Data.Perfil;
import Data.Professor;
import Data.ProfessorTable;
import Data.UC;
import Database.DatabaseManipulation;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dialog;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.DefaultListModel;
import javax.swing.JDialog;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.ListSelectionModel;
import javax.swing.UIManager;
import javax.swing.plaf.basic.BasicScrollBarUI;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import javax.swing.table.TableColumn;

/**
 * Classe relativa à interface principal
 * @author Grupo 4
 */
public class Interface extends javax.swing.JFrame {

    /**
     * Declaração de variáveis globais + Inicialização de todos os componentes
     */
    private int x, y;
    private Login Login;
    private AdminFrame adminFrame;
    private Password passFrame;
    private DatabaseManipulation bd;
    private ArrayList<ProfessorTable> professores;
    private Professor pf;
    private String email="";
    /**
     * Construtor da classe principal
     */
    public Interface() {
        initComponents();
        //Inicialização variáveis globais
        x = 0; y = 0;
        Login = new Login(this, true);
        bd = new DatabaseManipulation();
        adminFrame = new AdminFrame();
        passFrame = new Password(this,true);
        pf = null;
        /**
         * Thread relativa à inicialização dos componentes da interface
         */
        new Thread(){
            public void run(){
                SlideMenu.setVisible(false);
                SearchResultsPanel.setVisible(false);
                AdministrationPanel.setVisible(false);
                InfoPanel.setVisible(false);
                InfoPanel.setPreferredSize(new Dimension(310, InfoPanel.getHeight()));
            }
        }.start();        
        /**
         * Thread
         * Definição do design das scroll bars utilizadas através do método criado para tal
         */
        new Thread(){
            public void run(){
                setScrollBars();
            }
        }.start();
        /**
         * Thread
         * Inicialização da tabela de resultados da pesquisa
         */
        new Thread(){
            public void run() {
                setSearchTableHeader();
            }
        }.start();
        /**
         * Inicialização da tabela da informação de UC's do docente
         */
        new Thread(){
            public void run() {
                setUCTableHeader();
            }
        }.start();
        /**
         * Criação de um KeyListener no campo de texto de pesquisa
         */
        SearchField.addKeyListener(new KeyListener() {
            DefaultTableModel defaulttablemodel = (DefaultTableModel)TabelaPesquisa.getModel();
            @Override
            public void keyTyped(KeyEvent e) {
                //Nothing is done here
            }

            /**
             * Método que permite a criação de uma pesquisa impulsionada pelo pressionar da tecla enter
             * @param e Evento do teclado (Pressionar de uma tecla)
             */
            @Override
            public void keyPressed(KeyEvent e) {
                MouseEvent evt;
                int event = e.getKeyCode();
                if (event == KeyEvent.VK_ENTER) {
                    new Thread(){
                        public void run() {
                            setSearchPanelVisible();
                        }
                    }.start();
                    // Ação de pesquisa de informação
                    String pesquisa = "";
                    if (SearchField.getText().trim().isEmpty() || SearchField.getText().equals("Pesquisar")) {
                        pesquisa = "";
                    }
                    else pesquisa = SearchField.getText();                    
                    defaulttablemodel.setNumRows(0);
                    professores = bd.selectdocente(pesquisa);
                    for (ProfessorTable p: professores){
                        defaulttablemodel.addRow(new Object[] {
                            p.getDepartamento(), p.getCurso(), p.getUc(), p.getNome(), p.getNmec()
                        });
                    }
                    useMenu();                    
                    SearchResultsPanel.setVisible(true);
                }
            }

            @Override
            public void keyReleased(KeyEvent e) {
                //Nothing is done here
            }
        });
    }
    /**
     * Método de personalização das scroll bars existentes no projeto
     * Utilização de Threads relativa a cada tipo de scroll panel
     */
    private void setScrollBars(){
        new Thread(){
            public void run(){
                DescricaoScrollPanel.getVerticalScrollBar().setBackground(new Color(0,102,102));
                DescricaoScrollPanel.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                DescricaoScrollPanel.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                DescricaoScrollPanel.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                DescricaoScrollPanel.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                DescricaoScrollPanel.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                }); 
            }
        }.start();
        new Thread(){
            public void run(){
                DescricaoUCScrollPanel.getVerticalScrollBar().setBackground(new Color(0,102,102));
                DescricaoUCScrollPanel.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                DescricaoUCScrollPanel.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                DescricaoUCScrollPanel.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                DescricaoUCScrollPanel.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                DescricaoUCScrollPanel.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                }); 
            }
        }.start();
        new Thread(){
            public void run(){
                UCScrollPane.getVerticalScrollBar().setBackground(new Color(0,102,102));
                UCScrollPane.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                UCScrollPane.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                UCScrollPane.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                UCScrollPane.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                UCScrollPane.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                }); 
            }
        }.start();
        new Thread(){
            public void run(){
                ContactosDepartScrollPane.getVerticalScrollBar().setBackground(new Color(0,102,102));
                ContactosDepartScrollPane.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                ContactosDepartScrollPane.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                ContactosDepartScrollPane.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                ContactosDepartScrollPane.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                ContactosDepartScrollPane.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });                
            }
        }.start();
        new Thread(){
            public void run(){
                TabelaDocentesScrollPane.getVerticalScrollBar().setBackground(new Color(0,102,102));
                TabelaDocentesScrollPane.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(15),Integer.MAX_VALUE));
                TabelaDocentesScrollPane.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                TabelaDocentesScrollPane.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(15)));
                TabelaDocentesScrollPane.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                TabelaDocentesScrollPane.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
            }
        }.start();
        new Thread(){
            public void run(){
                GabinetesScrollPanel.getVerticalScrollBar().setBackground(new Color(0,102,102));
                GabinetesScrollPanel.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                GabinetesScrollPanel.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                GabinetesScrollPanel.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                GabinetesScrollPanel.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                GabinetesScrollPanel.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
            }
        }.start();
        new Thread(){
            public void run(){
                TelemovelScrollPane.getVerticalScrollBar().setBackground(new Color(0,102,102));
                TelemovelScrollPane.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                TelemovelScrollPane.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                TelemovelScrollPane.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                TelemovelScrollPane.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                TelemovelScrollPane.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
            }
        }.start();
        new Thread(){
            public void run(){
                CursoResponsavelScrollPane.getVerticalScrollBar().setBackground(new Color(0,102,102));
                CursoResponsavelScrollPane.getVerticalScrollBar().setPreferredSize(new Dimension(Integer.bitCount(5),Integer.MAX_VALUE));
                CursoResponsavelScrollPane.getHorizontalScrollBar().setBackground(new Color(0,102,102));
                CursoResponsavelScrollPane.getHorizontalScrollBar().setPreferredSize(new Dimension(Integer.MAX_VALUE, Integer.bitCount(5)));
                CursoResponsavelScrollPane.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
                CursoResponsavelScrollPane.getHorizontalScrollBar().setUI(new BasicScrollBarUI() {
                    @Override
                    protected void configureScrollBarColors() {
                        this.thumbColor = new Color(255,255,255);
                    }
                });
            }
        }.start();
    }
    /**
     * Método de definição e inicialização da tabela principal
     * Apresentação dos resultados
     */
    private void setSearchTableHeader(){
        TabelaPesquisa.getTableHeader().setOpaque(false);                                           //Define o cabeçalho da tabela como opaco
        DefaultTableCellRenderer headerRenderer = new DefaultTableCellRenderer();                   //Renderizador das celulas da tabela
        headerRenderer.setBackground(new Color(0,102,102));                                         //Define o Background do cabeçalho       
        headerRenderer.setForeground(new Color(255,255,255));                                       //Define a cor da letra do cabeçalho
        headerRenderer.setHorizontalAlignment(0);                                                   //Alinha o texto das células ao centro
        for (int i = 0; i < TabelaPesquisa.getModel().getColumnCount(); i++) {                      //Define todas as células do cabeçalho com as defenições do renderizador
                TabelaPesquisa.getColumnModel().getColumn(i).setHeaderRenderer(headerRenderer);
        }
        TabelaPesquisa.setRowHeight(25);                                                            //Define o tamanho das células da tabela
        TabelaPesquisa.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);                       //Bloqueia a seleção de linhas da tabela para apenas uma de cada vez
    }
    /**
     * Método de definição e inicialização da tabela de informação das Unidades Curriculares associadas ao docente
     * Apresentação dos resultados
     */
    private void setUCTableHeader(){
        UCCursoDepartamentoTable.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
        UCCursoDepartamentoTable.getTableHeader().setOpaque(false);                                             //Define o cabeçalho da tabela como opaco
        DefaultTableCellRenderer headerRenderer = new DefaultTableCellRenderer();                               //Renderizador das celulas da tabela
        headerRenderer.setBackground(new Color(0,102,102));                                                     //Define o Background do cabeçalho       
        headerRenderer.setForeground(new Color(255,255,255));                                                   //Define a cor da letra do cabeçalho
        headerRenderer.setHorizontalAlignment(0);                                                               //Alinha o texto das células ao centro
        for (int i = 0; i < UCCursoDepartamentoTable.getModel().getColumnCount(); i++) {                        //Define todas as células do cabeçalho com as defenições do renderizador
                UCCursoDepartamentoTable.getColumnModel().getColumn(i).setHeaderRenderer(headerRenderer);
        }
        UCCursoDepartamentoTable.setRowHeight(25);                                                              //Define o tamanho das células da tabela
        UCCursoDepartamentoTable.getColumnModel().getColumn(1).setWidth(2);
        UCCursoDepartamentoTable.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);                         //Bloqueia a seleção de linhas da tabela para apenas uma de cada vez
    }
    /**
     * Método de abertura e fecho do menu lateral
     */
    private void useMenu(){
        if (x == 0){
            SlideMenu.setVisible(true);
            SlideMenu.setSize(x, SlideMenu.getHeight());
            Thread th = new Thread() {
                @Override
                public void run() {
                    try {
                        for (int i=0; i<=x; i=i+2) {
                            Thread.sleep(1);
                            SlideMenu.setSize(i, SlideMenu.getHeight());
                        }
                    } catch (Exception e) {
                        JOptionPane.showMessageDialog(null, e);
                    }
                }                
            };th.start();
            x=310;
            return;
        }
        if (x == 310){
            SlideMenu.setSize(SlideMenu.getWidth(), SlideMenu.getHeight());
            Thread th = new Thread() {
                @Override
                public void run() {
                    try {
                        for (int i=310; i>=0; i=i-2) {
                            Thread.sleep(1);
                            SlideMenu.setSize(i, SlideMenu.getHeight());
                        }
                    } catch (Exception e) {
                        JOptionPane.showMessageDialog(null, e);
                    }
                }
            }; th.start();
            x=0;
            SearchField.setFocusable(false);
            SearchField.setFocusable(true);
            return;
        }
    }
    /**
     * Método chamado dentro do construtor da classe - Inicialização de todos os componentes de interface
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        TopBar = new javax.swing.JPanel();
        TopBarMenu = new javax.swing.JLabel();
        LoginPanel = new javax.swing.JPanel();
        LoginIcon = new javax.swing.JLabel();
        SessionLabel = new javax.swing.JLabel();
        emailLabel = new javax.swing.JLabel();
        SlideMenu = new javax.swing.JPanel();
        SearchPanel = new javax.swing.JPanel();
        SearchIcon = new javax.swing.JLabel();
        SearchField = new javax.swing.JTextField();
        AdministrationPanel = new javax.swing.JPanel();
        Admin = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        ExitPanel = new javax.swing.JPanel();
        Exit = new javax.swing.JLabel();
        SearchResultsPanel = new javax.swing.JPanel();
        InfoBigPanel = new javax.swing.JPanel();
        InfoPanel = new javax.swing.JPanel();
        NamePanel = new javax.swing.JPanel();
        TituloDocente = new javax.swing.JLabel();
        Docente = new javax.swing.JLabel();
        NMecTitle = new javax.swing.JLabel();
        NMec = new javax.swing.JLabel();
        ContactosPanel = new javax.swing.JPanel();
        ContactosTitle = new javax.swing.JLabel();
        EmailTitle = new javax.swing.JLabel();
        TelemovelTitle = new javax.swing.JLabel();
        Email = new javax.swing.JLabel();
        TelemovelScrollPane = new javax.swing.JScrollPane();
        TelemovelList = new javax.swing.JList<>();
        AreaTitle = new javax.swing.JLabel();
        Area = new javax.swing.JLabel();
        DescricaoTitle = new javax.swing.JLabel();
        DescricaoScrollPanel = new javax.swing.JScrollPane();
        Descricao = new javax.swing.JTextArea();
        AnoCurricularTitle = new javax.swing.JLabel();
        DescricaoUCScrollPanel = new javax.swing.JScrollPane();
        DescricaoUC = new javax.swing.JTextArea();
        UCScrollPane = new javax.swing.JScrollPane();
        UCCursoDepartamentoTable = new javax.swing.JTable();
        TelemovelDepartamentoTitle = new javax.swing.JLabel();
        DetalheUCTitle = new javax.swing.JLabel();
        GabinetesScrollPanel = new javax.swing.JScrollPane();
        GabineteList = new javax.swing.JTextArea();
        ContactosDepartScrollPane = new javax.swing.JScrollPane();
        TelefoneDepartamentoList = new javax.swing.JList<>();
        GabientesTitle = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
        CursoResponsavelScrollPane = new javax.swing.JScrollPane();
        CursoResponsavel = new javax.swing.JTextArea();
        TabelaDocentesScrollPane = new javax.swing.JScrollPane();
        TabelaPesquisa = new javax.swing.JTable();
        InstitutionLogo = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setBackground(new java.awt.Color(204, 255, 255));
        setMinimumSize(new java.awt.Dimension(1260, 682));
        setUndecorated(true);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowOpened(java.awt.event.WindowEvent evt) {
                formWindowOpened(evt);
            }
        });

        TopBar.setBackground(new java.awt.Color(51, 153, 0));
        TopBar.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));

        TopBarMenu.setBackground(new java.awt.Color(0, 102, 0));
        TopBarMenu.setForeground(new java.awt.Color(102, 102, 102));
        TopBarMenu.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        TopBarMenu.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/Menu.png"))); // NOI18N
        TopBarMenu.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                TopBarMenuMouseClicked(evt);
            }
        });

        LoginPanel.setBackground(new java.awt.Color(51, 153, 0));
        LoginPanel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                LoginPanelMouseClicked(evt);
            }
        });

        LoginIcon.setBackground(new java.awt.Color(255, 255, 255));
        LoginIcon.setForeground(new java.awt.Color(255, 255, 255));
        LoginIcon.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        LoginIcon.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/icons8_male_user_50px_1.png"))); // NOI18N

        SessionLabel.setFont(new java.awt.Font("Dialog", 1, 14)); // NOI18N
        SessionLabel.setForeground(new java.awt.Color(0, 51, 51));
        SessionLabel.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        SessionLabel.setText("Iniciar Sessão");

        javax.swing.GroupLayout LoginPanelLayout = new javax.swing.GroupLayout(LoginPanel);
        LoginPanel.setLayout(LoginPanelLayout);
        LoginPanelLayout.setHorizontalGroup(
            LoginPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(LoginPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(LoginIcon)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(SessionLabel, javax.swing.GroupLayout.DEFAULT_SIZE, 142, Short.MAX_VALUE)
                .addContainerGap())
        );
        LoginPanelLayout.setVerticalGroup(
            LoginPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, LoginPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(LoginPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(SessionLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(LoginIcon, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );

        emailLabel.setFont(new java.awt.Font("Dialog", 1, 14)); // NOI18N
        emailLabel.setForeground(new java.awt.Color(0, 51, 51));
        emailLabel.setText("email");
        emailLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        emailLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                emailLabelMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout TopBarLayout = new javax.swing.GroupLayout(TopBar);
        TopBar.setLayout(TopBarLayout);
        TopBarLayout.setHorizontalGroup(
            TopBarLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(TopBarLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(TopBarMenu)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(emailLabel)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(LoginPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );
        TopBarLayout.setVerticalGroup(
            TopBarLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(TopBarLayout.createSequentialGroup()
                .addContainerGap(42, Short.MAX_VALUE)
                .addGroup(TopBarLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, TopBarLayout.createSequentialGroup()
                        .addGroup(TopBarLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(TopBarMenu)
                            .addComponent(LoginPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addContainerGap())
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, TopBarLayout.createSequentialGroup()
                        .addComponent(emailLabel)
                        .addGap(27, 27, 27))))
        );

        SlideMenu.setBackground(new java.awt.Color(0, 102, 102));
        SlideMenu.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 102, 0)));
        SlideMenu.setPreferredSize(new java.awt.Dimension(310, 510));

        SearchPanel.setBackground(new java.awt.Color(60, 136, 6));
        SearchPanel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                SearchPanelMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                SearchPanelMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                SearchPanelMouseExited(evt);
            }
        });

        SearchIcon.setBackground(new java.awt.Color(51, 51, 51));
        SearchIcon.setFont(new java.awt.Font("Dialog", 1, 18)); // NOI18N
        SearchIcon.setForeground(new java.awt.Color(0, 51, 51));
        SearchIcon.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/Search.png"))); // NOI18N
        SearchIcon.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                SearchIconMouseClicked(evt);
            }
        });

        SearchField.setBackground(new java.awt.Color(60, 136, 6));
        SearchField.setFont(new java.awt.Font("Dialog", 1, 18)); // NOI18N
        SearchField.setForeground(new java.awt.Color(0, 51, 51));
        SearchField.setHorizontalAlignment(javax.swing.JTextField.RIGHT);
        SearchField.setText("Pesquisar");
        SearchField.setCaretColor(new java.awt.Color(204, 204, 204));
        SearchField.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                SearchFieldFocusGained(evt);
            }
            public void focusLost(java.awt.event.FocusEvent evt) {
                SearchFieldFocusLost(evt);
            }
        });

        javax.swing.GroupLayout SearchPanelLayout = new javax.swing.GroupLayout(SearchPanel);
        SearchPanel.setLayout(SearchPanelLayout);
        SearchPanelLayout.setHorizontalGroup(
            SearchPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(SearchPanelLayout.createSequentialGroup()
                .addGap(5, 5, 5)
                .addComponent(SearchIcon, javax.swing.GroupLayout.DEFAULT_SIZE, 55, Short.MAX_VALUE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(SearchField, javax.swing.GroupLayout.PREFERRED_SIZE, 234, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(8, Short.MAX_VALUE))
        );
        SearchPanelLayout.setVerticalGroup(
            SearchPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, SearchPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(SearchPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(SearchField)
                    .addComponent(SearchIcon, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );

        AdministrationPanel.setBackground(new java.awt.Color(60, 136, 6));
        AdministrationPanel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                AdministrationPanelMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                AdministrationPanelMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                AdministrationPanelMouseExited(evt);
            }
        });

        Admin.setBackground(new java.awt.Color(51, 51, 51));
        Admin.setFont(new java.awt.Font("Dialog", 1, 18)); // NOI18N
        Admin.setForeground(new java.awt.Color(0, 51, 51));
        Admin.setText("Administração");

        jLabel2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/Administrative.png"))); // NOI18N

        javax.swing.GroupLayout AdministrationPanelLayout = new javax.swing.GroupLayout(AdministrationPanel);
        AdministrationPanel.setLayout(AdministrationPanelLayout);
        AdministrationPanelLayout.setHorizontalGroup(
            AdministrationPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(AdministrationPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(Admin)
                .addContainerGap(164, Short.MAX_VALUE))
        );
        AdministrationPanelLayout.setVerticalGroup(
            AdministrationPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(AdministrationPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(AdministrationPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel2)
                    .addGroup(AdministrationPanelLayout.createSequentialGroup()
                        .addGap(16, 16, 16)
                        .addComponent(Admin)))
                .addContainerGap(18, Short.MAX_VALUE))
        );

        ExitPanel.setBackground(new java.awt.Color(60, 136, 6));
        ExitPanel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                ExitPanelMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                ExitPanelMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                ExitPanelMouseExited(evt);
            }
        });

        Exit.setBackground(new java.awt.Color(51, 51, 51));
        Exit.setFont(new java.awt.Font("Dialog", 1, 18)); // NOI18N
        Exit.setForeground(new java.awt.Color(0, 51, 51));
        Exit.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/Exit.png"))); // NOI18N
        Exit.setText("Encerrar");

        javax.swing.GroupLayout ExitPanelLayout = new javax.swing.GroupLayout(ExitPanel);
        ExitPanel.setLayout(ExitPanelLayout);
        ExitPanelLayout.setHorizontalGroup(
            ExitPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(ExitPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(Exit, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        ExitPanelLayout.setVerticalGroup(
            ExitPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(ExitPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(Exit, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );

        javax.swing.GroupLayout SlideMenuLayout = new javax.swing.GroupLayout(SlideMenu);
        SlideMenu.setLayout(SlideMenuLayout);
        SlideMenuLayout.setHorizontalGroup(
            SlideMenuLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(AdministrationPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(ExitPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(SearchPanel, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        SlideMenuLayout.setVerticalGroup(
            SlideMenuLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, SlideMenuLayout.createSequentialGroup()
                .addGap(12, 12, 12)
                .addComponent(SearchPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(AdministrationPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(ExitPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
        );

        SearchResultsPanel.setBackground(new java.awt.Color(0, 51, 51));
        SearchResultsPanel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                SearchResultsPanelMouseClicked(evt);
            }
        });

        InfoBigPanel.setBackground(new java.awt.Color(0, 51, 51));
        InfoBigPanel.setMaximumSize(new java.awt.Dimension(310, 32767));
        InfoBigPanel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                InfoBigPanelMouseClicked(evt);
            }
        });

        InfoPanel.setBackground(new java.awt.Color(0, 51, 51));
        InfoPanel.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 153, 153), 2));

        NamePanel.setBackground(new java.awt.Color(0, 102, 102));

        TituloDocente.setFont(new java.awt.Font("Dialog", 1, 14)); // NOI18N
        TituloDocente.setForeground(new java.awt.Color(255, 255, 255));
        TituloDocente.setText("Docente:");

        Docente.setForeground(new java.awt.Color(255, 255, 255));
        Docente.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);

        javax.swing.GroupLayout NamePanelLayout = new javax.swing.GroupLayout(NamePanel);
        NamePanel.setLayout(NamePanelLayout);
        NamePanelLayout.setHorizontalGroup(
            NamePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(NamePanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(TituloDocente)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(Docente, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        NamePanelLayout.setVerticalGroup(
            NamePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(NamePanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(NamePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(TituloDocente, javax.swing.GroupLayout.DEFAULT_SIZE, 32, Short.MAX_VALUE)
                    .addComponent(Docente, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );

        NMecTitle.setForeground(new java.awt.Color(255, 255, 255));
        NMecTitle.setText("Nº Mecanográfico:");

        NMec.setFont(new java.awt.Font("Dialog", 0, 12)); // NOI18N
        NMec.setForeground(new java.awt.Color(255, 255, 255));

        ContactosPanel.setBackground(new java.awt.Color(0, 102, 102));

        ContactosTitle.setBackground(new java.awt.Color(0, 153, 153));
        ContactosTitle.setForeground(new java.awt.Color(255, 255, 255));
        ContactosTitle.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        ContactosTitle.setText("Contactos");
        ContactosTitle.setOpaque(true);

        EmailTitle.setFont(new java.awt.Font("Dialog", 1, 14)); // NOI18N
        EmailTitle.setForeground(new java.awt.Color(255, 255, 255));
        EmailTitle.setText("Email :");

        TelemovelTitle.setFont(new java.awt.Font("Dialog", 1, 14)); // NOI18N
        TelemovelTitle.setForeground(new java.awt.Color(255, 255, 255));
        TelemovelTitle.setHorizontalAlignment(javax.swing.SwingConstants.RIGHT);
        TelemovelTitle.setText("Telemóvel :");

        Email.setFont(new java.awt.Font("Dialog", 0, 12)); // NOI18N
        Email.setForeground(new java.awt.Color(255, 255, 255));

        TelemovelScrollPane.setBackground(new java.awt.Color(0, 51, 51));
        TelemovelScrollPane.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 1, true));

        TelemovelList.setBackground(new java.awt.Color(0, 102, 102));
        TelemovelList.setFont(new java.awt.Font("Dialog", 0, 12)); // NOI18N
        TelemovelList.setForeground(new java.awt.Color(255, 255, 255));
        TelemovelList.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        TelemovelScrollPane.setViewportView(TelemovelList);

        javax.swing.GroupLayout ContactosPanelLayout = new javax.swing.GroupLayout(ContactosPanel);
        ContactosPanel.setLayout(ContactosPanelLayout);
        ContactosPanelLayout.setHorizontalGroup(
            ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(ContactosPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(ContactosPanelLayout.createSequentialGroup()
                        .addGroup(ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(EmailTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(TelemovelTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(Email, javax.swing.GroupLayout.DEFAULT_SIZE, 207, Short.MAX_VALUE)
                            .addComponent(TelemovelScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE))
                        .addContainerGap())
                    .addComponent(ContactosTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
        );
        ContactosPanelLayout.setVerticalGroup(
            ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(ContactosPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(ContactosTitle, javax.swing.GroupLayout.PREFERRED_SIZE, 22, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(Email, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(EmailTitle))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(ContactosPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(ContactosPanelLayout.createSequentialGroup()
                        .addComponent(TelemovelTitle)
                        .addGap(0, 37, Short.MAX_VALUE))
                    .addComponent(TelemovelScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE))
                .addContainerGap())
        );

        AreaTitle.setFont(new java.awt.Font("Dialog", 1, 14)); // NOI18N
        AreaTitle.setForeground(new java.awt.Color(204, 204, 204));
        AreaTitle.setText("Área Científica:");

        Area.setFont(new java.awt.Font("Dialog", 0, 12)); // NOI18N
        Area.setForeground(new java.awt.Color(204, 204, 204));

        DescricaoTitle.setForeground(new java.awt.Color(255, 255, 255));
        DescricaoTitle.setText("Descrição:");

        DescricaoScrollPanel.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 1, true));

        Descricao.setEditable(false);
        Descricao.setBackground(new java.awt.Color(0, 51, 51));
        Descricao.setColumns(20);
        Descricao.setForeground(new java.awt.Color(255, 255, 255));
        Descricao.setRows(5);
        Descricao.setBorder(null);
        Descricao.setOpaque(false);
        DescricaoScrollPanel.setViewportView(Descricao);

        AnoCurricularTitle.setForeground(new java.awt.Color(255, 255, 255));
        AnoCurricularTitle.setText("UC |  Curso  | Ano Curricular | Departamento:");

        DescricaoUCScrollPanel.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 1, true));

        DescricaoUC.setEditable(false);
        DescricaoUC.setBackground(new java.awt.Color(0, 51, 51));
        DescricaoUC.setColumns(20);
        DescricaoUC.setForeground(new java.awt.Color(255, 255, 255));
        DescricaoUC.setRows(5);
        DescricaoUC.setBorder(null);
        DescricaoUC.setOpaque(false);
        DescricaoUCScrollPanel.setViewportView(DescricaoUC);

        UCCursoDepartamentoTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "UC", "Curso", "Ano Curricular", "Departamento"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        UCCursoDepartamentoTable.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                UCCursoDepartamentoTableMouseClicked(evt);
            }
        });
        UCScrollPane.setViewportView(UCCursoDepartamentoTable);

        TelemovelDepartamentoTitle.setForeground(new java.awt.Color(255, 255, 255));
        TelemovelDepartamentoTitle.setText("Contactos Departamento:");

        DetalheUCTitle.setForeground(new java.awt.Color(255, 255, 255));
        DetalheUCTitle.setText("Detalhes da Unidade Curricular:");

        GabinetesScrollPanel.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 1, true));

        GabineteList.setEditable(false);
        GabineteList.setBackground(new java.awt.Color(0, 51, 51));
        GabineteList.setColumns(20);
        GabineteList.setForeground(new java.awt.Color(255, 255, 255));
        GabineteList.setRows(5);
        GabineteList.setBorder(null);
        GabineteList.setOpaque(false);
        GabinetesScrollPanel.setViewportView(GabineteList);

        ContactosDepartScrollPane.setBorder(null);

        TelefoneDepartamentoList.setBackground(new java.awt.Color(0, 51, 51));
        TelefoneDepartamentoList.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 1, true));
        TelefoneDepartamentoList.setFont(new java.awt.Font("Dialog", 0, 12)); // NOI18N
        TelefoneDepartamentoList.setForeground(new java.awt.Color(255, 255, 255));
        TelefoneDepartamentoList.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        ContactosDepartScrollPane.setViewportView(TelefoneDepartamentoList);

        GabientesTitle.setBackground(new java.awt.Color(255, 255, 255));
        GabientesTitle.setForeground(new java.awt.Color(255, 255, 255));
        GabientesTitle.setText("Gabinete(s):");

        jLabel1.setForeground(new java.awt.Color(255, 255, 255));
        jLabel1.setText("Curso Responsável:");

        CursoResponsavelScrollPane.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 1, true));

        CursoResponsavel.setEditable(false);
        CursoResponsavel.setBackground(new java.awt.Color(0, 51, 51));
        CursoResponsavel.setColumns(20);
        CursoResponsavel.setForeground(new java.awt.Color(255, 255, 255));
        CursoResponsavel.setRows(5);
        CursoResponsavel.setBorder(null);
        CursoResponsavel.setOpaque(false);
        CursoResponsavelScrollPane.setViewportView(CursoResponsavel);

        javax.swing.GroupLayout InfoPanelLayout = new javax.swing.GroupLayout(InfoPanel);
        InfoPanel.setLayout(InfoPanelLayout);
        InfoPanelLayout.setHorizontalGroup(
            InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(NamePanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(ContactosPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(InfoPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(DescricaoScrollPanel)
                    .addGroup(InfoPanelLayout.createSequentialGroup()
                        .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(DescricaoTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(NMecTitle, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(AreaTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(NMec, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(Area, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                    .addComponent(UCScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                    .addComponent(DescricaoUCScrollPanel)
                    .addGroup(InfoPanelLayout.createSequentialGroup()
                        .addComponent(TelemovelDepartamentoTitle)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 8, Short.MAX_VALUE)
                        .addComponent(ContactosDepartScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 141, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(AnoCurricularTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(DetalheUCTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(GabinetesScrollPanel)
                    .addGroup(InfoPanelLayout.createSequentialGroup()
                        .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(GabientesTitle)
                            .addComponent(jLabel1))
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addComponent(CursoResponsavelScrollPane))
                .addContainerGap())
        );
        InfoPanelLayout.setVerticalGroup(
            InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(InfoPanelLayout.createSequentialGroup()
                .addComponent(NamePanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(NMec, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(NMecTitle))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(CursoResponsavelScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(10, 10, 10)
                .addComponent(DescricaoTitle)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(DescricaoScrollPanel)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(AnoCurricularTitle)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(UCScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 85, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(GabientesTitle)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(GabinetesScrollPanel, javax.swing.GroupLayout.DEFAULT_SIZE, 100, Short.MAX_VALUE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(TelemovelDepartamentoTitle)
                    .addComponent(ContactosDepartScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(3, 3, 3)
                .addComponent(DetalheUCTitle, javax.swing.GroupLayout.PREFERRED_SIZE, 19, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(DescricaoUCScrollPanel, javax.swing.GroupLayout.DEFAULT_SIZE, 120, Short.MAX_VALUE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 51, Short.MAX_VALUE)
                .addGroup(InfoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(AreaTitle, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(Area, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(ContactosPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
        );

        javax.swing.GroupLayout InfoBigPanelLayout = new javax.swing.GroupLayout(InfoBigPanel);
        InfoBigPanel.setLayout(InfoBigPanelLayout);
        InfoBigPanelLayout.setHorizontalGroup(
            InfoBigPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(InfoPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        InfoBigPanelLayout.setVerticalGroup(
            InfoBigPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(InfoPanel, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        TabelaDocentesScrollPane.setBackground(new java.awt.Color(0, 51, 51));
        TabelaDocentesScrollPane.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                TabelaDocentesScrollPaneMouseClicked(evt);
            }
        });

        TabelaPesquisa.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {"", null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Departamento", "Curso", "Unidade Curricular", "Professor"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        TabelaPesquisa.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        TabelaPesquisa.setFocusable(false);
        TabelaPesquisa.getTableHeader().setReorderingAllowed(false);
        TabelaPesquisa.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                TabelaPesquisaMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                TabelaPesquisaMouseEntered(evt);
            }
        });
        TabelaDocentesScrollPane.setViewportView(TabelaPesquisa);

        javax.swing.GroupLayout SearchResultsPanelLayout = new javax.swing.GroupLayout(SearchResultsPanel);
        SearchResultsPanel.setLayout(SearchResultsPanelLayout);
        SearchResultsPanelLayout.setHorizontalGroup(
            SearchResultsPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(SearchResultsPanelLayout.createSequentialGroup()
                .addGap(312, 312, 312)
                .addComponent(TabelaDocentesScrollPane, javax.swing.GroupLayout.DEFAULT_SIZE, 966, Short.MAX_VALUE)
                .addContainerGap())
            .addGroup(SearchResultsPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(SearchResultsPanelLayout.createSequentialGroup()
                    .addComponent(InfoBigPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGap(0, 974, Short.MAX_VALUE)))
        );
        SearchResultsPanelLayout.setVerticalGroup(
            SearchResultsPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(SearchResultsPanelLayout.createSequentialGroup()
                .addGap(101, 101, 101)
                .addComponent(TabelaDocentesScrollPane, javax.swing.GroupLayout.DEFAULT_SIZE, 832, Short.MAX_VALUE)
                .addContainerGap())
            .addGroup(SearchResultsPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addComponent(InfoBigPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        InstitutionLogo.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        InstitutionLogo.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Icons/UALogo.png"))); // NOI18N
        InstitutionLogo.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                InstitutionLogoMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(TopBar, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(layout.createSequentialGroup()
                .addComponent(SlideMenu, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
            .addComponent(SearchResultsPanel, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(InstitutionLogo, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(TopBar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
            .addGroup(layout.createSequentialGroup()
                .addGap(110, 110, 110)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(SearchResultsPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(SlideMenu, javax.swing.GroupLayout.DEFAULT_SIZE, 939, Short.MAX_VALUE)))
            .addComponent(InstitutionLogo, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents
    private void TopBarMenuMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_TopBarMenuMouseClicked
        Thread t = new Thread(){
            public void run() {
                useMenu();
            }
        };
        t.start();
        try {
            if (y!=0) AdministrationPanelMouseClicked(evt);
            t.join();
            InfoPanel.setVisible(false);;
        } catch (InterruptedException ex) {
            if (x!=0) useMenu();
        }        
    }//GEN-LAST:event_TopBarMenuMouseClicked
    /**
     * Método relativo à ação de clicar no botão de iniciar/terminar sessão
     * BOTÃO: "Iniciar Sessão"/"Terminar Sessão"
     * @param evt 
     */
    private void LoginPanelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_LoginPanelMouseClicked
        //Utilização de variável global: login (LoginInterface)
        //Ativação do frame de login & Verificação se o mesmo já se encontra ou não ativo
        InfoBigPanel.setVisible(false);
        if (Login.login == false) {
            if (x!=0) useMenu();
            x=0;
            Login.setVisible(true);
            while (Login.isVisible()) {}
            if (Login.login){
                System.out.println(Login.perfil);
                SessionLabel.setText("Terminar Sessão");
                if (Login.perfil.equals(Perfil.ADMIN)) {
                    AdministrationPanel.setVisible(true);
                    SlideMenu.setVisible(false);
                    x = 0;
                }
                email=Login.getEmail();
                this.emailLabel.setText(email);
                this.emailLabel.setVisible(true);
            }
        } else {
            Login.login = false;
            if (y!=0 && AdministrationPanel.isVisible()) AdministrationPanelMouseClicked(evt);
            SlideMenu.setVisible(false);
            x = 0;
            AdministrationPanel.setVisible(false);
            SessionLabel.setText("Iniciar Sessão");
            this.email="";
            this.emailLabel.setText("email");
            this.emailLabel.setVisible(false);
        }
    }//GEN-LAST:event_LoginPanelMouseClicked
    /**
     * Método associado ao passar do rato sobre o painél em causa
     * PAINÉL: Opção de Administração do Menu Lateral
     * @param evt 
     */
    private void AdministrationPanelMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_AdministrationPanelMouseEntered
        AdministrationPanel.setBackground(new java.awt.Color(46,139,87));
    }//GEN-LAST:event_AdministrationPanelMouseEntered
    /**
     * Método associado ao retirar do rato sobre o painél em causa
     * PAINÉL: Opção de Administração do Menu Lateral
     * @param evt 
     */
    private void AdministrationPanelMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_AdministrationPanelMouseExited
        AdministrationPanel.setBackground(new java.awt.Color(60,136,6));
    }//GEN-LAST:event_AdministrationPanelMouseExited
    /**
     * Método associado ao passar do rato sobre o painél em causa
     * PAINÉL: Opção de Saída do Menu Lateral
     * @param evt 
     */
    private void ExitPanelMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ExitPanelMouseEntered
        ExitPanel.setBackground(new java.awt.Color(46,139,87));
    }//GEN-LAST:event_ExitPanelMouseEntered
    /**
     * Método associado ao retirar do rato sobre o painél em causa
     * PAINÉL: Opção de Saída do Menu Lateral
     * @param evt 
     */
    private void ExitPanelMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ExitPanelMouseExited
        ExitPanel.setBackground(new java.awt.Color(60,136,6));
    }//GEN-LAST:event_ExitPanelMouseExited
    /**
     * Método relativo ao clicar no botão de encerrar o sistema
     * BOTÃO: "Encerrar"
     * @param evt 
     */
    private void ExitPanelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ExitPanelMouseClicked
        System.exit(0);
    }//GEN-LAST:event_ExitPanelMouseClicked
    /**
     * Método relativo ao clicar no botão relativo à interface de administração
     * BOTÃO: "Administração"
     * @param evt 
     */
    private void AdministrationPanelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_AdministrationPanelMouseClicked
        if (x!=0){
            this.useMenu();
            x=0;
        }
        new Thread() {
            public void run(){
                if (SearchResultsPanel.isVisible()){
                    SearchResultsPanel.setVisible(false);
                }
                adminFrame.setVisible(true);
            }
        }.start();
        
    }//GEN-LAST:event_AdministrationPanelMouseClicked

    private void SearchPanelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_SearchPanelMouseClicked
    }//GEN-LAST:event_SearchPanelMouseClicked

    private void SearchPanelMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_SearchPanelMouseEntered
    }//GEN-LAST:event_SearchPanelMouseEntered

    private void SearchPanelMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_SearchPanelMouseExited
    }//GEN-LAST:event_SearchPanelMouseExited
    /**
     * Método relativo ao clique sobre a área de texto de pesquisa da aplicação
     * @param evt 
     */
    private void SearchFieldFocusGained(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_SearchFieldFocusGained
        SearchField.setText("");
    }//GEN-LAST:event_SearchFieldFocusGained
    /**
     * Método relativo à perda de foco da área de texto de pesquisa da aplicação
     * @param evt 
     */
    private void SearchFieldFocusLost(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_SearchFieldFocusLost
        SearchField.setText("Pesquisar");
    }//GEN-LAST:event_SearchFieldFocusLost
    /**
     * Método de animação do aparecimento do painél onde é apresentada a tabela de resultados da pesquisa
     */
    private void setSearchPanelVisible(){
        if (!SearchResultsPanel.isVisible()) {
            SearchResultsPanel.setSize(0, SearchResultsPanel.getHeight());
            Thread th = new Thread() {
                @Override
                public void run() {
                    int x = getContentPane().getWidth();
                    try {
                        Thread.sleep(50);
                        for (int i=0; i<=x; i=i+5) {
                            Thread.sleep(1);
                            SearchResultsPanel.setSize(i, SearchResultsPanel.getHeight());
                        }
                    } catch (Exception e) {
                        JOptionPane.showMessageDialog(null, e);
                    }
                }                
            };th.start();
            SearchResultsPanel.setVisible(true);
            return;
        }
    }
    /**
     * Método relativo ao clicar no botão relativo à pesquisa de informação
     * NOTA: Utilizado também perante a seleção da tecla Enter aquando do foco colocado no motor de busca (caixa de texto)
     * BOTÃO: Ícone de pesquisa (Lupa)
     * @param evt 
     */
    private void SearchIconMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_SearchIconMouseClicked
        // Ação de pesquisa de informação
        setSearchPanelVisible();
        String pesquisa = "";
        if (SearchField.getText().trim().isEmpty() || SearchField.getText().equals("Pesquisar")) {
            pesquisa = "";
        }
        else pesquisa = SearchField.getText();
        DefaultTableModel defaulttablemodel = (DefaultTableModel)TabelaPesquisa.getModel();
        defaulttablemodel.setNumRows(0);
        professores = bd.selectdocente(pesquisa);
        for (ProfessorTable p: professores){
            defaulttablemodel.addRow(new Object[] {
                p.getDepartamento(), p.getCurso(), p.getUc(), p.getNome(), p.getNmec()
            });
        }
        this.useMenu();
        SearchResultsPanel.setVisible(true);
    }//GEN-LAST:event_SearchIconMouseClicked
    /**
     * Seleção do painel onde são apresentados os resultados da pesquisa
     * Verifica se o menu se encontra aberto ou não
     * Se sim, fecha-o
     * PAINÉL: Informação da pesquisa efetuada
     * @param evt 
     */
    private void SearchResultsPanelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_SearchResultsPanelMouseClicked
        if (x!=0) this.useMenu();
    }//GEN-LAST:event_SearchResultsPanelMouseClicked
    
    private void TabelaDocentesScrollPaneMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_TabelaDocentesScrollPaneMouseClicked
    }//GEN-LAST:event_TabelaDocentesScrollPaneMouseClicked
    /**
     * Método acionada aquando da seleção de uma linha da tabela de resultados
     * BOTÃO: Linha da tabela de resultados
     * @param evt 
     */
    private void TabelaPesquisaMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_TabelaPesquisaMouseClicked
        this.InfoBigPanel.setVisible(true);
        this.createDepartmentPhoneList(new ArrayList<String>());        
        this.GabineteList.setText("");
        DescricaoUC.setText("");
        Thread hideMenu = new Thread(){
            public void run(){
                if (x!=0) useMenu();
                SlideMenu.setVisible(false);
                x=0;
            }
        };
        hideMenu.start();
        int row = TabelaPesquisa.getSelectedRow();
        int nmec = professores.get(row).getNmec();
        if (professores.get(row).getCurso() == null){
            try {
                hideMenu.join();
                this.setInfoProfessorsemUC(nmec);
                return;
            } catch (InterruptedException e){}
        }
        //else
        try {
            hideMenu.join();
            this.setInfoProfessor(nmec);            
        } catch (InterruptedException e){
            this.setInfoProfessor(nmec);           
        }
    }//GEN-LAST:event_TabelaPesquisaMouseClicked
    
    private void TabelaPesquisaMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_TabelaPesquisaMouseEntered
    }//GEN-LAST:event_TabelaPesquisaMouseEntered
    /**
     * Método de seleção da interface exterior ao menu
     * RESULTADO: Fecho do menu lateral
     * @param evt 
     */
    private void InstitutionLogoMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_InstitutionLogoMouseClicked
        if (x!=0) this.useMenu();
    }//GEN-LAST:event_InstitutionLogoMouseClicked

    private void InfoBigPanelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_InfoBigPanelMouseClicked
    }//GEN-LAST:event_InfoBigPanelMouseClicked
    /**
     * Método relativo à seleção da tabela de Unidades Curriculares do Docente
     * RESULTADO: COlocação de informação sobre a linha selecionada em diferentes componentes
     * @param evt 
     */
    private void UCCursoDepartamentoTableMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_UCCursoDepartamentoTableMouseClicked
        if (pf.getCurriculares().get(UCCursoDepartamentoTable.getSelectedRow()).getNomeCurso() == null){
            ArrayList<String> telefones = pf.getTelDepartbyCod(pf.getCurriculares().get(UCCursoDepartamentoTable.getSelectedRow()).getCodigoDepart());
            this.createDepartmentPhoneList(telefones);
            DescricaoUC.setText("Nenhuma UC associada.\nDepartamento nº: " + pf.getCurriculares().get(UCCursoDepartamentoTable.getSelectedRow()).getCodigoDepart() + 
                    " -> " + pf.getCurriculares().get(UCCursoDepartamentoTable.getSelectedRow()).getNomeDepartamento());
            return;
        }
        String ucstring = String.valueOf(UCCursoDepartamentoTable.getValueAt(UCCursoDepartamentoTable.getSelectedRow(), 0));
        int uccode = Integer.valueOf(ucstring.split(":")[0]);
        String coursestring = String.valueOf(UCCursoDepartamentoTable.getValueAt(UCCursoDepartamentoTable.getSelectedRow(), 1));
        int coursecode = Integer.valueOf(coursestring.split(":")[0]);
        String departstring = String.valueOf(UCCursoDepartamentoTable.getValueAt(UCCursoDepartamentoTable.getSelectedRow(), 3));
        int departcode = Integer.valueOf(departstring.split(":")[0]);
        UC uc = pf.getUCbyCodeandCourse(uccode, coursecode);
        ArrayList<String> telefones = pf.getTelDepartbyCod(departcode);
        String Uc = this.setDescricao(uc.getNome()).toString();
        String Curso = this.setDescricao(uc.getNomeCurso()).toString();
        String Ano = this.setDescricao(String.valueOf(uc.getAno())).toString();
        String Depart = this.setDescricao(uc.getNomeDepartamento()).toString();
        this.createDepartmentPhoneList(telefones);        
        DescricaoUC.setText("Unidade Curricular:\n" + Uc + "\nAno Curricular: " + Ano + "\nCurso:\n" + Curso +"\nTipo:\n" + uc.getTipo() + "\nDepartamento:\n" + Depart);
    }//GEN-LAST:event_UCCursoDepartamentoTableMouseClicked

    private void formWindowOpened(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowOpened
        this.emailLabel.setVisible(false);
    }//GEN-LAST:event_formWindowOpened
    /**
     * Método associado à seleção do botão relativo ao email introduzido
     * BOTÃO: Email do utilizador
     * RESULTADO: Apresentação da interface relativa à alteração da palavra-passe
     * @param evt 
     */
    private void emailLabelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_emailLabelMouseClicked
        if (x!=0){
            this.useMenu();
            x=0;
        }
        new Thread() {
            public void run(){
                if (SearchResultsPanel.isVisible()){
                    SearchResultsPanel.setVisible(false);
                }
                passFrame.setEmail(email);
                passFrame.setVisible(true);
                
            }
        }.start();
    }//GEN-LAST:event_emailLabelMouseClicked
    /**
     * Método da criação e colocação de informação na lista dos telefones dos docentes
     * RESULTADO: Apresentação dos telefones associados ao docente selecionado
     * @param telefones | Lista de telefones - Resposta de Query efetuada à base de dados
     */
    private void createTelemovelDocenteList(ArrayList<String> telefones){
        if (telefones.isEmpty()){
            telefones.add(new String("Nenhum contacto disponível!"));
            TelemovelList.setModel(new javax.swing.AbstractListModel<String>(){
            public int getSize() {return telefones.size();}
            public String getElementAt (int i) {return telefones.get(i);}
        });
        }
        TelemovelList.setModel(new javax.swing.AbstractListModel<String>(){
            public int getSize() {return telefones.size();}
            public String getElementAt (int i) {return telefones.get(i);}
        });
    }
    /**
     * Método de criação e colocação de informação na lista dos gabinetes associados ao docente
     * RESULTADO: Apresentação dos gabinetes associados ao docente selecionado
     * @param gabinetes | Lista de gabinetes - Resposta de Query efetuada à base de dados
     */
    private void createGabinetesList(ArrayList<Gabinete> gabinetes){
        GabineteList.setVisible(true);
        for (Gabinete g: gabinetes){
            GabineteList.setText(GabineteList.getText() + this.setDescricao(g.toString()).toString()+"\n");
        }
        if (gabinetes.isEmpty()){
            GabineteList.setText("Não existem gabinetes associados!");
        }
    }
    /**
     * Método de criação e colocação de informação na lista dos telefones
     * RESULTADO: Apresentação dos telefones associados ao departamento selecionado
     * @param telefones | Lista de telefones - Resposta de Query efetuada à base de dados
     */
    private void createDepartmentPhoneList(ArrayList<String> telefones){
        if (telefones.isEmpty()){
            telefones.add(new String("Nenhum contacto disponível!"));
            TelefoneDepartamentoList.setModel(new javax.swing.AbstractListModel<String>(){
            public int getSize() {return telefones.size();}
            public String getElementAt (int i) {return telefones.get(i);}
        });
        }
        TelefoneDepartamentoList.setModel(new javax.swing.AbstractListModel<String>(){
            public int getSize() {return telefones.size();}
            public String getElementAt (int i) {return telefones.get(i);}
        });
    }
    /**
     * Método de definição da informação do docente selecionado no painél relativo às suas informações
     * Método semelhante ao método de nome "setInfoProfessor", utilizando, o presente, uma query à base de dados diferente, devido ao facto de ausência de informação
     * @param nmec | Número mecanográfico do docente selecionado na tabela de informação
     */
    private void setInfoProfessorsemUC(int nmec){
        if (!Login.login) ContactosPanel.setVisible(false);
        pf = bd.infodocentesemuc(nmec);
        InfoPanel.setVisible(true);
        Docente.setText(pf.getNome());
        NMec.setText(String.valueOf(pf.getNmec()));
        Email.setText(pf.getEmail());
        Area.setText(pf.getArea());
        Descricao.setText(this.setDescricao(pf.getDescricao()).toString());
        this.createTelemovelDocenteList(pf.getTelefones());
        DefaultTableModel defaulttablemodel = (DefaultTableModel)UCCursoDepartamentoTable.getModel();
        defaulttablemodel.setNumRows(0);
        for (UC uc: pf.getCurriculares()){
            defaulttablemodel.addRow(new Object[] {
                new String(),
                new String(),
                new String(),
                new String(uc.getCodigoDepart() + ": " + uc.getNomeDepartamento())
            });
        }
        this.createGabinetesList(pf.getGabinetes());
        new Thread(){
            public void run(){
                try {
                    CursoResponsavel.setText( bd.cursoresponsavel(nmec).toString().split("\n")[0] + "\n" +
                            setDescricao(bd.cursoresponsavel(nmec).toString().split("\n")[1]).toString() + "\n" +
                            bd.cursoresponsavel(nmec).toString().split("\n")[2]);
                } catch (NullPointerException e){
                    CursoResponsavel.setText(setDescricao("").toString());
                }
            }
        }.start();
        
    }
    /**
     * Método de definição da informação do docente selecionado no painél relativo às suas informações
     * @param nmec | Número mecanográfico do docente selecionado na tabela de informação
     */
    private void setInfoProfessor(int nmec) {
        new Thread() {
            public void run() {
                if (!Login.login) ContactosPanel.setVisible(false);
                else ContactosPanel.setVisible(true);                
            }
        }.start();
        if (x!=0){
            useMenu();
        }
        int parts;
        InfoPanel.setVisible(true);
        pf = bd.infodocente(nmec);
        Docente.setText(pf.getNome());
        NMec.setText(String.valueOf(pf.getNmec()));
        Email.setText(pf.getEmail());
        Area.setText(pf.getArea());
        Descricao.setText(this.setDescricao(pf.getDescricao()).toString());
        this.createTelemovelDocenteList(pf.getTelefones());
        this.setUCCursoAnoDepartamento(pf); 
        this.createGabinetesList(pf.getGabinetes());
        new Thread(){
            public void run(){
                try {
                    CursoResponsavel.setText(bd.cursoresponsavel(nmec).toString().split("\n")[0] + "\n" +
                            setDescricao(bd.cursoresponsavel(nmec).toString().split("\n")[1]).toString() + "\n" +
                            bd.cursoresponsavel(nmec).toString().split("\n")[2]);
                } catch (NullPointerException e){
                    CursoResponsavel.setText(setDescricao("").toString());
                }
            }
        }.start();
    }
    /**
     * Método de criação e colocação de informação na tabela das unidades curriculares/cursos/departamentos associados ao docente
     * RESULTADO: Apresentação das UC/Departamentos associados ao professor selecionado
     * @param prof 
     */
    private void setUCCursoAnoDepartamento (Professor prof){
        DefaultTableModel defaulttablemodel = (DefaultTableModel)UCCursoDepartamentoTable.getModel();
        defaulttablemodel.setNumRows(0);
        for (UC uc: prof.getCurriculares()){
            defaulttablemodel.addRow(new Object[] {
                new String(uc.getCodigoUC() + ": " + uc.getNome()),
                new String(uc.getCodigoCurso() + ": " + uc.getNomeCurso()),
                new String(String.valueOf(uc.getAno())),
                new String(uc.getCodigoDepart() + ": " + uc.getNomeDepartamento())
            });
        }
    }
    /**
     * Método de formatação da informação a colocar nas diversas caixas de texto
     * @param desc | Texto a apresentar
     * @return String Builder formatado com o texto introduzido como parâmetro
     */
    private StringBuilder setDescricao(String desc){
        StringBuilder sb = new StringBuilder();
        if (desc.isEmpty() || desc.isBlank()){
            sb.append("Informação indisponível!");
            return sb;
        }
        if (desc.length()<=50) {
            sb.append(desc);
        }
        else {
            int fim = 50;
            int inicio = 0;
            while (fim < desc.length()-1){
                sb.append(desc.substring(inicio, fim) + "\n");
                inicio = fim;
                fim = inicio + 50;
            }
            sb.append(desc.substring(inicio, desc.length()));
        }
        return sb;
    }
    /**
     * Método Main da Aplicação
     * @param args 
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
            java.util.logging.Logger.getLogger(Interface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Interface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Interface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Interface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                Interface main = new Interface();
                main.setVisible(true);
                main.setExtendedState(main.getExtendedState() | javax.swing.JFrame.MAXIMIZED_BOTH);                
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel Admin;
    private javax.swing.JPanel AdministrationPanel;
    private javax.swing.JLabel AnoCurricularTitle;
    private javax.swing.JLabel Area;
    private javax.swing.JLabel AreaTitle;
    private javax.swing.JScrollPane ContactosDepartScrollPane;
    private javax.swing.JPanel ContactosPanel;
    private javax.swing.JLabel ContactosTitle;
    private javax.swing.JTextArea CursoResponsavel;
    private javax.swing.JScrollPane CursoResponsavelScrollPane;
    private javax.swing.JTextArea Descricao;
    private javax.swing.JScrollPane DescricaoScrollPanel;
    private javax.swing.JLabel DescricaoTitle;
    private javax.swing.JTextArea DescricaoUC;
    private javax.swing.JScrollPane DescricaoUCScrollPanel;
    private javax.swing.JLabel DetalheUCTitle;
    private javax.swing.JLabel Docente;
    private javax.swing.JLabel Email;
    private javax.swing.JLabel EmailTitle;
    private javax.swing.JLabel Exit;
    private javax.swing.JPanel ExitPanel;
    private javax.swing.JLabel GabientesTitle;
    private javax.swing.JTextArea GabineteList;
    private javax.swing.JScrollPane GabinetesScrollPanel;
    private javax.swing.JPanel InfoBigPanel;
    private javax.swing.JPanel InfoPanel;
    private javax.swing.JLabel InstitutionLogo;
    private javax.swing.JLabel LoginIcon;
    private javax.swing.JPanel LoginPanel;
    private javax.swing.JLabel NMec;
    private javax.swing.JLabel NMecTitle;
    private javax.swing.JPanel NamePanel;
    private javax.swing.JTextField SearchField;
    private javax.swing.JLabel SearchIcon;
    private javax.swing.JPanel SearchPanel;
    private javax.swing.JPanel SearchResultsPanel;
    private javax.swing.JLabel SessionLabel;
    private javax.swing.JPanel SlideMenu;
    private javax.swing.JScrollPane TabelaDocentesScrollPane;
    private javax.swing.JTable TabelaPesquisa;
    private javax.swing.JList<String> TelefoneDepartamentoList;
    private javax.swing.JLabel TelemovelDepartamentoTitle;
    private javax.swing.JList<String> TelemovelList;
    private javax.swing.JScrollPane TelemovelScrollPane;
    private javax.swing.JLabel TelemovelTitle;
    private javax.swing.JLabel TituloDocente;
    private javax.swing.JPanel TopBar;
    private javax.swing.JLabel TopBarMenu;
    private javax.swing.JTable UCCursoDepartamentoTable;
    private javax.swing.JScrollPane UCScrollPane;
    private javax.swing.JLabel emailLabel;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    // End of variables declaration//GEN-END:variables
}
