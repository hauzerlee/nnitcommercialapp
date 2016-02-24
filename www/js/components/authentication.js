angular.module('nnitcommercialapp.components.authentication', ['nnitcommercialapp.services'])

.factory('authComponent', function($scope, $ionicModal){
	return {
		setupSignupModal: function(){
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
				})
			}
		},
		setupSignInModal: function(){
			$ionicModal.fromTemplateUrl('templates/signin.html', {
				scope: $scope,
				animation: 'slide-in-up',
				focusFirstInput: true
			});
		}
	};
});
