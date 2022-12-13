const path = require('path');
require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Post = require('./models/post');
const Category = require('./models/category');
const User = require('./models/user');

Category.hasMany(Post);
User.hasMany(Post);
Post.belongsTo(Category);
Post.belongsTo(User);
const postRoute = require('./routes/post.route');
const categoryRoute = require('./routes/category.route');
const userRoute = require('./routes/user.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())


app.use('/post', postRoute);
app.use('/category',categoryRoute);
app.use(userRoute);

// app.use()

sequelize.sync()
  .then(() => {
    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  })
