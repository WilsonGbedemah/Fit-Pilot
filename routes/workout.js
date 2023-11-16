const express = require('express');
const router = express.Router();


const workoutController = require('..controllers/workout');

router.get('/', workoutController.getAll);
router.get('/:username',  workoutController.getWorkout);
router.put('/:id', workoutController.updateWorkout);
router.post('/', workoutController.createWorkout);
router.delete('/:id', workoutController.deleteWorkout);


module.exports = router;