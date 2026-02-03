import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
    try {
        const productId = req.params.id;

        const userId = req.params.id;

        if (!product) {
            return res.status(400).json({ message: "Product not found" })
        }

        if (!userId) {
            return res.status(400).json({ message: "User not found" })
        }

        const { quantity } = req.body;

        const cart = await Cart.find({ userId })

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
        return res.status(500).json({ message: "Internal Server while adding product to cart", error })
    }
}

export default addToCart;