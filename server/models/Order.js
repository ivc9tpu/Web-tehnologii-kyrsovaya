const {Schema, model} = require('mongoose')

const Order = new Schema({
    owner_id: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    order_items: {type: Schema.Types.Mixed, required: true}
})

module.exports = model('Order', Order)