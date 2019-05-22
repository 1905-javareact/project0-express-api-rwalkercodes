import express from 'express'
import { sessionMiddleware } from './middleware/session-middleware'
import bodyParser from 'body-parser'
import { userRouter } from './routers/user-router'
//import { User } from '../models/user'


const app = express();

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use(userRouter);

app.listen(8080, ()=>{
    console.log('app has started');
})