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
         *         通过user_id获取对应的权限角色
         *         userId              用户id
         *         角色配置仓库
         *         roleId              角色id
         *         arehouseIds         被勾选的仓库id集合
         *         角色配置客户
         *         roleId              角色id
         *         clientIds           被勾选的客户id集合
         *         角色配置菜单
         *         roleId              角色id
         *         menuIds             被勾选的菜单id集合
         *         */
        /** TODO 8 角色名称不允许重复的接口
         *          rrName               角色name
         *          */
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
        /** TODO 1 新增 /arehouse  就从这个开始吧 测试接口
         *
         *{
            "baName": "测试11",
            "baAddr": "111",
            "baScity": "111",
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
            "baCreatetime": "2017-04-06T02:37:55.971Z",
            "baPgroupinfo": "string",
            "arehouseKqs": [
                {
                    "baqKqId": 1,
                    "baqArehouseId": 0,
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
         *
         *
         *
         *
         *     下面这些参数都是错误得   修改正确的参数名
        *          baName                 仓库名称
        *          baAddr                 仓库地址
        *          Scontacts            联系人/负责人
        *          Phone                电话
        *          Remarks              备注
        *          Ctype                仓库类型
        *          Humidity             相对湿度
        *          Postoffice           邮编
        *          Fax                  传真
        *          */
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
        /**   编辑 PUT /arehouse
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
         *      TODO 货品管理   goodsManage
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
         *      {
         *          "bgGoodsId": 2,
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
         *      }
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
                     1
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
     * TODO RF管理   RFManage
         **/
        /**
         *TODO 0 RF管理主页面
         *  ruLoginName 账户
         *  ruUserType  类型（int）
         *                  0.普通
         *                  1.堆高车
         *                  2.高位叉车
         *  ruUserZyq   主要作业区
         *  ruUserZyq   次要作业区
         *  操作
         */
        /**
         *  TODO 1 关联作业区
         *      ruUserZyq   高位叉车作业区域 该区域存放的就是区域名称
         *   */
        /**
         *  TODO 2 获取作业区名称
         *      ruUserZyq   高位叉车作业区域
         *   **/
        /**
         *  TODO 3 判断两个作业区名称是否相同
         *      ruUserZyq
         **/
    /**
         *      TODO 作业区管理 operationAreaManage
         *      **/
        /**
         * TODO 0 作业区管理主页面
         *      blsName 作业区名称
         *       库位数  --库位数是计算出来的
         *      操作
         * /

         *
         */
        /**
         *  TODO 1 新增
         *      库区
         *      brgRegionNo     区域编号
         *      brgRegionStatus 0
         *                          1.存储区
         *                          2.暂存区
         *                          3.未设定区
         *                          4.分拣区
         *                          5.不合格区
         *     blLname          储位name/储位名称
         **/
        /**
         *  TODO 2 编辑
         *      库区
         *      brgRegionNo     区域编号
         *      brgRegionStatus 0
         *                          1.存储区
         *                          2.暂存区
         *                          3.未设定区
         *                          4.分拣区
         *                          5.不合格区
         *     blLname          储位name/储位名称
         **/
        /**
         *  TODO 3 查看
         *      库区
         *      brgRegionNo     区域编号
         *      brgRegionStatus 0
         *                          1.存储区
         *                          2.暂存区
         *                          3.未设定区
         *                          4.分拣区
         *                          5.不合格区
         *     blLname          储位name/储位名称
         **/
        /**
         *  TODO 4 删除
         */
        /**
         *  TODO 5 库位名称不允许重复
         *     blLname          储位name/储位名称
         **/
