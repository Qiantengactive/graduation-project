var huinong_info = require("../models/huinong_info.js");
var isOkCode = require("../models/isOkCode");

exports.guide = function (req, res, next) {
    res.render("guide.ejs");
};
exports.showIndex = function (req, res, next) {
    var get_all = [];
    var seller_all = [];
    huinong_info.all_info(function (err, result) {
        if (err) {
            console.log("show_seller_all出错");
        }

        for (var z = 0; z < result.length; z++) {
            if (result[z]["get_all"].length == 0) {
                continue;
            }
            for (var q = 0; q < result[z]["get_all"].length; q++) {
                result[z]["get_all"][q].tel = result[z]["info_tel"];
                result[z]["get_all"][q].number = q;
                get_all.push(result[z]["get_all"][q]);
            }

        }
        /*出售信息*/
        for (var i = 0; i < result.length; i++) {
            if (result[i]["seller_all"].length == 0) {
                continue;
            }
            for (var j = 0; j < result[i]["seller_all"].length; j++) {
                result[i]["seller_all"][j].tel = result[i]["info_tel"];
                result[i]["seller_all"][j].number = j;
                seller_all.push(result[i]["seller_all"][j]);
            }
        }
        data = {
            "get_all": get_all,
            "seller_all": seller_all
        };
        res.render("index", data);
    });
};
/*显示所有的求购信息*/
/*
 get_all
 求购名
 求购数量
 求购价格
 求购地点
 求购类别
 */
exports.show_get_all = function (req, res, next) {
    var get_all = [];
    huinong_info.all_info(function (err, result) {
        for (var i = 0; i < result.length; i++) {
            if (result[i]["get_all"].length == 0) {
                continue;
            }
            for (var q = 0; q < result[i]["get_all"].length; q++) {
                result[i]["get_all"][q].tel = result[i]["info_tel"];
                result[i]["get_all"][q].number = q;
                get_all.push(result[i]["get_all"][q]);
            }
        }
        res.render('qiugoudating.ejs', {
            "get_all": get_all
        });
    });
};
/*显示所有出售信息*/
exports.show_seller_all = function (req, res, next) {
    var seller_all = [];
    huinong_info.all_info(function (err, result) {
        if (err) {
            console.log("show_seller_all出错");
        }
        for (var i = 0; i < result.length; i++) {
            if (result[i]["seller_all"].length == 0) {
                continue;
            }
            for (var j = 0; j < result[i]["seller_all"].length; j++) {
                result[i]["seller_all"][j].tel = result[i]["info_tel"];
                result[i]["seller_all"][j].number = j;
                seller_all.push(result[i]["seller_all"][j]);
            }
        }
        res.render('gongyingdating', {
            "seller_all": seller_all
        });
    });
};
/*我的供应--详情页面*/
exports.my_seller_info = function (req, res, next) {
    var number = req.query.number;
    var tel = req.query.tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        var obj = result[0].seller_all[number];
        obj.number = number;
        obj.info_tel = tel;
        /*打包数组后传递*/
        if (obj.pics[0]) {
            var pic1 = obj.pics[0];
        } else {
            pic1 = "/img/slect-pic.png";
        }
        if (obj.pics[1]) {
            var pic2 = obj.pics[1];
        } else {
            pic2 = "/img/slect-pic.png";
        }
        if (obj.pics[2]) {
            var pic3 = obj.pics[2];
        } else {
            pic3 = "/img/slect-pic.png";
        }
        obj.pics = null;
        obj.pic1 = pic1;
        obj.pic2 = pic2;
        obj.pic3 = pic3;
        var my_seller_details = {
            my_seller: obj
        };

        // /modify_gongyingxiangqing?detele_tel=<%= seller_obj.info_tel %>&modify_seller_number=<%= seller_obj.number %>"
        res.render('my-gongyinglist-xiangqing', my_seller_details);
    });
};
/*我的求购--详情页面*/
exports.my_get_info = function (req, res, next) {
    var number = req.query.number;
    var user_tel_data = {
        info_tel: req.query.tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        var obj = result[0].get_all[number];
        obj.tel = req.query.tel;
        obj.number = number;


        var my_get_details = {
            my_get: obj
        };
        res.render('my-qiugoulist-xiangqing.ejs', my_get_details);
    });
};
/*供应信息详情页*/
exports.seller_info = function (req, res, next) {
    /*判断是不是自己操作如果是则传回1 显示修改 删除按钮*/
    var IS_ME = 1;
    var NOT_IS_ME = 0;
    var user_data = {
        "info_tel": req.query.tel
    };
    huinong_info.login_info(user_data, function (err, result) {
        // 插入数据
        var obj = result[0]["seller_all"][req.query.number];
        obj.info_tel = result[0].info_tel;
        obj.info_name = result[0].info_name;
        obj.info_site = result[0].info_site;
        obj.number = req.query.number;

        /*打包数组后传递*/
        if (obj.pics[0]) {
            var pic1 = obj.pics[0];
        } else {
            pic1 = "/img/slect-pic.png";
        }
        if (obj.pics[1]) {
            var pic2 = obj.pics[1];
        } else {
            pic2 = "/img/slect-pic.png";
        }
        if (obj.pics[2]) {
            var pic3 = obj.pics[2];
        } else {
            pic3 = "/img/slect-pic.png";
        }
        obj.pics = null;
        obj.pic1 = pic1;
        obj.pic2 = pic2;
        obj.pic3 = pic3;
        if (req.query.tel == req.session.user_tel) {
            obj.isme = IS_ME;
        } else {
            obj.isme = NOT_IS_ME;
        }
        var obj_data = {
            seller_obj: obj
        };
        res.render("gongyingxiangqing.ejs", obj_data);
    });
}
/*求购详情页*/
exports.get_info = function (req, res, next) {
    /*判断是不是自己操作如果是则传回1 显示修改 删除按钮*/
    var IS_ME = 1;
    var NOT_IS_ME = 0;
    // { tel: '17600000001', number: '0' }==>查询数据 返回相应内容渲染到详情页面
    var user_data = {
        "info_tel": req.query.tel
    };
    huinong_info.login_info(user_data, function (err, result) {
        // 插入数据
        var obj = result[0]["get_all"][req.query.number];
        obj.info_tel = result[0].info_tel;
        obj.info_name = result[0].info_name;
        obj.info_site = result[0].info_site;
        obj.number = req.query.number;
        if (req.query.tel == req.session.user_tel) {
            obj.isme = IS_ME;
        } else {
            obj.isme = NOT_IS_ME;
        }

        var obj_data = {
            get_obj: obj
        };
        res.render("qiugouxiangqing.ejs", obj_data);

    });
};

