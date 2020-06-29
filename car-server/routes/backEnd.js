/*
后台 超级管理员接口模块
app:外传app实例
*/
module.exports = (app) => {
    const AuthSuper = require("../controller/auth.super") //验证超级管理员
    const AuthAdmin = require("../controller/auth.admin") //验证普通管理员
    const express = require("express")
    const SuperRouter = express.Router()
    const CommonRouter = express.Router()
    //================================
    const superController = require("../controller/sup.js")
    const adminController = require("../controller/admin.js")
    //=============================================================超级管理员专属接口
    //相当于 http://localhost:3333/api/back/super/admin/list
    SuperRouter.get('/admin/list', superController.getAdminList)
    SuperRouter.post('/admin/item/:id', superController.getOneAdmin)
    SuperRouter.post('/admin/update', superController.updateOneAdmin)
    SuperRouter.post('/admin/update/status/:id/:code', superController.updateOneAdminStatus)
    SuperRouter.post('/admin/create', superController.createOneAdmin)

    //===============================
    //鉴权-后台接口需要登录后才可访问接口
    //中间价使用顺序 ==>
    // Auth(app):传入app实例 
    app.use("/api/back/super", AuthSuper(app), SuperRouter)
    //===================================================================普通与超级共同接口 控制器方法交给admin
    //   相当于 http://localhost:3333/api/back/common/car/list
    //车辆
    CommonRouter.get('/car/list', adminController.getCarList)
    CommonRouter.post('/car/item/:id', adminController.getOneCar)
    CommonRouter.post('/car/update', adminController.updateOneCar)
    CommonRouter.post('/car/update/status/:id/:code', adminController.updateOneCarStatus)
    CommonRouter.post('/car/create', adminController.addOneCar)
    //车位
    CommonRouter.get('/place/list', adminController.getPlaceList)
    CommonRouter.post('/place/item/:id', adminController.getOnePlace)
    CommonRouter.post('/place/update', adminController.updateOnePlace)
    CommonRouter.post('/place/update/status/:id/:code', adminController.updateOnePlaceStatus)
    CommonRouter.post('/place/create', adminController.addOnePlace)
    app.use("/api/back/common", AuthAdmin(app), CommonRouter)

    //==================app错误处理=======================//
    app.use(async (err, req, res, next) => {
        console.log(req)
        if (err) {
            res.status(err.status || 500).send({
                msg: err.message
            })
        }
    })
    //======================================超级管理员登录
    const SuperModel = require("../models/super")
    const jwt = require('jsonwebtoken')
    //相当于 http://localhost:3333/api/super/login
    app.post('/super/login', async (req, res, next) => {
        const reqBody = req.body
        if (!reqBody) {
            return res.status(502).send({
                code: 1,
                msg: "参数不能空"
            })
        }
        if (!reqBody.username) {
            res.status(502).send({
                code: 1,
                msg: "请输入用户名"
            })
            return
        }
        if (!reqBody.password) {
            res.status(502).send({
                code: 1,
                msg: "请输入密码"
            })
            return
        }
        //后期加验证码
        const sup = await SuperModel.findOne({
            username: reqBody.username
        }).select('+password') //拿出密码的序列值 因为默认查询时不可查的
        //1 
        if (!sup) {
            return res.status(502).send({
                code: 1,
                msg: "对象不存在"
            })
        }
        //2 验证
        const isValid = require("bcryptjs").compareSync(password, sup.password)
        //const isValid = password == sup.password ? true : false;
        if (!isValid) {
            return res.status(422).send({
                msg: "密码错误"
            })
        }
        //3res 给token 
        const token = jwt.sign({
            aid: sup._id
        }, app.get('secret'))
        res.status(200).send({
            code: '0',
            msg: '登录成功',
            token
        })
    })

    //============================================普通管理员登录
    const AdminModel = require("../models/admin")
    //相当于 http://localhost:3333/api/admin/login
    app.post('/admin/login', async (req, res, next) => {
        const reqBody = req.body
        if (!reqBody) {
            return res.status(502).send({
                code: 1,
                msg: "参数不能空"
            })
        }
        if (!reqBody.username) {
            return res.status(502).send({
                code: 1,
                msg: "请输入用户名"
            })
        }
        if (!reqBody.password) {
            return res.status(502).send({
                code: 1,
                msg: "请输入密码"
            })
        }
        //后期加验证码
        const admin = await AdminModel.findOne({
            username: reqBody.username
        })
        //1 
        if (!admin) {
            return res.status(502).send({
                code: 1,
                msg: "对象不存在"
            })
        }
        //2 验证
        const isValid = require("bcryptjs").compareSync(password, admin.password)
        //const isValid = password == admin.password ? true : false;
        if (!isValid) {
            return res.status(422).send({
                msg: "密码错误"
            })
        }
        //3res 给token 
        const token = jwt.sign({
            aid: admin._id
        }, app.get('secret'))
        res.status(200).send({
            code: '0',
            msg: '登录成功',
            token
        })
    })


}