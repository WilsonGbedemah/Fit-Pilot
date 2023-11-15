const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: "Fit Pilot",
        description: " Keeps track of fitness workout of user and check progress as well as muscle groups of user"
    },
    host: "localhost:8080",
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

//Generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);