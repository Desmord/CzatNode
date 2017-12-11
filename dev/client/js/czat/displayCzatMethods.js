
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

let addUserConnectionInfo = (nick) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`chatUserConnectionInfo`);
    let elementText = document.createTextNode(`${getMyTime()} Użytkownik ${nick} połączony`);
    parentElement.appendChild(elementText);
    document.querySelector(`.chat`).appendChild(parentElement);
}

let addConectionInfo = () => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`czatInfo`);
    let elementText = document.createTextNode(`Połączenie z serwerem nawiązane ${getMyTime()}`);
    parentElement.appendChild(elementText);
    document.querySelector(`.chat`).appendChild(parentElement);
}

let addUserDisconectedInfo = (nick) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`chatUserConnectionInfo`);
    let elementText = document.createTextNode(`${getMyTime()} Użytkownik ${nick} rozłączony`);
    parentElement.appendChild(elementText);
    document.querySelector(`.chat`).appendChild(parentElement);
}

let addMyMessage = (message, nick) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`myMessage`);

    let messageTitle =document.createElement(`div`);
    messageTitle.classList.add(`messageTitle`);

    let titleText = document.createTextNode(`${getMyTime()} -  `);
    let nickElement =document.createElement(`div`);
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
}

let addOtherMessage = (messageObject) => {
    let parentElement = document.createElement(`div`);
    parentElement.classList.add(`othersMessage`);

    let messageTitle =document.createElement(`div`);
    messageTitle.classList.add(`messageTitle`);

    let titleText = document.createTextNode(`${getMyTime()} -  `);
    let nickElement =document.createElement(`div`);
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
}

let hideLoginContainer = () => {
    document.querySelector(`.loginContainer`).classList.add(`hideContainer`);
    setTimeout(() => {
        document.querySelector(`.loginContainer`).style.display = 'none';
    }, 500);
}

let showCzatContainer = () => {
    document.querySelector(`.czatContainer`).style.opacity = '0';
    document.querySelector(`.czatContainer`).style.display = 'block';
    setTimeout(() => {
        document.querySelector(`.czatContainer`).style.opacity = '1';
    }, 100);
}

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
    addOtherMessage: addOtherMessage
}