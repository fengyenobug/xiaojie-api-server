import express from "express";
import * as user from '../router_handler/user.js'
const router = express.Router()
// 修改密码
router.post('/modifypassword', user.modifyPassword)

export default router
