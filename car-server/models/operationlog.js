//车辆
const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    operatorID: {
        type: String,
        default: ""
    },
    operation: {
        type: String,
        default: ""
    },
    time: {
        type: new Date()
    }
})


const OperationLog = mongoose.model("OperationLog", Schema)
module.exports = OperationLog