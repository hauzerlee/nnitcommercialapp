angular.module('nnitcommercialapp.controllers', ['nnitcommercialapp.services'])

        .controller('HomeCtrl', function ($scope, $ionicModal, authService, $ionicPopup) {
            $scope.openEnrolModal = function () {
                $ionicModal.fromTemplateUrl('templates/enrol.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    focusFirstInput: true
                }).then(function (modal) {
                    $scope.enrolModal = modal;

                    if ($scope.loginModal) {
                        $scope.loginModal.show();
                    }

                    $scope.closeEnrolModal = function () {
                        $scope.enrolModal.hide();
                    };

                    $scope.enrol = function (user) {
                        if (user) {
                            authService.enrol(user).then(function (result) {
                                if (result && result.hasOwnProperty('status') && result['status'] == 200) {
                                    if (result.hasOwnProperty('data') && result['data']['status'] == true) {
                                        var sessionId = result['data']['sessionId'];
                                        var memberId = result['data']['memberId'];
                                        $ionicPopup.alert({
                                            title: 'sessionId : ' + sessionId,
                                            template: '注册并登录成功！用户Id为' + memberId
                                        });
                                        authService.saveUserToken(sessionId, memberId);
                                        $scope.enrolModal.hide();
                                    } else {
                                        $ionicPopup.alert({
                                            title: '出错啦',
                                            template: '业务逻辑有点错，先随便看看，一会儿再试试吧'
                                        });
                                    }
                                } else {
                                    $ionicPopup.alert({
                                        title: '出错啦',
                                        template: '服务器有异常，先随便看看吧'
                                    });
                                }
                            });
                        }
                    };

                    $scope.enrolModal.show();
                });
            };
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                $scope.loginModal = modal;
                $scope.login = function (user) {
                    if (user) {
                        authService.login(user).then(function (result) {
                            if (result && result.hasOwnProperty('status')) {
                                if (result['status'] == 200 /* && result['data']['status'] == true */) {
                                    var sessionId = result['data']['session_id'];
                                    var memberId = result['data']['member_id'];
                                    authService.saveUserToken(sessionId, memberId);
                                    $ionicPopup.alert({
                                        title: 'sessionId : ' + sessionId,
                                        template: '登录成功！用户Id为' + memberId
                                    });
                                    $scope.loginModal.hide();
                                } else {
                                    $ionicPopup.alert({
                                        title: '出错啦',
                                        template: '服务器异常啦，再试一次或者先随便看看吧'
                                    });
                                }
                            } else {
                                $ionicPopup.alert({
                                    title: '出错啦',
                                    template: '好像网络出错啦，再试一次或者先随便看看吧'
                                });
                            }
                        });
                    }
                };
                $scope.closeLoginModal = function () {
                    $scope.loginModal.hide();
                };
            }).then(function () {
                var token = authService.getUserToken();
                if (token.code != 0) {
                    $scope.loginModal.show();
                }
            });
        })

        .controller('PersonalCtrl', function ($scope, $ionicModal, personalService) {
            personalService.getPersonal().then(function (response) {
                $scope.p = response['data'];
            }, function (error) {
                $scope.p = personalService.getNoOne();
            });
        })

        .controller('AboutCtrl', function ($scope) {})
