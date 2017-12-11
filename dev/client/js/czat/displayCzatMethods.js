const react = require(`./react/react.js`);


let addConectionInfo= () => {
    //tutaj wyswitalani ifo o polaczeniu
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
    addConectionEvent: addConectionEvent
}