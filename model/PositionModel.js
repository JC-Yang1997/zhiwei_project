const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/zhiwei_project");
const schema = mongoose.Schema({
	logo:String,
	name:String,
	company:String,
	experience:String,
	type:String,
	address:String,
	money:String
});
// Position代表当前数据表
const Position = mongoose.model("position",schema);
const PositionModel = {
	//没有上传图片时候的数据库录入函数
	// save:function(posiinfo,success,error){
	// 	console.log(posiinfo);
	// 	const position = new Position(posiinfo);
	// 	position.save((err,posiinfo)=>{
	// 		if(err){
	// 			error(err);
	// 		}else{
	// 			success(posiinfo);
	// 		}
	// 	});
	// },
	save:function(positionInfo,success,error){
		const pos = new Position(positionInfo);
		pos.save((err,data)=>{
			if(err){
				error(err);
				return;
			}
			success(data);
		});
	},
	update:function(updateinfo,success,error){
		const {_id} = updateinfo;
		const {name,logo,company,experience,type,address,money} = updateinfo;
		Position.update({_id},{name,logo,company,experience,type,address,money}).then(success,error);
	},
	findListByPage:function(pageIndex,success,error){
		const pageSize = 7;
		Position.find()
				.limit(pageSize)
				.skip((pageIndex-1)*pageSize)
				.then(success,error);
				//.then();为promise对象中的用法
	},
	findThisId:function(currID,success,error){
		Position.find(currID).then(success,error);
	},
	dropThisId:function(currID,success,error){
		// console.log(currID);
		if(currID){
			Position.remove(currID).then(success,error);
		}
	}
}
module.exports = PositionModel;