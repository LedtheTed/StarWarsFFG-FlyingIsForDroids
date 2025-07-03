import { log } from "./utils";
const FEATURE_ID = "weapon-power";

export class WeaponPower {
    constructor() {
        log(FEATURE_ID, "initializing");
    }
    static setPower() {
        throw new Error("Method not implemented.");
    }
}
