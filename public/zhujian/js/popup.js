define(['jquery', 'vue','common'], function($, Vue,com) {
	function Popup(usersetting) {
		this.defaultSetting = {};
		this.userSetting = usersetting;
		this.settings = $.extend(this.defaultSetting, this.userSetting);
		this.settings.box = $('#' + this.settings.box);
	}
	Popup.prototype = {
		init: function() {
			this.size();
			if(!com.Com.isMobile()){
				var self =this;
				$(window).resize(function() {
					self.size();
				});
			}
			this.voteClick();
			this.wrapperClose();
		},
		html: function() {
			var wrapper = this.settings.box.find('.wrapper');
			wrapper.find('.head').text(this.settings.title);
			if (this.settings.button === 'tip') { //ajax逻辑
				wrapper.find('.body').html('<div class="outer"><p class="calculate" id="app"><span class="fire sprite"></span><button type="button" class="minus operate" @click="minus">-</button><input type="text" v-model="fireNum" class="input" @keyup="round" /><button type="button" class="add operate" @click="add">+</button type="button"><span class="num">{{beanNum}}</span>糖豆</p><p class="note">您的余额已不足，请充值<button type="button" class="charge">充值</button></p></div>');
				wrapper.find('.foot').html('<button type="button" class="confirm sprite">确定</button><button type="button" class="cancel sprite" >取消</button>');
				new Vue({
					el: '#app',
					data: {
						fireNum: 5,
					},
					computed: {
						beanNum: function() {
							return parseInt(this.fireNum) * 50;
						}
					},
					methods: {
						minus: function() {
							this.fireNum--;
							if (this.fireNum < 1) {
								this.fireNum = 1;
							}
						},
						add: function() {
							this.fireNum++;
							if (this.fireNum > 999) {
								this.fireNum = 999;
							}
						},
						round: function() {
							if (this.fireNum < 1 || isNaN(this.fireNum)) {
								this.fireNum = 1;
							}
							if (this.fireNum > 999) {
								this.fireNum = 999;
							}
						}
					}
				});
			} else if (this.settings.button === 'gold') { //ajax逻辑
				wrapper.find('.body').html('<div class="outer"><p class="text">' + this.settings.note + '</p></div>');
				wrapper.find('.foot').html('<button type="button" class="confirm sprite">确定</button>');
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
		voteClick: function() {
			var self = this;
			var btn = $('.' + this.settings.button);
			btn.click(function() {
				if (self.settings.box.find('.note').length) {
					self.settings.box.find('.note').hide();
				}
				if (self.settings.button === 'gold') { //判断金票数量是否足够
					var num = $('.gold-num').text();
					if (num > 0) {
						//ajax请求投金票接口
						num--;
						$('.gold-num').text(num);
					} else {
						self.settings.note = '小主，您今日的金票已经告罄啦，明天记得再来哦~';
					}
				} else if (self.settings.button === 'tip') { //ajax请求打赏接口
					console.log('tip');
				}
				self.size();
				self.html();
				self.popupBtnClick();
				self.settings.box.fadeIn(500);
				self.scroll(false);
			});
		},
		popupBtnClick: function() {
			var wrapper = this.settings.box.find('.wrapper');
			var confirm = wrapper.find('.confirm');
			var cancel = wrapper.find('.cancel');
			var self = this;
			confirm.click(function() {
				if (self.settings.button === 'gold') {
					self.scroll(true);
					self.settings.box.fadeOut(500);
				} else if (self.settings.button === 'tip') { //ajax请求判断糖豆余额是否足够
					wrapper.find('.note').show();
				}
			});
			cancel.click(function() {
				self.scroll(true);
				self.settings.box.fadeOut(500);
			});
		}
	}
	return {
		Popup: Popup
	}
});