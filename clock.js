const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1');


function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const minutes_zero = minutes < 10 ? `0${minutes}` : minutes;
    const hours_zero = hours < 10 ? `0${hours}` : hours;
    const seconds_zero = seconds < 10 ? `0${seconds}` : seconds;
    /*
        위에와 같이 삼항연산자를 사용하면 아래와 같은 if 문은 작성 할 필요가 없다.

        const seconds_zero = 
            (function (){
                if(seconds < 10){
                    return `0${seconds}`;
                }else{
                    return seconds;
                }
            })();

        삼항연산자 MDN 참조 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

        var func1 = function( .. ) {
            if (condition1) { return value1 }
            else if (condition2) { return value2 }
            else if (condition3) { return value3 }
            else { return value4 }
            }

        var func2 = function( .. ) {
            return condition1 ? value1
                : condition2 ? value2
                : condition3 ? value3
                :              value4
        }
    */

    clockTitle.innerText = `${hours_zero}:${minutes_zero}:${seconds_zero}`;
    // 조건 ? true block : else bock
    // 10 > 5 ? '참트루' : '거지쓰'
    // seconds < 10 ? `0${seconds}` : seconds
};

function init(){
    setInterval(getTime, 1000);

};

init();