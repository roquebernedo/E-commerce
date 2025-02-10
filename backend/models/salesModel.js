import mongoose from "mongoose"

const salesSchema = mongoose.Schema({
    products: [
        {
            id: String,
            title: String,
            description: String,
            image: String,
            price: Number,
            quantity: Number,
        }
    ],
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
    },
}, {
    timestamps: true
})

const Sales =  mongoose.model('Sales', salesSchema)

export default Sales