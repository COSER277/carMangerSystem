//普通管理员
const mongoose=require("mongoose")
const Schema=mongoose.Schema({
    username:{
        type:String,
        default:""
    },
    password:{
        type:String,
        default:"123"
    },
    avatar:{
        type:String,
        dafault:"/default.png"
    }, 
    level:{
        type:Number,
        default:0
    },
    status:{
        type:String,default:0 //0 为允许操作 1为禁用
    }
})


const Admin = mongoose.model("Admin", Schema)
module.exports = Admin