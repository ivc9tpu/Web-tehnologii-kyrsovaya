const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const usernameMiddleware = require('../middleware/controls/usernameMiddleware')
const passwordMiddleware = require('../middleware/controls/passwordMiddleware')

router.post('/registration',[
    check('password', 'Пароль должен быть длиннее 4-х символов и не более 20-и символов').isLength({min: 4, max: 20})
], usernameMiddleware, passwordMiddleware, controller.registration)
router.post('/login', controller.login)

module.exports = router