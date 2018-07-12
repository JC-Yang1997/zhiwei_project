function RegModal(){
	this.createDom();
	this.addEventListener();
}

RegModal.template = `<div class="reg-model modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="regModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="regModalLabel">注册用户</h4>
		      </div>
		      <div class="modal-body">
		        <div class="alert alert-danger hide jinggao" role="alert">用户注册失败！请重新填写</div>
		         <form id="reg-form">
				  <div class="form-group">
				    <label for="reg-username">用户名</label>
				    <input type="text" name="username" class="form-control" id="reg-username" placeholder="请输入您的用户名">
				  </div>
				  <div class="form-group">
				    <label for="reg-password">密码</label>
				    <input type="password" name="password" class="form-control" id="reg-password" placeholder="请输入您的密码">
				  </div>
				  <div class="form-group">
				    <label for="reg-conf-password">确认密码</label>
				    <input type="password" class="form-control" id="reg-conf-password" placeholder="请再次输入您的密码">
				  </div>
				  <div class="form-group">
				    <label for="reg-email">邮箱</label>
				    <input type="text" name="email" class="form-control" id="reg-email" placeholder="请输入您的邮箱地址">
				  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary" id="register">注册</button>
		      </div>
		    </div>
		  </div>
		</div>`;

$.extend(RegModal.prototype,{
	createDom : function(){
		$(RegModal.template).appendTo("body");
	},
	addEventListener:function(){
         $("#register").on("click",$.proxy(this.handAddUsers,this));
	},
	handAddUsers:function(){
		// console.log(1);
		$.post("/api/users/addusers",$("#reg-form").serialize(),function(data){
			if(data.res_code===1){
				$("#regModal").modal("hide");
			}else{
				$(".jinggao").removeClass("hide");
			}
		},"json");
	}
});
