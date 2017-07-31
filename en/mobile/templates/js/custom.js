// JavaScript Document
$(function(){
		   
	//首页--header下拉
	var $navA = $(".header-nav>a");
	$navA.bind("click",function(){
		var navA_index = $navA.index(this);	
		var $navBlock = $(".nav-box>.nav-block").eq(navA_index);
		if($navBlock.is(":hidden")){
			$navBlock.show().siblings(".nav-block").hide();
		}else{
			$navBlock.hide().siblings(".nav-block").hide();
		}
	});
		   

	//首页--二级导航下拉
	$(".page-nav>li").bind("click",function(){
		if($(this)[0].state == 0 || $(this)[0].state == undefined){
			$(this).addClass("cur").siblings().removeClass("cur");
			$(".page-nav>li").children(".sPage-nav").hide()
			$(this).children(".sPage-nav").show();
			$(this)[0].state = 1;
		}else if($(this)[0].state == 1){
			$(this).removeClass("cur");
			$(this).children(".sPage-nav").hide();
			$(this)[0].state = 0;
		}
	});
	
	
	//产品--图片-宽度
	if($(".pro-img").length != 0){
		var pWidth = $(".pro-img")[0].offsetWidth;
		$(".pro-img").css("height",pWidth);
	}
	
	//产品数量
	$(".nb-min").bind("click",function(){
		var num = parseInt($(this).siblings(".num-text").attr("value"));
		if(num > 1){
			$(this).siblings(".num-text").attr("value",num-1);
		}else{
			$(this).siblings(".num-text").attr("value",num);
		}
	});
	
	$(".nb-plus").bind("click",function(){
		var num = parseInt($(this).siblings(".num-text").attr("value"));
		$(this).siblings(".num-text").attr("value",num+1);
	});
	
	//产品参数显示
	$(".pi-detail").click(function(){	
		var $detail = $(this).siblings(".detail-block");
		if($detail.is(":hidden")){
			$detail.fadeIn(200);
		}else{
			$detail.hide();
		}
	});
	
	
	//问题展示
	$(".que-block").bind("click",function(){
		var $answer = $(this).children(".answer");
		if($answer.is(":hidden")){
			$answer.fadeIn(200);
			$(this).find(".icon-que").addClass("que-hide");
		}else{
			$answer.hide();
			$(this).find(".icon-que").removeClass("que-hide");
		}
	});
	
	
	//购物车--编辑
	var oState = true;
	$(".h-opera").bind("click",function(){
		if(oState){
			$(this).html("完成");
			$(".sc-i-show").css("display","none");
			$(".sc-i-edit").css("display","block");
			oState = false;
		}else{
			$(this).html("编辑");
			$(".sc-i-edit").css("display","none");
			$(".sc-i-show").css("display","block");
			oState = true;
		}
	});
	
	//购物车--加减
	$(".edit-btn.edit-min").bind("click",function(){//减
		var numTxt = parseInt($(this).siblings(".edit-total").attr("value"));
		if(numTxt>1){
			$(this).siblings(".edit-total").attr("value",numTxt-1);
			$(this).parents(".sc-info").find(".sc-num").html(numTxt-1);
		}else{
			return false;
		}
	});
	
	$(".edit-btn.edit-plus").bind("click",function(){//加
		var numTxt = parseInt($(this).siblings(".edit-total").attr("value"));
		$(this).siblings(".edit-total").attr("value",numTxt+1);
		$(this).parents(".sc-info").find(".sc-num").html(numTxt+1);
	});
	
	
	
	
	//购物车--全选
	$(".sc-ac").bind("click",function(){
		var $ac = $(this).children(".ac");
		var $cb = $(".cb");
		if(!$ac.is(".aCheck")){
			$ac.attr("checked",true);
			$ac.addClass("aCheck");
			$cb.attr("checked",true);
			$cb.addClass("check");
		}else{
			$ac.attr("checked",false);
			$ac.removeClass("aCheck");
			$cb.attr("checked",false);
			$cb.removeClass("check");
		}
	});
	
	$(".sc-cb").bind("click",function(){
		var $cb = $(this).children(".cb");
		if(!$cb.is(".check")){
			$cb.attr("checked",true);
			$cb.addClass("check");
		}else{
			$cb.attr("checked",false);
			$cb.removeClass("check");
		}
		check();
	})
	
	function check(){
		var cb_length = $(".cb").length;
		var cb_check = $(".cb.check").length;
		if(cb_check == 0){
			$(".ac").attr("checked",false);
			$(".ac").removeClass("aCheck");	
		}else if(cb_check == cb_length){
			$(".ac").attr("checked",true);
			$(".ac").addClass("aCheck");	
		}else{
			$(".ac").attr("checked",false);
			$(".ac").removeClass("aCheck");
		}
	}
	
	
	//支付选择
	$(".pm-block").bind("click",function(){
		$(this).addClass("cur").siblings(".pm-block").removeClass("cur");
		$(this).find(".pm-radio").attr("checked",true);
		$(this).siblings(".pm-block").find(".pm-radio").attr("checked",false);
	});
	
	//注册--是否同意用户协议
	$(".rl-check").bind("click",function(){
		if(!$(this).is(".cur")){
			$(this).addClass("cur").attr("checked",true);
		}else{
			$(this).removeClass("cur").attr("checked",false);
		}
	});
	
	
	//添加地址--默认地址
	$(".is-adrDef").bind("click",function(){
		var $cb = $(this).find("input[type=checkbox]");
		if(!$cb.is(".aCheck")){
			$cb.addClass("aCheck").attr("checked",true);
		}else{
			$cb.removeClass("aCheck").attr("checked",false);
		}
	});
	
	
	//用户资料--性别选择
	$(".ui-block .ui-radio").bind("click",function(){
		$(this).addClass("cur").attr("checked",true).siblings().removeClass("cur").attr("checked",false);
	});
	
	//地址管理--默认地址
	$(".adr-opera .adr-check").bind("click",function(){
		$(".adr-opera .adr-check").removeClass("check").attr("checked",false);
		$(this).addClass("check").attr("checked",true);
	});
	
	//颜色选择
	$(".ps-list>li").bind("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	
	
})