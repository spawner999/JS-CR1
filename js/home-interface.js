apiCall = require('./../js/api-functions.js').apiCall;
createUrl = require('./../js/api-functions.js').createUrl;


$(document).ready(function(){
  $('#user').submit(function(event){
    event.preventDefault();
    var username = $('#username').val();
    apiCall(createUrl(username, 'repos'));
    console.log(createUrl(username));
  });
})
