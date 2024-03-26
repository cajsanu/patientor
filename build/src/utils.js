"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect date: " + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
    //   make better checks for ssn
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const toNewPatient = (patientObject) => {
    if (!patientObject || typeof patientObject !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in patientObject &&
        "dateOfBirth" in patientObject &&
        "ssn" in patientObject &&
        "gender" in patientObject &&
        "occupation" in patientObject) {
        const newPatient = {
            name: parseName(patientObject.name),
            dateOfBirth: parseDate(patientObject.dateOfBirth),
            ssn: parseSsn(patientObject.ssn),
            gender: parseGender(patientObject.gender),
            occupation: parseOccupation(patientObject.occupation),
        };
        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.toNewPatient = toNewPatient;
const parseString = (item) => {
    if (!isString(item)) {
        throw new Error("Incorrect input");
    }
    return item;
};
const isNumber = (digit) => {
    return typeof digit === "number" || digit instanceof Number;
};
const parseRating = (rating) => {
    if (!isNumber(rating)) {
        throw new Error("Incorrect rating input");
    }
    return rating;
};
const parseDischarge = (discharge) => {
    if (typeof discharge !== 'object' || discharge === null || !('date' in discharge) || !('criteria' in discharge)) {
        throw new Error("Incorrect discharge input");
    }
    const { date, criteria } = discharge;
    if (typeof date !== 'string' || typeof criteria !== 'string') {
        throw new Error("Incorrect discharge input");
    }
    return { date, criteria };
};
const toNewEntry = (entryObject) => {
    if (!entryObject || typeof entryObject !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("description" in entryObject &&
        "date" in entryObject &&
        "specialist" in entryObject &&
        "type" in entryObject) {
        const base = {
            description: parseString(entryObject.description),
            date: parseDate(entryObject.date),
            specialist: parseString(entryObject.specialist),
        };
        switch (entryObject.type) {
            case "HealthCheck":
                if ("healthCheckRating" in entryObject) {
                    return Object.assign(Object.assign({}, base), { type: entryObject.type, healthCheckRating: parseRating(entryObject.healthCheckRating) });
                }
                break;
            case "OccupationalHealthcare":
                if ("employerName" in entryObject) {
                    return Object.assign(Object.assign({}, base), { type: entryObject.type, employerName: parseString(entryObject.employerName) });
                }
                break;
            case "Hospital":
                if ("discharge" in entryObject) {
                    return Object.assign(Object.assign({}, base), { type: entryObject.type, discharge: parseDischarge(entryObject.discharge) });
                }
                break;
            default:
                break;
        }
    }
    throw new Error("Incorrect input or no matching type found");
};
exports.toNewEntry = toNewEntry;
