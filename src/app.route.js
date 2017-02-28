"use strict";

const jwt = require('jwt-simple');

routeConfig.$inject = ["$routeProvider"];

export default function routeConfig($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./template/adminlogin.html",
            controller: 'adminLoginCtrl',
            controllerAs: 'alc'
        })
        .when('/main', {
            templateUrl: "./template/adminmain.html",
            controller: 'adminMainCtrl',
            controllerAs: 'amc'
        })
}