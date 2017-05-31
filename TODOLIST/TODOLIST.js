/**
 * Created by imsunhao on 2017/3/13.
 */
/**
 * TODO 测试新版数据库 wms_rb Menu
 *  入库操作 弹出层 样式调整 应用走马灯的猜想
 * TODO 测试入库操作
 *  完成添加任务流程页面
 * TODO 使用计算属性完成table的日期
 *
 *
 *
 *
 **/
/**TODO 测试 接口需求
 *
 * ------------ 登录页面 -----------------
 * auth/{username}/{password}
 * TODO 需求 登录请求 接口 1.登录
 * ------------ 业务处理 -----------------
 * TODO 需求 入库流程 接口
 *      1.新建
 *      2.删除
 *      3.修改
 * TODO 需求 入库操作 接口
 *      1.添加
 *      2.条件搜索
 *      3.删除
 *      4.请求历史记录
 *      5.请求入库明细 TODO 我认为只需要 rkDocsList 就好
 *      6.分配
 *      7.再次收货
 *      8.打印
 *      9.货品编号 模糊查询
 * ------------ 资源管理 -----------------
 * TODO 需求 仓库管理 接口
 *      1.添加
 *      2.get仓库
 *      3.修改 库区区域
 *      4.修改 库区属性
 *      5.查看 库区明细
 *      6.get 库区对应库位信息
 *
 * TODO
 *
 *
 *
 **/
/**数据库数据
 *
 */
/** TODO 系统配置
 *
 */
    /**      用户管理     userManagement
     *
     * */
        /**  0 分页获取 用户信息                        /user/page
         *          ruUserName          用户名
         *          ruLoginName         账户
         *          ruUserType          用户类型
         *                                  0.普通
         *                                  1.堆高车
         *                                  2.高位叉车
         *          ruPhone             手机  联系方式???
                    ruStatus            状态(int)
                                            0.禁用(软删除)
                                            1启用
                    ruIspda             是否允许登陆PDA(tinyint)
         *                                  0.是
         *                                  1.否
         *          ruUserZyq           高位叉车作业区域
         *          ruSex               性别(tinyint)
         *                                  1.男
         *                                  0.女
         *                                  json数据中1对应true 0对应false
         *           ruHomeaddress       家庭住址
         *           ruRemarks           备注

 **/
        /**     TODO 1  新增-启用-配置角色            POST /user
         *          ruUserName          用户昵称/名
         *          ruLoginPassword     密码
         *          ruPhone             手机
         *          ruTelephone         电话/座机
         *          ruQicq              qq
         *          ruIspda             是否允许登陆pda
         *                                  1.是
         *                                  0.否
         *          ruLoginName         登录账户
         *          ruEmail             邮箱地址
         *          ruSex               性别
         *                                  1.男
         *                                  0.女
         *                                  json数据中1对应true 0对应false
         *          ruBirthday          生日/出生日期
         *          ruHomeaddress       家庭住址
         *          ruUserType          用户类型
         *                                  0.普通
         *                                  1.堆高车
         *                                  2.高位叉车
         *                                  */
        /** 2 启用                               /user/liveUsersByUids
         *          user_ids    被勾选的用户id集合
         *          */
        /** 3 配置角色                           /user/userAddRoles
         *          用户配置角色
         *          userId         用户id
         *          roleIds        被勾选的角色id集合
         *          */
        /** 4 编辑                               /user
         *          ruUserName          用户昵称/名
         *          ruLoginPassword     密码
         *          ruPhone             手机
         *          ruTelephone         电话/座机
         *          ruQicq              qq
         *          ruIspda             是否允许登陆pda
         *                                  1.是
         *                                  0.否
         *          ruLoginName         登录账户
         *          ruEmail             邮箱地址
         *          ruSex               性别
         *                                  1.男
         *                                  0.女
         *                                  json数据中1对应true 0对应false
         *          ruBirthday          生日/出生日期
         *          ruHomeaddress       家庭住址
         *          ruUserType          用户类型
         *                                  0.普通
         *                                  1.堆高车
         *                                  2.高位叉车
         *                                  */
        /** 5 重置密码                             /user/resetPwd
         *          ids    被勾选的用户id集合
         *          */
        /** 6 禁用                               /user/dieUsersByUids
         *          user_ids    被勾选的用户id集合
         *          */
        /**  7 用户名不允许重复                  /user/isRepeatByUsername/{username}
         *          username    用户名称
         *          */
        /**  8 登录账号不允许重复              /user/isRepeatByLoginname/{loginname}
         *          loginname   登录账号
         *          */
        /** 9 设置 用户 角色            POST /user/userAddRoles
         *          userId         用户id
         *          roleIds        被勾选的角色id
         *          */
        /** 11 用户管理 根据id返回用户角色信息     POST /role/findByUserId/{user_id}
         *          user_id              用户id
         **/
        /**  12 请求所有角色                      /role/page  post
         *
         draw            没有意义   0
         pageNum         当前页     1
         pageSize        每页大小   999
         */
    /**   角色管理   roleManagement
     *
     */
        /** 0 分页获取 角色信息                        /role
         *          rrRoleId             角色id
         *          rrName               角色name
         *          rrRemarks            备注
         *          rrStatus             状态
         1.可用
         0.软删除禁用
         *          rrCjsj               创建时间
         *          */
        /** TODO 1 新增-启用-配置仓库-配置客户-配置菜单
         *          rrName               角色名称
         *          rrRemarks            备注
         *          */
        /** TODO 2 启用
         *          rrStatus             状态
         *          */
        /** TODO 3 配置仓库   /role/roleAddArehouses
         *          角色配置仓库
         *          roleId              角色id
         *          arehouseIds         被勾选的仓库id集合
         *          */
        /** TODO 4 配置客户  /role/roleAddClients
         *         角色配置客户
         *         roleId              角色id
         *         clientIds           被勾选的客户id集合
         *         */
        /** TODO 5 配置菜单   /role/roleAddMenus
         *          角色配置菜单
         *         roleId              角色id
         *         menuIds             被勾选的菜单id集合
         *         */
        /** TODO 6 禁用
         *          禁用
         *          rrStatus             状态
         *                                  0.禁用
         *                                  */
        /** TODO 7 编辑
         *          rrName               角色name
         *          rrRemarks            备注
         **/
        /** TODO 8 角色名称不允许重复的接口
         *          rrName               角色name
         *          */
        /** 9 查询所有仓库   POST /arehouse/page
         * 参数
         * {
                "pageNum": 1,
                "pageSize": 999,
                "draw": 1,
                "baStatus":1
            }
         * 参数说明
         *     baName            仓库名称
         *     baArehouseId      id
         **/
        /** 10 查询所有客户   POST /client/page
         * 参数
         * {
                "pageNum": 1,
                "pageSize": 999,
                "draw": 1,
                "bcStatus":1
            }
         * 参数说明
         *     bcCname      客户名称
         *     bcClientId   客户id
         **/
        /** 11 查询指定角色 菜单   GET /menu/findByRoleId/ + req.query.roleId
         * 参数
         * {
                roleId
            }
         * 参数说明
         *     roleId   角色id
         **/
        /** 12 查询指定角色 仓库   GET /arehouse/findByRoleId/ + req.query.roleId
         * 参数
         * {
                roleId
            }
         * 参数说明
         *     roleId   角色id
         **/
    /** 仓库管理/配置   warehouseConfiguration
     *
     */
        /**  0 分页获取 仓库详情   POST /arehouse/page
         * 参数
         * {
                "baName": "",
                "baScontacts": "",
                "baCtype": "",
                "baStatus": "",
                "pageNum": 1,
                "pageSize": 1,
                "draw": 1
            }
         参数说明
              baArehouseId      id
              baName            仓库名称
              baAddr            仓库地址
              baScity           所在地市
              baScontacts       联系人
              baPhone           电话
              baAcreage         面积
              baCtype           仓库类型
              baHumidity        相对湿度
              baFax             传真
              baPostoffice      邮编
              baIsti            是否需要维护ti值
              baStatus          状态
              baClientId        客户id
              baRemarks         备注
              baCreatetime      创建时间
              baPgroupinfo      平面图信息
        /**  1 新增 POST /arehouse
         * 参数
         * {
                "baArehouseId": 0,
                "baName": "23221",
                "baAddr": "122",
                "baScity": "122",
                "baScontacts": "string",
                "baPhone": "string",
                "baAcreage": "string",
                "baCtype": "string",
                "baHumidity": "string",
                "baFax": "string",
                "baPostoffice": "string",
                "baIsti": 0,
                "baStatus": 0,
                "baClientId": 0,
                "baRemarks": "string",
                "baCreatetime": "2017-04-06T06:05:11.376Z",
                "baPgroupinfo": "string",
                "arehouseKqs": [
                    {
                        "baqKqId": 8,
                        "baqArehouseId": 0,
                        "baqKqName": "string",
                        "baqIsdel": 0,
                        "baqStatus": 0,
                        "baseRegions": [
                            {
                                "brgRegionId": 8,
                                "brgArehouseId": 0,
                                "brgRegionNo": "string",
                                "brgKqId": 0,
                                "brgRegionStatus": 0
                             }
                        ]
                       }
                   ]
            }
         参数说明
                baArehouseId    仓库id 主键
                baName          仓库名称
                baAddr          仓库地址
                baScity         所在地市
                baScontacts     联系人
                baPhone         电话
                baAcreage       面积
                baCtype         仓库类型
                baHumidity      相对湿度
                baFax           传真
                baPostoffice    邮编
                baIsti          是否需要维护ti值 1:存在ti 2:不存在ti
                baStatus        状态1可用 0软删除
                baClientId      客户id
                baRemarks       备注
                baCreatetime    创建时间
                baPgroupinfo    平面图信息
         *
         */
        /** 1  编辑 PUT /arehouse
         * 参数
         * {
               "baArehouseId": 2,
               "baName": "000",
               "baAddr": "000",
               "baScity": "222",
               "baScontacts": "string",
               "baPhone": "string",
               "baAcreage": "string",
               "baCtype": "string",
               "baHumidity": "string",
               "baFax": "string",
               "baPostoffice": "string",
               "baIsti": 0,
               "baStatus": 0,
               "baClientId": 1,
               "baRemarks": "string",
               "baCreatetime": "2017-04-06T06:05:11.379Z",
               "baPgroupinfo": "string",
               "arehouseKqs": [
               {
                   "baqKqId": 1,
                   "baqArehouseId": 1,
                   "baqKqName": "string",
                   "baqIsdel": 0,
                   "baqStatus": 0,
                   "baseRegions": [
                       {
                           "brgRegionId": 1,
                           "brgArehouseId": 0,
                           "brgRegionNo": "string",
                           "brgKqId": 0,
                           "brgRegionStatus": 0
                       }
                   ]
               }
               ]
           }
         参数说明
                baArehouseId    仓库id 主键
                baName          仓库名称
                baAddr          仓库地址
                baScity         所在地市
                baScontacts     联系人
                baPhone         电话
                baAcreage       面积
                baCtype         仓库类型
                baHumidity      相对湿度
                baFax           传真
                baPostoffice    邮编
                baIsti          是否需要维护ti值 1:存在ti 2:不存在ti
                baStatus        状态1可用 0软删除
                baClientId      客户id
                baRemarks       备注
                baCreatetime    创建时间
                baPgroupinfo    平面图信息
         */
        /**  2 新增 POST /arehouse
         * 参数
         * {

                        "baName": "23221",
                        "baAddr": "122",
                        "baScity": "122",
                        "baScontacts": "string",
                        "baPhone": "string",
                        "baAcreage": "string",
                        "baCtype": "string",
                        "baHumidity": "string",
                        "baFax": "string",
                        "baPostoffice": "string",
                        "baIsti": 0,
                        "baStatus": 0,
                        "baClientId": 0,
                        "baRemarks": "string",
                        "baCreatetime": "2017-04-06T06:05:11.376Z",
                        "baPgroupinfo": "string",
                        "arehouseKqs": [
                            {
                                "baqKqId": 8,
                                "baqArehouseId": 0,
                                "baqKqName": "string",
                                "baqIsdel": 0,
                                "baqStatus": 0,
                                "baseRegions": [
                                    {
                                        "brgRegionId": 8,
                                        "brgArehouseId": 0,
                                        "brgRegionNo": "string",
                                        "brgKqId": 0,
                                        "brgRegionStatus": 0
                                     }
                                ]
                               }
                           ]
                    }
         参数说明
         baArehouseId    仓库id 主键
         baName          仓库名称
         baAddr          仓库地址
         baScity         所在地市
         baScontacts     联系人
         baPhone         电话
         baAcreage       面积
         baCtype         仓库类型
         baHumidity      相对湿度
         baFax           传真
         baPostoffice    邮编
         baIsti          是否需要维护ti值 1:存在ti 2:不存在ti
         baStatus        状态1可用 0软删除
         baClientId      客户id
         baRemarks       备注
         baCreatetime    创建时间
         baPgroupinfo    平面图信息
         *
         */
        /**  3 仓库管理 通过client_id查询部分仓库的信息(被客户id绑定的) GET /arehouse/findByClientId/{client_id}
        *          */
        /**  4 仓库管理 通过role_id查询部分仓库的信息(被角色id绑定的 GET /arehouse/findByRoleId/{role_id}
        *          */
        /**  5 仓库管理 通过id删除一条仓库数据 DELETE /arehouse/{id}
        *          */
        /**  6 仓库管理 根据id返回仓库信息 GET /arehouse/{id}
        *          */
        /**  7 仓库管理 通过client_id查询部分仓库的信息(被用户id绑定的)  GET /arehouse/{user_id}/{client_id}

        *          */
        /**  8 仓库管理 客户归属 GET /arehouse/belongToWhichClient/{arehouse_id}
         *
         */
        /**  9 仓库管理 软删除多个或单个数据 POST /arehouse/deleteOfSoft
         *      {
                  "id": 1,
                  "ids": [
                    1
                  ]
                }
         *
         */
    /**
     *    客户配置  clientConfiguration
     **/
        /**  0  分页获取 仓库详情 POST /client/page
         * 参数
         * {
         *      "bcCname": "",
                "bcStatus": 0,
                "pageNum": 1,
                "pageSize": 1,
                "draw": 1
         * }
         * 参数说明：
         *      bcClientId   客户id
                bcCname      客户名称
                bcCaddr      客户地址
                bcCtel       联系方式
                bcStatus     状态0 软删除 1 可用
                bcCjsj       创建时间
         */
        /**
         *   1 新增-配置货品-配置仓库 POST /client
         *   参数
         *   {
                "bcClientId": 0,
                "bcCname": "string",
                "bcCaddr": "string",
                "bcCtel": "string",
                "bcStatus": 0,
                "bcCjsj": "2017-04-06T06:05:11.359Z"
              }
            参数说明：
                bcClientId      客户id
                bcCname         客户名称
                bcCaddr         客户地址
                bcCtel          联系方式
                bcStatus        0 软删除 1 可用
                bcCjsj          创建时间
         *
        /**
         *  TODO 2 配置货品    /client/clientAddGoods
         *      通过clientId配置货品所属关系
         *      clientId            客户id
         *      goodsIds            被勾选的货品id集合
         **/
        /**
         2 配置货品 客户管理 通过client_id配置货品所属关系 POST /client/clientAddGoods
         参数
         {
            "id": 1,
            "ids": [
            2,3,4
            ]
         }
         参数说明：
         id     客户id
         ids    货品id
        **/
        /**
         *   3 配置仓库 客户管理 通过client_id配置仓库所属关系 POST /client/clientAddArehouses
         * 参数
         * {
                "id": 0,
                "ids": [
                  1
                ]
            }
         参数说明：
                id  客户id
                ids 仓库id
         **/
        /**
         *   4 编辑  PUT /client
         *  参数
         *  {
         *      "bcClientId": 1,
                "bcCname": "",
                "bcCaddr": "",
                "bcCtel": "",
                "bcStatus": 0,
                "bcCjsj": ""
         *  }
         *  参数说明：
         *          bcClientId  客户id
                    bcCname     客户名称
                    bcCaddr     客户地址
                    bcCtel      联系方式
                    bcStatu     0 软删除 1 可用
                    bcCjsj      创建时间
         **/
        /**
         *   5 客户不允许重复 客户管理 判断客户名称是否重复  GET /client/isRepeatByBcCname/{bcCname}
         *
         **/
        /**
         *  6 客户管理 软删除多个或单个数据  POST /client/deleteOfSoft
         * 参数
         * {
         *      "id": 0,
                "ids": [
                  1
                ]
         * }
         * 参数说明：
         *      id   客户id
         *      ids
         */
        /**
         *  7 客户管理 通过role_id查询部分客户的信息(被角色id绑定的) GET /client/findByRoleId/{role_id}
         */
        /**
         * 8 客户管理 通过user_id查询部分客户的信息(被用户id绑定的) GET /client/findByUserId/{user_id}
         */
        /**
         *  9 客户管理 通过id删除一条客户数据 DELETE /client/{id}
         */
        /**
         * 10 客户管理 根据id返回客户信息 GET /client/{id}
         */
/**
 * TODO 资源管理
 **/
    /**
     * TODO 仓库管理
     */
        /**
         *TODO 0 对于仓库的区域的增加
         */
        /**
         * TODO 1 对于仓库的区域的修改
         */
        /**
         * TODO 2 对于仓库的区域的查看
         */
        /**
         * TODO 3 禁止
         */
        /**
         * TODO 4 启用
         */
        /**
         * TODO 5 设为存储区
         */
        /**
         * TODO 6 设为暂存区
         */
        /**
         * TODO 7 设为未设定区
         */
        /**
         * TODO 8 设为分拣区
         */
        /**
         * TODO 9 设为不合格去区
         */
        /** TODO 10 查看区域中库存明细
         *
         */
