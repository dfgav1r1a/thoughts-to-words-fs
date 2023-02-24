const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController.js');


router.get('/', postController.posts_list);

router.get('/create', postController.posts_create_get);

router.post('/create', postController.posts_create_post);

router.get('/:id/edit', postController.posts_edit_get);

router.post('/:id/edit', postController.posts_edit_post);

router.get('/:id/delete', postController.posts_delete_get);

router.post('/:id/delete', postController.posts_delete_post);

module.exports = router;
