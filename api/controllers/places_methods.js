const model=require('../models/hotel_model')

const imageDownloader=require('image-downloader');
const jwt = require('jsonwebtoken');
const jwtsecret = 'thisisjwtsecret'

const add_place=(req,res)=>{
    try {
        const token = req.headers.authorization;
        const {form}=req.body
        const {perks}=req.body
        const {add_photos}=req.body
        const {hotel_name,address,city,description,extraInfo,maxGuests,price,check_in,check_out}=form
        jwt.verify(token,jwtsecret,{},async(err,data)=>{
            if (err) throw err
            let owner=data.id
            const placeDoc=await model.create({
                owner:data.id,
                hotel_name,address,city,
                description,extraInfo,maxGuests,
                price,check_in,check_out,
                photos:add_photos,perks
            })
            res.json(placeDoc)
        })
    } catch (error) {
        console.log(error)
    }
}
const get_user_places=(req,res)=>{
    try {
        const token = req.headers.authorization;
        jwt.verify(token,jwtsecret,{},async (err,data)=>{
            if (err) throw err
            let user_id=data.id
            const user_places=await model.find({owner:user_id})
            res.json(user_places)
        })
    } catch (error) {
        res.json(error)
    }
}
const photo_upload_link=async(req,res)=>{
    try {
        const {link}=req.body
        const newName='photo-by-link'+Date.now()+'.jpg'
        await imageDownloader.image({
            url:link,
            dest:__dirname+'/uploads/'+newName,
        })
        res.json(newName)
    } catch (error) {
        console.log(error)
    }
}

const get_all_places=async(req,res)=>{
    try {
        const all_places=await model.find()
        res.json(all_places)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const get_single_place=async(req,res)=>{
    try {
        const {id}=req.params
        const single_place=await model.findById({_id:id})
        res.json(single_place)
    } catch (error) {
        console.log(error)
    }
}

module.exports={add_place,photo_upload_link,get_user_places,get_single_place,get_all_places}