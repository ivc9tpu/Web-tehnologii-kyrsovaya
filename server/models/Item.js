const {Schema, model} = require('mongoose')

const Item = new Schema({
    title: {type: String, unique: true, required: true},
    desc: {type: String, required: true},
    specifications: {type: String},
    price: {type: Number, required: true},
    category_id: {type: Schema.Types.ObjectId, ref: 'Category'},
    img: {type: String, required: true}
})

module.exports = model('Item', Item)