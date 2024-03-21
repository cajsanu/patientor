import diagnoseData from "../../data/diagnoses";
import { diagnoseType } from "../types";

const diagnoses: diagnoseType[] = diagnoseData;

const getDiagnoses = (): diagnoseType[] => {
  return diagnoses;
};

export default { getDiagnoses };