/**
 *       货品管理   goodsManage
             **/
        /**
          0 分页查询货品详情 POST /goods
         参数
            {
                "bgGoodsName": "",
                "bgGoodsNo": "",
                "bgStatus": 1,
                "pageNum": 1,
                "pageSize": 1,
                "draw": 1
            }
         参数说明
            bgGoodsId      货品id
            bgGoodsNo      货品编号
            bgGoodsName    货品名称
            bgNameJc       货品简称
            bgT            货品t值
            bgI            货品i值
            bgHsl          货品换算量
            bgZxdw         整箱单位
            bgSzdw         散支单位
            bgStatus       状态
            bgArehouseId   仓库id(外键)
            bgClientId     客户id(外键)
            bgGoodsType    货品类型
            bgGoodsTj      货品体积
            bgGoodsZl      货品重量
            bgGoodsPrice   单价
            bgCreatetime   创建时间
            bgRemarks      备注
            bgGoodsGg      规格




         页面中需要显示的字段
         bgGoodsName    货品名称
         bgGoodsNo      货品编号
         bgNameJc       货品简称
         bgGoodsTj      货品体积
         bgGoodsZl      货品重量
         bgGoodsPrice   货品单价
         bgGoodsGg      规格
         bgZxdw         整箱单位
         bgSzdw         散支单位
         bgRemarks      备注
         */
        /**
            *   1 更新/编辑货品 PUT /goods
         *      参数
                {
                    "bgGoodsId": 2,
                    "bgGoodsNo": "string",
                    "bgGoodsName": "string",
                    "bgNameJc": "string",
                    "bgT": 0,
                    "bgI": 0,
                    "bgHsl": 0,
                    "bgZxdw": 0,
                    "bgSzdw": 0,
                    "bgStatus": 0,
                    "bgArehouseId": 0,
                    "bgClientId": 0,
                    "bgGoodsType": "string",
                    "bgGoodsTj": 0,
                    "bgGoodsZl": 0,
                    "bgGoodsPrice": 0,
                    "bgCreatetime": "2017-04-07T00:51:41.219Z",
                    "bgRemarks": "string",
                    "bgGoodsGg": "string"
                    "baseDws": [
                            {
                              "bdDwId": 0,
                              "bdName": "string",
                              "bdStatus": 0,
                              "bdIsdel": true,
                              "bdCreatetime": "2017-04-13T08:23:56.505Z"
                            }
                     ]
              }
         *      参数说明
                    bgGoodsId       货品id
                    bgGoodsNo       货品编号
                    bgGoodsName     货品名称
                    bgNameJc          货品简称
                    bgT             货品t值
                    bgI             货品i值
                    bgHsl           货品换算量
                    bgZxdw          整箱单位
                    bgSzdw          散支单位
                    bgStatus        状态
                    bgArehouseId    仓库id(外键)
                    bgClientId      客户id(外键)
                    bgGoodsType     货品类型
                    bgGoodsTj       货品体积
                    bgGoodsZl       货品重量
                    bgGoodsPrice    单价
                    bgCreatetime    创建时间
                    bgRemarks       备注
                    bgGoodsGg       规格
                    baseDws[
                    {
                      bdDwId        单位id
                      bdName        单位名称
                      bdStatus      1整箱单位 2散支单位
                      bdIsdel       0软删除 1可用
                      bdCreatetime  创建时间
                    }
                    ]


            **/
        /**
         *   2 新增货品 POST /goods/add
         *  参数
         *  {
                "bgGoodsNo": "string",
                "bgGoodsName": "string",
                "bgNamejc": "string",
                "bgT": 0,
                "bgI": 0,
                "bgHsl": 0,
                "bgZxdw": 0,
                "bgSzdw": 0,
                "bgStatus": 0,
                "bgArehouseId": 0,
                "bgClientId": 0,
                "bgGoodsType": "string",
                "bgGoodsTj": 0,
                "bgGoodsZl": 0,
                "bgGoodsPrice": 0,
                "bgCreatetime": "2017-04-07T03:05:33.291Z",
                "bgRemarks": "string",
                "bgGoodsGg": "string"
                "baseDws": [
                            {
                              "bdDwId": 0,
                              "bdName": "string",
                              "bdStatus": 0,
                              "bdIsdel": true,
                              "bdCreatetime": "2017-04-13T08:23:56.505Z"
                            }
                     ]
         *  }
         *      参数说明
                bgGoodsNo       货品编号
                bgGoodsName     货品名称
                bgNameJc          货品简称
                bgT             货品t值
                bgI             货品i值
                bgHsl           货品换算量
                bgZxdw          整箱单位
                bgSzdw          散支单位
                bgStatus        状态
                bgArehouseId    仓库id(外键)
                bgClientId      客户id(外键)
                bgGoodsType     货品类型
                bgGoodsTj       货品体积
                bgGoodsZl       货品重量
                bgGoodsPrice    单价
                bgCreatetime    创建时间
                bgRemarks       备注
                bgGoodsGg       规格
                baseDws[
                {
                  bdDwId        单位id
                  bdName        单位名称
                  bdStatus      1整箱单位 2散支单位
                  bdIsdel       0软删除 1可用
                  bdCreatetime  创建时间
                }
                ]
         */
        /**
         *   Delete 3  货品管理 通过客户id查询一些货品数据 GET /goods/findByClientId/{client_id}
         **/
        /**
         *   Delete 4 货品管理 通过货品编号查询一些货品数据 GET /goods/findBygoodsNo/{goods_no}
         **/
        /**
            *   Delete 5 货品管理 通过货品id查询货品  GET /goods/{id}
            *
         **/
        /**
         *   6 货品管理 软删除多个或单个数据 POST /goods/deleteOfSoft
         *  参数
         *  {
         *      "id": 0,
                "ids": [
                     1,2
                ]
         *  }
         *  参数说明：
         *  id 货品编号
         *
         *  **/
        /**
         *   8 货品单号、编号不允许重复  货品管理 判断货品编号是否重复 GET /goods/isRepeatByBgGoodsNo/{bgGoodsNo}
         *
         **/
        /**
         *   9 查询所有单位
         *
         **/
    /**
     *  RF管理   RFManage
         **/
        /**
         *  TODO 0 (RF管理主页面) 分页查询RF管理详情 POST /user/page
         * 参数
         * {
                "pageNum": 1,
                "pageSize": 1,
                "draw": 1
            }
         *
         * 参数说明
                ruUserId            用户主键id
                ruUserName          用户昵称/名
                ruLoginName         登录账户
                ruLoginPassword     密码
                ruPhone             手机
                ruTelephone         电话
                ruEmail             邮箱地址
                ruSex               性别1男 0 女  json数据中1对应true 0对应false
                ruBirthday          生日
                ruHomeaddress       家庭住址
                ruQicq              QQ
                ruCreateTime        创建时间
                ruLastModifiedTime  最后修改时间
                ruStatus            状态(status) 0禁用(软删除) 1启用
                ruSalt              随机掩码
                ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
                ruUserZyq           高位叉车作业区域
                ruRemarks           备注
                ruIspda             是否允许登陆pda 1是 0否
                ruPortrait          头像保存路径
         *
         */
        /**
         * TODO 1 RF管理 判断主作业区是否被占用，是否已关联；是否有PDA任务 GET /user/userAddZyq/{id}/{firstZyq}/{secondZyq}
        */
        /**
         *  TODO 2  根据id返回用户信息  GET /user/{id}
         */
        /**
         * TODO 3  RF管理 判断主作业区是否重复 GET /user/isRepeatByFirstZyq/{firstZyq}
         **/
        /**
         *  TODO 4  更新用户信息 PUT /user
         */
    /**
 *      TODO 作业区管理 operationAreaManage
         *      **/
        /**
         *  TODO 0 (作业区管理主页面) 储位组管理 POST请求查询储位组信息 POST /locations/page
         * 参数
         * {
                "blsName": "储位组1001",
                "pageNum": 1,
                "pageSize": 1,
                "draw": 1
         * }
         * 参数说明
             blsLocationsId   储位组id
             blsName          名称
             blsCjsj          创建时间
             blsArehouseId    仓库id
             blsUserId        创建人
             blsRemarks       备注
         */
        /**
         *  TODO 1  储位组管理 新增储位组 POST /locations
         *  参数
         *  {
         *      "blsName": "string11",
                "blsCjsj": "2017-04-10T05:41:24.926Z",
                "blsArehouseId": 0,
                "blsUserId": 0,
                "blsRemarks": "string"
         *  }
         *  参数说明
                blsName         名称
                blsCjsj         创建时间
                blsArehouseId   仓库Id
                blsUserId       创建人
                blsRemarks      备注
         **/
        /**
         *   TODO 2  储位组管理 更新储位组信息 PUT /locations
         *  参数
         *  {
         *      "blsLocationsId": 1,
                "blsName": "string",
                "blsCjsj": "2017-04-10T05:52:25.431Z",
                "blsArehouseId": 1,
                "blsUserId": 1,
                "blsRemarks": "string"
         *  }
         *  参数说明
         *      blsLocationsId      储位组id
                blsName             名称
                blsCjsj             创建时间
                blsArehouseId       仓库id
                blsUserId           创建人
                blsRemarks          备注
         **/
        /**
         * 3 储位组管理 根据id返回储位组信息 GET /locations/{id}
         */
        /**
         *  TODO 4  储位组管理 通过id删除一条储位组数据 DELETE /locations/{id}
         */
        /**
         *  TODO 5  储位管理 判断储位名称是否重复 GET /location/isRepeatByBlLname/{blLname}
         *
         **/
