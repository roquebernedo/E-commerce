import Address from "../models/addressModel.js"
import User from "../models/userModel.js"

const getAddress = async(req, res, next) => {
    const user = req.user

    try{
        console.log("entra aquisito nomas")
        const address = await Address.findOne({
            user: user._id,
        })
        console.log(address)
        if(!address) return res.json("Address not found")
        return res.json(address)
    } catch(err){
        next(err)   
    }
}

const addAddress = async(req, res, next) => {
    const user = req.user
    console.log(user)
    console.log("aca abajo salio la info del user")
    try{
        console.log("hola")
        const address = await Address.findOne({
            user: user._id,
        })

        if(address){
            console.log("nadin")
            console.log(address)
            // const newAddress = {
            //     address: [{ ...req.body, isDefault: false}]  
            // }
            
            if(address.address.length > 0){
                address.address.push({...req.body, isDefault: false})
            }else{
                address.address.push({ ...req.body, isDefault: true })
            }
            //const newAddress = {...req.body, isDefault: false}
            
            //address.address.push(newAddress)
            await address.save()
            console.log(address)
            return res.json({ message: "New Address registered", address })

        }else{
            const userFound = await User.findById(user._id)
            const newAddress = new Address({
                address: [{ ...req.body, isDefault: true}],
                user: user._id
            })
            userFound.addresses = newAddress._id
            await userFound.save()
            await newAddress.save()

            console.log(userFound)
            console.log("este fue el usercito")
            return res.json({
                message: "New Address registered",
                address: newAddress
            })
        }
    } catch (err){
        next(err)
    }
}

const updateAddress = async(req, res, next) => {
    const user = req.user
    console.log(req.params.id)
    try{       
        console.log("entro aquisito nomas")
        const updateAddress = await Address.findOneAndUpdate(
            {
                user: user._id,
                "address._id": req.params.id
            },
            {
                $set:{
                    "address.$.state": req.body.state,
                    "address.$.city": req.body.city,
                    "address.$.zip_code": req.body.zip_code,
                    "address.$.street_name": req.body.street_name,
                    "address.$.street_number": req.body.street_number
                }
            },
            { new: true }
        )
        
        console.log(updateAddress)
        const updatedAddress = updateAddress.address.find(item => item._id.toString() === req.params.id)
        console.log(updatedAddress)
        return res.json({
            message: "Address updated",
            address: updatedAddress
        })

    } catch(err){
        next(err)
    }
}

const removeAddress = async(req, res, next) => {
    const user = req.user
    try{
        console.log("entro aca pe")
        const foundAddress = await Address.findOneAndUpdate(
            {
                user: user._id
            },
            {
                $pull: {
                    address: { _id: req.params.id }
                }
            },
            { new: true }
        )

        if(!foundAddress.address.some(e => e.isDefault) && foundAddress.address.length > 0){
            foundAddress.address[0].isDefault = true
            await foundAddress.save()
            return res.json({ 
                message: "Address removed, new default setted",
                address: foundAddress.address
            }) 
        }

        return res.json({ message: "Address removed", address: foundAddress.address })
        
    } catch(err){
        next(err)
    }
}

const setDefault = async(req, res, next) => {
    const user = req.user
    console.log("oliwi")
    console.log(user)
    try{
        await Address.findOneAndUpdate(
            {
                user: user._id,
                "address.isDefault": true,
            },
            {
                $set: {
                    "address.$.isDefault": false
                }
            }
        )

        const address = await Address.findOneAndUpdate(
            {
                user: user._id,
                "address._id": req.params.id,
            },
            {
                $set: {
                    "address.$.isDefault": true
                }
            },
            { new: true }
        )
        const updatedAddress = address.address.find(item => item._id.toString() === req.params.id)
        console.log(updatedAddress)
        console.log("entro hasta aca gaaa") 
        await address.save()
        return res.json({
            message: "Address selected",
            address: updatedAddress
        })
    } catch(err){
        next(err)
    }
}

export { 
    addAddress,
    getAddress,
    updateAddress,
    removeAddress,
    setDefault
}