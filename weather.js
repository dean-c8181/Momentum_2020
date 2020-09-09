const weather = document.querySelector('.js-weather');

const API_KEY = '97d05bf1695c2cbb36a277a6ab33dc3b';
const COORDS = 'coords'

function getWeather(lat, lng){
    fetch( //fetch는 api를 불러올때 사용
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){    // then은 앞의 작업(여기선 fetch)를 끝내고 나서 실행
            return response.json();
            // console.log(response)    // network 정보만 보임
            // console.log(response.json()); 이렇게하면 안에 정보가 보이지만 위에 pending은 처리를 기다린다라는 뜻으로 그뒤에 then으로 정보를 받아온다.
            
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
            //console.log(json); // 여기서 api정보들을 사용할수 있는형태로 가져옴
        });
}

function saveCoords(croodsObj){
    localStorage.setItem(COORDS, JSON.stringify(croodsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude= position.coords.longitude;
    const coordsObj = {
        latitude, // === latitude: latitude, 
        longitude // === longitude: longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

function handleGeoError(){
    console.log('Cant access geo locaiton.');
};

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        // getWeather
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();    
};

init();