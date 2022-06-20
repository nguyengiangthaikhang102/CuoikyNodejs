const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);

router.get('/createSinhvien', userController.form);
router.post('/createSinhvien', userController.create);

router.get('/edit-sinhvien/:id', userController.edit);
router.post('/edit-sinhvien/:id', userController.update);

router.get('/view-sinhvien/:id', userController.viewall);

router.get('/:id', userController.delete);


module.exports= router;