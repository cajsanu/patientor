import { Gender, NewPatient, EntryWithoutId, HealthCheckRating, Discharge } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
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
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

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
      occupation: parseOccupation(patientObject.occupation),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseString = (item: unknown): string => {
  if (!isString(item)) {
    throw new Error("Incorrect input");
  }
  return item;
};

const isNumber = (digit: unknown): digit is number => {
  return typeof digit === "number" || digit instanceof Number;
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || rating > 3) {
    throw new Error("Incorrect rating input");
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (typeof discharge !== 'object' || discharge === null || !('date' in discharge) || !('criteria' in discharge)) {
      throw new Error("Incorrect discharge input");
    }
    const { date, criteria } = discharge as { date: unknown, criteria: unknown };
    if (typeof date !== 'string' || typeof criteria !== 'string') {
      throw new Error("Incorrect discharge input");
    }
    return { date, criteria };
  };

const parseCodes = (codes: unknown): string[] => {
  if (!codes || !Array.isArray(codes) || codes.find(code => typeof code !== "string")) {
    throw new Error("Incorrect discharge input");
  } 
  return codes
}

export const toNewEntry = (entryObject: unknown): EntryWithoutId => {
  if (!entryObject || typeof entryObject !== "object") {
    throw new Error("Incorrect or missing data");
  }
  console.log(entryObject)
  if (
    "description" in entryObject &&
    "date" in entryObject &&
    "specialist" in entryObject &&
    "type" in entryObject &&
    "diagnosisCodes" in entryObject
  ) {
    const base = {
      description: parseString(entryObject.description),
      date: parseDate(entryObject.date),
      specialist: parseString(entryObject.specialist),
      diagnosisCodes: parseCodes(entryObject.diagnosisCodes)
    };
    switch (entryObject.type) {
      case "HealthCheck":
        if ("healthCheckRating" in entryObject) {
          return {
            ...base,
            type: entryObject.type,
            healthCheckRating: parseRating(entryObject.healthCheckRating),
          };
        }
        break
      case "OccupationalHealthcare":
        if ("employerName" in entryObject) {
          return {
            ...base,
            type: entryObject.type,
            employerName: parseString(entryObject.employerName),
          };
        }
        break
      case "Hospital":
        if ("discharge" in entryObject) {
          return {
            ...base,
            type: entryObject.type,
            discharge: parseDischarge(entryObject.discharge),
          };
        }
        break
        default:
            break
    }
  }
  throw new Error("Incorrect input or no matching type found")
};
