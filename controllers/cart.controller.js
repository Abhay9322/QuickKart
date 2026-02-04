const Cart = require("../models/cart.model")

const addToCart = async (req, res) => {

    console.log("Inside AddToCart functionlity");

    try {

        const userId = req.params.id;

        console.log("userId is:", userId);



        if (!userId) {
            return res.status(400).json({ message: "User not found" })
        }

        const { quantity, product1 } = req.body;

        const cart = await Cart.find({ userId })

        console.log("Cart data :", cart);


        if (!cart) {
            const data = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }]
            })
        }

        const product = await Cart.find(items.product === productId)

        if (!product) {
            return res.status(400).json({ message: "ProductId is Invalid" })
        }

        items.quantity = items.quantity + 1;

        return res.status(200).json({ message: "Product added to cart successfully", cart })

    } catch (error) {
        console.log("Error while adding product to cart:", error);

        return res.status(500).json({ message: "Internal Server while adding product to cart", error })
    }
}

module.exports = { addToCart }