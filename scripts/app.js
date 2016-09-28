'use strict';

(function(module) {
  //DONE: used map function to map objects keys to myArticles
  function myArticles(newObject) {
    var keys = Object.keys(newObject);
    var that = this;
    keys.map(function(element) {
      that[element] = newObject[element];
    });
  };

  myArticles.all = [];

  myArticles.prototype.toHtml = function(scriptTemplateId) {
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'Published ' + this.daysAgo + ' days ago' : '(draft)';
    var source = $(scriptTemplateId).html();
    var template = Handlebars.compile(source);
    var newArticle = template(this);
    return newArticle;
  };

  //DONE: used reduce to produce the unique authors that have posted to this blog
  myArticles.uniqueAuthors = function() {
    return myArticles.all.reduce(function(prev, curr) {
      if (prev.indexOf(curr.author) === -1) {
        prev.push(curr.author);
      }
      return prev;
    },[]).length;
  };

  myArticles.loadAll = function(data) {
    myArticles.all = data.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(object) {
      //DONE: used map function to create new myArticles
      return (new myArticles(object));
    });
  };

  //DONE: modified fetchAll to accept a function
  myArticles.fetchAll = function(nextFunction) {
    var eTag = localStorage.getItem('ETag');
    $.ajax({ type: 'HEAD', url: 'data/fileobjects.json', success: function(data, textStatus, xhr) { localStorage.setItem('ETagCheck', xhr.getResponseHeader('ETag').slice(3, 20));}});
    if (eTag === localStorage.ETagCheck) {
      myArticles.loadAll(JSON.parse(localStorage.fileObjects));
      nextFunction();
    } else {
      $.ajax({ url: 'data/fileobjects.json', success: function(data, textStatus, xhr) { localStorage.setItem('fileObjects', xhr.responseText);
        localStorage.setItem('ETag', xhr.getResponseHeader('ETag').slice(3, 20));
        myArticles.loadAll(JSON.parse(localStorage.fileObjects));
        nextFunction();
      }});
    };
  };
  module.myArticles = myArticles;
})(window);
