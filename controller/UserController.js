const UserModel = require("../model/UserModel");
const PositionModel = require("../model/PositionModel");

const UserController = {
	register:function(req,res,next){
		const {username,password,email} = req.body;
		UserModel.save({username,password,email},(msg)=>{
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
		console.log(req.body)
		UserModel.checkusers({username,password},(data)=>{
			console.log(data);
			if(data.length===1){
				req.session.LoginUser = data[0].username;
				res.json({
					res_code:1,
					res_error:"",
					res_body:{username:data[0].username,email:data[0].email}
				});
			}else{
				res.json({
					res_code:-1,
					res_error:"用户名或密码错误",
					res_body:{}
				});
			}
		},(err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
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
