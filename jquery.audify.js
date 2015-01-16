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
    this.buttons.stop = $('<div class="stop" />');

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
      audify.buttons.stop.show();
    });

    this.buttons.stop.on('click', function() {
      audify.player.pause();
      audify.player.currentTime = 0.0;
      audify.buttons.stop.hide();
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
        stop: {
          'display': 'none'
        }
      }
    },
    base64: {
      prefix: 'data:image/png;base64,',
      play:   'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAA+0lEQVQokZXTMauDMBSG4feUSpWCdGl1cRKs//9fWCc7SIfi5KKDOGRQhJ67XC/XWlv7QSCQPDkngYiqKkDTNBwOBzabDWvzt/N2u3G9Xum67nssIlRVRZIk1HX9HR4P6PueLMvI85xhGNbjMapKWZZcLhfatl2Pf98PAGMMaZpyv995PB6fsYhM5qpKURSkaYoxZhmr6uJo23Z2je1S1edYlkUURbiu+xo/R1UREU6nE3EcY9v2ZH2GRwBg2zZRFOH7/suuZlhEEBE8z+N8PrPb7RY7m2BVxXEc4jjmeDy+fYMJFhGCICAMw7fVJl2Ov8oYw36//1jtf34AeLd26FGC5q0AAAAASUVORK5CYII=',
      stop:   'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAlklEQVQokZVSwQ0AIQgD4wDGDdx/KP98ZAPuxQURSWxiJNVSQZCIhJnhFa01qMwMc85n8RgDCgCAiIDuGme8ovqLiHgIlfeJixXobmGTIeK/NuebUEXRWTlYlywS6kuqresFm7N1iFw99zfMu/tOR1zqbLvqY8Xxz9lLfFx9HVFtt/jotp+07ByJSNZa2/hlw6F3eu/wAaDBf35MHmGXAAAAAElFTkSuQmCC'
    }
  }

  $.fn.audify.initialize = function () {
    if ($.fn.audify.el.html() != '') {
      new Audify($.fn.audify.el, $.fn.audify.defaults);
    }
  }

})(window, jQuery)