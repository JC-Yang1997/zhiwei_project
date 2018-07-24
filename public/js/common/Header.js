function Header(){
	this.createDom();
	this.createRegModal();
	this.createLoginModal();
	this.addEventListener();
	this.checkSession();
}

Header.template = `<nav class="navbar navbar-inverse">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="/">职位管理系统</a>
		    </div>
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		        <li class="active"><a href="/">首页</a></li>
		        <li class="hover-choose"><a href="/html/position.html">职位管理</a></li>
		      </ul>
		      <ul class="nav navbar-nav navbar-right log-reg">
		        <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
		        <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
		      </ul>
		      
		       <ul class="nav navbar-nav navbar-right hide login-success">
		       <li id="loginup"><a href="#" id="username"></a></li>
		       <li id="loginout"><a href="#">退出</a></li>
		       </ul>
		      
		    </div>
		  </div>
		</nav>`;

$.extend(Header.prototype,{
	createDom : function(){
		$(Header.template).appendTo(".header");
	},
	createRegModal : function(){
		new RegModal();
	},
	createLoginModal : function(){
		new LoginModal();
	},
	checkSession:function(){
		$.get("/api/users/check",function(data){
			if(data.res_code===1){
				$("#loginup a").html("欢迎您，"+ data.res_body.username);
				$(".login-success").removeClass("hide");
				$(".log-reg").addClass("hide");
			}
		},"json");
	},
	addEventListener:function(){
		$("#loginout").on("click",this.loginout);
	},
	loginout:function(){
		$.get("/api/users/loginOut",function(){
			location.reload();
		});
	}
});
