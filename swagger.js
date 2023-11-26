/* eslint-disable no-undef */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Fit Pilot ",
        description: "keep tract of user fitness, and goal, giving out suggestion and also tracking progress of user with underlined achievements of users"
    },
    // host: "https://fit-pilot.onrender.com",
    // schemes: ['https']
    host: "localhost:8080",
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// //Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./index.js');
// });