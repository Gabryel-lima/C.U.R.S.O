const Cidadao = require('../models/Cidadao');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'cidadao',
  Model: Cidadao,
  writableFields: ['nome', 'numero'],
  orderBy: 'nome ASC'
});
