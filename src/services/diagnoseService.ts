import diagnoseData from "../../data/diagnoses";
import { DiagnoseType } from "../types";

const diagnoses: DiagnoseType[] = diagnoseData;

const getDiagnoses = (): DiagnoseType[] => {
  return diagnoses;
};

export default { getDiagnoses };
