-- Documentação de apoio do modelo relacional do projeto C.U.R.S.O.
-- Este arquivo serve como referência do esquema SQL de exemplo.
-- O backend atual usa SQLite com uma estrutura reduzida em src/db/initDb.js.

CREATE DATABASE IF NOT EXISTS curso
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE curso;

-- Cidadão e emergência
CREATE TABLE IF NOT EXISTS cidadao (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numero NUMERIC(11) NOT NULL
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS emergencia (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_cidadao INT NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    informacao VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_cidadao) REFERENCES cidadao(id)
) AUTO_INCREMENT = 1;

-- Funcionários
CREATE TABLE IF NOT EXISTS atendente (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS equipe_protecao (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS cuidador (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS veterinario (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS guia (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    registro NUMERIC(7) NOT NULL
) AUTO_INCREMENT = 1;

-- Ursos
CREATE TABLE IF NOT EXISTS urso (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    especie VARCHAR(255) NOT NULL,
    idade NUMERIC(3) NOT NULL,
    sexo ENUM('Masculino', 'Feminino')
) AUTO_INCREMENT = 1;

-- Relatórios operacionais
CREATE TABLE IF NOT EXISTS ocorrencia (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_atendente INT NOT NULL,
    id_eqp INT NOT NULL,
    data_resgate TIMESTAMP DEFAULT NOW(),
    informacao VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_atendente) REFERENCES atendente(id),
    FOREIGN KEY (id_eqp) REFERENCES equipe_protecao(id)
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS diagnostico (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_veterinario INT NOT NULL,
    id_cuidador INT NOT NULL,
    id_urso INT NOT NULL,
    data_resgate DATETIME NOT NULL,
    estado_saude VARCHAR(255) NOT NULL,
    tratamento VARCHAR(255) NOT NULL,
    status_atual ENUM('Recuperacao', 'Liberado', 'Observacao'),
    FOREIGN KEY (id_veterinario) REFERENCES veterinario(id),
    FOREIGN KEY (id_cuidador) REFERENCES cuidador(id),
    FOREIGN KEY (id_urso) REFERENCES urso(id)
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS visitas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_guia INT NOT NULL,
    horario TIMESTAMP DEFAULT NOW(),
    visitantes VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_guia) REFERENCES guia(id)
) AUTO_INCREMENT = 1;
