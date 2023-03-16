const mongoose = require('mongoose')

const bookingScheme = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Hotels' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    guests:{type:String,required:true},
    price: Number,
})

module.exports=mongoose.model('bookings',bookingScheme)