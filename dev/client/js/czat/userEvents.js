const displayHideMethods = require(`./displayCzatMethods.js`);

/** Seting user czat event and displeing czat container */
class UserEvents {
    constructor() {
        this.userArray = [];
    }

    /**
     * Adds new nick to userArray
     * @param {string} nick 
     */
    addUser(nick) {
        this.userArray.push(nick);
        displayHideMethods.generateUserList(this.userArray);
    }

    /**
     * Removes nick for userArray
     * @param {string} nick 
     */
    removeUser(nick) {
        console.log(nick);
        for (let i = 0; i < this.userArray.length; i++) {
            if (this.userArray[i] == nick) {
                console.log(`znaleziono`);
                this.userArray.splice(i, 1);
            }
        }
        console.log(this.userArray);
        displayHideMethods.generateUserList(this.userArray);
    }

    /**
     * Returns login
     */
    getLoginValue() {
        return document.querySelector(`#login`).value;
    }

    /**
     * Adding keypress Enter event
     * @param {Socket} socket 
     */
    setEnterEvent(socket) {
        document.addEventListener('keypress', (e) => {
            let keyname = e.key;
            if (keyname === 'Enter') {
                e.preventDefault();
                if (document.querySelector(`#czatTextArea`).value == ``) {

                } else {
                    socket.emit(`message`, document.querySelector(`#czatTextArea`).value);
                    displayHideMethods.addMyMessage(document.querySelector(`#czatTextArea`).value, this.getLoginValue());
                    document.querySelector(`.chat`).scrollTop = document.querySelector(`.chat`).scrollHeight;
                    document.querySelector(`#czatTextArea`).value = ``;
                }
            }
        });
    }

    /**
     * Adding click event to czat 'Wyslij' button
     * @param {Socket} socket 
     */
    setClickEvent(socket) {
        document.querySelector(`.chatSendButton`).addEventListener(`click`, () => {
            if (document.querySelector(`#czatTextArea`).value == ``) {

            } else {
                socket.emit(`message`, document.querySelector(`#czatTextArea`).value);
                displayHideMethods.addMyMessage(document.querySelector(`#czatTextArea`).value, this.getLoginValue());
                document.querySelector(`.chat`).scrollTop = document.querySelector(`.chat`).scrollHeight;
                document.querySelector(`#czatTextArea`).value = ``;
            }
        });
    }

    /**
     * Setting key and mouse events
     * @param {Socket} socket 
     */
    setButtonEvents(socket) {
        this.setClickEvent(socket);
        this.setEnterEvent(socket);
    }

    /**
     * Setting socket events
     * @param {Socket} socket 
     */
    logIn(socket) {
        socket.on(`logIn`, (users) => {
            displayHideMethods.changeContainer();
            displayHideMethods.addConectionInfo();

            console.log(users);
            for (let i = 0; i < users.length; i++) {
                this.userArray.push(users[i].Nick);
                console.log(users.Nick);
            }
            displayHideMethods.generateUserList(this.userArray);

            this.setButtonEvents(socket);

            socket.emit(`userConnect`, this.getLoginValue());

            socket.on(`userConnection`, (nick) => {
                console.log(`nowy user ${nick}`);
                displayHideMethods.addUserConnectionInfo(nick);
                this.addUser(nick);
            });

            socket.on(`userDisconected`, (nick) => {
                console.log(`Uzytkownik ${nick} rozłaczony`);
                displayHideMethods.addUserDisconectedInfo(nick);
                this.removeUser(nick);
            });

            socket.on('message', (messageObject) => {
                displayHideMethods.addOtherMessage(messageObject);
                document.querySelector(`.chat`).scrollTop = document.querySelector(`.chat`).scrollHeight;
            });

        });
    }
}

module.exports = {
    UserEvents: UserEvents
}