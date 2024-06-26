#DROP TABLE ano, curso, departamento, departamento_docente, docente, docente_gabinete, docente_uc, gabinete, telefone_departamento, telefone_docente, uc, utilizador;

CREATE TABLE utilizador (
	num_mec INTEGER NOT NULL PRIMARY KEY,
	nome VARCHAR(75) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	perfil ENUM('basico', 'admin')
);

CREATE TABLE departamento (
	nome VARCHAR(100) NOT NULL,
	numero SMALLINT NOT NULL PRIMARY KEY
);

CREATE TABLE gabinete (
	indice INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
	numero SMALLINT NOT NULL,
	departamento SMALLINT NOT NULL,
	telefone VARCHAR(9) NOT NULL UNIQUE,
	CONSTRAINT PK3 PRIMARY KEY (indice),
	CONSTRAINT FK FOREIGN KEY (departamento) REFERENCES departamento(numero)
	ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT combinacao UNIQUE (numero, departamento)
);

CREATE TABLE docente (
	num_mec INTEGER NOT NULL PRIMARY KEY,
	nome VARCHAR (75) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
	area VARCHAR(50) NOT NULL,
	descricao VARCHAR(2000) NOT NULL
);

CREATE TABLE docente_gabinete (
	docente INTEGER NOT NULL,
    gabinete INTEGER NOT NULL,
    CONSTRAINT PK17 PRIMARY KEY (docente, gabinete),
    CONSTRAINT FK12 FOREIGN KEY (docente) REFERENCES docente(num_mec) 
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK13 FOREIGN KEY (gabinete) REFERENCES gabinete(indice)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE curso (
	codigo INTEGER NOT NULL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL UNIQUE,
	departamento SMALLINT NOT NULL,
	responsavel INTEGER NOT NULL UNIQUE,
	tipo ENUM('Mestrado', 'Licenciatura', 'CTESP'),
	CONSTRAINT FK2 FOREIGN KEY (departamento) REFERENCES departamento(numero)
	ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK3 FOREIGN KEY (responsavel) REFERENCES docente(num_mec)
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE telefone_departamento (
	departamento SMALLINT NOT NULL,
	telefone VARCHAR(9) NOT NULL PRIMARY KEY,
	CONSTRAINT FK4 FOREIGN KEY (departamento) REFERENCES departamento(numero)
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE departamento_docente (
	num_mec INTEGER NOT NULL,
	departamento SMALLINT NOT NULL,
	CONSTRAINT PK PRIMARY KEY (num_mec, departamento),
	CONSTRAINT FK5 FOREIGN KEY (departamento) REFERENCES departamento(numero) 
	ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK6 FOREIGN KEY (num_mec) REFERENCES docente(num_mec)
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE uc (
	codigo INTEGER NOT NULL PRIMARY KEY,
	nome_uc VARCHAR(50) NOT NULL
);

CREATE TABLE ano (
	uc INTEGER NOT NULL,
	curso INTEGER NOT NULL,
	ano SMALLINT NOT NULL,
	CONSTRAINT PK1 PRIMARY KEY (uc, curso, ano),
	CONSTRAINT FK7 FOREIGN KEY (uc) REFERENCES uc(codigo) 
	ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK8 FOREIGN KEY (curso) REFERENCES curso(codigo) 
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE docente_uc (
	num_mec INTEGER NOT NULL,
	uc INTEGER NOT NULL,
	CONSTRAINT PK2 PRIMARY KEY (num_mec,  uc),
	CONSTRAINT FK9 FOREIGN KEY (uc) REFERENCES uc(codigo) 
	ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK10 FOREIGN KEY (num_mec) REFERENCES docente(num_mec)
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE telefone_docente (
	num_mec INTEGER NOT NULL,
	telefone VARCHAR(9) NOT NULL PRIMARY KEY,
	CONSTRAINT FK11 FOREIGN KEY (num_mec) REFERENCES docente(num_mec)
	ON UPDATE CASCADE ON DELETE CASCADE
);