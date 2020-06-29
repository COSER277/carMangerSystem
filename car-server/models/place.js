//车辆
const mongoose=require("mongoose")
const Schema=mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:"临时车位"
    },
    status:{
        type:Number,
        default:0  //0 为空闲
    },
    carID:{
        type:String
    }
})


const Place = mongoose.model("Place", Schema)
module.exports = Place