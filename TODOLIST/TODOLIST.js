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
 */
