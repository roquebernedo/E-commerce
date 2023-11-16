import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import mongooseUniqueValidator from "mongoose-unique-validator"

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

userSchema.plugin(mongooseUniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
})

// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// userSchema.methods.matchPasswords = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password)
// }

const User =  mongoose.model('User', userSchema)

export default User