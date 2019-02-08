(function($) {

	'use strict';

	var _$preview;
	var _qualify = 1;

	$(init);

	/* =======================================================================
		Init
	========================================================================== */
	function init() {

		_$preview = $('#preview').find('.preview-image');
		$('input').on('change',genarate).trigger('change');

	}

	/* =======================================================================
		Genarate
	========================================================================== */
	function genarate() {

		var map      = getInputMap();
		var width    = map.width;
		var height   = map.height;
		var text     = map.text;

		var ratio    = width <= height ? width:height;
		var fontSize = ratio * .1;
		if (fontSize <= 10) fontSize = 10;

		var canvas    = document.createElement('canvas');
		var context   = canvas.getContext('2d');
		canvas.width  = width;
		canvas.height = height;

		context.font      = fontSize + 'px "メイリオ", "Meiryo", "Hiragino Kaku Gothic Prom", "ヒラギノ角ゴ Pro W3", "Noto Sans Japanese", sans-serif';
		context.textAlign = 'center';
		context.textBaseline = 'middle';

		context.fillStyle = 'rgb(200,200,200)';
		context.fillRect(0,0,width,height);

		context.fillStyle = 'rgb(0,0,0)';
		var textWidth    = context.measureText(text).width;
		var cornerRight  = width - textWidth * .5;
		var cornerBottom = height - fontSize * .5;
		context.fillText(text,cornerRight - 10,cornerBottom - 10);

		context.fillStyle = 'rgb(150,150,150)';
		var centerX = width * .5;
		var centerY = height * .5 + fontSize * .5;
		context.fillText(width + 'x' + height,centerX,centerY);

		canvasToImage(canvas,map.type);

	}

	/* =======================================================================
		Canvas To Image
	========================================================================== */
	function canvasToImage(canvas,type) {

		var data   = canvas.toDataURL(type,_qualify);
		var $image = $('<img>');
		$image.attr('src',data);
		_$preview.empty().append($image);

	}

	/* =======================================================================
		Get Input Map
	========================================================================== */
	function getInputMap() {

		var $inputs = $('input');
		var map = {};

		for (var i = 0; i < $inputs.length; i++) {

			var $input = $inputs.eq(i);
			var type   = $input.prop('type');
			var value  = $input.val();
			var name   = $input.prop('name');

			if (type == 'radio') {

				if ($input.prop('checked')) map[name] = value;

			} else {

				map[name] = value;

			}

		}

		return map;

	}

})(jQuery);