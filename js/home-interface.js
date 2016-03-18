apiCall = require('./../js/api-functions.js').apiCall;
createUrl = require('./../js/api-functions.js').createUrl;
getProfile = require('./../js/api-functions.js').getProfile;
getRepos = require('./../js/api-functions.js').getRepos;
var currentUser;


$(document).ready(function(){
  $('#user').submit(function(event){
    event.preventDefault();
    currentUser = $('#username').val();
    apiCall(createUrl(currentUser), getProfile);
  });
  $(document).ajaxComplete(function() {
    $('#repos').click(function(){
      var value = 'repo';
      apiCall(createUrl(currentUser, value), getRepos);
    });
  });
});
