'use strict';

(function(module) {
  var adminViewMethods = {};

  adminViewMethods.adminPageInit = function() {
    $('json-preview').on('focus', function() {
      $(this).select();
    });
    $('#addnewauthor').on('click', adminViewMethods.addNewAuthor);
    $('#new-article').on('change', adminViewMethods.newArticleCreate);
  };

  //event handler to deal with multiple authors for a given article
  adminViewMethods.addNewAuthor = function() {
    var $this = $(this);
    var $inputNode = $('<input type="text" placeholder="Author Name" class="newauthors">');
    $this.parents('#new-article').find('#author-label-append').append($inputNode);
  };

  //iterate through all authors on the author add page and return an array
  adminViewMethods.getNewAuthors = function() {
    var authors = [];
    $('.newauthors').each(function(index, element) {
      var elementVal = $(element).val();
      if (0 < elementVal.length) {
        authors.push($(element).val());
      };
    });
    return authors;
  };

  adminViewMethods.handlePreviewTeaser = function() {
    $('#new-article-preview .summary-body *:nth-of-type(n+2)').hide();
    $('#new-article-preview article[data-author]').on('click', '.readtoggle', function(event) {
      event.preventDefault();
      var $this = $(this);
      var $summary = $this.parents('article').find('summary');
      var html = $this.html();
      if (html === 'Read more →') {
        $summary.children().slideDown();
        $this.html('Read less &larr;');
      } else {
        $summary.find('*:nth-of-type(n+2)').slideUp();
        $this.html('Read more &rarr;');
      };
    });
  };

  adminViewMethods.newArticleCreate = function() {
    $('#new-article-preview').empty();
    var newArticle = new myArticles({
      author : adminViewMethods.getNewAuthors(),
      title: $('#new-title').val(),
      category: $('#new-category').val(),
      link: $('#new-link').val(),
      publishedOn: $('#new-publish').length ? new Date() : null,
      image: $('#new-image').val(),
      body: $('#new-body').val(),
    });
    newArticle.buildAuthorString();
    $('#new-article-preview').append(newArticle.toHtml('#article-template'));
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $('#json-preview').text(JSON.stringify(newArticle) + ',');
    adminViewMethods.handlePreviewTeaser();
  };
  //main
  module.adminViewMethods = adminViewMethods;
  adminViewMethods.adminPageInit();
})(window);
