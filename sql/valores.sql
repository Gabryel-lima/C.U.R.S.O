##### CIDADAOS #####

SELECT * FROM cidadao;
INSERT INTO cidadao(nome,numero) VALUES
('IGOR DE FREITAS','22975614352'),
('JOAO DE SOUZA','22987654321');

##### EMERGENCIA #####
SELECT * FROM emergencia; 
INSERT INTO emergencia(id_cidadao, localizacao, informacao) VALUES
(1, 'AVENIDA DA SORTE, N° 777', 'Encontrei um urso panda no meio da avenida, ele parece estar machucado e apavorado com os carros, envie ajuda!'),
(2, 'RUA GENERAL OSÒRIO, N°185', 'SOCORRO!!! tem um urso pardo perto do SENAI, as pessoas estão com medo de sair na rua e serem atacadas, envie ajuda rapido!');

##### FUNCIONARIOS #####

SELECT * FROM atendente;
INSERT INTO atendente(nome,registro)VALUES
('SHYLOH','3217564');

SELECT * FROM equipe_protecao;
INSERT INTO equipe_protecao(nome,registro)VALUES
('VICTOR SOARES', '1234567');

SELECT * FROM cuidador;
INSERT INTO cuidador(nome,registro)VALUES
('GABRYEL', '6542731');

SELECT * FROM veterinario;
INSERT INTO veterinario(nome,registro)VALUES
('ANA DANIEL','7777777');

SELECT * FROM guia;
INSERT INTO guia(nome,registro)VALUES
('HUGO MOTA','7654321');


##### URSOS #####

SELECT * FROM urso;
INSERT INTO urso(nome,especie,idade,sexo)VALUES
('Panda','Panda das Colinas','18','Masculino'),
('Pardo', 'Urso pardo das Carolinas','30','Feminino');

##### RELATORIOS #####

SELECT * FROM ocorrencia;
INSERT INTO ocorrencia(id_atendente,data_resgate,informacao) VALUES
(1, '2026-02-11', 'RELATO DE URSO NA AVENIDA DA SORTE, N° 777, feito por IGOR DE FREITAS, ele encontrou um urso panda no meio da avenida, ele parece estar machucado e apavorado com os carros'),
(1, '2026-03-20', 'RELATO DE URSO NA RUA GENERAL OSÒRIO, N°185, feito por JOAO DE SOUZA, ele encontrou um urso pardo perto do SENAI, as pessoas estão com medo de sair na rua e serem atacadas');

SELECT * FROM diagnostico;
INSERT INTO diagnostico(id_veterinario,id_cuidador,id_urso,data_resgate,estado_saude,tratamento,status_atual) VALUES
( 1, 1, 1,'2026-02-11', 'Grave','Suturas','Recuperacao'),
( 1, 1, 2,'2026-03-20','Estável','Limpeza','Observacao');
