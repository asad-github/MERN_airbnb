const mongoose=require('mongoose')

const hotel_schema=mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    hotel_name:{
        type:String,
        required:[true,'please provide Hotel Name'],
        maxlength:[100,'max length is 100'],
        trim:true
    },
    address:{
        type:String,
        required:[true,'please provide address'],
        maxlength:[100,'max length is 100'],
        trim:true
    },
    city:{
        type:String,
        required:[true,'please provide city name']
    },
    photos: [],
    description: String,
    perks: [],
    extraInfo: String,
    check_in: String,
    check_out: String,
    maxGuests: Number,
    price: Number
})

module.exports=mongoose.model('Hotels',hotel_schema)