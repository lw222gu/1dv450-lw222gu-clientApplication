angular.module('clientApp').factory('Authenticated', function(){
  var authenticated = false;
  return {
    getAuthenticated: function(){
       return authenticated;
    },
    setAuthenticated: function(){
      var auth = sessionStorage['authenticated'];
      if(sessionStorage['authenticated']){
        authenticated = true;
      }
      else {
        authenticated = false;
      }
    }
  }
})
