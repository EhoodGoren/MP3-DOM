/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Resets all songs to natural state
    const allDivs = document.getElementsByClassName("songs");
    for(let divs of allDivs){
        divs.style.backgroundColor = "#C5EDF0";
        divs.style.marginLeft = "0px";
    }

    // Applies play effect on song
    const playedSong = document.getElementById(songId);
    playedSong.style.backgroundColor = "rgb(45,241,45)";
    playedSong.style.marginLeft = "20px";

    // Song number on the list that is played
    const sortedPlayerSongs=sortPlayerSongsByTitle();
    let songIndex = sortedPlayerSongs.indexOf(songById(songId));

    // Defines the next song to play
    let nextSongIndexToPlay = songIndex + 1;
    if(nextSongIndexToPlay === sortedPlayerSongs.length){
        nextSongIndexToPlay = 0;
    }
    let nextIdToPlay = sortedPlayerSongs[nextSongIndexToPlay].id;

    setTimeout( () => {
        playedSong.style.backgroundColor = `rgb(143,241,45)`;
    }, 120000);

    setTimeout( () => {
        playedSong.style.backgroundColor = `rgb(241,241,45)`;
    }, 220000);

    setTimeout( () => {
        playedSong.style.backgroundColor = `rgb(241,143,45)`;
    }, 320000);

    setTimeout( () => {
        playedSong.style.backgroundColor = `rgb(241,45,45)`;
    }, 420000);

    setTimeout( () => {
        playSong(nextIdToPlay);
    }, sortedPlayerSongs[songIndex].duration * 1000);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {

    const songTitle = createElement("span", [title], ["songTitles"]);

    const songAlbum = createElement("span", [album]);

    const songArtist = createElement("span", [artist]);

    const songDuration = createElement("span", ["Duration: ", durationToMS(duration)], ["durations"]);

    const songCoverArt = createElement("img", [], ["songImages"] , {src: coverArt, style:"width : 50px", style:"height : 50px"});
    
    const newSong = createElement("div")

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

    const playlistName = createElement("span", [name]);

    const playlistSongs = createElement("span", [songs.length + " songs"]);

    const playlistDuration = playlistDuration(id);

    const children = [playlistName, playlistSongs, playlistDuration];
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

    // Children
    for(let child of children){
        if(typeof(child) === "string"){
            child = document.createTextNode(child);
        }
        newElement.appendChild(child);
    }

    // Classes
    for(let className of classes){
        newElement.classList.add(className);
    }

    // Attributes
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
function sortPlayerSongsByTitle (){
    const sortedPlayerSongs = player.songs;
    sortedPlayerSongs.sort(function(a,b){
        if(a.title.toLowerCase()<b.title.toLowerCase()) return -1; 
        else return 1;
    });
    return sortedPlayerSongs;
}

function showSongs(){
    /*const songListDiv = document.getElementById("songs");
    songListDiv.classList.add("playerParts");
    const sortedPlayerSongs = sortPlayerSongsByTitle();
    
    for(let songs of sortedPlayerSongs){
        const newSongDiv = createSongElement(songs);
        newSongDiv.style.border = "4px solid black";
        for(let attributes in songs){
            if(attributes === "id"){
                continue;
            }
            if(attributes === "duration"){
                newSongDiv.textContent += durationToMS(songs[attributes]) + " ";
                continue;
            }
            if(attributes === "coverArt"){
                const songImg = createElement("img", [], ["images"], {src: songs[attributes], style:"width : 50px", style:"height : 50px"});
                newSongDiv.appendChild(songImg);
                continue;
            }
            newSongDiv.textContent += songs[attributes] + ' / ' ;
        }
        songListDiv.appendChild(newSongDiv);
    }*/
    const songListDiv = document.getElementById("songs");
    const sortedPlayerSongs = sortPlayerSongsByTitle();
    for(let song of sortedPlayerSongs){
        const newSong = createSongElement(song);
        songListDiv.append(newSong);
    }
}
showSongs();

function showPlaylists(){
    /*const playlistsListDiv = document.getElementById("playlists");
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
            if(attributes === "id"){
                continue;
            }
            if(attributes === "songs"){
                newPlaylistDiv.textContent += playlists[attributes].length + " Songs / ";
                continue;
            }
            newPlaylistDiv.textContent += playlists[attributes] + " / ";
        }
        const newPlaylistDuration = playlistDuration(playlists.id);
        newPlaylistDiv.textContent += durationToMS(newPlaylistDuration) + " " ;
        playlistsListDiv.appendChild(newPlaylistDiv);
    }*/
    const playlistsListDiv = document.getElementById("playlists");
    const sortedPlayerPlaylists = player.playlists;
    sortedPlayerPlaylists.sort(function(a,b){
        if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
        else return 1;
    });

    for(let playlist of sortedPlayerPlaylists){
        console.log(playlist);
        const newPlaylist = createPlaylistElement(playlist);
        playlistsListDiv.append(newPlaylist);
    }
}
showPlaylists();
