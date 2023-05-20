const jwt = require('jsonwebtoken')
const {secret} = require('../config.js')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
    
        try {
            const auth = req.headers.authorization
            //console.log(auth)
            if (!auth) {
                return res.status(403).json({error: {message: "Пользователь не авторизован"}})
            }
            const token = auth.split(' ')[1]
            if (!token) {
                return res.status(403).json({error: {message: "Пользователь не авторизован"}})
            }

            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return res.status(403).json({error: {message: 'У вас нет доступа'}})
            }

            next()
        } catch(e) {
            console.log(e)
            return res.status(403).json({error: {message: "Внутренняя ошибка сервера"}})
        }
    }
}