var express=require("express");
var app=express();
app.use('/',function(req,res){
	res.send("1111111");
})
app.listen(3030);