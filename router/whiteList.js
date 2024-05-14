import express from "express"
import * as whiteList from "../router_handler/whiteList.js"

// 创建路由对象
const router = express.Router()
// 注册新用户
router.post('/reguser', whiteList.regUser)
// 获取图形验证码
router.get('/getsvg', whiteList.getSvgCaptcha)
// 登录
router.post('/login', whiteList.login)

export default router
