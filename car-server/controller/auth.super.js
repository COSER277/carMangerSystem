module.exports = option => {
    //验证超级管理员 
    return async (req, res, next) => {
        const SuperModel = require("../models/super")
        const jwt = require('jsonwebtoken')
        const token = String(req.headers.authorization || '').split(' ').pop(); //1拿去前端请求头的token
        if (!token) {
            res.status(401).send({
                code: -1,
                msg: 'token参数错误，无权访问'
            })
            return;
        }
        const tokenData = jwt.verify(token, option.get("SECRET")) //把app 加到req 给到下一控制器 Auth(app)
        if (!tokenData) {
            res.status(401).send({
                code: -1,
                msg: '无效Token'
            })
            return;
        }
        const id = tokenData.aid; //2拿到加密的 （aid )
        if (!id) {
            res.status(401).send({
                code: -1,
                msg: '请先登录'
            })
            return;
        }
        //3根据 aid 查询  
        const sup = await SuperModel.findById(id)
        //4 拦截报错
        if (!sup) {
            res.status(401).send({
                code: -1,
                msg: '不存在对象'
            })
        }
        else {
            // sup 给 下一个控制器 
            req.sup = sup;
            await next();
        }

    }
}