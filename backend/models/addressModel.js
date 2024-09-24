import mongoose from "mongoose"

const addressSchema = mongoose.Schema({
    address: [
        {
            state: String,
            city: String,
            zip_code: Number,
            street_name: String,
            street_number: Number,
            isDefault: Boolean,
        }
    ],
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
    },
}, {
    timestamps: true
})

const Address =  mongoose.model('Address', addressSchema)

export default Address