const Post = require('./../models/post');

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

async function getAll() {
  return await Post.findAll()
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