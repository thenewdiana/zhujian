define(['jquery','common'], function($,com) {
	function Sign(usersetting) {
		this.defaultSetting = {};
		this.userSetting = usersetting;
		this.settings = $.extend(this.defaultSetting, this.userSetting);
		this.settings.box = $('#' + this.settings.box);
		this.settings.button = $(this.settings.button);
	}
	Sign.prototype = {
		init: function() {
			this.size();
			if(!com.Com.isMobile()){
				var self =this;
				$(window).resize(function() {
					self.size();
				});
			}
			this.loginBtnClick();
			this.wrapperClose();
		},
		size: function() {
			var w = $(document).width();
			var h = $(document).height();
			var windowH=$(window).height();
			var wrapper = this.settings.box.find('.wrapper');
			this.settings.box.css({
				height:h
			});
			wrapper.css({
				left:(w-wrapper.width())/2+'px',
				top:($(window).height() - wrapper.height())/2+ "px"
			});
			this.settings.box.bind("touchmove",function(e){
        e.preventDefault();
     	});
		},
		scroll:function(flag){
   		if(flag){
   			if(!com.Com.isMobile()){
   				$("html").css({
				  	"overflow-y": "auto"
					});
   			}
   		}else{
   			if(com.Com.isMobile()){
	     		this.settings.box.bind("touchmove",function(e){
		        e.preventDefault();
		     	});
	     	}else{
	     		$("html").css({
					  "overflow-y": "hidden"
					});
	     	}
     	}
    },
		wrapperClose: function() {
			var self = this;
			self.settings.box.bind('click', function(e) {
				self.scroll(true);
				self.settings.box.fadeOut();
			});
			self.settings.box.find('.wrapper').bind('click', function(e) {
				e.stopPropagation();
			});
		},
		loginBtnClick: function() {
			var self = this;
			this.settings.button.click(function() {
				self.size();
				self.settings.box.fadeIn(500);
				self.scroll(false);
			});
		}
	}
	return {
		Sign: Sign
	}
});