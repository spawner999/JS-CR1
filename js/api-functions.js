var token = require('./../.env').token;
var urlTemplate = 'https://api.github.com/users/%USER%';
var repoUrl = '/repos';
var tokenUrl = '?access_token=' + token;
var profileTemplate = '<div class="profile"><h2>%USERNAME%</h2><h4>Name: %NAME%</h4><img src="%URL%" alt="avatar" /><h3>Email address: %EMAIL%</h3><h3>Followers : %FOLLOWERS%</h3><h3>Repos : %REPOS%</h3></div><button id="repos" value"repo">Show Repos</button>';
var repoTemplate = '<div class"repo"><a href="%URL%"><h3>%NAME%</h3></a><h4>%CREATED%</h4></div>';

exports.getRepos = function(response){
  var length = response.length;
  for(var i=0; i<length; i++){
    var repo = repoTemplate.replace('%URL%', response[i].html_url).
    replace('%NAME%', response[i].full_name).
    replace('%CREATED%', response[i].created_at);
    $('.container').append(repo);
  }
};

String.prototype.fieldReplace = function(substr1, substr2 ){
  return (substr2 !==null? this.replace(substr1, substr2) : this.replace(substr1, 'Private'));
}

exports.getProfile = function(response){
  $('.container').empty();
  var profile = profileTemplate.fieldReplace('%USERNAME%', response.login).
  fieldReplace('%NAME%', response.name).
  replace('%URL%', response.avatar_url).
  fieldReplace('%FOLLOWERS%', response.followers).
  fieldReplace('%EMAIL%', response.email).
  fieldReplace('%REPOS%', response.public_repos);
  $('.container').append(profile);
};


exports.createUrl = function(username, flag){
  var url = urlTemplate.replace('%USER%', username);
  flag? (flag === 'repo'? url= url + repoUrl : url) : url;
  if(token){
    url = url + tokenUrl;
  }
  return url;
};

exports.apiCall = function(url, callback){
  $.get(url).then(function(response){
    callback(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });

}
