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


class adminController {
    async getUsers(req, res) {
        try {          
            const users = await User.find()
            //console.log(users)

            res.json({users})
        } catch(e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async getUserById(req, res) {
        try {          
            const user = await User.findById(req.params.id)
            const orders = await Order.find({owner_id:{$eq:user._id}})
            //console.log('user: ', user, 'orders: ', orders)

            res.json({user,orders})
        } catch(e) {
            console.log(e)
            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async createCategory(req, res) {
        try {
            //console.log("createCategory -> ", req.body)
            const category = new Category({name: req.body.category.name})

            category.save()
            res.json(category)
        } catch (e) {
            console.log(e)

            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async deleteCategory(req, res) {
        try {
            //console.log("deleteCategory -> ", req.params)

            const category = await Category.findById(req.params.id)
            if (!category) {
                res.status(400).json({error:{message:'Категория не найдена'}})
            }

            await Category.findByIdAndDelete(req.params.id)
            res.json(category)
        } catch (e) {
            console.log(e)

            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async createItem(req, res) {
        try {
            //console.log('createItem', req.body)
            const item = new Item(req.body.item)

            item.save()
            res.json({item})
        } catch (e) {
            console.log(e)

            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async updateItem(req, res) {
        try {
            //console.log('createItem', req.body)
            //console.log('req.body: ', req.body)
            const item = await Item.findByIdAndUpdate(req.body.item._id,
                {
                    ...req.body.item
                },
                {
                    new:true
                }
            )
            //console.log(item)
            res.json({item})
        } catch (e) {
            console.log(e)

            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }

    async deleteItem(req, res) {
        try {
            //console.log("deleteCategory -> ", req.params)

            const item = await Item.findById(req.params.id)
            if (!item) {
                res.status(400).json({error:{message:'Товар не найден'}})
            }

            await Item.findByIdAndDelete(req.params.id)
            res.json(item)
        } catch (e) {
            console.log(e)

            res.status(400).json({error:{message:'Внутренняя ошибка сервера'}})
        }
    }
}

module.exports = new adminController()