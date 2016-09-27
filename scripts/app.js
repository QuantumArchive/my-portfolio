'use strict';

function myArticles(newObject) {
  for (var key in newObject) {
    this[key] = newObject[key];
  };
}

myArticles.all = [];

myArticles.prototype.toHtml = function(scriptTemplateId) {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'Published ' + this.daysAgo + ' days ago' : '(draft)';
  //var source = $('#article-template').html();
  var source = $(scriptTemplateId).html();
  var template = Handlebars.compile(source);
  var newArticle = template(this);
  return newArticle;
};

myArticles.loadAll = function(data) {
  data.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.pbulishedOn));
  }).forEach(function(ele) {
    myArticles.all.push(new myArticles(ele));
  });
};

myArticles.fetchAll = function() {
  if (localStorage.fileObjects) {
    myArticles.loadAll(JSON.parse(localStorage.fileObjects));
    viewMethodsObject.renderIndexPage();
  } else {
    $.ajax({ url: 'data/fileobjects.json', success: function(data, textStatus, xhr) { localStorage.setItem('fileObjects', xhr.responseText);
      myArticles.loadAll(JSON.parse(localStorage.fileObjects));
      viewMethodsObject.renderIndexPage();
    }});
  };
};


//refactor all this
var selectTemplateText = [
  {
    key: 'author',
    text: 'Authors'
  },
  {
    key: 'category',
    text: 'Category'
  }
];

function useSelectTemplate (object) {
  var source = $('#select-template').html();
  var template = Handlebars.compile(source);
  var newArticle = template(object);
  return newArticle;
};

selectTemplateText.forEach(function(element) {
  $('#filters').append(useSelectTemplate(element));
});
