/**
 * Created by angus on 2017-2-14.
 */
var express = require('express');
var router = express.Router();
var https = require('https');
var Authentication = require("../lib/authentication.js");

//统一返回格式
var responseData;

router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
        data: null
    }
    next();
});

router.get('/', function(req, res, next) {
    if(req.session.user) {
        res.render('software', {uname: req.session.user.uname, isActive: req.baseUrl});
    } else {
        res.redirect('/');
        return;
    }
});
//获取访问平台的终端设备使用的软件数据
router.get('/api/software/:id/:period/:date', function(req, res, next) {
    if (!new Authentication(req, res, next).doing()) {
        return;
    };
    var thisRes = res;
    var options = {
        hostname: 'tongji.dangjianwang.com',
        port: '',
        path: '/index.php?module=API&method=DevicesDetection.getOsFamilies&idSite=' + req.params.id + '&period=' + req.params.period + '&date=' + req.params.date + '&format=JSON&token_auth=73d5623a4b84a27cce0d7b8916a05743',
        method: 'GET'
    };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            var result = JSON.parse(data.toString('utf-8'));
            responseData.code = 0;
            responseData.message = '成功';
            responseData.data = result;
            thisRes.json(responseData);
        });
    });
    req.end();
    req.on('error', function(e) {
        console.error(e);
    });
});

//获取访问平台的终端设备使用的浏览器内核
router.get('/api/getEngine/:id/:period/:date', function(req, res, next) {
    if (!new Authentication(req, res, next).doing()) {
        return;
    };
    var thisRes = res;
    var options = {
        hostname: 'tongji.dangjianwang.com',
        port: '',
        path: '/index.php?module=API&method=DevicesDetection.getBrowserEngines&idSite='+ req.params.id + '&period='+ req.params.period +'&date='+ req.params.date +'&format=JSON&token_auth=73d5623a4b84a27cce0d7b8916a05743',
        method: 'GET'
    };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            var result = JSON.parse(data.toString('utf-8'));
            responseData.code = 0;
            responseData.message = '成功';
            responseData.data = result;
            thisRes.json(responseData);
        });
    });
    req.end();
    req.on('error', function(e) {
        console.error(e);
    });
});

module.exports = router;