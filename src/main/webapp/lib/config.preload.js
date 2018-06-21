(function () {
	var cssFiles = [
		"css/style.css",
		"css/swiper.css",
		"css/pt-style.css",
		"css/dycss.css",
		'lib/plugins/froala-editor/css/froala_page.css',
		'lib/plugins/froala-editor/css/font-awesome.css',
		'lib/plugins/froala-editor/css/froala_editor.css',
		//plugins css
		"lib/plugins/nprogress/nprogress.css",
		"lib/plugins/animate/animate.css",
	    "css/ui-pager2.css"
	];
	var jsFiles = [
		/*vx2插件*/
		"lib/min/vx2-ui.router.min.js", //ui-router
		"lib/min/vx2-storage.min.js",
		"lib/min/vx2-lazyload.min.js",
		"lib/min/vx2-vpage.min.js",
		
		
		"lib/min/vx2-animate.min.js", //净化html 运用在v-bind-html
		"lib/min/vx2-sanitize.min.js", //净化html 运用在v-bind-html

		//plugins
		"lib/plugins/pinyin.js",
		"lib/plugins/nprogress/nprogress.js",
		"lib/plugins/screenfull/dist/screenfull.js",
		"lib/echarts.min.js",
		

		// bootstrap --start
		"lib/modules/bootstrap/accordion.js",
		"lib/modules/bootstrap/alert.js",
		"lib/modules/bootstrap/bindHtml.js",
		"lib/modules/bootstrap/buttons.js",
		"lib/modules/bootstrap/carousel.js",
		"lib/modules/bootstrap/collapse.js",
		"lib/modules/bootstrap/dateparser.js",
		"lib/modules/bootstrap/datepicker.js",
		"lib/modules/bootstrap/dropdown.js",
		"lib/modules/bootstrap/modal.js",
		"lib/modules/bootstrap/pagination.js",
		"lib/modules/bootstrap/popover.js",
		"lib/modules/bootstrap/position.js",
		"lib/modules/bootstrap/progressbar.js",
		"lib/modules/bootstrap/rating.js",
		"lib/modules/bootstrap/tabs.js",
		"lib/modules/bootstrap/timepicker.js",
		"lib/modules/bootstrap/tooltip.js",
		"lib/modules/bootstrap/transition.js",
		"lib/modules/bootstrap/typeahead.js",
		//bootstrap --end
		/*vx2配置*/
		"lib/vx2-config.js",
		"lib/config.lazyload.js",
		"lib/sysboot.js", //实现了的前端功能
		"lib/vx2-config-router.js", //路由及rootscope
//		"lib/vx2-config-router2.js", //路由及rootscope
		"lib/main.js",
		"lib/vx2-locale_zh_cn.js",
		//service
		"lib/modules/services/$modalServer.js",
		"lib/swiper.min.js",
		//filter
		"lib/modules/filters/filterPinyin.js",
		//directive
		"lib/modules/directives/ui-jq.js",
		"lib/modules/directives/ui-menuadmin.js",
		"lib/modules/directives/ui-slidetoggle.js",
		"lib/modules/directives/ui-toggleclass.js",
		"lib/modules/directives/ui-fullscreen.js",
		"lib/modules/directives/ui-number.js",
		
		//文件下载上传插件
		"lib/modules/directives/vx-file-download.js",
		"lib/modules/directives/vx-file-upload.js",
		// 分页
		"lib/modules/directives/ui-pager2.js",
		"lib/modules/directives/ui-submit.js",
		'lib/plugins/froala-editor/js/froala_editor.min.js',
		"lib/modules/filters/myFilter.js",
		"lib/modules/filters/dyFilter.js"
		
	];

	if (typeof(exports) != "undefined") {
		exports.jsFiles = jsFiles;
		exports.cssFiles = cssFiles;
	} else {
		for (var i = 0; i < cssFiles.length; i++) {
			loadCss(cssFiles[i]);
		}
		for (var i = 0; i < jsFiles.length; i++) {
			loadJs(jsFiles[i]);
		}
	}

	function loadJs(path) {
		var scriptTag = document.createElement("script");
		scriptTag.type = "text/javascript";
		scriptTag.src = path;
		document.write(outerHTML(scriptTag));
	}

	function outerHTML(node) {
		// if IE, Chrome take the internal method otherwise build one
		return node.outerHTML || (function (n) {
				var div = document.createElement('div'),
					h;
				div.appendChild(n);
				h = div.innerHTML;
				div = null;
				return h;
			})(node);
	}

	function loadCss(path) {
		var cssLink = document.createElement("link");
		cssLink.rel = "stylesheet";
		cssLink.type = "text/css";
		cssLink.href = path;
		document.getElementsByTagName("head")[0].appendChild(cssLink);
	}
})();
