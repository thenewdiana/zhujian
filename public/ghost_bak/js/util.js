define(function() {
	var utils = {
		urlParse: function() {
			var url = window.location.search;
			var obj = {};
			var reg = /[?&][^?&]+=[^?&]+/g;
			var arr = url.match(reg);
			arr.forEach((item, index) => {
				var newArr = item.substr(1).split('=');
				var key = decodeURIComponent(newArr[0]);
				var val = decodeURIComponent(newArr[1]);
				obj[key] = val;
			});
			return obj;
		},
		getRandomNum: function(min, max) {
			var range = max - min;
			var rand = Math.random();
			var num = min + Math.floor(rand * range);
			return num
		},
		getRandomNumBoth: function(min, max) {
			var Range = Max - Min;
			var Rand = Math.random();
			var num = Min + Math.round(Rand * Range); //四舍五入
			return num;
		},
	}
	return {
		utils: utils
	}
})