/**
 * Return actual date
 * @return {string} data
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

const addInfoElement = () => {
   
}

const addUserConnectionInfo = () => {

}

module.exports = {
    addInfoElement: addInfoElement,
    addUserConnectionInfo: addUserConnectionInfo
}

