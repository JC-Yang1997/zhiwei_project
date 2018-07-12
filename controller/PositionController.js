const PositionModel = require("../model/PositionModel");
const PositionController = {
	add : function(req,res,next){
		const {name,company,experience,type,address,money} = req.body;
		let logo = "";
		if(req.file){
			logo = "/upload/" + req.file.filename;
		}
		PositionModel.save({logo,name,company,experience,type,address,money},(data)=>{
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
	read:function(req,res,next){
		const {pageIndex} = req.query;
		PositionModel.findListByPage(pageIndex,(data)=>{
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
	findThis:function(req,res,next){
		const id = req.body;
		PositionModel.findThisId(id,(data)=>{
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
	dropThis:function(req,res,next){
		const {_id} = req.body;
		PositionModel.dropThisId({_id},(data)=>{
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
	update:function(req,res,next){
		const {_id,name,company,experience,type,address,money} = req.body;
		let logo = "";
		if(req.file){
			logo = "/upload/" + req.file.filename;
		}
		PositionModel.update({_id,logo,name,company,experience,type,address,money},(data)=>{
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
	}
};

module.exports = PositionController;