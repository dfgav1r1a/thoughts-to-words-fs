#! /usr/bin/env node

console.log('Testing the database injecting initial data into MongoDB container');

//selecting 3rd part of the command used to execute the code in this file
const userArgs = process.argv.slice(2);

const async = require('async');
const singlePost = require('./data-models/blogData.js');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

//reference to the connection string used in the command to execute this file
const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const posts = [];

function createPost(post_author, post_title, post_body, callback) {
  postObj = {post_author: post_author, post_title: post_title, post_body: post_body};

  const newPost = new singlePost(postObj);

  newPost.save(function (err) {
    if (err) {
      callback(err, null);
      return
    }
    console.log(`The new post is ${newPost}`);
    posts.push(newPost);
    callback(null, newPost)
  });
}

function generatePost(callback) {
  async.series([
    function(cb) {
      createPost('John Milton', 'Paradise Lost', 'The mind is its own place, and in itself can make a heaven of hell, a hell of heaven..', cb);
    },
    function(cb) {
      createPost('Gabriel Garcia Marquez', 'Thoughts in Colera', ' It was as if they had leapt over the arduous cavalry of conjugal life and gone straight to the heart of love. They were together in silence like an old married couple wary of life, beyond the pitfalls of passion, beyond the brutal mockery of hope and the phantoms of disillusion: beyond love. For they had lived together long enough to know that love was always love, anytime and anyplace, but it was more solid the closer it came to death.', cb);
    }
  ], callback);
}

//the callback in the following block of code is the cb I am passing into the generatePost function
async.series([generatePost], function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Posts that went into the DB: ${posts}`);
  }

  mongoose.connection.close();
});
