/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */
;

(function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  var Slick = window.Slick || {};

  Slick = function () {
    var instanceUid = 0;

    function Slick(element, settings) {
      var _ = this,
          dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function (slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++; // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source

      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

      _.registerBreakpoints();

      _.init(true);
    }

    return Slick;
  }();

  Slick.prototype.activateADA = function () {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;

    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }

    _.unload();

    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.animateHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
        _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }

    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }

        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function (now) {
            now = Math.ceil(now);

            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';

              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';

              _.$slideTrack.css(animProps);
            }
          },
          complete: function () {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();

        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }

        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function () {
            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }
      }
    }
  };

  Slick.prototype.getNavTarget = function () {
    var _ = this,
        asNavFor = _.options.asNavFor;

    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;
  };

  Slick.prototype.asNavFor = function (index) {
    var _ = this,
        asNavFor = _.getNavTarget();

    if (asNavFor !== null && typeof asNavFor === 'object') {
      asNavFor.each(function () {
        var target = $(this).slick('getSlick');

        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };

  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
        transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.autoPlay = function () {
    var _ = this;

    _.autoPlayClear();

    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };

  Slick.prototype.autoPlayClear = function () {
    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };

  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;

    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;

          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }

      _.slideHandler(slideTo);
    }
  };

  Slick.prototype.buildArrows = function () {
    var _ = this;

    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {
        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };

  Slick.prototype.buildDots = function () {
    var _ = this,
        i,
        dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');
    }
  };

  Slick.prototype.buildOut = function () {
    var _ = this;

    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();

    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };

  Slick.prototype.buildRows = function () {
    var _ = this,
        a,
        b,
        c,
        newSlides,
        numOfSlides,
        originalSlides,
        slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');

        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');

          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);

            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }

          slide.appendChild(row);
        }

        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);

      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };

  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
        breakpoint,
        targetBreakpoint,
        respondToWidth,
        triggerBreakpoint = false;

    var sliderWidth = _.$slider.width();

    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;

            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }

              _.refresh(initial);
            }

            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;

          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }

            _.refresh(initial);
          }

          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;

          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }

          _.refresh(initial);

          triggerBreakpoint = targetBreakpoint;
        }
      } // only trigger breakpoints during an actual break. not on initialize.


      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };

  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
        $target = $(event.currentTarget),
        indexOffset,
        slideOffset,
        unevenOffset; // If target is a link, prevent default action.


    if ($target.is('a')) {
      event.preventDefault();
    } // If target is not the <li> element (ie: a child), find the <li>.


    if (!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {
      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }

        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }

        break;

      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);

        $target.children().trigger('focus');
        break;

      default:
        return;
    }
  };

  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
        navigables,
        prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;

    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }

        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function () {
    var _ = this;

    if (_.options.dots && _.$dots !== null) {
      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);

    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);

    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);

    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };

  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));

    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };

  Slick.prototype.cleanUpRows = function () {
    var _ = this,
        originalSlides;

    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');

      _.$slider.empty().append(originalSlides);
    }
  };

  Slick.prototype.clickHandler = function (event) {
    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  Slick.prototype.destroy = function (refresh) {
    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }

    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }

    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
        $(this).attr('style', $(this).data('originalStyling'));
      });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');

    _.$slider.removeClass('slick-initialized');

    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };

  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
        transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }
    }
  };

  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;

    if (filter !== null) {
      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.focusHandler = function () {
    var _ = this; // If any child element receives focus within the slider we need to pause the autoplay


    _.$slider.off('focus.slick blur.slick').on('focus.slick', '*', function (event) {
      var $sf = $(this);
      setTimeout(function () {
        if (_.options.pauseOnFocus) {
          if ($sf.is(':focus')) {
            _.focussed = true;

            _.autoPlay();
          }
        }
      }, 0);
    }).on('blur.slick', '*', function (event) {
      var $sf = $(this); // When a blur occurs on any elements within the slider we become unfocused

      if (_.options.pauseOnFocus) {
        _.focussed = false;

        _.autoPlay();
      }
    });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;

    return _.currentSlide;
  };

  Slick.prototype.getDotCount = function () {
    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;
  };

  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }

        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }

      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }

    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;
  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;

    return _.options[option];
  };

  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;
  };

  Slick.prototype.getSlick = function () {
    return this;
  };

  Slick.prototype.getSlideCount = function () {
    var _ = this,
        slidesTraversed,
        swipedSlide,
        swipeTarget,
        centerOffset;

    centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
    swipeTarget = _.swipeLeft * -1 + centerOffset;

    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        var slideOuterWidth, slideOffset, slideRightBoundary;
        slideOuterWidth = $(slide).outerWidth();
        slideOffset = slide.offsetLeft;

        if (_.options.centerMode !== true) {
          slideOffset += slideOuterWidth / 2;
        }

        slideRightBoundary = slideOffset + slideOuterWidth;

        if (swipeTarget < slideRightBoundary) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };

  Slick.prototype.init = function (creation) {
    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');

      _.buildRows();

      _.buildOut();

      _.setProps();

      _.startLoad();

      _.loadSlider();

      _.initializeEvents();

      _.updateArrows();

      _.updateDots();

      _.checkResponsive(true);

      _.focusHandler();
    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if (_.options.autoplay) {
      _.paused = false;

      _.autoPlay();
    }
  };

  Slick.prototype.initADA = function () {
    var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
      return val >= 0 && val < _.slideCount;
    });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;

          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
        var mappedSlideIndex = tabControlIndexes[i];
        $(this).attr({
          'role': 'presentation'
        });
        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();
  };

  Slick.prototype.initArrowEvents = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);

      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);

        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };

  Slick.prototype.initDotEvents = function () {
    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initSlideEvents = function () {
    var _ = this;

    if (_.options.pauseOnHover) {
      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));

      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initializeEvents = function () {
    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();

    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);

    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);

    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };

  Slick.prototype.initUI = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();

      _.$nextArrow.show();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };

  Slick.prototype.keyHandler = function (event) {
    var _ = this; //Dont slide if the cursor is inside the form fields and arrow keys are pressed


    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };

  Slick.prototype.lazyLoad = function () {
    var _ = this,
        loadRange,
        cloneRange,
        rangeStart,
        rangeEnd;

    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this),
            imageSource = $(this).attr('data-lazy'),
            imageSrcSet = $(this).attr('data-srcset'),
            imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
            imageToLoad = document.createElement('img');

        imageToLoad.onload = function () {
          image.animate({
            opacity: 0
          }, 100, function () {
            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);

              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }

            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function () {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });

            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };

        imageToLoad.onerror = function () {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };

        imageToLoad.src = imageSource;
      });
    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);

      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };

  Slick.prototype.loadSlider = function () {
    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };

  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };

  Slick.prototype.orientationChange = function () {
    var _ = this;

    _.checkResponsive();

    _.setPosition();
  };

  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;

    _.autoPlayClear();

    _.paused = true;
  };

  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;

    _.autoPlay();

    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };

  Slick.prototype.postSlide = function (index) {
    var _ = this;

    if (!_.unslicked) {
      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if (_.options.autoplay) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };

  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };

  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;

    var _ = this,
        $imgsToLoad = $('img[data-lazy]', _.$slider),
        image,
        imageSource,
        imageSrcSet,
        imageSizes,
        imageToLoad;

    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);

          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }

        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);

        _.progressiveLazyLoad();
      };

      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

          _.progressiveLazyLoad();
        }
      };

      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };

  Slick.prototype.refresh = function (initializing) {
    var _ = this,
        currentSlide,
        lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow; // in non-infinite sliders, we don't want to go past the
    // last visible index.

    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    } // if less slides than to show, go to start.


    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });

    _.init();

    if (!initializing) {
      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };

  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
        breakpoint,
        currentBreakpoint,
        l,
        responsiveSettings = _.options.responsive || null;

    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || 'window';

      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint; // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.

          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);

          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };

  Slick.prototype.reinit = function () {
    var _ = this;

    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();

    _.setupInfinite();

    _.buildArrows();

    _.updateArrows();

    _.initArrowEvents();

    _.buildDots();

    _.updateDots();

    _.initDotEvents();

    _.cleanUpSlideEvents();

    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();

    _.focusHandler();

    _.paused = !_.options.autoplay;

    _.autoPlay();

    _.$slider.trigger('reInit', [_]);
  };

  Slick.prototype.resize = function () {
    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();

        _.checkResponsive();

        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;

    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.setCSS = function (position) {
    var _ = this,
        positionProps = {},
        x,
        y;

    if (_.options.rtl === true) {
      position = -position;
    }

    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};

      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';

        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';

        _.$slideTrack.css(positionProps);
      }
    }
  };

  Slick.prototype.setDimensions = function () {
    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);

      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();

    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);

      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);

      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();

    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };

  Slick.prototype.setFade = function () {
    var _ = this,
        targetLeft;

    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;

      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };

  Slick.prototype.setHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.css('height', targetHeight);
    }
  };

  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */
    var _ = this,
        l,
        item,
        option,
        value,
        refresh = false,
        type;

    if ($.type(arguments[0]) === 'object') {
      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];

      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {
        type = 'single';
      }
    }

    if (type === 'single') {
      _.options[option] = value;
    } else if (type === 'multiple') {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === 'responsive') {
      for (item in value) {
        if ($.type(_.options.responsive) !== 'array') {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1; // loop through the responsive object and splice out duplicates.

          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }

            l--;
          }

          _.options.responsive.push(value[item]);
        }
      }
    }

    if (refresh) {
      _.unload();

      _.reinit();
    }
  };

  Slick.prototype.setPosition = function () {
    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);
  };

  Slick.prototype.setProps = function () {
    var _ = this,
        bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }

    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }

    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };

  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
        centerOffset,
        allSlides,
        indexOffset,
        remainder;

    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

    _.$slides.eq(index).addClass('slick-current');

    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }

        if (index === 0) {
          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }

      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function () {
    var _ = this,
        i,
        slideIndex,
        infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }

        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }

        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };

  Slick.prototype.interrupt = function (toggle) {
    var _ = this;

    if (!toggle) {
      _.autoPlay();
    }

    _.interrupted = toggle;
  };

  Slick.prototype.selectHandler = function (event) {
    var _ = this;

    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);

      return;
    }

    _.slideHandler(index);
  };

  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
        animSlide,
        oldSlide,
        slideLeft,
        targetLeft = null,
        _ = this,
        navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    }

    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }

    _.updateDots();

    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }

      _.animateHeight();

      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };

  Slick.prototype.startLoad = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();

      _.$nextArrow.hide();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }

    _.$slider.addClass('slick-loading');
  };

  Slick.prototype.swipeDirection = function () {
    var xDist,
        yDist,
        r,
        swipeAngle,
        _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }

    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  };

  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
        slideCount,
        direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

    if (_.touchObject.curX === undefined) {
      return false;
    }

    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }

    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();

      switch (direction) {
        case 'left':
        case 'down':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;

        case 'right':
        case 'up':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;

        default:
      }

      if (direction != 'vertical') {
        _.slideHandler(slideCount);

        _.touchObject = {};

        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);

        _.touchObject = {};
      }
    }
  };

  Slick.prototype.swipeHandler = function (event) {
    var _ = this;

    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }

    switch (event.data.action) {
      case 'start':
        _.swipeStart(event);

        break;

      case 'move':
        _.swipeMove(event);

        break;

      case 'end':
        _.swipeEnd(event);

        break;
    }
  };

  Slick.prototype.swipeMove = function (event) {
    var _ = this,
        edgeWasHit = false,
        curLeft,
        swipeDirection,
        swipeLength,
        positionOffset,
        touches,
        verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);

    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }

    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }

    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);
  };

  Slick.prototype.swipeStart = function (event) {
    var _ = this,
        touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;

    if (_.$slidesCache !== null) {
      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.unload = function () {
    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };

  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;

    _.$slider.trigger('unslick', [_, fromBreakpoint]);

    _.destroy();
  };

  Slick.prototype.updateArrows = function () {
    var _ = this,
        centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };

  Slick.prototype.updateDots = function () {
    var _ = this;

    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').end();

      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };

  Slick.prototype.visibility = function () {
    var _ = this;

    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };

  $.fn.slick = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }

    return _;
  };
});
/*! jQuery UI - v1.12.1 - 2021-03-11
* http://jqueryui.com
* Includes: keycode.js, widgets/datepicker.js, effect.js, effects/effect-fade.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
!function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
}(function (b) {
  b.ui = b.ui || {};
  var r;
  b.ui.version = "1.12.1", b.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  };

  function t() {
    this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "mm/dd/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
    }, this._defaults = {
      showOn: "focus",
      showAnim: "fadeIn",
      showOptions: {},
      defaultDate: null,
      appendText: "",
      buttonText: "...",
      buttonImage: "",
      buttonImageOnly: !1,
      hideIfNoPrevNext: !1,
      navigationAsDateFormat: !1,
      gotoCurrent: !1,
      changeMonth: !1,
      changeYear: !1,
      yearRange: "c-10:c+10",
      showOtherMonths: !1,
      selectOtherMonths: !1,
      showWeek: !1,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: "+10",
      minDate: null,
      maxDate: null,
      duration: "fast",
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: "",
      altFormat: "",
      constrainInput: !0,
      showButtonPanel: !1,
      autoSize: !1,
      disabled: !1
    }, b.extend(this._defaults, this.regional[""]), this.regional.en = b.extend(!0, {}, this.regional[""]), this.regional["en-US"] = b.extend(!0, {}, this.regional.en), this.dpDiv = a(b("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
  }

  function a(t) {
    var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return t.on("mouseout", e, function () {
      b(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && b(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && b(this).removeClass("ui-datepicker-next-hover");
    }).on("mouseover", e, s);
  }

  function s() {
    b.datepicker._isDisabledDatepicker((r.inline ? r.dpDiv.parent() : r.input)[0]) || (b(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), b(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && b(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && b(this).addClass("ui-datepicker-next-hover"));
  }

  function c(t, e) {
    for (var a in b.extend(t, e), e) null == e[a] && (t[a] = e[a]);

    return t;
  }

  b.extend(b.ui, {
    datepicker: {
      version: "1.12.1"
    }
  }), b.extend(t.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function () {
      return this.dpDiv;
    },
    setDefaults: function (t) {
      return c(this._defaults, t || {}), this;
    },
    _attachDatepicker: function (t, e) {
      var a,
          i = t.nodeName.toLowerCase(),
          n = "div" === i || "span" === i;
      t.id || (this.uuid += 1, t.id = "dp" + this.uuid), (a = this._newInst(b(t), n)).settings = b.extend({}, e || {}), "input" === i ? this._connectDatepicker(t, a) : n && this._inlineDatepicker(t, a);
    },
    _newInst: function (t, e) {
      return {
        id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
        input: t,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: e,
        dpDiv: e ? a(b("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
      };
    },
    _connectDatepicker: function (t, e) {
      var a = b(t);
      e.append = b([]), e.trigger = b([]), a.hasClass(this.markerClassName) || (this._attachments(a, e), a.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(e), b.data(t, "datepicker", e), e.settings.disabled && this._disableDatepicker(t));
    },
    _attachments: function (t, e) {
      var a,
          i = this._get(e, "appendText"),
          n = this._get(e, "isRTL");

      e.append && e.append.remove(), i && (e.append = b("<span class='" + this._appendClass + "'>" + i + "</span>"), t[n ? "before" : "after"](e.append)), t.off("focus", this._showDatepicker), e.trigger && e.trigger.remove(), "focus" !== (a = this._get(e, "showOn")) && "both" !== a || t.on("focus", this._showDatepicker), "button" !== a && "both" !== a || (i = this._get(e, "buttonText"), a = this._get(e, "buttonImage"), e.trigger = b(this._get(e, "buttonImageOnly") ? b("<img/>").addClass(this._triggerClass).attr({
        src: a,
        alt: i,
        title: i
      }) : b("<button type='button'></button>").addClass(this._triggerClass).html(a ? b("<img/>").attr({
        src: a,
        alt: i,
        title: i
      }) : i)), t[n ? "before" : "after"](e.trigger), e.trigger.on("click", function () {
        return b.datepicker._datepickerShowing && b.datepicker._lastInput === t[0] ? b.datepicker._hideDatepicker() : (b.datepicker._datepickerShowing && b.datepicker._lastInput !== t[0] && b.datepicker._hideDatepicker(), b.datepicker._showDatepicker(t[0])), !1;
      }));
    },
    _autoSize: function (t) {
      var e, a, i, n, r, s;
      this._get(t, "autoSize") && !t.inline && (r = new Date(2009, 11, 20), (s = this._get(t, "dateFormat")).match(/[DM]/) && (e = function (t) {
        for (n = i = a = 0; n < t.length; n++) t[n].length > a && (a = t[n].length, i = n);

        return i;
      }, r.setMonth(e(this._get(t, s.match(/MM/) ? "monthNames" : "monthNamesShort"))), r.setDate(e(this._get(t, s.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - r.getDay())), t.input.attr("size", this._formatDate(t, r).length));
    },
    _inlineDatepicker: function (t, e) {
      var a = b(t);
      a.hasClass(this.markerClassName) || (a.addClass(this.markerClassName).append(e.dpDiv), b.data(t, "datepicker", e), this._setDate(e, this._getDefaultDate(e), !0), this._updateDatepicker(e), this._updateAlternate(e), e.settings.disabled && this._disableDatepicker(t), e.dpDiv.css("display", "block"));
    },
    _dialogDatepicker: function (t, e, a, i, n) {
      var r,
          s = this._dialogInst;
      return s || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = b("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), b("body").append(this._dialogInput), (s = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, b.data(this._dialogInput[0], "datepicker", s)), c(s.settings, i || {}), e = e && e.constructor === Date ? this._formatDate(s, e) : e, this._dialogInput.val(e), this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null, this._pos || (r = document.documentElement.clientWidth, i = document.documentElement.clientHeight, e = document.documentElement.scrollLeft || document.body.scrollLeft, n = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [r / 2 - 100 + e, i / 2 - 150 + n]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = a, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), b.blockUI && b.blockUI(this.dpDiv), b.data(this._dialogInput[0], "datepicker", s), this;
    },
    _destroyDatepicker: function (t) {
      var e,
          a = b(t),
          i = b.data(t, "datepicker");
      a.hasClass(this.markerClassName) && (e = t.nodeName.toLowerCase(), b.removeData(t, "datepicker"), "input" === e ? (i.append.remove(), i.trigger.remove(), a.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== e && "span" !== e || a.removeClass(this.markerClassName).empty(), r === i && (r = null));
    },
    _enableDatepicker: function (e) {
      var t,
          a = b(e),
          i = b.data(e, "datepicker");
      a.hasClass(this.markerClassName) && ("input" === (t = e.nodeName.toLowerCase()) ? (e.disabled = !1, i.trigger.filter("button").each(function () {
        this.disabled = !1;
      }).end().filter("img").css({
        opacity: "1.0",
        cursor: ""
      })) : "div" !== t && "span" !== t || ((a = a.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = b.map(this._disabledInputs, function (t) {
        return t === e ? null : t;
      }));
    },
    _disableDatepicker: function (e) {
      var t,
          a = b(e),
          i = b.data(e, "datepicker");
      a.hasClass(this.markerClassName) && ("input" === (t = e.nodeName.toLowerCase()) ? (e.disabled = !0, i.trigger.filter("button").each(function () {
        this.disabled = !0;
      }).end().filter("img").css({
        opacity: "0.5",
        cursor: "default"
      })) : "div" !== t && "span" !== t || ((a = a.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = b.map(this._disabledInputs, function (t) {
        return t === e ? null : t;
      }), this._disabledInputs[this._disabledInputs.length] = e);
    },
    _isDisabledDatepicker: function (t) {
      if (!t) return !1;

      for (var e = 0; e < this._disabledInputs.length; e++) if (this._disabledInputs[e] === t) return !0;

      return !1;
    },
    _getInst: function (t) {
      try {
        return b.data(t, "datepicker");
      } catch (t) {
        throw "Missing instance data for this datepicker";
      }
    },
    _optionDatepicker: function (t, e, a) {
      var i,
          n,
          r,
          s,
          o = this._getInst(t);

      if (2 === arguments.length && "string" == typeof e) return "defaults" === e ? b.extend({}, b.datepicker._defaults) : o ? "all" === e ? b.extend({}, o.settings) : this._get(o, e) : null;
      i = e || {}, "string" == typeof e && ((i = {})[e] = a), o && (this._curInst === o && this._hideDatepicker(), n = this._getDateDatepicker(t, !0), r = this._getMinMaxDate(o, "min"), s = this._getMinMaxDate(o, "max"), c(o.settings, i), null !== r && void 0 !== i.dateFormat && void 0 === i.minDate && (o.settings.minDate = this._formatDate(o, r)), null !== s && void 0 !== i.dateFormat && void 0 === i.maxDate && (o.settings.maxDate = this._formatDate(o, s)), "disabled" in i && (i.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(b(t), o), this._autoSize(o), this._setDate(o, n), this._updateAlternate(o), this._updateDatepicker(o));
    },
    _changeDatepicker: function (t, e, a) {
      this._optionDatepicker(t, e, a);
    },
    _refreshDatepicker: function (t) {
      t = this._getInst(t);
      t && this._updateDatepicker(t);
    },
    _setDateDatepicker: function (t, e) {
      t = this._getInst(t);
      t && (this._setDate(t, e), this._updateDatepicker(t), this._updateAlternate(t));
    },
    _getDateDatepicker: function (t, e) {
      t = this._getInst(t);
      return t && !t.inline && this._setDateFromField(t, e), t ? this._getDate(t) : null;
    },
    _doKeyDown: function (t) {
      var e,
          a,
          i = b.datepicker._getInst(t.target),
          n = !0,
          r = i.dpDiv.is(".ui-datepicker-rtl");

      if (i._keyEvent = !0, b.datepicker._datepickerShowing) switch (t.keyCode) {
        case 9:
          b.datepicker._hideDatepicker(), n = !1;
          break;

        case 13:
          return (a = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", i.dpDiv))[0] && b.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, a[0]), (e = b.datepicker._get(i, "onSelect")) ? (a = b.datepicker._formatDate(i), e.apply(i.input ? i.input[0] : null, [a, i])) : b.datepicker._hideDatepicker(), !1;

        case 27:
          b.datepicker._hideDatepicker();

          break;

        case 33:
          b.datepicker._adjustDate(t.target, t.ctrlKey ? -b.datepicker._get(i, "stepBigMonths") : -b.datepicker._get(i, "stepMonths"), "M");

          break;

        case 34:
          b.datepicker._adjustDate(t.target, t.ctrlKey ? +b.datepicker._get(i, "stepBigMonths") : +b.datepicker._get(i, "stepMonths"), "M");

          break;

        case 35:
          (t.ctrlKey || t.metaKey) && b.datepicker._clearDate(t.target), n = t.ctrlKey || t.metaKey;
          break;

        case 36:
          (t.ctrlKey || t.metaKey) && b.datepicker._gotoToday(t.target), n = t.ctrlKey || t.metaKey;
          break;

        case 37:
          (t.ctrlKey || t.metaKey) && b.datepicker._adjustDate(t.target, r ? 1 : -1, "D"), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && b.datepicker._adjustDate(t.target, t.ctrlKey ? -b.datepicker._get(i, "stepBigMonths") : -b.datepicker._get(i, "stepMonths"), "M");
          break;

        case 38:
          (t.ctrlKey || t.metaKey) && b.datepicker._adjustDate(t.target, -7, "D"), n = t.ctrlKey || t.metaKey;
          break;

        case 39:
          (t.ctrlKey || t.metaKey) && b.datepicker._adjustDate(t.target, r ? -1 : 1, "D"), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && b.datepicker._adjustDate(t.target, t.ctrlKey ? +b.datepicker._get(i, "stepBigMonths") : +b.datepicker._get(i, "stepMonths"), "M");
          break;

        case 40:
          (t.ctrlKey || t.metaKey) && b.datepicker._adjustDate(t.target, 7, "D"), n = t.ctrlKey || t.metaKey;
          break;

        default:
          n = !1;
      } else 36 === t.keyCode && t.ctrlKey ? b.datepicker._showDatepicker(this) : n = !1;
      n && (t.preventDefault(), t.stopPropagation());
    },
    _doKeyPress: function (t) {
      var e,
          a = b.datepicker._getInst(t.target);

      if (b.datepicker._get(a, "constrainInput")) return e = b.datepicker._possibleChars(b.datepicker._get(a, "dateFormat")), a = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || a < " " || !e || -1 < e.indexOf(a);
    },
    _doKeyUp: function (t) {
      var e = b.datepicker._getInst(t.target);

      if (e.input.val() !== e.lastVal) try {
        b.datepicker.parseDate(b.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, b.datepicker._getFormatConfig(e)) && (b.datepicker._setDateFromField(e), b.datepicker._updateAlternate(e), b.datepicker._updateDatepicker(e));
      } catch (t) {}
      return !0;
    },
    _showDatepicker: function (t) {
      var e, a, i, n;
      "input" !== (t = t.target || t).nodeName.toLowerCase() && (t = b("input", t.parentNode)[0]), b.datepicker._isDisabledDatepicker(t) || b.datepicker._lastInput === t || (n = b.datepicker._getInst(t), b.datepicker._curInst && b.datepicker._curInst !== n && (b.datepicker._curInst.dpDiv.stop(!0, !0), n && b.datepicker._datepickerShowing && b.datepicker._hideDatepicker(b.datepicker._curInst.input[0])), !1 !== (a = (i = b.datepicker._get(n, "beforeShow")) ? i.apply(t, [t, n]) : {}) && (c(n.settings, a), n.lastVal = null, b.datepicker._lastInput = t, b.datepicker._setDateFromField(n), b.datepicker._inDialog && (t.value = ""), b.datepicker._pos || (b.datepicker._pos = b.datepicker._findPos(t), b.datepicker._pos[1] += t.offsetHeight), e = !1, b(t).parents().each(function () {
        return !(e |= "fixed" === b(this).css("position"));
      }), i = {
        left: b.datepicker._pos[0],
        top: b.datepicker._pos[1]
      }, b.datepicker._pos = null, n.dpDiv.empty(), n.dpDiv.css({
        position: "absolute",
        display: "block",
        top: "-1000px"
      }), b.datepicker._updateDatepicker(n), i = b.datepicker._checkOffset(n, i, e), n.dpDiv.css({
        position: b.datepicker._inDialog && b.blockUI ? "static" : e ? "fixed" : "absolute",
        display: "none",
        left: i.left + "px",
        top: i.top + "px"
      }), n.inline || (a = b.datepicker._get(n, "showAnim"), i = b.datepicker._get(n, "duration"), n.dpDiv.css("z-index", function (t) {
        for (var e, a; t.length && t[0] !== document;) {
          if (("absolute" === (e = t.css("position")) || "relative" === e || "fixed" === e) && (a = parseInt(t.css("zIndex"), 10), !isNaN(a) && 0 !== a)) return a;
          t = t.parent();
        }

        return 0;
      }(b(t)) + 1), b.datepicker._datepickerShowing = !0, b.effects && b.effects.effect[a] ? n.dpDiv.show(a, b.datepicker._get(n, "showOptions"), i) : n.dpDiv[a || "show"](a ? i : null), b.datepicker._shouldFocusInput(n) && n.input.trigger("focus"), b.datepicker._curInst = n)));
    },
    _updateDatepicker: function (t) {
      this.maxRows = 4, (r = t).dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);

      var e,
          a = this._getNumberOfMonths(t),
          i = a[1],
          n = t.dpDiv.find("." + this._dayOverClass + " a");

      0 < n.length && s.apply(n.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 1 < i && t.dpDiv.addClass("ui-datepicker-multi-" + i).css("width", 17 * i + "em"), t.dpDiv[(1 !== a[0] || 1 !== a[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === b.datepicker._curInst && b.datepicker._datepickerShowing && b.datepicker._shouldFocusInput(t) && t.input.trigger("focus"), t.yearshtml && (e = t.yearshtml, setTimeout(function () {
        e === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), e = t.yearshtml = null;
      }, 0));
    },
    _shouldFocusInput: function (t) {
      return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
    },
    _checkOffset: function (t, e, a) {
      var i = t.dpDiv.outerWidth(),
          n = t.dpDiv.outerHeight(),
          r = t.input ? t.input.outerWidth() : 0,
          s = t.input ? t.input.outerHeight() : 0,
          o = document.documentElement.clientWidth + (a ? 0 : b(document).scrollLeft()),
          c = document.documentElement.clientHeight + (a ? 0 : b(document).scrollTop());
      return e.left -= this._get(t, "isRTL") ? i - r : 0, e.left -= a && e.left === t.input.offset().left ? b(document).scrollLeft() : 0, e.top -= a && e.top === t.input.offset().top + s ? b(document).scrollTop() : 0, e.left -= Math.min(e.left, e.left + i > o && i < o ? Math.abs(e.left + i - o) : 0), e.top -= Math.min(e.top, e.top + n > c && n < c ? Math.abs(n + s) : 0), e;
    },
    _findPos: function (t) {
      for (var e = this._getInst(t), a = this._get(e, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || b.expr.filters.hidden(t));) t = t[a ? "previousSibling" : "nextSibling"];

      return [(e = b(t).offset()).left, e.top];
    },
    _hideDatepicker: function (t) {
      var e,
          a,
          i = this._curInst;
      !i || t && i !== b.data(t, "datepicker") || this._datepickerShowing && (e = this._get(i, "showAnim"), a = this._get(i, "duration"), t = function () {
        b.datepicker._tidyDialog(i);
      }, b.effects && (b.effects.effect[e] || b.effects[e]) ? i.dpDiv.hide(e, b.datepicker._get(i, "showOptions"), a, t) : i.dpDiv["slideDown" === e ? "slideUp" : "fadeIn" === e ? "fadeOut" : "hide"](e ? a : null, t), e || t(), this._datepickerShowing = !1, (t = this._get(i, "onClose")) && t.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : "", i]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
        position: "absolute",
        left: "0",
        top: "-100px"
      }), b.blockUI && (b.unblockUI(), b("body").append(this.dpDiv))), this._inDialog = !1);
    },
    _tidyDialog: function (t) {
      t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
    },
    _checkExternalClick: function (t) {
      var e;
      b.datepicker._curInst && (e = b(t.target), t = b.datepicker._getInst(e[0]), (e[0].id === b.datepicker._mainDivId || 0 !== e.parents("#" + b.datepicker._mainDivId).length || e.hasClass(b.datepicker.markerClassName) || e.closest("." + b.datepicker._triggerClass).length || !b.datepicker._datepickerShowing || b.datepicker._inDialog && b.blockUI) && (!e.hasClass(b.datepicker.markerClassName) || b.datepicker._curInst === t) || b.datepicker._hideDatepicker());
    },
    _adjustDate: function (t, e, a) {
      var i = b(t),
          t = this._getInst(i[0]);

      this._isDisabledDatepicker(i[0]) || (this._adjustInstDate(t, e + ("M" === a ? this._get(t, "showCurrentAtPos") : 0), a), this._updateDatepicker(t));
    },
    _gotoToday: function (t) {
      var e = b(t),
          a = this._getInst(e[0]);

      this._get(a, "gotoCurrent") && a.currentDay ? (a.selectedDay = a.currentDay, a.drawMonth = a.selectedMonth = a.currentMonth, a.drawYear = a.selectedYear = a.currentYear) : (t = new Date(), a.selectedDay = t.getDate(), a.drawMonth = a.selectedMonth = t.getMonth(), a.drawYear = a.selectedYear = t.getFullYear()), this._notifyChange(a), this._adjustDate(e);
    },
    _selectMonthYear: function (t, e, a) {
      var i = b(t),
          t = this._getInst(i[0]);

      t["selected" + ("M" === a ? "Month" : "Year")] = t["draw" + ("M" === a ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10), this._notifyChange(t), this._adjustDate(i);
    },
    _selectDay: function (t, e, a, i) {
      var n = b(t);
      b(i).hasClass(this._unselectableClass) || this._isDisabledDatepicker(n[0]) || ((n = this._getInst(n[0])).selectedDay = n.currentDay = b("a", i).html(), n.selectedMonth = n.currentMonth = e, n.selectedYear = n.currentYear = a, this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)));
    },
    _clearDate: function (t) {
      t = b(t);

      this._selectDate(t, "");
    },
    _selectDate: function (t, e) {
      var a = b(t),
          t = this._getInst(a[0]);

      e = null != e ? e : this._formatDate(t), t.input && t.input.val(e), this._updateAlternate(t), (a = this._get(t, "onSelect")) ? a.apply(t.input ? t.input[0] : null, [e, t]) : t.input && t.input.trigger("change"), t.inline ? this._updateDatepicker(t) : (this._hideDatepicker(), this._lastInput = t.input[0], "object" != typeof t.input[0] && t.input.trigger("focus"), this._lastInput = null);
    },
    _updateAlternate: function (t) {
      var e,
          a,
          i = this._get(t, "altField");

      i && (e = this._get(t, "altFormat") || this._get(t, "dateFormat"), a = this._getDate(t), t = this.formatDate(e, a, this._getFormatConfig(t)), b(i).val(t));
    },
    noWeekends: function (t) {
      t = t.getDay();
      return [0 < t && t < 6, ""];
    },
    iso8601Week: function (t) {
      var e = new Date(t.getTime());
      return e.setDate(e.getDate() + 4 - (e.getDay() || 7)), t = e.getTime(), e.setMonth(0), e.setDate(1), Math.floor(Math.round((t - e) / 864e5) / 7) + 1;
    },
    parseDate: function (e, n, t) {
      if (null == e || null == n) throw "Invalid arguments";
      if ("" === (n = "object" == typeof n ? n.toString() : n + "")) return null;

      function r(t) {
        return (t = v + 1 < e.length && e.charAt(v + 1) === t) && v++, t;
      }

      function a(t) {
        var e = r(t),
            e = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
            e = new RegExp("^\\d{" + ("y" === t ? e : 1) + "," + e + "}");
        if (!(e = n.substring(d).match(e))) throw "Missing number at position " + d;
        return d += e[0].length, parseInt(e[0], 10);
      }

      function i(t, e, a) {
        var i = -1,
            e = b.map(r(t) ? a : e, function (t, e) {
          return [[e, t]];
        }).sort(function (t, e) {
          return -(t[1].length - e[1].length);
        });
        if (b.each(e, function (t, e) {
          var a = e[1];
          if (n.substr(d, a.length).toLowerCase() === a.toLowerCase()) return i = e[0], d += a.length, !1;
        }), -1 !== i) return i + 1;
        throw "Unknown name at position " + d;
      }

      function s() {
        if (n.charAt(d) !== e.charAt(v)) throw "Unexpected literal at position " + d;
        d++;
      }

      for (var o, c, l, d = 0, u = (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff, u = "string" != typeof u ? u : new Date().getFullYear() % 100 + parseInt(u, 10), h = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort, p = (t ? t.dayNames : null) || this._defaults.dayNames, f = (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort, g = (t ? t.monthNames : null) || this._defaults.monthNames, m = -1, _ = -1, k = -1, y = -1, D = !1, v = 0; v < e.length; v++) if (D) "'" !== e.charAt(v) || r("'") ? s() : D = !1;else switch (e.charAt(v)) {
        case "d":
          k = a("d");
          break;

        case "D":
          i("D", h, p);
          break;

        case "o":
          y = a("o");
          break;

        case "m":
          _ = a("m");
          break;

        case "M":
          _ = i("M", f, g);
          break;

        case "y":
          m = a("y");
          break;

        case "@":
          m = (l = new Date(a("@"))).getFullYear(), _ = l.getMonth() + 1, k = l.getDate();
          break;

        case "!":
          m = (l = new Date((a("!") - this._ticksTo1970) / 1e4)).getFullYear(), _ = l.getMonth() + 1, k = l.getDate();
          break;

        case "'":
          r("'") ? s() : D = !0;
          break;

        default:
          s();
      }

      if (d < n.length && (c = n.substr(d), !/^\s+/.test(c))) throw "Extra/unparsed characters found in date: " + c;
      if (-1 === m ? m = new Date().getFullYear() : m < 100 && (m += new Date().getFullYear() - new Date().getFullYear() % 100 + (m <= u ? 0 : -100)), -1 < y) for (_ = 1, k = y;;) {
        if (k <= (o = this._getDaysInMonth(m, _ - 1))) break;
        _++, k -= o;
      }
      if ((l = this._daylightSavingAdjust(new Date(m, _ - 1, k))).getFullYear() !== m || l.getMonth() + 1 !== _ || l.getDate() !== k) throw "Invalid date";
      return l;
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
    formatDate: function (e, t, a) {
      if (!t) return "";

      function n(t) {
        return (t = s + 1 < e.length && e.charAt(s + 1) === t) && s++, t;
      }

      function i(t, e, a) {
        var i = "" + e;
        if (n(t)) for (; i.length < a;) i = "0" + i;
        return i;
      }

      function r(t, e, a, i) {
        return (n(t) ? i : a)[e];
      }

      var s,
          o = (a ? a.dayNamesShort : null) || this._defaults.dayNamesShort,
          c = (a ? a.dayNames : null) || this._defaults.dayNames,
          l = (a ? a.monthNamesShort : null) || this._defaults.monthNamesShort,
          d = (a ? a.monthNames : null) || this._defaults.monthNames,
          u = "",
          h = !1;
      if (t) for (s = 0; s < e.length; s++) if (h) "'" !== e.charAt(s) || n("'") ? u += e.charAt(s) : h = !1;else switch (e.charAt(s)) {
        case "d":
          u += i("d", t.getDate(), 2);
          break;

        case "D":
          u += r("D", t.getDay(), o, c);
          break;

        case "o":
          u += i("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
          break;

        case "m":
          u += i("m", t.getMonth() + 1, 2);
          break;

        case "M":
          u += r("M", t.getMonth(), l, d);
          break;

        case "y":
          u += n("y") ? t.getFullYear() : (t.getFullYear() % 100 < 10 ? "0" : "") + t.getFullYear() % 100;
          break;

        case "@":
          u += t.getTime();
          break;

        case "!":
          u += 1e4 * t.getTime() + this._ticksTo1970;
          break;

        case "'":
          n("'") ? u += "'" : h = !0;
          break;

        default:
          u += e.charAt(s);
      }
      return u;
    },
    _possibleChars: function (e) {
      function t(t) {
        return (t = n + 1 < e.length && e.charAt(n + 1) === t) && n++, t;
      }

      for (var a = "", i = !1, n = 0; n < e.length; n++) if (i) "'" !== e.charAt(n) || t("'") ? a += e.charAt(n) : i = !1;else switch (e.charAt(n)) {
        case "d":
        case "m":
        case "y":
        case "@":
          a += "0123456789";
          break;

        case "D":
        case "M":
          return null;

        case "'":
          t("'") ? a += "'" : i = !0;
          break;

        default:
          a += e.charAt(n);
      }

      return a;
    },
    _get: function (t, e) {
      return (void 0 !== t.settings[e] ? t.settings : this._defaults)[e];
    },
    _setDateFromField: function (t, e) {
      if (t.input.val() !== t.lastVal) {
        var a = this._get(t, "dateFormat"),
            i = t.lastVal = t.input ? t.input.val() : null,
            n = this._getDefaultDate(t),
            r = n,
            s = this._getFormatConfig(t);

        try {
          r = this.parseDate(a, i, s) || n;
        } catch (t) {
          i = e ? "" : i;
        }

        t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), t.currentDay = i ? r.getDate() : 0, t.currentMonth = i ? r.getMonth() : 0, t.currentYear = i ? r.getFullYear() : 0, this._adjustInstDate(t);
      }
    },
    _getDefaultDate: function (t) {
      return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
    },
    _determineDate: function (o, t, e) {
      var a,
          i,
          t = null == t || "" === t ? e : "string" == typeof t ? function (t) {
        try {
          return b.datepicker.parseDate(b.datepicker._get(o, "dateFormat"), t, b.datepicker._getFormatConfig(o));
        } catch (t) {}

        for (var e = (t.toLowerCase().match(/^c/) ? b.datepicker._getDate(o) : null) || new Date(), a = e.getFullYear(), i = e.getMonth(), n = e.getDate(), r = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, s = r.exec(t); s;) {
          switch (s[2] || "d") {
            case "d":
            case "D":
              n += parseInt(s[1], 10);
              break;

            case "w":
            case "W":
              n += 7 * parseInt(s[1], 10);
              break;

            case "m":
            case "M":
              i += parseInt(s[1], 10), n = Math.min(n, b.datepicker._getDaysInMonth(a, i));
              break;

            case "y":
            case "Y":
              a += parseInt(s[1], 10), n = Math.min(n, b.datepicker._getDaysInMonth(a, i));
          }

          s = r.exec(t);
        }

        return new Date(a, i, n);
      }(t) : "number" == typeof t ? isNaN(t) ? e : (a = t, (i = new Date()).setDate(i.getDate() + a), i) : new Date(t.getTime());
      return (t = t && "Invalid Date" === t.toString() ? e : t) && (t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0)), this._daylightSavingAdjust(t);
    },
    _daylightSavingAdjust: function (t) {
      return t ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t) : null;
    },
    _setDate: function (t, e, a) {
      var i = !e,
          n = t.selectedMonth,
          r = t.selectedYear,
          e = this._restrictMinMax(t, this._determineDate(t, e, new Date()));

      t.selectedDay = t.currentDay = e.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = e.getMonth(), t.drawYear = t.selectedYear = t.currentYear = e.getFullYear(), n === t.selectedMonth && r === t.selectedYear || a || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(i ? "" : this._formatDate(t));
    },
    _getDate: function (t) {
      return !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
    },
    _attachHandlers: function (t) {
      var e = this._get(t, "stepMonths"),
          a = "#" + t.id.replace(/\\\\/g, "\\");

      t.dpDiv.find("[data-handler]").map(function () {
        var t = {
          prev: function () {
            b.datepicker._adjustDate(a, -e, "M");
          },
          next: function () {
            b.datepicker._adjustDate(a, +e, "M");
          },
          hide: function () {
            b.datepicker._hideDatepicker();
          },
          today: function () {
            b.datepicker._gotoToday(a);
          },
          selectDay: function () {
            return b.datepicker._selectDay(a, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
          },
          selectMonth: function () {
            return b.datepicker._selectMonthYear(a, this, "M"), !1;
          },
          selectYear: function () {
            return b.datepicker._selectMonthYear(a, this, "Y"), !1;
          }
        };
        b(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
      });
    },
    _generateHTML: function (t) {
      var e,
          a,
          i,
          n,
          r,
          s,
          o,
          c,
          l,
          d,
          u,
          h,
          p,
          f,
          g,
          m,
          _,
          k,
          y,
          D,
          v,
          b,
          M,
          w,
          x,
          C,
          I,
          S,
          F,
          N,
          T,
          Y = new Date(),
          A = this._daylightSavingAdjust(new Date(Y.getFullYear(), Y.getMonth(), Y.getDate())),
          j = this._get(t, "isRTL"),
          O = this._get(t, "showButtonPanel"),
          K = this._get(t, "hideIfNoPrevNext"),
          R = this._get(t, "navigationAsDateFormat"),
          E = this._getNumberOfMonths(t),
          W = this._get(t, "showCurrentAtPos"),
          Y = this._get(t, "stepMonths"),
          H = 1 !== E[0] || 1 !== E[1],
          L = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
          P = this._getMinMaxDate(t, "min"),
          B = this._getMinMaxDate(t, "max"),
          U = t.drawMonth - W,
          z = t.drawYear;

      if (U < 0 && (U += 12, z--), B) for (e = this._daylightSavingAdjust(new Date(B.getFullYear(), B.getMonth() - E[0] * E[1] + 1, B.getDate())), e = P && e < P ? P : e; this._daylightSavingAdjust(new Date(z, U, 1)) > e;) --U < 0 && (U = 11, z--);

      for (t.drawMonth = U, t.drawYear = z, W = this._get(t, "prevText"), W = R ? this.formatDate(W, this._daylightSavingAdjust(new Date(z, U - Y, 1)), this._getFormatConfig(t)) : W, a = this._canAdjustMonth(t, -1, z, U) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + W + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + W + "</span></a>" : K ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + W + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + W + "</span></a>", W = this._get(t, "nextText"), W = R ? this.formatDate(W, this._daylightSavingAdjust(new Date(z, U + Y, 1)), this._getFormatConfig(t)) : W, i = this._canAdjustMonth(t, 1, z, U) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + W + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + W + "</span></a>" : K ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + W + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + W + "</span></a>", K = this._get(t, "currentText"), W = this._get(t, "gotoCurrent") && t.currentDay ? L : A, K = R ? this.formatDate(K, W, this._getFormatConfig(t)) : K, R = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", R = O ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (j ? R : "") + (this._isInRange(t, W) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + K + "</button>" : "") + (j ? "" : R) + "</div>" : "", n = parseInt(this._get(t, "firstDay"), 10), n = isNaN(n) ? 0 : n, r = this._get(t, "showWeek"), s = this._get(t, "dayNames"), o = this._get(t, "dayNamesMin"), c = this._get(t, "monthNames"), l = this._get(t, "monthNamesShort"), d = this._get(t, "beforeShowDay"), u = this._get(t, "showOtherMonths"), h = this._get(t, "selectOtherMonths"), p = this._getDefaultDate(t), f = "", m = 0; m < E[0]; m++) {
        for (_ = "", this.maxRows = 4, k = 0; k < E[1]; k++) {
          if (y = this._daylightSavingAdjust(new Date(z, U, t.selectedDay)), M = " ui-corner-all", D = "", H) {
            if (D += "<div class='ui-datepicker-group", 1 < E[1]) switch (k) {
              case 0:
                D += " ui-datepicker-group-first", M = " ui-corner-" + (j ? "right" : "left");
                break;

              case E[1] - 1:
                D += " ui-datepicker-group-last", M = " ui-corner-" + (j ? "left" : "right");
                break;

              default:
                D += " ui-datepicker-group-middle", M = "";
            }
            D += "'>";
          }

          for (D += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + M + "'>" + (/all|left/.test(M) && 0 === m ? j ? i : a : "") + (/all|right/.test(M) && 0 === m ? j ? a : i : "") + this._generateMonthYearHeader(t, U, z, P, B, 0 < m || 0 < k, c, l) + "</div><table class='ui-datepicker-calendar'><thead><tr>", v = r ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", g = 0; g < 7; g++) v += "<th scope='col'" + (5 <= (g + n + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + s[b = (g + n) % 7] + "'>" + o[b] + "</span></th>";

          for (D += v + "</tr></thead><tbody>", w = this._getDaysInMonth(z, U), z === t.selectedYear && U === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, w)), M = (this._getFirstDayOfMonth(z, U) - n + 7) % 7, w = Math.ceil((M + w) / 7), x = H && this.maxRows > w ? this.maxRows : w, this.maxRows = x, C = this._daylightSavingAdjust(new Date(z, U, 1 - M)), I = 0; I < x; I++) {
            for (D += "<tr>", S = r ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(C) + "</td>" : "", g = 0; g < 7; g++) F = d ? d.apply(t.input ? t.input[0] : null, [C]) : [!0, ""], T = (N = C.getMonth() !== U) && !h || !F[0] || P && C < P || B && B < C, S += "<td class='" + (5 <= (g + n + 6) % 7 ? " ui-datepicker-week-end" : "") + (N ? " ui-datepicker-other-month" : "") + (C.getTime() === y.getTime() && U === t.selectedMonth && t._keyEvent || p.getTime() === C.getTime() && p.getTime() === y.getTime() ? " " + this._dayOverClass : "") + (T ? " " + this._unselectableClass + " ui-state-disabled" : "") + (N && !u ? "" : " " + F[1] + (C.getTime() === L.getTime() ? " " + this._currentClass : "") + (C.getTime() === A.getTime() ? " ui-datepicker-today" : "")) + "'" + (N && !u || !F[2] ? "" : " title='" + F[2].replace(/'/g, "&#39;") + "'") + (T ? "" : " data-handler='selectDay' data-event='click' data-month='" + C.getMonth() + "' data-year='" + C.getFullYear() + "'") + ">" + (N && !u ? "&#xa0;" : T ? "<span class='ui-state-default'>" + C.getDate() + "</span>" : "<a class='ui-state-default" + (C.getTime() === A.getTime() ? " ui-state-highlight" : "") + (C.getTime() === L.getTime() ? " ui-state-active" : "") + (N ? " ui-priority-secondary" : "") + "' href='#'>" + C.getDate() + "</a>") + "</td>", C.setDate(C.getDate() + 1), C = this._daylightSavingAdjust(C);

            D += S + "</tr>";
          }

          11 < ++U && (U = 0, z++), _ += D += "</tbody></table>" + (H ? "</div>" + (0 < E[0] && k === E[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
        }

        f += _;
      }

      return f += R, t._keyEvent = !1, f;
    },
    _generateMonthYearHeader: function (t, e, a, i, n, r, s, o) {
      var c,
          l,
          d,
          u,
          h,
          p,
          f,
          g = this._get(t, "changeMonth"),
          m = this._get(t, "changeYear"),
          _ = this._get(t, "showMonthAfterYear"),
          k = "<div class='ui-datepicker-title'>",
          y = "";

      if (r || !g) y += "<span class='ui-datepicker-month'>" + s[e] + "</span>";else {
        for (c = i && i.getFullYear() === a, l = n && n.getFullYear() === a, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", d = 0; d < 12; d++) (!c || d >= i.getMonth()) && (!l || d <= n.getMonth()) && (y += "<option value='" + d + "'" + (d === e ? " selected='selected'" : "") + ">" + o[d] + "</option>");

        y += "</select>";
      }
      if (_ || (k += y + (!r && g && m ? "" : "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", r || !m) k += "<span class='ui-datepicker-year'>" + a + "</span>";else {
        for (u = this._get(t, "yearRange").split(":"), h = new Date().getFullYear(), p = (s = function (t) {
          t = t.match(/c[+\-].*/) ? a + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? h + parseInt(t, 10) : parseInt(t, 10);
          return isNaN(t) ? h : t;
        })(u[0]), f = Math.max(p, s(u[1] || "")), p = i ? Math.max(p, i.getFullYear()) : p, f = n ? Math.min(f, n.getFullYear()) : f, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p <= f; p++) t.yearshtml += "<option value='" + p + "'" + (p === a ? " selected='selected'" : "") + ">" + p + "</option>";

        t.yearshtml += "</select>", k += t.yearshtml, t.yearshtml = null;
      }
      return k += this._get(t, "yearSuffix"), _ && (k += (!r && g && m ? "" : "&#xa0;") + y), k += "</div>";
    },
    _adjustInstDate: function (t, e, a) {
      var i = t.selectedYear + ("Y" === a ? e : 0),
          n = t.selectedMonth + ("M" === a ? e : 0),
          e = Math.min(t.selectedDay, this._getDaysInMonth(i, n)) + ("D" === a ? e : 0),
          e = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(i, n, e)));

      t.selectedDay = e.getDate(), t.drawMonth = t.selectedMonth = e.getMonth(), t.drawYear = t.selectedYear = e.getFullYear(), "M" !== a && "Y" !== a || this._notifyChange(t);
    },
    _restrictMinMax: function (t, e) {
      var a = this._getMinMaxDate(t, "min"),
          t = this._getMinMaxDate(t, "max"),
          e = a && e < a ? a : e;

      return t && t < e ? t : e;
    },
    _notifyChange: function (t) {
      var e = this._get(t, "onChangeMonthYear");

      e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
    },
    _getNumberOfMonths: function (t) {
      t = this._get(t, "numberOfMonths");
      return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
    },
    _getMinMaxDate: function (t, e) {
      return this._determineDate(t, this._get(t, e + "Date"), null);
    },
    _getDaysInMonth: function (t, e) {
      return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
    },
    _getFirstDayOfMonth: function (t, e) {
      return new Date(t, e, 1).getDay();
    },
    _canAdjustMonth: function (t, e, a, i) {
      var n = this._getNumberOfMonths(t),
          n = this._daylightSavingAdjust(new Date(a, i + (e < 0 ? e : n[0] * n[1]), 1));

      return e < 0 && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())), this._isInRange(t, n);
    },
    _isInRange: function (t, e) {
      var a = this._getMinMaxDate(t, "min"),
          i = this._getMinMaxDate(t, "max"),
          n = null,
          r = null,
          s = this._get(t, "yearRange");

      return s && (t = s.split(":"), s = new Date().getFullYear(), n = parseInt(t[0], 10), r = parseInt(t[1], 10), t[0].match(/[+\-].*/) && (n += s), t[1].match(/[+\-].*/) && (r += s)), (!a || e.getTime() >= a.getTime()) && (!i || e.getTime() <= i.getTime()) && (!n || e.getFullYear() >= n) && (!r || e.getFullYear() <= r);
    },
    _getFormatConfig: function (t) {
      var e = this._get(t, "shortYearCutoff");

      return {
        shortYearCutoff: e = "string" != typeof e ? e : new Date().getFullYear() % 100 + parseInt(e, 10),
        dayNamesShort: this._get(t, "dayNamesShort"),
        dayNames: this._get(t, "dayNames"),
        monthNamesShort: this._get(t, "monthNamesShort"),
        monthNames: this._get(t, "monthNames")
      };
    },
    _formatDate: function (t, e, a, i) {
      e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
      e = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(i, a, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
      return this.formatDate(this._get(t, "dateFormat"), e, this._getFormatConfig(t));
    }
  }), b.fn.datepicker = function (t) {
    if (!this.length) return this;
    b.datepicker.initialized || (b(document).on("mousedown", b.datepicker._checkExternalClick), b.datepicker.initialized = !0), 0 === b("#" + b.datepicker._mainDivId).length && b("body").append(b.datepicker.dpDiv);
    var e = Array.prototype.slice.call(arguments, 1);
    return "string" == typeof t && ("isDisabled" === t || "getDate" === t || "widget" === t) || "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? b.datepicker["_" + t + "Datepicker"].apply(b.datepicker, [this[0]].concat(e)) : this.each(function () {
      "string" == typeof t ? b.datepicker["_" + t + "Datepicker"].apply(b.datepicker, [this].concat(e)) : b.datepicker._attachDatepicker(this, t);
    });
  }, b.datepicker = new t(), b.datepicker.initialized = !1, b.datepicker.uuid = new Date().getTime(), b.datepicker.version = "1.12.1";
  b.datepicker;

  var d,
      u,
      o,
      h,
      e,
      p,
      f,
      g,
      l,
      i,
      m,
      _,
      n,
      k,
      y,
      D,
      v,
      M,
      w,
      x,
      C,
      I = "ui-effects-",
      S = "ui-effects-style",
      F = "ui-effects-animated",
      N = b;

  function T(t, e, a) {
    var i = g[e.type] || {};
    return null == t ? a || !e.def ? null : e.def : (t = i.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : i.mod ? (t + i.mod) % i.mod : t < 0 ? 0 : i.max < t ? i.max : t);
  }

  function Y(i) {
    var n = p(),
        r = n._rgba = [];
    return i = i.toLowerCase(), m(e, function (t, e) {
      var a = e.re.exec(i),
          a = a && e.parse(a),
          e = e.space || "rgba";
      if (a) return a = n[e](a), n[f[e].cache] = a[f[e].cache], r = n._rgba = a._rgba, !1;
    }), r.length ? ("0,0,0,0" === r.join() && d.extend(r, o.transparent), n) : o[i];
  }

  function A(t, e, a) {
    return 6 * (a = (a + 1) % 1) < 1 ? t + (e - t) * a * 6 : 2 * a < 1 ? e : 3 * a < 2 ? t + (e - t) * (2 / 3 - a) * 6 : t;
  }

  function j(t) {
    var e,
        a,
        i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
        n = {};
    if (i && i.length && i[0] && i[i[0]]) for (a = i.length; a--;) "string" == typeof i[e = i[a]] && (n[b.camelCase(e)] = i[e]);else for (e in i) "string" == typeof i[e] && (n[e] = i[e]);
    return n;
  }

  function O(t, e, a, i) {
    return b.isPlainObject(t) && (t = (e = t).effect), t = {
      effect: t
    }, null == e && (e = {}), b.isFunction(e) && (i = e, a = null, e = {}), "number" != typeof e && !b.fx.speeds[e] || (i = a, a = e, e = {}), b.isFunction(a) && (i = a, a = null), e && b.extend(t, e), a = a || e.duration, t.duration = b.fx.off ? 0 : "number" == typeof a ? a : a in b.fx.speeds ? b.fx.speeds[a] : b.fx.speeds._default, t.complete = i || e.complete, t;
  }

  function K(t) {
    return !t || "number" == typeof t || b.fx.speeds[t] || "string" == typeof t && !b.effects.effect[t] || b.isFunction(t) || "object" == typeof t && !t.effect;
  }

  function R(t, e) {
    var a = e.outerWidth(),
        e = e.outerHeight(),
        t = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(t) || ["", 0, a, e, 0];
    return {
      top: parseFloat(t[1]) || 0,
      right: "auto" === t[2] ? a : parseFloat(t[2]),
      bottom: "auto" === t[3] ? e : parseFloat(t[3]),
      left: parseFloat(t[4]) || 0
    };
  }

  b.effects = {
    effect: {}
  }, h = /^([\-+])=\s*(\d+\.?\d*)/, e = [{
    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
    parse: function (t) {
      return [t[1], t[2], t[3], t[4]];
    }
  }, {
    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
    parse: function (t) {
      return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
    }
  }, {
    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
    parse: function (t) {
      return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
    }
  }, {
    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
    parse: function (t) {
      return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
    }
  }, {
    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
    space: "hsla",
    parse: function (t) {
      return [t[1], t[2] / 100, t[3] / 100, t[4]];
    }
  }], p = (d = N).Color = function (t, e, a, i) {
    return new d.Color.fn.parse(t, e, a, i);
  }, f = {
    rgba: {
      props: {
        red: {
          idx: 0,
          type: "byte"
        },
        green: {
          idx: 1,
          type: "byte"
        },
        blue: {
          idx: 2,
          type: "byte"
        }
      }
    },
    hsla: {
      props: {
        hue: {
          idx: 0,
          type: "degrees"
        },
        saturation: {
          idx: 1,
          type: "percent"
        },
        lightness: {
          idx: 2,
          type: "percent"
        }
      }
    }
  }, g = {
    byte: {
      floor: !0,
      max: 255
    },
    percent: {
      max: 1
    },
    degrees: {
      mod: 360,
      floor: !0
    }
  }, l = p.support = {}, i = d("<p>")[0], m = d.each, i.style.cssText = "background-color:rgba(1,1,1,.5)", l.rgba = -1 < i.style.backgroundColor.indexOf("rgba"), m(f, function (t, e) {
    e.cache = "_" + t, e.props.alpha = {
      idx: 3,
      type: "percent",
      def: 1
    };
  }), p.fn = d.extend(p.prototype, {
    parse: function (n, t, e, a) {
      if (n === u) return this._rgba = [null, null, null, null], this;
      (n.jquery || n.nodeType) && (n = d(n).css(t), t = u);
      var r = this,
          i = d.type(n),
          s = this._rgba = [];
      return t !== u && (n = [n, t, e, a], i = "array"), "string" === i ? this.parse(Y(n) || o._default) : "array" === i ? (m(f.rgba.props, function (t, e) {
        s[e.idx] = T(n[e.idx], e);
      }), this) : "object" === i ? (m(f, n instanceof p ? function (t, e) {
        n[e.cache] && (r[e.cache] = n[e.cache].slice());
      } : function (t, a) {
        var i = a.cache;
        m(a.props, function (t, e) {
          if (!r[i] && a.to) {
            if ("alpha" === t || null == n[t]) return;
            r[i] = a.to(r._rgba);
          }

          r[i][e.idx] = T(n[t], e, !0);
        }), r[i] && d.inArray(null, r[i].slice(0, 3)) < 0 && (r[i][3] = 1, a.from && (r._rgba = a.from(r[i])));
      }), this) : void 0;
    },
    is: function (t) {
      var n = p(t),
          r = !0,
          s = this;
      return m(f, function (t, e) {
        var a,
            i = n[e.cache];
        return i && (a = s[e.cache] || e.to && e.to(s._rgba) || [], m(e.props, function (t, e) {
          if (null != i[e.idx]) return r = i[e.idx] === a[e.idx];
        })), r;
      }), r;
    },
    _space: function () {
      var a = [],
          i = this;
      return m(f, function (t, e) {
        i[e.cache] && a.push(t);
      }), a.pop();
    },
    transition: function (t, s) {
      var e = (l = p(t))._space(),
          a = f[e],
          t = 0 === this.alpha() ? p("transparent") : this,
          o = t[a.cache] || a.to(t._rgba),
          c = o.slice(),
          l = l[a.cache];

      return m(a.props, function (t, e) {
        var a = e.idx,
            i = o[a],
            n = l[a],
            r = g[e.type] || {};
        null !== n && (null === i ? c[a] = n : (r.mod && (r.mod / 2 < n - i ? i += r.mod : r.mod / 2 < i - n && (i -= r.mod)), c[a] = T((n - i) * s + i, e)));
      }), this[e](c);
    },
    blend: function (t) {
      if (1 === this._rgba[3]) return this;

      var e = this._rgba.slice(),
          a = e.pop(),
          i = p(t)._rgba;

      return p(d.map(e, function (t, e) {
        return (1 - a) * i[e] + a * t;
      }));
    },
    toRgbaString: function () {
      var t = "rgba(",
          e = d.map(this._rgba, function (t, e) {
        return null == t ? 2 < e ? 1 : 0 : t;
      });
      return 1 === e[3] && (e.pop(), t = "rgb("), t + e.join() + ")";
    },
    toHslaString: function () {
      var t = "hsla(",
          e = d.map(this.hsla(), function (t, e) {
        return null == t && (t = 2 < e ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t;
      });
      return 1 === e[3] && (e.pop(), t = "hsl("), t + e.join() + ")";
    },
    toHexString: function (t) {
      var e = this._rgba.slice(),
          a = e.pop();

      return t && e.push(~~(255 * a)), "#" + d.map(e, function (t) {
        return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
      }).join("");
    },
    toString: function () {
      return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
    }
  }), p.fn.parse.prototype = p.fn, f.hsla.to = function (t) {
    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
    var e = t[0] / 255,
        a = t[1] / 255,
        i = t[2] / 255,
        n = t[3],
        r = Math.max(e, a, i),
        s = Math.min(e, a, i),
        o = r - s,
        c = r + s,
        t = .5 * c,
        a = s === r ? 0 : e === r ? 60 * (a - i) / o + 360 : a === r ? 60 * (i - e) / o + 120 : 60 * (e - a) / o + 240,
        c = 0 == o ? 0 : t <= .5 ? o / c : o / (2 - c);
    return [Math.round(a) % 360, c, t, null == n ? 1 : n];
  }, f.hsla.from = function (t) {
    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
    var e = t[0] / 360,
        a = t[1],
        i = t[2],
        t = t[3],
        a = i <= .5 ? i * (1 + a) : i + a - i * a,
        i = 2 * i - a;
    return [Math.round(255 * A(i, a, e + 1 / 3)), Math.round(255 * A(i, a, e)), Math.round(255 * A(i, a, e - 1 / 3)), t];
  }, m(f, function (c, t) {
    var r = t.props,
        s = t.cache,
        o = t.to,
        l = t.from;
    p.fn[c] = function (t) {
      if (o && !this[s] && (this[s] = o(this._rgba)), t === u) return this[s].slice();
      var e,
          a = d.type(t),
          i = "array" === a || "object" === a ? t : arguments,
          n = this[s].slice();
      return m(r, function (t, e) {
        t = i["object" === a ? t : e.idx];
        null == t && (t = n[e.idx]), n[e.idx] = T(t, e);
      }), l ? ((e = p(l(n)))[s] = n, e) : p(n);
    }, m(r, function (s, o) {
      p.fn[s] || (p.fn[s] = function (t) {
        var e,
            a = d.type(t),
            i = "alpha" === s ? this._hsla ? "hsla" : "rgba" : c,
            n = this[i](),
            r = n[o.idx];
        return "undefined" === a ? r : ("function" === a && (t = t.call(this, r), a = d.type(t)), null == t && o.empty ? this : ("string" === a && (e = h.exec(t)) && (t = r + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)), n[o.idx] = t, this[i](n)));
      });
    });
  }), p.hook = function (t) {
    t = t.split(" ");
    m(t, function (t, r) {
      d.cssHooks[r] = {
        set: function (t, e) {
          var a,
              i,
              n = "";

          if ("transparent" !== e && ("string" !== d.type(e) || (a = Y(e)))) {
            if (e = p(a || e), !l.rgba && 1 !== e._rgba[3]) {
              for (i = "backgroundColor" === r ? t.parentNode : t; ("" === n || "transparent" === n) && i && i.style;) try {
                n = d.css(i, "backgroundColor"), i = i.parentNode;
              } catch (t) {}

              e = e.blend(n && "transparent" !== n ? n : "_default");
            }

            e = e.toRgbaString();
          }

          try {
            t.style[r] = e;
          } catch (t) {}
        }
      }, d.fx.step[r] = function (t) {
        t.colorInit || (t.start = p(t.elem, r), t.end = p(t.end), t.colorInit = !0), d.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos));
      };
    });
  }, p.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), d.cssHooks.borderColor = {
    expand: function (a) {
      var i = {};
      return m(["Top", "Right", "Bottom", "Left"], function (t, e) {
        i["border" + e + "Color"] = a;
      }), i;
    }
  }, o = d.Color.names = {
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    fuchsia: "#ff00ff",
    gray: "#808080",
    green: "#008000",
    lime: "#00ff00",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    purple: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    teal: "#008080",
    white: "#ffffff",
    yellow: "#ffff00",
    transparent: [null, null, null, 0],
    _default: "#ffffff"
  }, y = ["add", "remove", "toggle"], D = {
    border: 1,
    borderBottom: 1,
    borderColor: 1,
    borderLeft: 1,
    borderRight: 1,
    borderTop: 1,
    borderWidth: 1,
    margin: 1,
    padding: 1
  }, b.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, e) {
    b.fx.step[e] = function (t) {
      ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (N.style(t.elem, e, t.end), t.setAttr = !0);
    };
  }), b.fn.addBack || (b.fn.addBack = function (t) {
    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
  }), b.effects.animateClass = function (n, t, e, a) {
    var r = b.speed(t, e, a);
    return this.queue(function () {
      var a = b(this),
          t = a.attr("class") || "",
          e = (e = r.children ? a.find("*").addBack() : a).map(function () {
        return {
          el: b(this),
          start: j(this)
        };
      }),
          i = function () {
        b.each(y, function (t, e) {
          n[e] && a[e + "Class"](n[e]);
        });
      };

      i(), e = e.map(function () {
        return this.end = j(this.el[0]), this.diff = function (t, e) {
          var a,
              i,
              n = {};

          for (a in e) i = e[a], t[a] !== i && (D[a] || !b.fx.step[a] && isNaN(parseFloat(i)) || (n[a] = i));

          return n;
        }(this.start, this.end), this;
      }), a.attr("class", t), e = e.map(function () {
        var t = this,
            e = b.Deferred(),
            a = b.extend({}, r, {
          queue: !1,
          complete: function () {
            e.resolve(t);
          }
        });
        return this.el.animate(this.diff, a), e.promise();
      }), b.when.apply(b, e.get()).done(function () {
        i(), b.each(arguments, function () {
          var e = this.el;
          b.each(this.diff, function (t) {
            e.css(t, "");
          });
        }), r.complete.call(a[0]);
      });
    });
  }, b.fn.extend({
    addClass: (k = b.fn.addClass, function (t, e, a, i) {
      return e ? b.effects.animateClass.call(this, {
        add: t
      }, e, a, i) : k.apply(this, arguments);
    }),
    removeClass: (n = b.fn.removeClass, function (t, e, a, i) {
      return 1 < arguments.length ? b.effects.animateClass.call(this, {
        remove: t
      }, e, a, i) : n.apply(this, arguments);
    }),
    toggleClass: (_ = b.fn.toggleClass, function (t, e, a, i, n) {
      return "boolean" == typeof e || void 0 === e ? a ? b.effects.animateClass.call(this, e ? {
        add: t
      } : {
        remove: t
      }, a, i, n) : _.apply(this, arguments) : b.effects.animateClass.call(this, {
        toggle: t
      }, e, a, i);
    }),
    switchClass: function (t, e, a, i, n) {
      return b.effects.animateClass.call(this, {
        add: e,
        remove: t
      }, a, i, n);
    }
  }), b.expr && b.expr.filters && b.expr.filters.animated && (b.expr.filters.animated = (v = b.expr.filters.animated, function (t) {
    return !!b(t).data(F) || v(t);
  })), !1 !== b.uiBackCompat && b.extend(b.effects, {
    save: function (t, e) {
      for (var a = 0, i = e.length; a < i; a++) null !== e[a] && t.data(I + e[a], t[0].style[e[a]]);
    },
    restore: function (t, e) {
      for (var a, i = 0, n = e.length; i < n; i++) null !== e[i] && (a = t.data(I + e[i]), t.css(e[i], a));
    },
    setMode: function (t, e) {
      return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
    },
    createWrapper: function (a) {
      if (a.parent().is(".ui-effects-wrapper")) return a.parent();
      var i = {
        width: a.outerWidth(!0),
        height: a.outerHeight(!0),
        float: a.css("float")
      },
          t = b("<div></div>").addClass("ui-effects-wrapper").css({
        fontSize: "100%",
        background: "transparent",
        border: "none",
        margin: 0,
        padding: 0
      }),
          e = {
        width: a.width(),
        height: a.height()
      },
          n = document.activeElement;

      try {
        n.id;
      } catch (t) {
        n = document.body;
      }

      return a.wrap(t), a[0] !== n && !b.contains(a[0], n) || b(n).trigger("focus"), t = a.parent(), "static" === a.css("position") ? (t.css({
        position: "relative"
      }), a.css({
        position: "relative"
      })) : (b.extend(i, {
        position: a.css("position"),
        zIndex: a.css("z-index")
      }), b.each(["top", "left", "bottom", "right"], function (t, e) {
        i[e] = a.css(e), isNaN(parseInt(i[e], 10)) && (i[e] = "auto");
      }), a.css({
        position: "relative",
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto"
      })), a.css(e), t.css(i).show();
    },
    removeWrapper: function (t) {
      var e = document.activeElement;
      return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), t[0] !== e && !b.contains(t[0], e) || b(e).trigger("focus")), t;
    }
  }), b.extend(b.effects, {
    version: "1.12.1",
    define: function (t, e, a) {
      return a || (a = e, e = "effect"), b.effects.effect[t] = a, b.effects.effect[t].mode = e, a;
    },
    scaledDimensions: function (t, e, a) {
      if (0 === e) return {
        height: 0,
        width: 0,
        outerHeight: 0,
        outerWidth: 0
      };
      var i = "horizontal" !== a ? (e || 100) / 100 : 1,
          e = "vertical" !== a ? (e || 100) / 100 : 1;
      return {
        height: t.height() * e,
        width: t.width() * i,
        outerHeight: t.outerHeight() * e,
        outerWidth: t.outerWidth() * i
      };
    },
    clipToBox: function (t) {
      return {
        width: t.clip.right - t.clip.left,
        height: t.clip.bottom - t.clip.top,
        left: t.clip.left,
        top: t.clip.top
      };
    },
    unshift: function (t, e, a) {
      var i = t.queue();
      1 < e && i.splice.apply(i, [1, 0].concat(i.splice(e, a))), t.dequeue();
    },
    saveStyle: function (t) {
      t.data(S, t[0].style.cssText);
    },
    restoreStyle: function (t) {
      t[0].style.cssText = t.data(S) || "", t.removeData(S);
    },
    mode: function (t, e) {
      t = t.is(":hidden");
      return "toggle" === e && (e = t ? "show" : "hide"), (t ? "hide" === e : "show" === e) && (e = "none"), e;
    },
    getBaseline: function (t, e) {
      var a, i;

      switch (t[0]) {
        case "top":
          a = 0;
          break;

        case "middle":
          a = .5;
          break;

        case "bottom":
          a = 1;
          break;

        default:
          a = t[0] / e.height;
      }

      switch (t[1]) {
        case "left":
          i = 0;
          break;

        case "center":
          i = .5;
          break;

        case "right":
          i = 1;
          break;

        default:
          i = t[1] / e.width;
      }

      return {
        x: i,
        y: a
      };
    },
    createPlaceholder: function (t) {
      var e,
          a = t.css("position"),
          i = t.position();
      return t.css({
        marginTop: t.css("marginTop"),
        marginBottom: t.css("marginBottom"),
        marginLeft: t.css("marginLeft"),
        marginRight: t.css("marginRight")
      }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()), /^(static|relative)/.test(a) && (a = "absolute", e = b("<" + t[0].nodeName + ">").insertAfter(t).css({
        display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
        visibility: "hidden",
        marginTop: t.css("marginTop"),
        marginBottom: t.css("marginBottom"),
        marginLeft: t.css("marginLeft"),
        marginRight: t.css("marginRight"),
        float: t.css("float")
      }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"), t.data(I + "placeholder", e)), t.css({
        position: a,
        left: i.left,
        top: i.top
      }), e;
    },
    removePlaceholder: function (t) {
      var e = I + "placeholder",
          a = t.data(e);
      a && (a.remove(), t.removeData(e));
    },
    cleanUp: function (t) {
      b.effects.restoreStyle(t), b.effects.removePlaceholder(t);
    },
    setTransition: function (i, t, n, r) {
      return r = r || {}, b.each(t, function (t, e) {
        var a = i.cssUnit(e);
        0 < a[0] && (r[e] = a[0] * n + a[1]);
      }), r;
    }
  }), b.fn.extend({
    effect: function () {
      function t(t) {
        var e = b(this),
            a = b.effects.mode(e, o) || r;
        e.data(F, !0), c.push(a), r && ("show" === a || a === r && "hide" === a) && e.show(), r && "none" === a || b.effects.saveStyle(e), b.isFunction(t) && t();
      }

      var i = O.apply(this, arguments),
          n = b.effects.effect[i.effect],
          r = n.mode,
          e = i.queue,
          a = e || "fx",
          s = i.complete,
          o = i.mode,
          c = [];
      return b.fx.off || !n ? o ? this[o](i.duration, s) : this.each(function () {
        s && s.call(this);
      }) : !1 === e ? this.each(t).each(l) : this.queue(a, t).queue(a, l);

      function l(t) {
        var e = b(this);

        function a() {
          b.isFunction(s) && s.call(e[0]), b.isFunction(t) && t();
        }

        i.mode = c.shift(), !1 === b.uiBackCompat || r ? "none" === i.mode ? (e[o](), a()) : n.call(e[0], i, function () {
          e.removeData(F), b.effects.cleanUp(e), "hide" === i.mode && e.hide(), a();
        }) : (e.is(":hidden") ? "hide" === o : "show" === o) ? (e[o](), a()) : n.call(e[0], i, a);
      }
    },
    show: (x = b.fn.show, function (t) {
      if (K(t)) return x.apply(this, arguments);
      var e = O.apply(this, arguments);
      return e.mode = "show", this.effect.call(this, e);
    }),
    hide: (w = b.fn.hide, function (t) {
      if (K(t)) return w.apply(this, arguments);
      var e = O.apply(this, arguments);
      return e.mode = "hide", this.effect.call(this, e);
    }),
    toggle: (M = b.fn.toggle, function (t) {
      if (K(t) || "boolean" == typeof t) return M.apply(this, arguments);
      var e = O.apply(this, arguments);
      return e.mode = "toggle", this.effect.call(this, e);
    }),
    cssUnit: function (t) {
      var a = this.css(t),
          i = [];
      return b.each(["em", "px", "%", "pt"], function (t, e) {
        0 < a.indexOf(e) && (i = [parseFloat(a), e]);
      }), i;
    },
    cssClip: function (t) {
      return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : R(this.css("clip"), this);
    },
    transfer: function (t, e) {
      var a = b(this),
          i = b(t.to),
          n = "fixed" === i.css("position"),
          r = b("body"),
          s = n ? r.scrollTop() : 0,
          o = n ? r.scrollLeft() : 0,
          r = i.offset(),
          r = {
        top: r.top - s,
        left: r.left - o,
        height: i.innerHeight(),
        width: i.innerWidth()
      },
          i = a.offset(),
          c = b("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({
        top: i.top - s,
        left: i.left - o,
        height: a.innerHeight(),
        width: a.innerWidth(),
        position: n ? "fixed" : "absolute"
      }).animate(r, t.duration, t.easing, function () {
        c.remove(), b.isFunction(e) && e();
      });
    }
  }), b.fx.step.clip = function (t) {
    t.clipInit || (t.start = b(t.elem).cssClip(), "string" == typeof t.end && (t.end = R(t.end, t.elem)), t.clipInit = !0), b(t.elem).cssClip({
      top: t.pos * (t.end.top - t.start.top) + t.start.top,
      right: t.pos * (t.end.right - t.start.right) + t.start.right,
      bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
      left: t.pos * (t.end.left - t.start.left) + t.start.left
    });
  }, C = {}, b.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
    C[t] = function (t) {
      return Math.pow(t, e + 2);
    };
  }), b.extend(C, {
    Sine: function (t) {
      return 1 - Math.cos(t * Math.PI / 2);
    },
    Circ: function (t) {
      return 1 - Math.sqrt(1 - t * t);
    },
    Elastic: function (t) {
      return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15);
    },
    Back: function (t) {
      return t * t * (3 * t - 2);
    },
    Bounce: function (t) {
      for (var e, a = 4; t < ((e = Math.pow(2, --a)) - 1) / 11;);

      return 1 / Math.pow(4, 3 - a) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2);
    }
  }), b.each(C, function (t, e) {
    b.easing["easeIn" + t] = e, b.easing["easeOut" + t] = function (t) {
      return 1 - e(1 - t);
    }, b.easing["easeInOut" + t] = function (t) {
      return t < .5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2;
    };
  });
  b.effects, b.effects.define("fade", "toggle", function (t, e) {
    var a = "show" === t.mode;
    b(this).css("opacity", a ? 0 : 1).animate({
      opacity: a ? 1 : 0
    }, {
      queue: !1,
      duration: t.duration,
      easing: t.easing,
      complete: e
    });
  });
});
/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/
;

