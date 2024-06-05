import mongoose from "mongoose"

const wishlistSchema = mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
    ]
}, {
    timestamps: true
})

const Wishlist =  mongoose.model('Wishlist', wishlistSchema)

export default Wishlist