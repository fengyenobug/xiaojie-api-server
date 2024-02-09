import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

import apiRouter from './router/apiRouter.js'
import userRouter from './router/user.js'
app.use(apiRouter)
app.use('/api',userRouter)

app.listen(3000, () => {
    console.log('express server running at 127.0.0.1:3000');
})