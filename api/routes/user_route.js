const express=require('express')
const Router=express.Router()

const {new_user,get_user,login, profile, logout,new_booking, get_all_bookings}=require('../controllers/user_bookings_methods')

Router.route('/').get(get_user)
Router.route('/login').post(login)
Router.route('/signup').post(new_user)
Router.route('/profile').get(profile)
Router.route('/logout').post(logout)
Router.route('/bookings').post(new_booking).get(get_all_bookings)


module.exports=Router