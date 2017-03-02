var express = require("express"), router = express.Router();
router.param("_id", function (o, e, r, s) {
    console.log("CALLED ONLY ONCE" + s), r()
}), router.post("/aaa", function (o, e) {
    console.log("12351235235"), console.log(o.body), e.send(o.body)
}), module.exports = router;