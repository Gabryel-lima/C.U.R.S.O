const Veterinario = require('../models/Veterinario');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'veterinario',
  Model: Veterinario,
  writableFields: ['nome', 'registro'],
  orderBy: 'nome ASC'
});
