angular.module('nnitcommercialapp.services', ['ngResource'])

        .constant('API_ROOT', {
            //url: 'http://localhost'
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
        .factory('personalService', function ($http, $resource, API_ROOT, authService) {
            var noOne = {
                'id': '000000',
                'cell_phone': '13612077384',
                'nick_name': '',
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
                getIntegral: function(){
                    var integral;
                    integralMap= $resource(API_ROOT.url + '/shoppingmall/integral/:member_id', 
                                    {member_id:authService.getUserToken()['data']['id']})        
                               .get(function(data){integral = data['score'];}
                                );
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
                    var discounts;
                    discounts = $resource(API_ROOT.url + '/shoppingmall/discounts/members/:memberId', {memberId:'@_memberId'});
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
        })
        .factory('shopService', function($http, $resource, API_ROOT){
            return{
                getHotShops: function () {
                    var shops=[];
                    return hotShops = $resource(API_ROOT.url + '/shoppingmall/shops?offset=1&size=10')
                       .query(function (data) {
                        for (var shopIndex in data) {
                            tempShop = data[shopIndex];
                            var shop = {
                                'ID': tempShop['ID'],
                                'create_time': tempShop['create_time'],
                                'contact_tel': tempShop['contact_tel'],
                                'floor': tempShop['floor'],
                                'location': tempShop['location'],
                                'introduction': tempShop['introduction'],
                                'opening_time': tempShop['opening_time'],
                                'contact': tempShop['contact'],
                                'shop_name': tempShop['shop_name'],
                                'true_scene': tempShop['true_scene'],
                                'category': tempShop['category'],
                                'member': tempShop['member'],
                                'telephone': tempShop['telephone'],
                                'logo': tempShop['logo']
                            };
                            shops.push(shop);
                        }
                    });
                    //return shops;
                }
            };
        })
        .factory('categoryService',function($resource, API_ROOT){
            return {
                getCategories: function() {
                    var categories = [];
                    hotCategories = $resource(API_ROOT.url + '/shoppingmall/categories')
                            .query(function(data){
                                for (var cIndex in data) {
                                    tmpCategory = data[cIndex];
                                    for (var id in tmpCategory){                                     
                                        if (id.indexOf('$') == 0 || 
                                            id.indexOf('then') == 0 || 
                                            id.indexOf('catch') == 0 ||
                                            id.indexOf('finally') == 0 ) 
                                        {
                                            continue;
                                        }                                
                                        var category = {
                                            'id': id,
                                            'name':tmpCategory[id]
                                        };
                                        categories.push(category);
                                        break;
                                    };  
                                };
                    });
                    return categories;
               }
            };
        })
        ;
