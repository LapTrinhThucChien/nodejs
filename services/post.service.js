const Post = require('./../models/post');

const customPagination = require('./../shares/customPagination');
const customOrderSort = require('./../shares/customOrderSort');
const customFilter = require('./../shares/customFilter');
module.exports = {
  getPost,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

async function getPost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw 'Post not found';
  return post
}

async function getAll(params) {
  const { limit, offset } = customPagination(params.page, params.size)
  const order = customOrderSort(params.order);
  const where = {
    userId: params.userId,
    categoryId: params.categoryId
  }
  customFilter(where)
  return await Post.findAndCountAll({
    limit,
    offset,
    where,
    order
  })
}

async function getById(id) {
  return await getPost(id);
}

async function create(params) {
  await Post.create(params);
}

async function update(id, params) {
  const post = await getPost(id);
  Object.assign(post, params);
  await post.save();
}

async function _delete(id) {
  await Post.destroy({
    where: { id }
  })
}