/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('achievements').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getAchievement = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid achievement id to find achievement');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('achievements').find({
      _id: userId
    });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };


const createAchievement = async (req, res) => {
    const achievement = {
        userId: req.body.userId,
        achievementId: req.body.achievementId,
        name: req.body.name,
        description: req.body.description,
        fitnessGoal: req.body.fitnessGoal,
        level: req.body.level,
        progressRequired: req.body.progressRequired,
    };
    //console.log('Data received for createWorkout:', workout);
    const response = await mongodb.getDb().db().collection('achievements').insertOne(achievement);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating user achievement:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the user achievement.');
    }
};

const updateAchievement = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid achievement id to update a user achievement.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedAchievement = {
        userId: req.body.userId,
        achievementId: req.body.achievementId,
        name: req.body.name,
        description: req.body.description,
        fitnessGoal: req.body.fitnessGoal,
        level: req.body.level,
        progressRequired: req.body.progressRequired,
    };
    //console.log('Data received for updateContact:', contact);
    const response = await mongodb
        .getDb()
        .db()
        .collection('achievements')
        .replaceOne({
            _id: userId
        }, updatedAchievement);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        //console.log('Error updating contact:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the user achievement.');
    }
};


const deleteAchievement = async (req, res) => {

    // Checking if ID is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid achievement id to delete achievement');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('achievements').deleteOne({
            _id: userId
        }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User achievement not found');
        }
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the user achievement.');
    }
};



module.exports ={
    getAll,
    createAchievement,
    getAchievement,
    updateAchievement,
    deleteAchievement
}