'use strict';

var tabViewMethods = {};

tabViewMethods.handleNavTabs = function() {
  $('#topheader').on('click', '.tab', function(event) {
    event.preventDefault();
    var content = $(this).data('content');
    console.log(content);
    if (content === 'projects') {
      $('#about').hide();
      $('#projects').show();
    } else if (content === 'about') {
      $('#projects').hide();
      $('#about').show();
    };
  });
  $('#topheader .tab:first').click();
};

//main
tabViewMethods.handleNavTabs();
