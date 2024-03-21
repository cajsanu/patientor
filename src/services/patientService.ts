import patientData from "../../data/patients";
import { PatientType, PatientWithoutSsn, NewPatient } from "../types";

import { v1 as uuid } from 'uuid'


const patients: PatientType[] = patientData;

const getPatients = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): PatientType | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): PatientType => {
    const newPatient = {
        id: uuid(),
        ...patient
    }
    patients.push(newPatient)
    return newPatient
};

export default { getPatients, getPatientById, addPatient };
