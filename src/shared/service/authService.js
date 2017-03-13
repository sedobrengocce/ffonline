'use strict';

export default function authService($q, $http) {
    const LOCAL_TOKEN_KEY = 'yourTokenKey';
    let isAuthenticated = false;
    let authToken;
    let username;

    function loadUserCredentials() {
        const token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    const register = function (user) {
        return $q(function (resolve, reject) {
            $http.post('/api/v1/oauth/signup', user).then(function (result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    const login = function (user) {
        return $q(function (resolve, reject) {
            $http.post('/api/v1/oauth/login', user).then(function (result) {
                if (result.data.success) {
                    storeUserCredentials(result.data.token);
                    username = user.user;
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    const logout = function () {
        destroyUserCredentials();
    };

    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: function() {return isAuthenticated;},
    };
}
