import express from "express"
import {
    verifyToken,
    verifyUser,
    verifyAdmin
} from "../utils/verifyToken.js"
import {
    deleteUser, 
    getUser, 
    getUsers, 
    updateUser
} from "../controllers/UserControllers.js";

const router = express.Router();


//UPDATE EXISTING User
router.put("/:id", verifyUser, updateUser);


//DELETE User DATA
router.delete("/:id", verifyUser, deleteUser);


//GET A PARTICULAR User DATA
router.get("/:id", verifyUser, getUser);


//GET ALL User DATA
router.get("/", verifyAdmin, getUsers);


export default router;