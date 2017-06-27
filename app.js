'use strict';

(function(){
  
  var defaultOptions = {
    'orgName': 'Your Company',
    'activeColor': '#2d88f3',
    'backgroundColor': '#2d88f3',
    'foregroundColor': '#ffffff',
    'welcomeMessage': 'Thank you for visiting! How can I help?',
    'awayMessage': 'We’re not currently online right now but if you leave a message, we’ll get back to you as soon as possible!',
    'autoOpen': false
  }

  var getOptions = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
      }
    var isEmpty = JSON.stringify(obj) === JSON.stringify({});

    return isEmpty ? defaultOptions : INSTALL_OPTIONS
  }

  var config = {};
  var options = getOptions();
  var isPreview = INSTALL_ID == "preview";

  if (isPreview && (!options || !options.embedId))
    options.embedId = "f6r6234aekhz";

  if (!options || !options.embedId) {
    return;
  }

  var loadConfiguration = function(cb){
    var embedId = options.embedId || "f6r6234aekhz";

    var xhr = new XMLHttpRequest;
    xhr.open('GET', "https://customer.api.drift.com/embeds/" + embedId, true);
    xhr.onload = function(){
      var response = JSON.parse(xhr.response);
      response.configuration && cb(response.configuration);
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
    var ensureHex = function(color) {
      if (!color) return '#fff'

      var isValid = color[0] === '#'
      var updatedString = '#' + color

      return isValid ? color : updatedString
    }

    options = opts;

    config.backgroundColor = ensureHex(options.backgroundColor);
    config.foregroundColor = ensureHex(options.foregroundColor);
    config.activeColor = ensureHex(options.activeColor);
    
    config.messages = config.messages || {}
    config.messages.welcomeMessage = (!!options.welcomeMessage && options.welcomeMessage.length) ? options.welcomeMessage : " ";
    config.messages.awayMessage = (!!options.awayMessage && options.awayMessage.length) ? options.awayMessage : " ";

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

  !function () {
    // Create a queue, but don't obliterate an existing one!
    var driftt = window.driftt = window.drift = window.driftt || [];

    // If the real driftt.js is already on the page return.
    if (driftt.init) {
      return;
    }

    // If the snippet was invoked already show an error.
    if (driftt.invoked) {
      if (window.console && console.error) {
        console.error('Drift snippet included twice.');
      }
      return;
    }

    // Invoked flag, to make sure the snippet is never invoked twice.
    driftt.invoked = true;

    // A list of the methods in driftt.js to stub.
    driftt.methods = ['identify', 'config', 'track', 'reset', 'debug', 'show', 'ping', 'page', 'hide', 'off', 'on'];

    // Define a factory to create stubs. These are placeholders
    // for methods in driftt.js so that you never have to wait
    // for it to load to actually record data. The `method` is
    // stored as the first argument, so we can replay the data.
    driftt.factory = function (method) {
      return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        driftt.push(args);
        return driftt;
      };
    };

    // For each of our methods, generate a queueing stub.
    driftt.methods.forEach(function (key) {
      driftt[key] = driftt.factory(key);
    });

    // Define a method to load driftt.js from our CDN,
    // and that will be sure to only ever load it once.
    return driftt.load = function (embedId) {
      var REFRESH_RATE = 300000;
      var timeHash = Math.ceil(new Date() / REFRESH_RATE) * REFRESH_RATE;

      // Create an async script element based on your id
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.crossorigin = 'anonymous';
      script.src = 'https://js.driftt.com/include/' + timeHash + '/' + embedId + '.js';
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };
  }();

  drift.SNIPPET_VERSION = '0.3.1';
  drift.on('ready', function(){
    INSTALL_SCOPE.setOptions && INSTALL_SCOPE.setOptions(options)
  });
  drift.load(options.embedId);
})();
