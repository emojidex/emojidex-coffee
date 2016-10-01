/*
* emojidexAutocomplete
*
* require: emojidex-client
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 the emojidex project / K.K. GenSouSha
*/

(function($, window, document) {
  let pluginName = "emojidexAutocomplete";
  let defaults = {
    onComplete: undefined,
    listLimit: 10,
    insertImg: true
  };

  class Plugin {
    constructor(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;

      // start: Plugin --------
      this.autocomplete = new AutoComplete(this);
    }
  }
      // @autocomplete.setAutoComplete()

  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, `plugin_${pluginName}`)) {
        return $.data(this, `plugin_${pluginName}`, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);