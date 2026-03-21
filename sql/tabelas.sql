CREATE DATABASE If not exists curso
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE curso;

##### CIDADÂO #####
CREATE TABLE  if not exists cidadao(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
    numero NUMERIC(11) NOT NULL
)AUTO_INCREMENT = 1;

CREATE TABLE  if not exists emergencia(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_cidadao INT NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
	informacao VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_cidadao) REFERENCES cidadao(id) 
)AUTO_INCREMENT = 1;

##### FUNCIONARIOS #####

CREATE TABLE  if not exists atendente(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
)AUTO_INCREMENT = 1;

CREATE TABLE if not exists equipe_protecao(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
)AUTO_INCREMENT = 1;

CREATE TABLE if not exists cuidador(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
)AUTO_INCREMENT = 1;

CREATE TABLE if not exists veterinario(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
)  AUTO_INCREMENT=1;

CREATE TABLE if not exists guia(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
)AUTO_INCREMENT = 1;

##### URSOS #####
CREATE TABLE if not exists urso(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    especie VARCHAR(255) NOT NULL,
    idade NUMERIC(3) NOT NULL,
    sexo ENUM('Masculino','Feminino')
)AUTO_INCREMENT = 1;

##### RELATORIOS #####
CREATE TABLE if not exists ocorrencia(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_atendente INT NOT NULL,
	data_resgate TIMESTAMP DEFAULT NOW(),
    informacao VARCHAR (255) NOT NULL,
    FOREIGN KEY (id_atendente) REFERENCES atendente(id)
)AUTO_INCREMENT = 1;

CREATE TABLE if not exists diagnostico(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    id_veterinario INT NOT NULL,
    id_cuidador INT NOT NULL,
    id_urso INT NOT NULL, 
	data_resgate DATETIME NOT NULL, 
    estado_saude VARCHAR(255) NOT NULL,
    tratamento VARCHAR(255) NOT NULL,
    status_atual ENUM('Recuperacao','Liberado', 'Observacao'),
    FOREIGN KEY (id_veterinario) REFERENCES veterinario(id),
    FOREIGN KEY (id_cuidador) REFERENCES cuidador(id),
    FOREIGN KEY (id_urso) REFERENCES urso(id)
)AUTO_INCREMENT = 1;
