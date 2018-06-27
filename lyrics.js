const baseUrl = "http://api.napster.com/v2.2";
const key = "MDM1ZjQ2NWEtM2E3MC00NjFmLThlMzgtNDIyMDQwMWQzNjlh";
let url;


//seach format itself

const searchQuery = document.querySelector("#searchQuery");
const submitBtn = document.querySelector(".submit");
const searchForm = document.querySelector("form");


// results section
const lyrics = document.querySelector(".lyricsBox");

searchForm.addEventListener("submit", fetchResults);


function fetchResults(e) {
    e.preventDefault();
    url = baseUrl + "/search/verbose" + "?query=" + searchQuery.value + "&apikey=" + key;
    
    fetch(url)
    .then(function(result) {
        console.log(result)
        return result.json();
    }) .then(function(json) {
        console.log(json);
        displayResults(json);
    })

};

function displayResults(result) {

    while (lyrics.firstChild) {
        lyrics.removeChild(lyrics.firstChild);
    }

    let track = result.search.data.tracks[0]
    console.log(result.search.data.tracks[0])

    lyrics.style.padding = "20px";
   
    let Div = document.createElement('div')
    Div.style.margin="0 auto";
    Div.style.padding="0px 0px 0px 75px";
    lyrics.appendChild(Div)

    let image = "http://direct.napster.com/imageserver/v2/albums/" + track.albumId + "/images/300x300.jpg"
    let imageCreate = document.createElement('img')
    imageCreate.src = image;
    imageCreate.style.borderRadius = "160px";
    Div.appendChild(imageCreate)

    lyrics.appendChild(document.createElement('br','br'))

    let title = document.createElement('h2')
    title.textContent = track.name;
    lyrics.appendChild(title)

    let artist = document.createElement('h3')
    artist.textContent = "Artist: " + track.artistName;
    lyrics.appendChild(artist)


    let audio = document.createElement('audio')
    audio.id="musicPlayer";
    audio.controls= "controls";
    audio.src = track.previewURL;
    audio.type ="audio/mpeg";
    lyrics.appendChild(audio)
    
   
    
}
