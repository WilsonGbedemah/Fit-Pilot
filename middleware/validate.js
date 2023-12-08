/* eslint-disable no-undef */
const validator = require('../helpers/validate');


const validateUser = (req, res, next) => {
    const validationRule = {
        username : 'required|string',
        name: 'required|string',
        email: 'required|email',
        password: 'required|string|min:6',
        age: 'required|integer',
        gender: 'required|string',
        height: 'required|integer',
        weight: 'required|integer',
        fitnessGoals: 'required|string',
        fitnessLevel: 'required|string',
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    });
};

const validateWorkout = (req, res, next) => {
    const validationRule ={
        userId: 'required|string',
        workoutId: 'required|integer',
        name: 'required|string',
        level: 'required|string',
        muscleGroups: 'required|string',
        description: 'string',
        instructions: 'string',
        durationMinutes: 'integer',
        tips: 'string',
    };
    validator(req.body, validationRule, {}, (err, status)=>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }else {
            next();
        }
    })

}

const validateProgress = (req, res, next) => {
    const validationRule = {
        userId: 'required|string',
        workoutId: 'required|integer',
        date: ['required', { date: { format: 'YYYY-MM-DD' } }],
        durationMinutes: 'required|integer',
        caloriesBurned: 'required|integer',
        notes: 'string',
        mood: 'string',
        heartRate: 'integer',
        intensityLevel: 'string',
        sleepQuality: 'string',
        injuriesDiscomforts: 'string',
        isCompleted: 'required|boolean',
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};


const validateAchievement = (req, res, next) => {
    const validationRule = {
        userId: 'required|string',
        achievementId: 'required|integer',
        name: 'required|string',
        description: 'required|string',
        fitnessGoal: 'required|string',
        level: 'required|string',
        progressRequired: 'required|string',
      };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    });
};

module.exports = {
    validateUser, validateWorkout, validateProgress, validateAchievement
}