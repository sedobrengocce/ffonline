import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';
import routeConfig from './app.route';
import adminLoginCtrl from "./shared/controller/adminLoginCtrl";

const modules = [ngRoute, ngMaterial];

angular.module('ffonline', modules)
    .config(routeConfig)
    .controller('adminLoginCtrl', adminLoginCtrl);
