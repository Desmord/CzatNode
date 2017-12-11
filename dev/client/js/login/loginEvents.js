/**
 * Checking the login correctness
 */
class LoginValidationEvents {
    constructor() {
        this.insultsArray = [/kurwa/ig, /pierdole/ig, /pierdolony/ig, /kurwesko/ig, /huj/ig, /chuj/ig, /kurwy/ig, /kórwa/ig, /kurwić/ig, /pierdol/ig, /spierdalaj/ig, /zapierdolić/ig, /zapierdalać/ig, /upierdolić/ig, /jebany/ig, /zajebać/ig, /jebany/ig, /pizda/ig, /ciul/ig, /cipka/ig, /fuck/ig, /pizdo/ig];
        this.emptySpace = /\s/ig;
        this.acceptableCharacters = /[^A-Za-z0-9_łóźżćąśę]/ig;
    }

    /**
     * Seting and displaing error 
     * @param {string} error 
     */
    setError(error) {
        document.querySelector(`.errorInfo`).innerHTML = error;
    }

    /**
     * Returns login value
     * @return {string} login value
     */
    getLoginValue() {
        return document.querySelector(`#login`).value;
    }

    /**
     * Checking if login is too long
     */
    ifMaxLenght() {
        if (this.getLoginValue().length < 20) {
            this.setError(``);
        } else {
            this.setError(`Za długi nick. Maximum 20 znaków.`);
        }
    }

    /**
     * Checking if login sie a number
     * @param {string} login
     * @return {bool} true if number
     */
    isNumber(login) {
        return !isNaN(login);
    }

    /**
     * Checking if nick is space only
     * @param {string} login
     * @return  {bool} true if space only 
     */
    isSpaceOnly(login) {
        return (login.match(this.emptySpace)) ? true : false;
    }

    /**
     * Checking if login has zero characters
     * @param {string} login 
     * @return {bool} true if has 0 lenght
     */
    isZeroLenght(login) {
        return (login.length == 0) ? true : false;
    }

    /**
     * Checking if login is composed of acceptable characters
     * @param {string} login
     * @return {bool} ture if not 
     */
    isAcceptableCharakters(login) {
        return (login.match(this.acceptableCharacters)) ? true : false;
    }
    /**
     * Checking if login is offensive
     * @param {string} login 
     * @return {bool} ture if login is ofensive
     */
    isOffensive(login) {
        for (let i = 0; i < this.insultsArray.length; i++) {
            if (login.match(this.insultsArray[i])) {
                return true;
            }
        }
        return false;
    }


    /**
     * checking the login correctness using login module
     * @param {Socket} user socket
     */
    isLoginCorrect(socket) {
        if (this.isOffensive(this.getLoginValue())) {
            this.setError(`Login nie może zawierać przekleństwa.`);
        } else if (this.isZeroLenght(this.getLoginValue())) {
            this.setError(`Login musi posiadać przynajmniej jeden znak.`);
        } else if (this.isSpaceOnly(this.getLoginValue())) {
            this.setError(`Login nie może zawierać spacji.`);
        } else if (this.isNumber(this.getLoginValue())) {
            this.setError(`Login nie może być tylko liczbą.`);
        } else if (this.isAcceptableCharakters(this.getLoginValue())) {
            this.setError(`Użyto niedozwolone znaki.`);
        } else {
            socket.on(`err`, (error) => {
                this.setError(error);
            });
            socket.emit(`logIn`,this.getLoginValue()); 
        }
    }

}

module.exports = {
    LoginValidationEvents: LoginValidationEvents
}