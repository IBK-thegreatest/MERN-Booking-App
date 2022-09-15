import User from "../models/User.js"

//UPDATING USER CONTENT
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
        )
        res.status(200).json("User has been Updated")
    } catch (err) {
        return next(err)
    }
}

//DELETING USER CONTENT
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been Deleted")
    } catch (err) {
        next(err)
    }
}

//GET USER CONTENT
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

//GET  ALL CONTENTS
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}