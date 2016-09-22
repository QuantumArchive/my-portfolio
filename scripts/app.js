'use strict';

var varContainer = {
  articleObjects: [],
  $projectTag : $('#projects'),
  $topNav : $('nav.top-nav'),
};

/*var articleObjects = [];
var $projectTag = $('#projects');
var $topNav = $('nav.top-nav');
*/

function myArticles(newObject) {
  this.developer = newObject.developer;
  this.title = newObject.title;
  this.category = newObject.category;
  this.link = newObject.link;
  this.publishedOn = newObject.publishedOn;
  this.body = newObject.body;
}

myArticles.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  var $articleHeadLink = $newArticle.find('a');

  //populate the header portion of the article
  $articleHeadLink.attr('href', this.link);
  $articleHeadLink.find('h2').text(this.title);
  $newArticle.attr('data-category', this.category);
  $newArticle.find('h3').text('Created by ' + this.developer);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.find('hr').after(this.body);

  //make sure that the html elements are not hidden on the page
  $newArticle.removeClass('template');
  $newArticle.attr('class', 'mobileview');

  return $newArticle;
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
varContainer.$projectTag.append('<div class="clearfix"></div>');

//hide hamburger image if hovering
/*TODO: apparently there is some weirdness where when you click on
the anywhere where the links would present themselves in mobile view
they activate the link before they open up the top page need to find
a good work around - Chris B.*/
varContainer.$topNav.on('mouseover', function(event) {
  var $parent = $(this).parent();
  if ($parent.width() < 820) {
    $(this).find('div.menuicon').toggle();
  };
});

varContainer.$topNav.on('mouseout', function() {
  var $parent = $(this).parent();
  if ($parent.width() < 820) {
    $(this).find('div.menuicon').toggle();
  };
});
