const express=require('express')
const Router=express.Router()

const {add_place,photo_upload_link,get_user_places,get_single_place, get_all_places}=require('../controllers/places_methods')

Router.route('/').get(get_all_places)
Router.route('/new').post(add_place)
Router.route('/upload-link').post(photo_upload_link)
Router.route('/userplaces').get(get_user_places)
Router.route('/userplaces/:id').get(get_single_place)
module.exports=Router