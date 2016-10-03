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
  adminViewMethods.getAuthors = function() {
    var authors = [];
    $('.newauthors').each(function(index, element) {
      var elementVal = $(element).val();
      if (0 < elementVal.length) {
        authors.push($(element).val());
      };
    });
    return authors;
  };

  adminViewMethods.newArticleCreate = function() {
    $('#new-article-preview').empty();
    var newArticle = new myArticles({
      author : adminViewMethods.getAuthors(),
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
  };
  //main
  module.adminViewMethods = adminViewMethods;
  adminViewMethods.adminPageInit();
})(window);
