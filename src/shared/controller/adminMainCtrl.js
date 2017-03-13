'use strict';

adminMainCtrl.$inject = ['$http', '$location', '$ff_authService', '$mdSidenav'];

export default function adminMainCtrl($http, $location, $ff_authService, $mdSidenav){

    let ctrl = this;

    this.token = '';

    this.auth = $ff_authService.isAuthenticated();

    if(!$ff_authService.isAuthenticated())
        $location.path('/');

    this.logout = () => {
        $ff_authService.logout();
        $location.path('/');
    };

    this.leftMenu = () => {
        $mdSidenav('left').toggle();
    };
}

