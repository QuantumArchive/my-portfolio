'use strict';

(function(module) {
  var repoViewMethods = {};

  var repoHtmlTemplate = Handlebars.compile($('#repo-template').html());

  repoViewMethods.renderRepos = function() {
    //crap gotta get rid of this empty or make it empty the right thing
    $('#about').empty().append(myRepos.filterAttributes('name')
    .map(repoHtmlTemplate));
    viewMethodsObject.appendClearFix($('#about'));
  };

  module.repoViewMethods = repoViewMethods;
  myRepos.bringDownRepos(repoViewMethods.renderRepos);
})(window);
