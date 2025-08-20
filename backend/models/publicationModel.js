import mongoose from "mongoose"

const publicationSchema = mongoose.Schema({
    // owner: {
    //     type: String,
    //     required: true,
    // },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
    },
    sales: [{
        buyer: {
            id: String,
            name: String,
            email: String,
        },
        quantity: Number,
        price: Number,
        payment_date: String,
        delivery_date: String,
    }]
}, {
    timestamps: true
})

const Publication =  mongoose.model('Publication', publicationSchema)

export default Publication