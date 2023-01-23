// @ts-nocheck
import mongoose, { Document, model, models, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
    },
    role: {
      type: String,
      default: 'customer',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next: NextFunction) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.method('createJWT', function () {
  const token = jwt.sign(
    { userId: this._id, email: this.email, role: this.role },
    process.env.USER_VERIFICATION_SECRET_TOKEN,
    { expiresIn: '7d' }
  );
  return token;
});

UserSchema.method('comparePassword', async function (enteredPassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, this.password, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
});

const User = models.user || model<IUser>('user', UserSchema);
export default User;
