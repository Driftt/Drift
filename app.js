(function(){

  var options = INSTALL_OPTIONS;
  var isPreview = INSTALL_ID == "preview";

  options.embedId = options.embedId || "d47y62ynnhpg";

  if (!options.embedId) {
    return;
  }

  (function(t) {
      function e(r) {
          if (o[r]) return o[r].exports;
          var n = o[r] = {
              exports: {},
              id: r,
              loaded: !1
          };
          return t[r].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
      }
      var o = {};
      return e.m = t, e.c = o, e.p = "", e(0)
  })([function(t, e) {
      ! function() {
          var t;
          return t = window.driftt = window.driftt || [], t.init ? void 0 : t.invoked ? void(window.console && console.error && console.error("Driftt snippet included twice.")) : (t.invoked = !0, t.methods = ["identify", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"], t.factory = function(e) {
              return function() {
                  var o;
                  return o = Array.prototype.slice.call(arguments), o.unshift(e), t.push(o), t
              }
          }, t.methods.forEach(function(e) {
              t[e] = t.factory(e)
          }), t.load = function() {
              var t, e, o, r;
              t = 3e5, r = Math.ceil(new Date / t) * t, o = document.createElement("script"), o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + r + "/" + options.embedId + ".js", e = document.getElementsByTagName("script")[0], e.parentNode.insertBefore(o, e)
          }, t.SNIPPET_VERSION = "0.1.0", t.load())
      }()
  }]);

})();
