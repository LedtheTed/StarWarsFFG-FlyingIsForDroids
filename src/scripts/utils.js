export const MODULE_ID = "flying-is-for-droids";
/**
 * Logs a message, identifying the feature it is logging from.
 * Idea taken from Wyceru's FFG-Enhancements module
 * @param feature
 * @param message
 */

export function log(feature, message) {
    console.log(`${MODULE_ID} | ${feature} | ${message}`);
}

export function error(feature, message) {
    console.error(`${MODULE_ID} | ${feature} | ${message}`);
}

export function warn(feature, message) {
    console.warn(`${MODULE_ID} | ${feature} | ${message}`);
}