angular.module('nnitcommercialapp.services', [])

.constant('API_ROOT', {
  //url: 'localhost:8888'
  url: 'http://localhost:8100/api'
})
.factory('authService', function($http, API_ROOT){
  var authKey = 'userToken';
	return {
		getUserToken: function(){
			if(!window.localStorage.getItem(authKey)) {
				return {
					code: 401,
					data: null,
					message: 'Unauthorized'
				};
			} else {
				return {
					code: 0,
					data: {
						token: window.localStorage.getItem(authKey)
					},
					message: 'user is already signed in'
				};
			} 
		},
    saveUserToken: function(sessionId, memberId){
      window.localStorage[authKey] = sessionId;
    },
		signin: function(user){
      var signin_data = "mobile=" + user.mobile;
      var promise = $http.post(API_ROOT + '/signin', signin_data, {
        headers: {
        }
      }).then(function(response){
        return response;
      }, function(error){
        return error;
      });
      return promise;
		},
		signup: function(user){
      var password = "123456";
      var signup_data = "&password=" + password + "&cell_phone_num=" + user.mobile;
      var promise = $http.post(API_ROOT.url + '/shoppingmall/members/enrol', signup_data, {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).then(function(response){
        return response;
      }, function(error){
        return error;
      });
      return promise;
		}
	};
});
