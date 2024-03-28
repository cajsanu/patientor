# Patientor

Patientor is a RESTful API server that serves as the backend for managing patient records. This server provides endpoints to create, read and update patient data as well as manage health care entries.

## Getting Started

- To get the server running just install its dependencies with ```npm install``` and run it in development mode with ```npm run dev```.
- To make a production build use ```npm run tsc``` and to start the server in production mode run ```npm start```

### Development Mode

During development, Patientor Backend is written in TypeScript.

## Frontend integration

The forntend for the project can be found on my GitHub in the repository [patientor-front](https://github.com/cajsanu/patientor-front). The repo is originally forked from (https://github.com/fullstack-hy2020/patientor).

## Features

- **CRUD Operations:** Provides endpoints for creating, reading and updating patient information. In addition there is an endpoint for retrieving diagnosis information. 
- **Health Care Entries:** Manages health care entries for patients, allowing for the addition and retrieval of medical records.

## Endpoints

- `GET /api/patients`: Get a list of all patients.
- `GET /api/patients/:id`: Get a specific patient by ID.
- `POST /api/patients/:id/entries`: Create a new medical entry for a specific patient by ID.
- `POST /api/patients`: Create a new patient.
- `GET /api/diagnoses`: Get a list of all diagnoses.

## Technologies Used

- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.



