import db from "../db/index.js";
import bcrypt from 'bcryptjs'

export const modifyPassword = (req, res) => {
    try {
        const data = req.body
        const user = req.auth
        console.log(user, 'user');
        if (data.newPassword === data.repeatNewPassword) {
            db.query(`select password from users where username = ?`, user.username, (err, result) => {
                const succ = bcrypt.compareSync(data.oldPassword, result[0].password)
                if (succ) {
                    const newPwd = bcrypt.hashSync(data.newPassword, 10)
                    db.query(`update users set password = ? where username = ?`, [newPwd, user.username], (er, resu) => {
                        if (er) {
                            return res.cc(er)
                        }
                        return ('修改密码成功！', 200)
                    })
                } else {
                    return res.cc('原密码错误！', 402)
                }
            })
        } else {
            return res.cc('两次新密码输入不一致！', 402)
        }
    } catch (error) {
        return res.cc(error)
    }
}