/*判断是否登录*/
exports.judge_login = function (req, res, next) {
    // session.login 是否存在
    // 1存在 登录完成==》跳转到my页面 查询数据
    if (req.session.login) {
        res.redirect("/my/" + req.session.user_tel);
    } else {
        // 2 不存在 进行登录
        /*跳转到login页面进行登录*/
        res.render('login.ejs',{
            "not": 0
        });
    }
};

/*登录功能
 * data_login
 * {
 *   "info_tel":111111111,
 *   "info_pwd":111111111
 * }
 * req.query==> { user_tel: '1111111111', user_pwd: '2222222' }
 *
 * */
exports.do_login = function (req, res, next) {
    var user_pwd = req.query.user_pwd;
    var user_login = {
        "info_tel": req.query.user_tel,
        "info_pwd": user_pwd
    };
    //提交过来的数据 pwd绝对存在所有只用判断是否相等即可
    huinong_info.login_info(user_login, function (err, result) {
        /*查询数据返回密码(info_pwd)*/
        //数据库密码
        // var database_pwd = result[0]["info_pwd"];
        // console.log(result);
        if (result.length == 0) {
            // 取不到数据 登录失败==>继续登录
            res.render("login.ejs", {
                "not": 1
            });
        } else {

            req.session.login = 1;
            req.session.user_tel = result[0].info_tel;

            res.redirect("/my/" + result[0].info_tel);
        }
        // } else {
        //     // 登录成功
        //     console.log("登录成功");
        //     // 设置session
        //     req.session.login = 1;
        //     req.session.user_tel = result[0].info_tel;
        //
        //     res.redirect("/my/" + result[0].info_tel);
        // }
    });
};
/*注册功能
 * 1.渲染注册页面
 * 2.完成注册功能
 * 3.跳转到my页面
 *
 * */

