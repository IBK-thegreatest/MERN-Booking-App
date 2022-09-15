import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(
                hotelId,
                { $push: { rooms: savedRoom._id }}
            )
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err);
    }
}

//Controller for upadating the contents of a room
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}

//Controller for deleting the contents of a rooms
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        try {
            await Hotel.findByIdAndUpdate(
                hotelId,
                { $pull: { rooms: savedRoom._id }}
            )
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been Deleted")
    } catch (err) {
        next(err)
    }
}

//Controller for the fetching all the contents of a room
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

//Controller for fetching all the rooms in the database
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}