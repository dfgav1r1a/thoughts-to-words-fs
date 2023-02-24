const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  post_author: {type: String, required: true, maxLength: 30},
  post_title: {type: String, required: true, maxLength: 60},
  post_body: {type: String, required: true }
});

blogPostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model('posts', blogPostSchema);

