const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const APPCONFIG = require("./config/app.config")


//===================app设置区========================//
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())
//数据库挂载
require("./database/mongodb")(app)
//路由api
require("./routes/backEnd")(app)


//密钥
app.set("SECRET", "dragonhub1234567890zxcvbnmasdfghjklqwertyuiop")


//====================开启服务========================//
app.use('/', (req, res, next) => {
    res.send({
        code: 0,
        msg: "后端服务正在服务中..."
    })
})
app.listen(APPCONFIG.development.PORT, () => {
    console.log(`http://${APPCONFIG.development.HOST}:${APPCONFIG.development.PORT}/`)
})