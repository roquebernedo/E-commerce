import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    products: [
        {
            product_id: String,
            title: String,
            description: String,
            image: String,
            price: Number,
            buyer: String,
            quantity: Number,
        }
    ],
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
    },
    shipping_address: {
        state: String,
        city: String,
        zip_code: String,
        street_name: String,
        street_number: Number,
    },
    payment_date: Number,
    delivery_date: Number,
    flash_shipping: Boolean
}, {
    timestamps: true
})

const Order =  mongoose.model('Order', orderSchema)

export default Order