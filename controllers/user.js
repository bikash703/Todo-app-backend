import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import { sendCookie } from "../utilies/features.js";

export const getAllUser = async (req, res) => { }

export const register = async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) res.status(404).json({
        success: false,
        message: "Already have an account"
    })

    const hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({ name, email, password: hashedPassword })

    sendCookie(user, res, 201, "Register successfull")
}

export const login = async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email }).select("+password")

    if(!user)
    return next(new ErrorHandler("Invalid email or password",404))

    const ismatch = await bcrypt.compare(password, user.password)

if(!user)
    return next(new ErrorHandler("Invalid email or password",404))

    sendCookie(user, res, 200, `Welcome back ${user.name}`)
}

export const getMyProfile = (req, res) => {
    
    res.status(200).json({
        success: true,
        user:req.user
    })

}

export const logout = (req, res) => {
    
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV == "Development"? "lax" : "none",
        secure:process.env.NODE_ENV == "Development"? false : true
    }).json({
        success: true,
        message:"Logout Successfully"
    })

}