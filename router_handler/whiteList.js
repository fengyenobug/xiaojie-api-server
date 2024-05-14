import db from '../db/index.js'
import bcrypt from 'bcryptjs'
import svgCaptcha from 'svg-captcha'
import Jwt from 'jsonwebtoken'
import * as schemaUser from '../schema/regSchema.js'
import { encrypto } from '../utils/aes.js'

export const regUser = async (req, res) => {
  try {
    const userinfo = req.body
    const { err, value } = schemaUser.regSchema.validate(userinfo)
    if (err) {
      return res.cc(err)
    }
    // 查询数据库，判断当前用户名是否已被占用
    const sqlStr = 'select * from users where username = ?'
    db.query(sqlStr, userinfo.username, (err, result) => {
      if (err) {
        return res.cc(err)
      }
      if (result.length > 0) {
        return res.cc('用户名被占用，请更换其他用户名！', 402)
      }
      // 防止用户密码泄露，对存入数据库的密码进行加密，避免明文储存密码
      const password = bcrypt.hashSync(userinfo.password, 10)
      // 对邮箱加密存储
      const email = encrypto(userinfo.email)
      const sql = 'insert into users set ?'
      db.query(sql, { username: userinfo.username, password: password, email: email }, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('注册失败，请稍后再试！')
        return res.cc('注册成功', 200)
      })
    })
  } catch (error) {
    return res.cc(error)
  }
}
export const login = (req, res) => {
  try {
    const userInfo = req.body
    // console.log(req.session.captcha, userInfo.captcha);
    if ((req.session.captcha && req.session.captcha.toLowerCase()) !== userInfo.captcha.toLowerCase()) {
      return res.cc('验证码错误', 402)
    }
    const sql = 'select * from users where username = ?'
    db.query(sql, userInfo.username, (err, result) => {
      if (err) return res.cc(err)
      if (result.length === 1) {
        const succ = bcrypt.compareSync(userInfo.password, result[0].password)
        if (succ) {
          const tokenStr = Jwt.sign({ username: userInfo.username }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
          return res.send({
            status: 200,
            message: '登录成功！',
            token: tokenStr
          })
        } else {
          return res.cc('密码错误', 402);
        }
      } else {
        res.cc('用户名不存在！', 402)
      }
    })
  } catch (error) {
    return res.cc(error.message)
  }
}
export const getSvgCaptcha = (req, res) => {
  const cap = svgCaptcha.createMathExpr({
    height: 30,
    width: 120,
    fontSize: 30,
    noise: 2,
    background: '#f3f3f3'
  });
  req.session.captcha = cap.text; // session 存储验证码数值
  // console.log(req.session.captcha, 'cap.text');
  res.type('svg'); // 响应的类型
  res.send({
    status: 200,
    data: cap.data
  })
}
