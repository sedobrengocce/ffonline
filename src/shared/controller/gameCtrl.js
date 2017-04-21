'use strict';

gameCtrl.$inject = ['$ff_socketioService', '$scope', '$location', '$ff_userService', '$mdDialog'];

export default function gameCtrl($ff_socketioService, $scope, $location, $ff_userService, $mdDialog){

    let ctrl = this;

    let io = $ff_socketioService;

    this.user = {
        name: $ff_userService.username,
        id: $ff_userService.id,
        teams: $ff_userService.teams,
        friends: $ff_userService.friends
    };
    this.types = [
        {name: 'Public', id:1},
        {name: 'Private', id:2},
        {name: 'Test', id:0},
    ];
    this.newGame = {
        name: null,
        type: null,
    };
    this.teamSelected = null;
    this.friendSelected = null;
    this.openGames = [];

    let refusedGames = [];

    this.createNew = createNew;
    this.join = join;

    /**
     * Listeners
     */

    io.on('gameList', populateGameList);

    /**
     * Watchers
     */

    $scope.$watch('game.invite', val => {
       if(!val)
           this.friendSelected = null;
    });

    function createNew() {
        for(let team of ctrl.user.teams)
            if(team.id === Number(ctrl.teamSelected)) {
                io.on('gameCreation', data => {
                    if(data.status === 0)
                        $location.url('/match?gid=' + data.gid);
                    else
                        console.log('Error Creating Game');
                });
                io.emit('createNewGame', {
                    request: 'new',
                    newGame: {
                        name: ctrl.newGame.name,
                        type: ctrl.newGame.type,
                        home: {
                            username: ctrl.user.name,
                            userid: ctrl.user.id,
                            team: team,
                        }
                    }
                }

                );
                break;
            }
    }

    function populateGameList(list){
        ctrl.openGames.length = 0;
        ctrl.openGames = list;

    }

    function join(ev, gid, tv){
        $mdDialog.show({
            templateUrl: 'modals/joinGame',
            parent: angular.element(document.body),
            targetEvent: ev,
            controller: function($mdDialog){

                let gameID = gid;
                let jr = this;
                //noinspection JSPotentiallyInvalidUsageOfThis
                this.teamSelected = null;
                //noinspection JSPotentiallyInvalidUsageOfThis
                this.user = ctrl.user;

                this.close = close;
                this.ask = ask;
                this.checkDifference = checkDifference;

                function close() {
                    $mdDialog.cancel();
                }

                function ask() {
                    for(let team of ctrl.user.teams)
                        if(team.id === Number(jr.teamSelected)) {
                            io.on('gameAnswer', data => {
                                if(data.status === 'accepted')
                                    $location.url('/match?gid=' + data.gid);
                                else
                                    $mdDialog.hide('refused');
                            });
                            //noinspection JSPotentiallyInvalidUsageOfThis
                            io.emit('joinMatch', {
                                request: 'join',
                                gid: gameID,
                                away: {
                                    username: ctrl.user.name,
                                    userid: ctrl.user.id,
                                    team: team
                                }
                            });
                            break;
                        }
                }

                function checkDifference(teamID) {
                    let stTV = -1;
                    for(let t of ctrl.user.teams)
                        if(t.id === teamID) {
                            stTV = t.tv;
                            break;
                        }
                    return !(stTV > -1 && (Math.abs(stTV - tv) < (tv * 0.2)));
                }
            },
            controllerAs: 'jDC',
            clickOutsideToClose:true,
        })
            .then(function() {
                const obj = {
                    gid: gid,
                    time: new Date().getTime()
                };
                refusedGames.push(obj);
            }, function() {});
    }
}

