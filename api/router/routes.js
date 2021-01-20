const express = require('express');
const router = express.Router();

const imagesCrtl = require('../controllers/imagesGallery');
module.exports = router;

router.get('/', imagesCrtl.getImages);
router.get('/:id', imagesCrtl.getImage); 
router.put('search/:name', imagesCrtl.searchImages);
