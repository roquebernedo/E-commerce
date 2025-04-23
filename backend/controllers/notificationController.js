import Notification from "../models/notificationModel.js"

const getNotifications = async (req, res) => {
    try{
        console.log("hola")
        const response = await Notification.find({})
            .populate('products')
            .populate('user')
        res.json(response)
    } catch (err){
        res.json(err)
    }
}

const getUserNotifications = async (req, res) => {
    try{
        const user = req.user
        console.log("aqui va el usercito")
        console.log(user)
        const firstNotification = {
            title: "¡Dirstore te da la bienvenida!",
            description: "Gracias por crear una cuenta. Esperamos que disfrutes en tu estadia en Dirstore. Ante cualquier duda pasar por la seccion de preguntas frecuentes.",
            date: new Date().toLocaleString("es-Pe", {
                timeZone: "America/Lima",
                hour12: false,
            }),
            seen: false,
        }
        console.log(firstNotification)

        const userNotifs = await Notification.findOne({ user: user._id })
        console.log("esto es el userNotifs")
        console.log(userNotifs)
        console.log("quizas")
        if(!userNotifs){
            const newNotif = await Notification.create({
                user: user._id,
                notif_list: [],
            });
            console.log(newNotif)

            const response = await Notification.findByIdAndUpdate(
                newNotif._id,
                {
                    $push: {
                        notif_list: firstNotification
                    },
                },
                { new: true }
            );
            console.log("separacion entre el newnotif y response")
            console.log(response)
            user.notifications = user.notifications.concat(response)
            console.log(user)
            await user.save()
            return res.json(response)
        }else{
            return res.json(userNotifs)
        }

    } catch (err){
        console.log(err)
        res.json(err)
    }
}

const deleteNotification = async (req, res) => {
    try{
        const noti = req.params.id
        const user = req.user
        console.log(user)
        console.log(noti)

        const notificationList = await Notification.findOne({ user: user._id })

        const updatingNoti = await Notification.findOneAndUpdate(
            {
                user: user._id,
            },
            {
                $pull: {
                    notif_list: {
                        _id: noti,
                    },
                }
            },
            { new: true }
        ) 
        console.log("aca esta el updatingnoti")
        console.log(updatingNoti)

        if(updatingNoti){
            return res.json({
                message: "Notificacion eliminada",
                notif_list: updatingNoti.notif_list,
                notification: notificationList
            })
        }else{
            return res.json({ error: true, message: "Algo salio mal"})
        }

    } catch(error){
        console.log(error)
        res.json("holii")
    }
}

const markAsSeen = async (req, res) => {
    try{
        const noti = req.params.id
        const user = req.user
        console.log(user)
        console.log(noti)

        const {notif_list} = await Notification.findOneAndUpdate(
            {
                user: user._id,
                "notif_list._id": noti,
            },
            {
                $set: {
                    "notif_list.$.seen": true,   
                }
            },
            { new: true }
        ) 
        console.log("aca esta el updatingnoti")
        console.log(notif_list)

        
        return res.json({ message: "Notificacion eliminada", notif_list })
        

    } catch(error){
        console.log(error)
        res.json("holii")
    }
}

const gettingUniqueNotification = async (req, res) => {
    try {
        const user = req.user;
        const noti = req.params.id;
        console.log("entro al gettingunique")
        console.log(user)
        console.log(noti)
        const notification = await Notification.findOne(
            {
                user: user._id,
                'notif_list._id': noti
            },
            {
                'notif_list.$': 1, // Solo devuelve el elemento del array que coincide
                user: 1
            }
        );
        console.log("llega aca")
        //const uniqueNoti = notification.notif_list.find(item => item.id === noti)
        //console.log(uniqueNoti)
        console.log(notification.notif_list[0])
        res.json(notification.notif_list[0]); 
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const gettingNotifications = async (req, res) => {
    try{
        console.log("hola")
        const response = await Notification.find({})
            .populate('user')
        //console.log(response)
        res.json(response)
    } catch (err){
        res.json(err)
    }
}

export { 
    getUserNotifications,
    deleteNotification,
    markAsSeen,
    gettingUniqueNotification,
    gettingNotifications
}