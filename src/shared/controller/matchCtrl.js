'use strict';

matchCtrl.$inject = ['$ff_socketioService', '$routeParams', '$ff_userService', '$location', '$mdDialog'];

export default function matchCtrl($ff_socketioService, $routeParams, $ff_userService, $location, $mdDialog) {

    //let ctrl = this;

    let io = $ff_socketioService;
    let gid = $routeParams.gid;

    let game = null;
    let waiting = null;
    let starting = false;

    io.emit('joinMatch', {
        request: 'join',
        as: 'player',
        gid: gid,
        uid: $ff_userService.id
    });

    io.on('gameStarted', data => {
        if(data.start)
            starting = true;
        if(data.success)
            game = new window.Phaser.Game(1200, 500, window.Phaser.AUTO, 'ffo-match', {
                preload: preload,
                create: create
            });
        else {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title('Error!')
                    .textContent('This game not exists or is not yet started')
                   .ariaLabel('Error')
                    .ok('ok')
            ).then(function() {
                $location.path('/');
            });
        }
    });

    io.on('joinRequest', data => {
        $mdDialog.show({
            templateUrl: 'modals/joinRequest',
            parent: angular.element(document.body),
            controller: function($scope, $mdDialog, $interval){

                this.time = 100;

                this.team = data.team;
                this.username = data.username;

                this.close = close;
                this.yes = yes;

                function yes(){
                    $mdDialog.hide();
                }

                function close() {
                    $interval.cancel(interval);
                    $mdDialog.cancel();
                }

                let interval = $interval(() => {
                    this.time-=(100/2000);
                    if(this.time < 0)
                        close();
                },5)
            },
            controllerAs: 'jRq',
            clickOutsideToClose:true,
        })
            .then(function() {
                io.emit('joinAnswer', {answer: 'accepted'});
                io.off('joinRequest');
            }, function() {
                io.emit('joinAnswer', {answer: 'refused'});
                waiting = waitingText(game.add.text(450, 200, 'Waiting for opponent', {fill: '#ffffff'}))
            });
    });

    function preload() {
        game.load.image('pitch', 'images/Pitch/nice.jpg');
    }

    function create() {
        const pitch = game.add.sprite(game.world.centerX, 0, 'pitch');
        pitch.anchor.setTo(0.5, 0);
        if(!starting) {
            let text = game.add.text(450, 200, 'Waiting for opponent', {fill: '#ffffff'});
            waiting = waitingText(text);
            io.on('joinRequest', () => {
                clearInterval(waiting);
            });
        }
    }

    function waitingText(text) {
        setTimeout(() => {
            text.setText('Waiting for opponent .');
            setTimeout(() => {
                text.setText('Waiting for opponent . .');
                setTimeout(() => {
                    text.setText('Waiting for opponent . . .');
                    setTimeout(() => {
                        text.setText('Waiting for opponent');
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
        return setInterval(() => {
            setTimeout(() => {
                text.setText('Waiting for opponent .');
                setTimeout(() => {
                    text.setText('Waiting for opponent . .');
                    setTimeout(() => {
                        text.setText('Waiting for opponent . . .');
                        setTimeout(() => {
                            text.setText('Waiting for opponent');
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 2000);
    }

}