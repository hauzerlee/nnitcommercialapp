angular.module('nnitcommercialapp.services', [])

.constant('API_ROOT', {
  //url: 'localhost:8888'
  url: 'http://localhost:8100/api'
})
.factory('authService', function($http, API_ROOT){
  var authKey = 'userToken';
	var idKey = 'memberId';
	return {
		isLogon: function(){
			return window.localStorage.getItem(authKey);
		},
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
						token: window.localStorage.getItem(authKey),
						id: window.localStorage.getItem(idKey)
					},
					message: 'user is already signed in'
				};
			} 
		},
    saveUserToken: function(sessionId, memberId){
      window.localStorage[authKey] = sessionId;
			window.localStorage[idKey] = memberId;
    },
		login: function(user){
			var password = "123456";
      var login_data = "&password=" + password + "&cell_phone_num=" + user.mobile;
      var promise = $http.post(API_ROOT.url + '/shoppingmall/members/login', login_data, {
        headers: {
					'Content-Type' : 'application/x-www-form-urlencoded',
        }
      }).then(function(response){
        return response;
      }, function(error){
        return error;
      });
      return promise;
		},
		enrol: function(user){
      var password = "123456";
      var enrol_data = "&password=" + password + "&cell_phone_num=" + user.mobile;
      var promise = $http.post(API_ROOT.url + '/shoppingmall/members/enrol', enrol_data, {
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
})
.factory('personalService', function($http, API_ROOT, authService){
	var noOne = {
		'id':'000000',
		'cell_phone': '',
		'nick_name': '未登录',
		'password': '',
		'session_id': '',
		'lastest_login': '',
		'fetch_back_pwd': '',
		'account_number': '',
		'grade': 0,
		'status': '未登录',
		'is_online': false,
		'gender': '',
		'pic': 'onOne.png',
		'email_addr': 'no.one@nnit.com'
	};
	return {
		getPersonal: function(){
			var tokenObj = authService.getUserToken();
			if(tokenObj && tokenObj['data']){
				$http.get(API_ROOT.url + '/shoppingmall/members/' + tokenObj['data']['id'], {
					headers: {
						'Content-Type' : 'application/x-www-form-urlencoded',
						'Authorization' : tokenObj['data']['token']
					}
				}).then(function(response){
				}, function(error){
				});
			} else {
				return noOne;
			}
		}
	};
});
