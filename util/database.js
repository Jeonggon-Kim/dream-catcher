// database.js
import { MongoClient } from 'mongodb';

const url = process.env.mongo_url;
const options = {}; // `useNewUrlParser` 옵션 제거

let client;
let clientPromise;

if (!url) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export async function connectDB() {
  const client = await clientPromise;
  return client;
}

// 기본 내보내기 추가
export default connectDB;
