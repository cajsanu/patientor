import patientData from "../../data/patients";
import { PatientType, NonSensitivePatient, NewPatient } from "../types";

import { v1 as uuid } from "uuid";

const patients: PatientType[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientById = (id: string): PatientType | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): PatientType => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientById, addPatient };
