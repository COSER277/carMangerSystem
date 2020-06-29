//超级管理员控制操作器
const AdminModel = require("../models/admin")
class Super {
    constructor() {}
    //=====================================管理普通管理员
    //列表
    async getAdminList(req, res, next) {
        if (!req.sup) {
            //Auth 中间件经过token验证之后传过来的sup对象 加重验证
            res.send({
                code: -1,
                msg: "当前对象无权请求"
            })
            return;
        }
        try {
            // const options=req.options
            const admins = await AdminModel.find()
            //后期加分页
            res.send({
                code: 0,
                msg: "ok",
                data: admins //测试使用
            })
        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //获取某一
    async getOneAdmin(req, res, next) {
        if (!req.sup) {
            res.send({
                code: -1,
                msg: "当前对象无权请求"
            })
            return;
        }
        const request = req.params
        if (!request.id) {
            res.send({
                code: 1,
                msg: "参数错误"
            })
        }
        const admin = await AdminModel.findById(request.id)
        if (!admin) {
            res.send({
                code: 1,
                msg: "对象错误"
            })
        }
        try {
            res.send({
                code: 0,
                msg: "ok",
                data: admin //测试使用
            })
        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //修改
    async updateOneAdmin(req, res, next) {
        if (!req.sup) {
            res.send({
                code: -1,
                msg: "当前对象无权请求"
            })
            return;
        }
        if (!req.body) {
            res.send({
                code: -1,
                msg: "参数为空"
            })
            return;
        }
        try {
            const admin = await AdminModel.findByIdAndUpdate(req.body._id, req.body)
            res.send({
                code: 0,
                msg: "success",
                data: admin //测试使用
            })

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    // 修改状态 /admin/update/status/:id/:code'
    async updateOneAdminStatus(req, res, next) {
        if (!req.sup) {
            res.send({
                code: -1,
                msg: "当前对象无权请求"
            })
            return;
        }
        const request = req.params
        if (!request.id) {
            res.send({
                code: 1,
                msg: "参数错误"
            })
        }
        if (!request.code || request.code != 0 || request != 1) {
            res.send({
                code: 1,
                msg: "参数错误"
            })
        }

        try {
            const admin = await AdminModel.findByIdAndUpdate(request.id, {
                status: request.code
            })
            res.send({
                code: 0,
                msg: "ok",
                data: admin //测试使用
            })
        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //增加
    async createOneAdmin(req, res, next) {
        if (!req.sup) {
            res.send({
                code: -1,
                msg: "当前对象无权请求"
            })
            return;
        }
        const request = req.body
        if (!request.username) {
            res.send({
                code: 1,
                msg: "用户名不能为空"
            })
        }
        if (!request.password) {
            res.send({
                code: 1,
                msg: "密码不能为空"
            })
        }
        try {
            const admin = await AdminModel.create(request)
            res.send({
                code: 0,
                msg: "ok",
                data: admin //测试使用
            })
        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }

}

module.exports = new Super();