const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/', mainController.index);
router.get('/error', mainController.error);
router.get('/contact', mainController.contact);
router.get('/socialMedia', mainController.socialMedia);
router.get('/extras', mainController.extras);
router.get('/burger', mainController.burger);

module.exports = router;

