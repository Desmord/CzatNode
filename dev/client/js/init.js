
let setUserContainerPosition = () => {
    if (document.querySelector(`body`).clientHeight < 800) {
        let topMarign = (document.querySelector(`body`).clientHeight - 340) / 2;
        document.querySelector(`.chatUserContainer`).style.top = topMarign + 'px';
    }
}

let setHideUserContainerEvent = () => {
    let buttonHide = document.querySelector(`.chatUserHideButton`);
    buttonHide.addEventListener(`click`,()=>{
        let userContainer = document.querySelector(`.chatUserContainer`);
        userContainer.classList.remove(`showUserContainer`);
    });
}

let setShowUserContainerEvent = () => {
    let buttonShow = document.querySelector(`.chatUserDeployButton`);
    buttonShow.addEventListener(`click`,()=>{
       let userContainer = document.querySelector(`.chatUserContainer`);
       userContainer.classList.add(`showUserContainer`);
    });
}

let setUserContainerEvents = () => {
    setHideUserContainerEvent();
    setShowUserContainerEvent();
}


module.exports = {
    setUserContainerPosition: setUserContainerPosition,
    setUserContainerEvents: setUserContainerEvents
}