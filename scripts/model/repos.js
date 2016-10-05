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
        myRepos.allRepos = data.map(function(object) {
          object['created_on'] = object['created_at'].slice(0,10);
          object['updated_on'] = object['updated_at'].slice(0,10);
          return object;
        });
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
