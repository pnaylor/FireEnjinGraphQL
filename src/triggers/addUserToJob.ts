import * as functions from "firebase-functions";

import connect from "../connect";
import addUserToJobUnit from "../units/addUserToJob/addUserToJob";

export default functions.https.onRequest(async (req, res) => {
  connect();

  return res.status(200).send({
    job: await addUserToJobUnit(req.body && req.body.data ? req.body.data : {})
  });
});
