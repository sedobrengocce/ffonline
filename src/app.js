import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import routeConfig from './app.route';
import adminLoginCtrl from "./shared/controller/adminLoginCtrl";
import adminMainCtrl from "./shared/controller/adminMainCtrl";
import authService from "./shared/service/authService";
import socketService from "./shared/service/socketService";
import manageSkill from "./components/directive/manage-Skill"
import manageLeague from "./components/directive/manage-League"
import manageMatch from "./components/directive/manage-Match"
import managePlayer from "./components/directive/manage-Player"
import manageRace from "./components/directive/manage-Race"
import manageUser from "./components/directive/manage-User"
import adminDashboard from "./components/directive/adminDashboard"
import gameCtrl from "./shared/controller/gameCtrl"
import matchCtrl from "./shared/controller/matchCtrl"
import userService from "./shared/service/userService"
/**
 * Setting Globals for Phaser
 */

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

/**
 * Loaded Modules
 */

const modules = [
    ngRoute,
    ngMaterial,
    ngMessages
];

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
    .service('$ff_socketioService', socketService)
    .service('$ff_userService', userService)
    .directive('adminDashboard', adminDashboard)
    .directive('manageSkill', manageSkill)
    .directive('manageLeague', manageLeague)
    .directive('manageMatch', manageMatch)
    .directive('managePlayer', managePlayer)
    .directive('manageRace', manageRace)
    .directive('manageUser', manageUser)
    .controller('adminLoginCtrl', adminLoginCtrl)
    .controller('adminMainCtrl', adminMainCtrl)
    .controller('gameCtrl', gameCtrl)
    .controller('matchCtrl', matchCtrl);
