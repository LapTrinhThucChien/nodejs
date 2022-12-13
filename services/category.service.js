const Category = require('./../models/category');
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

async function getAll() {
  return await Category.findAll()
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