import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest({region: ["asia-northeast1"]}, async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.registerUser = onRequest({ region: ["asia-northeast1"] }, async (req, res) => {
  try {
    const data = req.body;  // Get data from the request body
    const writeResult = await getFirestore().collection("registration").add(data);
    res.json({ result: `Registration with ID: ${writeResult.id} added.` });
  } catch (error) {
    logger.error("Error adding registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});