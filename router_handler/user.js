import db from '../db/index.js'
import bcrypt from 'bcryptjs'
import * as schemaUser from '../schema/user.js'
import { encrypto } from '../utils/aes.js'

export const regUser = async (req, res) => {
    try {
        const userinfo = req.body
        await schemaUser.regSchema.validateAsync(userinfo)
        // 查询数据库，判断当前用户名是否已被占用
        const sqlStr = 'select * from users where username = ?'
        db.query(sqlStr, userinfo.username, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.length > 0) {
                return res.cc('用户名被占用，请更换其他用户名！')
            }
            // 防止用户密码泄露，对存入数据库的密码进行加密，避免明文储存密码
            const password = bcrypt.hashSync(userinfo.password, 10)
            // 对邮箱加密存储
            const email = encrypto(userinfo.email)
            const sql = 'insert into users set ?'
            db.query(sql, { username: userinfo.username, password: password, email: email }, (err, result) => {
                if (err) return res.cc(err)
                if (result.affectedRows !== 1) return res.cc('注册失败，请稍后再试！')
                res.cc('注册成功', 0)
            })
        })
    } catch (error) {
        return res.cc(error.message, '2')
    }

}
export const login = (req, res) => {
    res.send('login OK')
}
