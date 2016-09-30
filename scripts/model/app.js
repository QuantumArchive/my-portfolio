'use strict';

(function(module) {
  function myArticles(newObject) {
    var keys = Object.keys(newObject);
    var that = this;
    keys.map(function(element) {
      that[element] = newObject[element];
    });
    this.authorString = '';
  };

  //doesn't include an all in all new myArticles
  myArticles.all = [];

  myArticles.prototype.buildAuthorString = function() {
    var authorLength = this.author.length;
    if(authorLength < 2) {
      this.authorString = this.author[0];
    } else if (authorLength < 3) {
      this.authorString = this.author[0] + ' and ' + this.author[1];
    } else {
      this.authorString = this.author.reduce(function(acc, curr, index, array){
        if(index < (array.length - 1)) {
          return acc + ', ' + curr;
        } else {
          return acc + ', and ' + curr;
        }
      });
    }
  };

  myArticles.prototype.toHtml = function(scriptTemplateId) {
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'Published ' + this.daysAgo + ' days ago' : '(draft)';
    var source = $(scriptTemplateId).html();
    var template = Handlebars.compile(source);
    this.body = marked(this.body);
    var newArticle = template(this);
    return newArticle;
  };

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
      return (new myArticles(object));
    }).map(function(object){
      object.buildAuthorString();
      console.log(object);
      return object;
    });
  };

  myArticles.fetchAll = function(nextFunction) {
    var eTag = localStorage.getItem('ETag');
    $.ajax({
      type: 'HEAD',
      url: 'data/fileobjects.json',
      success: function(data, textStatus, xhr) {
        localStorage.setItem('ETagCheck', xhr.getResponseHeader('ETag').slice(3, 20));
        if (eTag === localStorage.ETagCheck) {
          myArticles.loadAll(JSON.parse(localStorage.fileObjects));
          nextFunction();
        } else {
          $.ajax({
            url: 'data/fileobjects.json',
            success: function(data, textStatus, xhr) {
              localStorage.setItem('fileObjects', xhr.responseText);
              localStorage.setItem('ETag', xhr.getResponseHeader('ETag').slice(3, 20));
              myArticles.loadAll(JSON.parse(localStorage.fileObjects));
              nextFunction();
            }
          });
        };
      }
    });
  };
  module.myArticles = myArticles;
})(window);
