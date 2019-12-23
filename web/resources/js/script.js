/// <reference path="../typings/globals/jquery/index.d.ts" />

var isSidePanelOpened = false;

var x_coord = 10;
var y_coord = 10;
var r_coord = 10;

$(document).ready(()=>{
    $('input[name="x-radio"]').change((e)=>{
        x_coord = $(e.target).val();
    });

    if(!navigator.cookieEnabled){
        myalert("Cookie-файлы отключены. Чтобы просматривать историю запросов, \nа также для отображения точек на графике, необходимо включить cookie.",
            5000)
    }

    // $('#submitButton').click(event=>{
    //     event.stopPropagation();
    //     event.preventDefault();
    //     if(isvalid()){
    //         document.getElementById('coordform').submit();
    //     }
    // });

});

$(window).scroll((event)=>{
    const scrolled = window.scrollY;
    var headerHeight = $('#mainHeader').height();
    if(scrolled >= headerHeight){
        $('#header').css({'position' : 'fixed',
            'margin-top': -headerHeight});
        $('#sidePanel').css({'position' : 'fixed',
            'margin-top': -headerHeight});
    }
    else{
        $('#header').css({'position' : 'static',
            'margin-top': 0});
        $('#sidePanel').css({'position' : 'absolute',
            'margin-top': '-4vh'});
    }
});

function historyBtnClick() {
    if($('#historyView').css('display') === 'none'){
        $('#historyView').attr('style', 'display: static;');
    }
    $('#mainView').css('display', 'none');

    $.ajax({
        url: '/controller',
        type: 'POST',
        dataType: 'html',
        beforeSend: function () {
            //loading animation
            $('#history').html('<div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>');
        },
        success: function (data) {
            $("#history").html('');
            $('#history').html('<h1>History</h1>');
            if(data !== 'null' && data !== '[]'){
                $('#history').html($('#history').html() + '<ol class="historyList"></ol>');

                JSON.parse(data).forEach((p, i)=>{
                    let liEl = document.createElement('li');
                    let spanEl = document.createElement('span');
                    spanEl.textContent = "x=" + p.x +", y=" + p.y +", R=" + p.r+" ("+
                        (p.isIncluded ? "Входит" : "Не входит") +")";
                    liEl.appendChild(spanEl);
                    $('.historyList').append(liEl);
                });
            }
            else{
                $('#history').html($('#history').html() + '<div class="empty-history"><img src="images/history-big.png" alt="Empty history"/><span>Здесь пока ничего нет(</span></div>');
            }
        }
    });

}

function mainPageBtnClick() {
    if($('#mainView').css('display') === 'none'){
        $('#mainView').attr('style', 'display: static;');
    }
    $('#historyView').css('display', 'none');
}

function mainContentClick() {
    if(isSidePanelOpened){
        document.getElementById("sidePanel").className = "flyInAnimClass";
        isSidePanelOpened = false;
    }
}

function isYvalid() {
    var $yInput = $('input[name="y-input"]');

    if(/^(((\-[1-2])|[0-4])([\.|\,]\d+)?)$/.test($yInput.val().trim())){
        y_coord = $yInput.val().replace('\,', '.');
        return true;
    }
    else{
        if($yInput.val().length == 0)
            myalert('Ошибка: Y-координата не была введена!')
        else
            myalert('Ошибка: Y-координата была введена неверно!');
        return false;
    }
}

function getR() {
    r_coord = $('input[name=r-radio]:checked').val();
    return r_coord;
}

function submitForm(isCheckingSkip = false) {
    if(!isCheckingSkip) {
        if (isYvalid() && x_coord != 10) {
            getR();
            if (r_coord != 10) {
                location.href = "/controller?x-button=" + x_coord + "&y-input=" + y_coord + "&r-radio=" + r_coord
            }
        }
    }else{
        if (x_coord != 10) {
            getR();
            if (r_coord != 10) {
                location.href = "/controller?x-button=" + x_coord + "&y-input=" + y_coord + "&r-radio=" + r_coord
            }
        }
    }
}

function myalert(text, duration = 2000) {
    var div = document.createElement('div');
    div.classList.add('alertMessage');
    div.innerHTML = text;
    $(div).css('opacity', 0);
    document.body.appendChild(div);

    $(div).animate({
        opacity: 1.0
    }, 1000);

    setTimeout(()=>{
        $(div).animate({
            opacity: 0.0
        }, 1000, 'swing', function () {
            div.remove();
        });
    }, duration);
}

function onXSelected(button){
    $('input[type="button"]').removeClass("button-selected");
    x_coord = parseInt($(button).val());
    button.className = "button-selected";
}

function playButtonClickAnimation() {

    // playButtonAnimation("menuButton");

    if(!isSidePanelOpened){
        document.getElementById("sidePanel").className = "flyOutAnimClass";
        isSidePanelOpened = true;
    }
    else{
        document.getElementById("sidePanel").className = "flyInAnimClass";
        isSidePanelOpened = false;
    }
}

function playButtonAnimation(element){
    element.classList.remove("buttonAnim2Class");
    element.classList.add("buttonAnimClass");

    element.addEventListener('animationend', ()=> {
        element.classList.remove("buttonAnimClass");
        element.classList.add("buttonAnim2Class");
        element.addEventListener('animationend', ()=>{
            element.classList.remove("buttonAnim2Class");
        })
    }, false);
}