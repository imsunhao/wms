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
 * TODO 任务预约
 * rkrwId      id
 * rkrwNo      入库任务号     系统自动生成格式为当前日期例:入库2017-03-14-16-17-01
 * rkrwDhrq    预计到货日期   精确到分钟
 * rkrwDbd     调拨地
 * rkrwCys     承运商
 * rkrwCph     车牌号
 * rkrwSjxm    司机姓名
 * rkrwDh      司机电话
 * rkrwStatus  任务状态
        1.初始(创建入库任务后的状态)
        2.已下发任务(下达任务后的状态)
        3.已开始收货(打印收货标签后的状态)
        4.收货中(上架第一个库位后的状态)
        5.
            1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
            2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
        6.收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
        可以手动将欠货标记为收货完成需要输入原因以及补发单号
 *
 *
 * TODO 用户管理
 * ruUserId             id
 * ruUserName           用户昵称/名
 * ruLoginName          登录账户
 * ruLoginPassword      密码
 * ruPhone              手机
 * ruZoneNo             区号 电话区号 例如 0531
 * ruTelephone          电话
 * ruEmail              邮箱地址
 * ruSex                性别
 *                      1.男
 *                      0.女
 *                      json数据中1对应true 0对应false
 * ruBirthday           生日
 * ruHomeaddress        家庭住址
 * ruQicq               qq
 * ruCreateTime         创建时间
 * ruLastModifiedTime   最后修改时间
 * ruStatus             状态(status)
                        0.软删除
 * ruSalt               随机掩码
 * ruUserType           用户类型
                        0.普通
                        1.堆高车
                        2.高位叉车
 * ruUserZyq            高位叉车作业区域
 * ruRemarks            备注
 * ruIspda              是否允许登陆pda
                        1.是
                        0.否
 *用户配置角色
 * user_id              用户id
 * role_ids             被勾选的角色id集合
 *
 *
 * TODO 角色管理
 * rrRoleId             角色id
 * rrName               角色name
 * rrRemarks            备注
 * rrStatus             状态
                        1.可用
                        0.软删除
 * rrCjsj               创建时间
 *
 * 通过user_id获取对应的权限角色
 * user_id              用户id
 * 角色配置仓库
 * role_id              角色id
 * arehouse_ids         被勾选的仓库id集合
 * 角色配置客户
 * role_id              角色id
 * client_ids           被勾选的客户id集合
 * 角色配置菜单
 * role_id              角色id
 * menu_ids             被勾选的菜单id集合
 *
 *
 *
 *TODO 菜单配置/管理
 * bmMenuId             id
 * bmMenuCode           菜单编码
 * bmMenuType           菜单类型
 * bmMenuIcon           菜单图标
 * bmParentMenuId       父级菜单id
 * bmMenuName           菜单名称
 * bmOrderNumber        每级菜单占两位 如101010
 * bmMenuLevel          1.一级菜单
 *                      2.二级菜单
 * bmMenuUrl            菜单跳转路径
 * bmCreateTime         创建时间
 * bmModifyTime         修改时间
 * bmStatus             状态
 *                      0.删除
 *                      1.正常
 * bmRemarks            备注
 * 删除一些/一个 菜单节点,并删除以该节点为父菜单节点的相应菜单节点
 * menu_id              菜单id
 * 通过role_id查询部分菜单的信息(被角色id绑定的)
 * role_id              角色id
 * 通过user_id查询部分菜单的信息(被用户id绑定的)
 * user_id              用户id
 * 通过menuId删除一条菜单数据
 * id                   菜单id
 *
 *
 *
 * TODO 仓库管理/配置
 * ArehouseId           id
 * Name                 仓库名称
 * Addr                 仓库地址
 * Scity                所在地市
 * Scontacts            联系人
 * Phone                电话
 * Acreage              面积
 * Ctype                仓库类型
 * Humidity             相对湿度
 * Fax                  传真
 * Postoffice           邮编
 * Isti                 是否需要维护ti值
 *                      1.存在ti
 *                      2.不存在ti
 * Status               状态
 *                      1.可用
 *                      0.软删除
 * ClientId             客户id
 * Remarks              备注
 * Pgroupinfo           平面图信息
 * Createtime           创建时间
 * 客户归属
 * arehouse_id          仓库id
 * 通过client_id查询部分仓库的信息(被客户id绑定的)
 * client_id            客户id
 * 通过role_id查询部分仓库的信息(被角色id绑定的)
 * role_id              角色id
 * 通过id删除一条仓库数据
 * id                   仓库id
 * 根据id返回仓库信息
 * id                   仓库id
 * 通过client_id查询部分仓库的信息(被用户id绑定的)
 * user_id              用户id
 * client_id            客户id
 *
 *
 * TODO 客户配置
 * bcClientId           id
 * bcCname              客户名称
 * bcCaddr              客户地址
 * bcCtel               联系方式
 * bcStatus             状态
 *                      0.软删除
 *                      1.可用
 * bcCjsj               创建时间
 * 通过client_id配置仓库所属关系
 * client_id            客户id
 * arehouse_ids         被勾选的仓库id集合
 * 通过client_id配置货品所属关系
 * client_id            客户id
 * goods_ids            被勾选的货品id集合
 * 通过role_id查询部分客户的信息(被角色id绑定的)
 * role_id              角色id
 * 通过user_id查询部分客户的信息(被用户id绑定的)
 * user_id              用户id
 * 通过id删除一条客户数据
 * id                   客户id
 * 根据id返回客户信息
 * id                   客户id
 *
 *
 * TODO 资源管理
 * TODO 仓库管理
 * TODO 货品管理
 * bgGoodsId            id
 * bgGoodsNo            货品编号
 * bgGoodsName          货品名称
 * bgNamejc             货品简称
 * bgT                  货品t值
 * bgI                  货品i值
 * bgHsl                货品换算量
 * bgZxdw               整箱单位
 * bgSzdw               散支单位
 * bgStatus             状态
 * bgArehouseId         仓库id(外键)
 * bgClientId           客户id(外键)
 * bgGoodsType          货品类型
 * bgGoodsTj            货品体积
 * bgGoodsZl            货品重量
 * bgGoodsPrice         单价
 * bgCreatetime         创建时间
 * bgRemarks            备注
 * bgGoodsGg            规格
 * 通过客户id查询一些货品数据
 * client_id            客户id
 * 通过货品编号查询一些货品数据
 * goods_no             货品编号(模糊查询)
 * 通过id删除一条货品数据
 * id                   货品id
 * 通过货品id查询货品
 * id                   货品id
 * TODO RF管理
 * TODO 作业区管理
 * TODO 单位管理
 * bdDwId               id
 * bdName               单位名称
 * bdStatus             状态
 *                      1.整箱单位
 *                      2.散支单位
 * bdIsdel              0.软删除
 *                      1.可用
 * bdCreatetime         创建时间
 * 通过id删除一条单位数据
 * id                   单位id
 * 根据id返回单位信息
 * id                   单位id
 * TODO 收货客户管理
 * brcReceiptId         id
 * brcReceiptName       收货方名称
 * brcReceiptAddr       收货方地址
 * brcStatus            0删除
 * brcCreatetime        创建时间
 * 通过id删除一条收货方数据
 * id                   收货方id
 * 根据id返回收货方信息
 * id                   收货方id
 * TODO 业务处理
 * TODO 入库预约
 * TODO 下达任务
 * TODO 开始收货
 * TODO 入库操作
 * TODO 入库台账
 * TODO 出库预约
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

 *
 *
 *
 *
 *
 *

