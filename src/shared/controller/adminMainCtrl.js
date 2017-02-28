'use strict';

adminMainCtrl.$inject = ['$http', '$location', '$ff_authService'];

export default function adminMainCtrl($http, $location, $ff_authService){

    let ctrl = this;

    if(!$ff_authService.isAuthenticated())
        $location.path('/');
}

