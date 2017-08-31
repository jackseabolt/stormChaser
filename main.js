const key = '9cddf4547a3ac49b1bdd981f1459ec09'; 
const apiurl = "http://api.openweathermap.org/data/2.5/forecast?";
const STORE = {
    state: [],
    route: 'start',
    searchterm: null,
    data: null,
    currentsetting: 'today' 
}; 

function handleFormSubmit(){
    $('.js-form').submit(function(event){
        event.preventDefault(); 
        let searchterm = $(".js-input").val();
        $(".js-input").val("");
        STORE.searchterm = searchterm; 
        $(".js-start").addClass("hidden");
        $(".js-results").removeClass("hidden"); 
        createApiRequest(searchterm);
    }); 
}
function handleFormReSubmit(){
    $('.js-re-search-button').on('click', function(event){
        console.log("IT RAN"); 
        event.preventDefault(); 
        let searchterm = $(".js-re-input").val();
        $(".js-re-input").val("");
        STORE.searchterm = searchterm;  
        createApiRequest(searchterm);
    }); 
}

function createApiRequest(searchterm){
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
    } else {console.log('big targeting problem')}
    renderHtml(string); 
}

function renderHtml(string){
    console.log(string); 
    $('.js-results-container').html(string);
}

function createToday() {
    return `
    <div class='today-result'>
        <p>The current temperture is ${Math.floor((STORE.data.list[0].main.temp) * 9/5 - 459.67)} &#176F</p>
        <p>${STORE.data.list[1].weather[0].description}</p>
        <p>There is currently ${STORE.data.list[0].main.humidity}% humidity</p>
        <p>The wind is currently traveling at ${Math.floor((STORE.data.list[0].wind.speed)* 60 * 60 * 0.000621371)} mph</p>
     </div>
    `
}
// 60 * 60 * 0.000621371

function callback(data){
    STORE.data = data;  
    console.log(data);
    createHtml();  
}

function main(){
    handleFormSubmit();
    handleFormReSubmit(); 
}



$(main)

