(function (window, vx, undefined) {
	/**
	 * 获取终端设备型号的服务
	 * */
	vx.module("ui.libraries").factory('$os', function () {
		var os = {
			webkit: navigator.userAgent.match(/WebKit\/([\d.]+)/) ? true : false,
			android: navigator.userAgent.match(/(Android)\s+([\d.]+)/) || navigator.userAgent.match(/Silk-Accelerated/) ? true : false,
			androidICS: this.android && navigator.userAgent.match(/(Android)\s4/) ? true : false,
			ipad: navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false,
			iphone: !(navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false) && navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false,
			ios: (navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false) || (!(navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false) && navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false),
			ios5: (navigator.userAgent.match(/(iPad).*OS\s([5_]+)/) ? true : false) || (!(navigator.userAgent.match(/(iPad).*OS\s([5_]+)/) ? true : false) && navigator.userAgent.match(/(iPhone\sOS)\s([5_]+)/) ? true : false),
			wphone: navigator.userAgent.match(/Windows Phone/i) ? true : false
		};
		return os;
	});
})(window, vx);