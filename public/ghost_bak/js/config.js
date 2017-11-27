;
(function() {
	requirejs.config({
		baseUrl: './js',
		shim: {
			'cookie': {
				deps: ['jquery'],
				exports: 'cookie'
			}
		},
		/*shim: {
			'swiper': {
				exports: 'swiper'
			},
			'lazy': {
				deps: ['jquery'],
				exports: 'lazy'
			}
		},*/
		paths: {
			'jquery': 'http://www.ebtang.com/resources/pc/js/jquery-1.9.1.min',
			//'swiper': 'swiper.min',
			//lazy: 'http://www.ebtang.com/resources/pc/js/jquery.lazyload',
			'util': 'util',
			'cookie': 'jquery.cookie',
			'ghost': 'ghost'
		},
	});
	requirejs(['ghost']);
})();