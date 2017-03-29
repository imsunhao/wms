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
 * TODO 系统配置
 *      TODO 用户管理   /user
 *          ruUserId            id
 *          ruUserName          用户昵称/名
 *          ruLoginName         登录账户
 *          ruLoginPassword     密码
 *          ruPhone             手机
 *          ruZoneNo            区号 电话区号 例如 0531
 *          ruTelephone         电话
 *          ruEmail             邮箱地址
 *          ruSex               性别
 *                                  1.男
 *                                  0.女
 *                                  json数据中1对应true 0对应false
 *          ruBirthday          生日
 *          ruHomeaddress       家庭住址
 *          ruQicq              qq
 *          ruCreateTime        创建时间
 *          ruLastModifiedTime  最后修改时间
 *          ruStatus            状态(status)0.软删除
 *          ruSalt              随机掩码
 *          ruUserType          用户类型
 *                                  0.普通
 *                                  1.堆高车
 *                                  2.高位叉车
 *          ruUserZyq           高位叉车作业区域
 *          ruRemarks           备注
 *          ruIspda             是否允许登陆pda
 *                                  1.是
 *                                  0.否
 *      TODO 新增-启用-配置角色
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
 *      TODO 启用：
 *          ruStatus    状态
 *                          1.启用
 *      TODO 配置角色   /user/userAddRoles
 *          用户配置角色
 *          userId         用户id
 *          roleIds        被勾选的角色id集合
 *
 *      TODO 编辑 /user
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
 *
 *      TODO 重置密码
 *          ruLoginPassword 密码
 *      TODO 禁用
 *          ruStatus    状态
 *                          0.禁用
 *      用户配置角色
 *          userId         用户id
 *          roleIds        被勾选的角色id集合
 *      用户管理 通过userid删除一条用户数据
 *          id              用户id
 *      用户管理 根据id返回用户信息
 *          id              用户id
 *      TODO  用户名和登录账号不允许重复切不允许使用特殊字符的接口

 * TODO 系统设置
 *      TODO 角色管理   role
 *          rrRoleId             角色id
 *          rrName               角色name
 *          rrRemarks            备注
 *          rrStatus             状态
                                    1.可用
                                    0.软删除禁用
 *          rrCjsj               创建时间
 *      TODO 新增-启用-配置仓库-配置客户-配置菜单
 *          rrName               角色name
 *          rrRemarks            备注
 *      TODO 启用
 *          rrStatus             状态
 *      TODO 配置仓库   /role/roleAddArehouses
 *          角色配置仓库
 *          roleId              角色id
 *          arehouseIds         被勾选的仓库id集合
 *      TODO 配置客户  /role/roleAddClients
 *         角色配置客户
 *         roleId              角色id
 *         clientIds           被勾选的客户id集合
 *      TODO 配置菜单   /role/roleAddMenus
 *          角色配置菜单
 *         roleId              角色id
 *         menuIds             被勾选的菜单id集合
 *      TODO 禁用
 *          禁用
 *          rrStatus             状态
 *                                  0.禁用
 *      TODO 编辑
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
 *      TODO 角色名称不允许重复的接口
 *          。。。
 *          。。。
 *          。。。
 * TODO 系统配置
 *      TODO 仓库管理/配置
 *          ArehouseId           id
 *          Name                 仓库名称
 *          Addr                 仓库地址
 *          Scity                所在地市
 *          Scontacts            联系人
 *          Phone                电话
 *          Acreage              面积
 *          Ctype                仓库类型
 *          Humidity             相对湿度
 *          Fax                  传真
 *          Postoffice           邮编
 *          Isti                 是否需要维护ti值
 *                                  1.存在ti
 *                                  2.不存在ti
 *          Status               状态
 *                                  1.可用
 *                                  0.软删除
 *          ClientId             客户id
 *          Remarks              备注
 *          Pgroupinfo           平面图信息
 *          Createtime           创建时间
 *      TODO 新增 /arehouse
 *          Name                 仓库名称
 *          Addr                 仓库地址
 *          Scontacts            联系人/负责人
 *          Phone                电话
 *          Remarks              备注
 *          Ctype                仓库类型
 *          Humidity             相对湿度
 *          Postoffice           邮编
 *          Fax                  传真
 *      TODO 编辑 /arehouse
 *          Name                 仓库名称
 *          Addr                 仓库地址
 *          Scontacts            联系人/负责人
 *          Phone                电话
 *          Remarks              备注
 *          Ctype                仓库类型
 *          Humidity             相对湿度
 *          Postoffice           邮编
 *          Fax                  传真
 *
 *          客户归属
 *          arehouseId          仓库id
 *          通过clientId查询部分仓库的信息(被客户id绑定的)
 *          clientId            客户id
 *          通过roleId查询部分仓库的信息(被角色id绑定的)
 *          roleId              角色id
 *          通过id删除一条仓库数据
 *          id                   仓库id
 *          根据id返回仓库信息
 *          id                   仓库id
 *          通过client_id查询部分仓库的信息(被用户id绑定的)
 *          userId              用户id
 *          clientId            客户id
 * TODO 系统配置
 *      TODO 客户配置
 *          bcClientId           id
 *          bcCname              客户名称
 *          bcCaddr              客户地址
 *          bcCtel               联系方式
 *          bcStatus             状态
 *                                   0.软删除
 *                                   1.可用
 *          bcCjsj               创建时间
 *      TODO 新增-配置货品-配置仓库
 *          bcCname              客户名称
 *          bcCtel               联系方式/联系地址
 *          bcCaddr              客户地址
 *      TODO 配置货品   /client/clientAddGoods
 *          通过clientId配置货品所属关系
 *          clientId            客户id
 *          goodsIds            被勾选的货品id集合
 *      TODO 配置仓库   /client/clientAddArehouses
 *          通过client_id配置仓库所属关系
 *          clientId            客户id
 *          arehouseIds         被勾选的仓库id集合
 *      TODO 编辑 /client
 *          bcCname              客户名称
 *          bcCtel               联系方式/联系地址
 *          bcCaddr              客户地址
 *      TODO 客户不允许重复
 *          。。。
 *          。。。
 *          。。。
 *          通过client_id配置仓库所属关系
 *          clientId            客户id
 *          arehouseIds         被勾选的仓库id集合
 *          通过clientId配置货品所属关系
 *          clientId            客户id
 *          goodsIds            被勾选的货品id集合
 *          通过roleId查询部分客户的信息(被角色id绑定的)
 *          roleId              角色id
 *          通过user_id查询部分客户的信息(被用户id绑定的)
 *          userId              用户id
 *          通过id删除一条客户数据
 *          id                   客户id
 *          根据id返回客户信息
 *          id                   客户id
 * TODO 资源管理
 *      TODO 仓库管理
 * TODO 资源管理
 *      TODO 货品管理
 *          bgGoodsId            id
 *          bgGoodsNo            货品编号
 *          bgGoodsName          货品名称
 *          bgNamejc             货品简称
 *          bgT                  货品t值
 *          bgI                  货品i值
 *          bgHsl                货品换算量
 *          bgZxdw               整箱单位
 *          bgSzdw               散支单位
 *          bgStatus             状态
 *          bgArehouseId         仓库id(外键)
 *          bgClientId           客户id(外键)
 *          bgGoodsType          货品类型
 *          bgGoodsTj            货品体积
 *          bgGoodsZl            货品重量
 *          bgGoodsPrice         单价
 *          bgCreatetime         创建时间
 *          bgRemarks            备注
 *          bgGoodsGg            规格
 *          通过客户id查询一些货品数据
 *          clientId            客户id
 *          通过货品编号查询一些货品数据
 *          goodsNo             货品编号(模糊查询)
 *          通过id删除一条货品数据
 *          id                   货品id
 *          通过货品id查询货品
 *          id                   货品id
 * TODO 资源管理
 *      TODO RF管理
 * TODO 资源管理
 *      TODO 作业区管理
 * TODO 资源管理
 *      TODO 单位管理
 *          bdDwId               id
 *          bdName               单位名称
 *          bdStatus             状态
 *                                  1.整箱单位
 *                                  2.散支单位
 *          bdIsdel                 0.软删除
 *                                  1.可用
 *          bdCreatetime         创建时间
 *          通过id删除一条单位数据
 *          id                   单位id
 *          根据id返回单位信息
 *          id                   单位id
 * TODO 资源管理
 *      TODO 收货客户管理
 *          brcReceiptId         id
 *          brcReceiptName       收货方名称
 *          brcReceiptAddr       收货方地址
 *          brcStatus            0删除
 *          brcCreatetime        创建时间
 *          通过id删除一条收货方数据
 *          id                   收货方id
 *          根据id返回收货方信息
 *          id                   收货方id
 *
 * TODO 业务处理
 *      TODO 入库预约   mfunrkRwDoc (预约详细)
 *
 *              rkrwId      id
 *              rkrwNo      入库任务号     系统自动生成格式为当前日期例:入库2017-03-14-16-17-01
 *              rkrwDhrq    预计到货日期   精确到分钟
 *              rkrwDbd     调拨地
 *              rkrwCys     承运商
 *              rkrwCph     车牌号
 *              rkrwSjxm    司机姓名
 *              rkrwDh      司机电话
 *              rkrwStatus  任务状态
                        1.初始(创建入库任务后的状态)
                        2.已下发任务(下达任务后的状态)
                        3.已开始收货(打印收货标签后的状态)
                        4.收货中(上架第一个库位后的状态)
                        5.
                        1.部分收货(任务下所有订单有一个部分收货整个任务为部分收货)
                        2.全部收货(任务下所有订单状态为全部收货整个任务状态为全部收货)
                        6.收货完成/欠货(全部收货状态下导出台帐为收货完成,部分收货状态下导出台帐为欠货)
                        可以手动将欠货标记为收货完成需要输入原因以及补发单号
 *          TODO 0      mfunrkRwDoc
 *              rkArehouseId      所属仓库(仓库id(外键)
 *              rkRkdjNo          入库单号(WMS单号)
 *              rkCreatetime       下单时间(创建时间)
 *              rkType             订单类型
 *                                      0.采购订单
 *                                      1.仓间调拨
 *                                      2.退货入库
 *              rkStatus           入库状态
 *                                      1.原始状态
 *                                      21.部分分配
 *                                      22.全部分配
 *                                      31.部分收货
 *                                      32.完全收货
 *                                  入库数量
 *                                  入库体积
 *              rkZdfs             制作方式
 *                                      1.手动
 *                                      2.excel
 *                                      3.接口
 *                                  可用操作
 *              rkRemarks          入库备注
 *          TODO 添加/入库基础信息      mfunrkRwDoc(入库表)
 *              rkRkdjNo          入库单号(WMS单号)
 *              rkType             订单类型
 *                                      0.采购订单
 *                                      1.仓间调拨
 *                                      2.退货入库
 *              rkRemarks          入库备注
 *              rkStatus           入库状态
 *                                      1.原始状态
 *                                      21.部分分配
 *                                      22.全部分配
 *                                      31.部分收货
 *                                      32.完全收货
 *                                  入库数量
 *                                  入库体积
 *              rkZdfs             制作方式
 *                                      1.手动
 *                                      2.excel
 *                                      3.接口
 *          TODO 添加/入库明细   mfunrk_docs(入库明细表)
 *              rksGoodsId         货品id(货品编号)
 *              rksCount           数量  (货品数量)
 *              rksGoodsId         货品id(货品名称)
 *              rksGoodsId         货品id(货品单位)
 *
 * TODO 下达任务
 * TODO 开始收货
 * TODO 入库操作
 * TODO 业务处理
 *      TODO 入库台账
 *          TODO 制作台账
 *          TODO 制作台账明细
 *          入库单号
 *          rksGoodsId  货品名称
 *          rksGoodsId  货品编号
 *          rksCount    数量
 *          收货人
 *
 * TODO 出库预约
 * TODO 挑选数据
 * 
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
 **/

