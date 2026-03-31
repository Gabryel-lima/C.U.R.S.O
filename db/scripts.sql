-- Minimal schema for simulation: tabela `funcionario`
CREATE TABLE IF NOT EXISTS funcionario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  papel TEXT NOT NULL,
  registro TEXT,
  email TEXT,
  telefone TEXT,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo
INSERT INTO funcionario (nome, papel, registro, email, telefone) VALUES
('João Silva','atendente','REG123','joao@exemplo.com','+55 11 90000-0001'),
('Maria Souza','veterinario','REGVET456','maria@exemplo.com','+55 11 90000-0002');
