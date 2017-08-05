/*
 * jsswitch.js
 *
 * original code by SUN Chun-Yen (Hemiola SUN)
 */

Components.utils.import("resource://gre/modules/Services.jsm");

var jsSwitch = {

  jsEnabledLabel : "",
  jsDisabledLabel : "",

  toggleJS : function () {
    Services.prefs.setBoolPref("javascript.enabled", !Services.prefs.getBoolPref("javascript.enabled") );
    this.updateState();
  },

  updateState : function () {
    var jsState = Services.prefs.getBoolPref("javascript.enabled");
    var menu = document.getElementById("jsSwitchMenu");
    var button = document.getElementById("jsSwitchButton");
    var statusButton = document.getElementById("jsSwitchStatusButton");
    if ( menu ) {
      menu.setAttribute("checked", jsState );
    }
    if ( button ) {
      button.setAttribute("enabled", jsState ? "true" : "false" );
      button.label = jsState ? this.jsEnabledLabel : this.jsDisabledLabel;
    }
    if ( statusButton ) {
      statusButton.setAttribute("enabled", jsState ? "true" : "false" );
    }
  },

  updateUI : function () {
    var menuPref = Services.prefs.getBoolPref("extensions.jsswitch.showinmenu");
    var statusbarPref = Services.prefs.getBoolPref("extensions.jsswitch.showinstatusbar");
    var menu = document.getElementById("jsSwitchMenu");
    var statusButton = document.getElementById("jsSwitchStatusButton");
    if ( menu )
      menu.hidden = !menuPref;
    if ( statusButton )
      statusButton.hidden = !statusbarPref;
  },
  
  load : function () {
    let stringsBundle = document.getElementById("jsSwitchStrings");
    jsSwitch.jsEnabledLabel = stringsBundle.getString("javaScriptEnabled");
    jsSwitch.jsDisabledLabel = stringsBundle.getString("javaScriptDisabled");

    jsSwitchPrefObserver.register();
    jsSwitch.updateState();
    jsSwitch.updateUI();
  },
  
  unload : function () {
    jsSwitchPrefObserver.unregister();
  }
}

var jsSwitchPrefObserver =
{
  register: function()
  {
    this._branch = Services.prefs.getBranch("");
    this._branch.QueryInterface(Components.interfaces.nsIPrefBranch);
    this._branch.addObserver("extensions.jsswitch.", this, false);
    this._branch.addObserver("javascript.", this, false);
  },

  unregister: function()
  {
    if (!this._branch) 
      return;
    this._branch.removeObserver("extensions.jsswitch.", this, false);
    this._branch.removeObserver("javascript.", this, false);
  },

  observe: function(aSubject, aTopic, aData)
  {
    if (aTopic != "nsPref:changed") 
      return;

    switch (aData) {
      case "javascript.enabled":
        jsSwitch.updateState();
        break;
      case "extensions.jsswitch.showinstatusbar":
      case "extensions.jsswitch.showinmenu":
        jsSwitch.updateUI();
        break;
    }
  }
}

window.addEventListener("load", jsSwitch.load ,false);
window.addEventListener("unload", jsSwitch.unload ,false);
