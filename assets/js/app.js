$(function() {
	var $fullText = $('.admin-fullText');
	$('#admin-fullscreen').on('click', function() {
		$.AMUI.fullscreen.toggle();
	});
	$(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
		$fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
	});
	var dataType = $('body').attr('data-type');
	$('.tpl-switch').find('.tpl-switch-btn-view').on('click', function() {
		$(this).prev('.tpl-switch-btn').prop("checked", function() {
			if($(this).is(':checked')) {
				return false
			} else {
				return true
			}
		})
	})
	//获取页面其他元素
	$.get("assets/html/nav_left.html?"+Math.random(), function(result) {
		//获取左侧菜单元素
		$("#nav_left").html(result);
		// ==========================
		// 侧边导航下拉列表
		// ==========================
		$('.tpl-left-nav-link-list').on('click', function() {
			if("none" == $(this).siblings('.tpl-left-nav-sub-menu').css("display")) {
				$('.tpl-left-nav-sub-menu').css("display", "none");
			}
			$(this).siblings('.tpl-left-nav-sub-menu').slideToggle(400)
				.end()
				.find('.tpl-left-nav-more-ico').toggleClass('tpl-left-nav-more-ico-rotate');
		})
		//按url location 来判断左侧菜单位置
		var nav_location = getUrlParam("location");
		if(nav_location){
			$(".tpl-left-nav-sub-menu").eq(nav_location.split("-")[0]).css("display","block")
			.children().children("a").eq(nav_location.split("-")[1]).addClass("active");
			$(".am-fr").eq(nav_location.split("-")[0]).toggleClass("tpl-left-nav-more-ico-rotate");
			
		}else{
			$(".nav_a_class").eq(0).addClass("active");
		}
	});
})

// ==========================
// 头部导航隐藏菜单
$('.tpl-header-nav-hover-ico').on('click', function() {
	$('.tpl-left-nav').toggle();
	$('.tpl-content-wrapper').toggleClass('tpl-content-wrapper-hover');
})
// ==========================
//获取url方法
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
//AJAX封装方法
function AJAXData(url,type,data,fun){
	$.ajax({
		type:type,
		url:url,
		data:data,
		success:function(res){
			fun(res)
		},
		error:function(res){
			console.log("链接出错!!!---------------");
			console.log(res);
		}
	});
}
//VUE封装方法
function NewVueFun(el,data){
	return new Vue({
		  el: el,
		  data: data
	})
}