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
         * TODO 0 读取指定仓库的信息 包括 结构 区域具体信息    GET /arehouseKq/{id}
         *
         * 参考
         *
         *
         **

         */
        /**
         * TODO 1 对于仓库的区域 结构的修改
         *
         * {
-              "kuQu": [
-                [
-                  {
-                    "row": 0,
-                    "col": 1,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A1-1",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 2,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A1",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 3,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A2",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 4,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A3",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 5,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B0",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 6,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B1",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 7,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B2",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 8,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B3",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 9,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B4",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 10,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C0",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 11,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C1",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 12,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C2",
-                    "select": false
-                  },
-                  {
-                    "row": 0,
-                    "col": 13,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C3",
-                    "select": false
-                  }
-                ],
-                [
-                  {
-                    "row": 1,
-                    "col": 1,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A4",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 2,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A5",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 3,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A6",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 4,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A7",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 5,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B5",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 6,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B6",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 7,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B7",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 8,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B8",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 9,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B9",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 10,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C4",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 11,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C5",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 12,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C6",
-                    "select": false
-                  },
-                  {
-                    "row": 1,
-                    "col": 13,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C7",
-                    "select": false
-                  }
-                ],
-                [
-                  {
-                    "row": 2,
-                    "col": 1,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A8",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 2,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A9",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 3,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A10",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 4,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "A11",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 5,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B10",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 6,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B11",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 7,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B12",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 8,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B13",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 9,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B14",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 10,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C8",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 11,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C9",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 12,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C10",
-                    "select": false
-                  },
-                  {
-                    "row": 2,
-                    "col": 13,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      true,
-                      false,
-                      false
-                    ],
-                    "status": 3,
-                    "id": "C11",
-                    "select": false
-                  }
-                ],
-                [
-                  {
-                    "row": 3,
-                    "col": 1,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D0",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 2,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D1",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 3,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D2",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 4,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D3",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 5,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B15",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 6,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B16",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 7,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B17",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 8,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B18",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 9,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B19",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 10,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "E0",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 11,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "E1",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 12,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "E2",
-                    "select": false
-                  },
-                  {
-                    "row": 3,
-                    "col": 13,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "E3",
-                    "select": false
-                  }
-                ],
-                [
-                  {
-                    "row": 4,
-                    "col": 1,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D4",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 2,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D5",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 3,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D6",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 4,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      false,
-                      true
-                    ],
-                    "status": 5,
-                    "id": "D7",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 5,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B20",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 6,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B21",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 7,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B22",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 8,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B23",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 9,
-                    "statusColor": [
-                      false,
-                      false,
-                      false,
-                      false,
-                      true,
-                      false
-                    ],
-                    "status": 4,
-                    "id": "B24",
-                    "select": false
-                  },
-                  {
-                    "id": -1,
-                    "status": 0,
-                    "statusColor": [
-                      true,
-                      false,
-                      false,
-                      false,
-                      false,
-                      false
-                    ],
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 10,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "E4",
-                    "select": false
-                  },
-                  {
-                    "row": 4,
-                    "col": 11,
-                    "statusColor": [
-                      false,
-                      false,
-                      true,
-                      false,
-                      false,
-                      false
-                    ],
-                    "status": 2,
-                    "id": "E5",
-                    "select": false
-                  }
         *
         *
         * {
              "status": 200,
              "model": {
                "baArehouseId": 1,                      仓库id
                "baName": "九阳齐河仓",                 仓库名称
                "baAddr": "齐河",                       仓库地址
                "baScity": "济南",                      所在地市
                "baScontacts": "联系人1",               联系人
                "baPhone": "13267890789",               电话
                "baAcreage": "baAcreage",               面积
                "baCtype": "baCtype",                   仓库类型
                "baHumidity": "baHumidity",             相对湿度
                "baFax": "baFax",                       传真
                "baPostoffice": "baPostoffice",         邮编
                "baIsti": 1,                            是否需要维护ti值 1:存在ti 2:不存在ti
                "baStatus": 1,                          状态1可用 0软删除
                "baClientId": 1,                        客户id
                "baRemarks": "baRemarks",               备注
                "baCreatetime": 1488092935000,          创建时间
                "baPgroupinfo": "aaaa bbbbb cccc\r\naaaa bbbbb cccc\r\naaaa bbbbb cccc\r\ndddd bbbbb eeee\r\ndddd bbbbb eeee",  平面图信息
                "arehouseKqs": [
                  {
                    "baqKqId": 1,                       库区id
                    "baqArehouseId": 1,                 仓库id
                    "baqKqName": "库区名称",            库区名称
                    "baqIsdel": 1,                      是否有效 0 删除
                    "baqStatus": 1,                     1:存储区 2分拣区 3暂存区 4不合格 5其他
                    "baseRegions": [
                      {
                        "brgRegionId": 1,               区域id
                        "brgArehouseId": 1,             仓库id
                        "brgRegionNo": "brgRegionNo",   区域编号
                        "brgKqId": 1,                   库区id
                        "brgRegionStatus": 1,           区域状态1:存储区 2分拣区 3暂存区 4不合格 5其他   与库区状态保持一致
                        "baseLocationList": [
                          {
                            "blLocationId": 1,          储位id
                            "blLname": "H11-28-A1",     储位名称
                            "blRegionId": 1,            区域
                            "blLtray": 25,              托盘数量
                            "blLorder": 1,              储位优先级
                            "blStatus": 1,              0:软删除 1可用
                            "blArehouseId": 1           仓库id
                          },
                          {
                            "blLocationId": 3,
                            "blLname": "H16-39-A4",
                            "blRegionId": 1,
                            "blLtray": 21,
                            "blLorder": 3,
                            "blStatus": 1,
                            "blArehouseId": 1
                          },
                          {
                            "blLocationId": 8,
                            "blLname": "blLname",
                            "blRegionId": 1,
                            "blLtray": 1,
                            "blLorder": 1,
                            "blStatus": 1,
                            "blArehouseId": 1
                          }
                        ]
                      },
                      {
                        "brgRegionId": 7,
                        "brgArehouseId": 1,
                        "brgRegionNo": "brgRegionTest",
                        "brgKqId": 1,
                        "brgRegionStatus": 2,
                        "baseLocationList": [
                          {
                            "blLocationId": 7,
                            "blLname": "blLname",
                            "blRegionId": 7,
                            "blLtray": 1,
                            "blLorder": 1,
                            "blStatus": 1,
                            "blArehouseId": 1
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "baqKqId": 2,
                    "baqArehouseId": 1,
                    "baqKqName": "kucqu_name",
                    "baqIsdel": 0,
                    "baqStatus": 1,
                    "baseRegions": [
                      {
                        "brgRegionId": 2,
                        "brgArehouseId": 1,
                        "brgRegionNo": "region_002",
                        "brgKqId": 2,
                        "brgRegionStatus": 2,
                        "baseLocationList": [
                          {
                            "blLocationId": 2,
                            "blLname": "H16-39-A2",
                            "blRegionId": 2,
                            "blLtray": 23,
                            "blLorder": 2,
                            "blStatus": 1,
                            "blArehouseId": 1
                          },
                          {
                            "blLocationId": 5,
                            "blLname": "lname35",
                            "blRegionId": 2,
                            "blLtray": 11,
                            "blLorder": 5,
                            "blStatus": 1,
                            "blArehouseId": 2
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
         */
        /**
         * TODO 3 将指定区域（单 多） 冻结区域   //数据库没有冻结解冻字段
         */
        /**
         * TODO 4 将指定区域（单 多） 启用区域   //数据库没有启用禁用字段
         */
        /**
         * TODO 5 将指定库区（单 多） 设为存储区   POST /arehouseKq/modifyKqStatusByKqIds
         *
         * {
              "status": 0,   //需要修改成的状态
              "ids": [       //指定的单个或多个库区id
                0
              ]
            }
         */
        /**
         * TODO 6 将指定库区（单 多） 设为暂存区   POST /arehouseKq/modifyKqStatusByKqIds
         */
        /**
         * TODO 7 将指定库区（单 多） 设为未设定区 POST /arehouseKq/modifyKqStatusByKqIds
         */
        /**
         * TODO 8 将指定库区（单 多） 设为分拣区   POST /arehouseKq/modifyKqStatusByKqIds
         */
        /**
         * TODO 9 将指定库区（单 多） 设为不合格区  POST /arehouseKq/modifyKqStatusByKqIds
         */
        /** TODO 10 查看 指定区域（单 多） 区域中 储位信息     //指定区域查看应该是单个点击区域块
         *                                             POST /location/findByRegionId/{region_id}
         *
         */
        /** TODO 11 查看 指定储位 中 详细信息
         *                                             GET /location/findByRegionId/{region_id}
         */
        /**
         * TODO 12 将指定储位（单 多） 冻结储位    POST /location/deleteOfSoft

/**
 *       货品管理   goodsManage
             **/
    /**
 * TODO 货品管理
 */
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
         *   3 货品管理 通过客户id查询一些货品数据 GET /goods/findByClientId/{client_id}
         **/
        /**
         *   4 货品管理 通过货品编号查询一些货品数据 GET /goods/findBygoodsNo/{goods_no}
         **/
        /**
            *   5 货品管理 通过货品id查询货品  GET /goods/{id}
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
         *   7  货品管理 通过id删除一条货品数据 DELETE /goods/{id}
         *
         *  **/
        /**
         *   8 货品单号、编号不允许重复  货品管理 判断货品编号是否重复 GET /goods/isRepeatByBgGoodsNo/{bgGoodsNo}
         *
         **/
    /**
     *  RF管理   RFManage
         **/
        /**
         *  0 (RF管理主页面) 分页查询RF管理详情 POST /user/page
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
         * 1 RF管理 关联作业区，判断主作业区是否被占用，是否已关联；是否有PDA任务 GET /user/userAddZyq/{id}/{firstZyq}/{secondZyq}
        /**
         *  TODO 2 获取作业区名称
         *      ruUserZyq   高位叉车作业区域
         *   **/
        /**
         *  2 获取作业区的名称 用户管理 根据id返回用户信息  GET /user/{id}
         */
        /**
         * 3  RF管理 判断主作业区是否重复 GET /user/isRepeatByFirstZyq/{firstZyq}
         **/
        /**
         *  4 编辑
         */
