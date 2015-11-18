var systemObject = {
	currentItem : 1,
	drawingSpeed : 300,
	fadingSpeed : 500,
	slidingSpeed : 300,
	start : function() {
		$('#wrapper').append('<div class="dark horizontal_one"></div>');
		systemObject.drawHorizontalOne();
	},
	drawHorizontalOne : function() {
		$('.horizontal_one').animate({ 'width' : '300px' }, systemObject.drawingSpeed, function() {
			$('#wrapper').append('<div class="dark vertical_one"></div>');
			systemObject.drawVerticalOne();
		});
	},
	drawVerticalOne : function() {
		$('.vertical_one').animate({ 'height' : '300px' }, systemObject.drawingSpeed, function() {
			$('#wrapper').append('<div class="dark horizontal_two"></div>');
			systemObject.drawHorizontalTwo();
		});
	},
	drawHorizontalTwo : function() {
		$('.horizontal_two').animate({ 'left' : 0 }, systemObject.drawingSpeed, function() {
			$('#wrapper').append('<div class="dark vertical_two"></div>');
			systemObject.drawVerticalTwo();
		});
	},
	drawVerticalTwo : function() {
		$('.vertical_two').animate({ 'top' : 0 }, systemObject.drawingSpeed, function() {
			systemObject.finish();
		});
	},
	finish : function() {
		systemObject.fill($('#wrapper'));
	},
	fill : function(obj) {
		var last = obj.children('div.vertical:last');
		var new_pos;
		if (last.length > 0) {
			var pos = last.position();
			new_pos = pos.top + 20;
		} else {
			new_pos = 0;
		}
		var hex = Math.floor(Math.random()*16777215).toString(16);
		if (new_pos < obj.height()) {
			if (systemObject.currentItem === 1) {
				obj.append($('<div class="dark vertical vertical_left item-'+new_pos+'" style="top:'+new_pos+'px;background:#'+hex+'"></div>'));
				$('.item-'+new_pos).animate({ left : 0 }, systemObject.slidingSpeed, function() {
					systemObject.currentItem = 0;
					systemObject.fill(obj);
				})
			} else {
				obj.append($('<div class="dark vertical vertical_right item-'+new_pos+'" style="top:'+new_pos+'px;background:#'+hex+'"></div>'));
				$('.item-'+new_pos).animate({ left : 0 }, systemObject.slidingSpeed, function() {
					systemObject.currentItem = 1;
					systemObject.fill(obj);
				})
			}
		} else {
			obj.fadeOut(systemObject.fadingSpeed, function() {
				$(this).html('').show();
				systemObject.start();
			});
		}
	}
};
$(function() {
	systemObject.start();
});








