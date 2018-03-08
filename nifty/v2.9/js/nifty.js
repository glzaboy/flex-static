/* ========================================================================
* NIFTY ADMIN TEMPLATE V2.9
* -------------------------------------------------------------------------
* - themeOn.net -
* ========================================================================*/


/* REQUIRED PLUGINS
/* ========================================================================
/*! nanoScrollerJS - v0.8.7 - (c) 2015 James Florentino; Licensed MIT */
!function (a) {
    return "function" == typeof define && define.amd ? define(["jquery"], function (b) {
        return a(b, window, document)
    }) : "object" == typeof exports ? module.exports = a(require("jquery"), window, document) : a(jQuery, window, document)
}(function (a, b, c) {
    "use strict";
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    z = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function () {
        var a, b, c, d, e, f;
        for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e) if (c = d[a], b = d[a] + "ransform", b in F) return d[a].substr(0, d[a].length - 1);
        return !1
    }(), G = function (a) {
        return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
    }, E = G("transform"), B = E !== !1, A = function () {
        var a, b, d;
        return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
    }, C = function () {
        var a, c, d;
        return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
    }, q = function () {
        function j(d, f) {
            this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + this.options.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }

        return j.prototype.preventScrolling = function (a, b) {
            if (this.isActive) if (a.type === f) (b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault(); else if (a.type === p) {
                if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
                (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
            }
        }, j.prototype.nativeScrolling = function () {
            this.$content.css({WebkitOverflowScrolling: "touch"}), this.iOSNativeScrolling = !0, this.isActive = !0
        }, j.prototype.updateScrollValues = function () {
            var a, b;
            a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: b
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, j.prototype.setOnScrollStyles = function () {
            var a;
            B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {top: this.sliderTop}, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function (b) {
                return function () {
                    return b.scrollRAF = null, b.slider.css(a)
                }
            }(this))) : this.slider.css(a)
        }, j.prototype.createEvents = function () {
            this.events = {
                down: function (a) {
                    return function (b) {
                        return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
                    }
                }(this), drag: function (a) {
                    return function (b) {
                        return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                    }
                }(this), up: function (a) {
                    return function (b) {
                        return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
                    }
                }(this), resize: function (a) {
                    return function (b) {
                        a.reset()
                    }
                }(this), panedown: function (a) {
                    return function (b) {
                        return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                    }
                }(this), scroll: function (a) {
                    return function (b) {
                        a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                    }
                }(this), wheel: function (a) {
                    return function (b) {
                        var c;
                        if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                    }
                }(this), enter: function (a) {
                    return function (b) {
                        var c;
                        if (a.isBeingDragged) return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
                    }
                }(this)
            }
        }, j.prototype.addEvents = function () {
            var a;
            this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.removeEvents = function () {
            var a;
            a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.generate = function () {
            var a, c, d, f, g, h, i;
            return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
                right: -14,
                paddingRight: +d + 14
            }) : e && (c = {right: -e}, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
        }, j.prototype.restore = function () {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, j.prototype.reset = function () {
            var a, b, c, f, g, h, i, j, k, l, m, n;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({height: this.$content.height()}), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * i), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                right: "",
                marginRight: m
            })), this)
        }, j.prototype.scroll = function () {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        }, j.prototype.scrollBottom = function (a) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTop = function (a) {
            return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTo = function (a) {
            return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
        }, j.prototype.stop = function () {
            return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, j.prototype.destroy = function () {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({right: ""})), this
        }, j.prototype.flash = function () {
            return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function (a) {
                return function () {
                    a.pane.removeClass("flashed")
                }
            }(this), this.options.flashDelay), this) : void 0
        }, j
    }(), a.fn.nanoScroller = function (b) {
        return this.each(function () {
            var c, d;
            if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
                if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
                if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
                if (b.scrollTo) return d.scrollTo(b.scrollTo);
                if ("bottom" === b.scroll) return d.scrollBottom(0);
                if ("top" === b.scroll) return d.scrollTop(0);
                if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
                if (b.stop) return d.stop();
                if (b.destroy) return d.destroy();
                if (b.flash) return d.flash()
            }
            return d.reset()
        })
    }, a.fn.nanoScroller.Constructor = q
});


