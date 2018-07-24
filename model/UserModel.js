//引入数据库模块
const mongoose = require("mongoose");
//连接数据库并新建库
mongoose.connect("mongodb://localhost:27017/zhiwei_project");
//定义数据表格式（相当于将非关系型数据库转为关系型数据库）
const schema = mongoose.Schema({
	username:String,
	password:String,
	email:String,
	right:String
});
//新建数据表
const User = mongoose.model("user",schema);
const UserModel = {
	save:function(userinfo,success,error){
		const user = new User(userinfo);
		user.save((err,userinfo)=>{
			if(err){
				error(err);
			}else{
				success(userinfo);
			}
		});
	},
	checkusers:function(ifusers,success,error){
		// console.log(ifusers);
		User.find(ifusers).then(success,error);
	},
	checkright:function(thisuser,success,error){
		User.find(thisuser).then(success,error);
	}
}
module.exports = UserModel;
