'use strict';

export default function userService($ff_socketioService) {

    function Us() {

        const io = $ff_socketioService;

        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        const id = Math.floor(Math.random() * 100);

        this.username = text;
        this.id = id;

        this.teams = [
            {name: 'Team 1', id:0, tv: 1000, race: 'human'},
            {name: 'Team 2', id:1, tv: 1000, race: 'orc'},
        ];
        this.friends = [
            {name: 'Friend1', id: id + 1, online: true},
            {name: 'Friend2', id: id + 2, online: false},
            {name: 'Friend3', id: id + 3, online: true},
            {name: 'Friend4', id: id + 4, online: true}
        ];

        io.on('greetings',() => {
            io.emit('addUserData', {
                operation: 'add',
                name: this.username,
                id: this.id
            });
        });
    }

    return new Us();
}
