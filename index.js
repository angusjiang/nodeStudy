/**
 * Created by angus on 2017-1-25.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

//设置连接池
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'persondb'
});

app.set('mysql', pool);

app.use(bodyParser.json());
//bodyparser 设置 调用bodyParser.urlencode()方法会自动的在  req对象上加一个属性，这个属性就是post的数据
app.use( bodyParser.urlencoded({extended: true}) );
app.set('port', process.env.PORT || 3001);

app.set('view engine', 'ejs');
//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应的__dirname + '/public'下的文件
app.use(express.static(__dirname + '/public'));
//设置模板文件存放目录
app.set('views', path.join(__dirname, 'views'));
//配置模板引擎
app.set('view engine', 'ejs');

app.use(cookieParser());

//使用session中间件，这里session保存在内存中，可以将resave：true,添加store: 来存档你的session到数据库中
app.use(session({
    secret: 'personBlog',
    name: 'uid',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 108000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


app.use('/', require('./routes/homeAPI'));
app.use('/platform',require('./routes/platformAPI'));
app.use('/software',require('./routes/softwareAPI'));
app.use('/device', require('./routes/deviceAPI'));

// 定制404 页面
//Express 添加中间件的一种方法 app.use([path,] function [, function...]) path 默认'/'
app.use(function(req, res){
    res.status(404);
    res.render('404');
});
// 定制500 页面
app.use(function(err, req, res, next){
    console.log(err);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port'));
});
module.exports = app;