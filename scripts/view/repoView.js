'use strict';

(function(module) {
  var repoViewMethods = {};

  var repoHtmlTemplate = Handlebars.compile($('#repo-template').html());

  repoViewMethods.renderRepos = function() {
    //crap gotta get rid of this empty or make it empty the right thing
    var $about = $('#about');
    $about.children('article:gt(0)').remove();
    $about.append(myRepos.filterAttributes('name')
    .map(repoHtmlTemplate));
    viewMethodsObject.appendClearFix($('#about'));
  };

  module.repoViewMethods = repoViewMethods;
  myRepos.bringDownRepos(repoViewMethods.renderRepos);
})(window);
