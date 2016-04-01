angular.module('nnitcommercialapp.services', [])

        .constant('API_ROOT', {
            //url: 'localhost:8888'
            url: 'http://localhost:8100/api'
        })
        .factory('authService', function ($http, API_ROOT) {
            var authKey = 'userToken';
            var idKey = 'memberId';
            return {
                isLogon: function () {
                    return window.localStorage.getItem(authKey);
                },
                getUserToken: function () {
                    if (!window.localStorage.getItem(authKey)) {
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
                saveUserToken: function (sessionId, memberId) {
                    window.localStorage[authKey] = sessionId;
                    window.localStorage[idKey] = memberId;
                },
                login: function (user) {
                    var password = "123456";
                    var login_data = "&password=" + password + "&cell_phone_num=" + user.mobile;
                    var promise = $http.post(API_ROOT.url + '/shoppingmall/members/login', login_data, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': ''
                        }
                    }).then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    });
                    return promise;
                },
                enrol: function (user) {
                    var password = "123456";
                    var enrol_data = "&password=" + password + "&cell_phone_num=" + user.mobile;
                    var promise = $http.post(API_ROOT.url + '/shoppingmall/members/enrol', enrol_data, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    });
                    return promise;
                }
            };
        })
        .factory('personalService', function ($http, API_ROOT, authService) {
            var noOne = {
                'id': '000000',
                'cell_phone': '',
                'nick_name': 'Jaly',
                'password': '',
                'session_id': '',
                'lastest_login': '',
                'fetch_back_pwd': '',
                'account_number': '',
                'grade': 0,
                'status': 'OnLine',
                'is_online': false,
                'gender': '',
                'pic': 'onOne.png',
                'email_addr': 'no.one@nnit.com'
            };
            return {
                getNoOne: function () {
                    return noOne;
                },
                getPersonal: function () {
                    var tokenObj = authService.getUserToken();
                    var promise;
                    if (tokenObj && tokenObj['data']) {
                        promise = $http.get(API_ROOT.url + '/shoppingmall/members/' + tokenObj['data']['id'], {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': tokenObj['data']['token']
                            }
                        }).then(function (response) {
                            return response;
                        }, function (error) {
                            return error;
                        });
                    }
                    return promise;
                },
                getIntegral: function() {
                    var tokenObj = authService.getUserToken();
                    var integral;
                    if (tokenObj && tokenObj['data']) {
                        integral = $http.get(API_ROOT.url + '/shoppingmall/integral/' + tokenObj['data']['id'], {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': tokenObj['data']['token']
                            }
                        }).then(function (response) {
                            return response;
                        }, function(error) {
                           return error; 
                        });
                    }
                    return integral;
                },
                getFovorShops: function() {
                    var tokenObj = authService.getUserToken();
                    var shops;
                    if (tokenObj && tokenObj['data']) {
                        shops = $http.get(API_ROOT.url + '/shoppingmall/favours/' + tokenObj['data']['id'], {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': tokenObj['data']['token']
                            }
                        }).then(function (response) {
                            return response;
                        }, function(error) {
                           return error; 
                        });
                    }
                    return shops;
                },
                getMemberGroupons: function() {
                    var tokenObj = authService.getUserToken();
                    var groupons;
                    if (tokenObj && tokenObj['data']) {
                        groupons = $http.get(API_ROOT.url + '/shoppingmall/coupons/members/' + tokenObj['data']['id'], {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': tokenObj['data']['token']
                            }
                        }).then(function (response) {
                            return response;
                        }, function(error) {
                           return error; 
                        });
                    }
                    return groupons;
                },
                getMemberDiscounts: function() {
                    var tokenObj = authService.getUserToken();
                    var discounts;
                    if (tokenObj && tokenObj['data']) {
                        discounts = $http.get(API_ROOT.url + '/shoppingmall/discounts/members/' + tokenObj['data']['id'], {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': tokenObj['data']['token']
                            }
                        }).then(function (response) {
                            return response;
                        }, function(error) {
                           return error; 
                        });
                    }
                    return discounts;
                }
            };
        })
        .factory('globalService', function($http, API_ROOT, authService){
            return {
                getHotDiscounts: function() {
                    var discounts = $http.get(API_ROOT.url + '/shoppingmall/discounts')
                            .then(function(response) {
                                return response;
                             }, function(error){
                                 return error;
                             });
                    return discounts;
                },
                getOneDiscount: function() {
                    var discountId; // TODO: get the discount id from request
                    var discount = $http.get(API_ROOT.url + '/shoppingmall/discounts/') // TODO: miss the discount id here
                            .then(function(response) {
                                return response;
                             }, function(error) {
                                 return error;
                             });
                    return discount;
                }
            };
        });
