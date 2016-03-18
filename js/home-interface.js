apiCall = require('./../js/api-functions.js').apiCall;
createUrl = require('./../js/api-functions.js').createUrl;
getProfile = require('./../js/api-functions.js').getProfile;


$(document).ready(function(){
  $('#user').submit(function(event){
    event.preventDefault();
    var username = $('#username').val();
    apiCall(createUrl(username), getProfile);
  });
});