/**
 *  TODO 业务处理
 **/
    /**TODO 入库预约 warehousingReservation
    */
        /**
         *      TODO 0 新增-入库任务        POST /mfunrkRwDoc/add
         *      {
                  "rkrwId": 0,
                  "rkrwNo": "A0001",
                  "rkrwDhrq": "2017-04-13T08:25:12.866Z",
                  "rkrwDbd": "调拨地1",
                  "rkrwCys": "承运商1",
                  "rkrwCph": "鲁A-GF886",
                  "rkrwSjxm": "老司机1",
                  "rkrwDh": "15098879088",
                  "rkrwStatus": "31",
                  "rkrwArehouseId": 1,
                  "rkrwClientId": 1,
                  "docList": [
                    {
                      "rkRkdjId": 8
                    },
                	{
                      "rkRkdjId": 17
                    }
                  ]
                }
         *      参数说明
         *          rkrwId      id
         *          rkrwNo      入库任务号     系统自动生成格式为当前日期例:入库2017-03-14-16-17-01
         *          rkrwDhrq    预计到货日期   精确到分钟
         *          rkrwDbd     调拨地
         *          rkrwCys     承运商
         *          rkrwCph     车牌号
         *          rkrwSjxm    司机姓名
         *          rkrwDh      司机电话
         *          rkrwStatus  任务状态
                                    1.初始(创建入库任务后的状态)
                                    2.已下发任务(下达任务后的状态)
                                    3.已开始收货(打印收货标签后的状态)
                                    4.收货中(上架第一个库位后的状态)
                                    5.
                                    1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                    2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                    6.收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
                                    可以手动将欠货标记为收货完成需要输入原因以及补发单号
         **/
        /**
         *   2 新增-入库单               POST      /mfunrkRwDoc/add
         *
         *   参数
         *      {
                    "rkRkdjNo": "L0197168",
                    "rkType": "1",
                    "rkGysmc": "供应商001",
                    "rkRemarks": "备注",
                    "rkUserId": 1,
                    "rkCreatetime": "2017-04-11T06:35:12.029Z",
                    "rkCreateUserId": 1,
                    "rkZdfs": 1,
                    "rkStartwith": 2,
                    "rkStatus": 31,
                    "rkArehouseId": 1,
                    "rkClientId":1,
                    "rkPrintcount": 0,
                    "rkRwId": 1,
                    "rkRwStatus": "51",
                    "rkDocsList": [
                      {
                        "rksGoodsId": 9,
                        "rksDwid": 1,
                        "rksCount": 100,
                        "rksStatus": 1
                      }
                    ]
                }
            参数说明
                rkRkdjId        主键id
         *      rkRkdjNo        入库单号
         *      rkErpNo         外部单号(ERP单号)
         *      rkType          单据类型 0：采购订单 1：仓间调拨  2：退货入库
         *      rkGysmc         供应商名称
         *      rkRemarks       备注
         *      rkUserId        编辑人账户ID
         *      rkSjsj          入库时间(上架)
         *      rkBjsj          编辑时间
         *      rkCreatetime    创建时间
         *      rkCreateUserId  创建人账户ID
         *      rkZdfs          制单方式( 1:手动  2:Excel 3:接口)
         *      rkStartwith     1电脑端 2 PDA
         *      rkStatus        入库状态 1 原始状态 21 部分分配 22 全部分配 31 部分收货 32 完全收货
         *      rkArehouseId    仓库id(外键)
         *      rkEndTime       pda结束时间
         *      rkPrintcount    打印收货标签次数(X)
         *      rkRwId          入库任务ID
         *      rkRwStatus      任务状态:
                                    1.初始(创建入库任务后的状态)
                                    2.已下发任务(下发任务后的状态)
                                    3.已开始收货(打印收货标签后的状态)
                                    4.收货中(分配库位后的状态)
                                    51.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                    52.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                    61.收货完成
                                    62 欠货
                                    收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
         *      rkQhWjyy        欠货完结原因
         *      rkQhBfdh        欠货补发单号
         *      rmsUser{
                       ruUserId            用户主键id
                       ruUserName          用户昵称/名
                       ruLoginName         登录账户
                       ruLoginPassword     密码
                       ruPhone             手机
                       ruTelephone         电话
                       ruEmail             邮箱地址
                       ruSex               性别1男 0 女  json数据中1对应true 0对应false
                       ruBirthday          生日
                       ruHomeaddress       家庭住址
                       ruQicq              qq
                       ruCreateTime        创建时间
                       ruLastModifiedTime  最后修改时间
                       ruStatus            状态
                       ruSalt              随机掩码
                       ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
                       ruUserZyq           高位叉车作业区域
                       ruRemarks           备注
                       ruIspda             是否允许登陆pda 1是 0否
                       ruPortrait          头像保存路径
               }
         *      rkDocsList[
         *           rksRkmxId   入库明细id
         *           rksGoodsId  货品id
         *           rksDwid     单位id
         *           rksCount    数量
         *           rksStatus   收货（入库明细）状态(1:初始状态 21:部分分配 22:完全分配 31:部分收货 32: 完全收货)
         *           rksRkdjId   入库明单据id
         *      ]
         *       baseGoods{
                          bgGoodsId     货品id
                          bgGoodsNo     货品编号
                          bgGoodsName   货品名称
                          bgNamejc      货品简称
                          bgT           货品t值
                          bgI           货品i值
                          bgHsl         货品换算量
                          bgZxdw        整箱单位
                          bgSzdw        散支单位
                          bgStatus      状态
                          bgArehouseId  仓库id(外键)
                          bgClientId    客户id(外键)
                          bgGoodsType   货品类型
                          bgGoodsTj     货品体积
                          bgGoodsZl     货品重量
                          bgGoodsPrice  单价
                          bgCreatetime  创建时间
                          bgRemarks     备注
                          bgGoodsGg     规格
                        },
                baseDw{
                          bdDwId        单位id
                          bdName        单位名称
                          bdStatus      1整箱单位 2散支单位
                          bdIsdel       0软删除 1可用
                          bdCreatetime  创建时间
                        }
         *   allCount 总数量
         *   allTj 总体积
         */
        /**
         *  TODO  3 编辑 入库单
                参数
                    {
                        "rkRkdjId": 0,
                        "rkRkdjNo": "string",
                        "rkErpNo": "string",
                        "rkType": "string",
                        "rkGysmc": "string",
                        "rkRemarks": "string",
                        "rkUserId": 0,
                        "rkSjsj": "2017-04-11T09:16:45.376Z",
                        "rkBjsj": "2017-04-11T09:16:45.376Z",
                        "rkCreatetime": "2017-04-11T09:16:45.376Z",
                        "rkCreateUserId": 0,
                        "rkZdfs": 0,
                        "rkStartwith": 0,
                        "rkStatus": 0,
                        "rkArehouseId": 0,
                        "rkEndTime": "2017-04-11T09:16:45.376Z",
                        "rkPrintcount": 0,
                        "rkRwId": 0,
                        "rkRwStatus": "string",
                        "rkQhWjyy": "string",
                        "rkQhBfdh": "string",
                        "rmsUser": {
                          "ruUserId": 0,
                          "ruUserName": "string",
                          "ruLoginName": "string",
                          "ruLoginPassword": "string",
                          "ruPhone": "string",
                          "ruTelephone": "string",
                          "ruEmail": "string",
                          "ruSex": true,
                          "ruBirthday": "2017-04-11T09:16:45.376Z",
                          "ruHomeaddress": "string",
                          "ruQicq": "string",
                          "ruCreateTime": "2017-04-11T09:16:45.377Z",
                          "ruLastModifiedTime": "2017-04-11T09:16:45.377Z",
                          "ruStatus": 0,
                          "ruSalt": "string",
                          "ruUserType": 0,
                          "ruUserZyq": "string",
                          "ruRemarks": "string",
                          "ruIspda": true,
                          "ruPortrait": "string"
                        },
                        "rkDocsList": [
                          {
                            "rksRkmxId": 0,
                            "rksGoodsId": 0,
                            "rksDwid": 0,
                            "rksCount": 0,
                            "rksStatus": 0,
                            "rksRkdjId": 0,
                            "baseGoods": {
                              "bgGoodsId": 0,
                              "bgGoodsNo": "string",
                              "bgGoodsName": "string",
                              "bgNamejc": "string",
                              "bgT": 0,
                              "bgI": 0,
                              "bgHsl": 0,
                              "bgZxdw": 0,
                              "bgSzdw": 0,
                              "bgStatus": 0,
                              "bgArehouseId": 0,
                              "bgClientId": 0,
                              "bgGoodsType": "string",
                              "bgGoodsTj": 0,
                              "bgGoodsZl": 0,
                              "bgGoodsPrice": 0,
                              "bgCreatetime": "2017-04-11T09:16:45.377Z",
                              "bgRemarks": "string",
                              "bgGoodsGg": "string"
                            },
                            "baseDw": {
                              "bdDwId": 0,
                              "bdName": "string",
                              "bdStatus": 0,
                              "bdIsdel": true,
                              "bdCreatetime": "2017-04-11T09:16:45.377Z"
                            }
                          }
                        ],
                        "allCount": 0,
                        "allTj": 0
                     }
         参数说明
                rkRkdjId        主键id
         *      rkRkdjNo        入库单号
         *      rkErpNo         外部单号(ERP单号)
         *      rkType          单据类型 0： 采购订单 1：仓间调拨 2：退货入库
         *      rkGysmc         供应商名称
         *      rkRemarks       备注
         *      rkUserId        编辑人账户ID
         *      rkSjsj          入库时间(上架)
         *      rkBjsj          编辑时间
         *      rkCreatetime    创建时间
         *      rkCreateUserId  创建人账户ID
         *      rkZdfs          制单方式(1:手动 2:excel 3接口)
         *      rkStartwith     1电脑端2pda
         *      rkStatus        入库状态1原始状态 21部分分配 22全部分配 31部分收货 32 完全收货
         *      rkArehouseId    仓库id(外键)
         *      rkEndTime       pda结束时间
         *      rkPrintcount    打印收货标签次数(X)
         *      rkRwId          入库任务ID
         *      rkRwStatus      任务状态:
                                     1.初始(创建入库任务后的状态)
                                     2.已下发任务(下发任务后的状态)
                                     3.已开始收货(打印收货标签后的状态)
                                     4.收货中(分配库位后的状态)
                                     5.1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                     5.2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                     61.收货完成
                                     62 欠货
                                     收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
         *      rkQhWjyy        欠货完结原因
         *      rkQhBfdh        欠货补发单号
         *      rmsUser{
                       ruUserId            用户主键id
                       ruUserName          用户昵称/名
                       ruLoginName         登录账户
                       ruLoginPassword     密码
                       ruPhone             手机
                       ruTelephone         电话
                       ruEmail             邮箱地址
                       ruSex               性别1男 0 女  json数据中1对应true 0对应false
                       ruBirthday          生日
                       ruHomeaddress       家庭住址
                       ruQicq              qq
                       ruCreateTime        创建时间
                       ruLastModifiedTime  最后修改时间
                       ruStatus            状态
                       ruSalt              随机掩码
                       ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
                       ruUserZyq           高位叉车作业区域
                       ruRemarks           备注
                       ruIspda             是否允许登陆pda 1是 0否
                       ruPortrait          头像保存路径
               }
         *      rkDocsList[
         *           rksRkmxId   入库明细id
         *           rksGoodsId  货品id
         *           rksDwid     单位id
         *           rksCount    数量
         *           rksStatus   收货（入库明细）状态(1:初始状态 21:部分分配 22:完全分配 31:部分收货 32: 完全收货)
         *           rksRkdjId   入库明单据id
         *      ]
         *       baseGoods{
                          bgGoodsId     货品id
                          bgGoodsNo     货品编号
                          bgGoodsName   货品名称
                          bgNamejc      货品简称
                          bgT           货品t值
                          bgI           货品i值
                          bgHsl         货品换算量
                          bgZxdw        整箱单位
                          bgSzdw        散支单位
                          bgStatus      状态
                          bgArehouseId  仓库id(外键)
                          bgClientId    客户id(外键)
                          bgGoodsType   货品类型
                          bgGoodsTj     货品体积
                          bgGoodsZl     货品重量
                          bgGoodsPrice  单价
                          bgCreatetime  创建时间
                          bgRemarks     备注
                          bgGoodsGg     规格
                        },
                    baseDw{
                          bdDwId        单位id
                          bdName        单位名称
                          bdStatus      1整箱单位 2散支单位
                          bdIsdel       0软删除 1可用
                          bdCreatetime  创建时间
                        }
         *   allCount 总数量
         *   allTj 总体积
         */
        /**4 分页查询货品详情       链接 goodsManage/0
         参数
         {
             "bgGoodsName": "",
             "bgGoodsNo": "",
             "bgStatus": 1,
             "pageNum": 1,
             "pageSize": 1,
             "draw": 1
         }
         参数说明
                bgGoodsId      货品id
                bgGoodsNo      货品编号
                bgGoodsName    货品名称
                bgNameJc       货品简称
                bgT            货品t值
                bgI            货品i值
                bgHsl          货品换算量
                bgZxdw         整箱单位
                bgSzdw         散支单位
                bgStatus       状态
                bgArehouseId   仓库id(外键)
                bgClientId     客户id(外键)
                bgGoodsType    货品类型
                bgGoodsTj      货品体积
                bgGoodsZl      货品重量
                bgGoodsPrice   单价
                bgCreatetime   创建时间
                bgRemarks      备注
                bgGoodsGg      规格




         页面中需要显示的字段
                bgGoodsName    货品名称
                bgGoodsNo      货品编号
                bgNameJc       货品简称
                bgGoodsTj      货品体积
                bgGoodsZl      货品重量
                bgGoodsPrice   货品单价
                bgGoodsGg      规格
                bgZxdw         整箱单位
                bgSzdw         散支单位
                bgRemarks      备注
         */
        /**
         *  TODO 5 删除 入库过程 通过入库单据id删除入库单据  DELETE /mfunrkDoc/{rkdoc_id}
         */
        /**
         *  TODO 6 入库单号不能重复（暂无）
         */
        /**
         *  7 入库预约的分页查询  入库过程 分页获取入库单据  POST /mfunrkDoc
         * 参数
         * {
         *    "draw": 1,
              "rkno": "",
              "startTimeParam": "",
              "endTimeParam": "",
              "pageNum": 1,
              "pageSize": 1,
              "status": 31
         * }
         * 参数说明
         *      rkRkdjId        主键id
         *      rkRkdjNo        入库单号
         *      rkErpNo         外部单号(ERP单号)
         *      rkType          单据类型 0： 采购订单 1：仓间调拨 2：退货入库
         *      rkGysmc         供应商名称
         *      rkRemarks       备注
         *      rkUserId        编辑人账户ID
         *      rkSjsj          入库时间(上架)
         *      rkBjsj          编辑时间
         *      rkCreatetime    创建时间
         *      rkCreateUserId  创建人账户ID
         *      rkZdfs          制单方式(1:手动 2:excel 3接口)
         *      rkStartwith     1电脑端2pda
         *      rkStatus        入库状态1原始状态 21部分分配 22全部分配 31部分收货 32 完全收货
         *      rkArehouseId    仓库id(外键)
         *      rkEndTime       pda结束时间
         *      rkPrintcount    打印收货标签次数(X)
         *      rkRwId          入库任务ID
         *      rkRwStatus      任务状态:
                                    1.初始(创建入库任务后的状态)
                                    2.已下发任务(下发任务后的状态)
                                    3.已开始收货(打印收货标签后的状态)
                                    4.收货中(分配库位后的状态)
                                    5.1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                    5.2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                    61.收货完成
                                    62 欠货
                                    收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
         *      rkQhWjyy        欠货完结原因
         *      rkQhBfdh        欠货补发单号
         *      rmsUser{
             *              ruUserId            用户主键id
             *              ruUserName          用户昵称/名
             *              ruLoginName         登录账户
             *              ruLoginPassword     密码
             *              ruPhone             手机
             *              ruTelephone         电话
             *              ruEmail             邮箱地址
             *              ruSex               性别1男 0 女  json数据中1对应true 0对应false
             *              ruBirthday          生日
             *              ruHomeaddress       家庭住址
             *              ruQicq              qq
             *              ruCreateTime        创建时间
             *              ruLastModifiedTime  最后修改时间
             *              ruStatus            状态
             *              ruSalt              随机掩码
             *              ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
             *              ruUserZyq           高位叉车作业区域
             *              ruRemarks           备注
             *              ruIspda             是否允许登陆pda 1是 0否
             *              ruPortrait          头像保存路径
             *      }
         *      rkDocsList[
         *           rksRkmxId   入库明细id
         *           rksGoodsId  货品id
         *           rksDwid     单位id
         *           rksCount    数量
         *           rksStatus   收货（入库明细）状态(1:初始状态 21:部分分配 22:完全分配 31:部分收货 32: 完全收货)
         *           rksRkdjId   入库明单据id
         *      ]
         *   allCount 总数量
         *   allTj 总体积
         */

        /** TODO 8 入库单 详细信息
         *
         *
         * */

    /**
     *      TODO 入库任务 warehousingTask
         */
        /**
         * TODO 0  分页查询任务单          POST /mfunrkRwDoc
         *   参数 --该分页不支持模糊查询 模糊查询的字段有6个
         *      {
                  "draw": 0,
                  "rkrwNo": "A",
                  "rkrwStatus": "31",
                  "rkrwDbd": "调",
                  "rkrwCys": "承",
                  "rkrwCph": "鲁",
                  "rkrwSjxm": "司机",
                  "rkrwDh": "150",
                  "rkrwArehouseId": 0,
                  "rkrwClientId": 0,
                  "pageNum": 1,
                  "pageSize": 100
                }

         *   参数说明
                rkrwNo          编号模糊查询
                rkrwStatus      状态码 31 部分收货
                rkrwDbd         调拨地模糊查询
                rkrwCys         承运商模糊查询
                rkrwCph         车牌号模糊查询
                rkrwSjxm        司机姓名模糊查询
                rkrwDh          电话模糊查询
                rkrwArehouseId  仓库权限信息
                rkrwClientId    客户权限信息
                pageNum         页码
                pageSize        分页大小

         *   返回结果说明
         *          rkrwId     id
         *          rkrwNo      任务号
         *          rkrwDhrq    预计到货日期
         *          rkrwDbd     调拨地
         *          rkrwCys     承运商
         *          rkrwCph     车牌号
         *          rkrwSjxm    司机姓名
         *          rkrwDh      司机电话
         *          rkrwStatus  任务状态
         */
        /** 1 修改 入库任务管理 更新入库任务单 PUT /mfunrkRwDoc
         *
         *          参数
         *          {
         *              "rkrwId": 1,
                        "rkrwNo": "111",
                        "rkrwDhrq": "2017-04-07T03:38:53.205Z",
                        "rkrwDbd": "111",
                        "rkrwCys": "111",
                        "rkrwCph": "111",
                        "rkrwSjxm": "111",
                        "rkrwDh": "111",
                        "rkrwStatus": "1"
         *          }
         *          参数说明
         *          rkrwId      id/入库任务号(系统自动生成格式为当前日期例:入库2017-03-14-16-17-01)
         *          rkrwNo      入库任务单号(系统自动生成)
         *          rkrwDhrq    预计到货日期(必填并且精确到分钟)
         *          rkrwDbd     调拨地(必填)
         *           rkrwCys    承运商(必填)
         *          rkrwCph     车牌号(必填)
         *          rkrwSjxm    司机姓名(必填)
         *          rkrwDh      司机电话(必填)
         *          rkrwStatus  任务状态:
                                    1.初始(创建入库任务后的状态)
                                    2.已下发任务(下达任务后的状态)
                                    3.已开始收货(打印收货标签后的状态)
                                    4.收货中(上架第一个库位后的状态)
                                    5.1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                    5.2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                    6.收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
                                    可以手动将欠货标记为收货完成需要输入原因以及补发单号
         */
        /**
         *          TODO 2 修改明细表
         *          rkRkdjNo        入库单号
         *          rkCreatetime    下单时间
         *                          总数量
         *                          总体积
         *          rkRemarks       备注
         */
        /**
         * 3 新增-入库任务     POST /mfunrkRwDoc/add
         * 参数
         *
         *
         {
            "rkrwId": 0,
            "rkrwNo": "A0001",
            "rkrwDhrq": "2017-04-13T08:25:12.866Z",
            "rkrwDbd": "调拨地1",
            "rkrwCys": "承运商1",
            "rkrwCph": "鲁A-GF886",
            "rkrwSjxm": "老司机1",
            "rkrwDh": "15098879088",
            "rkrwStatus": "31",
            "rkrwArehouseId": 1,
            "rkrwClientId": 1,
            "docList": [
             {
               "rkRkdjId": 8
             },
             {
                "rkrwId": 0,
                "rkrwNo": "A0001",
                "rkrwDhrq": "2017-04-13T08:25:12.866Z",
                "rkrwDbd": "调拨地1",
                "rkrwCys": "承运商1",
                "rkrwCph": "鲁A-GF886",
                "rkrwSjxm": "老司机1",
                "rkrwDh": "15098879088",
                "rkrwStatus": "31",
                "rkrwArehouseId": 1,
                "rkrwClientId": 1,
                "docList": [
                 {
                   "rkRkdjId": 8
                 },
                 {
                   "rkRkdjId": 17
                 }
                ]
             }
             *
             *
             * 参数说明：
             *
             *      rkrwId          默认为null/0
                    rkrwNo          任务编号信息
                    rkrwDhrq        时间
                    rkrwDbd         调拨地
                    rkrwCys         承运商
                    rkrwCph         车牌号
                    rkrwSjxm        司机姓名
                    rkrwDh          电话
                    rkrwStatus      状态码
                    rkrwArehouseId  创建仓库
                    rkrwClientId    所属客户

                    docList [{"rkRkdjId": 8 需要被合并的入库单据id(其他字段无用)},{"rkRkdjId": 17 需要被合并的入库单据id(其他字段无用)}]
             *
             */
            /**
             *  4 删除入库单 入库任务管理 通过id删除一条入库任务单  DELETE /mfunrkRwDoc/{rkrw_id}
             */
            /**
             *  TODO 5 下发
             */
            /**
             * 6  入库任务管理 通过id获取一条入库任务单 GET /mfunrkRwDoc/{rkrw_id}
         * */
    /**
        * TODO 开始收货 startReceiving
           */
            /**
             * 0 开始收货分页查询 POST /mfunrkRwDoc
             参数 --该分页不支持模糊查询 模糊查询的字段有6个
             *      {
                    "pageNum": 1,
                    "pageSize": 1
                     "draw": 1,
         *      }
             *   参数说明
             *          rkrwId     id
             *          rkrwNo      任务号
             *          rkrwDhrq    预计到货日期
             *          rkrwDbd     调拨地
             *          rkrwCys     承运商
             *          rkrwCph     车牌号
             *          rkrwSjxm    司机姓名
             *          rkrwDh      司机电话
             *          rkrwStatus  任务状态
             */
            /**
             *  TODO 1 打印收货标签
             */
        /**
         *  TODO 入库操作   inputOperation
         */
            /**TODO 0  入库操作分页查询 入库过程 分页获取入库单据 POST /mfunrkDoc
             * 参数{
                    "draw": 1,
                    "pageNum": 1,
                    "pageSize": 1,
                    "status": 31
                  }
             * 参数说明
             *      rkRkdjId        主键id
             *      rkRkdjNo        入库单号
             *      rkErpNo         外部单号(ERP单号)
             *      rkType          单据类型 0： 采购订单 1：仓间调拨 2：退货入库
             *      rkGysmc         供应商名称
             *      rkRemarks       备注
             *      rkUserId        编辑人账户ID
             *      rkSjsj          入库时间(上架)
             *      rkBjsj          编辑时间
             *      rkCreatetime    创建时间
             *      rkCreateUserId  创建人账户ID
             *      rkZdfs          制单方式(1:手动 2:excel 3接口)
             *      rkStartwith     1电脑端2pda
             *      rkStatus        入库状态1原始状态 21部分分配 22全部分配 31部分收货 32 完全收货
             *      rkArehouseId    仓库id(外键)
             *      rkEndTime       pda结束时间
             *      rkPrintcount    打印收货标签次数(X)
             *      rkRwId          入库任务ID
             *      rkRwStatus      任务状态:
                                        1.初始(创建入库任务后的状态)
                                        2.已下发任务(下发任务后的状态)
                                        3.已开始收货(打印收货标签后的状态)
                                        4.收货中(分配库位后的状态)
                                        5.1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                        5.2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                        61.收货完成
                                        62 欠货
                                        收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
             *      rkQhWjyy        欠货完结原因
             *      rkQhBfdh        欠货补发单号
             *      rmsUser{
             *              ruUserId            用户主键id
             *              ruUserName          用户昵称/名
             *              ruLoginName         登录账户
             *              ruLoginPassword     密码
             *              ruPhone             手机
             *              ruTelephone         电话
             *              ruEmail             邮箱地址
             *              ruSex               性别1男 0 女  json数据中1对应true 0对应false
             *              ruBirthday          生日
             *              ruHomeaddress       家庭住址
             *              ruQicq              qq
             *              ruCreateTime        创建时间
             *              ruLastModifiedTime  最后修改时间
             *              ruStatus            状态
             *              ruSalt              随机掩码
             *              ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
             *              ruUserZyq           高位叉车作业区域
             *              ruRemarks           备注
             *              ruIspda             是否允许登陆pda 1是 0否
             *              ruPortrait          头像保存路径
             *      }
             *      rkDocsList[
             *           rksRkmxId   入库明细id
             *           rksGoodsId  货品id
             *           rksDwid     单位id
             *           rksCount    数量
             *           rksStatus   收货（入库明细）状态(1:初始状态 21:部分分配 22:完全分配 31:部分收货 32: 完全收货)
             *           rksRkdjId   入库明单据id
             *      ]
             *
             *   allCount 总数量
             *   allTj 总体积
             */
            /**
             *  TODO 1 入库过程 更新数据 PUT /mfunrkDoc
             *  TODO 参数(未正确测试)
             *  {
                     "rkRkdjId": 8,
                     "rkRkdjNo": "L0197167",
                     "rkErpNo": "erp_10001",
                     "rkType": "string",
                     "rkGysmc": "string",
                     "rkRemarks": "string",
                     "rkUserId": 1,
                     "rkSjsj": "2017-04-10T02:04:15.343Z",
                     "rkBjsj": "2017-04-10T02:04:15.343Z",
                     "rkCreatetime": "2017-04-10T02:04:15.343Z",
                     "rkCreateUserId": 1,
                     "rkZdfs": 0,
                     "rkStartwith": 0,
                     "rkStatus": 0,
                     "rkArehouseId": 1,
                     "rkEndTime": "2017-04-10T02:04:15.343Z",
                     "rkPrintcount": 0,
                     "rkRwId": 1,
                     "rkRwStatus": "string",
                     "rkQhWjyy": "string",
                     "rkQhBfdh": "string",
                     "rmsUser": {
                       "ruUserId": 5,
                       "ruUserName": "string",
                       "ruLoginName": "string",
                       "ruLoginPassword": "string",
                       "ruPhone": "string",
                       "ruTelephone": "string",
                       "ruEmail": "string",
                       "ruSex": true,
                       "ruBirthday": "2017-04-10T02:04:15.344Z",
                       "ruHomeaddress": "string",
                       "ruQicq": "string",
                       "ruCreateTime": "2017-04-10T02:04:15.344Z",
                       "ruLastModifiedTime": "2017-04-10T02:04:15.344Z",
                       "ruStatus": 1,
                       "ruSalt": "string",
                       "ruUserType": 0,
                       "ruUserZyq": "string",
                       "ruRemarks": "string",
                       "ruIspda": true,
                       "ruPortrait": "string"
                     },
                     "rkDocsList": [
                       {
                         "rksRkmxId": 88,
                         "rksGoodsId": 9,
                         "rksDwid": 1,
                         "rksCount": 0,
                         "rksStatus": 0,
                         "rksRkdjId": 8,
                         "baseGoods": {
                           "bgGoodsId": 1,
                           "bgGoodsNo": "string",
                           "bgGoodsName": "string",
                           "bgNamejc": "string",
                           "bgT": 0,
                           "bgI": 0,
                           "bgHsl": 0,
                           "bgZxdw": 0,
                           "bgSzdw": 0,
                           "bgStatus": 1,
                           "bgArehouseId": 1,
                           "bgClientId": 1,
                           "bgGoodsType": "string",
                           "bgGoodsTj": 0,
                           "bgGoodsZl": 0,
                           "bgGoodsPrice": 0,
                           "bgCreatetime": "2017-04-10T02:04:15.344Z",
                           "bgRemarks": "string",
                           "bgGoodsGg": "string"
                         },
                         "baseDw": {
                           "bdDwId": 1,
                           "bdName": "string",
                           "bdStatus": 1,
                           "bdIsdel": true,
                           "bdCreatetime": "2017-04-10T02:04:15.344Z"
                         }
                       }
                     ],
                     "allCount": 0,
                     "allTj":
              }
             *  参数说明
             *      rkRkdjId        主键id
             *      rkRkdjNo        入库单号
             *      rkErpNo         外部单号(ERP单号)
             *      rkType          单据类型 0： 采购订单 1：仓间调拨 2：退货入库
             *      rkGysmc         供应商名称
             *      rkRemarks       备注
             *      rkUserId        编辑人账户ID
             *      rkSjsj          入库时间(上架)
             *      rkBjsj          编辑时间
             *      rkCreatetime    创建时间
             *      rkCreateUserId  创建人账户ID
             *      rkZdfs          制单方式(1:手动 2:excel 3接口)
             *      rkStartwith     1电脑端2pda
             *      rkStatus        入库状态1原始状态 21部分分配 22全部分配 31部分收货 32 完全收货
             *      rkArehouseId    仓库id(外键)
             *      rkEndTime       pda结束时间
             *      rkPrintcount    打印收货标签次数(X)
             *      rkRwId          入库任务ID
             *      rkRwStatus      任务状态:
                                        1.初始(创建入库任务后的状态)
                                        2.已下发任务(下发任务后的状态)
                                        3.已开始收货(打印收货标签后的状态)
                                        4.收货中(分配库位后的状态)
                                        5.1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                        5.2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                        61.收货完成
                                        62 欠货
                                        收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
             *      rkQhWjyy        欠货完结原因
             *      rkQhBfdh        欠货补发单号
             *      rmsUser{
             *              ruUserId            用户主键id
             *              ruUserName          用户昵称/名
             *              ruLoginName         登录账户
             *              ruLoginPassword     密码
             *              ruPhone             手机
             *              ruTelephone         电话
             *              ruEmail             邮箱地址
             *              ruSex               性别1男 0 女  json数据中1对应true 0对应false
             *              ruBirthday          生日
             *              ruHomeaddress       家庭住址
             *              ruQicq              qq
             *              ruCreateTime        创建时间
             *              ruLastModifiedTime  最后修改时间
             *              ruStatus            状态
             *              ruSalt              随机掩码
             *              ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
             *              ruUserZyq           高位叉车作业区域
             *              ruRemarks           备注
             *              ruIspda             是否允许登陆pda 1是 0否
             *              ruPortrait          头像保存路径
             *      }
             *      rkDocsList[
             *          0{
             *              rksRkmxId   入库明细id
             *              rksGoodsId  货品id
             *              rksDwid     单位id
             *              rksCount    数量
             *              rksStatus   收货（入库明细）状态(1:初始状态 21:部分分配 22:完全分配 31:部分收货 32: 完全收货)
             *              rksRkdjId   入库明单据id
             *          }
             *         baseGoods{
             *              bgGoodsId       货品id
                            bgGoodsNo       货品编号
                            bgGoodsName     货品名称
                            bgNamejc        货品简称
                            bgT             货品t值
                            bgI             货品i值
                            bgHsl           货品换算量
                            bgZxdw          整箱单位
                            bgSzdw          散支单位
                            bgStatus        状态
                            bgArehouseId    仓库id(外键)
                            bgClientId      客户id(外键)
                            bgGoodsType     货品类型
                            bgGoodsTj       货品体积
                            bgGoodsZl       货品重量
                            bgGoodsPrice    单价
                            bgCreatetime    创建时间
                            bgRemarks       备注
                            bgGoodsGg       规格
             *         }
             *         baseDw{
             *              bdDwId          单位id
                            bdName          单位名称
                            bdStatus        1整箱单位 2散支单位
                            bdIsdel         0软删除 1可用
                            bdCreatetime    创建时间
             *         }
             *      ]
             *
             *   allCount 总数量
             *   allTj 总体积
             *
         */
            /**
             * TODO 2 入库过程 新增入库单据/包含入库单明细 POST /mfunrkDoc/
             * TODO 参数(未测试正确)
             * {
                    "rkRkdjId": 8,
                    "rkRkdjNo": "L0197167",
                    "rkErpNo": "erp_10001",
                    "rkType": "string",
                    "rkGysmc": "string",
                    "rkRemarks": "string",
                    "rkUserId": 1,
                    "rkSjsj": "2017-04-10T02:04:15.343Z",
                    "rkBjsj": "2017-04-10T02:04:15.343Z",
                    "rkCreatetime": "2017-04-10T02:04:15.343Z",
                    "rkCreateUserId": 1,
                    "rkZdfs": 0,
                    "rkStartwith": 0,
                    "rkStatus": 0,
                    "rkArehouseId": 1,
                    "rkEndTime": "2017-04-10T02:04:15.343Z",
                    "rkPrintcount": 0,
                    "rkRwId": 1,
                    "rkRwStatus": "string",
                    "rkQhWjyy": "string",
                    "rkQhBfdh": "string",
                    "rmsUser": {
                      "ruUserId": 5,
                      "ruUserName": "string",
                      "ruLoginName": "string",
                      "ruLoginPassword": "string",
                      "ruPhone": "string",
                      "ruTelephone": "string",
                      "ruEmail": "string",
                      "ruSex": true,
                      "ruBirthday": "2017-04-10T02:04:15.344Z",
                      "ruHomeaddress": "string",
                      "ruQicq": "string",
                      "ruCreateTime": "2017-04-10T02:04:15.344Z",
                      "ruLastModifiedTime": "2017-04-10T02:04:15.344Z",
                      "ruStatus": 1,
                      "ruSalt": "string",
                      "ruUserType": 0,
                      "ruUserZyq": "string",
                      "ruRemarks": "string",
                      "ruIspda": true,
                      "ruPortrait": "string"
                    },
                    "rkDocsList": [
                      {
                        "rksRkmxId": 88,
                        "rksGoodsId": 9,
                        "rksDwid": 1,
                        "rksCount": 0,
                        "rksStatus": 0,
                        "rksRkdjId": 8,
                        "baseGoods": {
                          "bgGoodsId": 1,
                          "bgGoodsNo": "string",
                          "bgGoodsName": "string",
                          "bgNamejc": "string",
                          "bgT": 0,
                          "bgI": 0,
                          "bgHsl": 0,
                          "bgZxdw": 0,
                          "bgSzdw": 0,
                          "bgStatus": 1,
                          "bgArehouseId": 1,
                          "bgClientId": 1,
                          "bgGoodsType": "string",
                          "bgGoodsTj": 0,
                          "bgGoodsZl": 0,
                          "bgGoodsPrice": 0,
                          "bgCreatetime": "2017-04-10T02:04:15.344Z",
                          "bgRemarks": "string",
                          "bgGoodsGg": "string"
                        },
                        "baseDw": {
                          "bdDwId": 1,
                          "bdName": "string",
                          "bdStatus": 1,
                          "bdIsdel": true,
                          "bdCreatetime": "2017-04-10T02:04:15.344Z"
                        }
                      }
                    ],
                    "allCount": 0,
                    "allTj": 0
                }
             *   *  参数说明
             *      rkRkdjId        主键id
             *      rkRkdjNo        入库单号
             *      rkErpNo         外部单号(ERP单号)
             *      rkType          单据类型 0： 采购订单 1：仓间调拨 2：退货入库
             *      rkGysmc         供应商名称
             *      rkRemarks       备注
             *      rkUserId        编辑人账户ID
             *      rkSjsj          入库时间(上架)
             *      rkBjsj          编辑时间
             *      rkCreatetime    创建时间
             *      rkCreateUserId  创建人账户ID
             *      rkZdfs          制单方式(1:手动 2:excel 3接口)
             *      rkStartwith     1电脑端2pda
             *      rkStatus        入库状态1原始状态 21部分分配 22全部分配 31部分收货 32 完全收货
             *      rkArehouseId    仓库id(外键)
             *      rkEndTime       pda结束时间
             *      rkPrintcount    打印收货标签次数(X)
             *      rkRwId          入库任务ID
             *      rkRwStatus      任务状态:
                                        1.初始(创建入库任务后的状态)
                                        2.已下发任务(下发任务后的状态)
                                        3.已开始收货(打印收货标签后的状态)
                                        4.收货中(分配库位后的状态)
                                        5.1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                                        5.2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                                        61.收货完成
                                        62 欠货
                                        收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
             *      rkQhWjyy        欠货完结原因
             *      rkQhBfdh        欠货补发单号
             *      rmsUser{
             *              ruUserId            用户主键id
             *              ruUserName          用户昵称/名
             *              ruLoginName         登录账户
             *              ruLoginPassword     密码
             *              ruPhone             手机
             *              ruTelephone         电话
             *              ruEmail             邮箱地址
             *              ruSex               性别1男 0 女  json数据中1对应true 0对应false
             *              ruBirthday          生日
             *              ruHomeaddress       家庭住址
             *              ruQicq              qq
             *              ruCreateTime        创建时间
             *              ruLastModifiedTime  最后修改时间
             *              ruStatus            状态
             *              ruSalt              随机掩码
             *              ruUserType          用户类型(0:普通 1堆高车 2高位叉车)
             *              ruUserZyq           高位叉车作业区域
             *              ruRemarks           备注
             *              ruIspda             是否允许登陆pda 1是 0否
             *              ruPortrait          头像保存路径
             *      }
             *      rkDocsList[
             *          0{
             *              rksRkmxId   入库明细id
             *              rksGoodsId  货品id
             *              rksDwid     单位id
             *              rksCount    数量
             *              rksStatus   收货（入库明细）状态(1:初始状态 21:部分分配 22:完全分配 31:部分收货 32: 完全收货)
             *              rksRkdjId   入库明单据id
             *          }
             *         baseGoods{
             *              bgGoodsId       货品id
                            bgGoodsNo       货品编号
                            bgGoodsName     货品名称
                            bgNamejc        货品简称
                            bgT             货品t值
                            bgI             货品i值
                            bgHsl           货品换算量
                            bgZxdw          整箱单位
                            bgSzdw          散支单位
                            bgStatus        状态
                            bgArehouseId    仓库id(外键)
                            bgClientId      客户id(外键)
                            bgGoodsType     货品类型
                            bgGoodsTj       货品体积
                            bgGoodsZl       货品重量
                            bgGoodsPrice    单价
                            bgCreatetime    创建时间
                            bgRemarks       备注
                            bgGoodsGg       规格
             *         }
             *         baseDw{
             *              bdDwId          单位id
                            bdName          单位名称
                            bdStatus        1整箱单位 2散支单位
                            bdIsdel         0软删除 1可用
                            bdCreatetime    创建时间
             *         }
             *      ]
             *
             *   allCount 总数量
             *   allTj 总体积
             *
             *
             */
            /**
             * TODO 3 入库过程 更新一些入库单据的任务外键id 关联 成为rwDoc_id POST /mfunrkDoc/updataRwId(待超哥修改)有问题
             */
            /**
             * TODO 4 入库过程 通过入库单据id删除入库单据 DELETE /mfunrkDoc/{rkdoc_id}
             */
            /**
             * TODO 5 入库过程 通过入库单据id获取一条入库单据 GET /mfunrkDoc/{rkdoc_id}
             */
    /**
     *      TODO 入库台账       inputLedger
         */
        /**
             *         TODO 0  分页查询入库台账信息 POST /mfunrktzDoc
             *             rkCreatetime    始发日期
             *             rkSjsj        到货日期
             *             rkSjsj         收货日期
             *             rkrwDbd         调拨地点
             *             rkrwCys         承运商
             *             rkrwCph         车牌号
             *             ruUserName       收货人
             *             baName          收货仓库
             *             rkRkdjNo        单号
             *             rkErpNo         调拨单号
             *             承运件数(台)    --计算出来的，在数据库中无字段
             *             承运件数(箱)    --计算出来的，在数据库中无字段
             *             方数            --计算出来的，在数据库中无字段
             *             bgGoodsNo       物料编码
             *             bgGoodsName     物料描述
             *             台数            --计算出来的，在数据库中无字段
             *             件数            --计算出来的，在数据库中无字段
             *             方数            --计算出来的，在数据库中无字段
             *             rksPsts         破损台数(入库储位时入到破损区库位中按明细累加破损台数)
             *             rksDbPswb       调拨破损外包(可以为0,操作员手动输入)
             *             rksYtPswb       源头破损外包(可以为0,操作员手动输入)
             *             rksDbPsnb       调拨破损内保(可以为0,操作员手动输入)
             *             rksYtPsnb       源头破损内保(可以为0,操作员手动输入)
             *             rksPm           泡沫(可以为0,操作员手动输入)
             *             rksQhsl         缺机/台(欠货数量,操作员手动输入)
             *             rksYcyy         异常原因(操作员手动输入)
             *             rksCljg         处理结果(操作员手动输入)
             *             rksJssj         结算时间,可以为空操作员手动输入
             */
        /**
             * TODO 1 制作/欠货 修改入库台账信息  POST /mfunrktzDoc/updateDocs
             */
    /**
 *  TODO  2 制作台账
             *  rkspm       泡沫(可以为0,操作员手动输入)
             *  rksDbPswb   调拨破损外包(可以为0,操作员手动输入)
             *  rksYtPswb   源头破损外包(可以为0,操作员手动输入)
             *  rksDb_psnb  调拨破损内保(可以为0,操作员手动输入)
             *  rksYtPsnb   源头破损内保(可以为0,操作员手动输入)
             *  rks_qhsl    缺机/台(欠货数量,操作员手动输入)
             *  rksYcyy     异常原因(操作员手动输入)
             *  rksCljg     处理结果(操作员手动输入)
             *  rks_psts    破损台数(入库储位时入到破损区库位中按明细累加破损台数)
             *  rksJssj     结算时间,可以为空操作员手动输入
             */
            /**
             *  TODO 3 制作台账明细
             *  rkRkdjNo    入库单号
             *  bgGoodsName 货品名称
             *  bgGoodsNo   货品编号
             *  rksCount    数量
             *  ruUserName  收货人
             */
            /**
             *          TODO 4 导出按钮
             */
            /**
             *  TODO 5 欠货完结
             *  rkQhWjyy    欠货完结原因/完结原因
             *  rkQhBfdh  (欠货补发单号)
             */
            /**
             *  TODO 6 入库单号不允许重复
             */
            /**
             *  TODO 7 数量不允许为负数
             */



        /**
             TODO 出库预约

             **/
            /**
             * 7 TODO 出库预约 获取 根据分页要求获取没有出库任务的出库单信息 POST /mfunck/selectMfunckDocByPage
             *
             *
             * 参数：查询条件 ckDocPageModel（参数对象）
             * {
                  "draw": 0,
                  "ckCkdjNo": "",                  出库单号（支持模糊查询）
                  "startTimeParam": "2017-01-01",  下单开始时间
                  "endTimeParam": "2017-05-01",    下单结束时间
                  "pageNum": 1,                    页数
                  "pageSize": 10,                  页面条数
                  "ckStatus": 1,                   出库状态（1初始 21部分分拣，未下架状态 22部分出库，已下架 31全部分拣，未下架 32全部出库，下架完成41已挂起， 50作废）
                  "ckCkdjClientname",              客户名称（支持模糊查询）
                  "ckCkdjType": 0,                 单据类型（0正常单据，1挂起单据，2滞留单据）
                  "ckArehouseId": 1               （如果是调度员就传-1，如果是别的角色,就传其他角色的仓库id）
                }
             *
             *
             *
             * {
             *    ckCkdjId : 2                              出库单ID
                  ckCkdjNo : "jy33333"                      出库单号
                  ckErpNo : "testerp_no"                    erp单号
                  ckCkdjType : 0                            单据类型（0正常单据，1挂起单据，2滞留单据）
                  ckCkdjClientno : "ckdanju"                客户编号
                  ckCkdjClientname : "高新区银座超市"        客户名称
                  ckContacts : "郭靖"                        联系人
                  ckTel : "15689878987"                     电话
                  ckAdress : "高新区银座超市"                地址
                  ckXdsj : 1486531654000                    下单时间
                  ckBjsj : 1487741258000                    编辑时间
                  ckYfhsj : 1487827662000                   预发货时间
                  ckRemarks : "rrrrrrr"                     备注
                  ckStatus : 1                              出库单状态（1初始 21部分分拣，未下架状态 22部分出库，已下架 31全部分拣，未下架 32全部出库，下架完成41已挂起， 50作废）
                  ckIsauto : 1                              制单方式（1手动 2 excel 3接口）
                  ckCksj : 1486445274000                    出库时间
                  ckStartwith : 0                           设备端（1电脑端 2PDA）
                  ckIsyadan : 1                             是否压单（1是2否）
                  ckIsqianhuo : 1                           是否欠货（1是2否）
                  ckArehouseId : 1                          仓库ID
                  ckClientId : 2                            客户ID
                  ckEndtime : 1487050087000                 pda结束时间
                  ckRwStatus : 1                            出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
                  ckQhStatus : 3                            欠货状态（1.整单欠货(明细欠货状态全部为"全部欠货"出库单状态为"整单欠货"，2.部分欠货(明细欠货状态存在"未欠货","部分欠货"出库单状态为"部分欠货"，3.未欠货(明细欠货状态全部为"未欠货",出库单据为"未欠货"）
                  ckZlStatus : 1                            滞留状态（1.未到车滞留(出库单据明细滞留状态全部为"未到车滞留"出库单据滞留状态为"未到车滞留"，2.到车滞留(出库单据明细滞留状态存在"到车滞留"出库单据滞留状态为"到车滞留"，3.未滞留(出库单据明细滞留状态全部为"未滞留",出库单据滞留状态为"未滞留"）
                  ckGqStatus : 1                            挂起状态（1.未挂起，2.已挂起）
                  ckrwId : 0                                出库任务ID
                  mfunckDocs []                             出库明细对象
                  allCount : null                           总数量
                  allTj : null                              总体积
                  allHeight : null                          总重量
                }
             */
        /**
             * 0 TODO 出库预约 新增 出库单据/包含出库单明细 POST /mfunck/add
             * 参数
             * {
                  "ckCkdjNo": "CK1482398743793",（必填）
                  "ckErpNo": "hk45645",
                  "ckCkdjClientno": "hlcs2001",（必填）
                  "ckCkdjClientname": "TODO 新加客户",（必填）
                  "ckContacts": "张三丰",（必填）
                  "ckTel": "18856568985",（必填）
                  "ckAdress": "济南市历城区工业北路",（必填）
                  "ckYfhsj": "2017-04-17T05:46:21.260Z",
                  "ckRemarks": "备注",
                  "ckArehouseId": 1,（必填）
                  "ckClientId": 1,（必填）
                  "userId": 2,                   (创建人ID 即当前用户ID)
                  "mfunckDocs": [
                    {
                      "cksGoodsId": 1,（必填）
                      "cksGoodsCount": 50,（必填）
                      "cksDwid": 1,（必填）
                      "cksCkfs": "TODO 先进先出",（必填）（先进先出,指定批次,指定库位(x：p：k) 默认x）
                      "cksZdpc": "X",(根据出库方式选填)
                      "cksLocationId": 1 (根据出库方式选填)
                    },
                    {
                      "cksGoodsId": 2,
                      "cksGoodsCount": 100,
                      "cksDwid": 2,
                      "cksCkfs": "先进先出",
                      "cksZdpc": "X",
                      "cksLocationId": 1
                    }
                  ]
                }
              ckDoc           出库单对象
             * {
             * ckCkdjNo           出库单号（必填）
             * ckErpNo            erp单号
             * ckCkdjClientno     客户编号
             * ckCkdjClientname   客户名称（必填）
             * ckContacts         联系人（必填）
             * ckTel              电话（必填）
             * ckAdress           地址（必填）
             * ckYfhsj            预约发货时间
             * ckRemarks          备注
             * ckArehouseId       仓库id（必填）
             * ckClientId         客户id（必填）
             * mfunckDocs[        货品明细对象
             *  cksGoodsId        货品id（必填）
             *  cksDwid           单位id（必填）
             *  cksGoodsCount     货品数量（必填）
             *  cksCkfs           出库方式（必填）
             *  cksZdpc           指定批次
             *  cksLocationId     指定库位
             *
             * ]
             * }
             */

