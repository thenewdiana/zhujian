define(['jquery', 'swiper', 'lazy', 'timer', 'sign', 'popup'], function($, aswiper, lazy, timer, sign, popup) {
	//设炉、制铜倒计时
	var countDown = new timer.CountDown({
		endText: '投稿已结束',
		endYear: 2018,
		endMonth: 3,
		endDay: 31,
		endH: 17,
		endM: 0,
		endS: 0,
		callFunc: null,
		box: 'jsTimer'
	});
	countDown.init();
	//赛程设置
	var aswiper = new Swiper('.swiper-container', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true
	});
	//图片懒加载
	$(".lazy").lazyload({
		failurelimit: 10,
		effect: 'fadeIn',
		placeholder: "./images/grey.gif",
		threshold: 600
	});

	//热度
	$('.hots .tops .block').each(function() {
		var heat = $(this).find('.heat .text').text();
		var heatHtml = '<strong class="bigger">' + heat.substr(0, 1) + '</strong>' + heat.substr(1);
		$(this).find('.heat .text').html(heatHtml);
		if ($(this).index() === 2) {
			$(this).addClass('last');
		}
	});
	//大咖推荐
	$('.recommand .block').each(function() {
		var heat = $(this).find('.heat .text').text();
		var heatHtml = '<strong class="bigger">' + heat.substr(0, 1) + '</strong>' + heat.substr(1);
		$(this).find('.heat .text').html(heatHtml);
	});
	//参赛作品
	$('.works .item td').each(function() {
		if ($(this).index() === 5) {
			$(this).addClass('last');
		}
	});
	//投金票与打赏
	var goldPopup = new popup.Popup({
		box: 'jsZJPopup',
		button: 'gold',
		title: '投金票',
		note: '投金票成功！感谢！',
	});
	goldPopup.init();

	//登录弹窗
	var loginIn = new sign.Sign({
		box: 'jsLoginPopup',
		button: '.nav .menu .login'
	});
	loginIn.init();
});