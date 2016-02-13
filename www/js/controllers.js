angular.module('nnitcommercialapp.controllers',[])

.controller('HomeCtrl', function($scope, $ionicModal){
	$ionicModal.fromTemplateUrl('templates/signup.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
		modal.show();
	});
	$scope.closeModal = function(){
		$scope.modal.hide();
	};
})

.controller('PersonalCtrl', function($scope, $ionicModal){
})

.controller('AboutCtrl', function($scope){})
