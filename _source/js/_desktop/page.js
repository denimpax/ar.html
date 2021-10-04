! function (e, t)
{
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], (function (o)
  {
    return t(e, o, !1)
  })) : t(e, e.jQuery || e.Zepto || e.ender || e.$, !0)
}(this, (function (e, t, o)
{
  "use strict";
  var n;
  return (n = {
    options:
    {
      timeout: null,
      meter: t(".scroolly"),
      body: document
    },
    theCSSPrefix: "",
    theDashedCSSPrefix: "",
    isMobile: !1,
    isInitialized: !1,
    animFrame: null,
    direction: 0,
    scrollTop: 0,
    scrollCenter: 0,
    scrollBottom: 0,
    docHeight: 0,
    docMiddle: 0,
    winHeight: t(window).height()
  }).scrollLayout = {}, n._isObject = function (e)
  {
    return "object" == typeof e
  }, n._isArray = function (e)
  {
    return e instanceof Array
  }, n._isNumber = function (e)
  {
    return e instanceof Number || "number" == typeof e
  }, n._isString = function (e)
  {
    return e instanceof String || "string" == typeof e
  }, n._default = function (e, t, o)
  {
    void 0 === o && (o = null);
    var a = (t + "").split(".");
    if(e && (n._isObject(e) || n._isArray(e)))
    {
      var i, r = e;
      for(var l in a)
      {
        if(i = a[l], !n._isObject(r) && !n._isArray(r) || void 0 === r[i]) return o;
        r = r[i]
      }
      return r
    }
    return o
  }, n.parseCoords = function (e)
  {
    var t = e.split(/\s*=\s*/),
      o = t[0] || "doc-top",
      a = n.parseCoord(o),
      i = t[1] || a.anchor;
    return [a, n.parseCoord(i)]
  }, n.parseCoord = function (e)
  {
    var t = "(\\+|-)?\\s*(\\d+)(\\%|vp|doc|el|con)?",
      o = new RegExp(t, "gi"),
      n = e.match(/((vp|doc|el|con)-)?(top|center|bottom)?/i),
      a = e.match(o);
    if(!n && !a) return !1;
    var i = n[1] ? n[2] : "vp",
      r = n[3] || "top",
      l = [];
    if(a)
    {
      o = new RegExp(t, "i");
      for(var s, c, d, u, f = 0; f < a.length; f++) c = (s = a[f].match(o))[1] && "-" === s[1] ? -1 : 1, d = s[2] && parseInt(s[2]) * c || 0, u = "px", s[3] && (u = "%" === s[3] ? i : s[3]), l.push(
      {
        offset: d,
        subject: u
      })
    }
    return {
      original: e,
      subject: i,
      anchor: r,
      offsets: l
    }
  }, n.calculateCoord = function (e, t, o)
  {
    n._isString(e) && (e = n.parseCoord(e));
    var a, i, r, l, s = 0;
    if("vp" === e.subject) switch (e.anchor)
    {
    case "top":
      s = n.scrollTop;
      break;
    case "center":
      s = n.scrollCenter;
      break;
    case "bottom":
      s = n.scrollBottom
    }
    else if("doc" === e.subject) switch (e.anchor)
    {
    case "top":
      s = 0;
      break;
    case "center":
      s = n.docMiddle;
      break;
    case "bottom":
      s = n.docHeight
    }
    else
    {
      var c = "con" === e.subject ? o : t,
        d = c.outerHeight(),
        u = c.offset().top,
        f = u + d,
        h = u + Math.floor(d / 2);
      switch (e.anchor)
      {
      case "top":
        s = u;
        break;
      case "center":
        s = h;
        break;
      case "bottom":
        s = f
      }
    }
    for(a = 0; a < e.offsets.length; a++)
    {
      if(r = (i = e.offsets[a]).offset, "px" !== i.subject)
      {
        switch (l = 0, i.subject)
        {
        case "vp":
          l = n.winHeight;
          break;
        case "doc":
          l = n.docHeight;
          break;
        case "el":
          l = t.outerHeight();
          break;
        case "con":
          l = o.outerHeight()
        }
        r = Math.ceil(i.offset / 100 * l)
      }
      s += r
    }
    return s
  }, n.cmpCoords = function (e, t, o)
  {
    return n.calculateCoord(e[0], t, o) - n.calculateCoord(e[1], t, o)
  }, n.isRuleInActiveWidthRange = function (e)
  {
    var o, a, i = n._default(e, "minWidth", 0),
      r = n._default(e, "maxWidth", "infinity"),
      l = n._default(n.options, "meter"),
      s = t(window).width();
    return l.length ? (o = l.length ? parseInt(l.css("min-width")) : 0, a = "none" === (a = l.length ? l.css("max-width") : "none") ? "infinity" : parseInt(a), o >= i && ("infinity" === r || r >= a)) : s > i && ("infinity" === r || r >= s)
  }, n.isRuleActive = function (e, t, o)
  {
    if(!n.isRuleInActiveWidthRange(e)) return !1;
    var a = n._default(e, "direction", 0),
      i = n.direction;
    if(a && (a > 0 && 0 > i || 0 > a && i >= 0)) return !1;
    var r = n._default(e, "from", "0"),
      l = n._default(e, "to", "finish"),
      s = n.cmpCoords(r, t, o);
    if(s > 0) return !1;
    var c = n.cmpCoords(l, t, o);
    return !(0 >= c) &&
    {
      offset: -s,
      length: c - s
    }
  }, n.addItem = function (e, o, a, i)
  {
    if(!o.length) return !1;
    var r, l, s, c, d, u;
    for(var f in i = i || "self", u = function (e, t, o, a)
      {
        var i, r, l = t / o,
          s = n._default(a, "cssFrom"),
          c = n._default(a, "cssTo"),
          d = {};
        for(var u in s) i = s[u], r = n._default(c, u, i), d[u] = n.getTransitionValue(i, r, l);
        e.css(n.extendCssWithPrefix(d))
      }, a) r = a[f], !i, l = n._default(r, "from", "doc-top"), (n._isString(l) || n._isNumber(l)) && (l = n.parseCoords("" + l), r.from = l), s = n._default(r, "to", "doc-bottom"), (n._isString(s) || n._isNumber(s)) && (s = n.parseCoords("" + s), r.to = s), c = n._default(r, "cssFrom"), d = n._default(r, "cssTo"), c && d && (r.cssOnScroll = u);
    if(o.length > 1) return o.each((function (o)
    {
      for(var r, l, s = [], c = null, d = 0; d < a.length; d++) r = a[d], l = {}, t.extend(l, r), s.push(l);
      i && (c = "self" === i ? i : i.length > 1 && o < i.length ? t(i[o]) : i), n.addItem(e + "-" + o, t(this), s, c)
    })), !0;
    var h = n._default(n.scrollLayout, e);
    return h ? h.rules.concat(a) : n.scrollLayout[e] = {
      element: o,
      container: i,
      rules: a
    }, !0
  }, n.factory = function (e, t, o, a)
  {
    return n.init(), !(!e.length || !t) && (a = a || e[0].tagName + "_" + Object.keys(n.scrollLayout).length, void n.addItem(a, e, t, o, !1))
  }, n.stickItem = function (e, t, o)
  {
    n.stickItemXY(e, t, o instanceof Array ? o : [o])
  }, n.stickItemXY = function (e, o, a)
  {
    a = a || [];
    var i, r, l, s, c, d, u, f, h = [];
    for(var m in a) i = a[m], r = n._default(i, "$bottomContainer", t("body")), l = n._default(i, "mode"), s = n._default(i, "offsetTop", 0), c = n._default(i, "offsetBottom", 0), d = n._default(i, "minWidth", 0), u = n._default(i, "maxWidth", "infinity"), f = n._default(i, "static", !1), "next" === r ? (l = l || "margin", r = t(o).next()) : "parent" !== r && r || (l = l || "padding", r = t(o).parent()), f ? h.push(
    {
      source: "sticky",
      alias: "static",
      minWidth: d,
      maxWidth: u,
      bottomContainer: r
    }) : (h.push(
    {
      source: "sticky",
      alias: "top",
      minWidth: d,
      maxWidth: u,
      offsetTop: s,
      offsetBottom: c,
      bottomContainer: r,
      mode: l
    }), h.push(
    {
      source: "sticky",
      alias: "fixed",
      minWidth: d,
      maxWidth: u,
      offsetTop: s,
      offsetBottom: c,
      bottomContainer: r,
      mode: l
    }), h.push(
    {
      source: "sticky",
      alias: "bottom",
      minWidth: d,
      maxWidth: u,
      offsetTop: s,
      offsetBottom: c,
      bottomContainer: r,
      mode: l
    }));
    n.addItem(e, t(o), h)
  }, n.processStickyItemRange = function (e, o)
  {
    o = o ||
    {};
    var a = n._default(o, "bottomContainer", t("body")),
      i = (n._default(o, "mode"), n._default(o, "offsetTop", 0)),
      r = n._default(o, "offsetBottom", 0),
      l = parseInt(e.css("margin-top")) + e.height() + parseInt(e.css("margin-bottom"));
    "border-box" === e.css("box-sizing") && (l += parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom")));
    var s = parseInt(a.css("margin-top")) + a.height() + parseInt(a.css("margin-bottom"));
    "border-box" === a.css("box-sizing") && (s += parseInt(a.css("padding-top")) + parseInt(a.css("padding-bottom")));
    var c = Math.round(e.offset().top - parseInt(e.css("margin-top"))),
      d = Math.round(a.offset().top + (s - l - r));
    switch (o.alias)
    {
    case "top":
      o.from = 0, o.to = c - i, o.css = {
        position: "absolute",
        top: c + "px"
      }, o.itemHeight = l;
      break;
    case "fixed":
      o.from = c - i, o.to = d, o.css = {
        position: "fixed",
        top: i + "px"
      }, o.itemHeight = l;
      break;
    case "bottom":
      o.from = d, o.css = {
        position: "absolute",
        top: d + i + "px"
      }, o.itemHeight = l;
      break;
    case "static":
      o.from = 0, o.css = {
        position: "",
        top: ""
      }, o.itemHeight = 0
    }
    return o
  }, n.onResize = function ()
  {
    n.winHeight = t(window).height(), n.docHeight = n.body.height(), n.docMiddle = Math.floor(n.docHeight / 2);
    var e = !1;
    for(var o in n.scrollLayout)
    {
      var a, i, r = n.scrollLayout[o];
      for(var l in r.rules) a = r.rules[l], e |= i = n.isRuleInActiveWidthRange(a), i && void 0 === a.from && (t(r.element).css("position", ""), t(r.element).css("top", ""), a.bottomContainer && a.bottomContainer.css("margin-top", ""), "sticky" === n._default(a, "source") && (r.rules[l] = n.processStickyItemRange(r.element, a)))
    }
    return e && (n.scrollLayout = n.scrollLayout, setTimeout((function ()
    {
      n.onScroll(!0)
    }), 0)), !0
  }, n.getProgress = function (e, t)
  {
    var o = e / t;
    return {
      offset: e,
      length: t,
      relative: o,
      left: t - e,
      leftRelative: 1 - o
    }
  }, n.getTransitionFloatValue = function (e, t, o)
  {
    return 0 >= o ? e : o >= 1 ? t : e + (t - e) * o
  }, n.getTransitionIntValue = function (e, t, o)
  {
    return Math.round(n.getTransitionFloatValue(e, t, o))
  }, n.hashColor2rgb = function (e)
  {
    var t = e.match(/^#([0-9a-f]{3})$/i);
    return t ? [17 * parseInt(t[1].charAt(0), 16), 17 * parseInt(t[1].charAt(1), 16), 17 * parseInt(t[1].charAt(2), 16)] : (t = e.match(/^#([0-9a-f]{6})$/i)) ? [parseInt(t[1].substr(0, 2), 16), parseInt(t[1].substr(2, 2), 16), parseInt(t[1].substr(4, 2), 16)] : [0, 0, 0]
  }, n.rgb2HashColor = function ()
  {
    var e, t, o = "#";
    for(var n in arguments) t = (e = arguments[n]).toString(16), 16 > e && (t = "0" + t), o += t;
    return o
  }, n.getTransitionColorValue = function (e, t, o)
  {
    if(0 >= o) return e;
    if(o >= 1) return t;
    var a = n.hashColor2rgb(e),
      i = n.hashColor2rgb(t),
      r = n.getTransitionIntValue(a[0], i[0], o),
      l = n.getTransitionIntValue(a[1], i[1], o),
      s = n.getTransitionIntValue(a[2], i[2], o);
    return n.rgb2HashColor(r, l, s)
  }, n.getTransitionValue = function (e, t, o)
  {
    if(0 >= o) return e;
    if(o >= 1) return t;
    var a = 0;
    if(n._isNumber(e) && n._isNumber(t)) return n.getTransitionFloatValue(e, e, o);
    var i = /(\d*\.\d+)|(\d+)|(#[0-9a-f]{6})|(#[0-9a-f]{3})/gi,
      r = ("" + t).match(i);
    return ("" + e).replace(i, (function (e, t, i, l, s)
    {
      var c = r[a];
      return a++, i && i.length ? /\d*\.\d+/.test(c) ? n.getTransitionFloatValue(parseFloat(e), parseFloat(c), o) : n.getTransitionIntValue(parseInt(e), parseInt(c), o) : t && t.length ? n.getTransitionFloatValue(parseFloat(e), parseFloat(c), o) : l && l.length || s && s.length ? n.getTransitionColorValue(e, c, o) : e
    }))
  }, n.onScroll = function (e)
  {
    var t = n.body.scrollTop();
    if(!e && t === n.scrollTop) return !1;
    var o = n.scrollTop,
      a = n.direction;
    n.scrollTop = t, n.scrollBottom = t + n.winHeight, n.scrollCenter = t + Math.floor(n.winHeight / 2), n.direction = t - o;
    var i, r, l, s, c, d, u, f, h, m, p, g, v, w, x, b, S = !(n.direction === a || n.direction < 0 && 0 > a || n.direction > 0 && a > 0);
    for(d in n.scrollLayout)
    {
      for(r = (i = n.scrollLayout[d]).rules.length, l = [], s = [], c = [], u = 0; r > u; u++) m = i.rules[u], p = n._default(m, "minWidth", 0), g = n._default(m, "maxWidth", "infinity"), v = "self" === i.container ? i.element : i.container, m.checkin = n.isRuleActive(m, i.element, v), m.class = m.class || "scroll-pos-" + m.alias + " window-width-" + p + "-to-" + g, m.checkin ? (c.push(u), m.isActive || (m.isActive = !0, l.push(u))) : m.isActive && (m.isActive = !1, s.push(u)), i.rules[u] = m;
      for(h = 0; h < s.length; h++) u = s[h], m = i.rules[u], i.element.removeClass(m.class), m.cssOnScroll && (f = m.length || 0, m.cssOnScroll(i.element, t > o ? f : 0, f, m)), m.onScroll && (f = m.length || 0, m.onScroll(i.element, t > o ? f : 0, f, m)), m.onCheckOut && m.onCheckOut(i.element, m), m.onTopOut && o > t ? m.onTopOut(i.element, m) : m.onBottomOut && t > o && m.onBottomOut(i.element, m);
      for(h = 0; h < l.length; h++) u = l[h], (m = i.rules[u]).css && i.element.css(n.extendCssWithPrefix(m.css)), m.addClass && i.element.addClass(m.addClass), m.removeClass && i.element.removeClass(m.removeClass), i.element.addClass(m.class), w = n._default(m, "bottomContainer"), x = n._default(m, "mode"), b = n._default(m, "itemHeight"), w && x && b && w.css(x + "-top", b + "px"), m.onCheckIn && m.onCheckIn(i.element, m), m.onTopIn && t > o ? m.onTopIn(i.element, m) : m.onBottomIn && o > t && m.onBottomIn(i.element, m), m.length = m.checkin.length;
      for(h = 0; h < c.length; h++) u = c[h], (m = i.rules[u]).cssOnScroll && m.cssOnScroll(i.element, m.checkin.offset, m.checkin.length, m), m.onScroll && m.onScroll(i.element, m.checkin.offset, m.checkin.length, m), S && m.onDirectionChanged && m.onDirectionChanged(i.element, n.direction, m);
      n.scrollLayout[d] = i
    }
  }, n.detectCSSPrefix = function ()
  {
    var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
    if(window.getComputedStyle)
    {
      var t = window.getComputedStyle(document.body, null);
      for(var o in t)
        if(n.theCSSPrefix = o.match(e) || +o === o && t[o].match(e), n.theCSSPrefix) break;
      if(!n.theCSSPrefix) return void(n.theCSSPrefix = n.theDashedCSSPrefix = "");
      n.theCSSPrefix = n.theCSSPrefix[0], "-" === n.theCSSPrefix.slice(0, 1) ? (n.theDashedCSSPrefix = n.theCSSPrefix, n.theCSSPrefix = {
        "-webkit-": "webkit",
        "-moz-": "Moz",
        "-ms-": "ms",
        "-o-": "O"
      } [n.theCSSPrefix]) : n.theDashedCSSPrefix = "-" + n.theCSSPrefix.toLowerCase() + "-"
    }
  }, n.cssPrefix = function (e)
  {
    return n.theDashedCSSPrefix + e
  }, n.extendCssWithPrefix = function (e)
  {
    var o, a, i, r, l, s = {};
    for(o in e) a = /^-(moz-|webkit-|o-|ms-)?/i, i = o.match(a), r = o.slice(1), i && !i[1] && (l = e[o], s[r] = l, s[n.cssPrefix(r)] = l, delete e[o]);
    return t.extend(e, s), e
  }, n.now = Date.now || function ()
  {
    return +new Date
  }, n.getRAF = function ()
  {
    var e = window.requestAnimationFrame || window[n.theCSSPrefix.toLowerCase() + "RequestAnimationFrame"],
      t = n.now();
    return e || (e = function (e)
    {
      var o = n.now() - t,
        a = Math.max(0, 1e3 / 60 - o);
      return window.setTimeout((function ()
      {
        t = n.now(), e()
      }), a)
    }), e
  }, n.getCAF = function ()
  {
    var e = window.cancelAnimationFrame || window[n.theCSSPrefix.toLowerCase() + "CancelAnimationFrame"];
    return (n.isMobile || !e) && (e = function (e)
    {
      return window.clearTimeout(e)
    }), e
  }, n.animLoop = function ()
  {
    n.onScroll(), n.animFrame = window.requestAnimFrame(n.animLoop)
  }, n.init = function (e)
  {
    return !n.isInitialized && (t.extend(n.options, e), n.isMobile = n._default(n.options, "isMobile", /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera)), n.detectCSSPrefix(), n.body = t(n.options.body), window.requestAnimFrame = n.getRAF(), window.cancelAnimFrame = n.getCAF(), n.timesCalled = 0, t(document).ready((function ()
    {
      t(window).resize(n.onResize).resize(), n.animLoop()
    })), void(n.isInitialized = !0))
  }, n.destroy = function ()
  {
    window.cancelAnimFrame(n.animFrame)
  }, n.factorySticky = function (e, t, o)
  {
    return o = o || e[0].tagName + "_" + Object.keys(n.scrollLayout).length, !!n.stickItemXY(o, e, t instanceof Array ? t : [t]) && o
  }, o && (t.scroolly = n, t.fn.scroolly = function (e, t, o)
  {
    return n.factory(this, e, t, o), this
  }, t.fn.scroollySticky = function (e, t)
  {
    return n.init(), !!this.length && n.factorySticky(this, e, t)
  }), n
})),
function (e)
{
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}((function (e)
{
  function t(t)
  {
    var r = t || window.event,
      l = s.call(arguments, 1),
      c = 0,
      u = 0,
      f = 0,
      h = 0,
      m = 0,
      p = 0;
    if((t = e.event.fix(r)).type = "mousewheel", "detail" in r && (f = -1 * r.detail), "wheelDelta" in r && (f = r.wheelDelta), "wheelDeltaY" in r && (f = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * f, f = 0), c = 0 === f ? u : f, "deltaY" in r && (c = f = -1 * r.deltaY), "deltaX" in r && (u = r.deltaX, 0 === f && (c = -1 * u)), 0 !== f || 0 !== u)
    {
      if(1 === r.deltaMode)
      {
        var g = e.data(this, "mousewheel-line-height");
        c *= g, f *= g, u *= g
      }
      else if(2 === r.deltaMode)
      {
        var v = e.data(this, "mousewheel-page-height");
        c *= v, f *= v, u *= v
      }
      if(h = Math.max(Math.abs(f), Math.abs(u)), (!i || i > h) && (i = h, n(r, h) && (i /= 40)), n(r, h) && (c /= 40, u /= 40, f /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / i), u = Math[u >= 1 ? "floor" : "ceil"](u / i), f = Math[f >= 1 ? "floor" : "ceil"](f / i), d.settings.normalizeOffset && this.getBoundingClientRect)
      {
        var w = this.getBoundingClientRect();
        m = t.clientX - w.left, p = t.clientY - w.top
      }
      return t.deltaX = u, t.deltaY = f, t.deltaFactor = i, t.offsetX = m, t.offsetY = p, t.deltaMode = 0, l.unshift(t, c, u, f), a && clearTimeout(a), a = setTimeout(o, 200), (e.event.dispatch || e.event.handle).apply(this, l)
    }
  }

  function o()
  {
    i = null
  }

  function n(e, t)
  {
    return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
  }
  var a, i, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    l = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    s = Array.prototype.slice;
  if(e.event.fixHooks)
    for(var c = r.length; c;) e.event.fixHooks[r[--c]] = e.event.mouseHooks;
  var d = e.event.special.mousewheel = {
    version: "3.1.12",
    setup: function ()
    {
      if(this.addEventListener)
        for(var o = l.length; o;) this.addEventListener(l[--o], t, !1);
      else this.onmousewheel = t;
      e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this))
    },
    teardown: function ()
    {
      if(this.removeEventListener)
        for(var o = l.length; o;) this.removeEventListener(l[--o], t, !1);
      else this.onmousewheel = null;
      e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
    },
    getLineHeight: function (t)
    {
      var o = e(t),
        n = o["offsetParent" in e.fn ? "offsetParent" : "parent"]();
      return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(o.css("fontSize"), 10) || 16
    },
    getPageHeight: function (t)
    {
      return e(t).height()
    },
    settings:
    {
      adjustOldDeltas: !0,
      normalizeOffset: !0
    }
  };
  e.fn.extend(
  {
    mousewheel: function (e)
    {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    },
    unmousewheel: function (e)
    {
      return this.unbind("mousewheel", e)
    }
  })
})),
function (e)
{
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}((function (e)
{
  function t(t)
  {
    var r = t || window.event,
      l = s.call(arguments, 1),
      c = 0,
      u = 0,
      f = 0,
      h = 0,
      m = 0,
      p = 0;
    if((t = e.event.fix(r)).type = "mousewheel", "detail" in r && (f = -1 * r.detail), "wheelDelta" in r && (f = r.wheelDelta), "wheelDeltaY" in r && (f = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * f, f = 0), c = 0 === f ? u : f, "deltaY" in r && (c = f = -1 * r.deltaY), "deltaX" in r && (u = r.deltaX, 0 === f && (c = -1 * u)), 0 !== f || 0 !== u)
    {
      if(1 === r.deltaMode)
      {
        var g = e.data(this, "mousewheel-line-height");
        c *= g, f *= g, u *= g
      }
      else if(2 === r.deltaMode)
      {
        var v = e.data(this, "mousewheel-page-height");
        c *= v, f *= v, u *= v
      }
      if(h = Math.max(Math.abs(f), Math.abs(u)), (!i || i > h) && (i = h, n(r, h) && (i /= 40)), n(r, h) && (c /= 40, u /= 40, f /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / i), u = Math[u >= 1 ? "floor" : "ceil"](u / i), f = Math[f >= 1 ? "floor" : "ceil"](f / i), d.settings.normalizeOffset && this.getBoundingClientRect)
      {
        var w = this.getBoundingClientRect();
        m = t.clientX - w.left, p = t.clientY - w.top
      }
      return t.deltaX = u, t.deltaY = f, t.deltaFactor = i, t.offsetX = m, t.offsetY = p, t.deltaMode = 0, l.unshift(t, c, u, f), a && clearTimeout(a), a = setTimeout(o, 200), (e.event.dispatch || e.event.handle).apply(this, l)
    }
  }

  function o()
  {
    i = null
  }

  function n(e, t)
  {
    return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
  }
  var a, i, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    l = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    s = Array.prototype.slice;
  if(e.event.fixHooks)
    for(var c = r.length; c;) e.event.fixHooks[r[--c]] = e.event.mouseHooks;
  var d = e.event.special.mousewheel = {
    version: "3.1.12",
    setup: function ()
    {
      if(this.addEventListener)
        for(var o = l.length; o;) this.addEventListener(l[--o], t, !1);
      else this.onmousewheel = t;
      e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this))
    },
    teardown: function ()
    {
      if(this.removeEventListener)
        for(var o = l.length; o;) this.removeEventListener(l[--o], t, !1);
      else this.onmousewheel = null;
      e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
    },
    getLineHeight: function (t)
    {
      var o = e(t),
        n = o["offsetParent" in e.fn ? "offsetParent" : "parent"]();
      return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(o.css("fontSize"), 10) || 16
    },
    getPageHeight: function (t)
    {
      return e(t).height()
    },
    settings:
    {
      adjustOldDeltas: !0,
      normalizeOffset: !0
    }
  };
  e.fn.extend(
  {
    mousewheel: function (e)
    {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    },
    unmousewheel: function (e)
    {
      return this.unbind("mousewheel", e)
    }
  })
})),
function (e)
{
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}((function (e)
{
  var t, o, n;
  t = "function" == typeof define && define.amd, o = "undefined" != typeof module && module.exports, n = "https:" == document.location.protocol ? "https:" : "http:", t || (o ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))),
    function ()
    {
      var t, o = "mCustomScrollbar",
        n = "mCS",
        a = ".mCustomScrollbar",
        i = {
          setTop: 0,
          setLeft: 0,
          axis: "y",
          scrollbarPosition: "inside",
          scrollInertia: 950,
          autoDraggerLength: !0,
          alwaysShowScrollbar: 0,
          snapOffset: 0,
          mouseWheel:
          {
            enable: !0,
            scrollAmount: "auto",
            axis: "y",
            deltaFactor: "auto",
            disableOver: ["select", "option", "keygen", "datalist", "textarea"]
          },
          scrollButtons:
          {
            scrollType: "stepless",
            scrollAmount: "auto"
          },
          keyboard:
          {
            enable: !0,
            scrollType: "stepless",
            scrollAmount: "auto"
          },
          contentTouchScroll: 25,
          documentTouchScroll: !0,
          advanced:
          {
            autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
            updateOnContentResize: !0,
            updateOnImageLoad: "auto",
            autoUpdateTimeout: 60
          },
          theme: "light",
          callbacks:
          {
            onTotalScrollOffset: 0,
            onTotalScrollBackOffset: 0,
            alwaysTriggerOffsets: !0
          }
        },
        r = 0,
        l = {},
        s = window.attachEvent && !window.addEventListener ? 1 : 0,
        c = !1,
        d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
        u = {
          init: function (t)
          {
            t = e.extend(!0,
            {}, i, t);
            var o = f.call(this);
            if(t.live)
            {
              var s = t.liveSelector || this.selector || a,
                c = e(s);
              if("off" === t.live) return void m(s);
              l[s] = setTimeout((function ()
              {
                c.mCustomScrollbar(t), "once" === t.live && c.length && m(s)
              }), 500)
            }
            else m(s);
            return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
              enable: !0,
              scrollAmount: "auto",
              axis: "y",
              preventDefault: !1,
              deltaFactor: "auto",
              normalizeDelta: !1,
              invert: !1
            }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each((function ()
            {
              var o = e(this);
              if(!o.data(n))
              {
                o.data(n,
                {
                  idx: ++r,
                  opt: t,
                  scrollRatio:
                  {
                    y: null,
                    x: null
                  },
                  overflowed: null,
                  contentReset:
                  {
                    y: null,
                    x: null
                  },
                  bindEvents: !1,
                  tweenRunning: !1,
                  sequential:
                  {},
                  langDir: o.css("direction"),
                  cbOffsets: null,
                  trigger: null,
                  poll:
                  {
                    size:
                    {
                      o: 0,
                      n: 0
                    },
                    img:
                    {
                      o: 0,
                      n: 0
                    },
                    change:
                    {
                      o: 0,
                      n: 0
                    }
                  }
                });
                var a = o.data(n),
                  i = a.opt,
                  l = o.data("mcs-axis"),
                  s = o.data("mcs-scrollbar-position"),
                  c = o.data("mcs-theme");
                l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), a && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + a.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o)
              }
            }))
          },
          update: function (t, o)
          {
            var a = t || f.call(this);
            return e(a).each((function ()
            {
              var t = e(this);
              if(t.data(n))
              {
                var a = t.data(n),
                  i = a.opt,
                  r = e("#mCSB_" + a.idx + "_container"),
                  l = e("#mCSB_" + a.idx),
                  s = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")];
                if(!r.length) return;
                a.tweenRunning && U(t), o && a && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), x.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", w(r)), a.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), _.call(this), B.call(this);
                var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                "x" !== i.axis && (a.overflowed[0] ? s[0].height() > s[0].parent().height() ? k.call(this) : (N(t, c[0].toString(),
                {
                  dir: "y",
                  dur: 0,
                  overwrite: "none"
                }), a.contentReset.y = null) : (k.call(this), "y" === i.axis ? T.call(this) : "yx" === i.axis && a.overflowed[1] && N(t, c[1].toString(),
                {
                  dir: "x",
                  dur: 0,
                  overwrite: "none"
                }))), "y" !== i.axis && (a.overflowed[1] ? s[1].width() > s[1].parent().width() ? k.call(this) : (N(t, c[1].toString(),
                {
                  dir: "x",
                  dur: 0,
                  overwrite: "none"
                }), a.contentReset.x = null) : (k.call(this), "x" === i.axis ? T.call(this) : "yx" === i.axis && a.overflowed[0] && N(t, c[0].toString(),
                {
                  dir: "y",
                  dur: 0,
                  overwrite: "none"
                }))), o && a && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), V.call(this)
              }
            }))
          },
          scrollTo: function (t, o)
          {
            if(void 0 !== t && null != t)
            {
              var a = f.call(this);
              return e(a).each((function ()
              {
                var a = e(this);
                if(a.data(n))
                {
                  var i = a.data(n),
                    r = i.opt,
                    l = {
                      trigger: "external",
                      scrollInertia: r.scrollInertia,
                      scrollEasing: "mcsEaseInOut",
                      moveDragger: !1,
                      timeout: 60,
                      callbacks: !0,
                      onStart: !0,
                      onUpdate: !0,
                      onComplete: !0
                    },
                    s = e.extend(!0,
                    {}, l, o),
                    c = Y.call(this, t),
                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                  c[0] = q.call(this, c[0], "y"), c[1] = q.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ne() ? 0 : d, setTimeout((function ()
                  {
                    null !== c[0] && void 0 !== c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", N(a, c[0].toString(), s)), null !== c[1] && void 0 !== c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", N(a, c[1].toString(), s))
                  }), s.timeout)
                }
              }))
            }
          },
          stop: function ()
          {
            var t = f.call(this);
            return e(t).each((function ()
            {
              var t = e(this);
              t.data(n) && U(t)
            }))
          },
          disable: function (t)
          {
            var o = f.call(this);
            return e(o).each((function ()
            {
              var o = e(this);
              o.data(n) && (o.data(n), V.call(this, "remove"), T.call(this), t && k.call(this), M.call(this, !0), o.addClass(d[3]))
            }))
          },
          destroy: function ()
          {
            var t = f.call(this);
            return e(t).each((function ()
            {
              var a = e(this);
              if(a.data(n))
              {
                var i = a.data(n),
                  r = i.opt,
                  l = e("#mCSB_" + i.idx),
                  s = e("#mCSB_" + i.idx + "_container"),
                  c = e(".mCSB_" + i.idx + "_scrollbar");
                r.live && m(r.liveSelector || e(t).selector), V.call(this, "remove"), T.call(this), k.call(this), a.removeData(n), J(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), a.removeClass(o + " _" + n + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
              }
            }))
          }
        },
        f = function ()
        {
          return "object" != typeof e(this) || e(this).length < 1 ? a : this
        },
        h = function (t)
        {
          t.autoDraggerLength = !(e.inArray(t.theme, ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]) > -1) && t.autoDraggerLength, t.autoExpandScrollbar = !(e.inArray(t.theme, ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"]) > -1) && t.autoExpandScrollbar, t.scrollButtons.enable = !(e.inArray(t.theme, ["minimal", "minimal-dark"]) > -1) && t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, ["minimal", "minimal-dark"]) > -1 || t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, ["minimal", "minimal-dark"]) > -1 ? "outside" : t.scrollbarPosition
        },
        m = function (e)
        {
          l[e] && (clearTimeout(l[e]), J(l, e))
        },
        p = function (e)
        {
          return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
        },
        g = function (e)
        {
          return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
        },
        v = function ()
        {
          var t = e(this),
            a = t.data(n),
            i = a.opt,
            r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
            l = ["<div id='mCSB_" + a.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + a.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + a.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + a.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
            s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
            c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
            u = "yx" === i.axis ? "<div id='mCSB_" + a.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
            f = i.autoHideScrollbar ? " " + d[6] : "",
            h = "x" !== i.axis && "rtl" === a.langDir ? " " + d[7] : "";
          i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === a.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + n + "_" + a.idx + f + h).wrapInner("<div id='mCSB_" + a.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + a.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + a.langDir + "' /></div>");
          var m = e("#mCSB_" + a.idx),
            p = e("#mCSB_" + a.idx + "_container");
          "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", w(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), b.call(this);
          var g = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")];
          g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
        },
        w = function (t)
        {
          var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map((function ()
            {
              return e(this).outerWidth(!0)
            })).get())],
            n = t.parent().width();
          return o[0] > n ? o[0] : o[1] > n ? o[1] : "100%"
        },
        x = function ()
        {
          var t = e(this).data(n),
            o = t.opt,
            a = e("#mCSB_" + t.idx + "_container");
          if(o.advanced.autoExpandHorizontalScroll && "y" !== o.axis)
          {
            a.css(
            {
              width: "auto",
              "min-width": 0,
              "overflow-x": "scroll"
            });
            var i = Math.ceil(a[0].scrollWidth);
            3 === o.advanced.autoExpandHorizontalScroll || 2 !== o.advanced.autoExpandHorizontalScroll && i > a.parent().width() ? a.css(
            {
              width: i,
              "min-width": "100%",
              "overflow-x": "inherit"
            }) : a.css(
            {
              "overflow-x": "inherit",
              position: "absolute"
            }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css(
            {
              width: Math.ceil(a[0].getBoundingClientRect().right + .4) - Math.floor(a[0].getBoundingClientRect().left),
              "min-width": "100%",
              position: "relative"
            }).unwrap()
          }
        },
        b = function ()
        {
          var t = e(this).data(n),
            o = t.opt,
            a = e(".mCSB_" + t.idx + "_scrollbar:first"),
            i = te(o.scrollButtons.tabindex) ? "tabindex='" + o.scrollButtons.tabindex + "'" : "",
            r = ["<a href='#' class='" + d[13] + "' " + i + " />", "<a href='#' class='" + d[14] + "' " + i + " />", "<a href='#' class='" + d[15] + "' " + i + " />", "<a href='#' class='" + d[16] + "' " + i + " />"],
            l = ["x" === o.axis ? r[2] : r[0], "x" === o.axis ? r[3] : r[1], r[2], r[3]];
          o.scrollButtons.enable && a.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
        },
        S = function ()
        {
          var t = e(this).data(n),
            o = e("#mCSB_" + t.idx),
            a = e("#mCSB_" + t.idx + "_container"),
            i = [e("#mCSB_" + t.idx + "_dragger_vertical"), e("#mCSB_" + t.idx + "_dragger_horizontal")],
            r = [o.height() / a.outerHeight(!1), o.width() / a.outerWidth(!1)],
            l = [parseInt(i[0].css("min-height")), Math.round(r[0] * i[0].parent().height()), parseInt(i[1].css("min-width")), Math.round(r[1] * i[1].parent().width())],
            c = s && l[1] < l[0] ? l[0] : l[1],
            d = s && l[3] < l[2] ? l[2] : l[3];
          i[0].css(
          {
            height: c,
            "max-height": i[0].parent().height() - 10
          }).find(".mCSB_dragger_bar").css(
          {
            "line-height": l[0] + "px"
          }), i[1].css(
          {
            width: d,
            "max-width": i[1].parent().width() - 10
          })
        },
        _ = function ()
        {
          var t = e(this).data(n),
            o = e("#mCSB_" + t.idx),
            a = e("#mCSB_" + t.idx + "_container"),
            i = [e("#mCSB_" + t.idx + "_dragger_vertical"), e("#mCSB_" + t.idx + "_dragger_horizontal")],
            r = [a.outerHeight(!1) - o.height(), a.outerWidth(!1) - o.width()],
            l = [r[0] / (i[0].parent().height() - i[0].height()), r[1] / (i[1].parent().width() - i[1].width())];
          t.scrollRatio = {
            y: l[0],
            x: l[1]
          }
        },
        C = function (e, t, o)
        {
          var n = o ? d[0] + "_expanded" : "",
            a = e.closest(".mCSB_scrollTools");
          "active" === t ? (e.toggleClass(d[0] + " " + n), a.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), a.removeClass(d[1])) : (e.addClass(d[0]), a.addClass(d[1])))
        },
        y = function ()
        {
          var t = e(this).data(n),
            o = e("#mCSB_" + t.idx),
            a = e("#mCSB_" + t.idx + "_container"),
            i = null == t.overflowed ? a.height() : a.outerHeight(!1),
            r = null == t.overflowed ? a.width() : a.outerWidth(!1),
            l = a[0].scrollHeight,
            s = a[0].scrollWidth;
          return l > i && (i = l), s > r && (r = s), [i > o.height(), r > o.width()]
        },
        k = function ()
        {
          var t = e(this),
            o = t.data(n),
            a = o.opt,
            i = e("#mCSB_" + o.idx),
            r = e("#mCSB_" + o.idx + "_container"),
            l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
          if(U(t), ("x" !== a.axis && !o.overflowed[0] || "y" === a.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), N(t, "_resetY")), "y" !== a.axis && !o.overflowed[1] || "x" === a.axis && o.overflowed[1])
          {
            var s = dx = 0;
            "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), N(t, "_resetX")
          }
        },
        B = function ()
        {
          var t, o = e(this),
            a = o.data(n),
            i = a.opt;
          a.bindEvents || (O.call(this), i.contentTouchScroll && D.call(this), A.call(this), i.mouseWheel.enable && function n()
          {
            t = setTimeout((function ()
            {
              e.event.special.mousewheel ? (clearTimeout(t), L.call(o[0])) : n()
            }), 100)
          }(), W.call(this), $.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && j.call(this), i.keyboard.enable && F.call(this), a.bindEvents = !0)
        },
        T = function ()
        {
          var t = e(this),
            o = t.data(n),
            a = o.opt,
            i = n + "_" + o.idx,
            r = ".mCSB_" + o.idx + "_scrollbar",
            l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
            s = e("#mCSB_" + o.idx + "_container");
          a.advanced.releaseDraggableSelectors && l.add(e(a.advanced.releaseDraggableSelectors)), a.advanced.extraDraggableSelectors && l.add(e(a.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!R() || top.document)).unbind("." + i), l.each((function ()
          {
            e(this).unbind("." + i)
          })), clearTimeout(t[0]._focusTimeout), J(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), J(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), J(s[0], "onCompleteTimeout"), o.bindEvents = !1)
        },
        M = function (t)
        {
          var o = e(this),
            a = o.data(n),
            i = a.opt,
            r = e("#mCSB_" + a.idx + "_container_wrapper"),
            l = r.length ? r : e("#mCSB_" + a.idx + "_container"),
            s = [e("#mCSB_" + a.idx + "_scrollbar_vertical"), e("#mCSB_" + a.idx + "_scrollbar_horizontal")],
            c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
          "x" !== i.axis && (a.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (a.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), a.overflowed[0] || a.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
        },
        I = function (t)
        {
          var o = t.type,
            n = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
            a = R() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
          switch (o)
          {
          case "pointerdown":
          case "MSPointerDown":
          case "pointermove":
          case "MSPointerMove":
          case "pointerup":
          case "MSPointerUp":
            return n ? [t.originalEvent.pageY - n[0] + a[0], t.originalEvent.pageX - n[1] + a[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
          case "touchstart":
          case "touchmove":
          case "touchend":
            var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
              r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
            return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
          default:
            return n ? [t.pageY - n[0] + a[0], t.pageX - n[1] + a[1], !1] : [t.pageY, t.pageX, !1]
          }
        },
        O = function ()
        {
          function t(e, t, n, a)
          {
            if(h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr("id") === f[1]) var i = "x",
              s = (o[0].offsetLeft - t + a) * l.scrollRatio.x;
            else i = "y", s = (o[0].offsetTop - e + n) * l.scrollRatio.y;
            N(r, s.toString(),
            {
              dir: i,
              drag: !0
            })
          }
          var o, a, i, r = e(this),
            l = r.data(n),
            d = l.opt,
            u = n + "_" + l.idx,
            f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
            h = e("#mCSB_" + l.idx + "_container"),
            m = e("#" + f[0] + ",#" + f[1]),
            p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
            g = d.advanced.extraDraggableSelectors ? e(!R() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!R() || top.document);
          m.bind("contextmenu." + u, (function (e)
          {
            e.preventDefault()
          })).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, (function (t)
          {
            if(t.stopImmediatePropagation(), t.preventDefault(), K(t))
            {
              c = !0, s && (document.onselectstart = function ()
              {
                return !1
              }), E.call(h, !1), U(r);
              var n = (o = e(this)).offset(),
                l = I(t)[0] - n.top,
                u = I(t)[1] - n.left,
                f = o.height() + n.top,
                m = o.width() + n.left;
              f > l && l > 0 && m > u && u > 0 && (a = l, i = u), C(o, "active", d.autoExpandScrollbar)
            }
          })).bind("touchmove." + u, (function (e)
          {
            e.stopImmediatePropagation(), e.preventDefault();
            var n = o.offset(),
              r = I(e)[0] - n.top,
              l = I(e)[1] - n.left;
            t(a, i, r, l)
          })), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, (function (e)
          {
            if(o)
            {
              var n = o.offset(),
                r = I(e)[0] - n.top,
                l = I(e)[1] - n.left;
              if(a === r && i === l) return;
              t(a, i, r, l)
            }
          })).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, (function ()
          {
            o && (C(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), E.call(h, !0)
          }))
        },
        D = function ()
        {
          function o(e)
          {
            if(!ee(e) || c || I(e)[2]) t = 0;
            else
            {
              t = 1, _ = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");
              var o = O.offset();
              u = I(e)[0] - o.top, f = I(e)[1] - o.left, P = [I(e)[0], I(e)[1]]
            }
          }

          function a(e)
          {
            if(ee(e) && !c && !I(e)[2] && (B.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || _) && d))
            {
              g = Z();
              var t = M.offset(),
                o = I(e)[0] - t.top,
                n = I(e)[1] - t.left,
                a = "mcsLinearOut";
              if(A.push(o), L.push(n), P[2] = Math.abs(I(e)[0] - P[0]), P[3] = Math.abs(I(e)[1] - P[1]), k.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
                r = u - o > 0 && o - u > -i * k.scrollRatio.y && (2 * P[3] < P[2] || "yx" === B.axis);
              if(k.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
                h = f - n > 0 && n - f > -l * k.scrollRatio.x && (2 * P[2] < P[3] || "yx" === B.axis);
              r || h ? ($ || e.preventDefault(), _ = 1) : (C = 1, y.addClass("mCS_touch_action")), $ && e.preventDefault(), b = "yx" === B.axis ? [u - o, f - n] : "x" === B.axis ? [null, f - n] : [u - o, null], O[0].idleTimer = 250, k.overflowed[0] && s(b[0], z, a, "y", "all", !0), k.overflowed[1] && s(b[1], z, a, "x", E, !0)
            }
          }

          function i(e)
          {
            if(!ee(e) || c || I(e)[2]) t = 0;
            else
            {
              t = 1, e.stopImmediatePropagation(), U(y), p = Z();
              var o = M.offset();
              h = I(e)[0] - o.top, m = I(e)[1] - o.left, A = [], L = []
            }
          }

          function r(e)
          {
            if(ee(e) && !c && !I(e)[2])
            {
              d = 0, e.stopImmediatePropagation(), _ = 0, C = 0, v = Z();
              var t = M.offset(),
                o = I(e)[0] - t.top,
                n = I(e)[1] - t.left;
              if(!(v - g > 30))
              {
                var a = "mcsEaseOut",
                  i = 2.5 > (x = 1e3 / (v - p)),
                  r = i ? [A[A.length - 2], L[L.length - 2]] : [0, 0];
                w = i ? [o - r[0], n - r[1]] : [o - h, n - m];
                var u = [Math.abs(w[0]), Math.abs(w[1])];
                x = i ? [Math.abs(w[0] / 4), Math.abs(w[1] / 4)] : [x, x];
                var f = [Math.abs(O[0].offsetTop) - w[0] * l(u[0] / x[0], x[0]), Math.abs(O[0].offsetLeft) - w[1] * l(u[1] / x[1], x[1])];
                b = "yx" === B.axis ? [f[0], f[1]] : "x" === B.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + B.scrollInertia, 4 * u[1] + B.scrollInertia];
                var y = parseInt(B.contentTouchScroll) || 0;
                b[0] = u[0] > y ? b[0] : 0, b[1] = u[1] > y ? b[1] : 0, k.overflowed[0] && s(b[0], S[0], a, "y", E, !1), k.overflowed[1] && s(b[1], S[1], a, "x", E, !1)
              }
            }
          }

          function l(e, t)
          {
            var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
            return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
          }

          function s(e, t, o, n, a, i)
          {
            e && N(y, e.toString(),
            {
              dur: t,
              scrollEasing: o,
              dir: n,
              overwrite: a,
              drag: i
            })
          }
          var d, u, f, h, m, p, g, v, w, x, b, S, _, C, y = e(this),
            k = y.data(n),
            B = k.opt,
            T = n + "_" + k.idx,
            M = e("#mCSB_" + k.idx),
            O = e("#mCSB_" + k.idx + "_container"),
            D = [e("#mCSB_" + k.idx + "_dragger_vertical"), e("#mCSB_" + k.idx + "_dragger_horizontal")],
            A = [],
            L = [],
            z = 0,
            E = "yx" === B.axis ? "none" : "all",
            P = [],
            W = O.find("iframe"),
            H = ["touchstart." + T + " pointerdown." + T + " MSPointerDown." + T, "touchmove." + T + " pointermove." + T + " MSPointerMove." + T, "touchend." + T + " pointerup." + T + " MSPointerUp." + T],
            $ = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
          O.bind(H[0], (function (e)
          {
            o(e)
          })).bind(H[1], (function (e)
          {
            a(e)
          })), M.bind(H[0], (function (e)
          {
            i(e)
          })).bind(H[2], (function (e)
          {
            r(e)
          })), W.length && W.each((function ()
          {
            e(this).bind("load", (function ()
            {
              R(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], (function (e)
              {
                o(e), i(e)
              })).bind(H[1], (function (e)
              {
                a(e)
              })).bind(H[2], (function (e)
              {
                r(e)
              }))
            }))
          }))
        },
        A = function ()
        {
          function o(e, t, o)
          {
            s.type = o && a ? "stepped" : "stepless", s.scrollAmount = 10, X(i, e, t, "mcsLinearOut", o ? 60 : null)
          }
          var a, i = e(this),
            r = i.data(n),
            l = r.opt,
            s = r.sequential,
            d = n + "_" + r.idx,
            u = e("#mCSB_" + r.idx + "_container"),
            f = u.parent();
          u.bind("mousedown." + d, (function ()
          {
            t || a || (a = 1, c = !0)
          })).add(document).bind("mousemove." + d, (function (e)
          {
            if(!t && a && (window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type && document.selection.createRange().text))
            {
              var n = u.offset(),
                i = I(e)[0] - n.top + u[0].offsetTop,
                c = I(e)[1] - n.left + u[0].offsetLeft;
              i > 0 && i < f.height() && c > 0 && c < f.width() ? s.step && o("off", null, "stepped") : ("x" !== l.axis && r.overflowed[0] && (0 > i ? o("on", 38) : i > f.height() && o("on", 40)), "y" !== l.axis && r.overflowed[1] && (0 > c ? o("on", 37) : c > f.width() && o("on", 39)))
            }
          })).bind("mouseup." + d + " dragend." + d, (function ()
          {
            t || (a && (a = 0, o("off", null)), c = !1)
          }))
        },
        L = function ()
        {
          function t(t, n)
          {
            if(U(o), !P(o, t.target))
            {
              var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                d = i.scrollInertia;
              if("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x",
                f = [Math.round(r * a.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
                h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0],
                m = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetLeft),
                p = c[1][0].offsetLeft,
                g = c[1].parent().width() - c[1].width(),
                v = "y" === i.mouseWheel.axis ? t.deltaY || n : t.deltaX;
              else u = "y", f = [Math.round(r * a.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)], h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0], m = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetTop), p = c[0][0].offsetTop, g = c[0].parent().height() - c[0].height(), v = t.deltaY || n;
              "y" === u && !a.overflowed[0] || "x" === u && !a.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), N(o, (m - v * h).toString(),
              {
                dir: u,
                dur: d
              }))
            }
          }
          if(e(this).data(n))
          {
            var o = e(this),
              a = o.data(n),
              i = a.opt,
              r = n + "_" + a.idx,
              l = e("#mCSB_" + a.idx),
              c = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")],
              d = e("#mCSB_" + a.idx + "_container").find("iframe");
            d.length && d.each((function ()
            {
              e(this).bind("load", (function ()
              {
                R(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, (function (e, o)
                {
                  t(e, o)
                }))
              }))
            })), l.bind("mousewheel." + r, (function (e, o)
            {
              t(e, o)
            }))
          }
        },
        z = new Object,
        R = function (t)
        {
          var o = !1,
            n = !1,
            a = null;
          if(void 0 === t ? n = "#empty" : void 0 !== e(t).attr("id") && (n = e(t).attr("id")), !1 !== n && void 0 !== z[n]) return z[n];
          if(t)
          {
            try
            {
              a = (t.contentDocument || t.contentWindow.document).body.innerHTML
            }
            catch (e)
            {}
            o = null !== a
          }
          else
          {
            try
            {
              a = top.document.body.innerHTML
            }
            catch (e)
            {}
            o = null !== a
          }
          return !1 !== n && (z[n] = o), o
        },
        E = function (e)
        {
          var t = this.find("iframe");
          if(t.length)
          {
            var o = e ? "auto" : "none";
            t.css("pointer-events", o)
          }
        },
        P = function (t, o)
        {
          var a = o.nodeName.toLowerCase(),
            i = t.data(n).opt.mouseWheel.disableOver;
          return e.inArray(a, i) > -1 && !(e.inArray(a, ["select", "textarea"]) > -1 && !e(o).is(":focus"))
        },
        W = function ()
        {
          var t, o = e(this),
            a = o.data(n),
            i = n + "_" + a.idx,
            r = e("#mCSB_" + a.idx + "_container"),
            l = r.parent();
          e(".mCSB_" + a.idx + "_scrollbar ." + d[12]).bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, (function (o)
          {
            c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1)
          })).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, (function ()
          {
            c = !1
          })).bind("click." + i, (function (n)
          {
            if(t && (t = 0, e(n.target).hasClass(d[12]) || e(n.target).hasClass("mCSB_draggerRail")))
            {
              U(o);
              var i = e(this),
                s = i.find(".mCSB_dragger");
              if(i.parent(".mCSB_scrollTools_horizontal").length > 0)
              {
                if(!a.overflowed[1]) return;
                var c = "x",
                  u = n.pageX > s.offset().left ? -1 : 1,
                  f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
              }
              else
              {
                if(!a.overflowed[0]) return;
                c = "y", u = n.pageY > s.offset().top ? -1 : 1, f = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
              }
              N(o, f.toString(),
              {
                dir: c,
                scrollEasing: "mcsEaseInOut"
              })
            }
          }))
        },
        H = function ()
        {
          var t = e(this),
            o = t.data(n),
            a = o.opt,
            i = n + "_" + o.idx,
            r = e("#mCSB_" + o.idx + "_container"),
            l = r.parent();
          r.bind("focusin." + i, (function ()
          {
            var o = e(document.activeElement),
              n = r.find(".mCustomScrollBox").length;
            o.is(a.advanced.autoScrollOnFocus) && (U(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = n ? 17 * n : 0, t[0]._focusTimeout = setTimeout((function ()
            {
              var e = [oe(o)[0], oe(o)[1]],
                n = [r[0].offsetTop, r[0].offsetLeft],
                i = [n[0] + e[0] >= 0 && n[0] + e[0] < l.height() - o.outerHeight(!1), n[1] + e[1] >= 0 && n[0] + e[1] < l.width() - o.outerWidth(!1)],
                s = "yx" !== a.axis || i[0] || i[1] ? "all" : "none";
              "x" === a.axis || i[0] || N(t, e[0].toString(),
              {
                dir: "y",
                scrollEasing: "mcsEaseInOut",
                overwrite: s,
                dur: 0
              }), "y" === a.axis || i[1] || N(t, e[1].toString(),
              {
                dir: "x",
                scrollEasing: "mcsEaseInOut",
                overwrite: s,
                dur: 0
              })
            }), t[0]._focusTimer))
          }))
        },
        $ = function ()
        {
          var t = e(this).data(n),
            o = n + "_" + t.idx,
            a = e("#mCSB_" + t.idx + "_container").parent();
          a.bind("scroll." + o, (function ()
          {
            0 === a.scrollTop() && 0 === a.scrollLeft() || e(".mCSB_" + t.idx + "_scrollbar").css("visibility", "hidden")
          }))
        },
        j = function ()
        {
          var t = e(this),
            o = t.data(n),
            a = o.opt,
            i = o.sequential,
            r = n + "_" + o.idx,
            l = ".mCSB_" + o.idx + "_scrollbar";
          e(l + ">a").bind("contextmenu." + r, (function (e)
          {
            e.preventDefault()
          })).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, (function (n)
          {
            function r(e, o)
            {
              i.scrollAmount = a.scrollButtons.scrollAmount, X(t, e, o)
            }
            if(n.preventDefault(), K(n))
            {
              var l = e(this).attr("class");
              switch (i.type = a.scrollButtons.scrollType, n.type)
              {
              case "mousedown":
              case "touchstart":
              case "pointerdown":
              case "MSPointerDown":
                if("stepped" === i.type) return;
                c = !0, o.tweenRunning = !1, r("on", l);
                break;
              case "mouseup":
              case "touchend":
              case "pointerup":
              case "MSPointerUp":
              case "mouseout":
              case "pointerout":
              case "MSPointerOut":
                if("stepped" === i.type) return;
                c = !1, i.dir && r("off", l);
                break;
              case "click":
                if("stepped" !== i.type || o.tweenRunning) return;
                r("on", l)
              }
            }
          }))
        },
        F = function ()
        {
          function t(t)
          {
            function n(e, t)
            {
              r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && a.tweenRunning || X(o, e, t)
            }
            switch (t.type)
            {
            case "blur":
              a.tweenRunning && r.dir && n("off", null);
              break;
            case "keydown":
            case "keyup":
              var l = t.keyCode ? t.keyCode : t.which,
                s = "on";
              if("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l))
              {
                if((38 === l || 40 === l) && !a.overflowed[0] || (37 === l || 39 === l) && !a.overflowed[1]) return;
                "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), n(s, l))
              }
              else if(33 === l || 34 === l)
              {
                if((a.overflowed[0] || a.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)
                {
                  U(o);
                  var f = 34 === l ? -1 : 1;
                  if("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0]) var h = "x",
                    m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());
                  else h = "y", m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                  N(o, m.toString(),
                  {
                    dir: h,
                    scrollEasing: "mcsEaseInOut"
                  })
                }
              }
              else 35 !== l && 36 !== l || e(document.activeElement).is(u) || ((a.overflowed[0] || a.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" !== t.type) || ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0] ? (h = "x", m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0) : (h = "y", m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0), N(o, m.toString(),
              {
                dir: h,
                scrollEasing: "mcsEaseInOut"
              }))
            }
          }
          var o = e(this),
            a = o.data(n),
            i = a.opt,
            r = a.sequential,
            l = n + "_" + a.idx,
            s = e("#mCSB_" + a.idx),
            c = e("#mCSB_" + a.idx + "_container"),
            d = c.parent(),
            u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
            f = c.find("iframe"),
            h = ["blur." + l + " keydown." + l + " keyup." + l];
          f.length && f.each((function ()
          {
            e(this).bind("load", (function ()
            {
              R(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], (function (e)
              {
                t(e)
              }))
            }))
          })), s.attr("tabindex", "0").bind(h[0], (function (e)
          {
            t(e)
          }))
        },
        X = function (t, o, a, i, r)
        {
          function l(e)
          {
            c.snapAmount && (u.scrollAmount = c.snapAmount instanceof Array ? "x" === u.dir[0] ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount);
            var o = "stepped" !== u.type,
              n = r || (e ? o ? m / 1.5 : p : 1e3 / 60),
              a = e ? o ? 7.5 : 40 : 2.5,
              d = [Math.abs(f[0].offsetTop), Math.abs(f[0].offsetLeft)],
              h = [s.scrollRatio.y > 10 ? 10 : s.scrollRatio.y, s.scrollRatio.x > 10 ? 10 : s.scrollRatio.x],
              g = "x" === u.dir[0] ? d[1] + u.dir[1] * (h[1] * a) : d[0] + u.dir[1] * (h[0] * a),
              v = "x" === u.dir[0] ? d[1] + u.dir[1] * parseInt(u.scrollAmount) : d[0] + u.dir[1] * parseInt(u.scrollAmount),
              w = "auto" !== u.scrollAmount ? v : g,
              x = i || (e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
              b = !!e;
            return e && 17 > n && (w = "x" === u.dir[0] ? d[1] : d[0]), N(t, w.toString(),
            {
              dir: u.dir[0],
              scrollEasing: x,
              dur: n,
              onComplete: b
            }), e ? void(u.dir = !1) : (clearTimeout(u.step), void(u.step = setTimeout((function ()
            {
              l()
            }), n)))
          }
          var s = t.data(n),
            c = s.opt,
            u = s.sequential,
            f = e("#mCSB_" + s.idx + "_container"),
            h = "stepped" === u.type,
            m = c.scrollInertia < 26 ? 26 : c.scrollInertia,
            p = c.scrollInertia < 1 ? 17 : c.scrollInertia;
          switch (o)
          {
          case "on":
            if(u.dir = [a === d[16] || a === d[15] || 39 === a || 37 === a ? "x" : "y", a === d[13] || a === d[15] || 38 === a || 37 === a ? -1 : 1], U(t), te(a) && "stepped" === u.type) return;
            l(h);
            break;
          case "off":
            clearTimeout(u.step), J(u, "step"), U(t), (h || s.tweenRunning && u.dir) && l(!0)
          }
        },
        Y = function (t)
        {
          var o = e(this).data(n).opt,
            a = [];
          return "function" == typeof t && (t = t()), t instanceof Array ? a = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (a[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, a[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof a[0] && (a[0] = a[0]()), "function" == typeof a[1] && (a[1] = a[1]()), a
        },
        q = function (t, o)
        {
          if(null != t && void 0 !== t)
          {
            var a = e(this),
              i = a.data(n),
              r = i.opt,
              l = e("#mCSB_" + i.idx + "_container"),
              s = l.parent(),
              c = typeof t;
            o || (o = "x" === r.axis ? "x" : "y");
            var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
              f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
              h = "x" === o ? "left" : "top";
            switch (c)
            {
            case "function":
              return t();
            case "object":
              if(!(p = t.jquery ? t : e(t)).length) return;
              return "x" === o ? oe(p)[1] : oe(p)[0];
            case "string":
            case "number":
              if(te(t)) return Math.abs(t);
              if(-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
              if(-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));
              if(-1 !== t.indexOf("+="))
              {
                var m = f + parseInt(t.split("+=")[1]);
                return m >= 0 ? 0 : Math.abs(m)
              }
              if(-1 !== t.indexOf("px") && te(t.split("px")[0])) return Math.abs(t.split("px")[0]);
              if("top" === t || "left" === t) return 0;
              if("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
              if("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
              if("first" === t || "last" === t)
              {
                var p = l.find(":" + t);
                return "x" === o ? oe(p)[1] : oe(p)[0]
              }
              return e(t).length ? "x" === o ? oe(e(t))[1] : oe(e(t))[0] : (l.css(h, t), void u.update.call(null, a[0]))
            }
          }
        },
        V = function (t)
        {
          function o(e)
          {
            clearTimeout(l[0].autoUpdate), u.update.call(null, a[0], e)
          }
          var a = e(this),
            i = a.data(n),
            r = i.opt,
            l = e("#mCSB_" + i.idx + "_container");
          return t ? (clearTimeout(l[0].autoUpdate), void J(l[0], "autoUpdate")) : void
          function t()
          {
            return clearTimeout(l[0].autoUpdate), 0 === a.parents("html").length ? void(a = null) : void(l[0].autoUpdate = setTimeout((function ()
            {
              return r.advanced.updateOnSelectorChange && (i.poll.change.n = function ()
              {
                !0 === r.advanced.updateOnSelectorChange && (r.advanced.updateOnSelectorChange = "*");
                var e = 0,
                  t = l.find(r.advanced.updateOnSelectorChange);
                return r.advanced.updateOnSelectorChange && t.length > 0 && t.each((function ()
                {
                  e += this.offsetHeight + this.offsetWidth
                })), e
              }(), i.poll.change.n !== i.poll.change.o) ? (i.poll.change.o = i.poll.change.n, void o(3)) : r.advanced.updateOnContentResize && (i.poll.size.n = a[0].scrollHeight + a[0].scrollWidth + l[0].offsetHeight + a[0].offsetHeight + a[0].offsetWidth, i.poll.size.n !== i.poll.size.o) ? (i.poll.size.o = i.poll.size.n, void o(1)) : !r.advanced.updateOnImageLoad || "auto" === r.advanced.updateOnImageLoad && "y" === r.axis || (i.poll.img.n = l.find("img").length, i.poll.img.n === i.poll.img.o) ? void((r.advanced.updateOnSelectorChange || r.advanced.updateOnContentResize || r.advanced.updateOnImageLoad) && t()) : (i.poll.img.o = i.poll.img.n, void l.find("img").each((function ()
              {
                ! function (t)
                {
                  if(e(t).hasClass(d[2])) o();
                  else
                  {
                    var n = new Image;
                    n.onload = function (e, t)
                    {
                      return function ()
                      {
                        return t.apply(e, arguments)
                      }
                    }(n, (function ()
                    {
                      this.onload = null, e(t).addClass(d[2]), o(2)
                    })), n.src = t.src
                  }
                }(this)
              })))
            }), r.advanced.autoUpdateTimeout))
          }()
        },
        U = function (t)
        {
          var o = t.data(n);
          e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal").each((function ()
          {
            G.call(this)
          }))
        },
        N = function (t, o, a)
        {
          function i(e)
          {
            return l && s.callbacks[e] && "function" == typeof s.callbacks[e]
          }

          function r()
          {
            var e = [f[0].offsetTop, f[0].offsetLeft],
              o = [g[0].offsetTop, g[0].offsetLeft],
              n = [f.outerHeight(!1), f.outerWidth(!1)],
              i = [u.height(), u.width()];
            t[0].mcs = {
              content: f,
              top: e[0],
              left: e[1],
              draggerTop: o[0],
              draggerLeft: o[1],
              topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - i[0])),
              leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - i[1])),
              direction: a.dir
            }
          }
          var l = t.data(n),
            s = l.opt,
            c = {
              trigger: "internal",
              dir: "y",
              scrollEasing: "mcsEaseOut",
              drag: !1,
              dur: s.scrollInertia,
              overwrite: "all",
              callbacks: !0,
              onStart: !0,
              onUpdate: !0,
              onComplete: !0
            },
            d = [(a = e.extend(c, a)).dur, a.drag ? 0 : a.dur],
            u = e("#mCSB_" + l.idx),
            f = e("#mCSB_" + l.idx + "_container"),
            h = f.parent(),
            m = s.callbacks.onTotalScrollOffset ? Y.call(t, s.callbacks.onTotalScrollOffset) : [0, 0],
            p = s.callbacks.onTotalScrollBackOffset ? Y.call(t, s.callbacks.onTotalScrollBackOffset) : [0, 0];
          if(l.trigger = a.trigger, 0 === h.scrollTop() && 0 === h.scrollLeft() || (e(".mCSB_" + l.idx + "_scrollbar").css("visibility", "visible"), h.scrollTop(0).scrollLeft(0)), "_resetY" !== o || l.contentReset.y || (i("onOverflowYNone") && s.callbacks.onOverflowYNone.call(t[0]), l.contentReset.y = 1), "_resetX" !== o || l.contentReset.x || (i("onOverflowXNone") && s.callbacks.onOverflowXNone.call(t[0]), l.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o)
          {
            switch (!l.contentReset.y && t[0].mcs || !l.overflowed[0] || (i("onOverflowY") && s.callbacks.onOverflowY.call(t[0]), l.contentReset.x = null), !l.contentReset.x && t[0].mcs || !l.overflowed[1] || (i("onOverflowX") && s.callbacks.onOverflowX.call(t[0]), l.contentReset.x = null), s.snapAmount && (o = function (e, t, o)
            {
              return Math.round(e / t) * t - o
            }(o, s.snapAmount instanceof Array ? "x" === a.dir ? s.snapAmount[1] : s.snapAmount[0] : s.snapAmount, s.snapOffset)), a.dir)
            {
            case "x":
              var g = e("#mCSB_" + l.idx + "_dragger_horizontal"),
                v = "left",
                w = f[0].offsetLeft,
                x = [u.width() - f.outerWidth(!1), g.parent().width() - g.width()],
                b = [o, 0 === o ? 0 : o / l.scrollRatio.x],
                S = m[1],
                _ = p[1],
                y = S > 0 ? S / l.scrollRatio.x : 0,
                k = _ > 0 ? _ / l.scrollRatio.x : 0;
              break;
            case "y":
              g = e("#mCSB_" + l.idx + "_dragger_vertical"), v = "top", w = f[0].offsetTop, x = [u.height() - f.outerHeight(!1), g.parent().height() - g.height()], b = [o, 0 === o ? 0 : o / l.scrollRatio.y], S = m[0], _ = p[0], y = S > 0 ? S / l.scrollRatio.y : 0, k = _ > 0 ? _ / l.scrollRatio.y : 0
            }
            b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= x[1] ? b = [x[0], x[1]] : b[0] = -b[0], t[0].mcs || (r(), i("onInit") && s.callbacks.onInit.call(t[0])), clearTimeout(f[0].onCompleteTimeout), Q(g[0], v, Math.round(b[1]), d[1], a.scrollEasing), !l.tweenRunning && (0 === w && b[0] >= 0 || w === x[0] && b[0] <= x[0]) || Q(f[0], v, Math.round(b[0]), d[0], a.scrollEasing, a.overwrite,
            {
              onStart: function ()
              {
                a.callbacks && a.onStart && !l.tweenRunning && (i("onScrollStart") && (r(), s.callbacks.onScrollStart.call(t[0])), l.tweenRunning = !0, C(g), l.cbOffsets = [s.callbacks.alwaysTriggerOffsets || w >= x[0] + S, s.callbacks.alwaysTriggerOffsets || -_ >= w])
              },
              onUpdate: function ()
              {
                a.callbacks && a.onUpdate && i("whileScrolling") && (r(), s.callbacks.whileScrolling.call(t[0]))
              },
              onComplete: function ()
              {
                if(a.callbacks && a.onComplete)
                {
                  "yx" === s.axis && clearTimeout(f[0].onCompleteTimeout);
                  var e = f[0].idleTimer || 0;
                  f[0].onCompleteTimeout = setTimeout((function ()
                  {
                    i("onScroll") && (r(), s.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= x[1] - y && l.cbOffsets[0] && (r(), s.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= k && l.cbOffsets[1] && (r(), s.callbacks.onTotalScrollBack.call(t[0])), l.tweenRunning = !1, f[0].idleTimer = 0, C(g, "hide")
                  }), e)
                }
              }
            })
          }
        },
        Q = function (e, t, o, n, a, i, r)
        {
          function l()
          {
            w.stop || (p || u.call(), p = Z() - m, s(), p >= w.time && (w.time = p > w.time ? p + c - (p - w.time) : p + c - 1, w.time < p + 1 && (w.time = p + 1)), w.time < n ? w.id = d(l) : h.call())
          }

          function s()
          {
            n > 0 ? (w.currVal = function (e, t, o, n, a)
            {
              switch (a)
              {
              case "linear":
              case "mcsLinear":
                return o * e / n + t;
              case "mcsLinearOut":
                return e /= n, e--, o * Math.sqrt(1 - e * e) + t;
              case "easeInOutSmooth":
                return 1 > (e /= n / 2) ? o / 2 * e * e + t : -o / 2 * (--e * (e - 2) - 1) + t;
              case "easeInOutStrong":
                return 1 > (e /= n / 2) ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (2 - Math.pow(2, -10 * e)) + t);
              case "easeInOut":
              case "mcsEaseInOut":
                return 1 > (e /= n / 2) ? o / 2 * e * e * e + t : o / 2 * ((e -= 2) * e * e + 2) + t;
              case "easeOutSmooth":
                return e /= n, -o * (--e * e * e * e - 1) + t;
              case "easeOutStrong":
                return o * (1 - Math.pow(2, -10 * e / n)) + t;
              case "easeOut":
              case "mcsEaseOut":
              default:
                var i = (e /= n) * e,
                  r = i * e;
                return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
              }
            }(w.time, g, x, n, a), v[t] = Math.round(w.currVal) + "px") : v[t] = o + "px", f.call()
          }
          e._mTween || (e._mTween = {
            top:
            {},
            left:
            {}
          });
          var c, d, u = (r = r ||
            {}).onStart || function () {},
            f = r.onUpdate || function () {},
            h = r.onComplete || function () {},
            m = Z(),
            p = 0,
            g = e.offsetTop,
            v = e.style,
            w = e._mTween[t];
          "left" === t && (g = e.offsetLeft);
          var x = o - g;
          w.stop = 0, "none" !== i && null != w.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(w.id) : clearTimeout(w.id), w.id = null), c = 1e3 / 60, w.time = p + c, d = window.requestAnimationFrame ? window.requestAnimationFrame : function (e)
          {
            return s(), setTimeout(e, .01)
          }, w.id = d(l)
        },
        Z = function ()
        {
          return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        },
        G = function ()
        {
          var e = this;
          e._mTween || (e._mTween = {
            top:
            {},
            left:
            {}
          });
          for(var t = ["top", "left"], o = 0; o < t.length; o++)
          {
            var n = t[o];
            e._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[n].id) : clearTimeout(e._mTween[n].id), e._mTween[n].id = null, e._mTween[n].stop = 1)
          }
        },
        J = function (e, t)
        {
          try
          {
            delete e[t]
          }
          catch (o)
          {
            e[t] = null
          }
        },
        K = function (e)
        {
          return !(e.which && 1 !== e.which)
        },
        ee = function (e)
        {
          var t = e.originalEvent.pointerType;
          return !(t && "touch" !== t && 2 !== t)
        },
        te = function (e)
        {
          return !isNaN(parseFloat(e)) && isFinite(e)
        },
        oe = function (e)
        {
          var t = e.parents(".mCSB_container");
          return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
        },
        ne = function ()
        {
          var e = function ()
          {
            var e = ["webkit", "moz", "ms", "o"];
            if("hidden" in document) return "hidden";
            for(var t = 0; t < e.length; t++)
              if(e[t] + "Hidden" in document) return e[t] + "Hidden";
            return null
          }();
          return !!e && document[e]
        };
      e.fn[o] = function (t)
      {
        return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
      }, e[o] = function (t)
      {
        return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
      }, e[o].defaults = i, window[o] = !0, e(window).bind("load", (function ()
      {
        e(a)[o](), e.extend(e.expr[":"],
        {
          mcsInView: e.expr[":"].mcsInView || function (t)
          {
            var o, n, a = e(t),
              i = a.parents(".mCSB_container");
            if(i.length) return o = i.parent(), (n = [i[0].offsetTop, i[0].offsetLeft])[0] + oe(a)[0] >= 0 && n[0] + oe(a)[0] < o.height() - a.outerHeight(!1) && n[1] + oe(a)[1] >= 0 && n[1] + oe(a)[1] < o.width() - a.outerWidth(!1)
          },
          mcsInSight: e.expr[":"].mcsInSight || function (t, o, n)
          {
            var a, i, r, l, s = e(t),
              c = s.parents(".mCSB_container"),
              d = "exact" === n[3] ? [[1, 0], [1, 0]] : [[.9, .1], [.6, .4]];
            if(c.length) return a = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + oe(s)[0], c[0].offsetLeft + oe(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [a[0] < i[0] ? d[0] : d[1], a[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + a[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + a[1] - i[1] * l[1][1] >= 0
          },
          mcsOverflow: e.expr[":"].mcsOverflow || function (t)
          {
            var o = e(t).data(n);
            if(o) return o.overflowed[0] || o.overflowed[1]
          }
        })
      }))
    }()
})),
function (e)
{
  e.fn.beforeAfter = function ()
  {
    var t = this,
      o = t.width() + "px";
    t.find(".resize img").css("width", o),
      function (t, o, n)
      {
        t.on("mousedown.ba-events touchstart.ba-events", (function (a)
        {
          t.addClass("ba-draggable"), o.addClass("ba-resizable");
          var i = a.pageX ? a.pageX : a.originalEvent.touches[0].pageX,
            r = t.outerWidth(),
            l = t.offset().left + r - i,
            s = n.offset().left,
            c = n.outerWidth();
          minLeft = s + 10, maxLeft = s + c - r - 10, t.parents().on("mousemove.ba-events touchmove.ba-events", (function (t)
          {
            var o = t.pageX ? t.pageX : t.originalEvent.touches[0].pageX;
            leftValue = o + l - r, leftValue < minLeft ? leftValue = minLeft : leftValue > maxLeft && (leftValue = maxLeft), widthValue = 100 * (leftValue + r / 2 - s) / c + "%", e(".ba-draggable").css("left", widthValue), e(".ba-resizable").css("width", widthValue)
          })).on("mouseup.ba-events touchend.ba-events touchcancel.ba-events", (function ()
          {
            t.removeClass("ba-draggable"), o.removeClass("ba-resizable"), e(this).off(".ba-events")
          })), a.preventDefault()
        }))
      }(t.find(".handle"), t.find(".resize"), t), e(window).resize((function ()
      {
        var e = t.width() + "px";
        t.find(".resize img").css("width", e)
      }))
  }
}(jQuery),
function (e)
{
  e.fn.autoResize = function (t)
  {
    var o = e.extend(
    {
      onResize: function () {},
      animate: !0,
      animateDuration: 150,
      animateCallback: function () {},
      extraSpace: 20,
      limit: 1e3
    }, t);
    return this.filter("textarea").each((function ()
    {
      var t, n = e(this).css(
        {
          resize: "none",
          "overflow-y": "hidden"
        }),
        a = n.height(),
        i = (t = {}, e.each(["height", "width", "lineHeight", "textDecoration", "letterSpacing"], (function (e, o)
        {
          t[o] = n.css(o)
        })), n.clone().removeAttr("id").removeAttr("name").css(
        {
          position: "absolute",
          top: 0,
          left: -9999
        }).css(t).attr("tabIndex", "-1").insertBefore(n)),
        r = null,
        l = function ()
        {
          i.height(0).val(e(this).val()).scrollTop(1e4);
          var t = Math.max(i.scrollTop(), a) + o.extraSpace,
            l = e(this).add(i);
          r !== t && (r = t, t >= o.limit ? e(this).css("overflow-y", "") : (o.onResize.call(this), o.animate && "block" === n.css("display") ? l.stop().animate(
          {
            height: t
          }, o.animateDuration, o.animateCallback) : l.height(t)))
        };
      n.unbind(".dynSiz").bind("keyup.dynSiz", l).bind("keydown.dynSiz", l).bind("change.dynSiz", l)
    })), this
  }
}(jQuery), $(document).ready((function ()
{
  $(".ba-slider").beforeAfter();
  new Swiper(".autors-autor",
  {
    paginationClickable: !0,
    spaceBetween: 30,
    navigation:
    {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  }), new Swiper(".autors-photo",
  {
    paginationClickable: !0,
    spaceBetween: 30,
    navigation:
    {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  }), new Swiper(".autors-expert",
  {
    paginationClickable: !0,
    spaceBetween: 30,
    navigation:
    {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  }), new Swiper(".slider-page",
  {
    speed: 400,
    loop: !0,
    navigation:
    {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination:
    {
      el: ".swiper-pagination"
    }
  });
  $(".page-title-bar").scroolly([
  {
    to: "con-top",
    css:
    {
      position: "fixed",
      top: "0",
      right: "-85px",
      opacity: "0",
      transition: "all 300ms ease-out",
    }
  },
  {
    from: "con-top",
    css:
    {
      position: "fixed",
      top: "0",
      right: "0",
      opacity: "1",
      transition: "all 300ms ease-in",
    }
  }], $(".page-autors, .fx-t")), setTimeout((function ()
  {
    $(".marquee").liMarquee(
    {
      loop: -1,
      drag: !1,
      runshort: !0,
      hoverstop: !0,
      inverthover: !0
    })
  }), 500), $(".popup-slider-gallery").magnificPopup(
  {
    delegate: "a",
    type: "image",
    tLoading: "Загрузка фото #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery:
    {
      enabled: !0,
      navigateByImgClick: !0,
      preload: [0, 1]
    },
    image:
    {
      verticalFit: !0,
      tError: '<a href="%url%">Фото #%curr%</a> не наденно.',
      titleSrc: function (e)
      {
        var t = e.el.attr("href");
        return e.el.attr("alt") + '<a class="mfp-download tooltip-left" href="' + t + '" title="Скачать" download></a>'
      }
    },
    callbacks:
    {
      open: function ()
      {
        $.getScript("/static/js/jquery_desktop.js"), $(".tooltip-left").tooltipster(
        {
          contentAsHTML: !0,
          position: "left",
          theme: "black"
        })
      }
    }
  }), 
  $('.cover-photo').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	})

  ,$(".page-photo").magnificPopup(
  {
    delegate: "a",
    type: "image",
    tLoading: "Загрузка фото #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery:
    {
      enabled: !0,
      navigateByImgClick: !0,
      preload: [0, 1]
    },
    image:
    {
      verticalFit: !0,
      tError: '<a href="%url%">Фото #%curr%</a> не наденно.',
      titleSrc: function (e)
      {
        var t = e.el.attr("href");
        return e.el.attr("alt") + '<a class="mfp-download tooltip-left" href="' + t + '" title="Скачать" download></a>'
      }
    },
    callbacks:
    {
      open: function ()
      {
        $.getScript("/static/js/jquery_desktop.js"), $(".tooltip-left").tooltipster(
        {
          contentAsHTML: !0,
          position: "left",
          theme: "black"
        })
      }
    }
  });
  $(".more").each((function ()
  {
    var e = $(this).html();
    if(e.length > 420)
    {
      var t = e.substr(0, 420) + '<span class="morecontent"><span>' + e.substr(419, e.length - 420) + '</span><a href="" class="morelink"><p>Читать далее</p></a></span>';
      $(this).html(t)
    }
  })), $(".morelink").click((function ()
  {
    return $(this).hasClass("less active") ? ($(this).removeClass("less active"), $(this).html("<p>Читать далее</p>")) : ($(this).addClass("less active"), $(this).html("<p>Скрыть</p>")), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1
  })), $(".page-photo").each((function ()
  {
    var e = $(this).children("a").size();
    1 == e && $(this).addClass("p-1"), 2 == e && $(this).addClass("p-2"), 3 == e && $(this).addClass("p-3"), 4 == e && $(this).addClass("p-4"), e >= 5 && ($(this).addClass("sliderBox"), $(".sliderBox").slick(
    {
      dots: !0,
      infinite: !0,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: !0
    }))
  })), $(".page-photo a img").each((function ()
  {
    var e = $(this).attr("alt"),
      t = $(this);
    e && (e = t.attr("alt"), t.after($("<p>").text(e)))
  })), $(".page-content-sidebar img").each((function ()
  {
    var e = $(this).attr("alt"),
      t = $(this);
    e && (e = t.attr("alt"), t.after($("<span>").text(e)))
  })), $(".table-scroll").mCustomScrollbar(
  {
    horizontalScroll: !0,
    mouseWheel: !0,
    theme: "dark"
  }), $("p.quote").each((function (e)
  {
    $(this).text().length < 50 && $(this).addClass("center")
  })), $(".slider-page a").each((function ()
  {
    $("#img").clone().addClass("blur").appendTo(".slider-page a")
  })), $("body").on("click", ".js-subs", (function ()
  {
    $(this).addClass("active"), $(this).tooltipster("content", "Вы подписаны")
  })), 
  $(".page-copy").tabslet(
    {
      mouseevent: "click",
      attribute: "href",
      animation: !0
    }),
  $("body").on("click", ".js-subs.active", (function ()
  {
    $(this).removeClass("active"), $(this).tooltipster("content", "Все статьи автора — в вашем ящике")
  })), $("textarea").autoResize(), $(".mail .page-content h2.ar").prepend('<span class="ar tooltip" title="Комментарии с сайта Авторевю"></span>'), $(".mail .page-content h2.mail").prepend('<span class="mail tooltip" title="Письма в редакцию"></span>'), $(".mail .page-content h2.like").prepend('<span class="like tooltip" title="Победитель Эпистолярия"></span>'), $(".mail .page-content h2.vk").prepend('<span class="vk tooltip" title="Комментарии с Вконтакте"></span>'), $(".mail .page-content h2.fb").prepend('<span class="fb tooltip" title="Комментарии с Facebook"></span>'), $(".mail .page-content h2.tw").prepend('<span class="tw tooltip" title="Комментарии с Twitter"></span>'), $(".mail .page-content h2.in").prepend('<span class="in tooltip" title="Комментарии с Instagram"></span>'), $(".mail .page-content h2.yt").prepend('<span class="yt tooltip" title="Комментарии с Youtube"></span>')
}));

$(document).ready(function(){

  $('.autors-autors, .autors-photos, .autors-experts').slick({
    dots: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
		variableWidth: true,
		infinite: false,
    arrows: true,
    centerMode: false,
	});
});
