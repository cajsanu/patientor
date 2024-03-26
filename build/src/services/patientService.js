"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getPatientById = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)(), entries: [] }, patient);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    console.log("here", patientId, entry);
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    const patient = patients.find((p) => p.id === patientId);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
    return newEntry;
};
exports.default = { getPatients, getPatientById, addPatient, addEntry };
