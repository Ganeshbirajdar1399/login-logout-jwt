// import { config } from 'dotenv';
import express  from 'express';
import cors from 'cors'
import  config from './config/config'
import UserRoute from './users/userRoute';
import db from './config/db';
const app = express();
app.use(cors());
app.use(express.json());
db();
app.use('/api/users',UserRoute)

app.listen(config.port, ()=>{
    console.log(`Server is running on port: ${config.port}`);
})