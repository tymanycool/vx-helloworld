/**
 * @author tian
 * filter 加密账号    1234****5678
 */
(function (window, vx) {
	'use strict';

	function dimAcNoFilter() {
		return function (input) {
			if (input !== undefined)
				return input.substring(0, 4) + "****" + input.substring(input.length - 4);
		};
	}


	vx.module('ibsapp.libraries').filter('dimAcNoFilter', dimAcNoFilter);

})(window, window.vx);