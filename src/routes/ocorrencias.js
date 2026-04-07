const Ocorrencia = require('../models/Ocorrencia');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'ocorrencia',
  Model: Ocorrencia,
  writableFields: ['id_atendente', 'data_resgate', 'informacao'],
  orderBy: 'data_resgate DESC, id DESC'
});
