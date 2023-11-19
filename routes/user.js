/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');


router.get('/', userController.getAll);

router.get('/:username', userController.getUser);

router.put('/:id', userController.updateUser);

router.post('/', userController.createUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;