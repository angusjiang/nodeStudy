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
        res.render('platform', {uname: req.session.user.uname, isActive: req.baseUrl});
    } else {
        res.redirect('/');
        return;
    }
});
//获取平台和浏览器某段时间的访问数量数据
router.post('/api/getPlatforms', function(req, res, next) {
    if (!new Authentication(req, res, next).doing()) {
        return;
    };
    var thisRes = res;
    var options = {
        hostname: 'tongji.dangjianwang.com',
        port: '',
        path: '/index.php?module=API&method=PlatformsReport.getPlatforms&idSite=' + req.body.id + '&period=' + req.body.period + '&date=' + req.body.date + '&format=JSON&token_auth=73d5623a4b84a27cce0d7b8916a05743',
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

