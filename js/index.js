//全屏模式
    $('.admin-side-full').on('click', function () {
        var docElm = document.documentElement;
        //W3C  
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        //FireFox  
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        //Chrome等  
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        layer.msg('按Esc即可退出全屏');
    });
//手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade');
    treeMobile.on('click', function () {
        $('body').addClass('site-mobile');
    });
    shadeMobile.on('click', function () {
        $('body').removeClass('site-mobile');
    });
/*登陆账号切换*/
	$('.role-cut dd').click(function(){
		$(this).parent().siblings('a').find('span').text($(this).text());
		$(this).parent().removeClass('layui-show');
	});
/*左侧  nav 展开收起*/
	$(function(){
	    $('.nav-item>a').on('click',function(){
	        if (!$('.nav').hasClass('nav-mini')) {
	            if ($(this).next().css('display') == "none") {
	                $('.nav-item').children('ul').slideUp(300);
	                $(this).next('ul').slideDown(300);
	                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
	            }else{
	                $(this).next('ul').slideUp(300);
	                $('.nav-item.nav-show').removeClass('nav-show');
	            }
	        }
	    });
	    //nav-mini
	    $('#mini').on('click',function(){
	        if (!$('.nav').hasClass('nav-mini')) {
	            $('.nav-item.nav-show').removeClass('nav-show');
	            $('.nav-item').children('ul').removeAttr('style');
	            $('.nav').addClass('nav-mini');
	        }else{
	            $('.nav').removeClass('nav-mini');
	        }
	    });
	});
/*侧栏关闭打开动画*/
	var ceBtnSwitch = true;
	$('.admin-side-toggle').click(function(){
		if(ceBtnSwitch == true){
			$('#admin-side').animate({width:'0'});
			$('.layui-body').animate({left:'0'});
			ceBtnSwitch = false;
		}else{
			$('#admin-side').animate({width:'200px'});
			$('.layui-body').animate({left:'200px'});
			ceBtnSwitch = true;
		}
	});
//添加tab
	layui.config({
    base: 'js/',
    version: new Date().getTime()
}).use(['element','jquery'],function(){
		var element = layui.element(),
			$ = layui.jquery;
		$('body').on('click','#admin-navbar-side .nav-item li a',function(){
			var options = eval('('+$(this).data('options')+')'),
				icon = '<i class="layui-icon">&#xe641;</i> ',
	   		 	close = '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>',
	   		 	frameId = (new Date()).valueOf();
	   		//判断标题是否存在			
			if($(".layui-tab-title li[lay-id='"+options.id+"']").length>0){
				element.tabChange('admin-tab', options.id);
			}else{
				//添加tab
	            element.tabAdd('admin-tab', {
				  	title:icon + options.title + close,
				  	content: '<iframe src="'+options.url+'" id="'+frameId+'"></iframe>',//支持传入html,
				  	id: options.id
				});
				//跳到当前页面
				element.tabChange('admin-tab', options.id); 
			};
			//刷新当前tab页
			$('.refresh').click(function(){
				$('iframe[id = "'+frameId+'"]').attr('src',options.url);
				$('.admin-contextmenu').hide();
			});
			//关闭单个tab标签
			$('.layui-tab-title').on('click','.layui-tab-close',function(){
				element.tabDelete("admin-tab", $(this).parent("li").attr('lay-id'));
				$('.admin-contextmenu').hide();
			});
			//全部关闭tab标签
			$('.closeAll').click(function(){
				for(var i=0; i<$('.layui-tab-title li').length; i++){
					element.tabDelete("admin-tab", $('.layui-tab-title li').eq(i).attr('lay-id'));
				}
				$('.admin-contextmenu').hide();
			});
			//关闭其他
	    	$('.closeOther').click(function(){
				for(var i=0; i<$('.layui-tab-title li').length; i++){
					if($('.layui-tab-title li').eq(i).attr('lay-id') != liLayId){
						element.tabDelete("admin-tab", $('.layui-tab-title li').eq(i).attr('lay-id'));
					}
				}
				$('.admin-contextmenu').hide();
			});
			//关闭当前tab标签
			$('.closeCurrent').click(function(){
				element.tabDelete("admin-tab", liLayId);
				$('.admin-contextmenu').hide();
			});
		});
	});
//右击tab栏
	var liLayId;
	document.oncontextmenu = function() {
	    return false;
	}
	$('.layui-tab-title').on('mousedown','li',function(e){
		liLayId = $(this).attr('lay-id');
		if(e.which == 3){
			$('.admin-contextmenu').show();
			$('.admin-contextmenu').css({'top':e.clientY,'left':e.clientX});
		}
	});
	$('.layui-tab-title').on('click','li',function(e){
		$('.admin-contextmenu').hide();
	});
//iframe自适应
	$(window).on('resize', function () {
	    var $content = $('.admin-nav-card .layui-tab-content');
	    $content.height($(this).height() - 147);
	    $content.find('iframe').each(function () {
	        $(this).height($content.height());
	    });
	}).resize();