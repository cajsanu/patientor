import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing comment");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
//   make better checks for ssn
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender"); 
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation
}

export const toNewPatient = (patientObject: unknown): NewPatient => {
  if (!patientObject || typeof patientObject !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in patientObject &&
    "dateOfBirth" in patientObject &&
    "ssn" in patientObject &&
    "gender" in patientObject &&
    "occupation" in patientObject
  ) {
    const newPatient: NewPatient = {
      name: parseName(patientObject.name),
      dateOfBirth: parseDate(patientObject.dateOfBirth),
      ssn: parseSsn(patientObject.ssn),
      gender: parseGender(patientObject.gender),
      occupation: parseOccupation(patientObject.occupation)
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};
