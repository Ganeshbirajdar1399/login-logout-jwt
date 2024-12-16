import { NextFunction, Request, Response } from 'express';
import StudentSchema from './userSchema';
import { error } from 'console';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { AuthRequest } from '../middleware/authenticate';

const register = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Request Body:', req.body); // Log the incoming request body

  const { fname, lname, email, password, role } = req.body;

  if (!fname || !lname || !email || !password) {
    console.log('Validation Error: Missing fields');
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    console.log('Checking if student exists...');
    const existingStudent = await StudentSchema.findOne({ email });
    if (existingStudent) {
      console.log('Error: User already exists');
      res.status(400).json({ error: 'User Already Exists.' });
      return;
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new student...');
    const newStudent = await StudentSchema.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    console.log('Student created successfully:', newStudent);
    res.status(201).json({
      status: true,
      message: 'Student Created',
      data: {
        _id: newStudent._id,
        fname: newStudent.fname,
        lname: newStudent.lname,
        email: newStudent.email,
        role: newStudent.role,
      },
    });
    return;
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Something went wrong' });
    return;
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const student = await StudentSchema.findOne({ email });
  if (!student) {
    res.status(400).json({ error: 'User not found.' });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, student.password);
  if (!isPasswordMatch) {
    res.status(400).json({ error: 'Incorrect Credentials' });
    return;
  }

  try {
    const token = sign({ sub: student._id }, config.jwtSecret as string, {
      expiresIn: '1d',
    });
    res.status(200).json({
      status: true,
      message: 'User Loggedin ',
      data: {
        _id: student._id,
        email: student.email,
        fname: student.fname,
        lname: student.lname,
        password: student.password,
      },
      token,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
    return;
  }
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  const _request = req as AuthRequest;
  const user = await StudentSchema.findById(_request.Id);

  if (user) {
    res.status(200).json({
      status: true,
      data: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        password: user.password,
      },
    });
    return;
  }
  res.status(500).json({ error: 'Something went wrong' });
  return;
};

export { register, login, me };
