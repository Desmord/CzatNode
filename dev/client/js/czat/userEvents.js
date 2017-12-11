const displayHideMethods = require(`./displayCzatMethods.js`);

/** Seting user czat event and displeing czat container */
class UserEvents {
    constructor() { 
        this.userArray = [];
    }

    addUser(){

    }

    removeUser(){
        
    }

    getLoginValue(){
        return document.querySelector(`#login`).value;
    }

    setEnterEvent(socket){
        document.addEventListener('keypress', (e) => {
            let keyname = e.key;
            if (keyname === 'Enter') {
                e.preventDefault();
                socket.emit(`message`,document.querySelector(`#czatTextArea`).value);
                displayHideMethods.addMyMessage(document.querySelector(`#czatTextArea`).value,this.getLoginValue());
                document.querySelector(`.chat`).scrollTop = document.querySelector(`.chat`).scrollHeight;
            }
        });
    }

    setClickEvent(socket){
        document.querySelector(`.chatSendButton`).addEventListener(`click`,()=>{
            socket.emit(`message`,document.querySelector(`#czatTextArea`).value);
            displayHideMethods.addMyMessage(document.querySelector(`#czatTextArea`).value,this.getLoginValue());
            document.querySelector(`.chat`).scrollTop = document.querySelector(`.chat`).scrollHeight;
        });
    }

    setButtonEvents(socket){
        this.setClickEvent(socket);
        this.setEnterEvent(socket);
    }

    logIn(socket) {
        socket.on(`logIn`, () => {
            displayHideMethods.changeContainer();
            displayHideMethods.addConectionInfo();

            this.setButtonEvents(socket);

            socket.emit(`userConnect`,this.getLoginValue());

            socket.on(`userConnection`, (nick) => {
                console.log(`nowy user ${nick}`);
               displayHideMethods.addUserConnectionInfo(nick);
            });

            socket.on(`userDisconected`, (nick) => {
                console.log(`Uzytkownik ${nick} rozłaczony`);
                displayHideMethods.addUserDisconectedInfo(nick);
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