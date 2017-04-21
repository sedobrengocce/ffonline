'use strict';

const uuid = require('uuid/v4');

let connectedUser = {};

/**
 * @type {{gid: {
 *             data: *,
 *             status: number
 *        } }}
 * @data: {
 *         name: string,
           type: string,
           home: {
               username: string,
               userid: number,
               team: {
                    name: string,
                    id: number,
                    tv: number,
                    race: string
               }
           away: {
               username: string,
               userid: number,
               team: {
                    name: string,
                    id: number,
                    tv: number,
                    race: string
               }
  }
 * @status 0 -> Not Started
 *         1 -> Waiting for Opponent
 *         2 -> Waiting for Opponent Connection
 *         3 -> Started
 *         4 -> Ended
 */
let Games = {};

function addUser(user) {
    if(connectedUser[user.id])
        return;
    connectedUser[user.id] = user.name;
    console.log((new Date()) + ': ' + user.name + ' Connected');
}

function removeUser(user) {
    if(connectedUser[user.id]) {
        connectedUser.slice(user.id, 1);
        console.log((new Date()) + ': ' + user.name + ' Disonnected');
    }
}

function newGame(data) {
    try {
        const gid = uuid();
        Games[gid] = {
            data: {
                name: data.name,
                type: data.type,
                home: {
                    username: data.home.username,
                    userid: data.home.userid,
                    team: {
                        name: data.home.team.name,
                        id: data.home.team.id,
                        tv: data.home.team.tv,
                        race: data.home.team.race
                    }
                },
                away: {
                    username: null,
                    userid: null,
                    team: {
                        name: null,
                        id: null,
                        tv: null,
                        race: null
                    }
                }
            },
            status: 0
        };
        console.log((new Date()) + ': Match ' + data.name + ' Created by ' + data.home.username);
        return gid;
    } catch (err){
        return false;
    }
}

function hasOpponent(gid) {
    return !!Games[gid].data.away.team.id;
}

function getGameList(){
    return Games;
}

function getGameListId(){
    return Object.keys(Games);
}

function getGameStatus(gid){
    if (Games[gid])
        return Games[gid].status;
    else
        return null;
}

function setGameStatus(gid, status){
    Games[gid].status = status;
}

function setOpponent(gid, data) {
    Games[gid].away.username =  data.username;
    Games[gid].away.userid = data.userid;
    Games[gid].away.team.name = data.team.name;
    Games[gid].away.team.id = data.team.id;
    Games[gid].away.team.tv = data.team.tv;
    Games[gid].away.team.race = data.team.race;
}

function getGameHost(gid){
    return Games[gid].data.home.userid;
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.newGame = newGame;
exports.getGameList = getGameList;
exports.getGameStatus = getGameStatus;
exports.setGameStatus = setGameStatus;
exports.getGameHost = getGameHost;
exports.getGameListId = getGameListId;
exports.hasOpponent = hasOpponent;
exports.setOpponent = setOpponent;