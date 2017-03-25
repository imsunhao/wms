// TODO 关于我们

var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function (req, res, next) {
    console.log("文件默认属性："+req.files.uploadImg);
    var obj = req.files.uploadImg;
    var tmp_path = obj.path;
    var new_path = "./public/images/users/"+obj.name;
    console.log("原路径："+tmp_path);
    fs.rename(tmp_path,new_path,function(err){
        if(err){
            throw err;
        }
    })
});

module.exports = router;