/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = []
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
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
        newElement.setAttribute(trait,attributes[trait]);
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

const songsList = document.getElementById("songs");
const playerSongs = player.songs;
for(let songs of playerSongs){
    const songDiv = createElement("div", [], ["songs"]);
    songDiv.style.border = "4px solid black";
    for(let attributes in songs){
        if(attributes === "coverArt"){
            const songImg = createElement("img", [], ["images"], {src: songs[attributes]});
            songImg.style.width = "50px";
            songImg.style.height = "50px";
            songDiv.appendChild(songImg);
            continue;
        }
        if(attributes === "duration"){
            songDiv.textContent += durationToMS(songs[attributes]) + " ";
            continue;
        }
        songDiv.textContent += songs[attributes] + " ";
    }
    songsList.appendChild(songDiv);
}

