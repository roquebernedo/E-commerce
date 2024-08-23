import Product from "../models/productModel.js";

const updateProductsHere = (async (request, response) => {
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
})

const cancelando = (async (req, res) => {
    console.log("tongo")
    console.log("estamos bien")
    return res.json({ message: 'Payment canceled' });
})

export { 
    updateProductsHere,
    cancelando
}