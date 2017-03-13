import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';
import routeConfig from './app.route';
import adminLoginCtrl from "./shared/controller/adminLoginCtrl";
import adminMainCtrl from "./shared/controller/adminMainCtrl";
import authService from "./shared/service/authService";
import manageSkill from "./components/directive/manage-Skill"

const modules = [ngRoute, ngMaterial];

angular.module('ffonline', modules)
    .factory('AuthInterceptor', function ($rootScope, $q) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: 'auth-not-authenticated',
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .config(routeConfig)
    .service('$ff_authService', authService)
    .directive('manage-Skill', manageSkill)
    .controller('adminLoginCtrl', adminLoginCtrl)
    .controller('adminMainCtrl', adminMainCtrl);
