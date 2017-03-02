/**
 * Created by sunha on 2017/2/28.
 */

db.createUser({
    "user":"imsunhao",
    "pwd":"!HD1G6F5D4G6S5d4f6E5G4#6Ds!6d4g",
    "roles":[
        {
            "role":"__system",
            "db":"admin"
        }
    ]
});

db.auth({"user":"imsunhao","pwd":"!HD1G6F5D4G6S5d4f6E5G4#6Ds!6d4g"});