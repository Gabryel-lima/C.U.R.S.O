const Diagnostico = require('../models/Diagnostico');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter({
  tableName: 'diagnostico',
  Model: Diagnostico,
  writableFields: [
    'id_veterinario',
    'id_cuidador',
    'id_urso',
    'data_resgate',
    'estado_saude',
    'tratamento',
    'status_atual'
  ],
  orderBy: 'data_resgate DESC, id DESC'
});
