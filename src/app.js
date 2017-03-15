import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';
import routeConfig from './app.route';
import adminLoginCtrl from "./shared/controller/adminLoginCtrl";
import adminMainCtrl from "./shared/controller/adminMainCtrl";
import authService from "./shared/service/authService";
import manageSkill from "./components/directive/manage-Skill"
import manageLeague from "./components/directive/manage-League"
import manageMatch from "./components/directive/manage-Match"
import managePlayer from "./components/directive/manage-Player"
import manageRace from "./components/directive/manage-Race"
import manageUser from "./components/directive/manage-User"
import adminDashboard from "./components/directive/adminDashboard"


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
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('ffom')
            .primaryPalette('indigo')
            .accentPalette('indigo')
            .warnPalette('indigo');
    })
    .config(routeConfig)
    .service('$ff_authService', authService)
    .directive('adminDashboard', adminDashboard)
    .directive('manageSkill', manageSkill)
    .directive('manageLeague', manageLeague)
    .directive('manageMatch', manageMatch)
    .directive('managePlayer', managePlayer)
    .directive('manageRace', manageRace)
    .directive('manageUser', manageUser)
    .controller('adminLoginCtrl', adminLoginCtrl)
    .controller('adminMainCtrl', adminMainCtrl);
