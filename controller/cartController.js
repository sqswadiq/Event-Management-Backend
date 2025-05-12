const carts=require('../model/cartModel');
const users = require('../model/userModel');

// add to cart 
exports.addToCartController=async(req,res)=>{
    console.log("inside addToCartController");

    const {userId,eventId,eventname,price,date,time,place,eventimage}=req.body
    try {
        // Check if item already exists in cart for this user and event
        const existingItem = await carts.findOne({ userId, eventId });

        if (existingItem) {
            // Increment count if already in cart
            existingItem.count += 1;
            await existingItem.save();
            return res.status(201).json(existingItem);
        } else {
            // Create new cart item
            const newItem = new carts({
                userId,
                eventId,
                eventname,
                price,
                date,
                time,
                place,
                eventimage,
                count: 1
            });

            await newItem.save();
            return res.status(200).json(newItem);
        }

    } 
    catch (error) {
        res.status(401).json(error)
    }
    
}

// get cart item
exports.getCartController = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await carts.find({ userId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

// Delete cart item by ID
exports.deleteCartController = async (req, res) => {
    const { id } = req.params;

    try {
        const removedItem = await carts.findByIdAndDelete(id);
        if (removedItem) {
            res.status(200).json(removedItem );
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(401).json(error);
    }
};

// update cart count
exports.updateQuantityController=async(req,res)=>{
    const { id } = req.params; // cart item _id
    const { action } = req.body; // 'increment' or 'decrement'

    try {
        const cartItem=await carts.findById(id)

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }


        if (action=="increment") {
            cartItem.count+=1
            await cartItem.save()
            return res.status(200).json(cartItem)
        } 
        else if(action=="decrement") {

            if (cartItem.count>1) {
                cartItem.count-=1
                await cartItem.save();
                return res.status(200).json(cartItem);
            } 
            else {
                // Count is 1, and user wants to decrement => delete the item
                await carts.findByIdAndDelete(id);
                return res.status(200).json({ message: "Item removed from cart" });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid action" });
        }
    } catch (error) {
        res.status(401).json(error)
    }
} 

// Clear cart after checkout
exports.clearCartController = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Attempt to delete all items from the cart for this user
        const result = await carts.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No items found in the cart to clear" });
        }

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Failed to clear cart", error });
    }
};

