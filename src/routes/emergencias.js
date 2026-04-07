const Emergencia = require('../models/Emergencia');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'emergencia',
  Model: Emergencia,
  writableFields: ['id_cidadao', 'localizacao', 'informacao'],
  orderBy: 'id DESC'
});
