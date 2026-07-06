import mongoose from 'mongoose';
import Internship from './server/models/Internship.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/technoriderzz';

async function test() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Deleting internship with ID "1"...');
    const result = await Internship.deleteOne({ _id: "1" });
    console.log('Delete Result:', result);
  } catch (error) {
    console.error('Mongoose Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

test();
