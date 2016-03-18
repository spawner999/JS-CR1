var token = require('./../.env').token;
var urlTemplate = 'https://api.github.com/users/%USER%';
var repoTemplate = '/repos';
var tokenTemplate = '?access_token=' + token;
var profileTemplate = '<div class="profile"><h2>%USERNAME%</h2><h4>%NAME%</h4><img src="%URL%" alt="avatar" /><h3>%EMAIL%</h3><h3>Followers : %FOLLOWERS%</h3></div>'

exports.getRepos = function(){
};

exports.getProfile = function(response){
  $('.container').empty();
  var profile = profileTemplate.replace('%USERNAME%', response.login).
  replace('%NAME%', response.name).
  replace('%URL%', response.avatar_url).
  replace('%FOLLOWERS%', response.followers);
  if(response.email){
    profile = profile.replace('%EMAIL%', response.email);
  }
  else {
    profile = profile.replace('%EMAIL%', 'Private');
  }
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
