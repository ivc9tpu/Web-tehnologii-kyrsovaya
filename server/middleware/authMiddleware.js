const jwt = require('jsonwebtoken')
const {secret} = require('../config.js')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const auth = req.headers.authorization
        if (!auth) {
            return res.status(403).json({error: {message: "Пользователь не авторизован"}})
        }
        const token = auth.split(' ')[1]
        if (!token) {
            return res.status(403).json({error: {message: "Пользователь не авторизован"}})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch(e) {
        console.log(e)
        return res.status(403).json({error: {message: "Внутренняя ошибка сервера"}})
    }
}