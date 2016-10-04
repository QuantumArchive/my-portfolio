'use strict';

(function(module) {

  var aboutController = {};

  aboutController.reveal = function() {
    $('.main-content').hide();
    $('#about').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
