'use strict';

(function(module) {
  var viewMethodsObject = {};

  //filter articles based on authors from select dropdown
  viewMethodsObject.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      var $thisName = $(this);
      var authorName = $thisName.val();
      var $articles = $('article[data-author]');
      if (authorName) {
        $articles.hide();
        $('article[data-author="' + authorName + '"]').show();
      } else {
        $articles.show();
      };
      $('#category-filter').val('');
    });
  };

  //filter articles based on category
  viewMethodsObject.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      var $thisCategory = $(this);
      var categoryName = $thisCategory.val();
      var $articles = $('article[data-category]');
      if (categoryName) {
        $articles.hide();
        $('article[data-category="' + categoryName + '"]').show();
      } else {
        $articles.show();
      }
      $('#author-filter').val('');
    });
  };

  //add event listener to tabs so you don't navigate away from page
  viewMethodsObject.handleNavTabs = function() {
    $('#topheader').on('click', '.tab', function(event) {
      event.preventDefault();
      var content = $(this).data('content');
      $('section[id="' + content + '"]').show();
      $('section').not('#' + content).hide();
    });
    $('#topheader .tab:first').click();
  };

  //append clearfix to main page so floats aren't causing parent container to have 0 height
  viewMethodsObject.appendClearFix = function(domNode) {
    domNode.append('<div class="clearfix"></div>');
  };

  //add event listener to teasers to control what is shown
  viewMethodsObject.handleTeasers = function() {
    $('.summary-body *:nth-of-type(n+2)').hide();
    $('article[data-author]').on('click', '.readtoggle', function(event) {
      event.preventDefault();
      var $this = $(this);
      var $summary = $this.parents('article').find('summary');
      var html = $this.html();
      if (html === 'Read more →') {
        $summary.children().fadeIn();
        $this.html('Read less &larr;');
      } else {
        $summary.find('*:nth-of-type(n+2)').fadeOut();
        $this.html('Read more &rarr;');
      };
    });
  };

  //have it so rendering the header giving total unique authors is encapsulated in viewMethodsObject
  viewMethodsObject.uniqueAuthorsHeader = function(nextFunction) {
    var totalUnique = nextFunction();
    $('#unique-authors').html('<h2>Articles written by a total of <b>' + totalUnique + '</b> unique authors!</h2>');
  };

  //render the main index page
  viewMethodsObject.renderIndexPage = function() {
    myArticles.all.forEach(function(article) {
      $('#projects').append(article.toHtml('#article-template'));
      if ($('#author-filter option[value="' + article.author + '"]').length === 0) {
        $('#author-filter').append(article.toHtml('#select-author-template'));
      };
      if ($('#category-filter option[value="' + article.category + '"]').length === 0) {
        $('#category-filter').append(article.toHtml('#select-category-template'));
      };
    });
    viewMethodsObject.handleAuthorFilter();
    viewMethodsObject.handleCategoryFilter();
    viewMethodsObject.handleNavTabs();
    viewMethodsObject.handleTeasers();
    viewMethodsObject.appendClearFix($('#projects'));
    //No longer to be used $('#unique-authors b').text(myArticles.uniqueAuthors);
    viewMethodsObject.uniqueAuthorsHeader(myArticles.uniqueAuthors);
  };
  //main
  module.viewMethodsObject = viewMethodsObject;
  myArticles.fetchAll(viewMethodsObject.renderIndexPage);
})(window);