/**
 *      TODO 作业区管理 operationAreaManage
         *      **/
        /**
         *  0 (作业区管理主页面) 储位组管理 POST请求查询储位组信息 POST /locations/page
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
         *  1  储位组管理 新增储位组 POST /locations
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
         *   2 编辑 储位组管理 更新储位组信息 PUT /locations
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
         *  4  储位组管理 通过id删除一条储位组数据 DELETE /locations/{id}
         */
        /**
         *  TODO 5 库位名称不允许重复
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
                rkrwClientId    所
                docList [{"rkRkdjId": 8 需要被合并的入库单据id(其他字段无用)},{"rkRkdjId": 17 需要被合并的入库单据id(其他字段无用)}]
         *
         */
        /**
         *  4 删除-入库任务  DELETE /mfunrkRwDoc/{rkrw_id}
         */
        /**
         *  TODO 5 下发
         */
        /**
         * 6  查询-入库任务详情 GET /mfunrkRwDoc/{rkrw_id}
         * */
        /**
         *  7 查询-入库单号-入库明细
         *
         * */
        /**
         *  8 查询-入库单据
         *
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
             * 6 入库过程 通过入库单据id获取  历史记录 GET /history/{id}/{type}
             *
             *
             *
             *    参数：
             *
             *       {
             *          id:1,
             *          type:1
             *       }
             *
             *    参数说明：
             *
             *       id  主键id
             *
             *       type
             *           1. 入库标识
             *           2. 出库标识
             *
             *     结果：
             *
             *
             *
             *     [
                     {
                       "mhDjhistoryId": 122,
                       "mhStatus": 1,
                       "mhCreatetime": 1492521873000,
                       "mhUserId": 1,
                       "mhRkdjId": 0,
                       "mhCkdjId": 31,
                       "rmsUser": {
                         "ruUserId": 1,
                         "ruUserName": "超级管理员",
                         "ruLoginName": "admin",
                         "ruLoginPassword": "d135f41faa533e92dcff73f9179670bc",
                         "ruPhone": "15098879708",
                         "ruTelephone": "1234567",
                         "ruEmail": "infchd@hotmail.com",
                         "ruSex": true,
                         "ruBirthday": 1488873925000,
                         "ruHomeaddress": "",
                         "ruQicq": "",
                         "ruCreateTime": 1474165944000,
                         "ruLastModifiedTime": 1474301742000,
                         "ruStatus": 1,
                         "ruSalt": "HKJID",
                         "ruUserType": 0,
                         "ruUserZyq": "1,2",
                         "ruRemarks": "",
                         "ruIspda": true,
                         "ruPortrait": "static/images/users/00.jpg"
                       }
                     },
                     {
                       "mhDjhistoryId": 121,
                       "mhStatus": 1,
                       "mhCreatetime": 1492521834000,
                       "mhUserId": 1,
                       "mhRkdjId": 0,
                       "mhCkdjId": 30,
                       "rmsUser": {
                         "ruUserId": 1,
                         "ruUserName": "超级管理员",
                         "ruLoginName": "admin",
                         "ruLoginPassword": "d135f41faa533e92dcff73f9179670bc",
                         "ruPhone": "15098879708",
                         "ruTelephone": "1234567",
                         "ruEmail": "infchd@hotmail.com",
                         "ruSex": true,
                         "ruBirthday": 1488873925000,
                         "ruHomeaddress": "",
                         "ruQicq": "",
                         "ruCreateTime": 1474165944000,
                         "ruLastModifiedTime": 1474301742000,
                         "ruStatus": 1,
                         "ruSalt": "HKJID",
                         "ruUserType": 0,
                         "ruUserZyq": "1,2",
                         "ruRemarks": "",
                         "ruIspda": true,
                         "ruPortrait": "static/images/users/00.jpg"
                       }
                     },
                     {
                       "mhDjhistoryId": 120,
                       "mhStatus": 7,
                       "mhCreatetime": 1491019196000,
                       "mhUserId": 1,
                       "mhRkdjId": 8,
                       "mhCkdjId": 0,
                       "rmsUser": {
                         "ruUserId": 1,
                         "ruUserName": "超级管理员",
                         "ruLoginName": "admin",
                         "ruLoginPassword": "d135f41faa533e92dcff73f9179670bc",
                         "ruPhone": "15098879708",
                         "ruTelephone": "1234567",
                         "ruEmail": "infchd@hotmail.com",
                         "ruSex": true,
                         "ruBirthday": 1488873925000,
                         "ruHomeaddress": "",
                         "ruQicq": "",
                         "ruCreateTime": 1474165944000,
                         "ruLastModifiedTime": 1474301742000,
                         "ruStatus": 1,
                         "ruSalt": "HKJID",
                         "ruUserType": 0,
                         "ruUserZyq": "1,2",
                         "ruRemarks": "",
                         "ruIspda": true,
                         "ruPortrait": "static/images/users/00.jpg"
                       }
                     },
                     {
                       "mhDjhistoryId": 119,
                       "mhStatus": 7,
                       "mhCreatetime": 1491019176000,
                       "mhUserId": 1,
                       "mhRkdjId": 8,
                       "mhCkdjId": 0,
                       "rmsUser": {
                         "ruUserId": 1,
                         "ruUserName": "超级管理员",
                         "ruLoginName": "admin",
                         "ruLoginPassword": "d135f41faa533e92dcff73f9179670bc",
                         "ruPhone": "15098879708",
                         "ruTelephone": "1234567",
                         "ruEmail": "infchd@hotmail.com",
                         "ruSex": true,
                         "ruBirthday": 1488873925000,
                         "ruHomeaddress": "",
                         "ruQicq": "",
                         "ruCreateTime": 1474165944000,
                         "ruLastModifiedTime": 1474301742000,
                         "ruStatus": 1,
                         "ruSalt": "HKJID",
                         "ruUserType": 0,
                         "ruUserZyq": "1,2",
                         "ruRemarks": "",
                         "ruIspda": true,
                         "ruPortrait": "static/images/users/00.jpg"
                       }
                     }
                     ]
             */
    /**
     *      TODO 入库台账       inputLedger
         */
            /**
             *         TODO 0 入库台账主页面
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
             *  TODO  1 制作台账
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
             *  TODO 2 制作台账明细
             *  rkRkdjNo    入库单号
             *  bgGoodsName 货品名称
             *  bgGoodsNo   货品编号
             *  rksCount    数量
             *  ruUserName  收货人
             */
            /**
             *          TODO 3 导出按钮
             */
            /**
             *  TODO 4 欠货完结    /test   POST
             *
             *  参数：
             *
             *     user:    //用户名
             *     userId:    //用户id
             *
             *
             *
             *  返回
             *
             *
             *
             *
             *  rkQhWjyy    欠货完结原因/完结原因
             *  rkQhBfdh  (欠货补发单号)
             */
            /**
             *  TODO 5 入库单号不允许重复
             */
            /**
             *  TODO 6 数量不允许为负数
             */
        /**
             TODO 出库预约

             **/
            /**
             * 0 TODO 出库预约 获取 根据分页要求获取没有出库任务的出库单信息 POST /mfunck/selectMfunckDocByPage
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
                  "ckArehouseId": 1               （如果是调度员就不传，如果是别的角色就传）
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
             * 1 TODO 出库预约 新增 出库单据/包含出库单明细 POST /mfunck/add
             * 参数
             * {
                  "ckCkdjNo": "CK1482398743793",（必填）
                  "ckErpNo": "hk45645",
                  "ckCkdjClientno": "hlcs2001",（必填）
                  "ckCkdjClientname": "济南华联超市王舍人店",（必填）
                  "ckContacts": "张三丰",（必填）
                  "ckTel": "18856568985",（必填）
                  "ckAdress": "济南市历城区工业北路",（必填）
                  "ckYfhsj": "2017-04-17T05:46:21.260Z",
                  "ckRemarks": "备注",
                  "ckArehouseId": 1,（必填）
                  "ckClientId": 1,（必填）
                  "mfunckDocs": [
                    {
                      "cksGoodsId": 1,（必填）
                      "cksGoodsCount": 50,（必填）
                      "cksDwid": 1,（必填）
                      "cksCkfs": "先进先出",（必填）（先进先出,指定批次,指定库位(x：p：k) 默认x）
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
             * TODO 2 出库预约 获取 出库任务单号
             *
             *
             * */
            /**
             * TODO 3 出库预约 新增 出库任务单
             *
             *
             * */
            /**
             * TODO 4 出库预约 出库单 作废
             *
             *
             * */
            /**
             * TODO 5 出库预约 出库单 取消滞留 （取消滞留）
             *
             *
             * */
            /**
             * TODO 6 出库预约 出库单 滞留
             *
             * */
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
     * TODO 激活数据
     */
        /**
         * TODO 2 激活任务   POST /mfunck/rwJiHuo
         *      参数 setModel
         *          {
         *              "ids": [ 1,2,3,4], 任务ID（多个）
         *             "useId": 1,      操作员ID
         *             "userName": "超级管理员"   操作员名称
         *    }
         */
        /**
         * TODO 3 追加分拣  GET /mfunck/bujianById
         *        {
         *           "id": 43, 出库单据ID
         *          "useId": 1  操作员ID
         *         }
         */
        /**
         *  TODO 4 修改分拣方式 POST /mfunck/editCkDocsFJFSByCkmxId
         *      参数名称 paramsModel  （同凯哥出库任务的修改分拣方式）
         */
        /**
         *  TODO 5 挂起确认 GET  /mfunck/guaQiById/{ckdjId}
         *      "ckdjId" : 出库单据ID
         */
        /**
         *  TODO 6 激活单据 GET /mfunck/fenjianById
         *      {
         *         "id": 44,  出库单据ID
         *         "useId": 1  操作员ID
         *       }
         */
        /**
         *  TODO 7 修改出库明细分拣数量 GET /mfunck/xiugaifenjian/{msxMxId}/{mxCount}/{userId}
         *      "msxMxId" ： 出库单明细ID
         *      "mxCount" :  修改后的数量（小于分拣数量）
         *      "userId" :   操作员ID
         */
    /**
     * TODO 出库操作
     */
        /**
        * TODO 2 打印分拣单 GET /mfunck/dayinfenjiandan/{pageNum}/{pageSize}/{draw}/{ckdjId}
        *      "pageNum" :  第几页
        *      "pageSize" : 每一页多少条数据
        *      "draw" :    请求次数
        *      "ckdjId" : 出库单ID
         *      */
        /**
        *TODO 3 打印组合分拣单 GET /mfunck/dayinzuhedan/{pageNum}/{pageSize}/{draw}/{ckdjIds}
        *       "pageNum" : 第几页
        *       "pageSize" :  每一页多少条数据
        *       "draw" : 请求次数
        *       "ckdjIds" : 出库单ID(多个)
         *   */
        /**
        * TODO 4 打印追加分拣单 GET /mfunck/dayinzuijiadan/{pageNum}/{pageSize}/{draw}/{ckdjId}
        *         "pageNum" : 第几页
        *         "pageSize" : 每一页多少条数据
        *         "draw" : 请求次数
        *         "ckdjId" : 出库单ID
        */
        /**
        * TODO 5 下架 GET /mfunck/xiajiaById
        *          参数名称 ：serModel
        *          {
                *              "ids" : [32,33]  多个出库单ID
                *          }
        *
        */
    /**
     *  TODO 出库发运页面
     */
        /**
         * TODO 2 发运 POST /mfunck/ckFayunRw
         *      参数名称：setModel
         *      {
                 *          "ids" :[6,7],   出库任务ID(多个)
                 *          "useId" : 1    操作员Id
                 *      }
         */
        /**
         * TODO 3 修改发运数量 POST /mfunck/updateFysl
         *      {
                 *          "cksCkmxId"　： 出库明细ID
                 *          "cksGoodsId" : 货品ID
                 *          "cksGoodsCount" : 货品数量
                 *          "cksDwid" : 单位ID
                 *          "cksCkfs" :  出库方式（分拣方式）
                 *          "cksLocationId" : 货品库存ID
                 *          "cksStatus" :  出库单明细 发货状态
                 *          "cksCkdjId" : 出库单据ID
                 *          "cksFyCount" : 修改后的发运数量
                 *      }
         *
         */
    /**
     * TODO 回收存档
     */
        /**
         * TODO 1 欠货补发信息(整单) POST /mfunck/QianHuoBuFaZd
         *      参数名称 ckCdDocsParam
         *      {
                 *          "ckdjId" : 出库单据ID
                 *          "cksBfNo" :补发单号
                 *          "cksQhbfInfo" : 补发情况
                 *          "cksQhRemarks" : 欠货备注
                 *          "cksBfStatus" :补发状态
                 *      }
         */
        /**
            * TODO 2 欠货补发信息（明细） POST  /mfunck/QianHuoBuFaMx
            *      参数名称 ckCdDocsParam
            *      {
                    *          "cksCkmxId" : 出库单明细ID
                    *          "cksBfNo" :补发单号
                    *          "cksQhbfInfo" : 补发情况
                    *          "cksQhRemarks" : 欠货备注
                    *          "cksBfStatus" :补发状态
                    *      }
         */
        /**
         * * TODO 3 滞留补发信息 POST /mfunck/zhiLiuBuFa
          *         参数名称 ckCdDocsParam
         *         {

                  *              "ckrwNo" :"dddddfff", 补发单号

                  *              "ckdjIds" :[34,35]   出库单据ID （多个）

                  *         }
         */
        /**
 *      TODO 4  滞留导出 POST /mfunck/exportZldocByExcel
 *          参数名称 setModel
 *          {
         *              "ids" :[32,33,34]  出库单据ID(多个)
         *          }
         */
        /**
 *         TODO 5  欠货导出 POST /mfunck/exportQhdocByExcel
 *          参数名称 setModel
 *          {
         *              "ids" :[31,32,33] 出库单据ID（多个）
         *          }
         */
 /**
  * TODO 库内管理
  * */
    /**
     *TODO 库位转移
     *
    */
        /**
 * TODO 1 分页查询库位转移 /stockZyDoc/page
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
        * TODO 2 新增   POST /stockZyDoc
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
 * TODO 2-1 选择库存  POST /repertory/groupPage
             *{
              "bgGoodsNo": "",          货品编号
              "bgGoodsName": "",        货品名称
              "mrGoodsBatch": "",       货品批次
              "blLname": "",            储位名称
              "mrDjStatus": "",         冻结状态
              "pageNum": 1,
              "pageSize": 10,
              "draw": 0
            }
 */
        /**
 *  TODO 3编辑    PUT /stockZyDoc
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
 * TODO 3-1 选择库存  POST /repertory/groupPage
             * {
              "bgGoodsNo": "",          货品编号
              "bgGoodsName": "",        货品名称
              "mrGoodsBatch": "",       货品批次
              "blLname": "",            储位名称
              "mrDjStatus": "",         冻结状态
              "pageNum": 1,
              "pageSize": 10,
              "draw": 0
            }
 */
        /**
        * TODO 4删除     POST /stockZyDoc/deleteOfSoft
        */
    /**
 * TODO 5 库存转移确认     GET /stockZyDoc/confirmZy/{zyId}
 *
 * /
 /**
 * TODO 库存冻结/解冻
 * /
 /**
 *TODO 新增
 */
        /**
 *TODO 新增
 */
 /**
 * TODO 库内管理
 * TODO 库位转移
 * TODO 库存转移确认
 */
    /**
     * TODO  TODO 库存冻结/解冻
     */
        /**
         *  TODO 1 分页查询库存冻结
                djId                库存冻结主键
                djReason            冻结原因/备注
                djStatus            冻结状态0 冻结 1 解冻  2 作废
                djCreateUserId      创建人员ID
                djCreateTime        创建时间
                djJdUserId          解冻人员ID
                djJdTime            解冻时间
                djDjTime            冻结时间
                djZfUserId          作废人员ID
                djZfTime            作废时间
                djArehouseId        仓库ID
                djDocsList[
                        djsId           库存冻结明细主键
                        djsDjId         库存冻结ID
                        djsRepertoryId; 库存ID
                        djsStatus;      0.已冻结 1.未冻结(可用)
                ]


/**
         *  TODO 库存冻结分拣查询信息
         *
         */
