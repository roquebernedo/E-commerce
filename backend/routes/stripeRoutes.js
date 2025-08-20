import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
// import { cancelando, updateProductsHere } from "../controllers/stripeController.js";
import { userExtractor } from "../middleware/authMiddleware.js";
import Order from "../models/orderModel.js";
import Sales from "../models/salesModel.js";
import Notification from "../models/notificationModel.js";
import Address from "../models/addressModel.js";
import Publication from "../models/publicationModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY)

const router = express.Router()

// router.get("/success", (req, res) => res.send("success"))
// router.get("/cancel", (req, res) => res.send("cancel"))
router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.cartItems.map(item => {
    //console.log(item)
      return{
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.description,
            metadata: {
              id: item.id,
            }
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }
  })

  console.log(line_items)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'PE'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        },

        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
        
      }
    ],
    phone_number_collection: {
      enabled: true
    },
    line_items,
    mode: 'payment',
    // success_url: `https://ecommercerq.netlify.app/success`,
    success_url: `http://localhost:3000/success`,
    cancel_url: `${process.env.CLIENT_URL}/api/stripe/cart`,
  });

  return res.json(session);
});

// router.get('/checkout-success', (req, res) => res.send("success"))

router.put('/checkout-success', userExtractor, async (req, res) => {
  try {
    const user = req.user
    console.log("hola") 
    console.log("Ya estamos aca ps")
    console.log(user)
    console.log("llego acasito p papeto")
    const product = await Product.find({})
    console.log("este es el producto")
    
    if (!user.productsOnCart) {
      return res.status(404).send('Order not found');
    }
    console.log("si existen")
    // const isDefault = user.addresses && userFound.addresses.find(item => item.isDefault === true)
    // console.log(isDefault)
    if(!user.addresses){ 
      console.log("entro aca en el envio")
      return res.json({ message: "Necesitas tener una direccion de envio."})
    }
    // // Actualiza el stock y vacía el carrito
    for (const item of user.productsOnCart) {
      console.log("entro al for")
      console.log(item.id)
      if(item.id){
        console.log("primer holita")
        const productFound = await Product.findById(item.id)
        // Si el producto tiene un creador se agregaran sus ventas a sales
        if(productFound.user){
          console.log("aca esta el usuario del sales")
          console.log(productFound.user)
          const userFound = await User.findById(productFound.user._id)
          //userFound.sales.push(item)
          const salesUser = await Sales.findOne({
            user: userFound._id,
          })
          // sales del usuario
          if(!salesUser){
            console.log("entro aca solo 1")
            const createSales = new Sales({
              products: [],
              user: userFound._id,
            })
            createSales.products.push(item)
            userFound.sales = createSales._id
            console.log(userFound)
            console.log(productsOnCart)
            console.log("separacion")
            console.log(item)
            await userFound.save()
            await createSales.save()
          }else{
            console.log("entra aca en el sales")
            console.log(userFound)
            console.log(item)
            const plainItem = item.toObject();
            const shop = new Date().toLocaleString("es-Pe", {
                timeZone: "America/Lima",
                hour12: false,
                weekday: "long",
                year: "numeric",
                month: "long",   
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })
            const copyItem = { ...plainItem, shoppingDay: shop}
            //item.shoppingDay = shop
            console.log("copiandoooo")
            console.log(copyItem)
            console.log("item aca")
            console.log(item)
            console.log(shop)
            console.log("probando el shop")
            salesUser.products.push(copyItem)
            //console.log(productsOnCart)
            console.log("separacion")
            console.log(item)
            await salesUser.save()
          }
        }
      }
      console.log(item._id.toString())
      const product = await Product.findById(item.id);
      console.log("entro aca tambien")
      console.log(product)
      if (product) {
        console.log("aca si")
        product.stock -= item.quantity; // Reduce el stock
        console.log(product)
        console.log("aca no")
        await product.save();
        console.log("llegamos al pro")
        console.log(product)
        console.log("si entra aca esto esta bien")
      }
    }
    
    //console.log(product)
    const order = await Order.findOne({ user: user._id })
    console.log("hola aca es el order")
    console.log(order)
    if(!order){
      const userFound = await User.findById(user._id)
      //const isDefault = userFound.addresses.find(item => item.isDefault === true)
      console.log(userFound.addresses)
      const addressId = await Address.findOne({ user: userFound._id })
      console.log(addressId)
      // console.log(userFound.addresses.map(i => i.isDefault === true))
      //console.log(userFound.addresses.address.map(i => i))
      const isDefault = userFound.addresses && addressId.address.find(i => i.isDefault === true)
      console.log(isDefault)

      const newOrder = new Order({
        products: user.productsOnCart,
        user: user._id,
        payment_date: new Date().getTime(),
        delivery_date: new Date().getTime() + 24 * 60 * 60 * 1000, // 1 dia después del pago  
        flash_shipping: true,
        shipping_address: isDefault,
      })
      userFound.orders = newOrder
      console.log("neworder")
      console.log(newOrder)

      for(var i=0; i<user.productsOnCart.length; i++){
        if(user.productsOnCart[i].id){
          const orderNotification = {
            title: "¡Has concretado una venta!",
            description: `Se ha concretado una venta en tu publicacion ${user.productsOnCart[i].title}. Mas detalles a continuacion...` ,
            date: new Date().toLocaleString("es-Pe", {
                timeZone: "America/Lima",
                hour12: false,
            }),
            seen: false,
          }
          const product = await Product.findById(user.productsOnCart[i].id);
          console.log(product)
          console.log("Aea")
          const userFoundProduct = await User.findById(product.user && product.user._id)
          if(userFoundProduct){
            console.log(userFoundProduct)
            const idNotificationUserBefore = await Notification.findOne({ user: userFoundProduct._id})
            idNotificationUserBefore.notif_list.push(orderNotification)
            if(product.stock === 0){
              const stockNotification = {
              title: "¡Has vendido todo!",
              description: `Felicitaciones! Has vendido todas las existencias de tu publicacion ${user.productsOnCart[i].title}.` ,
              date: new Date().toLocaleString("es-Pe", {
                  timeZone: "America/Lima",
                  hour12: false,
                  weekday: "long",
                  year: "numeric",
                  month: "long",   
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
              }),
              seen: false,
              }
              idNotificationUserBefore.notif_list.push(stockNotification)
            }
            await idNotificationUserBefore.save()
          }
          
        }
      }
      const orderNotification = {
            title: "¡Tu pedido fue entregado!",
            description: "Tu orden ha sido entregada. ¡Esperamos que disfrutes de tu nuevo producto! No olvides que ahora puedes crear una reseña del producto.",
            date: new Date().toLocaleString("es-Pe", {
                timeZone: "America/Lima",
                hour12: false,
            }),
            seen: false,
      }
      const idNotificationUser = await Notification.findOne({ user: userFound._id})
      userFound.productsOnCart = []

      await newOrder.save()
      await userFound.save()
      idNotificationUser.notif_list.push(orderNotification)
      console.log("pásaaa")
     
      await idNotificationUser.save()
      return res.json({ products: product, message: 'Order successfully processed', orders: newOrder, notifications: idNotificationUser});
    }else{  
      const userFound = await User.findById(user._id)
      console.log(userFound)
      
      for(var i=0; i<user.productsOnCart.length; i++){
        if(user.productsOnCart[i].id){
          const orderNotification = {
            title: "¡Has concretado una venta!",
            description: `Se ha concretado una venta en tu publicacion ${user.productsOnCart[i].title}. Mas detalles a continuacion...` ,
            date: new Date().toLocaleString("es-Pe", {
                timeZone: "America/Lima",
                hour12: false,
            }),
            seen: false,
          }
          const product = await Product.findById(user.productsOnCart[i].id);
          console.log(product)
          console.log("Aea")
          console.log(product._id)
          console.log("Gaaaa")
          
          const userFoundProduct = await User.findById(product.user && product.user._id)
          console.log(userFoundProduct)
          const productPublication = await Publication.findOne({ product: product._id })
          
          
          console.log(productPublication)
          if(userFoundProduct){
            //console.log(userFoundProduct)
            console.log("llegamos por fin")
            const publication = await Publication.findById(productPublication);
            console.log("pasamos aqui pe")
            console.log(publication)
            // const salesOwnerProduct = await 
            const infoSale = {
              buyer: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
              },
              quantity: user.productsOnCart[i].quantity,
              price: user.productsOnCart[i].price,
              payment_date: new Date().getTime(),
              delivery_date: new Date().getTime() + 24 * 60 * 60 * 1000,
            }
            console.log(infoSale)
            console.log("es infosale")
            //userFoundProduct.publication.sales = userFoundProduct.publication.sales.concat(infoSale)
            //await userFoundProduct.save()
            if (publication) {
              publication.sales.push(infoSale);
              await publication.save();
            }
            const idNotificationUserBefore = await Notification.findOne({ user: userFoundProduct._id})
            idNotificationUserBefore.notif_list.push(orderNotification)
            if(product.stock === 0){
              const stockNotification = {
              title: "¡Has vendido todo!",
              description: `Felicitaciones! Has vendido todas las existencias de tu publicacion ${user.productsOnCart[i].title}.` ,
              date: new Date().toLocaleString("es-Pe", {
                  timeZone: "America/Lima",
                  hour12: false,
                  weekday: "long",
                  year: "numeric",
                  month: "long",   
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
              }),
              seen: false,
              }
              idNotificationUserBefore.notif_list.push(stockNotification)
            }
            await idNotificationUserBefore.save()
          }
          
        }
      }
      // const userAddress = userFound.addresses.find(add => add.address.isDefault === true) 
      // console.log(userAddress)
      console.log("estoy en el default")
      console.log(userFound.addresses)
      const addressId = await Address.findOne({ user: userFound._id })
      console.log(addressId)
      // console.log(userFound.addresses.map(i => i.isDefault === true))
      //console.log(userFound.addresses.address.map(i => i))
      const isDefault = userFound.addresses && addressId.address.find(i => i.isDefault === true)
      console.log(isDefault)
      // if(!userAddress){
      //   return res.json({ message: "Necesitas tener una direccion."})
      // }
      const newOrder = new Order({
        products: user.productsOnCart,
        user: user._id,
        payment_date: new Date().getTime(),
        delivery_date: new Date().getTime() + 24 * 60 * 60 * 1000, // 10 segundos después del pago  
        flash_shipping: true,
        shipping_address: isDefault,
      })
      console.log("neworder")
      console.log(newOrder)
      const orderNotification = {
            title: "¡Tu pedido fue entregado!",
            description: "Tu orden ha sido entregada. ¡Esperamos que disfrutes de tu nuevo producto! No olvides que ahora puedes crear una reseña del producto.",
            date: new Date().toLocaleString("es-Pe", {
                timeZone: "America/Lima",
                hour12: false,
            }),
            seen: false,
      }
      const idNotificationUser = await Notification.findOne({ user: userFound._id})
      console.log(idNotificationUser)
      console.log(orderNotification) 
      console.log(userFound)
      userFound.orders.push(newOrder)
      // userFound.notifications[0].notif_list.concat(Notification)
      idNotificationUser.notif_list.push(orderNotification)
      console.log("pásaaa")
      userFound.productsOnCart = []
      await newOrder.save()
      await idNotificationUser.save()
      await userFound.save()
      return res.json({ products: product, message: 'Order successfully processed', orders: newOrder, notifications: idNotificationUser});
    }
    const newOrder = await Order.find({ user: user._id })

    // notificacion de entrega


    
    // console.log("llego la orden")  
    // console.log(user.orders)
    // user.productsOnCart = []
    // await user.save()
    // console.log(user)

    return res.json({ products: product, message: 'Order successfully processed', orders: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//router.put('/checkout-success', userExtractor, updateProductsHere)
// router.put('/cancelito', userExtractor, cancelando)
// Endpoint de cancelación
// router.put('/cancelito', (req, res) => {
//   console.log("tongo")
//   console.log("estamos bien")
//   return res.json({ message: 'Payment canceled' });
// });

// router.put('/cancelito', (req, res) => {
//   console.log("estamos bien")
//   res.send('Payment canceled');
// });

export default router
