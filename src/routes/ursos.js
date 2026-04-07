const Urso = require('../models/Urso');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'urso',
  Model: Urso,
  writableFields: ['nome', 'especie', 'idade', 'sexo'],
  orderBy: 'nome ASC'
});
