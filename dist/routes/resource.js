
// TODO 资源管理

var express = require('express');
var router = express.Router();

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