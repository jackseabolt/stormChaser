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



function createToday() {
    return `
    <h2>${toTitleCase(STORE.searchterm)}</h2>
    <div class='today-result'>
        <h2 class="today">Today</h2>
        <img src="http://openweathermap.org/img/w/${STORE.data.list[0].weather[0].icon}.png" alt+"weather pic">
        <p>The current temperture is ${Math.floor((STORE.data.list[0].main.temp) * 9 / 5 - 459.67)} &#176F</p>
        <p>${STORE.data.list[0].weather[0].description}</p>
        <p>There is currently ${STORE.data.list[0].main.humidity}% humidity</p>
        <p>The wind is currently traveling at ${Math.floor((STORE.data.list[0].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
     </div>
    `
}

function create3Day() {
    return `
    <h2>${toTitleCase(STORE.searchterm)}</h2>
        <div class='today-result'>
            <h2 class="today">Today</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[0].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[0].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[0].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[0].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[0].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='24hrs-future-result'>
            <h2 class="tomorrow">Tomorrow</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[7].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[7].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[7].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[7].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[7].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='48hrs-future-result'>
            <h2>2 days from now</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[15].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[15].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[15].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[15].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[15].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
    </div>
    `
}

function create5Day() {
    return `
    <h2>${toTitleCase(STORE.searchterm)}</h2>
        <div class='today-result'>
            <h2 class="today">Today</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[0].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[0].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[0].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[0].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[0].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='future-result'>
            <h2 class="tomorrow">Tomorrow</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[7].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[7].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[7].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[7].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[7].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='future-result'>
            <h2>2 in the future</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[15].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[15].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[15].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[15].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[15].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='future-result'>
            <h2>3 in the future</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[23].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[23].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[23].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[23].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[23].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
        </div>
        <div class='future-result'>
            <h2>4 days in the future</h2>
            <img src="http://openweathermap.org/img/w/${STORE.data.list[31].weather[0].icon}.png" alt+"weather pic">            
            <p>The current temperture is ${Math.floor((STORE.data.list[31].main.temp) * 9 / 5 - 459.67)} &#176F</p>
            <p>${STORE.data.list[31].weather[0].description}</p>
            <p>There is currently ${STORE.data.list[31].main.humidity}% humidity</p>
            <p>The wind is currently traveling at ${Math.floor((STORE.data.list[31].wind.speed) * 60 * 60 * 0.000621371)} mph</p>
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

