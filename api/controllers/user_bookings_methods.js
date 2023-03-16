const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const model = require('../models/user_model')
const booking_model=require('../models/bookings')
const { populate } = require('../models/user_model')
const jwtsecret = 'thisisjwtsecret'

const new_user = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const checkuser = await model.findOne({ email: email })
        if (checkuser) {
            return res.status(400).json({ message: 'user already exists' })
        }
        const salt = bcrypt.genSaltSync(10)
        const hashpwd = bcrypt.hashSync(password, salt)
        const new_user = await model.create({
            username,
            email,
            password: hashpwd
        })
        res.status(200).json(new_user)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await model.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtsecret, {}, (err, token) => {
                if (err) throw err;
                res.json({userDoc,token});
            });
        } else {
            res.status(422).json('password not ok');
        }
    } else {
        res.json('not found');
    }
}

const profile =(req, res) => {
    const token  = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtsecret, {}, async (err, userData) => {
            if (err) throw err;
            const { username, email, _id } = await model.findById(userData.id);
            res.json({ username, email, _id });
        });
    } else {
        res.json(null);
    }
}
const logout =(req,res)=>{
    res.cookie('token','').json(true)
}
const get_user = async (req, res) => {
    try {
        const users = await model.find({})
        res.status(200).json({ users })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const new_booking=(req,res)=>{
    try {
        const  token  = req.headers.authorization
        const {name,price,phone,checkin,checkout,place,guests}=req.body
        if (token){
            jwt.verify(token,jwtsecret,{},async(err,data)=>{
                if(err) throw err;
                const booking=await booking_model.create({
                    user:data.id,
                    name,price,phone,
                    checkIn:checkin,
                    checkOut:checkout,
                    place,guests
                })
                res.json(booking)
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const get_all_bookings=(req,res)=>{
    try {
        const token=req.headers.authorization
        if (token){
            jwt.verify(token,jwtsecret,{},async(err,data)=>{
                if(err) throw err;
                const all_bookings=await booking_model.find({user:data.id}).populate('place')
                res.json(all_bookings)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { new_user, get_user, login, profile,logout,new_booking,get_all_bookings }