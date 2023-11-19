/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('progress').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getProgress = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid progress id to find user progress');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('progress').find({
      _id: userId
    });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };


const createProgress = async (req, res) => {
    const progress = {
        userId: req.body.userId,
        workoutId: req.body.workoutId,
        date: req.body.date,
        durationMinutes: req.body.durationMinutes,
        caloriesBurned: req.body.caloriesBurned,
        notes: req.body.notes,
        mood: req.body.mood,
        heartRate: req.body.heartRate,
        intensityLevel: req.body.intensityLevel,
        sleepQuality: req.body.sleepQuality,
        injuriesDiscomforts: req.body.injuriesDiscomforts,
        isCompleted: req.body.isCompleted,
    };
    console.log('Data received for createProgress:', progress);
    const response = await mongodb.getDb().db().collection('progress').insertOne(progress);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating progress:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the user progress.');
    }
};

const updateProgress = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid progress id to update a user progress.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedProgress = {
        userId: req.body.userId,
        workoutId: req.body.workoutId,
        date: req.body.date,
        durationMinutes: req.body.durationMinutes,
        caloriesBurned: req.body.caloriesBurned,
        notes: req.body.notes,
        mood: req.body.mood,
        heartRate: req.body.heartRate,
        intensityLevel: req.body.intensityLevel,
        sleepQuality: req.body.sleepQuality,
        injuriesDiscomforts: req.body.injuriesDiscomforts,
        isCompleted: req.body.isCompleted,
    };
    //console.log('Data received for updateContact:', contact);
    const response = await mongodb
        .getDb()
        .db()
        .collection('progress')
        .replaceOne({
            _id: userId
        }, updatedProgress);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        //console.log('Error updating contact:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the user progress.');
    }
};


const deleteProgress = async (req, res) => {

    // Checking if task name is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid progress id to delete user progress');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('progress').deleteOne({
            _id: userId
        }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User progress not found');
        }
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the user progress.');
    }
};



module.exports ={
    getAll,
    createProgress,
    getProgress,
    updateProgress,
    deleteProgress
}