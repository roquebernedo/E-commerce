import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
// import { cancelando, updateProductsHere } from "../controllers/stripeController.js";
import { userExtractor } from "../middleware/authMiddleware.js";

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
    success_url: `https://ecommercerq.netlify.app/success`,
    //success_url: `http://localhost:3000/success`,
    cancel_url: `${process.env.CLIENT_URL}/api/stripe/cart`,
  });

  return res.json(session);
});

//router.get('/checkout-success', (req, res) => res.send("success"))

router.put('/checkout-success', userExtractor, async (req, res) => {
  try {
    const user = req.user
    console.log("hola") 
    console.log(user)

    if (!user.productsOnCart) {
      return res.status(404).send('Order not found');
    }
    console.log("si existen")
    // // Actualiza el stock y vacía el carrito
    for (const item of user.productsOnCart) {
      console.log("entro al for")
      console.log(item._id.toString())
      const product = await Product.findById(item.id);
      console.log(product)
      if (product) {
        product.stock -= item.quantity; // Reduce el stock
        await product.save();
        console.log(product)
      }
    }
    const product = await Product.find({})
    console.log("este es el producto")
    console.log(product)

    user.productsOnCart = []
    await user.save()
    console.log(user)

    return res.json({ products: product, message: 'Order successfully processed'});
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
