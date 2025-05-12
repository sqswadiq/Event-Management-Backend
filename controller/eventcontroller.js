const events = require('../model/eventModel')

exports.addeventController = async (req, res) => {
    console.log("inside addeventController");
    const { eventname, place, date, time, price } = req.body
    const eventimage = req.file.filename
    try {
        const newEvents = new events({ eventname, place, date, time, price, eventimage })
        await newEvents.save()
        res.status(200).json(newEvents)

    }
    catch (err) {
        res.status(401).json(err)
    }

}
exports.getEventController = async (req, res) => {
    console.log("inside getEventController");

    try {
        const allEvents = await events.find()
        console.log(allEvents);
        res.status(200).json(allEvents)

    } catch (error) {
        res.status(401).json(error)
    }

}
exports.deleteEventController = async (req, res) => {
    console.log("inside deleteEventController");

    const { id } = req.params
    try {

        const deletedEvent = await events.findByIdAndDelete({ _id: id })
        res.status(200).json(deletedEvent)

    } catch (error) {
        res.status(401).json(error)
    }

}
exports.editEventController = async (req, res) => {
    console.log("inside editEventController");

    const { id } = req.params;
    const { eventname, place, date, time, price, eventimage } = req.body;

    try {
        const updatedEvent = await events.findByIdAndUpdate(
            id,
            {
                eventname,
                place,
                date,
                time,
                price,
                eventimage
            },
            { new: true } // to return the updated document
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json(error);
    }
};
