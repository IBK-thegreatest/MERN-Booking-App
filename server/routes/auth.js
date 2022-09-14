import express from "express"
import { login, register } from "../controllers/authControllers.js";
const router = express.Router();

//REGISTER A NEW USER
router.post("/register", register);

//LOGIN TO AN EXISTING USER
router.post("/login", login)


export default router;