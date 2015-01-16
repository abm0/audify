(function(window, $, undefined) {

	var Audify = function(el, options) {
		this.options = options;
		this.el = el;
		this.afterInit();
	}

	Audify.prototype.afterInit = function() {
		this.options.audio_url = this.el.html();
		this.el.empty();

		this.buildPlayer();
	}

	Audify.prototype.buildPlayer = function() {
		this.player = new Audio(this.options.audio_url);
		this._buildDOM();
		this._setEvents();
	}

	Audify.prototype._buildDOM = function() {
		this.buttons = {};

		this.buttons.play = $('<div class="play" />');
		this.buttons.pause = $('<div class="pause" />');

		this._setButtonsStyle();

		for (var button in this.buttons) {
			this.buttons[button].appendTo(this.el);
		}
	}

	Audify.prototype._setEvents = function() {
		var audify = this;

		this.buttons.play.on('click', function() {
			audify.player.play();
			audify.buttons.play.hide();
			audify.buttons.pause.show();
		});

		this.buttons.pause.on('click', function() {
			audify.player.pause();
			audify.buttons.pause.hide();
			audify.buttons.play.show();
		});
	}

	Audify.prototype._setButtonsStyle = function() {
		for (var button in this.buttons) {
			var default_style = this.options.default_style.buttons[button];
			
			if (default_style != undefined) {
				this.buttons[button].css(default_style);
			}

			this.buttons[button].css({
				'width': '15px',
				'height': '15px',
				'background-image': this._buildImageUrl(button)
			});
		}
	}

	Audify.prototype._buildImageUrl = function(image_type) {
		return 'url(' + this.options.base64.prefix + this.options.base64[image_type] + ')';
	}

	$.fn.audify = function(options) {
		$.extend($.fn.audify.defaults, options);

		$.fn.audify.el = this;

		$.fn.audify.initialize();
	}

	$.fn.audify.defaults = {
		default_style: {
			buttons: {
				pause: {
					'display': 'none'
				}
			}
		},
		base64: {
			prefix: 'data:image/png;base64,',
			play:   'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABLklEQVQokaWTsarCMBiFvzbdtII4CC6KIC4OgqUIglMHXfqMLkUQn8DdNxCHIjgUWzq46Zbf3ElRWrzl3kDIGfL95xxILGOM4Y/Lforb7cZ6vSZJEkSkEuw8hYhwPp/JsozxeIzneTQajWrOzwH3+539fk8URRyPRx6Px++wMQYRee08z9lut2w2Gy6Xy/fYAFrrwoXD4UCSJHieh+/71Gq1ImyMKYUBrtcru92OOI4JgoBer4dS6rOz1hoReZ3vWmvN6XRitVqRpml1ZwDLsuh2uyyXSzqdTrXOAM1mk+l0ynw+x3XdYucy2LZtRqMRi8WCfr9fGPoR+/1ltdttwjBkMpmglCpN9OEsItTrdWazGUEQ0Gq1SqECrJRiOBwShiGDwQDHcb5xAFj/+VU/6MWXZyGFmPkAAAAASUVORK5CYII=',
			pause:  'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAsUlEQVQokbVTuw2DMBB9ljIBHZUbGobwFozJFgzBABS4QHSIgvuk8gkrIlFw4urpfXw++c6pquLmeSQwDAPGcTShqip0XYe+77Guq/Ft2yKEkIdjjFiWxUzbtgEApmnCvu84+14qiwiY2YSEmTnjReRzOJmu+CzMzCAiExImoow/X/SbsIiAiOCcg6p+1/O7ysdx/PHZxT3f/qqiIfHeY55nE+q6BgA0TZPx3nvDrmSrntuk4He8dGhRAAAAAElFTkSuQmCC'
		}
	}

	$.fn.audify.initialize = function () {
		if ($.fn.audify.el.html() != '') {
			new Audify($.fn.audify.el, $.fn.audify.defaults);
		}
	}

})(window, jQuery)