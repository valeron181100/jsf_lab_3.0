let isHackerAttack = false;

function onDocLoad() {
    if(isHackerAttack) {
        let timeCounter = 5;  // seconds
        document.body.innerHTML = "";
        document.body.innerHTML = "<div id=\"hack-timer\">5</div><div style='font-size: 2rem; width: 40em; text-align: center'>Замечено подозрительное поведение, т.к. нельзя вводить свои данные в адресную строку. Вы будете перенаправлены на главный экран.</div>";
        let timerId = setInterval(function () {
            document.getElementById("hack-timer").innerHTML = timeCounter + "";
            timeCounter--;
        }, 1000);

        setTimeout(function () {
            clearInterval(timerId);
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host;
            location.href = baseUrl;
        }, timeCounter * 1000);
    }
    else{

    }
}
function blockHackerAttack() {
 isHackerAttack = true;
}