/*渲染到注册页面*/
exports.regist = function (req, res, next) {
    res.render("regist");
}
/*完成注册功*/
exports.do_regist = function (req, res, next) {
    // 1.手机号
    // 2.随机数产生验证码

    var RandomCode = "";
    // var RandomCode = "1234";
    for (var i = 0; i < 4; i++) {
        RandomCode += Math.ceil(Math.random() * 9);
    }

    // console.log(RandomCode);
    req.session.RandomCode = RandomCode;
    var info_tel = req.query.info_tel;
    req.session.user_tel = info_tel;

    isOkCode.isOkCode(info_tel, RandomCode);
    var user_data = {
        RandomCode: RandomCode,
        info_tel: info_tel
    }
    res.render("regist_info", user_data);

};
/*
 *进行注册功能
 * 1.拼接user_data信息n
 * 2.进行注册
 * 3.渲染到my页面
 *
 * */
exports.regist_info = function (req, res, next) {
    // console.log(req.session.user_tel);
    // console.log(req.query);
    var siteArry = req.query.info_city.split(",");
    var user_data = {
        "info_name": req.query.info_name,
        "info_tel": req.session.user_tel,
        "info_pwd": req.query.info_pwd,
        // "info_avater": "",
        "info_site": {
            "info_pro": siteArry[0],
            "info_city": siteArry[1],
            "info_cout": siteArry[2],
            "info_detail_add": req.query.info_detail_add
        },
        "seller_all": [],
        "get_all": []
    };
    huinong_info.do_regist(user_data, function (err) {
        if (err) {
            console.loe("注册失败");
        }
        // console.log("regist_info");
        res.redirect("/my/" + req.session.user_tel);
    })
};
exports.again_code = function (req, res, next) {
    var RandomCode = "";
    // var RandomCode = "1234";
    for (var i = 0; i < 4; i++) {
        RandomCode += Math.ceil(Math.random() * 9);
    }
    // console.log("again");
    // console.log(RandomCode);
    req.session.RandomCode = RandomCode;
    var info_tel = req.session.user_tel;
    isOkCode.isOkCode(info_tel, RandomCode);
    var againCode = {
        "RandomCode": RandomCode
    }
    // console.log(againCode);
    res.json(againCode);

}
exports.judge_Tel = function (req, res, next) {
    // console.log(req.query);
    huinong_info.login_info(req.query, function (err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        // console.log("aaa");
        if (result.length) {
            res.json({"code": 1});
        } else {
            res.json({"code": 0});
        }
    })

};
exports.info_avater = function (req, res, next) {
    // console.log(111);
    // console.log(req.body);
    // console.log(req.body.info_avater);
    // var info_avater= req.body.info_avatar;

    huinong_info.do_photo(req.body.tel, req.body.info_avater, function (err, result) {
        if (err) {
            console.log("失败");
            res.json({data: 0});

        } else {
            res.json({data: 1});
        }
    })
};


/*炫染个人信息页面* */
exports.do_my_info = function (req, res, next) {
    // console.log("do_my_info-1");
    var info_tel = req.params["info_tel"];
    // console.log("do_my_info页面" + info_tel);
    // 查询数据==》显示信息
    var user_tel_data = {
        "info_tel": info_tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        // console.log(result[0]);

        if (err) {
            console.log("do页面失败");
        }
        // console.log("电话号查询用户");
        // console.log(result);
        res.render('my.ejs', {
            "user_info": result[0]
        });
        /*查询数据库显示 个人资料*/
        // console.log("do_my_info-2");
    })
};
/*判断是否登录过*/
exports.charge_Tel = function (req, res, next) {
    var info_tel = req.query.info_tel;
    /*查询数据库*/
    var user_tel_data = {
        "info_tel": info_tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        if (err) {
            // 错误
            // res.json({"code": 1});
        }
        if (result.length == 0) {
            // 不存在不可以登录
            res.json({"code": 0});
        } else {
            /*存在可以登录*/
            res.json({"code": 1});
        }
    })
    // req.send("11111");
};

