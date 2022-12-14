const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const config = require('./../config.json')
const jsonwebtoken = require('jsonwebtoken');

const generateToken = require('./../util/generateToken')
module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};


const replaceSpecialChars = b64string => {
  return b64string.replace(/[=+/]/g, charToBeReplaced => {
    switch (charToBeReplaced) {
      case '=':
        return '';
      case '+':
        return '-';
      case '/':
        return '_';

      default:
        break;
    }
  });
};
async function authenticate({ username, password }) {
  const user = await User.scope('withHash').findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw 'Username or password is incorrect';
  }

  const token = jsonwebtoken.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
  // const header = generateToken.generateHeader({
  //   alg: "HS256",
  //   typ: "JWT"
  // });
  // const payload = generateToken.generatePayload({
  //   exp: 872990,
  //   sub: user.id
  // });
  // // create HMAC (hase based message authentication code)
  // let signature = crypto.createHmac('sha256', config.secret);

  // const base64HeaderPayload = `${header}.${payload}`;
  // signature.update(base64HeaderPayload);

  // // signature need to be convert base64
  // signature = signature.digest('base64');

  // signature = replaceSpecialChars(signature);

  // const token = `${header}.${payload}.${signature}`
  return {
    ...omitHash(user.get()),
    token
  }
}

async function getUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

async function getAll() {
  return await User.findAll();
}

async function getById(id) {
  return await getUser(id)
}

async function create(params) {
  if (await User.findOne({ where: { username: params.username } })) {
    throw `Username ${params.username} is already taken`;
  }

  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  await User.create(params)
}

async function update(id, params) {
  const user = await getUser(id);

  const userNameChanged = params.username && user.username !== params.username;
  if (userNameChanged && await User.findOne({ where: { username: params.username } })) {
    throw `Username ${params.username} is already taken`;
  }

  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  await User.destroy({
    where: { id }
  })
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash
}