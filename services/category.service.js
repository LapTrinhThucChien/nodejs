const Category = require('./../models/category');
const customPagination = require('./../shares/customPagination');
const customOrderSort = require('./../shares/customOrderSort');
const customFilter = require('./../shares/customFilter');

module.exports = {
  getCategory,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

async function getCategory(id) {

  const category = await Category.findByPk(id);
  if (!category) throw 'Category not found';
  return category;
}

async function getAll(params) {
  const { limit, offset } = customPagination(params.page, params.size)
  const order = customOrderSort(params.order);
  const where = {}
  customFilter(where)
  return await Category.findAndCountAll({
    limit,
    offset,
    where,
    order
  })
}

async function getById(id) {
  return await getCategory(id);
}

async function create(params) {
  await Category.create(params)
}

async function update(id, params) {
  const category = await getCategory(id);
  Object.assign(category, params);
  await category.save()
}

async function _delete(id) {
  await Category.destroy({
    where: { id }
  })
}