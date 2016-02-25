angular.module('nnitcommercialapp.controllers',['nnitcommercialapp.services'])

.controller('HomeCtrl', function($scope, $ionicModal, authService){
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
        alert(user.mobile);
      }
      $scope.signinModal.hide();
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
