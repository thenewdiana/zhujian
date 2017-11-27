;
(function() {
	requirejs.config({
		baseUrl: './js',
		shim: {
			'swiper': {
				exports: 'swiper'
			},
			'lazy': {
				deps: ['jquery'],
				exports: 'lazy'
			}
		},
		paths: {
			jquery: 'http://www.ebtang.com/resources/pc/js/jquery-1.9.1.min',
			'swiper': 'swiper.min',
			lazy: 'http://www.ebtang.com/resources/pc/js/jquery.lazyload',
			vue: 'vue-2.3.0'
		},
	});
	requirejs(['swiper', 'lazy', 'timer'], function(aswiper, lazy, timer) {
		require(['zhujian']);
	});
})();