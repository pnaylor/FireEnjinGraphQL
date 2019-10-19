import * as functions from "firebase-functions";

export default functions.https.onRequest(async (req, res) => {
  try {
    console.log(req);
    // DO something
  } catch (error) {
    console.log(error);
  }

  res.status(200).send({
    test: "wee"
  });

  return true;
});
