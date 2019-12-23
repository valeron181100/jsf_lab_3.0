
function onStartPageLoaded(){
    updateClock();
    setInterval(updateClock, 12000);
}

function updateClock() {
    var curDate = new Date();
    var weekDays = ["Пнд","Втр","Срд","Чтв","Птн","Сбт","Вск"];
    var monthes = ["Янв.","Фев.","Мар.","Апр.","Май","Июн.","Июл.","Авг.","Сен.","Окт.","Ноя.","Дек."];
    var hours = curDate.getHours().toString();
    var minutes = curDate.getMinutes().toString();
    if(hours.length === 1){
        hours = '0' + hours;
    }
    if(minutes.length === 1){
        minutes = '0' + minutes;
    }
    document.getElementById("clock-time").innerText = hours + ":" + minutes;
    document.getElementById("clock-date").innerText = weekDays[curDate.getDay() - 1] + ", " + curDate.getDate() + " " + monthes[curDate.getMonth()];
}