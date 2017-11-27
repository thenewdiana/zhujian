define(['jquery', 'cookie', 'util'], function($, cookie, util) {
	var ghosts = ['冒失鬼', '可爱鬼', '淘气鬼', '萌萌鬼', '害羞鬼', '讨厌鬼', '开心鬼', '机灵鬼', '小气鬼', '闷骚鬼', '贪吃鬼', '赖皮鬼', '小懒鬼', '吸血鬼', '搞笑鬼', '吝啬鬼', '胆小鬼'];
	$(function() {
		var userInput, userSumbit, randomGhostIndex, username, picIndex, src;
		// index表单处理
		userInput = $('#js_userInput');
		userSumbit = $('#js_userSubmit');
		userInput.focus(function() {
			$(this).attr('placeholder', '');
			$(this).prop('value', '');
		});
		userInput.blur(function() {
			if ($.trim($(this).val()) === '') {
				$(this).attr('placeholder', '输入名字');
			}
		});
		userSumbit.click(function(e) {
			if ($.trim(userInput.val()) === '') {
				e.preventDefault();
			} else {
				e.preventDefault();
				inputVal = encodeURIComponent($.trim(userInput.val()));
				randomGhostIndex = util.utils.getRandomNum(0, ghosts.length);
				showContent(userInput.val(), randomGhostIndex);
				$.cookie('username', inputVal, {
					path: '/'
				});
				$.cookie('ghostIndex', randomGhostIndex, {
					path: '/'
				});
				$.cookie('step', 'two', {
					path: '/'
				});
				$('.ybt-one').hide();
				$('.ybt-two').show();
			}
		});
		if ($.cookie('username')) {
			username = decodeURIComponent($.cookie('username'));
			picIndex = $.cookie('ghostIndex');
			showContent(username, picIndex);
		}
		if ($.cookie('step') === 'two') {
			$('.ybt-one').hide();
			$('.ybt-two').show();
		} else if ($.cookie('step') === 'one') {
			$('.ybt-one').show();
			$('.ybt-two').hide();
		}
		$('#js_onemore').click(function() {
			$.cookie('step', 'one', {
				path: '/'
			});
			$('.ybt-one').show();
			$('.ybt-two').hide();
		});

		function showContent(name, index) {
			$('#js_user').text(name);
			src = 'img/ghost-' + index + '.png';
			$('#js_ghost_pic').attr('src', src);
			$('#js_ghost_type').text(ghosts[index]);
			$('head title').text('雁北堂中文网-我是' + ghosts[index] + ',来测测你是什么鬼吧？');
		}
	});
})