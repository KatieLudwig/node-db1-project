const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where({ id }).first();
}

const create = account => {
  return db('accounts').insert(account).then(ids => getById(ids[0]));
}

const updateById = (id, account) => {
  return db('accounts').where({ id }).update(account).then(() => getById(id));
}

const deleteById = id => {
  return db('accounts').where({ id }).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
