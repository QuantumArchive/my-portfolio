'use strict';

(function(module) {
  var myRepos = {};

  myRepos.allRepos = [];

  myRepos.bringDownRepos = function(callbackFunction) {
    var githubToken = githubToken || '';
    var ajaxQuery = {
      url: 'https://api.github.com/users/QuantumArchive/repos',
      type: 'GET',
      success: function(data) {
        myRepos.allRepos = data;
        //callback your function :)
        callbackFunction();
      },
      error: function(data) {
        console.log('What happened?');
      }
    };
    if (0 < githubToken.length) {
      ajaxQuery['headers'] = { Authorization : 'token ' + githubToken };
    };
    //make the call
    $.ajax(ajaxQuery);
  };

  myRepos.filterAttributes = function(anAttr) {
    return myRepos.allRepos.filter(function(aRepo) {
      return aRepo[anAttr];
    });
  };

  module.myRepos = myRepos;
})(window);
