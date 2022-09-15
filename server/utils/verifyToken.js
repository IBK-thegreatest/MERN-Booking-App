import jwt from "jsonwebtoken"
import { createError } from "./error.js"

//VERIFYING THE TOKEN
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, user) => {
                if (err) return next(createError(403,"Your Token is Invalid"))
                req.user = user
                next();
            }
        )    
    } else {
        return next(createError(401,"You are not authorized"));
    }
}

//VERIFYING THE IDENTITY OF A USER BY AFTER ASSSIGNING A TOKEN
export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not Authorized to do this"))
        }
    });
}

//VERIFYING IF THE USER IS AN ADMINISTRATOR OR NOT
export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not Authorized to do this"))
        }
    });
}