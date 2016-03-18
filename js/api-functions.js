var token = require('./../.env').token;
var urlTemplate = 'https://api.github.com/users/%USER%';
var repoTemplate = '/repos';
var tokenTemplate = '?access_token=' + token; //access without token??

exports.getRepos = function(){
};

exports.createUrl = function(username, flag){
  var url = urlTemplate.replace('%USER%', username);
  if (flag === true) {
    url = url + repoTemplate;
  }
  if(token){
    url = url + tokenTemplate;
  }
  return url;
};

exports.apiCall = function(url){
  $.get(url).then(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });

}
