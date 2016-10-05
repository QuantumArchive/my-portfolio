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
        $articles.each(function(index, element) {
          //will check if the author tag string has the name of the author grabbed from the filter
          if (element.getAttribute('data-author').includes(authorName)) {
            $(element).show();
          }
        });
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
  viewMethodsObject.uniqueAuthorsHeader = function() {
    var totalUnique = myArticles.allAuthors.length;
    $('#unique-authors').html('<h2>Articles written by a total of <b>' + totalUnique + '</b> unique authors!</h2>');
  };

  //render the main index page
  viewMethodsObject.renderIndexPage = function() {
    myArticles.all.forEach(function(article) {
      $('#projects').append(article.toHtml('#article-template'));
      if ($('#category-filter option[value="' + article.category + '"]').length === 0) {
        $('#category-filter').append(article.toHtml('#select-category-template'));
      };
    });

    myArticles.allAuthors.forEach(function(author) {
      $('#author-filter').append(author.toHtml('#select-author-template'));
    });
    
    viewMethodsObject.handleAuthorFilter();
    viewMethodsObject.handleCategoryFilter();
    viewMethodsObject.handleTeasers();
    viewMethodsObject.appendClearFix($('#projects'));
    viewMethodsObject.uniqueAuthorsHeader();
  };
  //main
  module.viewMethodsObject = viewMethodsObject;
  myArticles.fetchAll(viewMethodsObject.renderIndexPage);
})(window);