/**
 *  TODO 盘点作业
 * */
    /**
     * TODO 动碰盘点
     */
        /**
         *  盘点主表mfunpd_doc
                pdId            盘点计划主键id
                pdType          盘点计划类型 0 异动盘点 1 货品盘点 2 全仓盘点
                pdYdBeginTime   异动开始时间
                pdYdEndTime     异动结束时间
                pdZyBeginTime   盘点作业开始时间
                pdZyEndTime     盘点作业结束时间
                pdCreateTime    盘点计划创建时间
                pdCreateUserId  盘点计划创建人员ID
                pdQrsj          盘点计划确认时间
                pdQrUserId      盘点计划确认人员ID
                pdZfsj          盘点计划作废时间
                pdZfUserId      盘点计划作废人员
                pdStatus        盘点状态0 初始 1 盘点确认  2 作废
                pdChargePerson  负责人
                pdOperator      经办人(多人)盘点操作人
                pdArehouseId    仓库ID
                pdDiffStatus    盘点差异 0 无差异  1 有差异
         盘点明细表mfunpd_docs
                pdsId               盘点计划明细主键
                pdsPdId             盘点计划主键ID
                pdsGoodsId          货品ID
                pdsLocationId       库位ID
                pdsRepertoryCount   库存数量
                pdsPdCount          盘点数量
                pdsDiffStatus       差异状态 0 无差异 1 有差异
                pdsStatus           盘点状态0 未盘点   1 已盘点
                pdsUserId           盘点人员id
                pdsPdTime           盘点时间
        */
    /**
            * TODO 循环盘点
        */
    /**
            * TODO 全面盘点
        */
