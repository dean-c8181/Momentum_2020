const weather = document.querySelector('.js-weather');
const wthDetail = document.querySelector('.js-weatherDetail');
const wthDscrtDiv = document.querySelector('.js-weatherDsctr');


const API_KEY = '97d05bf1695c2cbb36a277a6ab33dc3b';
const COORDS = 'coords'

function getWeather(lat, lng){
    fetch( //fetch는 api를 불러올때 사용
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
        ).then(function(response){    // then은 앞의 작업(여기선 fetch)를 끝내고 나서 실행
            //console.log(response)// network 정보만 보임
            // console.log(response.json()); 이렇게하면 안에 정보가 보이지만 위에 pending은 처리를 기다린다라는 뜻으로 그뒤에 then으로 정보를 받아온다.
            
            return response.json();                 
            
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            const cloud = json.clouds.all;
            const wind = json.wind.speed;
            weather.innerText = `${temperature.toFixed(1)}℃ @${place}`;
           // wthDetail.innerText = `Cloud ${cloud}% / Wind ${wind}m/s`
            //console.log(json); // 여기서 api정보들을 사용할수 있는형태로 가져옴
            
            // 날씨설명과 아이콘 가져오기
            const iconImg = json.weather[0].icon;
            const wthDescrt = json.weather[0].description;
            wthDscrtDiv.innerText = wthDescrt
            function paintImage(iconImgg){
                const image = new Image();                
                image.src = `http://openweathermap.org/img/w/${iconImgg}.png`;
                wthDscrtDiv.prepend(image);
            };
            paintImage(iconImg);

            
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