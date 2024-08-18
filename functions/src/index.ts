import { logger } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as cors from 'cors';

initializeApp();

const corsHandler = cors({ origin: true });

exports.registerUser = onRequest(
  { region: ['asia-northeast1'] },
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const data = req.body; // 요청 본문에서 데이터 가져오기
        const db = getFirestore();

        await db.collection('registration').add(data);
        res.json({ result: `Registration Data: ${JSON.stringify(data)}` });
      } catch (error) {
        logger.error('Error adding registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }
);
