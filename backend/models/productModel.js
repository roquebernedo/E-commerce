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
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required:true
    },
    stock:{
        type: Number,
        required: true
    },  
    main_features: [String],
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
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