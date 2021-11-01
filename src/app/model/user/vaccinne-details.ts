import { DoctorModel } from "./doctor";
import { VaccinneModel } from "./vaccinne";

export interface VaccinneDetailsModel{
    doctor?: DoctorModel;
    guid?: string;
    lotNumber?: string;
    title?: string;
    recordOn?: Date;
    repeatOn?: Date;
    isProtect?: boolean;
}