'use strict';

(function(module) {

  var adminController = {};

  adminController.reveal = function() {
    $('.main-content').hide();
    $('#admin').fadeIn();
  };

  module.adminController = adminController;
})(window);
