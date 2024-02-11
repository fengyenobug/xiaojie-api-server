import crypto from 'crypto'

// 加密解密的key和iv
const key = process.env.AES_128_CBC_IV
const iv = process.env.AES_128_CBC_IV

// 封装加密函数
export const encrypto = (pText) => {
    const cipher = crypto.createCipheriv("AES-128-CBC", key, iv);
    return cipher.update(pText, "utf-8", "hex") + cipher.final("hex");
}

// 封装解密函数
export const decrypto = (cText) => {
    const decipher = crypto.createDecipheriv("AES-128-CBC", key, iv);
    return decipher.update(cText, "hex", "utf-8") + decipher.final("utf8");
}