/*编辑供应信息 - 发布供应信息*/
exports.edit_seller_goods = function (req, res, next) {
    var info_tel = req.params["info_tel"];
    /*没有电话 没登录*/
    if (!info_tel) {
        res.render("login.ejs", {
            "not": 0
        });
    }
    var data_tel = {
        info_tel: info_tel
    };
    res.render('bianjigongyingxinxi.ejs', data_tel);
};
/*首页直接发布供应信息*/
exports.edit_seller_goods_index = function (req, res, next) {
    if (req.session.login) {
        // console.log("直接跳转");
        // /my/:info_tel"
        /*直接跳转到发布页面*/
        res.redirect("/bianjigongyingxinxi/" + req.session.user_tel);
    } else {
        // console.log("登录吧");
        res.render("login.ejs", {
            "not": 0
        });
    }
};


/*发布供应信息成功*/
exports.seller_success = function (req, res, next) {
    // console.log(req.body);
    /*插入数据==》返回成功页面*/
    // 判断类别

    /*
     蔬菜：1
     水果：2
     禽类：3
     水产：4
     其他：5
     */

    if (req.body.qglb == "蔬菜") {
        req.body.qglb = 1;
    } else if (req.body.qglb == "水果") {
        req.body.qglb = 2;

    } else if (req.body.qglb == "禽类") {
        req.body.qglb = 3;

    } else if (req.body.qglb == "水产") {
        req.body.qglb = 4;
    } else {
        req.body.qglb = 5;
    }

    var tel = req.body.tel;

    var seller_data = {
        "seller_desc": req.body.seller_desc,
        "seller_name": req.body.gysp,
        "type": req.body.qglb,
        "seller_weight": req.body.qgsl,
        "seller_price": req.body.qgdj,
        "seller_site": {
            "city": req.body.cd,
            "pro": "河南"
        },
        "pics": req.body.pictData
    };
    huinong_info.add_seller_id(tel, seller_data, function (err) {
        if (err) {
            console.log("失败");
        }
        console.log("成功");
        res.json({seller_tel: tel});
        // res.render('gongying-success.ejs', {
        //     seller_tel: tel
        // });
        // res.redirect()
    });
};
exports.open_seller_success_page = function (req, res, next) {
    res.render('gongying-success.ejs', {
        seller_tel: req.query.tel
    });
}
/*编辑求购信息 - 发布求购信息*/
exports.edit_get_goods = function (req, res, next) {
    var info_tel = req.params["info_tel"];

    if (!info_tel) {
        res.render("login.ejs", {
            "not": 0
        });
    }
    ;
    var data_tel = {
        info_tel: info_tel
    };
    res.render('bianjiqiugouxinxi.ejs', data_tel);
};
/*发布求购信息成功*/
exports.get_success = function (req, res, next) {
// { tel: '17600000000',
//     gysp: '草莓aa',
//     qglb: '水果',
//     qgdj: '2.00元/斤',
//     qgsl: '500公斤',
//     cd: '郑州',
//     form_id: 'aaaaaaaaaaaaaaaaaaaaa' }

    if (req.query.qglb == "蔬菜") {
        req.query.qglb = 1;
    } else if (req.query.qglb == "水果") {
        req.query.qglb = 2;

    } else if (req.query.qglb == "禽类") {
        req.query.qglb = 3;

    } else if (req.query.qglb == "水产") {
        req.query.qglb = 4;
    } else {
        req.query.qglb = 5;
    }

    var tel = req.query.tel;
    var get_data = {
        "get_desc": req.query.form_id,
        "get_name": req.query.gysp,
        "type": req.query.qglb,
        "get_weight": req.query.qgsl,
        "get_price": req.query.qgdj,
        "get_site": {
            "city": req.query.cd,
            "pro": "河南"
        },
    };
    huinong_info.add_get_id(tel, get_data, function (err) {
        if (err) {
            console.log("失败");
        }
        console.log("成功");
        res.render('qiugou-success.ejs', {
            get_tel: tel
        });
    });
};

/*首页直接发布求购信息*/
exports.edit_get_goods_index = function (req, res, next) {
    if (req.session.login) {
        // console.log("直接跳转");
        // /my/:info_tel"
        /*直接跳转到发布页面*/
        res.redirect("/bianjiqiugouxinxi/" + req.session.user_tel);
    } else {
        // console.log("登录吧");
        res.render("login.ejs", {
            "not": 0
        });
    }
};

