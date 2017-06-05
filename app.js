(function(){

  var options = INSTALL_OPTIONS;
  var isPreview = INSTALL_ID == "preview";

  if (isPreview && !options.embedId)
    options.embedId = "f6r6234aekhz";

  if (!options.embedId) {
    return;
  }

  if (isPreview){
    var config = {};
    var loadConfiguration = function(cb){
      var xhr = new XMLHttpRequest;
      xhr.open('GET', "https://customer.api.drift.com/embeds/" + options.embedId, true);
      xhr.onload = function(){
        cb(JSON.parse(xhr.response).configuration);
      };
      xhr.onerror = function(err){
        console.error("Error loading drift config", err);
      };
      xhr.send();
    }

    var writeConfig = function(){
      if (config && window.drift && window.drift.config){
        drift.config(config);

        if (options.autoOpen)
          drift.api.showWelcomeMessage()
      }
    }

    INSTALL_SCOPE.setOptions = function(opts){
      options = opts;

      config.backgroundColor = options.backgroundColor.replace(/^#/, '');
      config.foregroundColor = options.foregroundColor.replace(/^#/, '');
      config.activeColor = options.activeColor.replace(/^#/, '');
      
      config.messages = config.messages || {};
      config.messages.welcomeMessage = options.welcomeMessage;

      config.autoAssignee = config.autoAssignee || {};
      config.autoAssignee.name = options.orgName;

      config.enableWelcomeMessage = options.autoOpen;

      writeConfig()
    }

    INSTALL_SCOPE.updateConfig = function(){
      loadConfiguration(function(conf){
        config = conf;
      });
    }

    INSTALL_SCOPE.updateConfig();
  }

	!function() {
		var t;
		if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0, 
		t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
		t.factory = function(e) {
			return function() {
				var n;
				return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
			};
		}, t.methods.forEach(function(e) {
			t[e] = t.factory(e);
		}), t.load = function(t) {
			var e, n, o, i;
			e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"), 
			o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js", 
			n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
		});
	}();
	drift.SNIPPET_VERSION = '0.3.1';
  drift.on('ready', function(){
    INSTALL_SCOPE.setOptions && INSTALL_SCOPE.setOptions(options)
  });
	drift.load(options.embedId);
})();
