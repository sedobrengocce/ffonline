'use strict';

const game = require('../game');

let sockets = {};

function onConnection(socket){
    socket.emit('greetings');
    sockets[socket.client.id] = socket;

    /**
     *  Socket Event Listeners
     */

    socket.on('addUserData', handleUserData);
    socket.on('createNewGame', handleGame);
    socket.on('joinMatch', handleGame);
    socket.on('logout', handleUserData);
}

function openGames(socket) {
    socket.emit('gameList', game.storeData.getGameList());
}

function handleGame(data) {
    switch(data.request){
        case 'new':
            const gid = game.storeData.newGame(data.newGame);
            if(gid)
                this.emit('gameCreation', {status: 0, gid: gid});
            else
                this.emit('gameCreation', {status: 1});
            break;
        case 'join':
            switch(game.storeData.getGameStatus(data.gid)){
                case 0:
                    if(data.uid === game.storeData.getGameHost(data.gid)){
                        game.storeData.setGameStatus(data.gid, 1);
                        this.emit('gameStarted', {success: true,
                                                    start: false});
                        this.join(data.gid);
                    } else {
                        this.emit('gameStarted', {success: false,
                                                    start: false});
                    }
                    break;
                case 1:
                    if(data.uid === game.storeData.getGameHost(data.gid)) {
                        this.emit('gameStarted', {success: true,
                                    start: false});
                        this.join(data.gid);
                        break;
                    }
                    this.join(data.gid);
                    this.to(data.gid).emit('joinRequest', data.away);
                    this.on('joinAnswer', resp => {
                        if(resp.answer === 'accepted') {
                            game.storeData.setOpponent(data.gid, data.away);
                            game.storeData.setGameStatus(data.gid, 2);
                        }
                        else
                            this.leave(data.gid);
                        this.emit('gameAnswer', {status: resp.answer});
                        this.off('joinAnswer');
                    });
                    break;
                case 2:

                    break;
                default:
                    this.emit('gameAnswer', {success: false});
            }
            break;
    }
}

function handleUserData(data){
    if(data.operation === 'add')
        game.storeData.addUser(data);
    else if(data.operation === 'delete'){
        game.storeData.removeUser(data);
        sockets[this.client.id].removeAllListeners();
        delete sockets[this.client.id];
    }
}

exports.onConnection = onConnection;
exports.openGames = openGames;
