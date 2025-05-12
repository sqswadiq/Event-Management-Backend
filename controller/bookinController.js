const bookings = require('../model/bookingModel')
const users = require('../model/userModel')
exports.addBookingController = async (req, res) => {
    try {
        let bookingsData = req.body; // assuming this is an array of bookings (one per event in cart)

        if (!Array.isArray(bookingsData)) {
            bookingsData = [bookingsData];
        }
        const bookingPromises = bookingsData.map(async (item) => {
            const {
                userId,
                eventId,
                eventName,
                eventDate,
                eventTime,
                eventPlace
            } = item;

            const user = await users.findById(userId)

            const ticketNo = `TKT-${Math.floor(100 + Math.random() * 900)}`;

            const newBooking = new bookings({
                userId,
                userName: user?.userName,
                eventId,
                eventName,
                eventDate,
                eventTime,
                eventPlace,
                ticketNo
            });

            await newBooking.save();
            return newBooking;
        });

        const createdBookings = await Promise.all(bookingPromises);

        res.status(201).json({
            message: "Bookings confirmed",
            bookings: createdBookings
        });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: "Error while booking event" });
    }
};

exports.getUserBookingController = async (req, res) => {
    console.log("inside getUserBookingController");
    try {
        const { userId } = req.params;

        const userBookings = await bookings.find({ userId })

        res.status(200).json(userBookings)

    } catch (error) {
        res.status(500).json(error)
    }

}
exports.getAllBookingController = async (req, res) => {
    console.log("inside getAllBookingController");

    try {
        const allBookings = await bookings.find()
        res.status(200).json(allBookings)
    } catch (error) {
        res.status(500).json(error)
    }

}
exports.deleteBookingController = async (req, res) => {
    console.log("inside deleteBookingController");

    const { id } = req.params;
    try {
        const deletedBooking = await bookings.findByIdAndDelete(id)
        res.status(200).json(deletedBooking)
    } catch (error) {
        res.status(500).json(error)
    }

}
