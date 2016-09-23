'use strict';

var viewMethodsObject = {};

//populate the select drop downs
viewMethodsObject.populateSelect = function() {
  //TODO: this looks unsustainable so for your about me, consider not using an article as the div element for housing your about me blurb
  $('article[data-category]').each(function(){
    var authorName, $authorNode, categoryName, $categoryNode;
    authorName = $(this).find('h3').text();
    $authorNode = $('#author-filter');
    if ($authorNode.find('option[value="' + authorName + '"]').length === 0) {
      $authorNode.append('<option value="' + authorName + '">'+ authorName +'</option>');
    };

    categoryName = $(this).data('category');
    $categoryNode = $('#category-filter');
    if ($categoryNode.find('option[value="' + categoryName + '"]').length === 0) {
      $categoryNode.append('<option value="' + categoryName + '">' + categoryName + '</option>');
    };
  });
};

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

//main
viewMethodsObject.populateSelect();
viewMethodsObject.handleAuthorFilter();
viewMethodsObject.handleCategoryFilter();
viewMethodsObject.handleNavTabs();
