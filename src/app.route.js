routeConfig.$inject = ["$routeProvider"];

export default function routeConfig($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./template/adminlogin.html",
            controller: 'adminLoginCtrl',
            controllerAs: 'alc'
        })
}