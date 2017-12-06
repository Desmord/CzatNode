const czatFunctions = (() => {

    const getMyTime = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();

        (dd < 10) ? dd = '0' + dd: null;
        (mm < 10) ? mm = '0' + mm: null;
        (hh < 10) ? hh = '0' + hh: null;
        (min < 10) ? min = '0' + min: null;
        (sec < 10) ? sec = '0' + sec: null;

        today = `${yyyy}-${mm}-${dd}  ${hh}:${min}:${sec}`;

        return today;
    }

    const setFocus = () => {
        document.querySelector("#myMessageTextArea").focus();
    }

    const scrollCzatToBottom = () => {
        document.querySelector('#chatContent').scrollTop = document.querySelector('#chatContent').scrollHeight;
    }

    const getCzatFormValue = () => {
        let text = document.querySelector("#myMessageTextArea").value;
        for (let i = 0; i < insultsArray.length; i++) {
            text = text.replace(insultsArray[i], '*****');
        }
        return text;
    }

    const clearTextArea = () => {
            document.querySelector('#myMessageTextArea').value = '';
        }
        /* ---Zmienic na reacta te funkcje --- */

    const displayMessage = (nick, message) => {
        let nickElement = document.createElement('B');
        let nickText = document.createTextNode(nick);
        let titleText = document.createTextNode(getMyTime() + ' - ');
        let messageText = document.createTextNode(message);

        let titleNode = document.createElement('div');
        titleNode.classList.add('messageInfo');

        let messageNode = document.createElement('div');
        messageNode.classList.add('message');

        let mainNode = document.createElement('div');
        mainNode.classList.add('borderRadius5', 'empty');

        nickElement.appendChild(nickText);
        titleNode.appendChild(titleText);
        titleNode.appendChild(nickElement);
        messageNode.appendChild(messageText);
        mainNode.appendChild(titleNode);
        mainNode.appendChild(messageNode);

        document.querySelector('#chatContent').appendChild(mainNode);

        setTimeout(() => {
            mainNode.classList.add('othersMessage');
            scrollCzatToBottom();
            setTimeout(() => {
                scrollCzatToBottom();
            }, 500);
        }, 10);
    }

    const displayMyMessage = (nick, message) => {
        let nickElement = document.createElement('B');
        let nickText = document.createTextNode(nick);
        let titleText = document.createTextNode(getMyTime() + ' - ');
        let messageText = document.createTextNode(message);

        let titleNode = document.createElement('div');
        titleNode.classList.add('messageInfo');

        let messageNode = document.createElement('div');
        messageNode.classList.add('message');

        let mainNode = document.createElement('div');
        mainNode.classList.add('borderRadius5', 'emptyMyMessage');

        nickElement.appendChild(nickText);
        titleNode.appendChild(titleText);
        titleNode.appendChild(nickElement);
        messageNode.appendChild(messageText);
        mainNode.appendChild(titleNode);
        mainNode.appendChild(messageNode);

        document.querySelector('#chatContent').appendChild(mainNode);

        setTimeout(() => {
            mainNode.classList.add('myMessage');
            scrollCzatToBottom();
            setTimeout(() => {
                scrollCzatToBottom();
            }, 500);
        }, 10);
    }

    const displayServerConnection = () => {
        let titleNode = document.createElement('div');
        titleNode.classList.add('connectionLost', 'borderRadius5');

        let infoNode = document.createElement('div');
        infoNode.classList.add('message');

        let messageText = document.createTextNode(`Połączenie z serwerem nawiązane ${getMyTime()}.`);

        infoNode.appendChild(messageText);
        titleNode.appendChild(infoNode);
        document.querySelector('#chatContent').appendChild(titleNode);
    }

    const displayServerConnectionLost = () => {
        let titleNode = document.createElement('div');
        titleNode.classList.add('connectionLost', 'borderRadius5');

        let infoNode = document.createElement('div');
        infoNode.classList.add('message');

        let messageText = document.createTextNode(`Utracono połączenie z serwerem ${getMyTime()}.`);

        infoNode.appendChild(messageText);
        titleNode.appendChild(infoNode);
        document.querySelector('#chatContent').appendChild(titleNode);
    }

    const displayUserConnection = (nick) => {
        let titleNode = document.createElement('div');
        titleNode.classList.add('userConenctionAndDisconectionMessage', 'borderRadius5');

        let infoNode = document.createElement('div');
        infoNode.classList.add('messageInfo');

        let messageText = document.createTextNode(`${getMyTime()} Użytkownik ${nick} połączony.`);

        infoNode.appendChild(messageText);
        titleNode.appendChild(infoNode);
        document.querySelector('#chatContent').appendChild(titleNode);
    }

    const displayUserDisconnected = (nick) => {
        let titleNode = document.createElement('div');
        titleNode.classList.add('userConenctionAndDisconectionMessage', 'borderRadius5');

        let infoNode = document.createElement('div');
        infoNode.classList.add('messageInfo');

        let messageText = document.createTextNode(`${getMyTime()} Użytkownik ${nick} rozłączony.`);

        infoNode.appendChild(messageText);
        titleNode.appendChild(infoNode);
        document.querySelector('#chatContent').appendChild(titleNode);
    }

    /* --------------------------------------- */

    /* --- Socket events --- */
    /* --------------------- */

    const userConnection = () => {
        socket.on('userConnection', (nick) => {
            displayUserConnection(nick);
        });

    }

    const userDisconect = () => {
        socket.on('userDisconected', (nick) => {
            displayUserDisconnected(nick);
        });

    }

    const enterEvent = () => {
        document.addEventListener('keypress', (e) => {
            let keyname = e.key;
            if (keyname === 'Enter') {
                e.preventDefault();
                if (getCzatFormValue() == '') {
                    //empty textArea
                } else {
                    displayMyMessage(nick, getCzatFormValue());
                    socket.emit('message', getCzatFormValue());
                    clearTextArea();
                }
            }
        });
    }

    const myMessage = () => {
        document.querySelector("#sendMessage").addEventListener('click', () => {
            if (getCzatFormValue() == '') {
                //empty textArea
            } else {
                displayMyMessage(nick, getCzatFormValue());
                socket.emit('message', getCzatFormValue());
                clearTextArea();
                setFocus();
            }
        });
        enterEvent();
    }

    const message = () => {
        socket.on('message', (message) => {
            displayMessage(message.nick, message.message);
        });
    }

    const serverConnection = () => {
        displayServerConnection();
        scrollCzatToBottom();
    }

    const serverConectionLost = () => {
        socket.on('disconnect', () => {
            displayServerConnectionLost();
            scrollCzatToBottom();
        });
    }

    const userCzatEvents = () => {
        displayServerConnection();
        userConnection();
        userDisconect();
        myMessage();
        message();
        serverConectionLost();
        setFocus();
        scrollCzatToBottom();
    }

    return {
        'userCzatEvents': userCzatEvents
    }

})();