const Atendente = require('../models/Atendente');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'atendente',
  Model: Atendente,
  writableFields: ['nome', 'registro'],
  orderBy: 'nome ASC'
});
