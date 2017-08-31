const key = '9cddf4547a3ac49b1bdd981f1459ec09'; 
const apiurl = "http://api.openweathermap.org/data/2.5/forecast?";
const STORE = {
    state: [],
    route: 'start',
    searchterm: null,
    data: null 
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

function main(){
    handleFormSubmit();
    handleFormReSubmit(); 
}

function callback(data){
    STORE.data = data;  
    console.log(data); 
}

$(main)

