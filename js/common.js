/** common.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
layui.define(['layer'], function(exports) {
	"use strict";
	
	var $ = layui.jquery,
		layer = layui.layer;
//		laydate = layui.laydate;
//		layerTips = parent.layer === undefined ? layui.layer : parent.layer; //获取父窗口的layer对象;

	var common = {
		/**
		 * 抛出一个异常错误信息
		 * @param {String} msg
		 */
		throwError: function(msg) {
			throw new Error(msg);
			return;
		},
		/**
		 * 弹出一个错误提示
		 * @param {String} msg
		 */
		msgError: function(msg) {
			layer.msg(msg, {
				icon: 5
			});
			return;
		}
	};

	exports('common', common);
});

//增加新的tab页	
//function addTab(src,icon,title){
//	parent.tab.tabAdd({
//      href: src, //地址
//      icon: icon,
//      title: title, 
// 	});
//}
function addDetailsTab1(tabId,title,url) {
    layui.use(['element', 'jquery'], function () {
        var $ = jquery = layui.jquery;
        var element = window.parent.parent.layui.element();
        var icon = '<i class="layui-icon">&#xe641;</i>',
            close = '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>',
            aID = 'aid_' + tabId,
            frameId = 'frame_' + tabId,
            content = '<iframe id="' + frameId + '" style="height:100%;" frameborder="0" src="' + url + '"></iframe>';
        //判断标题是否存在
//      if(lis.text().indexOf(title) != -1){
//      }else{
//      }
        if ($('body', parent.document).find('#tabBox').find("li[lay-id='"+aID+"']").length > 0) {
            element.tabChange('admin-tab', aID);
        } else {
            //添加tab
            element.tabAdd('admin-tab', {
                title: icon + title + close,
                content: content,//支持传入html
                icon: '&#xe641;',
                id: aID
            });
            //跳到当前页面
            element.tabChange('admin-tab', aID);
        };
        //iframe自适应
    });
}
//icheck 判断input事件
//function isDisplayNone(a){
//	$('input[name='+a+']').on('ifChecked', function(event){
//	 	if($(this).val() == '1'){
//	 		$(this).parents('label').siblings('input').show()
//	 	}else{
//	 		$(this).parents('label').siblings('input').hide()
//	 	}
//	});
//}
//bootstarp 日期范围选择
function DatePicker(beginSelector,endSelector){  
  	// 仅选择日期  
  	$(beginSelector).datepicker(  
  	{  
	    language:  "zh-CN",  
	   	autoclose: true,  
	   	startView: 0,  
	    format: "yyyy-mm-dd",  
	    clearBtn:true,  
	    todayBtn:false,  
	    endDate:'2099-1-1'
      }).on('changeDate', function(ev){               
        if(ev.date){  
            $(endSelector).datepicker('setStartDate', new Date(ev.date.valueOf()))  
        }else{  
            $(endSelector).datepicker('setStartDate',null);  
        }  
      })  
      $(endSelector).datepicker(  
      {  
        language:  "zh-CN",  
        autoclose: true,  
        startView:0,  
        format: "yyyy-mm-dd",  
        clearBtn:true,  
        todayBtn:false,  
        endDate:'2099-1-1'
      }).on('changeDate', function(ev){    
        if(ev.date){  
            $(beginSelector).datepicker('setEndDate', new Date(ev.date.valueOf()))  
        }else{  
            $(beginSelector).datepicker('setEndDate',new Date());  
        }   
      })  
  };
 //bootstarp 单个日期选择
function onlyDatePicker(datePicker){
	$(datePicker).datepicker({  
        language:  "zh-CN",  
        autoclose: true,  
        startView: 0,  
        format: "yyyy-mm-dd",  
        clearBtn:true,  
        todayBtn:false,  
        endDate:'2099-1-1'
    }) 
};


//关闭弹窗刷新父页面
function loadParent(){
	var src = window.frameElement.src;
	var arr = src.split('?');
	if(arr[0] == src){
		return '';
	}else{
		var keys = arr[1].split('&');
		var obj = {};
		for(var i=0; i<keys.length; i++){
			obj[keys[i].split('=')[0]] = keys[i].split('=')[1];
		}
		$('#'+obj.frameId,window.parent.document).attr('src',$('#'+obj.frameId,window.parent.document).attr('src'));
	}
	return obj;
};


  	