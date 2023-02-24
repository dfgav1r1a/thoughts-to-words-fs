const async = require('async');
const {body, validationResult} = require('express-validator');
const blogPost = require('../data-models/blogData.js');

//middleware to display all posts
exports.posts_list = async (req, res, next) => {
  await blogPost.find({},"post_title post_author post_body")
    .exec((err, posts) => {
      err ? next(err) : 
        console.log(posts);
        res.render('index', {
          title: 'Your Thoughts',
          error: err,
          posts: posts,
        });
    });
};

//middleware for GET and POST for create post
exports.posts_create_get = (req, res) => {
  res.render('create-post', {
    title: 'Create a post',
  });
};

exports.posts_create_post = [
  //validation and sanitation for each field
  body('post_title')
  .trim()
  .isLength({min: 5, max: 60})
  .withMessage('Please enter a title that will identify your post').escape(),
  body('post_author')
  .trim()
  .isLength({min: 4, max: 30})
  .withMessage('Please enter your fist and last names').escape(),
  body('post_body')
  .trim()
  .notEmpty()
  .withMessage('Please enter enough post content')
  .stripLow({keep_new_lines: true}).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    //creating new document for the db with data from /posts/create
    const post = new blogPost({
      post_author: req.body.post_author,
      post_title: req.body.post_title,
      post_body: req.body.post_body,
    });
    //checking if user complied with validation of inputs
    if (!errors.isEmpty()) {
      res.render('create-post', {
        title: 'Create a post',
        post,
        errors: errors.array(),
      });
      //return to avoid writing to the db
      return;
    }
    //if everything is ok, query to database to check for exact duplicates
    await blogPost.findOne({post_title: req.body.post_title}).exec((error, postDoc) => {
      let post_exist = false;
      let success = false;
      if (error) return next(error);
      if (postDoc) {
        post_exist = true;
        res.render('create-post', {
          title: 'Create a Post',
          post,
          postExist: post_exist,
        });
        //return to avoid writing to the db
        return;
      } else {
        post.save(err => {
          if (err) {
            next(err)
          } else {
            success = true
            res.render('create-post', {
              title: 'Create a post',
              success: success,
            });
          }
        });
      }
    });
  }
]

//middleware for GET and POST for delete post
exports.posts_delete_get = async (req, res, next) => {
  await blogPost.findById(req.params.id).exec((error, query) => {
    if (error) next(error);
    //if query successfull, render data in page
    res.render('delete-post', {
      post_title: query.post_title,
      post_author: query.post_author, 
      post_body: query.post_body,
      post_id: query._id,
    })

  });
};

exports.posts_delete_post = async (req, res, next) => {
  let isSuccessful = false
  await blogPost.findByIdAndRemove(req.body.postId).exec((error, query) => {
    if (error) {
      return next(error);
    }
    //if nothing is wrong, send success message
    isSuccessful = true
    console.log(query.post_author);
    res.render('delete-post', {
      isSuccessful,
    })
  });
};

//middleware for GET and POST for edit post
exports.posts_edit_get= (req, res, next) => {
  async.series({
    queryPost(callback) {
      blogPost.findById(req.params.id).exec(callback);
    },
  }, (error, queryResults) => {
    if (error) return next(error);
    //handling error if query is unsuccessful
    if (queryResults.queryPost === null) {
      const err = new Error('Sorry, something went wrong, please try again');
      err.status = 404;
      return next(err);
    }
    //rendering the document
    res.render('edit-post', {
      title: 'Edit your post',
      post: queryResults.queryPost,
    });
  });
};

exports.posts_edit_post = [
  //sanitation and validation
  body('post_title')
  .trim()
  .isLength({min: 5, max:  60})
  .withMessage('Please make sure to include a title in your post').escape(),
  body('post_author')
  .trim()
  .isLength({min: 4, max: 30})
  .withMessage('Don\'t forget about your name').escape(),
  body('post_body')
  .trim()
  .notEmpty()
  .withMessage('Make sure you create enough content').escape(),
  (req, res, next) => {
    //getting errors from validation
    const errors = validationResult(req);

    const post = new blogPost({
      _id: req.params.id,
      post_author: req.body.post_author,
      post_title: req.body.post_title,
      post_body: req.body.post_body
    });
    //if there are errors the form will be rendered again
    if (!errors.isEmpty()) {
      res.render('edit-post', {
        title: 'Edit your post',
        post,
        errors: errors.array(),
      });
      //return to avoid writing wrong data in db
      return
    }
    //if everything is ok, query to db
    blogPost.findByIdAndUpdate(req.params.id, post, (error, postDoc) => {
      let success = false;
      if (error) {
        return next(error);
      } else {
        success = true;
        res.render('edit-post', {
          title: 'Edit your Post',
          post,
          success: success,
        });
      }
    });
  }
]
