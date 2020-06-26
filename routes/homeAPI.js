/**
 * Created by angus on 2017-1-25.
 */
var express = require('express');
var router = express.Router();
var https = require('https');

//统一返回格式
var responseData;

router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
        data: null
    }
    next();
} );

router.get('/', function(req, res, next) {
    if(req.session.user) {
        res.redirect('/platform');
        return;
    };
    var db = req.app.get('mysql');
    db.query("select * from `users`",function(err, results, fields){
        if(err) {
            res.render('500');
            return;
        }
        res.render('home',{
            'list': results
        });
    })
});

//注册
router.post('/api/user/register', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.repassword;
    var db = req.app.get('mysql');
    //用户是否为空
    if ( username == '' ) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }

    if  (password !== password2) {
        responseData.code = 2;
        responseData.message = '二次密码不一致';
        res.json(responseData);
        return;
    }
    db.query("select * from `users` where uname = ?",[username],function(err, results, fields){
        if(err) {
            responseData.code = 3;
            responseData.message = err;
            res.json(responseData);
            return;
        } else {
            if(results.length > 0) {
                responseData.code = 1;
                responseData.message = '当前用户已经存在';
                res.json(responseData);
                return;
            } else {
                db.query("insert into users set ?",{
                    uname: username,
                    upwd: password
                },function(err, results, fields){
                    if(err) {
                        responseData.code = 2;
                        responseData.message = err;
                        res.json(responseData);
                        return;
                    } else {
                        responseData.code = 0;
                        responseData.message = '注册成功';
                        res.json(responseData);
                        return;
                    }
                })
            }
        }

    });
});

//登录
router.post('/api/user/login', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var db = req.app.get('mysql');
    //用户是否为空
    if ( username == '' ) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(req.session.user) {
        responseData.code = 3;
        responseData.message ="你已经登录了";
        res.json(responseData);
        return;
    }
    db.query("select * from `users` where uname = ? and upwd = ?",[username, password],function(err, results, fields){
        if(err) {
            res.render('500');
            return;
        } else {
            if(results.length > 0) {
                req.session.user = {
                    id: results[0].uid,
                    uname: results[0].uname,
                    admin: results[0].admin
                }
                responseData.code = 0;
                responseData.message = '登录成功';
                res.json(responseData);
                return;
            } else {
                responseData.code = 1;
                responseData.message = '用户名或密码不正确';
                res.json(responseData);
                return;
            }
        }

    });
});

//登出
router.post('/api/user/logout', function(req, res, next) {
    if(req.session.user) {
        // req.session.user = null;
        req.session.destroy(function(err) {
            console.log(err);
        });
        responseData.code = 0;
        responseData.message ="你已经登出";
        res.json(responseData);
        return;
    }
});

module.exports = router;


