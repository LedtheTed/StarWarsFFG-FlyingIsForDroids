import { MODULE_ID, log, error, warn } from "./utils.js";
const FEATURE_ID = "weapon-power";
const DEFAULT_SIL = 1;  // Default silhouette for a vehicle

let silhouettePowerValues = {   // Weird backwards structure but it works I guess.
    7: 4,
    5: 3,
    1: 2
};

export class WeaponPower {
    constructor() {
        log(FEATURE_ID, "initializing");
    }

    /**
     * Sets the weapon power of the actor.
     * If power provided, sets power to that value, and makes clear that the power value has been custom set.
     * If power not provided, sets power value to default value provided by that ship's silhouette class, and clears the custom set flag.
     * @param {Actor} actor 
     * @param {number} power 
     * @returns 
     */
    setPower(actor, power) {
        log(FEATURE_ID, `Setting power of ${actor.name}`);
        if (!actor) {   // Ensures actor exists.
            error(FEATURE_ID, `setPower requires an actor, but received ${actor.name}`);
            return;
        }
        if (actor.type !== "vehicle") { // If not vehicle, warns user but allows proceeding. Your own grave!
            warn(FEATURE_ID, `setPower is intended for vehicle's but has been called on a ${actor.name.type} for ${actor.name}. Consider clearing this flag if done in error using the WeaponPower.clearPower() method.`);
        }
        let silhouette = actor.system.attributes.Silhouette.value ?? DEFAULT_SIL; // Gets sil, or just sets it to the default vehicle silhouette.
        if (power !== undefined && power !== null) {    // If power provided, must be custom modified - sets isPowerModified to true
            setPowerModified(actor);
        } else {        // If power not provided, not custom modified, and power must be determined using silhouette to power. Also, isPowerModified set to false.
            power = silhouetteToPower(silhouette);
            setPowerModified(actor, false);
        }
        actor.setFlag(MODULE_ID, "weaponPower", power);
        log(FEATURE_ID, $`actor ${actor.name} weapon power set to ${power}`);
    }

    /**
     * Given an actor, gets its weapon power.
     * @param {Actor} actor 
     * @returns {number}
     */
    getPower(actor) {
        return actor.getFlag(MODULE_ID, "weaponPower");
    }
}

/**
 * Sets whether the power has been custom modified, or is default for a ship of that silhouette. Defaults to true - custom modified - if called.
 * @param {Actor} actor 
 * @param {boolean} isModified 
 */
function setPowerModified(actor, isModified = true) {
    actor.setFlag(MODULE_ID, "isPowerModified", isModified);
}

/**
 * Helper function - Given a silhouette, computes the default weapon power for a ship of that size.
 * @param {number} silhouette 
 * @returns 
 */
function silhouetteToPower(silhouette) {
    for (const [key, value] of Object.entries(silhouettePowerValues)) {
        if (silhouette >= Number(key) || Number(key) === 1) {   // Edit in the future; make this expandable, and not just tied to one. Something as in "if we're on the last key in silhouettePowerValues, just give it that one."
            return value;
        }
    }
    error(FEATURE_ID, `could not find default power for silhouette: ${silhouette}`)
}