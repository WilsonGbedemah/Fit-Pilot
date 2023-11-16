const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('workout').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getWorkout = async (req, res) => {
    const {
        name
    } = req.params;

    if (!name) {
        return res.status(400).json({
            error: 'The name field must be provided.'
        });
    }

    try {
        const result = await mongodb.getDb().db().collection('workout').findOne({
            name
        });

        if (!result) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
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
    console.log('Data received for createWorkout:', workout);
    const response = await mongodb.getDb().db().collection('workout').insertOne(workout);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.log('Error creating user:', response.error);
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateWorkout = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid workout id to update a user workout.');
    }
    const workoutId = new ObjectId(req.params.id);
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
        .collection('workout')
        .replaceOne({
            _id: workoutId
        }, updatedWorkout);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        //console.log('Error updating contact:', response.error);
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};


const deleteWorkout = async (req, res) => {

    // Checking if task name is valid or not
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid workout id to delete workout');
    }
    const workoutId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('workout').deleteOne({
            _id: workoutId
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