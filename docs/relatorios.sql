-- Relatórios e consultas de apoio do projeto C.U.R.S.O.
-- Estas análises foram organizadas para servir como documentação de exemplo.

-- Emergências registradas por cidadão
SELECT
    c.nome,
    e.localizacao,
    e.informacao
FROM cidadao AS c
LEFT JOIN emergencia AS e
    ON c.id = e.id_cidadao;

-- Ocorrências atendidas por equipe de proteção
SELECT
    a.nome AS atendente,
    ep.nome AS equipe_protecao,
    o.data_resgate,
    o.informacao
FROM atendente AS a
JOIN ocorrencia AS o
    ON a.id = o.id_atendente
JOIN equipe_protecao AS ep
    ON ep.id = o.id_eqp;

-- Diagnósticos clínicos dos ursos
SELECT
    v.nome AS veterinario,
    c.nome AS cuidador,
    u.nome AS urso,
    d.data_resgate,
    d.estado_saude,
    d.tratamento,
    d.status_atual
FROM veterinario AS v
JOIN diagnostico AS d
    ON v.id = d.id_veterinario
JOIN cuidador AS c
    ON c.id = d.id_cuidador
JOIN urso AS u
    ON u.id = d.id_urso;

-- Visitas guiadas ao santuário
SELECT
    g.nome AS guia,
    v.horario,
    v.visitantes
FROM guia AS g
JOIN visitas AS v
    ON g.id = v.id_guia;
