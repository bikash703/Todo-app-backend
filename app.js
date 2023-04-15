import express from "express";
import userRouter from './routes/user.js'
import userTask from './routes/task.js'
import {config} from 'dotenv'
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors';

export const app = express()

config({
    path:'./data/config.env'
})

app.use(express.json())
app.use(cookieParser())

//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",userTask)
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

//using error middleware
app.use(errorMiddleware)

