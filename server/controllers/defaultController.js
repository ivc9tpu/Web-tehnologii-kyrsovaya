const User = require('../models/User.js')
const Role = require('../models/Role.js')
const Order = require('../models/Order.js')
const Category = require('../models/Category.js')
const Item = require('../models/Item.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('../config.js')
const {Schema} = require('mongoose')

class defaultController {
    async getCategories(req, res) {
        try {
            //console.log('getCategories ', req.query.id)

            const categories = await Category.find()
            res.json({categories})
        } catch (e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async getCategoryById(req, res) {
        try {
            //console.log('getCategoryById -> ',"req.params:", req.params,"req.query:", req.query)
            const category = await Category.findById(req.params.id)
            //console.log(category)
            if(!category) {
                return res.status(400).json({error:{message:'Категория не найдена'}})
            }
            const items = await Item.find({category_id:{$eq:category._id}})
            //console.log(items)
            res.json({category, items})
        } catch (e) {
            console.log(e)
            
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async getItems(req, res) {
        try {
            const items = await Item.find()
            res.json({items})
        } catch (e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async getItemById(req, res) {
        try {
            const item = await Item.findById(req.params.id)
            if(!item) {
                return res.status(400).json({error:{message:'Товар не найден'}})
            }
            const category = await Category.findById(item.category_id)
            //console.log(item)

            res.json({item, category})
        } catch (e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async createOrder(req, res) {
        try {
            const user_data = req.user
            //console.log('user_data: ', user_data)          
            const user = await User.findById(user_data.id)
            if(!user) {
                res.status(400).json({error:{message:'Пользователь не найден'}})
            } 
            //console.log('req.body.items: ', req.body.items) 
            const order = new Order({
                owner_id: user_data.id,
                order_items: req.body.items
            })
            order.markModified('order_items')
            //console.log('order: ', order)
            order.save()
            res.json({order})
        } catch (e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async MyOrders(req, res) {
        try {
            const user_data = req.user
            //console.log(user_data)          
            const user = await User.findById(user_data.id)
            if(!user) {
                res.status(400).json({error:{message:'Пользователь не найден'}})
            }
            const orders = await Order.find({owner_id:{$eq:user._id}})
            //console.log('user: ', user, 'orders: ', orders)

            res.json({user,orders})
        } catch(e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }
}

module.exports = new defaultController()