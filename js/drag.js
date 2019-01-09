/*
	注意:
		1.传过来的参数必须是一个数组,所有可指定多个标签;
		2.传过来的元素标签不能和移动的外框元素标签相同(外框是<div> 传过来元素不能是<div>);
*/
$.fn.extend({
	"drag":function(){
		var tagname = arguments[0];
		this.on("mousedown",down);
		function down(event){
			var _this = this;
			var e = event || window.event;
			var lx = e.clientX - _this.offsetLeft
			var ly = e.clientY - _this.offsetTop
			//setCapture可以将鼠标事件锁定在指定的元素上，当元素捕获了鼠标事件后，该事件只能作用在当前元素上
			//releaseCapture()可以为指定的元素解除事件锁定。它们俩必须成对使用
			if ( _this.setCapture ) {
                _this.setCapture();
            };
            var flag = false;
            //判断点击的元素标签和参数标签是否相同
            for(var i = 0; i < tagname.length; i++){
            	if(tagname[i][0].tagName == e.target.nodeName){
            		flag = true;
            		break;
            	}
            }
            if(flag){
				$(document).on("mousemove",move);
				$(document).on("mouseup",up);
            }
			function move(event){
				var e = event || window.event
				if(e.clientX - lx <= 0){
					_this.style.left = 0 +"px"
				}else if(e.clientX + _this.clientWidth -lx > window.innerWidth){
					_this.style.left = window.innerWidth -_this.clientWidth +"px"
				}else{
					_this.style.left = e.clientX -lx +"px"
				}
				if(e.clientY - ly <= 0){
					_this.style.top = 0 +"px"
				}else if(e.clientY + _this.clientHeight -lx > window.innerHeight){
					_this.style.top = window.innerHeight -_this.clientHeight +"px"
				}else{
					_this.style.top = e.clientY -ly +"px"
				}
			}	
			function up(){
				$(document).off("mousemove",move);
				$(document).off("mouseup",up);
				//releaseCapture()可以为指定的元素解除事件锁定
				if ( $(this).releaseCapture ) {
                	$(this).releaseCapture();
            	}
			}
			return false;
		}
	}
})
