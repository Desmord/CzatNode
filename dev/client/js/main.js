const init = require(`./init.js`); 


init.setUserContainerPosition();
init.setUserContainerEvents();


// Proby-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------
// y-------------------------------------------------------------------------------------

let socket = io.connect("ws://localhost:8000");

// udane sprawadznie logowania
socket.on(`logIn`,()=>{
    console.log(`Gotowy do logowania`);
});

// WYswietlanie bledow podsczas logowani
socket.on(`err`,(error)=>{
    console.log(error);
});

// odebranie info od innych ze ktos dolaczyl
socket.on(`userConnection`,(nick)=>{
    console.log(`Inny uzytkownik o nicku ${nick} polaczony`);
})

//uzytkownik rozlaczony
socket.on(`userDisconected`,(nick)=>{
    console.log(`Uzytkownik ${nick} rozłaczony`);
});

//wiodomosci pod innych
socket.on('message',(messageObject)=>{
    console.log(messageObject);
});

//laczenie i sprawdznie czy mozna 1
socket.emit(`logIn`,`Mikolaj`); 

//laczenie i wchodzenie do czatu 2 // to w zaleznosci czy przeslismy czy nie testy
socket.emit(`userConnect`,`MikołajNick`);

//wysywalnie wiadomosci
socket.emit(`message`,`Wiadomosc`);


