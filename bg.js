const body = document.querySelector('body');

const IMG_NUMBER = 5;

/* api혹은 서버에서 이미지를 다운로드할때 사용
function handleImgLoad(){
    console.log('123');
}
*/

function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.jpg`;
    body.prepend(image);
    image.classList.add('bgImage');
    //image.addEventListener('loadend', handleImgLoad);
}

function genRandom(){
    // Math.floor() 버림
    // Math.ceil() 올림
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
};

init();