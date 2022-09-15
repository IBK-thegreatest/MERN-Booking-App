import express from "express"
import {
    verifyAdmin
} from "../utils/verifyToken.js"
import {
    createRoom,
    deleteRoom, 
    getRoom, 
    getRooms, 
    updateRoom
} from "../controllers/roomControllers.js";
const router = express.Router();


//CREATE A ROOM
router.post("/:hotelId", verifyAdmin, createRoom)


//UPDATE EXISTING ROOM DATA
router.put("/:id/:hotelId", verifyAdmin, updateRoom);


//DELETE ROOM DATA
router.delete("/:id", verifyAdmin, deleteRoom);


//GET A PARTICULAR ROOM DATA
router.get("/:id", getRoom);


//GET ALL ROOM DATA
router.get("/", getRooms);


export default router;