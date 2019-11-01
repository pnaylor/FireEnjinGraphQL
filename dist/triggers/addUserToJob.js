"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const connect_1 = require("../connect");
const addUserToJob_1 = require("../units/addUserToJob/addUserToJob");
exports.default = functions.https.onRequest(async (req, res) => {
    connect_1.default();
    return res.status(200).send({
        job: await addUserToJob_1.default(req.body && req.body.data ? req.body.data : {})
    });
});
//# sourceMappingURL=addUserToJob.js.map