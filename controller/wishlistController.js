const wishlists=require('../model/wishlistModel')


// add to wishlist
exports.addWishlistController=async(req,res)=>{

    try {
        const {userId,eventId}=req.body
        const existing = await wishlists.findOne({ userId, eventId });

    if (existing) {
    return res.status(400).json({ message: 'Event already in wishlist' });
    }

        const newWishlist= new wishlists({userId,eventId})
        await newWishlist.save()
        res.status(200).json("Event Added to wishlist")
    } catch (error) {
        res.status(401).json(error)
    }
}

// get wishlist
exports.getUserWishlist = async (req, res) => {
    const { userId } = req.params

    try {
        const wishlistItems = await wishlists.find({ userId }).populate("eventId");
        res.status(200).json(wishlistItems);

    } 
    catch (error) {
        res.status(401).json(error,"Failed to fetch wishlist");
    }
}
// deltete wishlist item

exports.deleteWishlistController = async (req, res) => {
    const { wishlistId } = req.params

    try {
        console.log("Deleting wishlist with ID:", wishlistId); // For debugging

        const deleted = await wishlists.findByIdAndDelete(wishlistId);

        if (!deleted) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        res.status(200).json({ message: 'Event removed from wishlist successfully', deleted });
    } catch (error) {
        console.error("Delete wishlist error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
