angular.module('nnitcommercialapp.services', ['ngResource'])

.factory('authService', function($resource){
	return {
		getUserToken: function(){
			var authKey = 'userToken';
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
		signin: function(mobile){
		},
		signup: function(mobile){
		}
	};
});
