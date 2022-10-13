const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("../middleware/multer-config");
const {requireAuth} = require('../middleware/auth.middleware');

router.get('/', postController.readPost);
router.post('/',requireAuth, multer, postController.createPost);
router.put('/:id',requireAuth, postController.updatePost);
router.delete('/:id',requireAuth, postController.deletePost);
router.patch('/like-post/:id',requireAuth, postController.likePost);
router.patch('/unlike-post/:id',requireAuth, postController.unlikePost);

module.exports = router;