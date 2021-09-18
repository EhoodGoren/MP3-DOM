/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const songTitle = createElement("span", [" " + title], ["songTitles"]);

    const songAlbum = createElement("span", [" " + album]);

    const songArtist = createElement("span", [" " + artist]);

    const songDuration = createElement("span", ["Duration: ", durationToMS(duration)], ["durations"]);
    const durationColor = getSongDurationColor(duration);
    songDuration.style.color = durationColor;

    const songCoverArt = createElement("img", [], ["songImages"] , {src: coverArt, style:"width : 50px", style:"height : 50px"});

    //onclick!
    const children = [songTitle, songAlbum, songArtist, songDuration,songCoverArt];
    const classes = ["songs"];
    const attrs = {
        "id":id,
        onclick: `playSong(${id})`
    };
    return createElement("div", children , classes, attrs);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const playlistName = createElement("span", [" " + name]);

    const playlistSongs = createElement("span", [" " + songs.length + " songs"]);

    let playListTime = playlistDuration(id);
    playListTime = durationToMS(playListTime);
    const playlistLength = createElement("span", ["Duration: ", playListTime], ["durations"])

    const children = [playlistName, playlistSongs, playlistLength];
    const classes = ["playlists"];
    const attrs = {
        "id":id
    };
    return createElement("div", children, classes, attrs);
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const newElement = document.createElement(tagName);

    // Children
    for(let child of children){
        /*if(typeof(child) === "string"){
            child = document.createTextNode(child);
        }*/
        newElement.append(child);
    }

    // Classes
    for(let className of classes){
        newElement.classList.add(className);
    }

    // Attributes
    for(let trait in attributes){
        newElement.setAttribute(trait, attributes[trait]);
    }

    // Event listeners

    return newElement;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs(songs) {
    const songListDiv = document.getElementById("songs");
    const sortedPlayerSongs = sortSongsByTitle(songs);

    for(let song of sortedPlayerSongs){
        const newSong = createSongElement(song);
        songListDiv.append(newSong);
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists(playlists) {
    const playlistsListDiv = document.getElementById("playlists");
    const sortedPlayerPlaylists = sortPlaylistsByName(playlists);

    for(let playlist of sortedPlayerPlaylists){
        const newPlaylist = createPlaylistElement(playlist);
        playlistsListDiv.append(newPlaylist);
    }
}

// Creating the page structure
generateSongs(player.songs);
generatePlaylists(player.playlists);

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)



// Changes duration format from seconds to minutes:seconds.
function durationToMS(duration){
    let minutes=Math.floor(duration/60);
    let seconds=duration%60;
    if(minutes<10) minutes="0"+minutes;
    if(seconds<10) seconds="0"+seconds;
    return `${minutes}:${seconds}`;
}

// Returns the song object that matches the id (error if unmatched).
function songById(id){
    let playerSongs = player.songs;
    //Loops through the songs array and looks for the id in each element
    for(let tracks of playerSongs){
      if(tracks.id===id) return tracks;
    }
    throw "ID doesn't exist!";
}

// Returns the playlist object that matches the id (error if unmatched).
function playlistById(id){
    let playerPlaylists = player.playlists;
    //Loops through the playlists array and looks for the id in each element
    for(let lists of playerPlaylists){
      if(lists.id===id) return lists;
    }
    throw "ID doesn't exist!";
}

// Sums the total duration of all the songs in a playlist.
function playlistDuration(id) {
    // Checks if the playlist id exists.
    let currentPlaylist=playlistById(id);
  
    let chosenPlaylistSongs=currentPlaylist.songs;
    let sum=0;
    for(let song of chosenPlaylistSongs){
      sum+=songById(song).duration;
    }
    return sum;
}

// Sorts a songs array by their title (ascending).
function sortSongsByTitle (songs){
    songs.sort(function(a,b){
        if(a.title.toLowerCase()<b.title.toLowerCase()) return -1; 
        else return 1;
    });
    return songs;
}

// Sorts a playlists array by their name (ascending).
function sortPlaylistsByName (playlists){
    playlists.sort(function(a,b){
        if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
        else return 1;
    });
    return playlists;
}

function getSongDurationColor (duration) {
    if(duration <= 120){
        return `rgb(10,230,10)`;
    }
    if(duration >= 420){
        return `rgb(230,10,10)`;
    }
    if(duration > 120 && duration <= 270){
        const relativeLength = (duration-120) / 150;
        const r = 10 + Math.floor(relativeLength * 220);
        return `rgb(${r},230,25)`;
    }
    if(duration > 270 && duration < 420){
        const relativeLength = (duration-270) / 150;
        const g = 230 - Math.floor(relativeLength * 220);
        return `rgb(230,${g},25)`;
    }
}