(function (factory) {
  // eslint-disable-line no-extra-semi
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Global
    factory(jQuery);
  }
})(function ($) {
  /*
  *  internal
  */
  var _previousResizeWidth = -1,
      _updateTimeout = -1;
  /*
  *  _parse
  *  value parse utility function
  */


  var _parse = function (value) {
    // parse value and convert NaN to 0
    return parseFloat(value) || 0;
  };
  /*
  *  _rows
  *  utility function returns array of jQuery selections representing each row
  *  (as displayed after float wrapping applied by browser)
  */


  var _rows = function (elements) {
    var tolerance = 1,
        $elements = $(elements),
        lastTop = null,
        rows = []; // group elements by their top position

    $elements.each(function () {
      var $that = $(this),
          top = $that.offset().top - _parse($that.css('margin-top')),
          lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

      if (lastRow === null) {
        // first item on the row, so just push it
        rows.push($that);
      } else {
        // if the row top is the same, add to the row group
        if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
          rows[rows.length - 1] = lastRow.add($that);
        } else {
          // otherwise start a new row group
          rows.push($that);
        }
      } // keep track of the last row top


      lastTop = top;
    });
    return rows;
  };
  /*
  *  _parseOptions
  *  handle plugin options
  */


  var _parseOptions = function (options) {
    var opts = {
      byRow: true,
      property: 'height',
      target: null,
      remove: false
    };

    if (typeof options === 'object') {
      return $.extend(opts, options);
    }

    if (typeof options === 'boolean') {
      opts.byRow = options;
    } else if (options === 'remove') {
      opts.remove = true;
    }

    return opts;
  };
  /*
  *  matchHeight
  *  plugin definition
  */


  var matchHeight = $.fn.matchHeight = function (options) {
    var opts = _parseOptions(options); // handle remove


    if (opts.remove) {
      var that = this; // remove fixed height from all selected elements

      this.css(opts.property, ''); // remove selected elements from all groups

      $.each(matchHeight._groups, function (key, group) {
        group.elements = group.elements.not(that);
      }); // TODO: cleanup empty groups

      return this;
    }

    if (this.length <= 1 && !opts.target) {
      return this;
    } // keep track of this group so we can re-apply later on load and resize events


    matchHeight._groups.push({
      elements: this,
      options: opts
    }); // match each element's height to the tallest element in the selection


    matchHeight._apply(this, opts);

    return this;
  };
  /*
  *  plugin global options
  */


  matchHeight.version = 'master';
  matchHeight._groups = [];
  matchHeight._throttle = 80;
  matchHeight._maintainScroll = false;
  matchHeight._beforeUpdate = null;
  matchHeight._afterUpdate = null;
  matchHeight._rows = _rows;
  matchHeight._parse = _parse;
  matchHeight._parseOptions = _parseOptions;
  /*
  *  matchHeight._apply
  *  apply matchHeight to given elements
  */

  matchHeight._apply = function (elements, options) {
    var opts = _parseOptions(options),
        $elements = $(elements),
        rows = [$elements]; // take note of scroll position


    var scrollTop = $(window).scrollTop(),
        htmlHeight = $('html').outerHeight(true); // get hidden parents

    var $hiddenParents = $elements.parents().filter(':hidden'); // cache the original inline style

    $hiddenParents.each(function () {
      var $that = $(this);
      $that.data('style-cache', $that.attr('style'));
    }); // temporarily must force hidden parents visible

    $hiddenParents.css('display', 'block'); // get rows if using byRow, otherwise assume one row

    if (opts.byRow && !opts.target) {
      // must first force an arbitrary equal height so floating elements break evenly
      $elements.each(function () {
        var $that = $(this),
            display = $that.css('display'); // temporarily force a usable display value

        if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
          display = 'block';
        } // cache the original inline style


        $that.data('style-cache', $that.attr('style'));
        $that.css({
          'display': display,
          'padding-top': '0',
          'padding-bottom': '0',
          'margin-top': '0',
          'margin-bottom': '0',
          'border-top-width': '0',
          'border-bottom-width': '0',
          'height': '100px',
          'overflow': 'hidden'
        });
      }); // get the array of rows (based on element top position)

      rows = _rows($elements); // revert original inline styles

      $elements.each(function () {
        var $that = $(this);
        $that.attr('style', $that.data('style-cache') || '');
      });
    }

    $.each(rows, function (key, row) {
      var $row = $(row),
          targetHeight = 0;

      if (!opts.target) {
        // skip apply to rows with only one item
        if (opts.byRow && $row.length <= 1) {
          $row.css(opts.property, '');
          return;
        } // iterate the row and find the max height


        $row.each(function () {
          var $that = $(this),
              style = $that.attr('style'),
              display = $that.css('display'); // temporarily force a usable display value

          if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
            display = 'block';
          } // ensure we get the correct actual height (and not a previously set height value)


          var css = {
            'display': display
          };
          css[opts.property] = '';
          $that.css(css); // find the max height (including padding, but not margin)

          if ($that.outerHeight(false) > targetHeight) {
            targetHeight = $that.outerHeight(false);
          } // revert styles


          if (style) {
            $that.attr('style', style);
          } else {
            $that.css('display', '');
          }
        });
      } else {
        // if target set, use the height of the target element
        targetHeight = opts.target.outerHeight(false);
      } // iterate the row and apply the height to all elements


      $row.each(function () {
        var $that = $(this),
            verticalPadding = 0; // don't apply to a target

        if (opts.target && $that.is(opts.target)) {
          return;
        } // handle padding and border correctly (required when not using border-box)


        if ($that.css('box-sizing') !== 'border-box') {
          verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
          verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
        } // set the height (accounting for padding and border)


        $that.css(opts.property, targetHeight - verticalPadding + 'px');
      });
    }); // revert hidden parents

    $hiddenParents.each(function () {
      var $that = $(this);
      $that.attr('style', $that.data('style-cache') || null);
    }); // restore scroll position if enabled

    if (matchHeight._maintainScroll) {
      $(window).scrollTop(scrollTop / htmlHeight * $('html').outerHeight(true));
    }

    return this;
  };
  /*
  *  matchHeight._applyDataApi
  *  applies matchHeight to all elements with a data-match-height attribute
  */


  matchHeight._applyDataApi = function () {
    var groups = {}; // generate groups by their groupId set by elements using data-match-height

    $('[data-match-height], [data-mh]').each(function () {
      var $this = $(this),
          groupId = $this.attr('data-mh') || $this.attr('data-match-height');

      if (groupId in groups) {
        groups[groupId] = groups[groupId].add($this);
      } else {
        groups[groupId] = $this;
      }
    }); // apply matchHeight to each group

    $.each(groups, function () {
      this.matchHeight(true);
    });
  };
  /*
  *  matchHeight._update
  *  updates matchHeight on all current groups with their correct options
  */


  var _update = function (event) {
    if (matchHeight._beforeUpdate) {
      matchHeight._beforeUpdate(event, matchHeight._groups);
    }

    $.each(matchHeight._groups, function () {
      matchHeight._apply(this.elements, this.options);
    });

    if (matchHeight._afterUpdate) {
      matchHeight._afterUpdate(event, matchHeight._groups);
    }
  };

  matchHeight._update = function (throttle, event) {
    // prevent update if fired from a resize event
    // where the viewport width hasn't actually changed
    // fixes an event looping bug in IE8
    if (event && event.type === 'resize') {
      var windowWidth = $(window).width();

      if (windowWidth === _previousResizeWidth) {
        return;
      }

      _previousResizeWidth = windowWidth;
    } // throttle updates


    if (!throttle) {
      _update(event);
    } else if (_updateTimeout === -1) {
      _updateTimeout = setTimeout(function () {
        _update(event);

        _updateTimeout = -1;
      }, matchHeight._throttle);
    }
  };
  /*
  *  bind events
  */
  // apply on DOM ready event


  $(matchHeight._applyDataApi); // use on or bind where supported

  var on = $.fn.on ? 'on' : 'bind'; // update heights on load and resize events

  $(window)[on]('load', function (event) {
    matchHeight._update(false, event);
  }); // throttled update heights on resize events

  $(window)[on]('resize orientationchange', function (event) {
    matchHeight._update(true, event);
  });
});
+function ($) {
  'use strict'; // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';

  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.4.1';

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector !== '#' ? $(document).find(selector) : null;
    return $parent && $parent.length ? $parent : $this.parent();
  }

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = {
        relatedTarget: this
      };
      if (!$parent.hasClass('open')) return;
      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
    });
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);
    if ($this.is('.disabled, :disabled')) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');
    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.trigger('focus').attr('aria-expanded', 'true');
      $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is('.disabled, :disabled')) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.dropdown-menu' + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--; // up

    if (e.which == 40 && index < $items.length - 1) index++; // down

    if (!~index) index = 0;
    $items.eq(index).trigger('focus');
  }; // DROPDOWN PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');
      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown; // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  }; // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================


  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
}(jQuery);
(function ($) {
  jQuery(document).ready(function () {
    // desktop multilevel menu
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }

      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');
      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass("show");
      });
      return false;
    });
    ; //sticky header

    jQuery(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('#menu_area').addClass("sticky");
      } else {
        $('#menu_area').removeClass("sticky");
      }
    });
    $('#close-notice, #accept-cookie').click(function (e) {
      e.preventDefault();
      $("#cookie-notice").removeClass("slide-up");
      $("#cookie-notice").addClass("slide-down");
    }); //faq accordion

    $(document).ready(function () {
      $(".faq__accordion .faq-wrap > .accordion-heading").on("click", function (e) {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).siblings(".faq__accordion .content").slideUp(200);
        } else {
          $(".faq__accordion .faq-wrap > .accordion-heading").removeClass("active");
          $(this).addClass("active");
          $(".faq__accordion .content").slideUp(200);
          $(this).siblings(".faq__accordion .content").slideDown(200);
        }

        e.preventDefault();
      });
    });
    $('#cities-slider ul').slick({
      infinite: true,
      speed: 300,
      rows: 7,
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: false,
      arrows: true,
      autoplay: false,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          infinite: false,
          dots: false,
          arrows: true
        }
      }]
    });
    $('#nav-slider').slick({
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      autoplay: true,
      infinite: true,
      autoplaySpeed: 4000,
      responsive: [{
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    });
    $('#timeline-slider').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      autoplay: false,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          infinite: true,
          dots: false,
          arrows: true
        }
      }]
    });
    $('#reviews-slider').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      autoplay: false
    });
    $('#testimonial-slider').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      autoplay: false
    });
    $('#process-slider').slick({
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      autoplay: false
    });
    $('#cities-area .btn-prev').click(function (e) {
      $('#process-slider').slick('slickPrev');
      e.preventDefault();
    });
    $('#cities-area .btn-next').click(function (e) {
      $('#process-slider').slick('slickNext');
      e.preventDefault();
    }); // Menu

    $('.menu-btn').click(function () {
      $('.main-menu-sidebar').addClass("menu-active");
      $('.menu-overlay').addClass("active-overlay");
      $('body').addClass("body-scroll");
      $(this).toggleClass('open');
    }); // Menu

    $('.close-menu-btn').click(function () {
      $('.main-menu-sidebar').removeClass("menu-active");
      $('.menu-overlay').removeClass("active-overlay");
      $('body').removeClass("body-scroll");
    });
    $(function () {
      var menu_ul = $('.nav-links > li.has-menu  ul'),
          menu_a = $('.nav-links > li.has-menu  small');
      menu_ul.hide();
      menu_a.click(function (e) {
        e.preventDefault();

        if (!$(this).hasClass('active')) {
          menu_a.removeClass('active');
          menu_ul.filter(':visible').slideUp('normal');
          $(this).addClass('active').next().stop(true, true).slideDown('normal');
        } else {
          $(this).removeClass('active');
          $(this).next().stop(true, true).slideUp('normal');
        }
      });
    });
    $(".nav-links > li.has-menu  small ").attr("href", "javascript:;");
    var $menu = $('#menu');
    $(document).mouseup(function (e) {
      if (!$menu.is(e.target) // if the target of the click isn't the container...
      && $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
          $menu.removeClass('menu-active');
          $('.menu-overlay').removeClass("active-overlay");
        }
    }); //modal

    setTimeout(function () {
      jQuery('.modal-overlay').addClass('show');
    }, 1000);
    $('.zebra_tooltips_below').click(function (e) {
      var myEm = $(this).attr('data-my-element');
      var modal = $('.modal-overlay[data-my-element = ' + myEm + '], .modal[data-my-element = ' + myEm + ']');
      e.preventDefault();
      modal.addClass('active');
      $('html').addClass('fixed');
    });
    $('.close-modal').click(function () {
      var modal = $('.modal-overlay, .modal');
      $('html').removeClass('fixed');
      modal.removeClass('active');
    });
    $(".date-picker-input").datepicker({
      minDate: '0'
    }); // $('.selectpicker').selectpicker();

    $(document).on('click', '.scroll-down a', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100
      }, 500);
    });
    $('#reviews-area .col-lg-6').matchHeight();
  });
})(jQuery);