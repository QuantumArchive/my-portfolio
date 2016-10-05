'use strict';

(function(module) {
  var myRepos = {};

  myRepos.allRepos = [];

  myRepos.bringDownRepos = function(callbackFunction) {
    var githubToken = githubToken || '';
    var ajaxQuery = {
      url: 'github/users/QuantumArchive/repos' +
      '?per_page=12&sort=updated',
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
