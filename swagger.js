const  swaggerAutogen = require("swagger-autogen")();

const  doc = {
    info: {
        title: "CSE 341 Team API",
        description: "API team activity cse 341 by Jared Larios, Santiago Herrera",
    },
    host: "localhost:8080",
    schemes: ["https", "http"]
}

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);