"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
function env(key, fallback) {
    let config = {};
    try {
        config = require("../environment.json");
    }
    catch (error) {
        console.log("No environment.json file found in the root.");
    }
    const functionsConfig = functions.config();
    if (Object.keys(functionsConfig).length > 0) {
        config = Object.assign(Object.assign({}, config), functionsConfig);
    }
    const value = !key
        ? config
        : key && key.indexOf(".") >= 0
            ? key.split(".").reduce((p, c) => (p && p[c]) || null, config)
            : key && typeof config[key] !== "undefined"
                ? config[key]
                : null;
    return fallback &&
        ((!value && value !== false && value !== 0) ||
            typeof value === "undefined" ||
            value === null)
        ? fallback
        : value;
}
exports.default = env;
//# sourceMappingURL=env.js.map