const API_KEY = '97d05bf1695c2cbb36a277a6ab33dc3b';
const COORDS = 'coords'

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
    }
}

function init(){
    loadCoords();    
};

init();