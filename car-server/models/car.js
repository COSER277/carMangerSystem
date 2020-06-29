//车辆
const mongoose=require("mongoose")
const Schema=mongoose.Schema({
    carNo:{
        type:String,
        default:""
    },
    inTime:{
        type:Date,
        default:new Date()
    },
    outTime:{
        type:Date,
        dafault:null
    }, 
    free:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    },
    placeID:{
        type:String
    }
})


const Car = mongoose.model("Car", Schema)
module.exports = Car