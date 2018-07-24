var express = require("express");
var router = express.Router();
var PositionController = require("../controller/PositionController");
//配置文件上传

//---------------------------文件上传核心代码部分---------------------------------

var multer = require("multer");
//配置磁盘存储
var storage = multer.diskStorage({
	//保存到磁盘的目标位置
	destination:function(req,file,cb){
		cb(null,'./public/upload');//将上传文件保存到public下的upload子目录中
	},
	//配置保存文件的文件名规则
	filename:function(req,file,cb){
		//logo-时间戳(如：21655164651).gif
		//加上时间戳（不怕占内存的情况下可以这样）
		// '-' + Date.now() +
		cb(null,file.fieldname + '-' + file.originalname);
	}
});

//创建上传实例
var upload = multer({storage:storage});

//路由：post方式请求/add资源，添加职位
//实现文件上传
router.post('/addpositions',upload.single("logo"),PositionController.add);
router.post('/updateposition',upload.single("logo"),PositionController.update);

//---------------------------文件上传核心代码部分---------------------------------

router.get("/list",PositionController.read);
router.post("/findthis",PositionController.findThis);
router.post("/dropthis",PositionController.dropThis);

module.exports = router;
