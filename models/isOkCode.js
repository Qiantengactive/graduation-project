var App = require('alidayu-node');
var app = new App('23738060', 'df2d95b2fd983b880c203daee0832200');

exports.isOkCode = function (receiveTel,isOkCode) {
    app.smsSend({
        sms_free_sign_name: '豫农管家', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"number": isOkCode}),//短信变量，对应短信模板里面的变量
        rec_num: receiveTel , //接收短信的手机号
        sms_template_code: 'SMS_60230020' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
    });
    console.log("isOkCode is ok");
}
