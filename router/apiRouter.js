import express from 'express'

const apiRouter = express.Router()

apiRouter.get('/get', (req, res) => {
    const query = req.query
    res.send({
        status: 0,
        message: 'get success成功',
        data: query
    })
})

apiRouter.post('/post', (req, res) => {
    const query = req.query
    res.send({
        status: 0,
        message: 'post请求成功',
        data: query
    })
})

export default apiRouter