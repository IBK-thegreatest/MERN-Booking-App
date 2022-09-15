import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//REGISTER CONTROLLER
export const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: hash
            }
        );
        const savedUser = await newUser.save()
        res.status(200).json("User has been Created")
    } catch (err) {
        next (err)
    }
}

//LOGIN CONTROLLER
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(401, "Wrong password or Username"))

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" })
        res.status(200).json({ id: user._id, isAdmin: user.isAdmin, accessToken})
    } catch (err) {
        next(err)
    }
}