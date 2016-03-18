var token = require('./../.env').token;
var urlTemplate = 'https://api.github.com/users/%USER%';
var repoTemplate = '/repos';
var tokenTemplate = '?access_token=' + token;
var profileTemplate = '<div class="profile"><h2>%USERNAME%</h2><h4>%NAME%</h4><img src="%URL%" alt="avatar" /><h3>Email address: %EMAIL%</h3><h3>Followers : %FOLLOWERS%</h3></div>'

exports.getRepos = function(){
};

String.prototype.fieldReplace = function(substr1, substr2 ){
  return (substr2? this.replace(substr1, substr2) : this.replace(substr1, 'Private'));
}

exports.getProfile = function(response){
  $('.container').empty();
  var profile = profileTemplate.fieldReplace('%USERNAME%', response.login).
  fieldReplace('%NAME%', response.name).
  fieldReplace('%URL%', response.avatar_url).
  fieldReplace('%FOLLOWERS%', response.followers).
  fieldReplace('%EMAIL%', response.email);
  $('.container').append(profile);
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

exports.apiCall = function(url, callback){
  $.get(url).then(function(response){
    console.log(response);
    callback(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });

}