/**
 *  TODO 1 出库预约-组合  /mfunck/insertCkrw

 {
  "ckrwNo": "CK20170509-03",
  "ckrwYjdcsj": "2017-04-18T03:45:44.353Z",
  "ckrwCph": "鲁A56895",
  "ckrwQhStatus": "1",
  "ckrwZlStatus": "1",
  "ckrwWls": "佳怡物流",
  "ckrwArehouseId": 1,
  "ckrwClientId": 1,
"userName":"超级管理员",
  "ckCkdjIds": [
    43,
    44
  ]
}


 *
 */

/**
 *  TODO 3 出库预约-修改-出库单
 *
 *
 */
/**
 *  TODO 8 出库预约-查询-出库单-详细 /mfunck/checkMfunckDocsByCkdjId
 *
 *
 {
  "id": 29
}
 *
 *
 */
/**
 *  TODO 9 出库预约-查询-出库单据-出库单号 /mfunck/mfunckdocAdd
 *
 *
 *
 *  {
  "status": 20000,
  "model": "CK1494319702504"
}
 *
 *
 */
/**
 *  TODO 10 出库预约-查询-出库任务-出库单号 /mfunck/greatCkrwNo
 *
 *
 {
  "status": null,
  "model": "CK20170509-01"
}
 *
 *
 */
/**
 *  TODO 11 出库预约-作废-出库单据-出库单号 POST /mfunck/cancelMfunckDocByCkdjId
 *
 *
 *
 {
  "id": 0
 }
 *
 *
 */

/** 12
 * {
"ids":[],
"useId":1
}
 */


