var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yunongguanjia5");
// mongoose.connect("mongodb://localhost/new");

var db=mongoose.connection;

db.once("open",function (callback) {
    console.log("数据库成功打开");
});
module.exports=db;