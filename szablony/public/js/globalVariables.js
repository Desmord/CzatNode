let socket = null;
let nick = null;
let insultsArray = [/kurwa/ig, /pierdole/ig, /pierdolony/ig, /kurwesko/ig, /huj/ig, /chuj/ig, /kurwy/ig, /kórwa/ig, /kurwić/ig, /pierdol/ig, /spierdalaj/ig, /zapierdolić/ig, /zapierdalać/ig, /upierdolić/ig, /jebany/ig, /zajebać/ig, /jebany/ig, /pizda/ig, /ciul/ig, /cipka/ig, /fuck/ig,/pizdo/ig];
let emptySpace = /\s/ig;
let acceptableCharacters = /[^A-Za-z0-9_łóźżćąśę]/ig;
