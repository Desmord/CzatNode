const displayHideMethods = require(`./displayCzatMethods.js`);

/** Seting user czat event and displeing czat container */
class UserEvents {
    constructor() { }




    logIn(socket) {
        socket.on(`logIn`, () => {
            displayHideMethods.changeContainer();
            displayHideMethods.addConectionInfo();

            socket.on(`userConnection`, (nick) => {
                console.log(`Inny uzytkownik o nicku ${nick} polaczony`);
            })

            socket.on(`userDisconected`, (nick) => {
                console.log(`Uzytkownik ${nick} rozłaczony`);
            });

            socket.on('message', (messageObject) => {
                console.log(messageObject);
            });


            // 6
// //wysywalnie wiadomosci
// socket.emit(`message`,`Wiadomosc`);

        });
    }
}

module.exports = {
    UserEvents: UserEvents
}