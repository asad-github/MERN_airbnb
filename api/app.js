const express=require('express')
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const connectdb=require('./connect_db/connect_db')
const bodyParser=require('body-parser')
const user=require('./routes/user_route')
const places=require('./routes/places_route')
const multer=require('multer')
const fs=require('fs')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors({
    credentials:true,
    origin:' http://127.0.0.1:5173'
}))
app.use('/controllers/uploads', express.static(__dirname+'/controllers/uploads'))
require('dotenv').config()


// app.get('/api/v1/airbnb/places/',async(req,res)=>{
//     try {
//         const all_places=await model.find()
//         res.json(all_places)
//     } catch (error) {
//         console.log(error)
//         res.json(error)
//     }
// })

app.use('/api/v1/airbnb/users',user)
app.use('/api/v1/airbnb/places',places)

const photosMiddleware=multer({dest:__dirname+'/controllers/uploads/'})
app.post('/api/v1/airbnb/places/upload-photo',photosMiddleware.array('photos',20),(req,res)=>{
    const uploadedfiles=[]
    for (let index = 0; index < req.files.length; index++) {
        const {path,originalname,filename}=req.files[index]
        const parts=originalname.split('.')
        const ext=parts[parts.length-1]
        const newPath=path+'.'+ext
        fs.renameSync(path,newPath)
        let file=filename+'.'+ext
        uploadedfiles.push(file)
    }
    res.json(uploadedfiles)
})


const port=process.env.PORT||3000
const start=async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('app running on port 3000')
        })
    } catch (error) {
        console.log(error)
    }
}
start()