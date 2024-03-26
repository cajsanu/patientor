import patientData from "../../data/patients";
import { PatientType, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from "../types";

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
  const patient = patients.find((p) => p.id === id);
  return patient
};

const addPatient = (patient: NewPatient): PatientType => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId ): Entry => {
    console.log("here", patientId, entry)
    const newEntry = {
        id: uuid(),
        ...entry
    }
    const patient = patients.find((p) => p.id === patientId)
    patient?.entries.push(newEntry)
    console.log(patient)
    return newEntry
}

export default { getPatients, getPatientById, addPatient, addEntry };
