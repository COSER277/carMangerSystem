//超级管理员
const mongoose=require("mongoose")
const Schema=mongoose.Schema({
    username:{
        type:String,
        default:""
    },
    password:{
        type:String,
        default:"123456",
        select: false,//设置默认不可以查
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    avatar:{
        type:String,
        dafault:"/default.png"
    },
    level:{
        type:Number,
        default:277
    },
})


const Super = mongoose.model("Super", Schema)
module.exports = Super