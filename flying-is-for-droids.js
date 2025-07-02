import { init as weapon_power_init } from "./scripts/weaponPower.mjs";
import { MODULE_ID, log } from "./scripts/utils.mjs";
const FEATURE_ID = "entrypoint";

Hooks.once("init", () => {
    log(FEATURE_ID, "initializing module...");
    weapon_power_init();
    
});