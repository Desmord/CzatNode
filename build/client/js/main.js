!function e(n,t,i){function o(s,a){if(!t[s]){if(!n[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=t[s]={exports:{}};n[s][0].call(l.exports,function(e){var t=n[s][1][e];return o(t||e)},l,l.exports,e,n,t,i)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(e,n,t){"use strict";e("./react/react.js");n.exports={changeContainer:function(){document.querySelector(".loginContainer").classList.add("hideContainer"),setTimeout(function(){document.querySelector(".loginContainer").style.display="none"},500),setTimeout(function(){document.querySelector(".czatContainer").style.opacity="0",document.querySelector(".czatContainer").style.display="block",setTimeout(function(){document.querySelector(".czatContainer").style.opacity="1"},100)},600)},addConectionEvent:addConectionEvent}},{"./react/react.js":2}],2:[function(e,n,t){"use strict";console.log("Witaj w reacie no halo hej");n.exports={funkcjare:function(){console.log("react")}}},{}],3:[function(e,n,t){"use strict";var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}(),o=e("./displayCzatMethods.js"),r=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return i(e,[{key:"logIn",value:function(e){e.on("logIn",function(){o.changeContainer(),o.addConectionInfo(),e.on("userConnection",function(e){console.log("Inny uzytkownik o nicku "+e+" polaczony")}),e.on("userDisconected",function(e){console.log("Uzytkownik "+e+" rozłaczony")}),e.on("message",function(e){console.log(e)})})}}]),e}();n.exports={UserEvents:r}},{"./displayCzatMethods.js":1}],4:[function(e,n,t){"use strict";n.exports={setUserContainerPosition:function(){if(document.querySelector("body").clientHeight<800){var e=(document.querySelector("body").clientHeight-340)/2;document.querySelector(".chatUserContainer").style.top=e+"px"}},setUserContainerEvents:function(){document.querySelector(".chatUserHideButton").addEventListener("click",function(){document.querySelector(".chatUserContainer").classList.remove("showUserContainer")}),document.querySelector(".chatUserDeployButton").addEventListener("click",function(){document.querySelector(".chatUserContainer").classList.add("showUserContainer")})}}},{}],5:[function(e,n,t){"use strict";var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}(),o=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.insultsArray=[/kurwa/gi,/pierdole/gi,/pierdolony/gi,/kurwesko/gi,/huj/gi,/chuj/gi,/kurwy/gi,/kórwa/gi,/kurwić/gi,/pierdol/gi,/spierdalaj/gi,/zapierdolić/gi,/zapierdalać/gi,/upierdolić/gi,/jebany/gi,/zajebać/gi,/jebany/gi,/pizda/gi,/ciul/gi,/cipka/gi,/fuck/gi,/pizdo/gi],this.emptySpace=/\s/gi,this.acceptableCharacters=/[^A-Za-z0-9_łóźżćąśę]/gi}return i(e,[{key:"setError",value:function(e){document.querySelector(".errorInfo").innerHTML=e}},{key:"getLoginValue",value:function(){return document.querySelector("#login").value}},{key:"ifMaxLenght",value:function(){this.getLoginValue().length<20?this.setError(""):this.setError("Za długi nick. Maximum 20 znaków.")}},{key:"isNumber",value:function(e){return!isNaN(e)}},{key:"isSpaceOnly",value:function(e){return!!e.match(this.emptySpace)}},{key:"isZeroLenght",value:function(e){return 0==e.length}},{key:"isAcceptableCharakters",value:function(e){return!!e.match(this.acceptableCharacters)}},{key:"isOffensive",value:function(e){for(var n=0;n<this.insultsArray.length;n++)if(e.match(this.insultsArray[n]))return!0;return!1}},{key:"isLoginCorrect",value:function(e){var n=this;this.isOffensive(this.getLoginValue())?this.setError("Login nie może zawierać przekleństwa."):this.isZeroLenght(this.getLoginValue())?this.setError("Login musi posiadać przynajmniej jeden znak."):this.isSpaceOnly(this.getLoginValue())?this.setError("Login nie może zawierać spacji."):this.isNumber(this.getLoginValue())?this.setError("Login nie może być tylko liczbą."):this.isAcceptableCharakters(this.getLoginValue())?this.setError("Użyto niedozwolone znaki."):(e.on("err",function(e){n.setError(e)}),e.emit("logIn",this.getLoginValue()))}}]),e}();n.exports={LoginValidationEvents:o}},{}],6:[function(e,n,t){"use strict";var i=e("./init.js"),o=e("./login/loginEvents.js"),r=e("./czat/userEvents.js"),s=new o.LoginValidationEvents,a=new r.UserEvents,c=io.connect("ws://localhost:8000");i.setUserContainerPosition(),i.setUserContainerEvents(),a.logIn(c),document.querySelector("#login").addEventListener("input",function(){s.ifMaxLenght()}),document.querySelector("#loginButton").addEventListener("click",function(){s.isLoginCorrect(c)}),document.addEventListener("keypress",function(e){"Enter"===e.key&&s.isLoginCorrect(c)})},{"./czat/userEvents.js":3,"./init.js":4,"./login/loginEvents.js":5}]},{},[2,1,3,4,5,6]);