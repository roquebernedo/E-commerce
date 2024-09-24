import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    // user: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        min: 3
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product"
    }],
    productsOnCart: [{
        id: String,
        title: String,
        description: String,
        image: String,
        price: Number,
        quantity: Number,
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist"
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
    }],
    addresses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
}, {
    timestamps: true
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
})

const User =  mongoose.model('User', userSchema)

export default User