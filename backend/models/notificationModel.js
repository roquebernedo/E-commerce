import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    notif_list: [
        {
            title: String,
            description: String,
            date: String,
            seen: Boolean
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

const Notification =  mongoose.model('Notification', notificationSchema)

export default Notification