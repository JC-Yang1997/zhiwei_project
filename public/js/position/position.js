function position(){
	this.loadHeader();
	this.ifLogin();
	this.addEventListener();
}
$.extend(position.prototype,{
	loadHeader : function(){
		new Header();
		$(".hover-choose").addClass("active").siblings().removeClass("active");
	},
	addEventListener:function(){
		const that = this;
		$("#addPosition").on("click",$.proxy(this.handlePosition,this));
		$("#updatePosition").on("click",$.proxy(this.updatePosition,this));
		$(".pagination").on("click",".pageid",function(){
			const currentPage = $(this).find("a").text();
			$(this).addClass("active").siblings().removeClass("active");
			that.listByPage(currentPage);
		});
		$(".pagination").on("click",".fanye-r",function(){
			const currentPage = $(".pagination").find(".active a").text();
			const nextPage = parseInt(currentPage) + 1;
			if(nextPage<=5){
			 $(".pagination").find(".active").removeClass("active").next().addClass("active");
			 that.listByPage(nextPage);
			}
		});
		$(".pagination").on("click",".fanye-l",function(){
			const currentPage = $(".pagination").find(".active a").text();
			const nextPage = parseInt(currentPage) - 1;
			if(nextPage>=1){
			 $(".pagination").find(".active").removeClass("active").prev().addClass("active");
			 that.listByPage(nextPage);
			}
		});
	},
	updatePosition:function(){
		const that = this;
		const updateformData = new FormData($("#update-form").get(0));
		$.ajax({
			type:"post",
			url:"/api/positions/updateposition",
			data:updateformData,
			processData:false,
			contentType:false,
			dataType:"json",
			success:function(data){
				if(data.res_code===1){
					$("#updateModal").modal("hide");
					that.listByPage(1);
					location.reload();
				}else{
					$(".pos-jg").removeClass("hide");
				}
			}
		});
	},
	findThisPosition:function(currentid){
		
		$.post("/api/positions/findthis",{_id:currentid},function(data){
			if(data.res_code===1){
				$("#update-id").val(data.res_body[0]._id);
				$("#update-name").val(data.res_body[0].name);
				$("#update-company").val(data.res_body[0].company);
				$("#update-experience").val(data.res_body[0].experience);
				$("#update-type").val(data.res_body[0].type);
				$("#update-address").val(data.res_body[0].address);
				$("#update-money").val(data.res_body[0].money);
			}else{
				console.log("error!!!" + data.res_error);
			}
		},"json");
	},
	handlePosition:function(){
		// 创建FormData对象
		var formData = new FormData($("#pos-form").get(0));
		// 利用ajax向服务器传递数据，包括图像资源
		$.ajax({
			type:"post",
			url:"/api/positions/addpositions",
			data:formData,
			processData:false,
			contentType:false,
			dataType:"json",
			success:function(data){
				if(data.res_code===1){
					$("#posiModal").modal("hide");
					location.reload();
				}else{
					$(".pos-jg").removeClass("hide");
				}
			}
		});
	},
	listByPage:function(currentPage){
		const that = this;
		currentPage = currentPage||1;
		// console.log(currentPage);(其中包含_id唯一标识)
		$.get("/api/positions/list",{pageIndex:currentPage},function(data){
			if(data.res_code===1){
				const html = template("pos-list",{list:data.res_body});
				$("#info-list").html(html);
				//判断用户是否有操作权限
				if(true){
					const name = $("#username").html().slice(4,);
					$.post("/api/users/checkright",{username:name},function(data){
						// console.log(data);
						if(data.res_body[0].right==="false"){
							$(".tishi").removeClass("hide");
							$("#tianjia").addClass("hide");
							$("#caozuo").addClass("hide");
							$(".td-xiugai").addClass("hide");
							$(".td-shanchu").addClass("hide");
						}else{
							$(".tishi").addClass("hide");
							$("#tianjia").removeClass("hide");
							$("#caozuo").removeClass("hide");
							$(".td-xiugai").removeClass("hide");
							$(".td-shanchu").removeClass("hide");
						}
					},"json");
				}
				//用了模板引擎的点击要紧跟着模板引擎后面（防止异步导致点击失效）
				$(".xiugai").on("click",function(){
					const currentid = $(".mogo-id",this.parentNode.parentNode).text();
					that.findThisPosition(currentid);
				});
				$(".shanchu").on("click",function(){
					const sure = confirm("确定删除此条数据？");
					if(sure){
						// 删库功能
						const currentid = $(".mogo-id",this.parentNode.parentNode).text();
						$.post("/api/positions/findthis",{_id:currentid},function(data){
							if(data.res_code===1){
								// console.log(data.res_body[0]._id);
								//异步函数嵌套
								$.post("/api/positions/dropthis",{_id:data.res_body[0]._id},function(cb_code){
										if(cb_code.res_code===1){
										console.log("当前数据删除成功");
										location.reload();
									}else{
										console.log("当前数据删除失败");
									}
								},"json");
							}else{
								console.log("error!!!" + data.res_error);
							}
						},"json");	
					}
				});
		    }
		},"json");
	},
	ifLogin:function(){
		const that = this;
		$.get("/api/users/check",function(data){
			if(data.res_code===0){
				location = "/";
			}else{
				that.listByPage(1);
			}
		});
	 }
});

new position();