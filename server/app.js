/*****************************************************************************/
/*
 /* 开发开始时间 2017-2-28 12:24:07   author:imsunhao
 /*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用文件系统模块
 /*     功能                       文件系统            核心
 /*
 */
var fs = require('fs');
/*
 /*****************************************************************************/


/*****************************************************************************/
/*
 /* 引入文件系统-路径模块
 /*     功能            被           所有文件系统            依赖
 /*
 */
var path = require('path');
/*
 /*****************************************************************************/


/*****************************************************************************/
/*
 /* 启用express框架
 /*     功能            核心框架
 /*     功能            引入父系统
 /*     功能            引入子系统
 /*
 */
var express = require('express');
var app = express();

var index = require('./routes/index');                                //父系统
var users = require('./routes/users');                                //用户信息模块
var resource = require('./routes/resource');                          //资源管理
var transaction = require('./routes/transaction');                    //业务处理
var library = require('./routes/library');                            //库内管理
var check = require('./routes/check');                                //盘点作业
var about = require('./routes/about');                                //关于我们
var imageServer = require('./routes/imageServer');                    //图片服务器
var route = require('./routes/route');                                //请求转发
/*
 /*****************************************************************************/




/*****************************************************************************/
/*
 /* 启用文件系统-读取模块
 /*     功能            被           文件系统-记录log            依赖
 /*
 */
var FileStreamRotator = require('file-stream-rotator');
/*
 /*****************************************************************************/


/*****************************************************************************/
/*
 /* 启用文件系统-记录log
 /*     功能            记录访问服务器日志
 /*     网址：     https://github.com/expressjs/morgan
 */
var logger = require('morgan');

var logDirectory = path.join(__dirname, 'log');         //日志系统路径
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});
/*
 /*****************************************************************************/


/*****************************************************************************/
/*
 /* 启用网站功能-图标
 /*     功能            统一调配图标
 /*     网址：
 */
var favicon = require('serve-favicon');
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-session
 /*     功能            解析与生成    请求中    session
 /*     网址：
 */
var session = require('express-session');
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-cookie
 /*     功能            解析与生成    请求中    cookie
 /*     网址：
 */
var cookieParser = require('cookie-parser');
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-require
 /*     功能            解析    请求中     所有的参数
 /*     网址：
 */
var bodyParser = require('body-parser');
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站数据存储系统-mongoose
 /*     功能            数据库     核心
 /*     网址：
 */
var mongoose = require('mongoose');


var mongoDBConfig = require('./serverConfig/server/mongoBDConfig.json');       //网络数据库 配置
var MongoStore = require('connect-mongo')(session);                            //提供 session  数据库依赖

mongoose.Promise = global.Promise;

/*
 /*****************************************************************************/


/*****************************************************************************/
/*
 /* 启用网站view engine
 /*     功能            被           所有视图系统            依赖
 /*
 */
app.set('views', path.join(__dirname, 'views'));        //模板根路径
app.set('view engine', 'ejs');                          //模板为ejs模板
/*
 /*****************************************************************************/


/*****************************************************************************/
/*
 /* 启用 数据库-链接
 /*     功能            被           session            依赖
 /*
 */

mongoose.connect('mongodb://' + mongoDBConfig.user + ':' + mongoDBConfig.password + '@'
    + mongoDBConfig.host + ':' + mongoDBConfig.port + '/' + mongoDBConfig.database + '?authSource='
    + mongoDBConfig.authSource, {native_parser: true});//网路数据库
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));
/*
 /*****************************************************************************/



/*****************************************************************************/
/*
 /* 启用 express 中间件
 /*     功能           见注释
 /*
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));   //图标
app.use(logger('combined', {stream: accessLogStream}));         //日志

// app.use(bodyParser({uploadDir:'./public/static/images/users/'}));
app.use(bodyParser.json({type: 'application/*+json'}));                                                         //请求解析 为json格式
// app.use(express.bodyParser('./public/static/images/users/'));                   //图片路径
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());                                                                //请求解析 cookie
app.use(express.static(path.join(__dirname, 'public')));              //加载public资源
/*
 /*****************************************************************************/




/*****************************************************************************/
/*
 /* 启用 session 中间件
 /*     功能           见注释
 /*
 */
app.use(session({
    key: 'session',
    secret: 'keboard cat',
    cookie: {maxAge: 1000 * 60 * 15 * 24},//1小时 //1k (s) * 60(min) *60 (hover) *24(day)
    store: new MongoStore({
        db: 'wms',
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /*   TODO 访问统计 imsunhao
 /*     功能           见注释
 /*
 */

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用 用户登陆身份验证 中间件
 /*     功能           见注释
 /*
 */
app.use(function (req, res, next) {
    //demo req.originalUrl.match(/\/article\/read\/.*/)
    if (/^.+\./.test(req.originalUrl) || /^\/page\/.+/.test(req.originalUrl)) return next();
    /*<debug>*/
    console.log("---------启用验证！------------------");
    if (typeof req.session.user !== 'undefined')
        console.log(req.session.user.rmsUser.ruUserName);
    else {
        console.log('未登录用户');
    }
    console.log(req.originalUrl);
    // console.log("--------------------------------------");
    /*</debug>*/
    if (req.session.user || req.originalUrl == '/users/login') {
        next();
    } else {
        return res.redirect('/users/login');
    }
});

// function a(test) {
//     return /^.+\./.test(test)||/^\/page\/.+/.test(test)
// }

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用 路由适配
 /*     功能           见注释
 /*
 */

/*主页*/
app.use('/', index);

/*用户信息层*/
app.use('/users', users);

/*请求转发*/
app.use('/route', route);

/*图片服务*/
app.use('/imageServer', imageServer);

/*关于我们*/
app.use('/about', about);

/*资源管理*/
app.use('/resource', resource);

/*库内管理*/
app.use('/library', library);

/*盘点作业*/
app.use('/check', check);

/*关于我们*/
app.use('/about', about);


// error handler analysis
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development

    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    // res.status(err.status || 500);
    
    res.send({status: err.status, model: err.message});
});

/*
 /*****************************************************************************/



/*****************************************************************************/
/*
 /* 导出 服务
 /*
 */
module.exports = app;
/*
 /*****************************************************************************/


