const Guia = require('../models/Guia');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'guia',
  Model: Guia,
  writableFields: ['nome', 'registro'],
  orderBy: 'nome ASC'
});