/**
 *  TODO 业务处理
 **/
    /**TODO 入库预约 warehousingReservation
    */

        /**
         *      TODO 0 入库预约 POST /mfunrkRwDoc/add (预约详细)
         *      TODO 参数 该参数测试有问题，新增不成功，参数需要超哥回来确定
         *      {
         *          "rkrwId": 1,
                    "rkrwNo": "string",
                    "rkrwDhrq": "2017-04-10T02:49:09.278Z",
                    "rkrwDbd": "string",
                    "rkrwCys": "string",
                    "rkrwCph": "string",
                    "rkrwSjxm": "string",
                    "rkrwDh": "string",
                    "rkrwStatus": "1"
         *      }
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
         *      TODO 1 组合      mfunrkRwDoc
         *          rkArehouseId    所属仓库(仓库id(外键)
         *          rkRkdjNo        入库单号(WMS单号)
         *          rkCreatetime    下单时间(创建时间)
         *          rkType          订单类型
         *                              0.采购订单
         *                              1.仓间调拨
         *                              2.退货入库
         *          rkStatus        入库状态
         *                              1.原始状态
         *                              21.部分分配
         *                              22.全部分配
         *                              31.部分收货
         *                              32.完全收货
         *          rksCount        入库数量
         *          bgGoodsId       入库体积( bgGoodsTj)
         *          rkZdfs          制作方式
         *                              1.手动
         *                              2.excel
         *                              3.接口
         *          
         **/
        /**
         *      TODO 2 新增/添加入库明细
         *          rksGoodsId  货品id(货品编号)
         *          rksCount    数量  (货品数量)
         *          rksGoodsId  货品id(货品名称)
         *          rksGoodsId  货品id(货品单位)
         **/
        /**
         *      TODO 3 编辑入库基础信息
         *          rkRkdjNo    入库单号(WMS单号)
         *          rkType      订单类型
         *                          0.采购订单
         *                          1.仓间调拨
         *                          2.退货入库
         *          rkRemarks   入库备注
         *          rkStatus    入库状态
         *                          1.原始状态
         *                          21.部分分配
         *                          22.全部分配
         *                          31.部分收货
         *                          32.完全收货
         *          rksCount    入库数量
         *          bgGoodsId   入库体积( bgGoodsTj)
         *          rkZdfs      制作方式
         *                          1.手动
         *                          2.excel
         *                          3.接口
         */
        /**
         *      TODO 4 编辑入库明细
         *          rkRkdjNo    入库单号(WMS单号)
         *          rkType      订单类型
         *                          0.采购订单
         *                          1.仓间调拨
         *                          2.退货入库
         *          rkRemarks   入库备注
         *          rkStatus    入库状态
         *                          1.原始状态
         *                          21.部分分配
         *                          22.全部分配
         *                          31.部分收货
         *                          32.完全收货
         *          rksCount    入库数量
         *          rkZdfs      制作方式
         *                          1.手动
         *                          2.excel
         *                          3.接口
         *     */
        /**
         *  TODO 5 删除
         */
        /**
         *  TODO 6 入库单号不能重复
         */
        /**
         *      TODO 7 新增/添加入库基础信息
         *          rkRkdjNo    入库单号(WMS单号)
         *          rkType      订单类型
         *                          0.采购订单
         *                          1.仓间调拨
         *                          2.退货入库
         *          rkRemarks   入库备注
         *          rkStatus    入库状态
         *                          1.原始状态
         *                          21.部分分配
         *                          22.全部分配
         *                          31.部分收货
         *                          32.完全收货
         *          rksCount    入库数量
         *          bgGoodsId   入库体积( bgGoodsTj)
         *          rkZdfs      制作方式
         *                          1.手动
         *                          2.excel
         *                          3.接口
         **/
    /**
     *      TODO 入库任务 warehousingTask
     */
        /**
         * TODO 0 入库任务管理 分页获取入库任务单 POST /mfunrkRwDoc 待补充没有模糊查询
         *   参数 --该分页不支持模糊查询 模糊查询的字段有6个
         *      {
                    TODO "rkrw_no": "",
                    TODO "rkrw_status": "",
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
             *           1 修改 入库任务管理 更新入库任务单 PUT /mfunrkRwDoc
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
             * TODO 3 新增入库单 入库任务管理 新增入库任务单据 POST /mfunrkRwDoc/add  有问题
             * 参数
             *
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
        *      */
            /**
             * TODO 0 开始收货主页面 POST /mfunrkRwDoc 待补充没有模糊查询
             参数 --该分页不支持模糊查询 模糊查询的字段有6个
             *      {
                    TODO "rkrw_no": "",
                    TODO "rkrw_status": "",
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
         *      TODO 入库操作       inputOperation
         */
            /**TODO 0 入库操作主页面  入库过程 分页获取入库单据 POST /mfunrkDoc (待超哥补充)没有模糊查询
             * 参数{
             *      TODO "rkno": "string",
                    TODO "startTimeParam": "string",
                    TODO "endTimeParam": "string",
                    TODO "status": 0
             *     "draw": 1,
                    "pageNum": 1,
                    "pageSize": 1,
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
             *         TODO 0 入库台账主页面
             *             rkCreatetime    始发日期
             *             rkrwDhrq        到货日期
             *             rk_Sjsj         收货日期
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
             *  TODO 4 欠货完结
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
             * TODO 0 分页获取出库预约单
             * 参数说明
             * ckCkdjId         出库Id
             * ckCkdjNo         出库单号
             * ckErpNo          ERP单号
             * ckCkdjType       单据类型 0正常单据1挂起单据2滞留单据
             * ckCkdjClientno   客户编号
             * ckCkdjClientname 客户名称
             * ckContacts       联系人
             * ckTel            联系电话
             * ckAdress         地址
             * ckXdsj           下单时间
             * 总体积
             * 总数量
             * ckStatus         发货状态
             * ckRemarks        备注
             */
            /** TODO 1 查询
             *
             */
            /**
             * TODO 2 新增
             * 参数说明
             * 出库单号
             * 客户名称
             * 联系人
             * 联系电话
             * 客户地址
             * 备注
             * 总数量(不能输入)
             * 总体积(不能输入)
             * 总重量(不能输入)
             * -----明细
             * 货品名称
             * 货品编号
             * 货品数量
             * 货品单位
             */
/*
 * TODO 挑选数据
 * TODO 激活数据
 * TODO 出库操作
 *
 * TODO 出库发运
 * TODO 回收存档
 * TODO 库内管理
 * TODO 库位转移
 * TODO 库存转移确认
 * TODO 库存调整
 * TODO 库存调整确认
 * TODO 库存冻结/解冻
 * TODO 入库日报
 * TODO 出库日报
 * TODO 动碰查询
 * TODO 库存查询
 * TODO 入库单据查询
 * TODO 出库单据查询
 * TODO 进出合并查询
 * TODO 库位转移查询
 * TODO 库存调整查询
 * TODO 库位冻结查询
 * TODO 动碰盘点查询
 * TODO 循环盘点查询
 * TODO 全面盘点查询
 * TODO 盘点作业
 * TODO 动碰盘点
 * TODO 循环盘点
 * TODO 全面盘点

 **/

