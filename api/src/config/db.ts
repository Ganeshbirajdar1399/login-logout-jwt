import mongoose from 'mongoose';
import config from './config';
import { error } from 'console';

const db = async () =>{
    await mongoose.connect(config.mongourl as string).then(()=>{
        console.log('database connected successfully');
    }).catch((error)=>{
         console.log('Error connecting to database:', error);
    })
}

export default db;