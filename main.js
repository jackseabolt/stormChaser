const key = '9cddf4547a3ac49b1bdd981f1459ec09';
const apiurl = "http://api.openweathermap.org/data/2.5/forecast?";

const STORE = {
    state: [],
    route: 'start',
    searchterm: null,
    data: null,
    currentsetting: 'today'
};

function handleFormSubmit() {
    $('.js-form').submit(function (event) {
        event.preventDefault();
        let searchterm = $(".js-input").val();
        $(".js-input").val("");
        STORE.searchterm = searchterm;
        $(".js-start").addClass("hidden");
        $(".js-results").removeClass("hidden");
        createApiRequest(searchterm);
    });
}
function handleFormReSubmit() {
    $('.js-re-search-button').on('click', function (event) {
        console.log("IT RAN");
        event.preventDefault();
        let searchterm = $(".js-re-input").val();
        $(".js-re-input").val("");
        STORE.searchterm = searchterm;
        createApiRequest(searchterm);
    });
}

function handleTodaySubmit() {
    $('.js-daily-button').on('click', function (event) {
        STORE.currentsetting = 'today';
        createHtml();
    });
}

function handle3DaySubmit() {
    $('.js-3day-button').on('click', function (event) {
        STORE.currentsetting = '3Day';
        console.log(STORE.currentsetting);
        createHtml();
    });
}

function handle5DaySubmit() {
    $('.js-5day-button').on('click', function (event) {
        STORE.currentsetting = '5Day';
        console.log(STORE.currentsetting);
        createHtml();
    });
}

function createApiRequest(searchterm) {
    let search = {
        q: searchterm,
        APPID: key
    };
    console.log(search);
    $.getJSON(apiurl, search, callback);
}

function createHtml() {
    let string = '';
    if (STORE.currentsetting === 'today') {
        string = createToday();
    } else if (STORE.currentsetting === '3Day') {
        string = create3Day();
    } else if (STORE.currentsetting === '5Day') {
        string = create5Day();
    } else { console.log('big targeting problem') }
    renderHtml(string);
}

function renderHtml(string) {
    console.log(string);
    $('.js-results-container').html(string);
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function createDate(rawdata){
    // 2017-09-01 18:00:00
    let dataArr = rawdata.split(" "); 
    smallData = dataArr[0].split("-"); 
    let year = smallData[0]; 
    let month = smallData[1]; 
    switch(month){
        case 01:
            month = "January";
            break;
        case 02:
            month = "February";
            break;
        case 03:
            month = "March";
            break;
        case 04:
            month = "April";
            break;
        case 05:
            month = "May";
            break;
        case 06:
            month = "June";
            break;
        case 07:
            month = "July";
            break;
        case 08:
            month = "August";
            break;
        case "09":
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
        default: 
            break;       
    }; 
    let day = smallData[2]; 
    console.log(day.charAt(0)); 
    if (day.charAt(0)==="0"){
        day = day.charAt(1); 
    } else {
        day = day;
    }
    return `${month} ${day}, ${year}`;  
}



function createToday() {
    return `
    <div class="result">
        <h2>${toTitleCase(STORE.searchterm)}</h2>
    </div>
    <div class='today-result result'>
        <h2 class="today">Today</h2>
        <img src="http://openweathermap.org/img/w/${STORE.data.list[0].weather[0].icon}.png" alt+"weather pic" class="weather-icon">
        <p><b>Temperature:</b> ${Math.floor((STORE.data.list[0].main.temp) * 9 / 5 - 459.67)} &#176F</p>
        <p><b>${STORE.data.list[0].weather[0].description}</b> </p>
        <p><b>Humidity:</b> ${STORE.data.list[0].main.humidity}%</p>
        <p><b>Wind:</b> ${Math.floor((STORE.data.list[0].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
     </div>
    `
}

function create3Day() {
    return `
        <div class="result">
            <h2>${toTitleCase(STORE.searchterm)}</h2>
        </div>
        <div class='today-result result'>
            <h2 class="today">Today</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[0].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[0].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[0].weather[0].description}</b></p>
            <p><b>Humidity:</b> ${STORE.data.list[0].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[0].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='24hrs-future-result result'>
            <h2 class="tomorrow">${createDate(STORE.data.list[8].dt_txt)}</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[8].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[8].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[7].weather[0].description}</b> </p>
            <p><b>Humidity:</b> ${STORE.data.list[7].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[8].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='48hrs-future-result result'>
            <h2>${createDate(STORE.data.list[16].dt_txt)}</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[16].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[16].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[16].weather[0].description}</b> </p>
            <p><b>Humidity:</b> ${STORE.data.list[16].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[16].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
    </div>
    `
}

function create5Day() {
    return `
        <div class="result">
            <h2>${toTitleCase(STORE.searchterm)}</h2>
        </div>
        <div class='today-result result'>
            <h2 class="today">Today</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[0].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[0].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[0].weather[0].description}</b></p>
            <p><b>Humidity:</b> ${STORE.data.list[0].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[0].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='future-result result'>
            <h2 class="tomorrow">${createDate(STORE.data.list[8].dt_txt)}</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[8].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[8].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[7].weather[0].description}</b></p>
            <p><b>Humidity:</b> ${STORE.data.list[7].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[8].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='future-result result'>
            <h2>${createDate(STORE.data.list[16].dt_txt)}</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[16].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[16].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[16].weather[0].description}</b> </p>
            <p><b>Humidity:</b> ${STORE.data.list[16].main.humidity}% humidity</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[16].wind.speed) * 60 * 60 * 0.000621371)}</p>
        </div>
        <div class='future-result result'>
            <h2>${createDate(STORE.data.list[24].dt_txt)}</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[24].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[24].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[24].weather[0].description}</b> </p>
            <p><b>Humidity:</b> ${STORE.data.list[24].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[24].wind.speed) * 60 * 60 * 0.000621371)}</p>
        </div>
        <div class='future-result result'>
            <h2>${createDate(STORE.data.list[32].dt_txt)}</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[32].weather[0].icon}.png" alt+"weather pic" class="weather-icon">            
            <p><b>Temperature:</b> ${Math.floor((STORE.data.list[32].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p><b>${STORE.data.list[32].weather[0].description}</b></p>
            <p><b>Humidity:</b> ${STORE.data.list[32].main.humidity}%</p>
            <p><b>Wind:</b> ${Math.floor((STORE.data.list[32].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
    `
}
    // 60 * 60 * 0.000621371

    function callback(data) {
        STORE.data = data;
        console.log(data);
        createHtml();
    }

    function main() {
        handleFormSubmit();
        handleFormReSubmit();
        handleTodaySubmit();
        handle3DaySubmit();
        handle5DaySubmit();
    }



    $(main)

