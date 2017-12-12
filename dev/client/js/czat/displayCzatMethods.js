/**
 * Returns actual date and time
 * @param {date} data and time
 */
const getMyTime = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    (dd < 10) ? dd = '0' + dd : null;
    (mm < 10) ? mm = '0' + mm : null;
    (hh < 10) ? hh = '0' + hh : null;
    (min < 10) ? min = '0' + min : null;
    (sec < 10) ? sec = '0' + sec : null;

    today = `${yyyy}-${mm}-${dd}  ${hh}:${min}:${sec}`;

    return today;
}

/**
 * Generate Node element and displaing it within users Container
 * @param {array} userArray 
 */
let generateUserList = (userArray) => {
    let myNode = document.querySelector(".chatUserList");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    for (let i = 0; i < userArray.length; i++) {
        let element = document.createElement(`div`);
        element.classList.add(`user`);
        let text = document.createTextNode(userArray[i]);
        element.appendChild(text)
        myNode.appendChild(element);
    }

}

/**
 * Generates others users connection info element and display it in chat
 * @param {string} nick 
 */
let addUserConnectionInfo = (nick) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`chatUserConnectionInfo`);
    let elementText = document.createTextNode(`${getMyTime()} Użytkownik ${nick} połączony`);
    parentElement.appendChild(elementText);
    document.querySelector(`.chat`).appendChild(parentElement);
}

/**
 * Generates user connection info element and display it in chat
 */
let addConectionInfo = () => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`czatInfo`);
    let elementText = document.createTextNode(`Połączenie z serwerem nawiązane ${getMyTime()}`);
    parentElement.appendChild(elementText);
    document.querySelector(`.chat`).appendChild(parentElement);
}

/**
 * Generates user disconnection info element and display it in chat
 * @param {string} nick 
 */
let addUserDisconectedInfo = (nick) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`chatUserConnectionInfo`);
    let elementText = document.createTextNode(`${getMyTime()} Użytkownik ${nick} rozłączony`);
    parentElement.appendChild(elementText);
    document.querySelector(`.chat`).appendChild(parentElement);
}

/**
 * Generates user messagen info element and display it in chat
 * @param {string} message
 * @param {string} user nick 
 */
let addMyMessage = (message, nick) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`myMessage`);

    let messageTitle = document.createElement(`div`);
    messageTitle.classList.add(`messageTitle`);

    let titleText = document.createTextNode(`${getMyTime()} -  `);
    let nickElement = document.createElement(`div`);
    let nickElementText = document.createTextNode(`${nick}`);

    messageTitle.appendChild(titleText);
    nickElement.appendChild(nickElementText);
    messageTitle.appendChild(nickElement);
    parentElement.appendChild(messageTitle);

    let messageTextElement = document.createElement(`div`);
    messageTextElement.classList.add(`messageText`);
    let messageText = document.createTextNode(`${message}`);
    messageTextElement.appendChild(messageText);

    parentElement.appendChild(messageTextElement);

    document.querySelector(`.chat`).appendChild(parentElement);
    setTimeout(() => {
        parentElement.classList.add(`showMessage`);
    }, 100);
}

/**
 * Generates self message info element and display it in chat
 * @param {object} object with nick and message 
 */
let addOtherMessage = (messageObject) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`othersMessage`);

    let messageTitle = document.createElement(`div`);
    messageTitle.classList.add(`messageTitle`);

    let titleText = document.createTextNode(`${getMyTime()} -  `);
    let nickElement = document.createElement(`div`);
    let nickElementText = document.createTextNode(`${messageObject.nick}`);

    messageTitle.appendChild(titleText);
    nickElement.appendChild(nickElementText);
    messageTitle.appendChild(nickElement);
    parentElement.appendChild(messageTitle);

    let messageTextElement = document.createElement(`div`);
    messageTextElement.classList.add(`messageText`);
    let messageText = document.createTextNode(`${messageObject.message}`);
    messageTextElement.appendChild(messageText);

    parentElement.appendChild(messageTextElement);

    document.querySelector(`.chat`).appendChild(parentElement);
    setTimeout(() => {
        parentElement.classList.add(`showMessage`);
    }, 100);
}

/**
 * Hidding login container
 */
let hideLoginContainer = () => {
    document.querySelector(`.loginContainer`).classList.add(`hideContainer`);
    setTimeout(() => {
        document.querySelector(`.loginContainer`).style.display = 'none';
    }, 500);
}

/**
 * Shows czat container
 */
let showCzatContainer = () => {
    document.querySelector(`.czatContainer`).style.opacity = '0';
    document.querySelector(`.czatContainer`).style.display = 'block';
    setTimeout(() => {
        document.querySelector(`.czatContainer`).style.opacity = '1';
    }, 100);
}

/**
 * Change login container to czat container
 */
let changeContainer = () => {
    hideLoginContainer();
    setTimeout(() => {
        showCzatContainer();
    }, 600);
}

module.exports = {
    changeContainer: changeContainer,
    addConectionInfo: addConectionInfo,
    addUserConnectionInfo: addUserConnectionInfo,
    addUserDisconectedInfo: addUserDisconectedInfo,
    addMyMessage: addMyMessage,
    addOtherMessage: addOtherMessage,
    generateUserList: generateUserList
}