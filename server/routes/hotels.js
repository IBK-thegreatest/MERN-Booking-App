import express from "express"
import { createHotel, 
    deleteHotel, 
    getHotel, 
    getHotels, 
    updateHotel } 
    from "../controllers/hotelControllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE A NEW HOTEL
router.post("/", verifyAdmin, createHotel);

//UPDATE EXISTING HOTEL
router.put("/:id", verifyAdmin, updateHotel);

//DELETE HOTEL DATA
router.delete("/:id", verifyAdmin, deleteHotel);

//GET A PARTICULAR HOTEL DATA
router.get("/:id", getHotel);


//GET ALL HOTEL DATA
router.get("/", getHotels);

export default router;