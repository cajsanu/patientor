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
  gender: Gender;
  occupation: string;
}

export type PatientWithoutSsn = Omit<PatientType, "ssn">;

export type NewPatient = Omit<PatientType, "id">;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other"
}
