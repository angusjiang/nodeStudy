/**
 * Created by angus on 2017-2-10.
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
        res.render('devices', {uname: req.session.user.uname, isActive: req.baseUrl});
    } else {
        res.redirect('/');
        return;
    }
});

//获取访问设备的品牌名称
router.post('/api/devices', function(req, res, next) {
    if (!new Authentication(req, res, next).doing()) {
        return;
    };
    let thisRes = res;
    var options = {
        hostname: 'tongji.dangjianwang.com',
        port: '',
        path: '/index.php?module=API&method=DevicesDetection.getBrand&idSite=' + req.body.id + '&period=' + req.body.period + '&date=' + req.body.date + '&format=JSON&token_auth=73d5623a4b84a27cce0d7b8916a05743',
        method: 'GET'
    }
    var hps = https.request(options, function(res) {
        res.on('data', function(data) {
            var result = JSON.parse(data.toString('utf-8'));
            responseData.code = 0;
            responseData.message = '成功';
            responseData.data = result;
            thisRes.json(responseData);
            return;
        })
    });
    hps.end();
    hps.on('error', function(e) {
        console.log(e);
    })
});

//获取访问平台的设备像素数据
router.post('/api/dps', function(req, res, next) {
    if (!new Authentication(req, res, next).doing()) {
        return;
    };
    let thisRes = res;
    var options = {
        hostname: 'tongji.dangjianwang.com',
        port: '',
        path: '/index.php?module=API&method=Resolution.getResolution&idSite=2&period=day&date=today&format=JSON&token_auth=73d5623a4b84a27cce0d7b8916a05743',
        method: 'GET'
    }
    var hps = https.request(options, function(res) {
        var temp = '';
        res.on('data', function(data) {
            temp+=data;
        })
        res.on('end', function() {
            var result = JSON.parse(temp);
            responseData.code = 0;
            responseData.message = '成功';
            responseData.data = result;
            thisRes.json(responseData);
            return;
        })
    });
    hps.end();
    hps.on('error', function(e) {
        console.log(e);
    })
});

module.exports = router;



