import { TestModel } from "./test";
import { VaccinneModel } from "./vaccinne";

export interface VaccinneListModel{
    isProtect?: boolean;
    notActive: VaccinneModel[];
    active: VaccinneModel[];
    testList: TestModel[]
}
