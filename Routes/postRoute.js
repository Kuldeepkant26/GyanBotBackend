const express = require('express');
const multer = require('multer')
const router = express.Router();

const { storage } = require('../Utils/cloudconfig.js');    //   1st step
const upload = multer({ storage })

//Controllers
const { addPostController, getPostsController } = require('../Controllers/postController.js')

router.post('/add/:id', upload.single('myfile'), addPostController);
router.get('/getposts', upload.single('myfile'), getPostsController);

module.exports = router