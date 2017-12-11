const displayHideMethods = require(`./displayCzatMethods.js`);

/** Seting user czat event and displeing czat container */
class UserEvents {
    constructor() { }

    getLoginValue(){
        return document.querySelector(`#login`).value;
    }

    logIn(socket) {
        socket.on(`logIn`, () => {
            displayHideMethods.changeContainer();
            displayHideMethods.addConectionInfo();

            socket.emit(`userConnect`,this.getLoginValue());

            socket.on(`userConnection`, (nick) => {
                console.log(`nowy user ${nick}`);
               displayHideMethods.addUserConnectionInfo();
            });

            // socket.on(`userDisconected`, (nick) => {
            //     console.log(`Uzytkownik ${nick} rozłaczony`);
            // });

            // socket.on('message', (messageObject) => {
            //     console.log(messageObject);
            // });


            // socket.emit(`userConnect`,`MikołajNick`);

            // 6
// //wysywalnie wiadomosci
// socket.emit(`message`,`Wiadomosc`);

        });
    }
}

module.exports = {
    UserEvents: UserEvents
}