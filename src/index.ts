import express from 'express'
import { sessionMiddleware } from './middleware/session-middleware'
import bodyParser from 'body-parser'
import { userRouter } from './routers/user-router'
import { reimRouter } from './routers/reim-router'
//import { User } from '../models/user'
import cors = require('cors')


const app = express();

app.use(cors({
    origin: ['*', 'http://localhost:3000'],
    credentials: true
}))

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use(userRouter);

app.use(reimRouter);

app.listen(3020, ()=>{
    console.log('app has started');
})