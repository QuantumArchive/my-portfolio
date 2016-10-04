'use strict';

(function(module) {

  var articleController = {};

  articleController.reveal = function() {
    $('.main-content').hide();
    $('#projects').fadeIn();
  };

  module.articleController = articleController;
})(window);
