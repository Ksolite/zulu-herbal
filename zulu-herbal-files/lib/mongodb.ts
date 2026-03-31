=====================================
FILE 13: lib/mongodb.ts
=====================================
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db('zulu-herbal');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}
