'use strict';

var varContainer = {
  articleObjects: [],
  $projectTag : $('#projects'),
  $aboutTag: $('#about'),
  $topNav : $('nav.top-nav'),
};

function myArticles(newObject) {
  this.developer = newObject.developer;
  this.title = newObject.title;
  this.category = newObject.category;
  this.link = newObject.link;
  this.publishedOn = newObject.publishedOn;
  this.body = newObject.body;
}

myArticles.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'Published ' + this.daysAgo + ' days ago' : '(draft)';
  var source = $('#article-template').html();
  var template = Handlebars.compile(source);
  var newArticle = template(this);
  return newArticle;
};

varContainer.appendClearFix = function(domNode) {
  domNode.append('<div class="clearfix"></div>');
};

//main

//sort articles by date stamp
myProjects.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn) - new Date(curElem.publishedOn));
});

//create a new myArticles object for each element in myProjects array in fileobjects.js
myProjects.forEach(function(element) {
  varContainer.articleObjects.push(new myArticles(element));
});

//go through each myArticles object and render to HTML and make sure to append to
varContainer.articleObjects.forEach(function(element) {
  varContainer.$projectTag.append(element.toHtml());
});

//fix floats
varContainer.appendClearFix(varContainer.$projectTag);
varContainer.appendClearFix(varContainer.$aboutTag);

//hide hamburger image if hovering
//TODO: FIX THIS PORTION SO WE DON'T HAVE WEIRD BUGGY VIEW ISSUE - Chris B.
/*varContainer.$topNav.on('mouseover', 'div.menuicon', function(event) {
  var $this = $(this);
  var $parent = $this.parent();
  if ($parent.width() < 820) {
    $this.toggle();
  };
});

varContainer.$topNav.on('mouseout', 'div.menuicon', function() {
  var $this = $(this);
  var $parent = $this.parent();
  if ($parent.width() < 820) {
    $this.toggle();
  };
});
*/
