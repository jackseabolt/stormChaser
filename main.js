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
        const searchterm = $(".js-input").val();
        $(".js-input").val("");
        STORE.searchterm = searchterm; 
        createApiRequest(searchterm);
    }); 
}

function createApiRequest(searchterm){
    const search = {
        q: searchterm,
        APPID: key
    };
    $.getJSON(apiurl, search, callback);
}

function main(){
    handleFormSubmit(); 
}

function callback(data){
    STORE.data = data;  
    console.log(data); 
}

$(main)

