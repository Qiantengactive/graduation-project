var db = require("./db");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(db);

var huinongSchema = new mongoose.Schema({
    "info_name": String,
    "info_tel": {type: String, unique: true},
    "info_pwd": String,
    "info_avater": {
        type: String,
        default: "/img/my-img.png"
    },
    "info_site": {
        "info_pro": String,
        "info_city": String,
        "info_coutnty": String,
        "info_detail_add": String
    },
    "seller_all": Array,
    "get_all": Array
});
// 索引
huinongSchema.index({"info_id": 1});

/*自增*/
huinongSchema.plugin(autoIncrement.plugin, {
    model: 'huinong_info',
    field: 'info_id',
    startAt: 1,
    incrementBy: 1
});

/*列出所有的信息*/
huinongSchema.statics.all_info = function (callback) {
    this.model("huinong_info").find({}, callback);
};
/*登录功能
 * data_login
 * {
 *   "info_tel":111111111,
 *   "info_pwd":111111111
 * }
 * */
huinongSchema.statics.login_info = function (data_login, callback) {
    this.model("huinong_info").find(data_login, callback);
};

/*注册功能
 *user_data是每一个用户的json
 *
 * */
huinongSchema.statics.do_regist = function (user_data, callback) {
    this.model("huinong_info").create(user_data, callback);
};

/*添加供应信息id*/
huinongSchema.statics.add_seller_id = function (tel, seller_info, callback) {
    // seller_info是数组
    this.model("huinong_info").update({info_tel: tel}, {$push: {seller_all: seller_info}}, callback);
};
/*删除供应信息id*/
huinongSchema.statics.delet_seller_id = function (tel, seller_info, callback) {
    this.model("huinong_info").update({info_tel: tel}, {$pull: {seller_all: seller_info}}, callback);
};

/*添加求购信息id*/
huinongSchema.statics.add_get_id = function (tel, get_info, callback) {
    // seller_info是数组
    this.model("huinong_info").update({info_tel: tel}, {$push: {get_all: get_info}}, callback);
};

// db.test.update({"msgid":170},{"$pull":{"msg":{"comtime":1392346547}}})
/*删除求购信息id*/
huinongSchema.statics.delet_get_id = function (tel, get_info, callback) {
    this.model("huinong_info").update({info_tel: tel}, {$pull: {get_all: get_info}}, callback);
};
// /*修改求购信息*/
// huinongSchema.statics.modify_get_id = function (old_data, nex_data, callback) {
//     this.model("huinong_info").update(old_data, nex_data, callback);
// };

/*修改图片数据*/
huinongSchema.statics.do_photo = function (tel, base64, callback) {
    this.model("huinong_info").update({info_tel: tel}, {$set: {info_avater: base64}}, callback);
};


var person_info = mongoose.model("huinong_info", huinongSchema);

module.exports = person_info;






