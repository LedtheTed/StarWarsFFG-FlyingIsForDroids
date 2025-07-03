import { MODULE_ID, log } from "./utils";
const FEATURE_ID = "weapon-power";

export class WeaponPower {
    constructor() {
        log(FEATURE_ID, "initializing");
    }
    static setPower(actor) {
        actor.setFlag(MODULE_ID)
    }
}

