'use strict';

(function(module) {
  var adminViewMethods = {};

  adminViewMethods.adminPageInit = function() {
    $('json-preview').on('focus', function() {
      $(this).select();
    });
    $('#new-article').on('change', adminViewMethods.newArticleCreate);
  };

  adminViewMethods.newArticleCreate = function() {
    $('#new-article-preview').empty();
    var newArticle = new myArticles({
      author : $('#new-author').val(),
      title: $('#new-title').val(),
      category: $('#new-category').val(),
      link: $('#new-link').val(),
      publishedOn: $('#new-publish').length ? new Date() : null,
      image: $('#new-image').val(),
      body: $('#new-body').val(),
    });

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
