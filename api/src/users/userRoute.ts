import express, { Router } from 'express';
import { login, me, register } from './userController';
import authenticate from '../middleware/authenticate';

const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.get('/me', authenticate, me);

export default UserRoute;
