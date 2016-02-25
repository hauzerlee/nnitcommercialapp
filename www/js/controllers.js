angular.module('nnitcommercialapp.controllers',['nnitcommercialapp.services'])

.controller('HomeCtrl', function($scope, $ionicModal, authService, $ionicPopup){
  $scope.openSignupModal = function(){
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal){
      $scope.signupModal = modal;

      if($scope.signinModal){
        $scope.signinModal.hide();
      }

      $scope.closeSignupModal = function(){
        $scope.signupModal.hide();
      };

      $scope.signup = function(user){
        if(user){
          authService.signup(user).then(function(result){
            if(result && result.hasOwnProperty('status') && result['status'] == 200){
              if(result.hasOwnProperty('data') && result['data']['status'] == true){
                var sessionId = result['data']['sessionId'];
                var memberId = result['data']['memberId'];
                $ionicPopup.alert({
                  title : 'sessionId : ' + sessionId,
                  template : '登录成功！用户Id为' + memberId
                });
                authService.saveUserToken(sessionId, memberId);
                $scope.signupModal.hide();
              } else {
                $ionicPopup.alert({
                  title: '出错啦', 
                  template: '好像出啥问题了，先随便看看，一会儿再试试吧'
                });
              }
            }
          }); 
        }
      };

      $scope.signupModal.show();
    });
  };
	$ionicModal.fromTemplateUrl('templates/signin.html', {
		scope: $scope,
		animation: 'slide-in-up',
    focusFirstInput: true
	}).then(function(modal){
		$scope.signinModal = modal;
    $scope.signin = function(user){
      if(user){
        authService.signin(user).then(function(result){
          if(result && result.hasOwnProperty('status')){
            if(result['status'] == 200 && result['data']['status'] == true){
              var sessionId = result['data']['sessionId'];
              var memberId = result['data']['memberId'];
              authService.saveUserToken(sessionId, memberId);
              $ionicPop.alert({
                title : 'sessionId : ' + sessionId,
                template : '登录成功！用户Id为' + memeberId
              });
            }
            $scope.signinModal.hide();
          } else {
            $ionicPopup.alert({
              title : '出错啦', 
              template : '好像网络出错啦，再试一次或者先随便看看吧'
            });
          }
        });
      }
    };
    $scope.closeSigninModal = function(){
      $scope.signinModal.hide();
    };
	}).then(function(){
    var token = authService.getUserToken();
    if(token.code != 0){
      $scope.signinModal.show();
    }
  });
})

.controller('PersonalCtrl', function($scope, $ionicModal){
})

.controller('AboutCtrl', function($scope){})
