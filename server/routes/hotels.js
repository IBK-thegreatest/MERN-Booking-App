import express from "express"
import { createHotel, 
    deleteHotel, 
    getHotel, 
    getHotels, 
    updateHotel } 
    from "../controllers/hotelControllers.js";
const router = express.Router();

//CREATE A NEW HOTEL
router.post("/", createHotel);

//UPDATE EXISTING HOTEL
router.put("/:id", updateHotel);

//DELETE HOTEL DATA
router.delete("/:id", deleteHotel);

//GET A PARTICULAR HOTEL DATA
router.get("/:id", getHotel);


//GET ALL HOTEL DATA
router.get("/", getHotels);

export default router;