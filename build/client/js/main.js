!function e(t,n,r){function o(a,c){if(!n[a]){if(!t[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return o(n||e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";var r=function(){var e=new Date,t=e.getDate(),n=e.getMonth()+1,r=e.getFullYear(),o=e.getHours(),i=e.getMinutes(),a=e.getSeconds();return t<10&&(t="0"+t),n<10&&(n="0"+n),o<10&&(o="0"+o),i<10&&(i="0"+i),a<10&&(a="0"+a),e=r+"-"+n+"-"+t+"  "+o+":"+i+":"+a};t.exports={changeContainer:function(){document.querySelector(".loginContainer").classList.add("hideContainer"),setTimeout(function(){document.querySelector(".loginContainer").style.display="none"},500),setTimeout(function(){document.querySelector(".czatContainer").style.opacity="0",document.querySelector(".czatContainer").style.display="block",setTimeout(function(){document.querySelector(".czatContainer").style.opacity="1"},100)},600)},addConectionInfo:function(){var e=document.createElement("div");e.classList.add("czatInfo");var t=document.createTextNode("Połączenie z serwerem nawiązane "+r());e.appendChild(t),document.querySelector(".chat").appendChild(e)},addUserConnectionInfo:function(e){var t=document.createElement("div");t.classList.add("chatUserConnectionInfo");var n=document.createTextNode(r()+" Użytkownik "+e+" połączony");t.appendChild(n),document.querySelector(".chat").appendChild(t)},addUserDisconectedInfo:function(e){var t=document.createElement("div");t.classList.add("chatUserConnectionInfo");var n=document.createTextNode(r()+" Użytkownik "+e+" rozłączony");t.appendChild(n),document.querySelector(".chat").appendChild(t)},addMyMessage:function(e,t){var n=document.createElement("div");n.classList.add("myMessage");var o=document.createElement("div");o.classList.add("messageTitle");var i=document.createTextNode(r()+" -  "),a=document.createElement("div"),c=document.createTextNode(""+t);o.appendChild(i),a.appendChild(c),o.appendChild(a),n.appendChild(o);var s=document.createElement("div");s.classList.add("messageText");var u=document.createTextNode(""+e);s.appendChild(u),n.appendChild(s),document.querySelector(".chat").appendChild(n),setTimeout(function(){n.classList.add("showMessage")},100)},addOtherMessage:function(e){var t=document.createElement("div");t.classList.add("othersMessage");var n=document.createElement("div");n.classList.add("messageTitle");var o=document.createTextNode(r()+" -  "),i=document.createElement("div"),a=document.createTextNode(""+e.nick);n.appendChild(o),i.appendChild(a),n.appendChild(i),t.appendChild(n);var c=document.createElement("div");c.classList.add("messageText");var s=document.createTextNode(""+e.message);c.appendChild(s),t.appendChild(c),document.querySelector(".chat").appendChild(t),setTimeout(function(){t.classList.add("showMessage")},100)},generateUserList:function(e){for(var t=document.querySelector(".chatUserList");t.firstChild;)t.removeChild(t.firstChild);for(var n=0;n<e.length;n++){var r=document.createElement("div");r.classList.add("user");var o=document.createTextNode(e[n]);r.appendChild(o),t.appendChild(r)}}}},{}],2:[function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=e("./displayCzatMethods.js"),i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.userArray=[]}return r(e,[{key:"addUser",value:function(e){this.userArray.push(e),o.generateUserList(this.userArray)}},{key:"removeUser",value:function(e){console.log(e);for(var t=0;t<this.userArray.length;t++)this.userArray[t]==e&&(console.log("znaleziono"),this.userArray.splice(t,1));console.log(this.userArray),o.generateUserList(this.userArray)}},{key:"getLoginValue",value:function(){return document.querySelector("#login").value}},{key:"setEnterEvent",value:function(e){var t=this;document.addEventListener("keypress",function(n){"Enter"===n.key&&(n.preventDefault(),""==document.querySelector("#czatTextArea").value||(e.emit("message",document.querySelector("#czatTextArea").value),o.addMyMessage(document.querySelector("#czatTextArea").value,t.getLoginValue()),document.querySelector(".chat").scrollTop=document.querySelector(".chat").scrollHeight,document.querySelector("#czatTextArea").value=""))})}},{key:"setClickEvent",value:function(e){var t=this;document.querySelector(".chatSendButton").addEventListener("click",function(){""==document.querySelector("#czatTextArea").value||(e.emit("message",document.querySelector("#czatTextArea").value),o.addMyMessage(document.querySelector("#czatTextArea").value,t.getLoginValue()),document.querySelector(".chat").scrollTop=document.querySelector(".chat").scrollHeight,document.querySelector("#czatTextArea").value="")})}},{key:"setButtonEvents",value:function(e){this.setClickEvent(e),this.setEnterEvent(e)}},{key:"logIn",value:function(e){var t=this;e.on("logIn",function(n){o.changeContainer(),o.addConectionInfo(),console.log(n);for(var r=0;r<n.length;r++)t.userArray.push(n[r].Nick),console.log(n.Nick);o.generateUserList(t.userArray),t.setButtonEvents(e),e.emit("userConnect",t.getLoginValue()),e.on("userConnection",function(e){console.log("nowy user "+e),o.addUserConnectionInfo(e),t.addUser(e)}),e.on("userDisconected",function(e){console.log("Uzytkownik "+e+" rozłaczony"),o.addUserDisconectedInfo(e),t.removeUser(e)}),e.on("message",function(e){o.addOtherMessage(e),document.querySelector(".chat").scrollTop=document.querySelector(".chat").scrollHeight})})}}]),e}();t.exports={UserEvents:i}},{"./displayCzatMethods.js":1}],3:[function(e,t,n){"use strict";t.exports={setUserContainerPosition:function(){if(document.querySelector("body").clientHeight<800){var e=(document.querySelector("body").clientHeight-340)/2;document.querySelector(".chatUserContainer").style.top=e+"px"}},setUserContainerEvents:function(){document.querySelector(".chatUserHideButton").addEventListener("click",function(){document.querySelector(".chatUserContainer").classList.remove("showUserContainer")}),document.querySelector(".chatUserDeployButton").addEventListener("click",function(){document.querySelector(".chatUserContainer").classList.add("showUserContainer")})}}},{}],4:[function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.insultsArray=[/kurwa/gi,/pierdole/gi,/pierdolony/gi,/kurwesko/gi,/huj/gi,/chuj/gi,/kurwy/gi,/kórwa/gi,/kurwić/gi,/pierdol/gi,/spierdalaj/gi,/zapierdolić/gi,/zapierdalać/gi,/upierdolić/gi,/jebany/gi,/zajebać/gi,/jebany/gi,/pizda/gi,/ciul/gi,/cipka/gi,/fuck/gi,/pizdo/gi],this.emptySpace=/\s/gi,this.acceptableCharacters=/[^A-Za-z0-9_łóźżćąśę]/gi}return r(e,[{key:"setError",value:function(e){document.querySelector(".errorInfo").innerHTML=e}},{key:"getLoginValue",value:function(){return document.querySelector("#login").value}},{key:"ifMaxLenght",value:function(){this.getLoginValue().length<20?this.setError(""):this.setError("Za długi nick. Maximum 20 znaków.")}},{key:"isNumber",value:function(e){return!isNaN(e)}},{key:"isSpaceOnly",value:function(e){return!!e.match(this.emptySpace)}},{key:"isZeroLenght",value:function(e){return 0==e.length}},{key:"isAcceptableCharakters",value:function(e){return!!e.match(this.acceptableCharacters)}},{key:"isOffensive",value:function(e){for(var t=0;t<this.insultsArray.length;t++)if(e.match(this.insultsArray[t]))return!0;return!1}},{key:"isLoginCorrect",value:function(e){var t=this;this.isOffensive(this.getLoginValue())?this.setError("Login nie może zawierać przekleństwa."):this.isZeroLenght(this.getLoginValue())?this.setError("Login musi posiadać przynajmniej jeden znak."):this.isSpaceOnly(this.getLoginValue())?this.setError("Login nie może zawierać spacji."):this.isNumber(this.getLoginValue())?this.setError("Login nie może być tylko liczbą."):this.isAcceptableCharakters(this.getLoginValue())?this.setError("Użyto niedozwolone znaki."):(e.on("err",function(e){t.setError(e)}),e.emit("logIn",this.getLoginValue()))}}]),e}();t.exports={LoginValidationEvents:o}},{}],5:[function(e,t,n){"use strict";var r=e("./init.js"),o=e("./login/loginEvents.js"),i=e("./czat/userEvents.js"),a=new o.LoginValidationEvents,c=new i.UserEvents,s=io.connect("ws://localhost:8000");r.setUserContainerPosition(),r.setUserContainerEvents(),c.logIn(s),document.querySelector("#login").addEventListener("input",function(){a.ifMaxLenght()}),document.querySelector("#loginButton").addEventListener("click",function(){a.isLoginCorrect(s)}),document.addEventListener("keypress",function(e){"Enter"===e.key&&a.isLoginCorrect(s)})},{"./czat/userEvents.js":2,"./init.js":3,"./login/loginEvents.js":4}]},{},[1,2,3,4,5]);