/*我的供应货物*/
exports.my_seller = function (req, res, next) {
    // 查询数据 ==》我的供应大厅
    var info_tel = req.params["info_tel"];

    var user_tel_data = {
        "info_tel": info_tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {

        if (err) {
            console.log("do页面失败");
        }
        var seller_all = result[0].seller_all;

        if (seller_all.length != 0) {
            for (var i = 0; i < seller_all.length; i++) {
                seller_all[i].tel = result[0].info_tel;
            }
        }
        seller_all.tel = info_tel;
        // console.log(seller_all);
        /*查询数据库显示 个人资料*/
        var my_data = {
            seller_all: seller_all
        };
        console.log(seller_all.tel);
        res.render('my-gongyinglist.ejs', my_data);
    })
};
/*我的求购信息*/
exports.my_get = function (req, res, next) {
    var info_tel = req.params["info_tel"];

    var user_tel_data = {
        "info_tel": info_tel
    };

    huinong_info.login_info(user_tel_data, function (err, result) {
        if (err) {
            console.log("do页面失败");
        }
        console.log("我的求购列表");
        var get_all = result[0].get_all;
        if (get_all.length != 0) {
            for (var i = 0; i < get_all.length; i++) {
                get_all[i].tel = result[0].info_tel;
            }
        }
        get_all.tel = info_tel;
        /*查询数据库显示 个人资料*/
        my_data = {
            get_all: get_all
        };
        res.render('my-qiugoulist.ejs', my_data);
    })
};

/*删除求购信息*/
exports.delete_get_goods = function (req, res, next) {
    // console.log(req.query);
    // 查询数据 ==》删除时数据

    var number = req.query.delete_get_number;
    var tel = req.query.detele_tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        // console.log(result[0].get_all[number]);
        // 删除数据
        huinong_info.delet_get_id(tel, result[0].get_all[number], function (err) {
            if (err) {
                console.log("删除失败");
            }
            ;
            console.log("删除成功");
            res.redirect("/qiugoudating");
        });
    });

};
/*修改求购信息==》渲染到修改页面*/
exports.modify_get_goods = function (req, res, next) {
    // 传递数据到前台进行渲染
    var number = req.query.delete_get_number;
    var tel = req.query.detele_tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        result[0].get_all[number].tel = tel;
        result[0].get_all[number].number = number;
        res.render("modify_get_goods.ejs", {
            modify_get_goods: result[0].get_all[number]
        })
    });
};
/*求购数据确认修改成功 ==》 1.success页面 2.渲染到修改页面继续修改*/
exports.affirm_modify_get_goods = function (req, res, next) {
    var tel = req.query.tel;
    var number = req.query.number;

    /*type判断*/
    if (req.query.qglb == "蔬菜") {
        req.query.qglb = 1;
    } else if (req.query.qglb == "水果") {
        req.query.qglb = 2;

    } else if (req.query.qglb == "禽畜") {
        req.query.qglb = 3;

    } else if (req.query.qglb == "水产") {
        req.query.qglb = 4;
    } else {
        req.query.qglb = 5;
    }

    var get_data = {
        "get_desc": req.query.form_id,
        "get_name": req.query.gysp,
        "type": req.query.qglb,
        "get_weight": req.query.qgsl,
        "get_price": req.query.qgdj,
        "get_site": {
            "city": req.query.cd,
            "pro": "河南"
        },
    };
    /*
     * 1.使用tel查询数据  ==>tel
     * 2.删除数据    ==>老数据number  新数据
     * 3.添加数据
     * */

    var find_tel = {
        info_tel: tel
    };
    huinong_info.login_info(find_tel, function (err, result) {
        if (err) {
            console.log("失败");
        }
        var obj = result[0].get_all[number];
        huinong_info.delet_get_id(tel, obj, function (err, result) {
            if (err) {
                console.log("错误");
            }
            ;
            //添加数据
            huinong_info.add_get_id(tel, get_data, function (err) {
                if (err) {
                    console.log("修改错误");
                } else {
                    console.log("修改ok");
                    res.render('qiugou-success.ejs', {
                        get_tel: tel
                    });
                }
            })
        })
    });
};

