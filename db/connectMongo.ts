import mongoose from 'mongoose';

export default function connectMongo(uri: string) {
  return mongoose.connect(uri, {});
}
