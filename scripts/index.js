/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    const playedSong = document.getElementById(songId);
    playedSong.style.backgroundColor = "green";
    playedSong.style.marginLeft = "20px";
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    //const songImg = createElement("img", [], ["songImgs"], { src: coverArt , style:"width : 50px", style:"height : 50px" });
    //const children = [songImg];
    const children = [];
    const classes = [];
    const attrs = {
        "id":id,
        /*"title":title,
        "album":album,
        "artist":artist,
        "duration":durationToMS(duration),*/
        onclick: `playSong(${id})`
    };
    return createElement("div", children, classes, attrs);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [];
    const classes = [];
    const attrs = {};
    return createElement("div", children, classes, attrs);
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const newElement = document.createElement(tagName);
    for(let child of children){
        newElement.appendChild(child);
    }
    for(let className of classes){
        newElement.classList.add(className);
    }
    for(let trait in attributes){
        newElement.setAttribute(trait, attributes[trait]);
    }
    return newElement;
}


// You can write more code below this line

// Changes duration format from seconds to minutes:seconds
function durationToMS(duration){
    let minutes=Math.floor(duration/60);
    let seconds=duration%60;
    if(minutes<10) minutes="0"+minutes;
    if(seconds<10) seconds="0"+seconds;
    return `${minutes}:${seconds}`;
}

// Returns the song object that matches the id (error if unmatched)
function songById(id){
    let playerSongs = player.songs;
    //Loops through the songs array and looks for the id in each element
    for(let tracks of playerSongs){
      if(tracks.id===id) return tracks;
    }
    throw "ID doesn't exist!";
}

// Returns the playlist object that matches the id (error if unmatched)
function playlistById(id){
    let playerPlaylists = player.playlists;
    //Loops through the playlists array and looks for the id in each element
    for(let lists of playerPlaylists){
      if(lists.id===id) return lists;
    }
    throw "ID doesn't exist!";
}

// Sums the total duration of all the songs in a playlist
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

function showSongs(){
    const songListDiv = document.getElementById("songs");
    songListDiv.classList.add("playerParts");
    const sortedPlayerSongs = player.songs;
    sortedPlayerSongs.sort(function(a,b){
        if(a.title.toLowerCase()<b.title.toLowerCase()) return -1; 
        else return 1;
    });
    
    for(let songs of sortedPlayerSongs){
        const newSongDiv = createSongElement(songs);
        newSongDiv.style.border = "4px solid black";
        for(let attributes in songs){
            if(attributes === "duration"){
                newSongDiv.textContent += durationToMS(songs[attributes]) + " ";
                continue;
            }
            if(attributes === "coverArt"){
                const songImg = createElement("img", [], ["images"], {src: songs[attributes], style:"width : 50px", style:"height : 50px"});
                newSongDiv.appendChild(songImg);
                continue;
            }
            newSongDiv.textContent += songs[attributes] + " ";
        }
        songListDiv.appendChild(newSongDiv);
    }
}
showSongs();

function showPlaylists(){
    const playlistsListDiv = document.getElementById("playlists");
    playlistsListDiv.classList.add("playerParts");
    const sortedPlayerPlaylists = player.playlists;
    sortedPlayerPlaylists.sort(function(a,b){
        if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
        else return 1;
    });

    for(let playlists of sortedPlayerPlaylists){
        const newPlaylistDiv = createElement("div", [], ["playlists"]);
        newPlaylistDiv.style.border = "4px solid black";
        for(let attributes in playlists){
            newPlaylistDiv.textContent += playlists[attributes] + " ";
        }
        const newPlaylistDuration = playlistDuration(playlists.id);
        newPlaylistDiv.textContent += durationToMS(newPlaylistDuration) + " " ;
        playlistsListDiv.appendChild(newPlaylistDiv);
    }
}
showPlaylists();
