//普通管理员控制操作器、
class Admin{
    constructor(){

    }
     //==================================================管理车辆
    //列表
    async getCarList(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //获取某一
    async getOneCar(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //修改
    async updateOneCar(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    // 修改状态
    async updateOneCarStatus(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //增加
    async addOneCar(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //====================================================管理车位
    //列表
    async getPlaceList(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //获取某一
    async getOnePlace(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //修改
    async updateOnePlace(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    // 修改状态
    async updateOnePlaceStatus(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //增加
    async addOnePlace(req, res, next) {
        try {

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
}
module.exports = new Admin();