"use strict";

const jwt = require('jwt-simple');

routeConfig.$inject = ["$routeProvider"];

export default function routeConfig($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: "./template/adminlogin",
            controller: 'adminLoginCtrl',
            controllerAs: 'alc'
        })
        .when('/admin/main', {
            templateUrl: "./template/adminmain",
            controller: 'adminMainCtrl',
            controllerAs: 'amc'
        })
        .when("/game", {
            templateUrl: "./template/game",
            controller: 'gameCtrl',
            controllerAs: 'game'
        })
        .when("/match", {
            templateUrl: "./template/match",
            controller: 'matchCtrl',
            controllerAs: 'match'
        })
        .when('/', {
            redirectTo: '/game'
        })
}