/**
 * TODO 出库单管理 根据出库单Id查询出库明细详情 POST /mfunck/checkMfunckDocsByCkdjId
 * 参数类： setModel
 * {
 *  "id": 1
 *  }
 *  返回 jsonModel mfunckDocs 出库明细集合
 *  mfunckDocs.getBaseGoods.getBgGoodsNo (货品编号)
 *  mfunckDocs.getBaseGoods.getBgGoodsName (货品名称)
 *  mfunckDocs.getBaseDw.getBdName （单位名称）
 *  mfunckDocs.getCksGoodsCount （货品数量）
 */
        /**
 * TODO 出库单管理 修改出库单及明细 POST /mfunck/editMfunckDocAndDocs
 * 参数类： mfunckDoc 出库单对象
 * 实例：
 * {
      "ckCkdjId": 40                                  （出库单ID ）
      "ckCkdjNo": "CK1482398743793",                  （出库单号 不能修改）
      "ckErpNo": "hk45645",                           （客户erp号）
      "ckCkdjType": 0,                                （单据类型）
      "ckCkdjClientno": "hlcs2001",                   （客户编号）
      "ckCkdjClientname": "济南华联超市王舍人店",      （客户名称）
      "ckContacts": "张三丰",                         （联系人）
      "ckTel": "18856568985",                         （联系电话）
      "ckAdress": "济南市历城区工业北路",              （地址）
      "ckYfhsj": "2017-04-17T05:46:21.260Z",          （预发货时间）
      "ckRemarks": "备注",                            （备注）
      "ckCksj": "2017-04-17T05:46:21.260Z",           （出库时间）
      "ckArehouseId": 1,
      "ckClientId": 1,
      "userId": 2,                                    （当前用户ID）
      "mfunckDocs": [
        {
          "cksCkmxId": 56,
          "cksGoodsId": 1,
          "cksGoodsCount": 50,
          "cksDwid": 1,
          "cksCkfs": "先进先出",
          "cksZdpc": "X"
        },
        {
          "cksCkmxId": 57,
          "cksGoodsId": 2,
          "cksGoodsCount": 100,
          "cksDwid": 2,
          "cksCkfs": "先进先出",
          "cksZdpc": "X"
        }
      ]
    }
 返回 jsonModel 20002 成功 50002 失败！
 */
        /**
 * TODO 出库单管理 根据出库单Id作废出库单及明细 POST /mfunck/cancelMfunckDocByCkdjId
 * 参数类 setModel
 * {
 *   "id": 1,           （出库单ID）
 *   "useId": 2         （当前用户ID）
 * }
 * 返回 jsonModel 20002 成功 50002 失败！
 */



    /**
         * TODO 出库任务
         */
        /**
             * TODO  出库任务管理 分页查询所有任务状态下的出库任务 POST /mfunck/selectMfunckRwByPage
             * 参数：查询条件 ckRwDocPageParam(参数对象)
             * {
                  "draw": 0,
                  "ckrwNo": "CK20170418-04",           任务单号
                  "ckrwCph": "鲁A",                    车牌号
                  "ckrwWls": "佳怡物流",                物流商
                  "ckrwQhStatus": "",                  欠货状态（欠货状态：1.欠货(出库单据中存在"整单欠货"/"部分欠货"出库任务状态为"欠货" 2.未欠货(出库单据欠货状态全部为"未欠货"出库任务状态为"未欠货"）
                  "ckrwZlStatus": "",                  滞留状态（滞留状态1.滞留，2.未滞留）
                  "ckrwStartGreatTime": "2017-01-01",  制作开始时间
                  "ckrwEndGreatTime": "2017-05-01",    制作结束时间
                  "ckrwStatus": 0,                     任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
                  "pageNum": 1,                        页数
                  "pageSize": 10                       页面条数
                }
             *出库任务对象（mfunckRwDoc）
             * {
                  "ckrwId": 1,                         出库任务ID
                  "ckrwNo": "ckrw_no",                 出库任务号
                  "ckrwYjdcsj": 1489550217000,         预计到车时间
                  "ckrwCph": "CPH",                    车牌号
                  "ckrwSjdcsj": 1492150687000,         实际到车时间
                  "ckrwStatus": 10,                    出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
                  "ckrwQhStatus": 2,                   欠货状态（欠货状态：1.欠货(出库单据中存在"整单欠货"/"部分欠货"出库任务状态为"欠货" 2.未欠货(出库单据欠货状态全部为"未欠货"出库任务状态为"未欠货"）
                  "ckrwZlStatus": 2,                   滞留状态（滞留状态1.滞留，2.未滞留）
                  "ckrwWls": "jinan",                  物流商
                  "ckrwArehouseId": 1,                 仓库id（基本没用）
                  "ckrwClientId": 1,                   客户ID
                  "orderNum": 0,                       订单数
                  "goodsTypeNum": 0,                   品项数
               }
             *
             *
             *
             *
             *
             */
        /**
 * TODO 点击新增系统自动生成出库任务单号 POST /mfunck/greatCkrwNo
 * 返回参数 jsonModel  ckCkrwNo(任务单号)
 */
        /**
 * TODO 新增出库任务及明细 POST /mfunck/insertCkrw
 * {
      "ckrwNo": "CK20170418-04",                  任务单号（自动生成）
      "ckrwYjdcsj": "2017-04-18T03:45:44.353Z",   预计到车时间（必填）
      "ckrwCph": "鲁A56895",                      车牌号（必填）
      "ckrwWls": "佳怡物流",                      物流商（必填）
      "ckrwClientId": 1,                          客户id（必填）
      "userName": "用户名",                       当前登录用户用户名称
      "ckCkdjIds": [                              出库单号（可批量）
        28,
        29
      ]
    }
 返回 jsonModel  20002成功 50002失败
 */
        /**
 * TODO 根据任务ID查看出库任务详情 POST /mfunck/checkCkrwInfoByCkrwId
 * 参数类：setModel
 * {
 *   "id": 1
 * }
 * 返回 jsonModel ckrwDoc (出库任务对象，包含出库单据以及出库明细)
 */
        /**
 * TODO 修改出库任务 POST /mfunck/editCkrw
 * 参数，出库任务对象mfunckRwDoc
 * {
      "ckrwNo": "CK20170418-04",                  任务单号（不可修改）
      "ckrwYjdcsj": "2017-04-18T03:45:44.353Z",   预计到车时间（可修改）
      "ckrwCph": "鲁A56895",                      车牌号（可修改）
      "ckrwWls": "佳怡物流",                      物流商（可修改）
      "ckrwClientId": 1,                          客户id
      "userName": "用户名",                       当前登录用户用户名称
      "ckCkdjIds": [                              出库单号（可批量）
        28,
        29
      ]
    }
 */
        /**
 * TODO 根据任务ID取消出库任务 POST /mfunck/cancelCkrwByCkrwId
 * 参数类：setModel
 * {
 *   "id": 1,                       （任务ID）
 *   "userName": "用户名"           （当前登录用户用户名）
 * }
 * 返回 jsonModel  20002成功 50002失败
 */
        /**
 * TODO 根据出库单id挂起单据 POST /mfunck/hangUpCkdocByCkdjId
 * 参数 setModel 对象
 * {
 *  "userName": "用户名",           （当前登录用户用户名）
 *  "ids":[                          出库单IDs
 *     12,
  *    13
 *  ]
 * }
 * 返回 jsonModel  20002成功 50002失败
 */
        /**
 * TODO 根据出库单id取消挂起单据 POST /mfunck/cancelHangUpCkdocByCkdjId
 * 参数类：setModel
 * {
 *   "id": 1,
 *   "userName": "用户名"           （当前登录用户用户名）
 * }
 * 返回 jsonModel  20002成功 50002失败
 */

        /**
 * TODO 根据任务ID填写实际到车时间 POST /mfunck/editSJdcsjByCkrwId
 * 参数类：setModel
 * {
 *   "id": 16,
 *   "ckrwSjdcsj": "2017-05-08T03:14:27.609Z",
 *   "userName": "张三"
 * }
 * 返回jsonModel 20002成功 50002失败
 */
        /**
 * TODO 根据任务Id下发任务 POST /mfunck/issuedCkrw
 * 参数 参数对象：setModel
 * {
 *   "userName": "张三",         （当前登录用户名称）
 *  "ids": [   任务ID集合
 *     1,
 *     2
 *   ]
 * }
 * 返回 jsonModel  20002成功 50002失败
 */
        /**
 * TODO 挑选任务单据分页查询 POST /mfunck/selectChooseCkrwByPage
 * 参数：参数对象：ckRwDocPageParam
 * {
      "draw": 0,
      "ckrwNo": "",               任务单号（可模糊查询）
      "ckrwCph": "",              车牌号（可模糊查询）
      "ckrwWls": "",              物流商（可模糊查询）
      "ckrwStartGreatTime": "",   制作开始时间
      "ckrwEndGreatTime": "",     制作结束时间
      "pageNum": 1,               页码
      "pageSize": 10              当页条数
    }
    出库任务对象 mfunckRwDoc
    {
       "ckrwId": 1,                         出库任务ID
       "ckrwNo": "ckrw_no",                 出库任务号
       "ckrwYjdcsj": 1489550217000,         预计到车时间
       "ckrwCph": "CPH",                    车牌号
       "ckrwSjdcsj": 1492150687000,         实际到车时间
       "ckrwStatus": 10,                    出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
       "ckrwQhStatus": 2,                   欠货状态（欠货状态：1.欠货(出库单据中存在"整单欠货"/"部分欠货"出库任务状态为"欠货" 2.未欠货(出库单据欠货状态全部为"未欠货"出库任务状态为"未欠货"）
       "ckrwZlStatus": 2,                   滞留状态（滞留状态1.滞留，2.未滞留）
       "ckrwWls": "jinan",                  物流商
       "ckrwArehouseId": 1,                 仓库id（基本没用）
       "ckrwClientId": 1,                   客户ID
       "orderNum": 0,                       订单数
       "goodsTypeNum": 0,                   品项数
     }
 */
        /**
 * TODO 出库任务管理 挑选任务单据完成 POST /mfunck/chooseCompleteByCkrwId
 * 参数类：setModel
 * {
 *  "ids": [
 *    12,
 *    13
 *    ],
 *   "userName": "李四"
 * }
 * 返回 jsonModel  20002成功 50002失败
 */
        /**
 * TODO 激活数据 激活任务单据分页查询 POST /mfunck/selectActivatedCkrwByPage
  * 参数：查询参数对象：ckRwDocPageParam
  * {
      "draw": 0,
      "ckrwNo": "",                任务单号（可模糊查询）
      "ckrwCph": "",               车牌号（可模糊查询）
      "ckrwWls": "",               物流商（可模糊查询）
      "ckrwStartYjdcsj": "",       预计开始到车时间
      "ckrwEndYjdcsj": "",         预计结束到车时间
      "ckrwStartGreatTime": "",    制作开始时间
      "ckrwEndGreatTime": "",      制作结束时间
      "pageNum": 1,                页码
      "pageSize": 10               当页条数
    }
  出库任务对象 mfunckRwDoc
    {
       "ckrwId": 1,                         出库任务ID
       "ckrwNo": "ckrw_no",                 出库任务号
       "ckrwYjdcsj": 1489550217000,         预计到车时间
       "ckrwCph": "CPH",                    车牌号
       "ckrwSjdcsj": 1492150687000,         实际到车时间
       "ckrwStatus": 10,                    出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
       "ckrwQhStatus": 2,                   欠货状态（欠货状态：1.欠货(出库单据中存在"整单欠货"/"部分欠货"出库任务状态为"欠货" 2.未欠货(出库单据欠货状态全部为"未欠货"出库任务状态为"未欠货"）
       "ckrwZlStatus": 2,                   滞留状态（滞留状态1.滞留，2.未滞留）
       "ckrwWls": "jinan",                  物流商
       "ckrwArehouseId": 1,                 仓库id（基本没用）
       "ckrwClientId": 1,                   客户ID
       "orderNum": 0,                       订单数
       "goodsTypeNum": 0,                   品项数
     }
 */
        /**
 * TODO 出库操作 操作出库单据分页查询 POST /mfunck/selectOperateCkDocByPage
 * 参数 查询参数对象：ckDocPageModel
 * {
      "draw": 0,
      "ckCkdjNo": "",               出库单号（可模糊查询）
      "pageNum": 1,                 页码
      "pageSize": 10,               当页条数
      "ckStatus": 1,                出库单状态  21部分分拣，未下架状态 22部分出库，已下架 31全部分拣，未下架 32全部出库，下架完成
      "ckCkdjClientname": "",       客户名称（可模糊查询）
      "ckrwCph": "",                车牌号（可模糊查询）
      "ckrwWls": "",                物流商（可模糊查询）
      "mhStartCreateTime": "",      制作开始时间
      "mhEndCreateTime": "",        制作结束时间
      "ckStartXdsj": "",            下单开始时间
      "ckEndXdsj": ""               下单结束时间
    }
 * {
      ckCkdjId : 2                              出库单ID
      ckCkdjNo : "jy33333"                      出库单号
      ckErpNo : "testerp_no"                    erp单号
      ckCkdjType : 0                            单据类型（0正常单据，1挂起单据，2滞留单据）
      ckCkdjClientno : "ckdanju"                客户编号
      ckCkdjClientname : "高新区银座超市"        客户名称
      ckContacts : "郭靖"                        联系人
      ckTel : "15689878987"                     电话
      ckAdress : "高新区银座超市"                地址
      ckXdsj : 1486531654000                    下单时间
      ckBjsj : 1487741258000                    编辑时间
      ckYfhsj : 1487827662000                   预发货时间
      ckRemarks : "rrrrrrr"                     备注
      ckStatus : 1                              出库单状态（1初始 21部分分拣，未下架状态 22部分出库，已下架 31全部分拣，未下架 32全部出库，下架完成41已挂起， 50作废）
      ckIsauto : 1                              制单方式（1手动 2 excel 3接口）
      ckCksj : 1486445274000                    出库时间
      ckStartwith : 0                           设备端（1电脑端 2PDA）
      ckIsyadan : 1                             是否压单（1是2否）
      ckIsqianhuo : 1                           是否欠货（1是2否）
      ckArehouseId : 1                          仓库ID
      ckClientId : 2                            客户ID
      ckEndtime : 1487050087000                 pda结束时间
      ckRwStatus : 1                            出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
      ckQhStatus : 3                            欠货状态（1.整单欠货(明细欠货状态全部为"全部欠货"出库单状态为"整单欠货"，2.部分欠货(明细欠货状态存在"未欠货","部分欠货"出库单状态为"部分欠货"，3.未欠货(明细欠货状态全部为"未欠货",出库单据为"未欠货"）
      ckZlStatus : 1                            滞留状态（1.未到车滞留(出库单据明细滞留状态全部为"未到车滞留"出库单据滞留状态为"未到车滞留"，2.到车滞留(出库单据明细滞留状态存在"到车滞留"出库单据滞留状态为"到车滞留"，3.未滞留(出库单据明细滞留状态全部为"未滞留",出库单据滞留状态为"未滞留"）
      ckGqStatus : 1                            挂起状态（1.未挂起，2.已挂起）
      ckrwId : 0                                出库任务ID
      mfunckDocs []                             出库明细对象
      allCount : null                           总数量
      allTj : null                              总体积
      allHeight : null                          总重量
      }
 */
        /**
 * TODO 出库发运 出库任务发运单据分页查询 POST /mfunck/selectDespatchCkrwByPage
 * 参数：查询参数对象：ckRwDocPageParam
 * {
      "draw": 0,
      "ckrwNo": "",                任务单号（可模糊查询）
      "ckrwCph": "",               车牌号（可模糊查询）
      "ckrwWls": "",               物流商（可模糊查询）
      "ckrwStartYjdcsj": "",       预计开始到车时间
      "ckrwEndYjdcsj": "",         预计结束到车时间
      "ckrwStartSjdcsj": "",       实际开始到车时间
      "ckrwEndSjdcsj": "",         实际结束到车时间
      "ckrwStartGreatTime": "",    制作开始时间
      "ckrwEndGreatTime": "",      制作结束时间
      "pageNum": 1,                页码
      "pageSize": 10               当页条数
    }
 出库任务对象 mfunckRwDoc
     {
        "ckrwId": 1,                         出库任务ID
        "ckrwNo": "ckrw_no",                 出库任务号
        "ckrwYjdcsj": 1489550217000,         预计到车时间
        "ckrwCph": "CPH",                    车牌号
        "ckrwSjdcsj": 1492150687000,         实际到车时间
        "ckrwStatus": 10,                    出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
        "ckrwQhStatus": 2,                   欠货状态（欠货状态：1.欠货(出库单据中存在"整单欠货"/"部分欠货"出库任务状态为"欠货" 2.未欠货(出库单据欠货状态全部为"未欠货"出库任务状态为"未欠货"）
        "ckrwZlStatus": 2,                   滞留状态（滞留状态1.滞留，2.未滞留）
        "ckrwWls": "jinan",                  物流商
        "ckrwArehouseId": 1,                 仓库id（基本没用）
        "ckrwClientId": 1,                   客户ID
        "orderNum": 0,                       订单数
        "goodsTypeNum": 0,                   品项数
      }
 */
        /**
 * TODO 回收存档 回收存档出库单据分页查询 POST /mfunck/selectConserveCkDocByPage
 * 参数 查询参数对象：ckDocPageModel
 * {
      "draw": 0,
      "ckCkdjNo": "",               出库单号（可模糊查询）
      "mhStartCreateTime": "",      制作开始时间
      "mhEndCreateTime": "",        制作结束时间
      "ckStartXdsj": "",            下单开始时间
      "ckEndXdsj": ""               下单结束时间
    }
 * {
      ckCkdjId : 2                              出库单ID
      ckCkdjNo : "jy33333"                      出库单号
      ckErpNo : "testerp_no"                    erp单号
      ckCkdjType : 0                            单据类型（0正常单据，1挂起单据，2滞留单据）
      ckCkdjClientno : "ckdanju"                客户编号
      ckCkdjClientname : "高新区银座超市"        客户名称
      ckContacts : "郭靖"                        联系人
      ckTel : "15689878987"                     电话
      ckAdress : "高新区银座超市"                地址
      ckXdsj : 1486531654000                    下单时间
      ckBjsj : 1487741258000                    编辑时间
      ckYfhsj : 1487827662000                   预发货时间
      ckRemarks : "rrrrrrr"                     备注
      ckStatus : 1                              出库单状态（1初始 21部分分拣，未下架状态 22部分出库，已下架 31全部分拣，未下架 32全部出库，下架完成41已挂起， 50作废）
      ckIsauto : 1                              制单方式（1手动 2 excel 3接口）
      ckCksj : 1486445274000                    出库时间
      ckStartwith : 0                           设备端（1电脑端 2PDA）
      ckIsyadan : 1                             是否压单（1是2否）
      ckIsqianhuo : 1                           是否欠货（1是2否）
      ckArehouseId : 1                          仓库ID
      ckClientId : 2                            客户ID
      ckEndtime : 1487050087000                 pda结束时间
      ckRwStatus : 1                            出库任务状态（任务状态10.初始，11.下发 21.已挑选，31.已激活，41部分出库，42全部出库，51部分发运，52全部发运）
      ckQhStatus : 3                            欠货状态（1.整单欠货(明细欠货状态全部为"全部欠货"出库单状态为"整单欠货"，2.部分欠货(明细欠货状态存在"未欠货","部分欠货"出库单状态为"部分欠货"，3.未欠货(明细欠货状态全部为"未欠货",出库单据为"未欠货"）
      ckZlStatus : 1                            滞留状态（1.未到车滞留(出库单据明细滞留状态全部为"未到车滞留"出库单据滞留状态为"未到车滞留"，2.到车滞留(出库单据明细滞留状态存在"到车滞留"出库单据滞留状态为"到车滞留"，3.未滞留(出库单据明细滞留状态全部为"未滞留",出库单据滞留状态为"未滞留"）
      ckGqStatus : 1                            挂起状态（1.未挂起，2.已挂起）
      ckrwId : 0                                出库任务ID
      mfunckDocs []                             出库明细对象
      allCount : null                           总数量
      allTj : null                              总体积
      allHeight : null                          总重量
      }
 */
        /**
 * TODO 出库单管理 根据发运任务Id查询状态为（部分出库，全部出库）的出库单 POST /mfunck/selectDespatchCkDocByCkrwId
 * 参数类 setModel
 * {
 *   "id": 5
 *  }
 *  返回jsonModel mfunckDoc 出库单集合
 */
        /**
 * TODO 出库任务管理 修改出库发运数量 POST /mfunck/editGoodsCountByMfunckDocs
 * {
 *     cksCkmxId                        出库明细ID
 *     cksGoodsId                        货品ID
 *     cksGoodsCount                     货品数量
 *     cksDwid                           单位ID
 *     cksCkfs                           出库方式（分拣方式）
 *     cksLocationId                      货品库存ID
 *     cksStatus                         出库单明细 发货状
 *     cksCkdjId                         出库单据ID
 *     cksFyCount                         修改后的发运数量
 * }

         *
 *
 */
        /**  TODO 欠货补发信息
 *   补发单号
 *   补发情况
 *   欠货备注
 *   补发状态
 *     1.已补发
 *     2.已赔付
 *     3.需跟进
 *  TODO 滞留补发信息
 *    任务号
 * TODO 库内管理
 * TODO 库位转移
 * TODO 库存转移确认
 * TODO 库存冻结/解冻
 * TODO 入库日报
 * TODO 出库日报
 * TODO 动碰查询
 * TODO 库存查询
    /**
    * TODO 入库单据查询
    */
        /**
     *  TODO 分页查询
         "rkArehouseId":"仓库",
         "rkCreatetime":"下单时间",
         "rkrkSjsj":"上架开始时间",
         "rkEndTime":"上架结束时间",
         "rkStatus":"入库状态",
         "rkRkdjNo":"入库单号",
         "rkZdfs":"制作方式",
         "rkStartwith":"操作方式",
         "allSL":"总数量",
         "allTJ":"总体积",
         "sssl":"实收数量",
         "sstj":"实收体积",
         "mdtUserId":"上架人员"
     */
        /**
         * TODO 查看入库明细信息
         货品编号       rksGoodsId(关联货品表)
         货品名称       rksGoodsId(关联货品表)
         货品批次       mdtBatch
         货品数量       rksCount
         货品体积       bgGoodsTj
         实收数量       sum(mdt_count)(暂用sssl)
         实收体积       (暂用sstj)
         入库明细状态   rksStatus
         上架人员       mdtUserId(多个上架人员,在一列显示逗号隔开)
         */
        /**
         * TODO 查看入库储位信息
         货品编号    rksGoodsId(关联货品表)
         货品名称    rksGoodsId(关联货品表)
         货品批次    mdtBatch
         上架库位    mdtLocationId
         上架数量    mdtCount
         实收体积    (暂用shtj)
         上架人员    mdtUserId(多个上架人员,在一列显示逗号隔开)
         上架时间    mdtSjsj
         */

