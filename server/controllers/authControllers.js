import User from "../models/User.js";
import CryptoJS from "crypto-js";
import { createError } from "../utils/error.js";

//REGISTER CONTROLLER
export const register = async (req, res, next) => {
    try {
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.CRYPTOJS_SECRET_KEY
                ).toString()
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
        const user = User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.CRYPTOJS_SECRET_KEY
        )
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (OriginalPassword !== req.body.password) {
            return next(createError(403, "Wrong Credentials"));
        }
        const {password, isAdmin, ...others} = user._doc
        res.status(200).json(...others)
    } catch (err) {
        next(err)
    }
}