/* REQUIRED PLUGINS
/*! ========================================================================
/*
 * metismenu - v2.7.4
 * A jQuery menu plugin
 * https://github.com/onokumus/metismenu#readme
 *
 * Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
 * Under MIT License
 */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('jquery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.jQuery);
        global.metisMenu = mod.exports;
    }
})(this, function (_jquery) {
    'use strict';

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Util = function ($) {
        var transition = false;

        function getSpecialTransitionEndEvent() {
            return {
                bindType: transition.end,
                delegateType: transition.end,
                handle: function handle(event) {
                    if ($(event.target).is(this)) {
                        return event.handleObj.handler.apply(this, arguments);
                    }
                    return undefined;
                }
            };
        }

        function transitionEndTest() {
            if (typeof window !== 'undefined' && window.QUnit) {
                return false;
            }

            return {
                end: 'transitionend'
            };
        }

        function transitionEndEmulator(duration) {
            var _this2 = this;

            var called = false;

            $(this).one(Util.TRANSITION_END, function () {
                called = true;
            });

            setTimeout(function () {
                if (!called) {
                    Util.triggerTransitionEnd(_this2);
                }
            }, duration);

            return this;
        }

        function setTransitionEndSupport() {
            transition = transitionEndTest();
            $.fn.mmEmulateTransitionEnd = transitionEndEmulator;

            if (Util.supportsTransitionEnd()) {
                $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
            }
        }

        var Util = {
            TRANSITION_END: 'mmTransitionEnd',

            triggerTransitionEnd: function triggerTransitionEnd(element) {
                $(element).trigger(transition.end);
            },
            supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(transition);
            }
        };

        setTransitionEndSupport();

        return Util;
    }(_jquery2.default);

    var MetisMenu = function ($) {

        var NAME = 'metisMenu';
        var DATA_KEY = 'metisMenu';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 350;

        var Default = {
            toggle: true,
            preventDefault: true,
            activeClass: 'active',
            collapseClass: 'collapse',
            collapseInClass: 'in',
            collapsingClass: 'collapsing',
            triggerElement: 'a',
            parentTrigger: 'li',
            subMenu: 'ul'
        };

        var Event = {
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var MetisMenu = function () {
            function MetisMenu(element, config) {
                _classCallCheck(this, MetisMenu);

                this._element = element;
                this._config = this._getConfig(config);
                this._transitioning = null;

                this.init();
            }

            _createClass(MetisMenu, [{
                key: 'init',
                value: function init() {
                    var self = this;
                    $(this._element).find(this._config.parentTrigger + '.' + this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr('aria-expanded', true).addClass(this._config.collapseClass + ' ' + this._config.collapseInClass);

                    $(this._element).find(this._config.parentTrigger).not('.' + this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr('aria-expanded', false).addClass(this._config.collapseClass);

                    $(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).on(Event.CLICK_DATA_API, function (e) {
                        var _this = $(this);
                        var _parent = _this.parent(self._config.parentTrigger);
                        var _siblings = _parent.siblings(self._config.parentTrigger).children(self._config.triggerElement);
                        var _list = _parent.children(self._config.subMenu);
                        if (self._config.preventDefault) {
                            e.preventDefault();
                        }
                        if (_this.attr('aria-disabled') === 'true') {
                            return;
                        }
                        if (_parent.hasClass(self._config.activeClass)) {
                            _this.attr('aria-expanded', false);
                            self._hide(_list);
                        } else {
                            self._show(_list);
                            _this.attr('aria-expanded', true);
                            if (self._config.toggle) {
                                _siblings.attr('aria-expanded', false);
                            }
                        }

                        if (self._config.onTransitionStart) {
                            self._config.onTransitionStart(e);
                        }
                    });
                }
            }, {
                key: '_show',
                value: function _show(element) {
                    if (this._transitioning || $(element).hasClass(this._config.collapsingClass)) {
                        return;
                    }
                    var _this = this;
                    var _el = $(element);

                    var startEvent = $.Event(Event.SHOW);
                    _el.trigger(startEvent);

                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    _el.parent(this._config.parentTrigger).addClass(this._config.activeClass);

                    if (this._config.toggle) {
                        this._hide(_el.parent(this._config.parentTrigger).siblings().children(this._config.subMenu + '.' + this._config.collapseInClass).attr('aria-expanded', false));
                    }

                    _el.removeClass(this._config.collapseClass).addClass(this._config.collapsingClass).height(0);

                    this.setTransitioning(true);

                    var complete = function complete() {
                        // check if disposed
                        if (!_this._config || !_this._element) {
                            return;
                        }
                        _el.removeClass(_this._config.collapsingClass).addClass(_this._config.collapseClass + ' ' + _this._config.collapseInClass).height('').attr('aria-expanded', true);

                        _this.setTransitioning(false);

                        _el.trigger(Event.SHOWN);
                    };

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    _el.height(_el[0].scrollHeight).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
                }
            }, {
                key: '_hide',
                value: function _hide(element) {

                    if (this._transitioning || !$(element).hasClass(this._config.collapseInClass)) {
                        return;
                    }
                    var _this = this;
                    var _el = $(element);

                    var startEvent = $.Event(Event.HIDE);
                    _el.trigger(startEvent);

                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    _el.parent(this._config.parentTrigger).removeClass(this._config.activeClass);
                    _el.height(_el.height())[0].offsetHeight;

                    _el.addClass(this._config.collapsingClass).removeClass(this._config.collapseClass).removeClass(this._config.collapseInClass);

                    this.setTransitioning(true);

                    var complete = function complete() {
                        // check if disposed
                        if (!_this._config || !_this._element) {
                            return;
                        }
                        if (_this._transitioning && _this._config.onTransitionEnd) {
                            _this._config.onTransitionEnd();
                        }

                        _this.setTransitioning(false);
                        _el.trigger(Event.HIDDEN);

                        _el.removeClass(_this._config.collapsingClass).addClass(_this._config.collapseClass).attr('aria-expanded', false);
                    };

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    _el.height() == 0 || _el.css('display') == 'none' ? complete() : _el.height(0).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
                }
            }, {
                key: 'setTransitioning',
                value: function setTransitioning(isTransitioning) {
                    this._transitioning = isTransitioning;
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);

                    $(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).off('click');

                    this._transitioning = null;
                    this._config = null;
                    this._element = null;
                }
            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, Default, config);
                    return config;
                }
            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data(DATA_KEY);
                        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

                        if (!data && /dispose/.test(config)) {
                            this.dispose();
                        }

                        if (!data) {
                            data = new MetisMenu(this, _config);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }]);

            return MetisMenu;
        }();

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = MetisMenu._jQueryInterface;
        $.fn[NAME].Constructor = MetisMenu;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return MetisMenu._jQueryInterface;
        };
        return MetisMenu;
    }(_jquery2.default);
});

