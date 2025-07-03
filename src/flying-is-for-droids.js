import { WeaponPower } from "./scripts/weaponPower";
import { MODULE_ID, log } from "./scripts/utils";
const FEATURE_ID = "entrypoint";

Hooks.once("init", () => {
    log(FEATURE_ID, "initializing module...");
    game.weaponPower = new WeaponPower();
});

// Ensure that the new actor has access to the weapon power field so it can be edited.
Hooks.on("preCreateActor", (actor, data, options, user) => {
    if (actor.type === 'vehicle') {
        game.weaponPower();
        actor.setFlag(MODULE_ID, "weaponPower", WeaponPower.setPower());
    }
});