/**
 * TODO 业务查询
 */
    /**
     TODO 入库日报
     */
        /**
            * TODO 0 分页查询
            * 搜索框条件查询
            * 条件{
                rkCreatetime    下单时间
                rkrkSjsj        上架开始时间
                rkEndTime       上架结束时间
                mdtSjsj         作业时间
                rkStatus        入库状态
                mdtUserId       作业人员
                rksGoodsId      (关联货品表)货品编号
                rksGoodsId      (关联货品表)货品名称
                rkRkdjNo        入库单号
                mdtLocationId   库位
                rkZdfs          制作方式
                rkStartwith     操作方式
                }
            分页查询中的字段
                显示列{
                    mdtUserId                            作业人员
                    mdtSjsj                              作业时间
                    mdt_count*base_goods：bg_goods_tj    体积
                    rkCreatetime                         下单时间
                    rkrkSjsj                             上架开始时间
                    rkEndTime                            上架结束时间
                    rkStatus                             入库状态
                    rksGoodsId                           (关联货品表)货品编号
                    rksGoodsId                           (关联货品表)货品名称
                    mdtBatch                             货品批次
                    rksCount                             应收数量
                    mdtCount                             上架数量
                    mdtLocationId                        上架库位
                    rkZdfs                               制作方式
                    rkStartwith                          操作方式
                    }
         */
        /**
            * TODO 1 导出
        */
    /**
 * TODO 出库日报
 */
        /**
            * TODO 0 分页查询
         * 搜索框条件查询
         * 条件
         {
              ckXdsj            下单时间
              mhCreatetime      分拣时间
              ckCksj            下架开始时间
              ckEndtime         下架结束时间
              msxQrsj           操作时间
              ckStatus          出库单据状态
              cksQhStatus       是否欠货
              cksZlStatus       是否滞留
              ckTel             联系电话
              ckContacts        联系人
              ckCkdjClientno    客户编号
              ckCkdjClientname  客户名称
              ckCkdjNo          出库单号
              cksGoodsId        货品名称
              cksGoodsId        货品编号
              msxXjry           作业人员
              msxHpkcid         (关联库位表)下架库位
              ckAdress          客户地址
              ckIsauto          制作方式
              ckStartwith       操作方式
         }
         分页查询字段
         显示列
         {
            msxXjry                 作业人员
            msxQrsj                 操作时间
            msxMxCount*bgGoodsTj    作业体积
            ckXdsj                  下单时间
            ckCkdjNo                出库单号
            ckStatus                出库单状态
            cksQhStatus             欠货状态
            cksZlStatus             滞留状态
            ckCksj                  下架开始时间
            ckEndtime               下架结束时间
            cksGoodsId              货品名称
            cksGoodsId              货品编号
            msxHpkcid               货品批次
            msxHpkcid               (关联库位表) 下架库位
            cksGoodsCount           应下数量
            msxMxCount              下架数量
            ckIsauto                制作方式
            ckStartwith             操作方式
            ckCkdjClientno          客户编号
            ckCkdjClientname        客户名称
            ckAdress                客户地址
            ckTel                   联系电话
            ckContacts              联系人
         }
         */
        /**
            * TODO 1 导出
         */
    /**
     *    TODO 库存查询
     *
     */
        /**
         *  TODO 0 分页查询
         *  搜索框查询字段
         *  条件
         {
                mrKcydsj                 异动时间
                mrGoodsId(关联货品表)   货品编号
                mrGoodsId(关联货品表)   货品名称
                mrLocationId           (关联库位表)库位名称
                mrGoodsBatch           货品批次
                mrArehouseId            仓库
         }
         分页查询字段
         显示列
         {
              mrArehouseId                                          仓库
              mrLocationId                                          (关联库位表) 库位名称
              mrGoodsId                                             (关联货品表) 货品编号
              mrGoodsId                                             (关联货品表) 货品名称
              mrGoodsBatch                                          货品批次
              mrKcydsj                                              异动时间
              mrCount                                               数量
              mrDxjCount                                            待下架数量
              mrDzyCount                                            待转移数量
              mrDjCount                                             冻结数量
              mr_count - mr_dxj_count - mr_dzy_count - mr_dj_count  可用数量
         }

         *
         */
        /**
 *
 * TODO 1 导出
 */
    /**
        * TODO 入库单据查询
        */
        /**
                TODO 0 分页查询
                模糊查询字段
                    条件
                    {
                        rkArehouseId   仓库
                        rkCreatetime   下单时间
                        rkrkSjsj       上架开始时间
                        rkEndTime      上架结束时间
                        rkStatus       入库状态
                        rkRkdjNo       入库单号
                        rkZdfs         制作方式
                        rkStartwith     操作方式
                    }

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
             * TODO 1 查看入库明细信息
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
             * TODO 2 查看入库储位信息
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
            * TODO 3 导出入库单
        */
        /**
            * TODO 4 导出入库明细
        */
        /**
            * TODO 5 导出入库储位
        */
        /**
            * TODO 6 导出入库
        */
    /**
     * TODO 出库单据查询
             */
        /**
             *  TODO 0 分页查询
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
                    TODO 总数量       sum(cksGoodsCount)(暂用allSL)
                    TODO 总体积       (暂用allTJ)
                    TODO 下架数量     sum(msxMxCount)(暂用xjsl)
                    TODO 下架体积     (暂用xjtj)
                    TODO 欠货数量     sum(cksQhCount)(暂用qhsl)
                    TODO 欠货体积     cksQhCount*bgGoodsTj(暂用qhtj)
                    滞留数量            cksZlCount
                    TODO 滞留体积     cksZlCount*bgGoodsTj(暂用zltj)
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
             */
        /**
        * TODO 1 出库单明细查询
         *   二级菜单：出库明细
         {
                TODO 货品编号     cksGoodsId(关联货品表)
                TODO 货品名称     cksGoodsId（关联货品表）
                货品数量            cksGoodsCount
                TODO 货品体积     cksGoodsCount*bgGoodsTj(暂用hptj)
                下架数量            msxMxCount
                TODO 下架体积     msxMxCount*bgGoodsTj(暂用xjtj)
                欠货数量            cksQhCounts
                TODO 欠货体积     cksQhCounts*bgGoodsTj(暂用qhtj)
                滞留数量            cksZlCount
                TODO 滞留体积     cksZlCount*bgGoodsTj(暂用zltj)
                欠货(补发)单号      cksBfNo
                滞留任务号          cksZlbfInfo
                发运数量            cksFyCount
                TODO 发运体积     cksFyCount*bgGoddsTj(暂用fytj)
                欠货备注            cksQhRemarks
                补发状态            cksBfStatus
         }
         *
        *
 */
        /**
         * TODO 2 分拣明细查询
         *     三级菜单： 分拣明细
         {
                TODO 货品编号   msxHpkcid（关联货品库存表再关键货品表）
                TODO 货品名称   msxHpkcid（关联货品库存表再关联货品表）
                TODO 下架库位   msxHpkcid（关联货品库存表再关联库位表）
                下架数量         msxMxCount
                TODO 下架体积   msxMxCount*bgGoodsTj(暂用xjtj)
                TODO 下架批次   msx_hpkcid（关联货品库存表取mr_good_batch）
                操作人员         msxXjry
                操作时间         msxQrsj
                修改分拣数量原因 msxWt
         }
         */
        /**
         * TODO 3 导出出库单
         */
        /**
         * TODO 4 导出出库单明细
         */
        /**
         * TODO 5 导出分拣明细
         */
        /**
         * TODO 6 导出出库
         */
    /**
     * TODO 货品流向查询 goodsFlowSelect
     */
        /**
         *  TODO 0 分页查询
         *  搜索条件
         *  {
                    仓库              ckArehouseId
                    TODO 货品名称     msxHpkid（关联货品库存表再关联货品表）
                    TODO 货品编号     msxHpkid（关联货品库存表再关联货品表）
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
 *  TODO 1 导出
 */
    /**
     * TODO 库位转移查询
     *
     */
        /**
         * TODO 0 分页查询
         * 模糊查询字段
         * 条件
         {
                zyCreateTime        创建时间
                zyConfirmTime       确认时间
                zyArehouseId        仓库
                zyCreateUserId      创建人
                zyConfirmUserId     确认人
                zyMentionUserId     提起人
                zyStatus            转移状态
         }
         一级(库存转移主表)显示列
         {
                zyCreateTime    创建时间
                zyConfirmTime   确认时间
                zyArehouseId    仓库
                zyCreateUserId  创建人
                zyConfirmUserId 确认人
                zyMentionUserId 提起人
                zyStatus        转移状态
                zyReason        转移原因
         }
        */
        /**
         * TODO 1 库位转移明细查询
         * 二级(库存转移明细表)显示列
         {
           zysRepertoryId           (关联货品表)货品编号
           zysRepertoryId           (关联货品表)货品名称
           zysRepertoryId           货品批次
           zysZyBeforeLocationId    转移前库位
           zysZyAfterLocationId     转移后库位
           zysZyCount               转移数量
         }


         */
        /**
         * TODO 2 导出
         */
/**
 * TODO 库位冻结查询
    */
        /**
        * TODO 0 分页查询
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
        */
        /**
         * * TODO 1 库位冻结明细查询
            *   二级页面(库存冻结明细表)显示列
            {
                  库位名称    djsRepertory
                  货品编号    djsRepertory
                  货品名称    djsRepertory
                  货品批次    djsRepertory
                  状态        djsStatus 0.已冻结 1.未冻结(可用)
                  冻结数量    djsRepertory
            }
            *
 */
        /**
        * TODO 2 导出
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
     * 库存转移
     */
        /**
     *  TODO 库存管理 分页 根据货品id 库位id 仓库id 合并获取库存单据 POST /repertory/groupPage
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



