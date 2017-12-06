(() => {

    const getLoginValue = () => {
        return document.querySelector("#login").value;
    }

    const getErrorInfo = () => {
        return document.querySelector('#errorInfo');
    }


    /*  Validation Functions */
    /*  -------------------- */


    const setErrorClass = () => {
        getErrorInfo().classList.remove('info');
        getErrorInfo().classList.add('error');
    }

    const setInfoClass = () => {
        getErrorInfo().classList.remove('error');
        getErrorInfo().classList.add('info');
    }

    const setErrorText = (errorText, isError) => {
        getErrorInfo().innerHTML = errorText;
        (isError) ? setErrorClass(): setInfoClass();
    }

    const isOffensive = () => {
        for (let i = 0; i < insultsArray.length; i++) {
            if (getLoginValue().match(insultsArray[i])) {
                return true;
            }
        }
        return false;
    }

    const isNumber = () => {
        return !isNaN(getLoginValue());
    }

    const loginZeroLength = () => {
        return true;
    }

    const isZeroLength = () => {
        return (getLoginValue().length == 0) ? loginZeroLength() : false;
    }

    const isMaxLength = () => {
        return (getLoginValue().length == 20) ? true : false;
    }

    const isSapceOnly = () => {
        return (getLoginValue().match(emptySpace)) ? true : false;
    }

    const isAcceptableCharakters = () => {
        return (getLoginValue().match(acceptableCharacters)) ? true : false;
    }

    const maxUsersEvent = () => {
        socket.emit('maxUsers');
        socket.on('maxUsers', (msg) => {
            if (msg == 1) {
                return true;
            } else {
                setErrorText('', true);
                document.removeEventListener('keypress', loginButtonFunction);
                return false;
            }
        });
    }


    const ifMaxUsers = () => {
        try {
            socket = io.connect("ws://localhost:8080");
            if (maxUsersEvent()) {
                signIn();
            }
        } catch (err) {
            console.log('Błąd połączenia: ' + err);
            return true;
        }
    }


    /* End of validation functions */
    /* --------------------------- */

    const hideLoginForm = () => {
        const loginContent = document.querySelector('#loginContent');
        loginContent.style.opacity = 0;
        loginContent.style.width = 0 + 'px';
        loginContent.style.height = 0 + 'px';
    }

    const setCzatFormStyle = (width) => {
        chatContainer.style.opacity = 1;
        chatContainer.style.width = width + "%";
        chatContainer.style.height = 80 + "%";
        chatContainer.style.display = 'flex';
    }

    const displayCzatForm = () => {
        const chatContainer = document.querySelector('#chatContainer');
        const windowWidth = window.innerWidth;

        if (windowWidth < 480) {
            setCzatFormStyle(95);
        } else if (windowWidth < 769) {
            setCzatFormStyle(90);
        } else {
            setCzatFormStyle(80);
        }
    }

    const transisionFormLoginToCzat = () => {
        hideLoginForm();
        setTimeout(() => {
            displayCzatForm();
        }, 600);
    }

    const signIn = () => {
        transisionFormLoginToCzat();
        nick = getLoginValue();
        socket.emit('userConnection', nick);
        czatFunctions.userCzatEvents();
    }

    const signInEvent = () => {
        if (isZeroLength()) {
            setErrorText('Nick musi zawierać przynajmniej jeden znak.', true);
        } else if (isSapceOnly()) {
            setErrorText('Nick nie może zawierać pustych znaków.', true);
        } else if (isNumber()) {
            setErrorText('Nick nie może być liczbą.', true);
        } else if (isOffensive()) {
            setErrorText('Nick nie może zawierać słów obraźliwych.', true);
        } else if (isAcceptableCharakters()) {
            setErrorText('Użyto nieakceptowanych znaków.', true);
        } else if (ifMaxUsers()) {
            setErrorText('Za duża liczba użytkowników czatu. Brak połączenia.', true);
        } else {
            signIn();
        }
    }

    const loginButtonFunction = (e) => {
        let keyname = e.key;
        if (keyname === 'Enter') {
            signInEvent();
        }
    }


    const addEvents = () => {

        //kliknięcie na przycisk zatwierdź
        document.querySelector("#loginButton").addEventListener('click', signInEvent);
        //wciśnięcie przycisku Enter
        document.addEventListener('keypress', loginButtonFunction);

        //Wpisywanie liter do textInputu 
        document.querySelector('#login').addEventListener('input', () => {
            (isMaxLength()) ? setErrorText('Maksymalna długość nicku wynosi 20 znaków.', false): setErrorText('', true);
        });
    }

    addEvents();


})()