/**
 * TODO 0 出库任务-查询-任务单 /mfunck/selectMfunckRwByPage
 */
/**
 * TODO 1 出库任务-查询-任务单-详情 /mfunck/checkCkrwInfoByCkrwId
 */
/**
 * TODO 2 出库任务-查询-任务单-详细-明细 /mfunck/checkMfunckDocsByCkdjId
 */
/**
 * TODO 3 出库任务-下发 /mfunck/issuedCkrw
 *
 {
  "ids": [
    1,2,3
  ],
  "userName": "超Q"
}
 */
/**
 * TODO 4 出库任务-倒车 /mfunck/editSJdcsjByCkrwId
 *
 {
  "id": 10,
  "ckrwSjdcsj": "2017-05-08T03:14:27.609Z",
  "userName": "张三"
}
 */
/**
 * TODO 5 出库任务-修改-任务单 /mfunck/editCkrw
 *
 *
 {
   "ckrwId":10,
   "ckrwNo": "CK20170509-03",
   "ckrwYjdcsj": "2017-04-18T03:45:44.353Z",
   "ckrwCph": "鲁A56895",
   "ckrwQhStatus": "1",
   "ckrwZlStatus": "1",
   "ckrwWls": "佳怡物流",
   "ckrwArehouseId": 1,
   "ckrwClientId": 1,
 "userName":"超级管理员",
   "ckCkdjIds": [
     43,
     44
   ]
 }

 */
/**
 * TODO 6 出库任务-取消任务 /mfunck/checkMfunckDocsByCkdjId

 {
  "id": 10,
  "userName": "张三"
}

 */
/**
 * TODO 7 出库任务-挂起单据 /mfunck/hangUpCkdocByCkdjId
 *
 *ids 为 出库单id
 {
  "id": 10,
  "userName": "string"
}
 */
/**
 * TODO 8 出库任务-取消挂起 /mfunck/cancelHangUpCkdocByCkdjId
 *
 *ids 为 出库单id
 {
   "id":10,
   "userName": "string"
 }
 */
/**
 * TODO 9 出库任务-修改分拣方式 /mfunck/editCkDocsFJFSByCkmxId
 *
 *
 {
  "cksCkmxId  ": 1,
  "cksCkfs   ": "X"
}


 库位
 {
  "cksCkmxId": 14,
  "cksCkfs": "K",
"cksLocationId": 1
}

 批次    TODO 日期

 {
  "cksCkmxId": 14,
  "cksCkfs": "P",
"cksZdpc": 1
}

 */
/**
 * TODO 挑选单据
 */
        /**
         *  TODO 0 挑选单据-查询-任务单据 POST /mfunck/selectChooseCkrwByPage
         {
           "draw": 0,
           "ckrwNo": "",               任务单号（可模糊查询）
           "ckrwCph": "",              车牌号（可模糊查询）
           "ckrwWls": "",              物流商（可模糊查询）
           "ckrwStartGreatTime": "",   制作开始时间
           "ckrwEndGreatTime": "",     制作结束时间
           "pageNum": 1,               页码
           "pageSize": 10              当页条数
         }
         */
        /**
         *  TODO 1 挑选单据-挑选完成 POST /mfunck/chooseCompleteByCkrwId
         *
         *
         *ids 为 出库单id
         {
           "ids":[2],
           "userName": "string"
         }
         *
         */
/**
 * TODO  激活单据分页查询
 */
    /**
     * TODO 0 激活单据-查询-任务单  POST /mfunck/selectActivatedCkrwByPage
     *  * 参数
             {
             "draw": 0,
             "ckrwNo": "",                    (任务单号)
             "ckrwCph": "",                    (车牌号)
             "ckrwWls": "",                         (物流商)
             "ckrwStartYjdcsj": "",        (预计到车时间)
             "ckrwEndSjdcsj": "",          (实际倒车时间)
             "ckrwStartGreatTime": "",                  (创建时间/制作时间)
             "ckrwEndGreatTime": "",                    (创建结束时间)
             "pageNum": 1,
             "pageSize": 10
            }
     */
    /**
     * TODO 1 激活任务
     *
     * 参数 setModel
     {
         "ids": [ 1,2,3,4], 任务ID（多个）
        "useId": 1,      操作员ID
        "userName": "超级管理员"   操作员名称
}
     */
    /**
 * TODO 2 根据出库明细id修改分拣方式 POST /mfunck/editCkDocsFJFSByCkmxId
 * 参数 参数对象：paramsModel
 * {
 *   "cksCkmxId": ,     出库明细id
 *   "cksCkfs": "",     分拣方式 先进先出,指定批次,指定库位(x：p：k)
 *   "cksZdpc": "",     指定批次（x,k时为空，不用传）
 *   "cksLocationId": 1  指定库位（x,p时为空，不用传）
 * }
 * 返回 jsonModel  20002成功 50002失败
 */
/**
 * TODO 3 追加分拣  POST /mfunck/bujianById
 *          参数名称 ：serModel
 *        {
         *           "id": 43, 出库单据ID
         *          "useId": 1  操作员ID
         *         }
 */
/**
 *  TODO 4 挂起确认 POST  /mfunck/guaQiById
 *      参数名称 ：serModel
 *      {
         *          "id": 37,  出库单据ID
         *          "useId": 1  操作员ID
         *          "userName": "超级管理员"   操作员名称
         *      }
 */
/**
 *  TODO 5 激活单据 POST /mfunck/fenjianById
 *      参数名称 ：serModel
 *      {
         *         "id": 44,  出库单据ID
         *         "useId": 1  操作员ID
         *       }
 */
/**
 *  TODO 6 修改出库明细分拣数量 POST /mfunck/xiugaifenjian
 *          参数名称 ：serModel
 *      {
         *           "id": 123, 出库单明细ID
         *          "useId": 1,  操作员ID
         *        "mxCount": 7，  修改后的数量（小于分拣数量）
         *        "mxsXt": 1,修改数量原因(下拉框选择 1货品损坏2库存不足3其它)
         *     }
 */

/**
 * TODO 出库操作
 */
/**
 * TODO 0 出库操作 出库单据分页查询 POST /mfunck/selectOperateCkDocByPage
          {
          "draw": 0,
          "ckCkdjNo": "",           (出库单号)
          "pageNum": 1,
          "pageSize": 10,
          "ckStatus": -1,           (状态)
          "ckCkdjClientname": "",   (客户名称)
          "ckrwCph": "",            (车牌号)
          "ckrwWls": "",            (物流商)
          "mhStartCreateTime": "",  (制作时间)
          "mhEndCreateTime": "",
          "ckStartXdsj": "",        (下单时间)
          "ckEndXdsj": ""
         }

 */
/**
 * TODO 出库发运
 */
/**
 * TODO 0 分页查询 POST /mfunck/selectDespatchCkrwByPage
 * 参数：
      {
      "draw": 0,
      "ckrwNo": "",
      "ckrwCph": "",
      "ckrwWls": "",
      "ckrwStartYjdcsj": "",
      "ckrwEndSjdcsj": "",
      "ckrwStartSjdcsj": "",
      "ckrwEndYjdcsj": "",
      "ckrwStartGreatTime": "",
      "ckrwEndGreatTime": "",
      "pageNum": 1,
      "pageSize": 10
    }

 *
 */
    /**
     * TODO 回收存档
     */
        /**
         * TODO 0 分页查询 POST /mfunck/selectConserveCkDocByPage
         * 参数
         * {
                "draw": 0,
                "ckCkdjNo": "jy33333",                              (出库单号)
                "pageNum": 1,
                "pageSize": 10,
                "mhStartCreateTime": "2017-04-01T00:00:00.000Z",    (创建时间/制作时间)
                "mhEndCreateTime": "2017-04-22T00:00:00.000Z",      (创建时间/制作时间)
                "ckStartXdsj": "2017-02-01T00:00:00.000Z",          (下单时间)
                "ckEndXdsj": "2017-02-22T00:00:00.000Z"             (下单时间)
            }
         */
        /**
         * TODO 1 欠货不发信息
         */
        /**
        * TODO 2 滞留不发信息
        */
        /**
         * TODO 3 导出欠货
         */
        /**
         * TODO 4 导出滞留
         */
/**
 *  参数类：ckDocPageModel
         *  实例：
         *  {
              "draw": 0,
              "ckCkdjNo": "jy1333",                        （出库单号）
              "pageNum": 1,
              "pageSize": 10,
              "ckStatus": 0,                               （出库单状态）
              "ckCkdjClientno": "jd465",                   （客户编号）
              "ckCkdjClientname": "九阳",                  （客户名称）
              "ckCkdjType": 0,                             （单据类型）
              "ckArehouseId": 1,                           （仓库ID）
              "mhStartCreateTime": "2017-03-12",           （激活开始时间）
              "mhEndCreateTime": "2017-03-12",             （激活结束时间）
              "ckStartXdsj": "2017-03-12",                 （下单开始时间）
              "ckEndXdsj": "2017-03-12",                   （下单结束时间）
              "ckEndtime": "2017-03-12",                   （下架结束时间）
              "ckCksj": "2017-03-12",                      （下架开始时间）
              "ckZlStatus": 0,                             （滞留状态）
              "ckTel": "138",                              （电话）
              "ckContacts": "郭靖",                         （联系人）
              "ckAdress": "济南市",                         （地址）
              "ckIsauto": 0,                                （制单方式）
              "ckStartwith": 0,                             （操作方式）
              "ckQhStatus": 0                               （缺货状态）
            }
         返回 pagelist

         *  搜索条件的字段
                仓库             ckArehouseId
                下单时间         ckXdsj
                激活时间         mhCreatetime
                下架开始时间     ckCksj
                下架结束时间     ckEndtime
                出库单据状态     ckStatus  出库单据状态(1初始 21部分分拣，未下架状态 22部分出库，已下架 31全部分拣，未下架 32全部出库，下架完成 50作废)
                是否欠货         ckQhStatus 欠货状态
                                 1.整单欠货(明细欠货状态全部为"全部欠货"出库单状态为"整单欠货")
                                 2.部分欠货(明细欠货状态存在"未欠货","部分欠货"出库单状态为"部分欠货")
                                 3.未欠货(明细欠货状态全部为"未欠货",出库单据为"未欠货")
                是否滞留         ckZlStatus  滞留状态
                                 1.未到车滞留(出库单据明细滞留状态全部为"未到车滞留"出库单据滞留状态为"未到车滞留")
                                 2.到车滞留(出库单据明细滞留状态存在"到车滞留"出库单据滞留状态为"到车滞留")
                                 3.未滞留(出库单据明细滞留状态全部为"未滞留",出库单据滞留状态为"未滞留")
                联系电话         ckTel
                联系人           ckContacts
                客户编号         ckCkdjClientno
                客户名称         ckCkdjClientname
                出库单号         ckCkdjNo
                客户地址         ckAdress
                制作方式         ckIsauto制单方式(1手动 2excel/导入 3接口)
                操作方式         ckStartwith 1电脑端 2PDA
                单据类型         ckCkdjType 出库 单据类型 0正常单据 1挂起单据    2滞留单据
         一级菜单：出库单
         {
                TODO 仓库        ckArehouseId
                出库单号            ckCkdjNo
                单据类型            ckCkdjType
                单据状态            ckStatus    1:'初始',  21:'部分分拣'  22:'部分出库', 31:'全部分拣', 32:'全部出库 50:'作废',
                欠货状态            ckQhStatus
                滞留状态            ckZlStatus
                TODO 总数量       sum(cksGoodsCount)(暂用allSL)                allCount
                TODO 总体积       (暂用allTJ)                                  allTj
                TODO 下架数量     sum(msxMxCount)(暂用xjsl)                    allSortingCount
                TODO 下架体积     (暂用xjtj)                                   allSortingTj
                TODO 欠货数量     sum(cksQhCount)(暂用qhsl)                    allQhCount
                TODO 欠货体积     cksQhCount*bgGoodsTj(暂用qhtj)               allQhTj
                滞留数量            cksZlCount                                        allZlCount
                TODO 滞留体积     cksZlCount*bgGoodsTj(暂用zltj)               allZlTj
                客户编号            ckCkdjClientno
                客户名称            ckCkdjClientname
                客户地址            ckAdress
                联系电话            ckTel
                制作方式            ckIsauto
                操作方式            ckStartwith
                激活人员            ckrwHistoryOperator
                TODO 备货人员      msUserId
                下架人员            msxXjry（多个）
          }
         二级菜单：出库明细 POST /mfunck/findMfunckDocsByCkCkdjId
         参数类： setModel
         {
           "id": 2     (出库单ID)
         }
         返回 jsonModel mfunckDocs 出库明细集合

         {
                TODO 货品编号     cksGoodsId(关联货品表)
                TODO 货品名称     cksGoodsId（关联货品表）
                货品数量            cksGoodsCount
                TODO 货品体积     cksGoodsCount*bgGoodsTj(暂用hptj)    goodsTj
                下架数量            msxMxCount                               sortingCount
                TODO 下架体积     msxMxCount*bgGoodsTj(暂用xjtj)       sortingTj
                欠货数量            cksQhCounts
                TODO 欠货体积     cksQhCounts*bgGoodsTj(暂用qhtj)      cksQhTj
                滞留数量            cksZlCount
                TODO 滞留体积     cksZlCount*bgGoodsTj(暂用zltj)       cksZlTj
                欠货(补发)单号      cksBfNo
                滞留任务号          cksZlbfInfo
                发运数量            cksFyCount
                TODO 发运体积     cksFyCount*bgGoddsTj(暂用fytj)        cksFyTj
                欠货备注            cksQhRemarks
                补发状态            cksBfStatus
         }
         三级菜单： 分拣明细 POST /mfunck/findMfunckSortingMxByCkmxId
         参数类： setModel
         {
           "id": 35       (出库明细ID)
         }
         返回 jsonModel mfunckSortingMx （分拣明细集合）
         {
                TODO 货品编号   msxHpkcid（关联货品库存表再关键货品表）
                TODO 货品名称   msxHpkcid（关联货品库存表再关联货品表）
                TODO 下架库位   msxHpkcid（关联货品库存表再关联库位表）
                下架数量         msxMxCount
                TODO 下架体积   msxMxCount*bgGoodsTj(暂用xjtj)                sortingTj
                TODO 下架批次   msx_hpkcid（关联货品库存表取mr_good_batch）
                操作人员         msxXjry
                操作时间         msxQrsj
                修改分拣数量原因 msxWt
         }
         *
         *
         */
    /**
     * TODO 货品流向查询 goodsFlowSelect
     */
        /**
         *  分页查询
         *  搜索条件
         *  {
                    仓库              ckArehouseId
                    TODO 货品名称    msxHpkid（关联货品库存表再关联货品表）
                    TODO 货品编号    msxHpkid（关联货品库存表再关联货品表）
                    客户名称          ckCkdjClientname
                    客户地址          ckAdress
                    联系人            ckContacts
                    联系电话          ckTel
                    客户编号          ckCkdjClientno
                    出库单号          ckCkdjNo
            }
         *  分页查询的字段
         *  {
                TODO 仓库        ckArehouseId
                出库单号           ckCkdjNo
                客户编号           ckCkdjClientno
                客户名称           ckCkdjClientname
                联系人             ckContacts
                联系电话           ckTel
                TODO 货品名称    msxHpkid（关联货品库存表再关联货品表）
                TODO 货品编号    msxHpkid（关联货品库存表再关联货品表）
                货品数量          msxMxCount
                TODO 货品体积   msxMxCount*base_goods：bg_goods_tj(暂用hptj)
                客户地址         ckAdress
            }
         */
    /**
     * TODO 库位转移查询
     *
     */
    /**
     * 分页查询
     * 搜索条件
     *  {
            创建时间    zyCreateTime
            确认时间    zyConfirmTime
            TODO 仓库        zyArehouseId
            TODO 创建人     zyCreateUserId
            TODO 确认人     zyConfirmUserId
            TODO 提起人     zyMentionUserId
            转移状态        zyStatus 转移状态0 初始 1 确认 2 作废
        }
     查询的字段
     一级(库存转移主表)显示列
     {
            创建时间    zyCreateTime
            确认时间    zyConfirmTime
            仓库       zyArehouseId
            创建人     zyCreateUserId
            确认人     zyConfirmUserId
            提起人     zyMentionUserId
            转移状态    zyStatus
            转移原因    zyReason
     }
     二级(库存转移明细表)显示列
     {
            货品编号    zysRepertoryId(关联货品表)
            货品名称    zysRepertoryId(关联货品表)
            货品批次    zysRepertoryId
            转移前库位   zysZyBeforeLocationId
            转移后库位   zysZyAfterLocationId
            转移数量     zysZyCount
     }



     */
    /**
 * 库位冻结查询
 */
       /**
        * 分页查询
        * 搜索条件
        * {
               创建时间     djCreateTime
               解冻时间     djJdTime
               创建人       djCreateUserId
               解冻人       djJdUserId
               仓库         djArehouseId
               冻结状态     djStatus 0 冻结 1 解冻   2 作废
       }
        一级页面(库存冻结主表)显示列
        {
               创建时间     djCreateTime
               解冻时间     djJdTime
               创建人      djCreateUserId
               解冻人      djJdUserId
               仓库       djArehouseId
               冻结状态   djStatus
               作废人员   djZfUserId
               作废时间   djZfTime
        }
        二级页面(库存冻结明细表)显示列
        {
              库位名称    djsRepertory
              货品编号    djsRepertory
              货品名称    djsRepertory
              货品批次    djsRepertory
              状态        djsStatus 0.已冻结 1.未冻结(可用)
              冻结数量    djsRepertory
        }


        */
    /**
         * TODO 盘点查询
         */
        /**
             * TODO 0  分页查询
                * 搜索条件
                * {
                       创建时间    pdCreateTime
                       创建人      pdCreateUserId
                       经办人      pdOperator
                       盘点状态    pdStatus     0 初始     1 盘点确认 2 作废
                       差异状态    pdDiffStatus 0 无差异   1 有差异
                       仓库        pdArehouseId
                       盘点类型    pdType       0 异动盘点 1 货品盘点 2 全仓盘点
                   }
                    一级页面(盘点计划主表)显示列
                        {
                               仓库              pdArehouseId
                               创建时间          pdCreateTime
                               盘点类型          pdType
                               异动开始时间      pdYdBeginTime
                               异动结束时间      pdYdEndTime
                               盘点状态          pdStatus
                               负责人            pdChargePerson
                               经办人            pdOperator
                               差异状态          pdDiffStatus
                        }
                        二级页面(盘点计划明细表)显示列
                        {
                               库位名称    pdsRepertoryId(关联)
                               货品编号    pdsGoodsId
                               货品名称    pdsGoodsId
                               计划数量    pdsRepertoryCount
                               盘点数量    pdsPdCount
                        }



 */
        /**
         * TODO 1 盘点详情(盘点明细表mfunpd_docs)
                pdsId               盘点计划明细主键
                pdsPdId             盘点计划主键ID
                pdsGoodsId          货品ID
                pdsLocationId       库位ID
                pdsRepertoryCount   库存数量
                pdsPdCount          盘点数量
                pdsDiffStatus       差异状态 0 无差异  1 有差异
                pdsStatus           盘点状态0 未盘点 1 已盘点
                pdsUserId           盘点人员id
                pdsPdTime           盘点时间
         */
