const UserModel = require("../model/UserModel");
const PositionModel = require("../model/PositionModel");

const UserController = {
	register:function(req,res,next){
		const {username,password,email} = req.body;
		UserModel.save({username,password,email,right:false},(msg)=>{
			res.json({
				res_code:1,
				res_error:"",
				res_body:msg
			});
		},(err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
			});
		});
	},
	addposition:function(req,res,next){
		const {name,company,experience,type,address,money} = req.body;
		PositionModel.save({name,company,experience,type,address,money},(msg)=>{
			res.json({
				res_code:1,
				res_error:"",
				res_body:msg
			});
		},(err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
			});
		});
	},
	login:function(req,res,next){
		const {username,password} = req.body;
		UserModel.checkusers({username,password},(data)=>{
			// console.log(data);
			if(data){
				req.session.LoginUser = data[0].username;
				res.json({
					res_code:1,
					res_error:"",
					res_body:data
				});
			}else{
				res.json({
					res_code:-1,
					res_error:"",
					res_body:{content:"用户名密码错误……"}
				});
			}
		},(err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:"操作出错！！！"
			});
		});
	},
	checkSession:function(req,res,next){
		const user = req.session.LoginUser;
		if(user){
			res.json({
				res_code:1,
				res_error:"",
				res_body:{username:user}
			});
		}else{
			res.json({
				res_code:0,
				res_error:"login time out !",
				res_body:{}
			});
		}
	},
	checkRight:function(req,res,next){
		const {username} = req.body;
		UserModel.checkright({username},(data)=>{
			res.json({
					res_code:1,
					res_error:"",
					res_body:data
				});
		},(err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
			});
		});
	},
	loginOut:function(req,res,next){
		req.session = null;
		res.json({
			res_code:0,
			res_error:"",
			res_body:{}
		});
	}
}
module.exports = UserController;
