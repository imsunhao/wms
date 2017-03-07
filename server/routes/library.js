
// TODO 库内管理

var express = require('express');
var router = express.Router();

/*Set routerParam*/
router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '主页',
        user: req.session.user
    });
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'login'});
});

router.post('/login',function (req,res,next) {
    var username = req.body.email,
        password = req.body.password;
    //检查用户名是否已经存在
    //mongoose findOne() 方法
    User.findOne({username: username}, function (err, user) {
        if (err) {
            console.log(err);
            // return res.redirect('/login');
            return res.render('login', {title: 'login'});
        }
        if (user) {
            //对密码进行md5加密
            var md5password=crypto.createHash('md5',secret).update(password).digest('hex');
            if(md5password===user.password){
                console.log('登陆成功！');
                var User=user;
                User.password = null;
                delete User.password;
                req.session.user = User;
                if(req.body.url){
                    return res.redirect(req.body.url);
                }else return res.redirect('/');
            }else {
                console.log('password erro！'+md5password);
                return res.redirect('/login');
            }
        }else{
            console.log('用户名不存在！');
            return res.redirect('/login');
        }
    });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/reg', function (req, res, next) {
    res.render('register', {title: 'login'});
});

router.post('/reg', function (req, res, next) {
    var username = req.body.email,
        password = req.body.password;
    // passwordRepeat = req.body.passwordRepeat;

    //检查两次输入的密码是否一致
    // if (password != passwordRepeat) {
    //     console.log('两次输入的密码不一致！');
    //     return res.redirect('/reg');
    // }

    //检查用户名是否已经存在
    //mongoose findOne() 方法
    User.findOne({username: username}, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/reg');
        }
        if (user) {
            console.log('用户名已经存在');
            return res.redirect('/reg');
        }
        //对密码进行md5加密
        var md5password = crypto.createHash('md5',secret).update(password).digest('hex');
        var newUser = new User({
            username: username,
            password: md5password
        });
        //mongoose save()方法
        newUser.save(function (err, doc) {
            if (err) {
                console.log(err);
                return res.redirect('/reg');
            }
            console.log('注册成功！');
            newUser.password = null;
            delete newUser.password;
            req.session.user = newUser;
            return res.redirect('/');

        });
    });
});



module.exports = router;