exports.delete_seller_goods = function (req, res, next) {
    // 查询数据 ==》删除时数据

    var number = req.query.delete_seller_number;
    var tel = req.query.detele_tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        // 删除数据
        huinong_info.delet_seller_id(tel, result[0].seller_all[number], function (err) {
            if (err) {
                console.log("删除失败");
            }
            ;
            console.log("删除成功");
            res.redirect("/gongyingdating");
        });
    });


};
/*修改供应信息*/
exports.modify_seller_goods = function (req, res, next) {
    // 传递数据到前台进行渲染
    var number = req.query.modify_seller_number;
    var tel = req.query.detele_tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        var obj = result[0].seller_all[number];
        obj.tel = tel;
        obj.number = number;
        /*打包数组后传递*/
        if (obj.pics[0]) {
            var pic1 = obj.pics[0];
        } else {
            pic1 = "/img/slect-pic.png";
        }
        if (obj.pics[1]) {
            var pic2 = obj.pics[1];
        } else {
            pic2 = "/img/slect-pic.png";
        }
        if (obj.pics[2]) {
            var pic3 = obj.pics[2];
        } else {
            pic3 = "/img/slect-pic.png";
        }
        obj.pics = null;
        obj.pic1 = pic1;
        obj.pic2 = pic2;
        obj.pic3 = pic3;

        res.render("modify_seller_goods.ejs", {
            modify_seller_goods: obj
        });
    });
};

/*求购数据确认修改成功 ==》 1.success页面 2.渲染到修改页面继续修改*/
exports.affirm_modify_seller_goods = function (req, res, next) {
    var tel = req.body.tel;
    var number = req.body.number;

    /*type判断*/
    if (req.body.qglb == "蔬菜") {
        req.body.qglb = 1;
    } else if (req.body.qglb == "水果") {
        req.body.qglb = 2;

    } else if (req.body.qglb == "禽畜") {
        req.body.qglb = 3;

    } else if (req.body.qglb == "水产") {
        req.body.qglb = 4;
    } else {
        req.body.qglb = 5;
    }

    var seller_data = {
        "seller_desc": req.body.form_id,
        "seller_name": req.body.gysp,
        "type": req.body.qglb,
        "seller_weight": req.body.qgsl,
        "seller_price": req.body.qgdj,
        "seller_site": {
            "city": req.body.cd,
            "pro": "河南"
        },
        "pics": req.body.pictData
    };
    /*
     * 1.使用tel查询数据  ==>tel
     * 2.删除数据    ==>老数据number  新数据
     * 3.添加数据
     * */

    var find_tel = {
        info_tel: tel
    };
    huinong_info.login_info(find_tel, function (err, result) {
        if (err) {
            console.log("失败");
        }
        //拿到数据==》删除相应数据==>插入新数据
        var obj = result[0].seller_all[number];
        huinong_info.delet_seller_id(tel, result[0].seller_all[number], function (err, result) {
            if (err) {
                console.log("错误");
            }
            ;
            //添加数据
            huinong_info.add_seller_id(tel, seller_data, function (err) {
                if (err) {
                    console.log("修改错误");
                } else {
                    console.log("修改ok");
                    res.json({seller_tel: tel});
                    // res.render('gongying-success.ejs', {
                    //     seller_tel: tel
                    // });
                }
            })
        })
    });
};


exports.delete_my_qiugoulistxiangqing = function (req, res, next) {
    var number = req.query.delete_get_number;
    var tel = req.query.detele_tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        // 删除数据
        huinong_info.delet_get_id(tel, result[0].get_all[number], function (err) {
            if (err) {
                console.log("删除失败");
            }
            ;
            // /my-qiugoulist/:info_tel", newRouter.my_get
            console.log("删除成功");
            /*重定向到my-qiugoulist*/
            res.redirect("/my-qiugoulist/" + tel);
        });
    });
};
exports.modify_my_qiugoulistxiangqing = function (req, res, next) {
    var number = req.query.delete_get_number;
    var tel = req.query.detele_tel;
    var user_tel_data = {
        info_tel: tel
    };
    huinong_info.login_info(user_tel_data, function (err, result) {
        result[0].get_all[number].tel = tel;
        result[0].get_all[number].number = number;
        res.render("modify_get_goods.ejs", {
            modify_get_goods: result[0].get_all[number]
        })
    });
};
exports.aaa = function (req, res, next) {
    res.send("1111");
};