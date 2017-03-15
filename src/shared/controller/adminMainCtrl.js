'use strict';

adminMainCtrl.$inject = ['$http', '$location', '$ff_authService', '$mdSidenav'];

export default function adminMainCtrl($http, $location, $ff_authService, $mdSidenav){

    this.token = '';

    this.selectedItem = 'Dashboard';

    this.speedDial = 'md-scale';

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

