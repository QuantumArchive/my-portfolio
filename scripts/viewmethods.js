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

  //filter articles based on categories from select dropdown
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

  //Put event listener on tabs so that it shows the section as indicated by the data tag and hides all other tabs
  viewMethodsObject.handleNavTabs = function() {
    $('#topheader').on('click', '.tab', function(event) {
      event.preventDefault();
      var content = $(this).data('content');
      $('section[id="' + content + '"]').show();
      $('section').not('#' + content).hide();
    });
    $('#topheader .tab:first').click();
  };

  viewMethodsObject.appendClearFix = function(domNode) {
    domNode.append('<div class="clearfix"></div>');
  };

  viewMethodsObject.renderIndexPage = function() {
    //Refactored renderIndexPage
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
    viewMethodsObject.appendClearFix($('#projects'));
    $('#unique-authors b').text(myArticles.uniqueAuthors);
  };
  //main
  module.viewMethodsObject = viewMethodsObject;
  //DONE: call fetchAll on the renderIndexPage function
  myArticles.fetchAll(viewMethodsObject.renderIndexPage);
})(window);
