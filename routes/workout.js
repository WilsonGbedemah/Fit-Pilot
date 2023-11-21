/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const workController = require('../controllers/workouts');
const validation = require('../middleware/validate');

router.get('/', workController.getAll);

router.get('/:id', workController.getWorkout);

router.post('/',validation.saveWorkout, workController.createWorkout);

router.put('/:id',validation.saveWorkout, workController.updateWorkout);

router.delete('/:id', workController.deleteWorkout);

module.exports = router;