/*! jQuery resizeEnd Event v1.0.1 - Copyright (c) 2013 Giuseppe Gurgone - License http://git.io/iRQs3g */
!function ($, e) {
    var t = {};
    t.eventName = "resizeEnd", t.delay = 250, t.poll = function () {
        var n = $(this), a = n.data(t.eventName);
        a.timeoutId && e.clearTimeout(a.timeoutId), a.timeoutId = e.setTimeout(function () {
            n.trigger(t.eventName)
        }, t.delay)
    }, $.event.special[t.eventName] = {
        setup: function () {
            var e = $(this);
            e.data(t.eventName, {}), e.on("resize", t.poll)
        }, teardown: function () {
            var n = $(this), a = n.data(t.eventName);
            a.timeoutId && e.clearTimeout(a.timeoutId), n.removeData(t.eventName), n.off("resize", t.poll)
        }
    }, $.fn[t.eventName] = function (e, n) {
        return arguments.length > 0 ? this.on(t.eventName, null, e, n) : this.trigger(t.eventName)
    }
}(jQuery, this);
!function (n) {
    "use strict";
    n(document).ready(function () {
        n(document).trigger("nifty.ready")
    }), n(document).on("nifty.ready", function () {
        var a = function (n, a, e, t) {
            var i = "margin-top", o = {};
            return n && (i = "margin-bottom"), o[i] = a + "px", o.opacity = e, t && (o.display = "block"), o
        };
        n(".dropdown").on("show.bs.dropdown", function () {
            var e = n(this).find(".dropdown-menu"), t = n(this).hasClass("dropup"),
                i = parseInt(e.css(t ? "margin-bottom" : "margin-top"));
            e.css(a(t, i - 15, 0)).animate(a(t, i, 1), 250, function () {
                n(this).css({"margin-top": "", "margin-bottom": ""})
            })
        }).on("hide.bs.dropdown", function () {
            var e = n(this).find(".dropdown-menu"), t = n(this).hasClass("dropup"),
                i = parseInt(e.css(t ? "margin-bottom" : "margin-top"));
            e.css(a(t, i, 1, !0)).animate(a(t, i + 15, 0), 250, function () {
                n(this).css({"margin-top": "", "margin-bottom": "", display: "", opacity: ""})
            })
        });
        var e = n(".add-tooltip");
        e.length && e.tooltip();
        var t = n(".add-popover");
        t.length && t.popover(), n("#navbar-container .navbar-top-links").on("shown.bs.dropdown", ".dropdown", function () {
            n(this).find(".nano").nanoScroller({preventPageScrolling: !0})
        });
        var i = n(".nano");
        i.length && i.nanoScroller({preventPageScrolling: !0}), n.niftyNav("bind"), n.niftyAside("bind"), n(document).on("click", "#nav-searchbox", function (a) {
            n(a.target).hasClass("search-container") && n(this).collapse("hide")
        }).on("click", "#mainnav-container", function (a) {
            n(a.target).is("#mainnav-container") && n.niftyNav("colExpToggle")
        })
    })
}(jQuery), !function (n) {
    "use strict";
    var a = null, e = function (n) {
        var a = n.find(".mega-dropdown-toggle"), e = n.find(".mega-dropdown-menu");
        a.on("click", function (a) {
            a.preventDefault(), n.toggleClass("open"), n.hasClass("open") ? t(e) : i(e)
        })
    }, t = function (a) {
        a.css({"margin-top": "-15px", opacity: 0}).animate({"margin-top": "0px", opacity: 1}, 250, function () {
            n(this).css({"margin-top": ""})
        })
    }, i = function (a) {
        a.css({"margin-top": "0px", opacity: 1, display: "block"}).animate({
            "margin-top": "15px",
            opacity: 0
        }, 250, function () {
            n(this).css({"margin-top": "", display: ""})
        })
    }, o = {
        toggle: function () {
            return this.toggleClass("open"), el.hasClass("open") ? t(this.find(".mega-dropdown-menu")) : i(this.find(".mega-dropdown-menu")), null
        }, show: function () {
            return this.addClass("open"), t(this.find(".mega-dropdown-menu")), null
        }, hide: function () {
            return this.removeClass("open"), i(this.find(".mega-dropdown-menu")), null
        }
    };
    n.fn.niftyMega = function (a) {
        var t = !1;
        return this.each(function () {
            o[a] ? t = o[a].apply(n(this), Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a || e(n(this))
        }), t
    }, n(document).on("nifty.ready", function () {
        a = n(".mega-dropdown"), a.length && (a.niftyMega(), n("html").on("click", function (e) {
            !n(e.target).closest(".mega-dropdown").length && a.hasClass("open") && (a.removeClass("open"), i(a.find(".mega-dropdown-menu")))
        }))
    })
}(jQuery), !function (n) {
    "use strict";
    n(document).on("nifty.ready", function () {
        var a = {
            closeBtn: n('[data-dismiss="panel"], [data-panel="dismiss"]'),
            minMaxBtn: n('[data-panel="minmax"]'),
            fullScreen: n('[data-panel="fullscreen"]')
        };
        a.closeBtn.length && a.closeBtn.one("click", function (a) {
            a.preventDefault();
            var e = n(this).parents(".panel");
            e.addClass("remove").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (a) {
                "opacity" == a.originalEvent.propertyName && (e.remove(), n("body").removeClass("panel-fullscreen"))
            })
        }), a.minMaxBtn.length && a.minMaxBtn.each(function () {
            var a = n(this).parents(".panel").find(".collapse");
            a.prop("id") || a.prop("id", "panel-collapse-" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1)), n(this).attr({
                "data-target": "#" + a.prop("id"),
                "data-toggle": "collapse"
            }), a.hasClass("in") ? n(this).attr("aria-expanded", "true") : n(this).attr("aria-expanded", "false")
        }), a.fullScreen.length && a.fullScreen.on("click", function () {
            var a = n(this).parents(".panel");
            a.toggleClass("fullscreen"), n("body").toggleClass("panel-fullscreen")
        })
    })
}(jQuery), !function (n) {
    "use strict";
    n(document).one("nifty.ready", function () {
        var a = n(".scroll-top"), e = n(window), t = function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }();
        if (a.length && !t) {
            var i = !1, o = 250, s = function () {
                e.scrollTop() > o && !i ? (a.addClass("in").stop(!0, !0).css({animation: "none"}).show(0).css({animation: "jellyIn .8s"}), i = !0) : e.scrollTop() < o && i && (a.removeClass("in"), i = !1)
            };
            s(), e.scroll(s), a.on("click", function (a) {
                a.preventDefault(), n("body, html").animate({scrollTop: 0}, 500)
            })
        } else a = null, e = null;
        t = null
    })
}(jQuery), !function (n) {
    "use strict";
    var a = {displayIcon: !0, iconColor: "text-main", iconClass: "fa fa-refresh fa-spin fa-2x", title: "", desc: ""},
        e = function () {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }, t = {
            show: function (a) {
                var t = n(a.attr("data-target")), i = "nifty-overlay-" + e() + e() + "-" + e(),
                    o = n('<div id="' + i + '" class="panel-overlay"></div>');
                return a.prop("disabled", !0).data("niftyOverlay", i), t.addClass("panel-overlay-wrap"), o.appendTo(t).html(a.data("overlayTemplate")), null
            }, hide: function (a) {
                var e = n(a.attr("data-target")), t = n("#" + a.data("niftyOverlay"));
                return t.length && (a.prop("disabled", !1), e.removeClass("panel-overlay-wrap"), t.hide().remove()), null
            }
        }, i = function (e, t) {
            if (e.data("overlayTemplate")) return null;
            var i = n.extend({}, a, t),
                o = i.displayIcon ? '<span class="panel-overlay-icon ' + i.iconColor + '"><i class="' + i.iconClass + '"></i></span>' : "";
            return e.data("overlayTemplate", '<div class="panel-overlay-content pad-all unselectable">' + o + '<h4 class="panel-overlay-title">' + i.title + "</h4><p>" + i.desc + "</p></div>"), null
        };
    n.fn.niftyOverlay = function (a) {
        return t[a] ? t[a](this) : "object" != typeof a && a ? null : this.each(function () {
            i(n(this), a)
        })
    }
}(jQuery), !function (n) {
    "use strict";
    var a, e, t, i, o = {}, s = !1, l = function () {
        var n = document.body || document.documentElement, a = n.style,
            e = void 0 !== a.transition || void 0 !== a.WebkitTransition;
        return e
    }();
    n.niftyNoty = function (r) {
        var c, d = {
            type: "primary",
            icon: "",
            title: "",
            message: "",
            closeBtn: !0,
            container: "page",
            floating: {position: "top-right", animationIn: "jellyIn", animationOut: "fadeOut"},
            html: null,
            focus: !0,
            timer: 0,
            onShow: function () {
            },
            onShown: function () {
            },
            onHide: function () {
            },
            onHidden: function () {
            }
        }, f = n.extend({}, d, r), u = n('<div class="alert-wrap"></div>'), v = function () {
            var n = "";
            return r && r.icon && (n = '<div class="media-left alert-icon"><i class="' + f.icon + '"></i></div>'), n
        }, m = function () {
            var n = f.closeBtn ? '<button class="close" type="button"><i class="pci-cross pci-circle"></i></button>' : "",
                a = '<div class="alert alert-' + f.type + '" role="alert">' + n + '<div class="media">';
            return f.html ? a + f.html + "</div></div>" : a + v() + '<div class="media-body"><h4 class="alert-title">' + f.title + '</h4><p class="alert-message">' + f.message + "</p></div></div>"
        }(), p = function () {
            return f.onHide(), "floating" === f.container && f.floating.animationOut && (u.removeClass(f.floating.animationIn).addClass(f.floating.animationOut), l || (f.onHidden(), u.remove())), u.removeClass("in").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (n) {
                "max-height" == n.originalEvent.propertyName && (f.onHidden(), u.remove())
            }), clearInterval(c), null
        }, g = function (a) {
            n("body, html").animate({scrollTop: a}, 300, function () {
                u.addClass("in")
            })
        };
        (function () {
            if (f.onShow(), "page" === f.container) a || (a = n('<div id="page-alert"></div>'), i && i.length || (i = n("#content-container")), i.prepend(a)), e = a, f.focus && g(0); else if ("floating" === f.container) o[f.floating.position] || (o[f.floating.position] = n('<div id="floating-' + f.floating.position + '" class="floating-container"></div>'), t && i.length || (t = n("#container")), t.append(o[f.floating.position])), e = o[f.floating.position], f.floating.animationIn && u.addClass("in animated " + f.floating.animationIn), f.focus = !1; else {
                var l = n(f.container), r = l.children(".panel-alert"), c = l.children(".panel-heading");
                if (!l.length) return s = !1, !1;
                r.length ? e = r : (e = n('<div class="panel-alert"></div>'), c.length ? c.after(e) : l.prepend(e)), f.focus && g(l.offset().top - 30)
            }
            return s = !0, !1
        })();
        if (s) {
            if (e.append(u.html(m)), u.find('[data-dismiss="noty"]').one("click", p), f.closeBtn && u.find(".close").one("click", p), f.timer > 0 && (c = setInterval(p, f.timer)), !f.focus) var h = setInterval(function () {
                u.addClass("in"), clearInterval(h)
            }, 200);
            u.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (n) {
                "max-height" != n.originalEvent.propertyName && "animationend" != n.type || !s || (f.onShown(), s = !1)
            })
        }
    }
}(jQuery), !function (n) {
    "use strict";
    var a = {dynamicMode: !0, selectedOn: null, onChange: null}, e = function (e, t) {
        var i = n.extend({}, a, t), o = e.find(".lang-selected"),
            s = o.parent(".lang-selector").siblings(".dropdown-menu"), l = s.find("a"),
            r = l.filter(".active").find(".lang-id").text(), c = l.filter(".active").find(".lang-name").text(),
            d = function (n) {
                l.removeClass("active"), n.addClass("active"), o.html(n.html()), r = n.find(".lang-id").text(), c = n.find(".lang-name").text(), e.trigger("onChange", [{
                    id: r,
                    name: c
                }]), "function" == typeof i.onChange && i.onChange.call(this, {id: r, name: c})
            };
        l.on("click", function (a) {
            i.dynamicMode && (a.preventDefault(), a.stopPropagation()), e.dropdown("toggle"), d(n(this))
        }), i.selectedOn && d(n(i.selectedOn))
    }, t = {
        getSelectedID: function () {
            return n(this).find(".lang-id").text()
        }, getSelectedName: function () {
            return n(this).find(".lang-name").text()
        }, getSelected: function () {
            var a = n(this);
            return {id: a.find(".lang-id").text(), name: a.find(".lang-name").text()}
        }, setDisable: function () {
            return n(this).addClass("disabled"), null
        }, setEnable: function () {
            return n(this).removeClass("disabled"), null
        }
    };
    n.fn.niftyLanguage = function (a) {
        var i = !1;
        return this.each(function () {
            t[a] ? i = t[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a || e(n(this), a)
        }), i
    }
}(jQuery), !function (n) {
    "use strict";
    var a, e = function (a) {
        if (!a.data("nifty-check")) {
            a.data("nifty-check", !0), a.text().trim().length ? a.addClass("form-text") : a.removeClass("form-text");
            var e = a.find("input")[0], t = e.name, i = function () {
                return "radio" == e.type && t ? n(".form-radio").not(a).find("input").filter('input[name="' + t + '"]').parent() : !1
            }(), o = function () {
                "radio" == e.type && i.length && i.each(function () {
                    var a = n(this);
                    a.hasClass("active") && a.trigger("nifty.ch.unchecked"), a.removeClass("active")
                }), e.checked ? a.addClass("active").trigger("nifty.ch.checked") : a.removeClass("active").trigger("nifty.ch.unchecked")
            };
            e.checked ? a.addClass("active") : a.removeClass("active"), n(e).on("change", o)
        }
    }, t = {
        isChecked: function () {
            return this[0].checked
        }, toggle: function () {
            return this[0].checked = !this[0].checked, this.trigger("change"), null
        }, toggleOn: function () {
            return this[0].checked || (this[0].checked = !0, this.trigger("change")), null
        }, toggleOff: function () {
            return this[0].checked && "checkbox" == this[0].type && (this[0].checked = !1, this.trigger("change")), null
        }
    }, i = function () {
        a = n(".form-checkbox, .form-radio"), a.length && a.niftyCheck()
    };
    n.fn.niftyCheck = function (a) {
        var i = !1;
        return this.each(function () {
            t[a] ? i = t[a].apply(n(this).find("input"), Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a || e(n(this))
        }), i
    }, n(document).on("nifty.ready", i).on("change", ".form-checkbox, .form-radio", i).on("change", ".btn-file :file", function () {
        var a = n(this), e = a.get(0).files ? a.get(0).files.length : 1,
            t = a.val().replace(/\\/g, "/").replace(/.*\//, ""), i = function () {
                try {
                    return a[0].files[0].size
                } catch (n) {
                    return "Nan"
                }
            }(), o = function () {
                if ("Nan" == i) return "Unknown";
                var n = Math.floor(Math.log(i) / Math.log(1024));
                return 1 * (i / Math.pow(1024, n)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][n]
            }();
        a.trigger("fileselect", [e, t, o])
    })
}(jQuery), !function (n) {
    n(document).on("nifty.ready", function () {
        var a = n("#mainnav-shortcut");
        a.length ? a.find("li").each(function () {
            var a = n(this);
            a.popover({
                animation: !1,
                trigger: "hover",
                placement: "bottom",
                container: "#mainnav-container",
                viewport: "#mainnav-container",
                template: '<div class="popover mainnav-shortcut"><div class="arrow"></div><div class="popover-content"></div>'
            })
        }) : a = null
    })
}(jQuery), !function (n) {
    "use strict";
    var a = null, e = null, t = null, i = null, o = null, s = null, l = null, r = !1, c = !1, d = null, f = null,
        u = n(window), v = !1, m = function () {
            if (c) return !0;
            var a, t = n('#mainnav-menu > li > a, #mainnav-menu-wrap .mainnav-widget a[data-toggle="menu-widget"]');
            o.metisMenu({toggle: !0}).metisMenu("dispose").find(".collapse").filter(function () {
                return n(this).find(".collapse").length > 0
            }).metisMenu({toggle: !0}), t.each(function () {
                var o = n(this), s = o.children(".menu-title"), l = o.siblings(".collapse"), r = n(o.attr("data-target")),
                    c = r.length ? r.parent() : null, d = null, f = null, u = null, v = null,
                    m = (o.outerHeight() - o.height() / 4, function () {
                        return r.length && o.on("click", function (n) {
                            n.preventDefault()
                        }), l.length ? (o.on("click", function (n) {
                            n.preventDefault()
                        }).parent("li").removeClass("active"), !0) : !1
                    }()), p = null, g = function (n) {
                        clearInterval(p), p = setInterval(function () {
                            n.nanoScroller({preventPageScrolling: !0, alwaysVisible: !0}), clearInterval(p)
                        }, 100)
                    };
                n("#mainnav-menu-wrap > .nano").on("update", function () {
                    o.removeClass("hover").popover("hide")
                }), o.popover({
                    animation: !1,
                    trigger: "manual",
                    container: "#mainnav",
                    viewport: o,
                    html: !0,
                    title: function () {
                        return m ? s.html() : null
                    },
                    content: function () {
                        var a;
                        return m ? (a = n('<div class="sub-menu"></div>'), l.addClass("pop-in").wrap('<div class="nano-content"></div>').parent().appendTo(a)) : r.length ? (a = n('<div class="sidebar-widget-popover"></div>'), r.wrap('<div class="nano-content"></div>').parent().appendTo(a)) : a = '<span class="single-content">' + s.html() + "</span>", a
                    },
                    template: '<div class="popover menu-popover"><h4 class="popover-title"></h4><div class="popover-content"></div></div>'
                }).on("show.bs.popover", function () {
                    if (!d) {
                        if (d = o.data("bs.popover").tip(), f = d.find(".popover-title"), u = d.children(".popover-content"), !m && 0 == r.length) return;
                        v = u.children(".sub-menu")
                    }
                    !m && 0 == r.length
                }).on("shown.bs.popover", function () {
                    if (!m && 0 == r.length) {
                        var a = 0 - .5 * o.outerHeight();
                        return void u.css({"margin-top": a + "px", width: "auto"})
                    }
                    var t = parseInt(d.css("top")), s = o.outerHeight(), l = function () {
                        return e.hasClass("mainnav-fixed") ? n(window).outerHeight() - t - s : n(document).height() - t - s
                    }(), c = u.find(".nano-content").children().css("height", "auto").outerHeight();
                    u.find(".nano-content").children().css("height", ""), t > l ? (f.length && !f.is(":visible") && (s = Math.round(0 - .5 * s)), t -= 5, u.css({
                        top: "",
                        bottom: s + "px",
                        height: t
                    }).children().addClass("nano").css({width: "100%"}).nanoScroller({preventPageScrolling: !0}), g(u.find(".nano"))) : (!e.hasClass("navbar-fixed") && i.hasClass("affix-top") && (l -= 50), c > l ? ((e.hasClass("navbar-fixed") || i.hasClass("affix-top")) && (l -= s + 5), l -= 5, u.css({
                        top: s + "px",
                        bottom: "",
                        height: l
                    }).children().addClass("nano").css({width: "100%"}).nanoScroller({preventPageScrolling: !0}), g(u.find(".nano"))) : (f.length && !f.is(":visible") && (s = Math.round(0 - .5 * s)), u.css({
                        top: s + "px",
                        bottom: "",
                        height: "auto"
                    }))), f.length && f.css("height", o.outerHeight()), u.on("click", function () {
                        u.find(".nano-pane").hide(), g(u.find(".nano"))
                    })
                }).on("hidden.bs.popover", function () {
                    o.removeClass("hover"), m ? l.removeAttr("style").appendTo(o.parent()) : r.length && r.appendTo(c), clearInterval(a)
                }).on("click", function () {
                    e.hasClass("mainnav-sm") && (t.popover("hide"), o.addClass("hover").popover("show"))
                }).hover(function () {
                    t.popover("hide"), o.addClass("hover").popover("show").one("hidden.bs.popover", function () {
                        o.removeClass("hover"), m ? l.removeAttr("style").appendTo(o.parent()) : r.length && r.appendTo(c), clearInterval(a)
                    })
                }, function () {
                    clearInterval(a), a = setInterval(function () {
                        d && (d.one("mouseleave", function () {
                            o.removeClass("hover").popover("hide")
                        }), d.is(":hover") || o.removeClass("hover").popover("hide")), clearInterval(a)
                    }, 100)
                })
            }), c = !0
        }, p = function () {
            a.popover("destroy").unbind("mouseenter mouseleave"), o.metisMenu(), c = !1
        }, g = function () {
            var a, t = e.width();
            a = 740 >= t ? "xs" : t > 740 && 992 > t ? "sm" : t >= 992 && 1200 >= t ? "md" : "lg", f != a && (f = a, d = a, "sm" == d && e.hasClass("mainnav-lg") ? (e.addClass("lg-mainnav-lg"), n.niftyNav("collapse")) : "xs" == d && e.hasClass("mainnav-lg") ? e.removeClass("mainnav-sm mainnav-out mainnav-lg").addClass("mainnav-sm lg-mainnav-lg") : "md" != d && "lg" != d || !e.hasClass("lg-mainnav-lg") || (e.removeClass("lg-mainnav-lg"), n.niftyNav("expand")))
        }, h = function () {
            if (!v) try {
                i.niftyAffix("update")
            } catch (n) {
                v = !0
            }
        }, C = function () {
            h(), g();
            var a = n("#mainnav-menu").find(".collapse");
            return a.length && a.each(function () {
                var a = n(this);
                a.removeClass("pop-in"), a.hasClass("in") ? a.parent("li").addClass("active") : a.parent("li").removeClass("active")
            }), "collapse" == r || e.hasClass("mainnav-sm") ? (e.removeClass("mainnav-in mainnav-out mainnav-lg"), c || m()) : c && p(), s = n("#mainnav").height(), r = !1, null
        }, y = {
            revealToggle: function () {
                e.hasClass("reveal") || e.addClass("reveal"), e.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"), c && p()
            }, revealIn: function () {
                e.hasClass("reveal") || e.addClass("reveal"), e.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"), c && p()
            }, revealOut: function () {
                e.hasClass("reveal") || e.addClass("reveal"), e.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"), c && p()
            }, slideToggle: function () {
                e.hasClass("slide") || e.addClass("slide"), e.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"), c && p()
            }, slideIn: function () {
                e.hasClass("slide") || e.addClass("slide"), e.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"), c && p()
            }, slideOut: function () {
                e.hasClass("slide") || e.addClass("slide"), e.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"), c && p()
            }, pushToggle: function () {
                e.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"), e.hasClass("mainnav-in mainnav-out") && e.removeClass("mainnav-in"), c && p()
            }, pushIn: function () {
                e.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"), c && p()
            }, pushOut: function () {
                e.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"), c && p()
            }, colExpToggle: function () {
                return e.hasClass("mainnav-lg mainnav-sm") && e.removeClass("mainnav-lg"), e.toggleClass("mainnav-lg mainnav-sm").removeClass("mainnav-in mainnav-out"), u.trigger("resize")
            }, collapse: function () {
                return e.addClass("mainnav-sm").removeClass("mainnav-lg mainnav-in mainnav-out"), r = "collapse", u.trigger("resize")
            }, expand: function () {
                return e.removeClass("mainnav-sm mainnav-in mainnav-out").addClass("mainnav-lg"), u.trigger("resize")
            }, togglePosition: function () {
                e.toggleClass("mainnav-fixed"), h()
            }, fixedPosition: function () {
                e.addClass("mainnav-fixed"), l.nanoScroller({preventPageScrolling: !0}), h()
            }, staticPosition: function () {
                e.removeClass("mainnav-fixed"), l.nanoScroller({preventPageScrolling: !1}), h()
            }, update: C, refresh: C, getScreenSize: function () {
                return f
            }, bind: function () {
                if (o = n("#mainnav-menu"), 0 == o.length) return !1;
                a = n('#mainnav-menu > li > a, #mainnav-menu-wrap .mainnav-widget a[data-toggle="menu-widget"]'), e = n("#container"), t = e.children(".boxed"), i = n("#mainnav-container"), s = n("#mainnav").height();
                var r = null;
                i.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (a) {
                    (r || a.target === i[0]) && (clearInterval(r), r = setInterval(function () {
                        n(window).trigger("resize"), clearInterval(r), r = null
                    }, 300))
                });
                var c = n(".mainnav-toggle");
                c.length && c.on("click", function (a) {
                    a.preventDefault(), a.stopPropagation(), c.hasClass("push") ? n.niftyNav("pushToggle") : c.hasClass("slide") ? n.niftyNav("slideToggle") : c.hasClass("reveal") ? n.niftyNav("revealToggle") : n.niftyNav("colExpToggle")
                });
                try {
                    o.metisMenu({toggle: !0})
                } catch (d) {
                    console.error(d.message)
                }
                try {
                    l = n("#mainnav-menu-wrap > .nano"), l.length && l.nanoScroller({preventPageScrolling: !!e.hasClass("mainnav-fixed")})
                } catch (d) {
                    console.error(d.message)
                }
                n(window).on("resizeEnd", C).trigger("resize")
            }
        };
    n.niftyNav = function (n, a) {
        if (y[n]) {
            "colExpToggle" != n && "expand" != n && "collapse" != n || ("xs" == d && "collapse" == n ? n = "pushOut" : "xs" != d && "sm" != d || "colExpToggle" != n && "expand" != n || !e.hasClass("mainnav-sm") || (n = "pushIn"));
            var t = y[n].apply(this, Array.prototype.slice.call(arguments, 1));
            if ("bind" != n && C(), a) return a();
            if (t) return t
        }
        return null
    }, n.fn.isOnScreen = function () {
        var n = {top: u.scrollTop(), left: u.scrollLeft()};
        n.right = n.left + u.width(), n.bottom = n.top + u.height();
        var a = this.offset();
        return a.right = a.left + this.outerWidth(), a.bottom = a.top + this.outerHeight(), !(n.right < a.left || n.left > a.right || n.bottom < a.bottom || n.top > a.top)
    }
}(jQuery), !function (n) {
    "use strict";
    var a, e = null, t = n(window), i = {
        toggleHideShow: function () {
            a.toggleClass("aside-in"), t.trigger("resize"), a.hasClass("aside-in") && o()
        }, show: function () {
            a.addClass("aside-in"), t.trigger("resize"), o()
        }, hide: function () {
            a.removeClass("aside-in"), t.trigger("resize")
        }, toggleAlign: function () {
            a.toggleClass("aside-left"), l()
        }, alignLeft: function () {
            a.addClass("aside-left"), l()
        }, alignRight: function () {
            a.removeClass("aside-left"), l()
        }, togglePosition: function () {
            a.toggleClass("aside-fixed"), l()
        }, fixedPosition: function () {
            a.addClass("aside-fixed"), l()
        }, staticPosition: function () {
            a.removeClass("aside-fixed"), l()
        }, toggleTheme: function () {
            a.toggleClass("aside-bright")
        }, brightTheme: function () {
            a.addClass("aside-bright")
        }, darkTheme: function () {
            a.removeClass("aside-bright")
        }, update: function () {
            l()
        }, bind: function () {
            r()
        }
    }, o = function () {
        var e = a.width();
        a.hasClass("mainnav-in") && e > 740 && (e > 740 && 992 > e ? n.niftyNav("collapse") : a.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"))
    }, s = n("#container").children(".boxed"), l = function () {
        try {
            e.niftyAffix("update")
        } catch (n) {
        }
        var t = {};
        t = a.hasClass("boxed-layout") && a.hasClass("aside-fixed") && s.length ? a.hasClass("aside-left") ? {
            "-ms-transform": "translateX(" + s.offset().left + "px)",
            "-webkit-transform": "translateX(" + s.offset().left + "px)",
            transform: "translateX(" + s.offset().left + "px)"
        } : {
            "-ms-transform": "translateX(" + (0 - s.offset().left) + "px)",
            "-webkit-transform": "translateX(" + (0 - s.offset().left) + "px)",
            transform: "translateX(" + (0 - s.offset().left) + "px)"
        } : {"-ms-transform": "", "-webkit-transform": "", transform: "", right: ""}, e.css(t)
    }, r = function () {
        if (e = n("#aside-container"), e.length) {
            a = n("#container"), t.on("resizeEnd", l), e.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (n) {
                n.target == e[0] && t.trigger("resize")
            }), e.find(".nano").nanoScroller({preventPageScrolling: !!a.hasClass("aside-fixed")});
            var i = n(".aside-toggle");
            i.length && i.on("click", function (a) {
                a.preventDefault(), a.stopPropagation(), n(".dropdown.open").removeClass("open"), n.niftyAside("toggleHideShow"), n(this).parent("li").toggleClass("open")
            })
        }
    };
    n.niftyAside = function (n, a) {
        return i[n] && (i[n].apply(this, Array.prototype.slice.call(arguments, 1)), a) ? a() : null
    }
}(jQuery), !function (n) {
    "use strict";
    var a, e, t, i, o, s, l = function (n) {
        clearInterval(s), s = setInterval(function () {
            n[0] == a[0] ? i.nanoScroller({
                flash: !0,
                preventPageScrolling: !!t.hasClass("mainnav-fixed")
            }) : n[0] == e[0] && o.nanoScroller({preventPageScrolling: !!t.hasClass("aside-fixed")}), clearInterval(s), s = null
        }, 500)
    }, r = function () {
        t = n("#container"), a = n("#mainnav-container"), e = n("#aside-container"), i = n("#mainnav-menu-wrap > .nano"), o = n("#aside > .nano"), a.length && a.niftyAffix({className: "mainnav-fixed"}), e.length && e.niftyAffix({className: "aside-fixed"})
    };
    n.fn.niftyAffix = function (a) {
        return this.each(function () {
            var e, i = n(this);
            "object" != typeof a && a ? "update" == a ? (i.data("nifty.af.class") || r(), e = i.data("nifty.af.class"), l(i)) : "bind" == a && r() : (e = a.className, i.data("nifty.af.class", a.className)), t.hasClass(e) && !t.hasClass("navbar-fixed") ? i.affix({offset: {top: n("#navbar").outerHeight()}}).on("affixed.bs.affix affix.bs.affix", function () {
                l(i)
            }) : t.hasClass(e) && !t.hasClass("navbar-fixed") || (n(window).off(i.attr("id") + ".affix"), i.removeClass("affix affix-top affix-bottom").removeData("bs.affix"))
        })
    }
}(jQuery);
