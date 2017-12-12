/** Class setting client sockets events. */
class UserEvents {
    constructor() {
        this.userArray = [];
    }

    /**
     * Adds new user to userArray
     * @param {Socket} user socket
     * @param {string} user nick
     */
    addUser(socket, nick) {
        this.userArray.push({
            'Id': socket.id,
            'Nick': nick
        });
    }

    /**
     * Removes user from userArray
     * @param {Socket} user socket
     */
    removeUser(socket) {
        for (let i = 0; i < this.userArray; i++) {
            if (this.userArray[i].Id == socket.id) {
                this.userArray.splice(i, 1);
            }
        }
    }

    /**
     * Checking if there is maximum users connected
     * @return {bool} true if not exceeded users number
     */
    maxUsers() {
        if (this.userArray.length > 200) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Checking if there nick already exist
     * @param {string} nick 
     * @return {bool} true if not exist
     */
    nickExsist(nick) {
        for (let i = 0; i < this.userArray.length; i++) {
            if ((nick.toUpperCase() == this.userArray[i].Nick.toUpperCase())) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returning user nick
     * @param {Socket} socket 
     */
    getUserNick(socket) {
        for (let i = 0; i < this.userArray.length; i++) {
            if (this.userArray[i].Id == socket.id) {
                return this.userArray[i].Nick;
            }
        }
    }

    /**
     * Checking if user can log in and then emit to client event err or logIn
     * @param {Socket} user socket 
     */
    logInEvent(socket) {
        socket.on(`logIn`, (nick) => {
            if (this.maxUsers()) {
                if (this.nickExsist(nick)) {
                    socket.emit(`logIn`,this.userArray);
                } else {
                    socket.emit(`err`, `Podany nick już istnieje.`);
                }
            } else {
                socket.emit(`err`, `Zbyt wiele osób na czacie, spróbuj ponownie za chwile.`);
            }
        });
    }

    /**
     * Connect user, add user to userArray and brodcast message abount user czat joining
     * @param {Socket} socket 
     */
    chatUserConnection(socket) {
        socket.on(`userConnect`, (nick) => {
            this.addUser(socket, nick);
            socket.broadcast.emit('userConnection', nick);
            console.log(`uzytkownik poolcozny ${nick}`);
        });
    }

    /**
     * User disconection event - deleting user form userArray and brodcast user disconection event
     * @param {Socket} socket 
     */
    chatUserDisconection(socket) {
        socket.on(`disconnect`, () => {
            for (let i = 0; i < this.userArray.length; i++) {
                if (this.userArray[i].Id == socket.id) {
                    console.log(`Uzytkownik ${this.userArray[i].Nick} rozłączony`);
                    socket.broadcast.emit(`userDisconected`, this.userArray[i].Nick);
                    this.userArray.splice(i, 1);
                }
            }
        });
    }

    /**
     * Brodcast user message to others users
     * @param {Socket} socket 
     */
    chatUserMessage(socket) {
        socket.on(`message`, (message) => {
            let messageObject = {
                'nick': this.getUserNick(socket),
                'message': message
            }
            socket.broadcast.emit(`message`, messageObject);
        });
    }

}

let userEventsObject = new UserEvents();

module.exports = {
    userEventsObject: userEventsObject
}