PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS diagnostico;
DROP TABLE IF EXISTS emergencia;
DROP TABLE IF EXISTS ocorrencia;
DROP TABLE IF EXISTS urso;
DROP TABLE IF EXISTS veterinario;
DROP TABLE IF EXISTS cuidador;
DROP TABLE IF EXISTS guia;
DROP TABLE IF EXISTS atendente;
DROP TABLE IF EXISTS cidadao;
DROP TABLE IF EXISTS funcionario;

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS cidadao (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  numero TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS atendente (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  registro TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS guia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  registro TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS veterinario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  registro TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS cuidador (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  registro TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS urso (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  especie TEXT NOT NULL,
  idade NUMERIC NOT NULL CHECK (idade >= 0),
  sexo TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS emergencia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_cidadao INTEGER NOT NULL,
  localizacao TEXT NOT NULL,
  informacao TEXT NOT NULL,
  FOREIGN KEY (id_cidadao) REFERENCES cidadao(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ocorrencia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_atendente INTEGER NOT NULL,
  data_resgate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  informacao TEXT NOT NULL,
  FOREIGN KEY (id_atendente) REFERENCES atendente(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS diagnostico (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_veterinario INTEGER NOT NULL,
  id_cuidador INTEGER NOT NULL,
  id_urso INTEGER NOT NULL,
  data_resgate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado_saude TEXT NOT NULL,
  tratamento TEXT NOT NULL,
  status_atual TEXT NOT NULL,
  FOREIGN KEY (id_veterinario) REFERENCES veterinario(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (id_cuidador) REFERENCES cuidador(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (id_urso) REFERENCES urso(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_emergencia_cidadao ON emergencia (id_cidadao);
CREATE INDEX IF NOT EXISTS idx_ocorrencia_atendente ON ocorrencia (id_atendente);
CREATE INDEX IF NOT EXISTS idx_diagnostico_veterinario ON diagnostico (id_veterinario);
CREATE INDEX IF NOT EXISTS idx_diagnostico_cuidador ON diagnostico (id_cuidador);
CREATE INDEX IF NOT EXISTS idx_diagnostico_urso ON diagnostico (id_urso);

INSERT INTO cidadao (nome, numero) VALUES
('Ana Oliveira', '11987654321'),
('Carlos Pereira', '21999887766');

INSERT INTO atendente (nome, registro) VALUES
('João Silva', '100001'),
('Marina Lopes', '100002');

INSERT INTO guia (nome, registro) VALUES
('Paulo Mendes', '700001'),
('Bianca Rocha', '700002');

INSERT INTO veterinario (nome, registro) VALUES
('Maria Souza', '300001'),
('Ricardo Faria', '300002');

INSERT INTO cuidador (nome, registro) VALUES
('Fernanda Lima', '400001'),
('Diego Martins', '400002');

INSERT INTO urso (nome, especie, idade, sexo) VALUES
('Aurora', 'Urso-pardo', 7, 'femea'),
('Atlas', 'Urso-negro', 4, 'macho');

INSERT INTO emergencia (id_cidadao, localizacao, informacao) VALUES
(1, 'BR-101, km 212', 'Urso ferido proximo a rodovia.'),
(2, 'Zona rural de Itatiaia', 'Urso avistado desorientado perto de uma trilha.');

INSERT INTO ocorrencia (id_atendente, data_resgate, informacao) VALUES
(1, '2026-04-07 09:30:00', 'Equipe acionada para atendimento inicial do resgate de Aurora.'),
(2, '2026-04-07 11:00:00', 'Chamado registrado para avaliacao de campo do urso Atlas.');

INSERT INTO diagnostico (id_veterinario, id_cuidador, id_urso, data_resgate, estado_saude, tratamento, status_atual) VALUES
(1, 1, 1, '2026-04-07 13:15:00', 'Ferimento moderado em uma das patas', 'Curativos, anti-inflamatorio e observacao por 7 dias', 'em_tratamento'),
(2, 2, 2, '2026-04-07 15:40:00', 'Desidratacao leve e estresse', 'Hidratacao assistida e monitoramento diario', 'em_observacao');
