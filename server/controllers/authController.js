const User = require('../models/User.js')
const Role = require('../models/Role.js')
const Order = require('../models/Order.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('../config.js')


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации ", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({error:{message: "Пользователь с таким именем уже существует"}})
            }
            const hashPass = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPass, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch(e) {
            console.log(e)
            res.status(400).json({error:{message:'Registration error'}})
        }
    }

    async login(req, res) {
        try {
            //('someone is trying to login...')
            const {username, password} = req.body
            //console.log(req.body)
            const user = await User.findOne({username})
            if (!user) {
                //console.log('bad login data!')
                return res.status(400).json({error:{message: 'Пользователь с именем ' + username + ' не найден'}})
            }

            const validPass = bcrypt.compareSync(password, user.password)
            if (!validPass) {
                //console.log('bad pass!')
                return res.status(400).json({error:{message: 'Введен неверный пароль'}})
            }
            const token = generateAccessToken(user._id, user.roles,)
            //console.log('success!')
            return res.json({token, roles: user.roles})
        } catch(e) {
            console.log(e)
            res.status(400).json({error:{message:'Login error'}})
        }
    }
}

module.exports = new authController()