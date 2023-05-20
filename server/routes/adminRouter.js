const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const idMiddleware = require('../middleware/controls/idMiddleware')

router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
router.get('/users/:id', roleMiddleware(['ADMIN']), idMiddleware, controller.getUserById)
router.post('/categories/create', roleMiddleware(['ADMIN']), controller.createCategory)
router.delete('/categories/:id', roleMiddleware(['ADMIN']), idMiddleware, controller.deleteCategory)
router.post('/items/create', roleMiddleware(['ADMIN']), controller.createItem)
router.put('/items/update', roleMiddleware(['ADMIN']), controller.updateItem)
router.delete('/items/:id', roleMiddleware(['ADMIN']), idMiddleware, controller.deleteItem)

module.exports = router