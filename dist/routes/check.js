
// TODO 盘点作业

var express = require('express');
var router = express.Router();

/*Set routerParam*/
router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});

router.post('/aaa',function (req,res,next) {
    console.log('12351235235');
    console.log(req.body);
    res.send(req.body);
});

router.get('/',function (req,res) {
   res.send({imsunhao:123123123});
});


module.exports = router;