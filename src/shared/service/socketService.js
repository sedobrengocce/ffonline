'use strict';

export default function socketService($rootScope) {

    function Ss() {
        //noinspection ES6ModulesDependencies
        const socket = io.connect();

        function on(eventName, callback) {
            socket.on(eventName, function () {
                const args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function emit(eventName, data, callback) {
            socket.emit(eventName, data, function () {
                const args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }

        this.on = on;
        this.emit = emit;
    }
    return new Ss();
}