/**
     * TODO 库内管理
     */
    /**
 *TODO 库位转移
 *
 */
        /**
 * TODO 0 分页查询库位转移 POST /stockZyDoc/page
 * {
          "startTimeParam": "string",     开始时间
          "endTimeParam": "string",       结束时间
          "zyStatus": 0,                  转移状态
          "zyMentionUserName": "string",  提起人
          "zyCreateUserName": "string",   创建人
          "pageNum": 0,
          "pageSize": 0,
          "draw": 0
        }
 *
 */
        /**
 * TODO 1 新增   POST /stockZyDoc
 * {
            "zyMentionUserId": 1,                 提起人id
            "zyMentionUserName": "string",        提起人名称
            "zyReason": "string",                 转移原因
            "zyStatus": "0",                      转移状态
            "zyCreateUserId": 1,                  创建人id
            "zyCreateUserName": "string",         创建人名称
            "zyConfirmUserId": 1,                 确认人id
            "zyConfirmUserName": "string",        确认人名称
            "zyCancelUserId": 1,                  作废人id
            "zyCancelUserName": "string",         作废人名称
            "zyArehouseId": 1,                    仓库id
            "zyDocsList": [            转移明细
                {
                    "zysRepertoryId": 176,        合并后的库存id
                    "zysZyBeforeLocationId": 2,   转移前储位id
                    "zysZyAfterLocationId": 1,    转移后储位id
                    "zysZyBeforeKyCount": 190,    转移前的可用数量
                    "zysZyCount": 90              转移数量
                },
                {
                    "zysRepertoryId": 183,
                    "zysZyBeforeLocationId": 3,
                    "zysZyAfterLocationId": 1,
                    "zysZyBeforeKyCount": 720,
                    "zysZyCount": 100
                }
            ]
        }
 */
        /**
 *  TODO 2 编辑    PUT /stockZyDoc
 *  {
            "zyId":9,                                 转移单id
            "zyMentionUserId": 1,                     提起人id
            "zyMentionUserName": "string",            提起人名称
            "zyReason": "string",                     转移原因
            "zyStatus": "0",                          转移状态
            "zyCreateUserId": 1,                      创建人id
            "zyCreateUserName": "string",             创建人名称
            "zyCreateTime":"2017-04-20T11:56:42.597Z",创建时间
            "zyConfirmUserId": 1,                     确认人id
            "zyConfirmUserName": "string",            确认人名称
            "zyCancelUserId": 1,                      作废人id
            "zyCancelUserName": "string",             作废人名称
            "zyArehouseId": 1,                        仓库id
            "zyDocsList": [                           转移明细id
                {
                    "zysRepertoryId": 176,            合并后的库存id
                    "zysZyBeforeLocationId": 2,       转移前库位id
                    "zysZyAfterLocationId": 1,        转移后库位id
                    "zysZyBeforeKyCount": 340,        转移前可用数量
                    "zysZyCount": 150                 转移数量
                },
                {
                    "zysRepertoryId": 183,
                    "zysZyBeforeLocationId": 3,
                    "zysZyAfterLocationId": 1,
                    "zysZyBeforeKyCount": 720,
                    "zysZyCount": 200
                }
            ]
        }
 */
        /**
 *  TODO 3 库存管理 分页 根据货品id 库位id 仓库id 合并获取库存单据 POST /repertory/groupPage
 {
"data": [
{
"mrRepertoryId": 107,
"mrLocationId": 3,
"mrGoodsId": 13,
"mrGoodsBatch": "2017-04-26",
"mrDwid": 1,
"mrCount": 40,
"mrDxjCount": 0,
"mrDjCount": 0,
"mrDjStatus": true,
"mrDzyCount": 0,
"mrKcydsj": 1493197331000,
"mrArehouseId": 1,
"kyCount": 40,
"baseLocation": {
"blLocationId": 3,
"blLname": "H16-39-A4",
"blRegionId": 1,
"blLtray": 21,
"blLorder": 3,
"blStatus": 1,
"blArehouseId": 1
},
"baseGoods": {
"bgGoodsId": 13,
"bgGoodsNo": "13701003002",
"bgGoodsName": "电热锅、JK-28R2（28R2-A）、红色+黑色+不锈钢一体、3L、220V、2100W、50HZ、内销、I类结构",
"bgNamejc": "电热锅、JK-28R2（28R2-A）、红色+黑色+不锈钢一体、3L、220V、2100W、50HZ、内销、I类结构",
"bgT": null,
"bgI": null,
"bgHsl": 4,
"bgZxdw": 8,
"bgSzdw": 1,
"bgStatus": 1,
"bgArehouseId": 1,
"bgClientId": 2,
"bgGoodsType": "",
"bgGoodsTj": 23.83,
"bgGoodsZl": 2,
"bgGoodsPrice": null,
"bgCreatetime": 1488942628000,
"bgRemarks": "",
"bgGoodsGg": "",
"baseDws": null
},
"baseDw": {
"bdDwId": 1,
"bdName": "台",
"bdStatus": 2,
"bdIsdel": true,
"bdCreatetime": 1488786104000
},
"baseArehouse": {
"baArehouseId": 1,
"baName": "九阳齐河仓",
"baAddr": "齐河",
"baScity": "济南",
"baScontacts": "联系人1",
"baPhone": "13267890789",
"baAcreage": "baAcreage",
"baCtype": "baCtype",
"baHumidity": "baHumidity",
"baFax": "baFax",
"baPostoffice": "baPostoffice",
"baIsti": 1,
"baStatus": 1,
"baClientId": 1,
"baRemarks": "baRemarks",
"baCreatetime": 1488092935000,
"baPgroupinfo": null,
"arehouseKqs": null
},
"baseArehouseKq": null
}
],
"draw": 0,
"recordsTotal": 1,
"recordsFiltered": 1
}

 */
        /**
 * TODO 4 库存转移 软删除多个或单个库存转移数据  POST  /stockZyDoc/deleteOfSoft
 */
        /**
            * TODO 5 分页获取库存转移单据(包含详细信息) POST /stockZyDoc/selectByPage
         * {
  "data": [
    {
      "zyId": 7,
      "zyMentionUserId": 1,
      "zyMentionUserName": "超级管理员",
      "zyReason": "string",
      "zyStatus": 0,
      "zyCreateUserId": 1,
      "zyCreateUserName": "超级管理员",
      "zyCreateTime": 1494221354000,
      "zyConfirmUserId": null,
      "zyConfirmUserName": "",
      "zyConfirmTime": null,
      "zyCancelUserId": null,
      "zyCancelUserName": "",
      "zyCancelTime": null,
      "zyArehouseId": 1,
      "zyDocsList": [
        {
          "zysId": 8,
          "zysZyId": 7,
          "zysRepertoryId": 205,
          "zysZyBeforeLocationId": 1,
          "zysZyAfterLocationId": 1,
          "zysZyBeforeKyCount": 100,
          "zysZyCount": 0,
          "mfunRepertory": {
            "mrRepertoryId": 205,
            "mrLocationId": 8,
            "mrGoodsId": 1,
            "mrGoodsBatch": "2017-04-27",
            "mrDwid": 1,
            "mrCount": 100,
            "mrDxjCount": 20,
            "mrDjCount": 0,
            "mrDjStatus": true,
            "mrDzyCount": 0,
            "mrKcydsj": 1494315188000,
            "mrArehouseId": 1,
            "kyCount": null,
            "baseLocation": {
              "blLocationId": 8,
              "blLname": "H16-43-A3", --货品库位
              "blRegionId": 4,
              "blLtray": 2,
              "blLorder": 7,
              "blStatus": 1,
              "blArehouseId": 1
            },
            "baseGoods": {
              "bgGoodsId": 1,
              "bgGoodsNo": "13701003002",
              "bgGoodsName": "电热锅、JK-30R2（30R2-A）、红色+黑色+不锈钢一体、3L、220V、2100W、50HZ、内销、I类结构",
              "bgNamejc": "电热锅、JK-30R2（30R2-A）、红色+黑色+不锈钢一体、3L、220V、2100W、50HZ、内销、I类结构",
              "bgT": 50,
              "bgI": 10,
              "bgHsl": 5,
              "bgZxdw": 2,
              "bgSzdw": 1,
              "bgStatus": 1,
              "bgArehouseId": 1,
              "bgClientId": 1,
              "bgGoodsType": "type1",
              "bgGoodsTj": 9,
              "bgGoodsZl": 10,
              "bgGoodsPrice": 70,
              "bgCreatetime": 1489643786000,
              "bgRemarks": "九阳电磁炉",
              "bgGoodsGg": "bg_goods_gg",
              "baseDws": null
            },
            "baseDw": {
              "bdDwId": 1,
              "bdName": "台",
              "bdStatus": 2,
              "bdIsdel": true,
              "bdCreatetime": 1488786104000
            },
            "baseArehouse": null,
            "baseArehouseKq": null,
            "baseRegion": null
          }
        }
      ]
    }
  ],
  "draw": 0,
  "recordsTotal": 5,
  "recordsFiltered": 5
}
         *
        */
        /**
 * TOOD 6  库存转移过程 通过库存转移单据id删除库存转移单据 DELETE /stockZyDoc/{zyId}
 */
        /**
 *  TODO 7 通过库存转移单据id获取一条库存转移单据 GET /stockZyDoc/{zyId}
 */
    /**
 * TODO 库存转移确认
 */
        /**
 * TODO 0 分页查询库位转移 POST /stockZyDoc/page
 * {
          "startTimeParam": "string",     开始时间
          "endTimeParam": "string",       结束时间
          "zyStatus": 0,                  转移状态
          "zyMentionUserName": "string",  提起人
          "zyCreateUserName": "string",   创建人
          "pageNum": 0,
          "pageSize": 0,
          "draw": 0
        }
 *
 */
        /**
 *  TODO 1 库存转移过程 通过库存转移单据id确认转移一条转移单 GET /stockZyDoc/confirmZy/{zyId}
 */
        /**
 * TODO 2 库存转移过程 软删除多个或单个库存转移数据 POST /stockZyDoc/deleteOfSoft
 */
        /**
 * TODO 3 库存转移过程 分页获取库存转移单据 POST /stockZyDoc/page
 */
        /**
 *  TODO 4 库存转移过程 分页获取库存转移单据(包含详细信息) POST /stockZyDoc/selectByPage
 */
        /**
 * TODO 5 库存转移过程 通过库存转移单据id删除库存转移单据 DELETE /stockZyDoc/{zyId}
 */
        /**
 * TODO 6 库存转移过程 通过库存转移单据id获取一条库存转移单据 GET /stockZyDoc/{zyId}
 */
    /**
 * TODO 库存冻结/解冻
 */
        /**
 *      TODO 0 库存冻结过程 分页获取库存冻结单据 POST /stockDjDoc/page
 *      参数
        *  {
         "data": [
           {
             "djId": 3,
             "djReason": "冻结原因",
             "djStatus": 0,
             "djCreateUserId": 1,
             "djCreateTime": 1494238898000,
             "djCreateUserName": "string",
             "djDjUserId": 0,
             "djDjTime": 1493774111000,
             "djJdUserId": 0,
             "djJdTime": 1493774111000,
             "djJdUserName": "",
             "djZfUserId": 0,
             "djZfTime": 1493774111000,
             "djZfUserName": "",
             "djArehouseId": 0,
             "djDocsList": []
           }
         ],
         "draw": 0,
         "recordsTotal": 3,
         "recordsFiltered": 3
         }
 */
        /**
 *  TODO 1 库存冻结过程 分页获取库存冻结单据(包含明细) POST /stockDjDoc/selectByPage
 *  {
  "data": [
    {
      "djId": 3,
      "djReason": "冻结原因",
      "djStatus": 0,
      "djCreateUserId": 1,
      "djCreateTime": 1494238898000,
      "djCreateUserName": "string",
      "djDjUserId": 0,
      "djDjTime": 1493774111000,
      "djJdUserId": 0,
      "djJdTime": 1493774111000,
      "djJdUserName": "",
      "djZfUserId": 0,
      "djZfTime": 1493774111000,
      "djZfUserName": "",
      "djArehouseId": 0,
      "djDocsList": [
        {
          "djsId": 5,
          "djsDjId": 3,
          "djsRepertoryId": 209,
          "djsStatus": 1,
          "mfunRepertory": {
            "mrRepertoryId": 209,
            "mrLocationId": 6,
            "mrGoodsId": 2,
            "mrGoodsBatch": "2017-05-04",
            "mrDwid": 2,
            "mrCount": 100,
            "mrDxjCount": 0,
            "mrDjCount": 0,
            "mrDjStatus": true,
            "mrDzyCount": 100,
            "mrKcydsj": null,
            "mrArehouseId": 1,
            "kyCount": null,
            "baseLocation": {
              "blLocationId": 6,
              "blLname": "H16-43-A1",
              "blRegionId": 2,
              "blLtray": 2,
              "blLorder": 5,
              "blStatus": 1,
              "blArehouseId": 1
            },
            "baseGoods": {
              "bgGoodsId": 2,
              "bgGoodsNo": "13701002007",
              "bgGoodsName": "电火锅、JK-40H8（40H8-A）、浅咖色、φ31cm、1300W、220V、50Hz、内销、I类结构",
              "bgNamejc": "电火锅、JK-40H8（40H8-A）、浅咖色、φ31cm、1300W、220V、50Hz、内销、I类结构",
              "bgT": 50,
              "bgI": 1,
              "bgHsl": 3,
              "bgZxdw": 2,
              "bgSzdw": 1,
              "bgStatus": 1,
              "bgArehouseId": 1,
              "bgClientId": 2,
              "bgGoodsType": "type1",
              "bgGoodsTj": 11,
              "bgGoodsZl": 22,
              "bgGoodsPrice": 33,
              "bgCreatetime": 1487913251000,
              "bgRemarks": "任溶溶",
              "bgGoodsGg": "太太团",
              "baseDws": null
            },
            "baseDw": {
              "bdDwId": 2,
              "bdName": "箱",
              "bdStatus": 1,
              "bdIsdel": true,
              "bdCreatetime": 1488786130000
            },
            "baseArehouse": null,
            "baseArehouseKq": null,
            "baseRegion": null
          }
        }
      ]
    }
  ],
  "draw": 0,
  "recordsTotal": 3,
  "recordsFiltered": 3
}
 */
        /**
 * TODO 2 库存冻结过程 新增库存冻结单据/包含库存冻结单明细 POST /stockDjDoc
 * {
  "djId": 0,
  "djReason": "string",
  "djStatus": "string",
  "djCreateUserId": 0,
  "djCreateTime": "2017-05-08T10:57:34.368Z",
  "djCreateUserName": "string",
  "djDjUserId": 0,
  "djDjTime": "2017-05-08T10:57:34.368Z",
  "djJdUserId": 0,
  "djJdTime": "2017-05-08T10:57:34.368Z",
  "djJdUserName": "string",
  "djZfUserId": 0,
  "djZfTime": "2017-05-08T10:57:34.368Z",
  "djZfUserName": "string",
  "djArehouseId": 0,
  "djDocsList": [
    {
      "djsId": 0,
      "djsDjId": 0,
      "djsRepertoryId": 0,
      "djsStatus": "string",
      "mfunRepertory": {
        "mrRepertoryId": 0,
        "mrLocationId": 0,
        "mrGoodsId": 0,
        "mrGoodsBatch": "string",
        "mrDwid": 0,
        "mrCount": 0,
        "mrDxjCount": 0,
        "mrDjCount": 0,
        "mrDjStatus": true,
        "mrDzyCount": 0,
        "mrKcydsj": "2017-05-08T10:57:34.368Z",
        "mrArehouseId": 0,
        "kyCount": 0,
        "baseLocation": {
          "blLocationId": 0,
          "blLname": "string",
          "blRegionId": 0,
          "blLtray": 0,
          "blLorder": 0,
          "blStatus": 0,
          "blArehouseId": 0
        },
        "baseGoods": {
          "bgGoodsId": 0,
          "bgGoodsNo": "string",
          "bgGoodsName": "string",
          "bgNamejc": "string",
          "bgT": 0,
          "bgI": 0,
          "bgHsl": 0,
          "bgZxdw": 0,
          "bgSzdw": 0,
          "bgStatus": 0,
          "bgArehouseId": 0,
          "bgClientId": 0,
          "bgGoodsType": "string",
          "bgGoodsTj": 0,
          "bgGoodsZl": 0,
          "bgGoodsPrice": 0,
          "bgCreatetime": "2017-05-08T10:57:34.368Z",
          "bgRemarks": "string",
          "bgGoodsGg": "string",
          "baseDws": [
            {
              "bdDwId": 0,
              "bdName": "string",
              "bdStatus": 0,
              "bdIsdel": true,
              "bdCreatetime": "2017-05-08T10:57:34.369Z"
            }
          ]
        },
        "baseDw": {
          "bdDwId": 0,
          "bdName": "string",
          "bdStatus": 0,
          "bdIsdel": true,
          "bdCreatetime": "2017-05-08T10:57:34.369Z"
        },
        "baseArehouse": {
          "baArehouseId": 0,
          "baName": "string",
          "baAddr": "string",
          "baScity": "string",
          "baScontacts": "string",
          "baPhone": "string",
          "baAcreage": "string",
          "baCtype": "string",
          "baHumidity": "string",
          "baFax": "string",
          "baPostoffice": "string",
          "baIsti": 0,
          "baStatus": 0,
          "baClientId": 0,
          "baRemarks": "string",
          "baCreatetime": "2017-05-08T10:57:34.369Z",
          "baPgroupinfo": "string",
          "arehouseKqs": [
            {
              "baqKqId": 0,
              "baqArehouseId": 0,
              "baqKqName": "string",
              "baqIsdel": 0,
              "baqStatus": 0,
              "baseRegions": [
                {
                  "brgRegionId": 0,
                  "brgArehouseId": 0,
                  "brgRegionNo": "string",
                  "brgKqId": 0,
                  "brgRegionStatus": 0,
                  "baseLocationList": [
                    {
                      "blLocationId": 0,
                      "blLname": "string",
                      "blRegionId": 0,
                      "blLtray": 0,
                      "blLorder": 0,
                      "blStatus": 0,
                      "blArehouseId": 0
                    }
                  ]
                }
              ]
            }
          ]
        },
        "baseArehouseKq": [
          {
            "baqKqId": 0,
            "baqArehouseId": 0,
            "baqKqName": "string",
            "baqIsdel": 0,
            "baqStatus": 0,
            "baseRegions": [
              {
                "brgRegionId": 0,
                "brgArehouseId": 0,
                "brgRegionNo": "string",
                "brgKqId": 0,
                "brgRegionStatus": 0,
                "baseLocationList": [
                  {
                    "blLocationId": 0,
                    "blLname": "string",
                    "blRegionId": 0,
                    "blLtray": 0,
                    "blLorder": 0,
                    "blStatus": 0,
                    "blArehouseId": 0
                  }
                ]
              }
            ]
          }
        ],
        "baseRegion": {
          "brgRegionId": 0,
          "brgArehouseId": 0,
          "brgRegionNo": "string",
          "brgKqId": 0,
          "brgRegionStatus": 0,
          "baseLocationList": [
            {
              "blLocationId": 0,
              "blLname": "string",
              "blRegionId": 0,
              "blLtray": 0,
              "blLorder": 0,
              "blStatus": 0,
              "blArehouseId": 0
            }
          ]
        }
      }
    }
  ]
}
 *
 */
        /**
 * TODO 3 库存冻结过程 更新库存冻结数据 PUT /stockDjDoc
 * {
  "djId": 0,
  "djReason": "string",
  "djStatus": "string",
  "djCreateUserId": 0,
  "djCreateTime": "2017-05-08T10:57:34.370Z",
  "djCreateUserName": "string",
  "djDjUserId": 0,
  "djDjTime": "2017-05-08T10:57:34.370Z",
  "djJdUserId": 0,
  "djJdTime": "2017-05-08T10:57:34.370Z",
  "djJdUserName": "string",
  "djZfUserId": 0,
  "djZfTime": "2017-05-08T10:57:34.370Z",
  "djZfUserName": "string",
  "djArehouseId": 0,
  "djDocsList": [
    {
      "djsId": 0,
      "djsDjId": 0,
      "djsRepertoryId": 0,
      "djsStatus": "string",
      "mfunRepertory": {
        "mrRepertoryId": 0,
        "mrLocationId": 0,
        "mrGoodsId": 0,
        "mrGoodsBatch": "string",
        "mrDwid": 0,
        "mrCount": 0,
        "mrDxjCount": 0,
        "mrDjCount": 0,
        "mrDjStatus": true,
        "mrDzyCount": 0,
        "mrKcydsj": "2017-05-08T10:57:34.370Z",
        "mrArehouseId": 0,
        "kyCount": 0,
        "baseLocation": {
          "blLocationId": 0,
          "blLname": "string",
          "blRegionId": 0,
          "blLtray": 0,
          "blLorder": 0,
          "blStatus": 0,
          "blArehouseId": 0
        },
        "baseGoods": {
          "bgGoodsId": 0,
          "bgGoodsNo": "string",
          "bgGoodsName": "string",
          "bgNamejc": "string",
          "bgT": 0,
          "bgI": 0,
          "bgHsl": 0,
          "bgZxdw": 0,
          "bgSzdw": 0,
          "bgStatus": 0,
          "bgArehouseId": 0,
          "bgClientId": 0,
          "bgGoodsType": "string",
          "bgGoodsTj": 0,
          "bgGoodsZl": 0,
          "bgGoodsPrice": 0,
          "bgCreatetime": "2017-05-08T10:57:34.370Z",
          "bgRemarks": "string",
          "bgGoodsGg": "string",
          "baseDws": [
            {
              "bdDwId": 0,
              "bdName": "string",
              "bdStatus": 0,
              "bdIsdel": true,
              "bdCreatetime": "2017-05-08T10:57:34.371Z"
            }
          ]
        },
        "baseDw": {
          "bdDwId": 0,
          "bdName": "string",
          "bdStatus": 0,
          "bdIsdel": true,
          "bdCreatetime": "2017-05-08T10:57:34.371Z"
        },
        "baseArehouse": {
          "baArehouseId": 0,
          "baName": "string",
          "baAddr": "string",
          "baScity": "string",
          "baScontacts": "string",
          "baPhone": "string",
          "baAcreage": "string",
          "baCtype": "string",
          "baHumidity": "string",
          "baFax": "string",
          "baPostoffice": "string",
          "baIsti": 0,
          "baStatus": 0,
          "baClientId": 0,
          "baRemarks": "string",
          "baCreatetime": "2017-05-08T10:57:34.371Z",
          "baPgroupinfo": "string",
          "arehouseKqs": [
            {
              "baqKqId": 0,
              "baqArehouseId": 0,
              "baqKqName": "string",
              "baqIsdel": 0,
              "baqStatus": 0,
              "baseRegions": [
                {
                  "brgRegionId": 0,
                  "brgArehouseId": 0,
                  "brgRegionNo": "string",
                  "brgKqId": 0,
                  "brgRegionStatus": 0,
                  "baseLocationList": [
                    {
                      "blLocationId": 0,
                      "blLname": "string",
                      "blRegionId": 0,
                      "blLtray": 0,
                      "blLorder": 0,
                      "blStatus": 0,
                      "blArehouseId": 0
                    }
                  ]
                }
              ]
            }
          ]
        },
        "baseArehouseKq": [
          {
            "baqKqId": 0,
            "baqArehouseId": 0,
            "baqKqName": "string",
            "baqIsdel": 0,
            "baqStatus": 0,
            "baseRegions": [
              {
                "brgRegionId": 0,
                "brgArehouseId": 0,
                "brgRegionNo": "string",
                "brgKqId": 0,
                "brgRegionStatus": 0,
                "baseLocationList": [
                  {
                    "blLocationId": 0,
                    "blLname": "string",
                    "blRegionId": 0,
                    "blLtray": 0,
                    "blLorder": 0,
                    "blStatus": 0,
                    "blArehouseId": 0
                  }
                ]
              }
            ]
          }
        ],
        "baseRegion": {
          "brgRegionId": 0,
          "brgArehouseId": 0,
          "brgRegionNo": "string",
          "brgKqId": 0,
          "brgRegionStatus": 0,
          "baseLocationList": [
            {
              "blLocationId": 0,
              "blLname": "string",
              "blRegionId": 0,
              "blLtray": 0,
              "blLorder": 0,
              "blStatus": 0,
              "blArehouseId": 0
            }
          ]
        }
      }
    }
  ]
}
 *
 */
        /**
        * TODO 4 库存冻结过程 通过库存冻结/解冻单据 冻结/解冻一条或多条库存单 POST /stockDjDoc/djAndJd
        */
        /**
         * TODO 5 库存冻结过程 通过库存冻结单据id删除库存冻结单据  DELETE /stockDjDoc/{djId}
         */
        /**
         * TODO 6  库存冻结过程 通过库存冻结单据id获取一条库存冻结单据 GET /stockDjDoc/{djId}
         */
