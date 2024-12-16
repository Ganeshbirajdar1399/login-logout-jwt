import mongoose from 'mongoose';
import { Student } from './userTypes';

const StudentSchema = new mongoose.Schema<Student>(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Only keep unique for email
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<Student>('Student', StudentSchema);
