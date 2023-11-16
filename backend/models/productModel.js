import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
    ]
    
}, {
    timestamps: true
})

const Product =  mongoose.model('Product', productSchema)

export default Product