/**
 * TODO 库内管理
 */
    /**
 * TODO 动碰盘点
 */
        /**
 * TODO 0 POST /mfunpd/selectDPPDByPage 盘点查询 动碰盘点分页查询
         * {
          "data": [
            {
              "pdId": 1,
              "pdType": 0,
              "pdYdBeginTime": 1493308800000,
              "pdYdEndTime": null,
              "pdZyBeginTime": null,
              "pdZyEndTime": null,
              "pdCreateTime": 1493349660000,
              "pdCreateUserId": 1,
              "pdQrsj": 1493349772000,
              "pdQrUserId": null,
              "pdZfsj": null,
              "pdZfUserId": null,
              "pdStatus": 0,
              "pdChargePerson": "",
              "pdOperator": "",
              "pdArehouseId": 1,
              "pdDiffStatus": 1,
              "mfunpdDocs": [],
              "mrGoodsIds": null,
              "rmsUser": null
            }
          ],
          "draw": 0,
          "recordsTotal": 1,
          "recordsFiltered": 1
        }
         */
        /**
 * TODO 1 盘点作业 新增动碰盘点计划及明细 POST /mfunpd/insertDPMfunpdDocAndDocs
 * {
  "pdId": 0,
  "pdType": "string",
  "pdYdBeginTime": "2017-05-08T11:47:54.237Z",
  "pdYdEndTime": "2017-05-08T11:47:54.237Z",
  "pdZyBeginTime": "2017-05-08T11:47:54.237Z",
  "pdZyEndTime": "2017-05-08T11:47:54.237Z",
  "pdCreateTime": "2017-05-08T11:47:54.237Z",
  "pdCreateUserId": 0,
  "pdQrsj": "2017-05-08T11:47:54.237Z",
  "pdQrUserId": 0,
  "pdZfsj": "2017-05-08T11:47:54.237Z",
  "pdZfUserId": 0,
  "pdStatus": "string",
  "pdChargePerson": "string",
  "pdOperator": "string",
  "pdArehouseId": 0,
  "pdDiffStatus": "string",
  "mfunpdDocs": [
    {
      "pdsId": 0,
      "pdsPdId": 0,
      "pdsGoodsId": 0,
      "pdsLocationId": 0,
      "pdsRepertoryCount": 0,
      "pdsPdCount": 0,
      "pdsDiffStatus": "string",
      "pdsStatus": "string",
      "pdsUserId": 0,
      "pdsPdTime": "2017-05-08T11:47:54.238Z",
      "baseGoods": {
        "bgGoodsId": 0,
        "bgGoodsNo": "string",
        "bgGoodsName": "string",
        "bgNamejc": "string",
        "bgT": 0,
        "bgI": 0,
        "bgHsl": 0,
        "bgZxdw": 0,
        "bgSzdw": 0,
        "bgStatus": 0,
        "bgArehouseId": 0,
        "bgClientId": 0,
        "bgGoodsType": "string",
        "bgGoodsTj": 0,
        "bgGoodsZl": 0,
        "bgGoodsPrice": 0,
        "bgCreatetime": "2017-05-08T11:47:54.238Z",
        "bgRemarks": "string",
        "bgGoodsGg": "string",
        "baseDws": [
          {
            "bdDwId": 0,
            "bdName": "string",
            "bdStatus": 0,
            "bdIsdel": true,
            "bdCreatetime": "2017-05-08T11:47:54.238Z"
          }
        ]
      },
      "baseLocation": {
        "blLocationId": 0,
        "blLname": "string",
        "blRegionId": 0,
        "blLtray": 0,
        "blLorder": 0,
        "blStatus": 0,
        "blArehouseId": 0
      },
      "rmsUser": {
        "ruUserId": 0,
        "ruUserName": "string",
        "ruLoginName": "string",
        "ruLoginPassword": "string",
        "ruPhone": "string",
        "ruTelephone": "string",
        "ruEmail": "string",
        "ruSex": true,
        "ruBirthday": "2017-05-08T11:47:54.238Z",
        "ruHomeaddress": "string",
        "ruQicq": "string",
        "ruCreateTime": "2017-05-08T11:47:54.238Z",
        "ruLastModifiedTime": "2017-05-08T11:47:54.239Z",
        "ruStatus": 0,
        "ruSalt": "string",
        "ruUserType": 0,
        "ruUserZyq": "string",
        "ruRemarks": "string",
        "ruIspda": true,
        "ruPortrait": "string"
      }
    }
  ],
  "mrGoodsIds": [
    0
  ],
  "rmsUser": {
    "ruUserId": 0,
    "ruUserName": "string",
    "ruLoginName": "string",
    "ruLoginPassword": "string",
    "ruPhone": "string",
    "ruTelephone": "string",
    "ruEmail": "string",
    "ruSex": true,
    "ruBirthday": "2017-05-08T11:47:54.239Z",
    "ruHomeaddress": "string",
    "ruQicq": "string",
    "ruCreateTime": "2017-05-08T11:47:54.239Z",
    "ruLastModifiedTime": "2017-05-08T11:47:54.239Z",
    "ruStatus": 0,
    "ruSalt": "string",
    "ruUserType": 0,
    "ruUserZyq": "string",
    "ruRemarks": "string",
    "ruIspda": true,
    "ruPortrait": "string"
  }
}
 */
        /**
         * TODO 2 盘点作业 根据盘点明细id分配任务 POST /mfunpd/allocatingTaskByPdsId
         */
        /**
         *  TODO 3 盘点作业 根据盘点计划id确认盘点信息（修改库存) POST /mfunpd/confirmPdDocByPdId
         */
        /**
         * TODO 4 盘点作业 根据盘点明细id重盘（修改状态) POST /mfunpd/againPdByPdsId
         */
        /**
         * TODO 5 盘点作业 分配任务页面根据盘点计划ID查询详情 POST /mfunpd/selectPdInfoByPdId
         */
        /**
         * TODO 6 盘点作业 盘点详情页面根据盘点计划ID查询详情 POST /mfunpd/selectPdInfoByPdsPdId
         */
    /**
 * TODO 循环盘点
  */
        /**
         *   TODO 0 盘点查询 循环盘点分页查询 POST /mfunpd/selectXHPDByPage
         *
        */
        /**
         * TODO 1 盘点作业 新增循环盘点计划及明细  POST /mfunpd/insertXHMfunpdDocAndDocs
         */
        /**
         * TODO 2 盘点作业 根据盘点明细id重盘（修改状态） POST /mfunpd/againPdByPdsId
         */
        /**
         * TODO 3 盘点作业 根据盘点明细id分配任务  POST /mfunpd/allocatingTaskByPdsId
         */
        /**
         * TODO 4 盘点作业 根据盘点计划id确认盘点信息（修改库存）POST /mfunpd/confirmPdDocByPdId
         */
        /**
         * TODO 5 盘点作业 分配任务页面根据盘点计划ID查询详情 POST /mfunpd/selectPdInfoByPdId
         */
        /**
         * TODO 6 盘点作业 盘点详情页面根据盘点计划ID查询详情  POST /mfunpd/selectPdInfoByPdsPdId
         */
    /**
    * TODO 全面盘点
    */
        /**
         * TODO 0  盘点查询 全面盘点分页查询 POST /mfunpd/selectQMPDByPage
         */
        /**
         * TODO 1 盘点作业 新增全面盘点计划及明细  POST /mfunpd/insertQMMfunpdDocAndDocs
         */
        /**
         *  TODO 2 盘点作业 根据盘点明细id重盘（修改状态)  POST /mfunpd/againPdByPdsId
         */
        /**
         * TODO 3 盘点作业 根据盘点明细id分配任务  POST /mfunpd/allocatingTaskByPdsId
         */
        /**
         * TODO 4 盘点作业 根据盘点计划id确认盘点信息（修改库存） POST /mfunpd/confirmPdDocByPdId
         */
        /**
         * TODO 5 盘点作业 分配任务页面根据盘点计划ID查询详情  POST /mfunpd/selectPdInfoByPdId
         */
        /**
         * TODO 6 盘点作业 盘点详情页面根据盘点计划ID查询详情 POST /mfunpd/selectPdInfoByPdsPdId
         */
/**
 * TODO 业务查询
 */
    /**
     * TODO 入库日报
     *
     */
        /**
        * TODO 0 分页查询
        */
        /**
         * TODO 1 导出
         */
    /**
     * TODO 出库日报
     */
        /**
         * TODO 0 分页查询  POST /mfunck/SelectCkRb
         */
        /**
         * TODO 1 导出 post /mfunck/exportCkRbByExcel
         */
    /**
     * 库存查询
      */
        /**
         * TODO 0 分页查询 POST /repertory/groupPage
         */
        /**
         * TODO 1 导出
         */
    /**
     * TODO 入库单据查询
     */
        /**
         * TODO 0 分页查询
         */
        /**
        * TODO 1 导出
        */
    /**
     * TODO 出库单据查询
     */
        /**
         * TODO 0 分页查询  POST /mfunck/findMfunckDocByPage
         */
        /**
         * TODO 1 业务查询 根据出库单id查询出库明细（二级菜单）POST /mfunck/findMfunckDocsByCkCkdjId
         */
        /**
         * TODO 2 业务查询 根据出库明细id查询分拣明细集合（三级菜单） POST /mfunck/findMfunckSortingMxByCkmxId
          */
        /**
         * TODO 3 导出出库单
          */
        /**
         * TODO 4 导出明细
          */
        /**
         * TODO 5 导出分拣明细
          */
        /**
         * TODO 6 导出出库
          */


    /**
 * TODO 货品流向查询
     */
        /**
         * TODO 0 分页查询  post /mfunck/selectHplxCx
         */
        /**
         * TODO 1 导出  post /mfunck/exportHplxCxByExcel

         */
    /**
     * TODO 库存转移查询
     */
        /**
         * TODO 0  库存转移过程 分页获取库存转移单据(包含详细信息) POST /stockZyDoc/selectByPage
         */
    /**
    * TODO 库存冻结查询
     */
        /**
         * TODO 0 库存冻结过程 分页获取库存冻结单据 POST /stockDjDoc/page
         */
    /**
        * TODO 盘点查询
     */
        /**
        * TODO 0 业务查询 根据查询条件分页查询盘点计划 POST /mfunpd/selectMfunpdByPage
        * 参数：
        * {
               "draw": 0,
               "pageNum": 1,
               "pageSize": 10
          }
        字段
        {
           "data": [
             {
               "pdId": 1,
               "pdType": 0,
               "pdYdBeginTime": 1493308800000,
               "pdYdEndTime": null,
               "pdZyBeginTime": null,
               "pdZyEndTime": null,
               "pdCreateTime": 1493349660000,
               "pdCreateUserId": 1,
               "pdQrsj": 1493349772000,
               "pdQrUserId": null,
               "pdZfsj": null,
               "pdZfUserId": null,
               "pdStatus": 0,
               "pdChargePerson": "",
               "pdOperator": "",
               "pdArehouseId": 1,
               "pdDiffStatus": 1,
               "mfunpdDocs": [],
               "mrGoodsIds": null,
               "rmsUser": null
             }
           ],
           "draw": 0,
           "recordsTotal": 1,
           "recordsFiltered": 1
          }
        */
        /**
         * TODO 1 业务查询 根据盘点计划ID查询盘点详情 POST /mfunpd/selectMfunpdDocsByPdsPdId
         */
        /**
         * TODO 2 导出
         */









