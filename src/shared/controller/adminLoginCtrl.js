'use strict';

adminLoginCtrl.$inject = ['$http', '$location', '$ff_authService'];

export default function adminLoginCtrl($http, $location, $ff_authService){

    let ctrl = this;

    this.username = '';
    this.password = '';

    this.login = () => {
        let data = {
            user: ctrl.username,
            pass: ctrl.password
        };

        $ff_authService.login(data);

    };
}

