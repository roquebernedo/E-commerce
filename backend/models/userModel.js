import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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