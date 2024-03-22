export interface DiagnoseType {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender | string;
  occupation: string;
  entries: string[]
}

export type NonSensitivePatient = Omit<PatientType, "ssn" | "entries">;

export type NewPatient = Omit<PatientType, "id">;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other"
}
