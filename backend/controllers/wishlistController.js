import Product from "../models/productModel.js"
import Wishlist from "../models/wishlistModel.js"

const getWishList = async (req, res) => {
    try{
        console.log("hola")
        const response = await Wishlist.find({})
            .populate('products')
            .populate('user')
        res.json(response)
    } catch (err){
        res.json(err)
    }
}

const getUserList = async (req, res, next) => {
    const user = req.user
    if(!user._id) return res.json("exit")
    console.log("aca esta el usuario")
    console.log(user)

    try{
        let message = false
        const wishlist = await Wishlist.findOne({ user: user._id }).populate('products')
        console.log(wishlist)
        if(!wishlist){
            const newList = await Wishlist.create({
                product: [],
                user: user._id
            })
            console.log("aca va el newlist")
            console.log(newList)
            user.wishlist = user.wishlist.concat(newList._id)
            console.log(user)
            await user.save()
            return res.json(newList)
        } 
    } catch(error){
        next(error)
    }
    //res.json(user)
}

const addToList = async (req, res, next) => {
    const user = req.user
    console.log("estoy en addtolist")
    const product = await Product.findById(req.params.id)
    //console.log(product)

    console.log("addtolist")
    try{
        console.log("hola, entro al addtolist")
        if(!req.params.id){
            throw new Error("no existe id")
        }
        console.log(req.params.id)
        const list = await Wishlist.findOne({ user: user._id })
        const productID = await Product.findOne({ _id: req.params.id })
        console.log(productID)
        console.log("aca vino el productID")

        if(list){
            let aux = list.products.includes(req.params.id)
            if(!aux){
                list.products = list.products.concat(req.params.id)
                await list.save()
                return res.json({ message: "Producto agregado a Favoritos", product: productID, list })
            }

            return res.json({ message: "El producto ya se encuentra en Favoritos" })
        }else{
            const newList = new Wishlist({
                products: [product],
                user: user._id
            })

            user.wishlist = user.wishlist.concat(newList)
            await newList.save()
            await user.save()
            return res.send({ 
                message: "Producto agregado a Favoritos",
                list: newList
            })
        }
    }catch(error){
        next(error)
    }
}

const removeFavorite = (async (req, res, next) => {
    const user = req.user
    console.log("hola user")
    console.log("estoy removiendo productos favoritos")
    try{
    //const productID = req.params.id
    const wishlist = await Wishlist.findOne({ user: user._id })
    const productID = await Product.findOne({ _id: req.params.id })
    console.log(wishlist)
    console.log(req.params.id)
    console.log("aca va el wish")
    console.log(productID)
    //wishlist.products = wishlist.products.filter(product => product._id.toString() !== productID)
    if(productID){
        const wishlist = await Wishlist.findOneAndUpdate(
            {
              user: user._id,
            },
            {
              $pull: {
                products: req.params.id,
              },
            },
            { new: true }
        );
        //await Product.findByIdAndDelete(req.params.id)
        console.log(wishlist)
        await wishlist.save()
        console.log(wishlist)
        console.log("acca termina el delete")
        //await Product.save()
        console.log("entra aca")
        await user.save()
        console.log("aca tambien")
        return res.json({ wishlist: wishlist._id, product: productID })
    }
    }catch(error){
        next(error)
    }
  })

//   const removeFavorite = async (req, res, next) => {
//     console.log("hola user")
//     console.log("estoy removiendo productos favoritos")
//     try{
//         const user = req.user
//         const productID = req.params.id
//         const wishlist = await Wishlist.findOne({ user: user._id })
//         const product = await Product.findOne({ _id: productID })

//         console.log(wishlist)
//         //const favorite = user.wishlist.map(favorite => favorite )
//         console.log("aca va el wish")
//         //console.log(favorite)
//         //wishlist.products = wishlist.products.filter(product => product._id.toString() !== productID)
//         //console.log(wishlist)
//         if(wishlist){
//             let aux = wishlist.products.includes(req.params.id)
//             if(aux){
//                 wishlist.products = wishlist.products.filter(product => product._id.toString() !== productID)
//                 console.log("aca va el final")
//                 console.log(wishlist)
//                 await wishlist.save()
//                 await user.save()
//                 return res.json({ wishlist, product})
//             }
//         }
//         console.log(user)
//     }catch(error){
//         next(error)
//     }
    
// }

export { 
    getUserList,
    addToList,
    removeFavorite,
    getWishList
}