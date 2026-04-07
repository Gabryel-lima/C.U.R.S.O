const Cuidador = require('../models/Cuidador');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'cuidador',
  Model: Cuidador,
  writableFields: ['nome', 'registro'],
  orderBy: 'nome ASC'
});
