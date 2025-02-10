import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
// import { cancelando, updateProductsHere } from "../controllers/stripeController.js";
import { userExtractor } from "../middleware/authMiddleware.js";
import Order from "../models/orderModel.js";
import Sales from "../models/salesModel.js";

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
    //success_url: `https://ecommercerq.netlify.app/success`,
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
    // if(item.id){
    //   console.log("primer holita")
    //   const productFound = await Product.find(item.id)
    //   if(productFound.user){
    //     console.log("aca esta el usuario del sales")
    //     console.log(productFound.user)
    //     const userFound = await User.find(productFound.user._id)
    //     userFound.sales.push(item)
    //   }
    // }
    if (!user.productsOnCart) {
      return res.status(404).send('Order not found');
    }
    console.log("si existen")
    // // Actualiza el stock y vacía el carrito
    for (const item of user.productsOnCart) {
      console.log("entro al for")
      console.log(item.id)
      if(item.id){
        console.log("primer holita")
        const productFound = await Product.findById(item.id)
        if(productFound.user){
          console.log("aca esta el usuario del sales")
          console.log(productFound.user)
          const userFound = await User.findById(productFound.user._id)
          //userFound.sales.push(item)
          const salesUser = await Sales.findOne({
            user: userFound._id,
          })
          if(!salesUser){
            console.log("entro aca solo 1")
            const createSales = new Sales({
              products: [],
              user: userFound._id,
            })
            createSales.products.push(item)
            userFound.sales = createSales._id
            console.log(userFound)
            await userFound.save()
            await createSales.save()
          }else{
            console.log("entra aca en el sales")
            console.log(userFound)
            salesUser.products.push(item)
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
        console.log("aca no")
        await product.save();
        console.log("llegamos al pro")
        console.log(product)
        console.log("si entra aca esto esta bien")
      }
    }
    
    //console.log(product)

    const order = await Order.find()
    console.log(order)
    if(!order){
      const userFound = await User.findById(user._id)
      //const isDefault = userFound.addresses.find(item => item.isDefault === true)
      const newOrder = new Order({
        products: user.productsOnCart,
        user: user._id,
        
      })
      userFound.orders = newOrder
      userFound.productsOnCart = []
      await newOrder.save()
      await userFound.save()
    }else{
      const userFound = await User.findById(user._id)
      //const isDefault = userFound.addresses.find(item => item.isDefault === true)
      const newOrder = new Order({
        products: user.productsOnCart,
        user: user._id,
        
      })
      userFound.orders.push(newOrder)
      userFound.productsOnCart = []
      await newOrder.save()
      await userFound.save()
    }
    const newOrder = await Order.find({ user: user._id })
    
    // console.log("llego la orden")  
    // console.log(user.orders)
    // user.productsOnCart = []
    // await user.save()
    // console.log(user)

    return res.json({ products: product, message: 'Order successfully processed', orders: newOrder});
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
