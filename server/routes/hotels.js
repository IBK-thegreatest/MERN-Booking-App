import express from "express"
import Hotel from "../models/Hotel.js"
const router = express.Router();

//CREATE A NEW HOTEL
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel  = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE EXISTING HOTEL
router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET A PARTICULAR HOTEL DATA


//GET ALL HOTEL DATA

export default router;