/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('workouts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getWorkout = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid workout id to find workout');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('workouts').find({
      _id: userId
    });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createWorkout = async (req, res) => {
    const workout = {
        userId: req.body.userId,
        workoutId: req.body.workoutId,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        targetedMuscleGroups: req.body.targetedMuscleGroups,
        description: req.body.description,
        stepByStepInstructions: req.body.stepByStepInstructions,
        recommendedDuration: req.body.recommendedDuration,
        additionalTips: req.body.additionalTips,
    };
    //console.log('Data received for createWorkout:', workout);
    const response = await mongodb.getDb().db().collection('workouts').insertOne(workout);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating user:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the user workout.');
    }
};

const updateWorkout = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid workout id to update a user workout.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedWorkout = {
        userId: req.body.userId,
        workoutId: req.body.workoutId,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        targetedMuscleGroups: req.body.targetedMuscleGroups,
        description: req.body.description,
        stepByStepInstructions: req.body.stepByStepInstructions,
        recommendedDuration: req.body.recommendedDuration,
        additionalTips: req.body.additionalTips,
    };
    //console.log('Data received for updateContact:', contact);
    const response = await mongodb
        .getDb()
        .db()
        .collection('workouts')
        .replaceOne({
            _id: userId
        }, updatedWorkout);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        //console.log('Error updating contact:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the user workout.');
    }
};


const deleteWorkout = async (req, res) => {

    // Checking if task name is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid workout id to delete workout');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('workouts').deleteOne({
            _id: userId
        }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the user.');
    }
};



module.exports ={
    getAll,
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout
}