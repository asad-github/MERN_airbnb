const mongoose=require('mongoose')

const users=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide username'],
        maxlength:[30,'max length is 30'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'please provide email'],
        trim:true,
        unique:[true,'email is already registered']
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        trim:true
    }
})
module.exports=mongoose.model('users',users)    