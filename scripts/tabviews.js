'use strict';

var tabViewMethods = {};

tabViewMethods.handleNavTabs = function() {
  $('#topheader').on('click', '.tab', function(event) {
    event.preventDefault();
    var content = $(this).data('content');
    $('section[id="' + content + '"]').show();
    $('section').not('#' + content).hide();
  });
  $('#topheader .tab:first').click();
};

//main
tabViewMethods.handleNavTabs();
