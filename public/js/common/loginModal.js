 function LoginModal(){
 	this.createDom();
 	this.addEventListener();
 }
 LoginModal.template = `<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="loginModalLabel">登录验证</h4>
		      </div>
		      <div class="modal-body">
		       <form id="loginCheckForm">
		       <div class="alert alert-danger hide login_error" role="alert">用户登录失败，用户名或密码错误...</div>
				  <div class="form-group" id="login-form">
				    <label for="login-username">用户名</label>
				    <input type="email" name="username" class="form-control" id="login-username" placeholder="请输入您的用户名">
				  </div>
				  <div class="form-group">
				    <label for="login-password">密码</label>
				    <input type="password" name="password" class="form-control" id="login-password" placeholder="请输入您的密码">
				  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary" id="login">登录</button>
		      </div>
		    </div>
		  </div>
		</div>`; 

$.extend(LoginModal.prototype,{
	createDom : function(){
		$(LoginModal.template).appendTo("body");
	},
	addEventListener:function(){
		$("#login").on("click",this.handleLogin);
	},
	handleLogin:function(){
		$.post("/api/users/login",$("#loginCheckForm").serialize(),function(data){
			if(data.res_code===1){
				$("#loginup a").html("欢迎您，"+ data.res_body.username);
				$(".login-success").removeClass("hide");
				$(".log-reg").addClass("hide");
				$("#loginModal").modal("hide");
				location = "/html/position.html";
			}else{
				$(".login_error").removeClass("hide");
			}
		},"json");
	}
});
