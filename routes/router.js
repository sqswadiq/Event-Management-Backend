const express=require('express')
const multerMiddileware=require('../multer/multer')
const eventController=require('../controller/eventcontroller')
const router= new express.Router()
const userController=require('../controller/userController')
const jwtMiddleware=require('../middilewares/JwtMiddileware')
const wishlistController=require('../controller/wishlistController')
const cartController=require('../controller/cartController')
const paymentController=require('../controller/paymentController')
const bookingController=require('../controller/bookinController')


router.post('/addevents',multerMiddileware.single("eventimage"),eventController.addeventController)
router.get('/getevents',eventController.getEventController)
router.delete('/deleteevents/:id',eventController.deleteEventController)
router.put('/editevent/:id',eventController.editEventController)


router.post('/register',userController.addUserController)
router.post('/login',userController.loginUserController)

// get user
router.get('/userDetails/:userId', userController.getUserController);
// update user
router.put('/updateUser/:userId', userController.updateUserController);
// get all users
router.get('/allUserDetails', userController.getAllUserController);
// delete User
router.delete('/deleteUser/:userId',userController.deleteUserController)
// change password
router.put('/changepassword',userController.changePasswordController)

// add wishlist
router.post('/addwishlist',wishlistController.addWishlistController)

// get wishlist items by userId
router.get('/getwishlist/:userId', wishlistController.getUserWishlist);

// delete wishlist item
router.delete('/deleteWishlist/:wishlistId',wishlistController.deleteWishlistController)


// add to cart
router.post('/addcart',cartController.addToCartController)
// get cart item
router.get('/getcart/:userId',cartController.getCartController)
// delete Cart
router.delete('/removecart/:id',cartController.deleteCartController)
// update cart count
router.put('/updatecartcount/:id',cartController.updateQuantityController)

// Create Razorpay Order
router.post("/order", paymentController.createOrder);
// Validate Razorpay Payment
router.post("/order/validate", paymentController.validatePayment);
// clear cart 
router.delete("/clearcart/:userId", cartController.clearCartController);

// add a new booking
router.post('/book-event', bookingController.addBookingController);
// get user booking
router.get('/userbookings/:userId',bookingController.getUserBookingController)
// get Alluser booking
router.get('/allbookings',bookingController.getAllBookingController)
// delete bookings
router.delete('/deletbooking/:id', bookingController.deleteBookingController);

// add payment Details
router.post('/addpayment', paymentController.addPaymentDetails);
// add payment Details
router.get('/getpayments', paymentController.getPaymentDetails);
// delete payment Details
router.delete('/deletepayments/:id', paymentController.deletePaymentDetails);


module.exports=router