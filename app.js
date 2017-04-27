var express = require("express");
// require()的时候会把每个链接包都会执行
// 执行=>打开数据库;
var bodyParser = require('body-parser');
var multer = require('multer');
var db = require("./models/db.js");
var session = require('express-session');
var app = express();
var newRouter = require("./router/newRouter.js");

// var yanzhengma = require("./models/yanzhengma");

app.set("view engine", "ejs");

app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("./public"));
// app.use("/avatar",express.static("./avatar"));

app.post("/info_avater", newRouter.info_avater);
app.get("/charge_tel", newRouter.charge_Tel);
// 显示首页
app.get("/", newRouter.showIndex);
// 判断登录
app.get("/judge_login", newRouter.judge_login);
app.get("/do_login", newRouter.do_login);
app.get("/my/:info_tel", newRouter.do_my_info);
/*判断数据库是否存在*/
// 注册
app.get("/regist", newRouter.regist);
app.get("/do_regist", newRouter.do_regist);
app.get("/regist_info", newRouter.regist_info);
/*注册--获取验证码*/
app.get("/againCode", newRouter.again_code);
/*注册--判断手机号是否被注册*/
app.get("/judge_Tel", newRouter.judge_Tel);
/*首页头像---设置*/

/*路由到求购大厅*/
app.get("/qiugoudating", newRouter.show_get_all);
/*供应大厅*/
app.get("/gongyingdating", newRouter.show_seller_all);
/*编辑供应信息-发布供应信息*/
app.get("/bianjigongyingxinxi/:info_tel", newRouter.edit_seller_goods);
/*首页直接发布供应信息*/
app.get("/issue_seller_detail", newRouter.edit_seller_goods_index);
/*供应信息发布成功*/
app.post("/gongying-success/", newRouter.seller_success);
app.get("/open_seller_success", newRouter.open_seller_success_page);

/*编辑求购信息-发布求购信息*/
app.get("/bianjiqiugouxinxi/:info_tel", newRouter.edit_get_goods);
/*首页直接发布求购信息*/
app.get("/issue_get_detail", newRouter.edit_get_goods_index);
/*求购信息发布成功*/
app.get("/qiugou-success", newRouter.get_success);

/*供应详情页面*/
app.get("/gongyingxiangqing", newRouter.seller_info);
/*求购详情*/
app.get("/qiugouxiangqing", newRouter.get_info);

/*我的货品*/
app.get("/my-gongyinglist/:info_tel", newRouter.my_seller);
/*我的求购*/
app.get("/my-qiugoulist/:info_tel", newRouter.my_get);

/*我的供应详情*/
app.get("/my-gongyinglist-xiangqing", newRouter.my_seller_info);
/*我的求购详情*/
app.get("/my-qiugoulist-xiangqing", newRouter.my_get_info);

/*删除求购信息*/
app.get("/delete_qiugouxiangqing", newRouter.delete_get_goods);
/*修改求购信息*/
app.get("/modify_qiugouxiangqing", newRouter.modify_get_goods);
/*确认修改求购信息*/
app.get("/affirm_modify_get_goods_info", newRouter.affirm_modify_get_goods);

/*删除供应信息*/
app.get("/delete_gongyingxiangqing", newRouter.delete_seller_goods);
/*修改供应信息*/
app.get("/modify_gongyingxiangqing", newRouter.modify_seller_goods);
/*确认修改供应信息*/
app.get("/affirm_modify_seller_goods_info", newRouter.affirm_modify_seller_goods);

/*删除我的求购==》我的求购列表*/
app.get("/delete_my-qiugoulist-xiangqing", newRouter.delete_my_qiugoulistxiangqing);
app.get("/modify_my-qiugoulist-xiangqing", newRouter.modify_my_qiugoulistxiangqing);

app.get('*', function (req, res) {
    res.render('404.ejs', {
        title: 'No Found'
    });
});
app.listen(3030);
