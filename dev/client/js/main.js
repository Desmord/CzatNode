const init = require(`./init.js`);
const login = require(`./login/loginEvents.js`);
const userE = require(`./czat/userEvents.js`);
const loginObject = new login.LoginValidationEvents();
const userEvents = new userE.UserEvents();
const socket = io.connect("ws://localhost:8000");

init.setUserContainerPosition();
init.setUserContainerEvents();

userEvents.logIn(socket);

document.querySelector(`#login`).addEventListener(`input`, () => {
    loginObject.ifMaxLenght();
});

document.querySelector(`#loginButton`).addEventListener(`click`, () => {
    loginObject.isLoginCorrect(socket);
});

document.addEventListener('keypress', (e)=>{
    let keyname = e.key;
    if (keyname === 'Enter') {
       loginObject.isLoginCorrect(socket);
    }
});

// .errorInfo
// #login
// #loginButton



// Proby-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------

// let socket = io.connect("ws://localhost:8000");

// 1
                        // // udane sprawadznie logowania
                        // socket.on(`logIn`,()=>{
                        //     console.log(`Gotowy do logowania`);

                        // dodanie zdarzenie usera

                        //zmiana okien i polacznie 9.
                        // });



//  3                                                           
// // odebranie info od innych ze ktos dolaczyl
// socket.on(`userConnection`,(nick)=>{
//     console.log(`Inny uzytkownik o nicku ${nick} polaczony`);
// })
// 4
// //uzytkownik rozlaczony
// socket.on(`userDisconected`,(nick)=>{
//     console.log(`Uzytkownik ${nick} rozłaczony`);
// });
// 5
// //wiodomosci pod innych
// socket.on('message',(messageObject)=>{
//     console.log(messageObject);
// });

// 9
                        // //laczenie i wchodzenie do czatu 2 // to w zaleznosci czy przeslismy czy nie testy
                        // socket.emit(`userConnect`,`MikołajNick`);
// 6
// //wysywalnie wiadomosci
// socket.emit(`message`,`Wiadomosc`);


