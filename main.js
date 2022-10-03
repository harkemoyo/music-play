const imageEl = document.querySelector("img");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const musicEl = document.querySelector("audio");
const musicProg = document.getElementById("music_bar");
const progressEl = document.getElementById("progress");
const currentEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevEl = document.getElementById("prev");
const playEl = document.getElementById("play");
const nextEl = document.getElementById("next");

//array
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electrict Chill Machine",
    artist: "mina-j",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Drake",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Akone",
  },
  {
    name: "metric-1",
    displayName: "Hiphop magnifire",
    artist: "Jones",
  },
];

//boolean varible
let isPlaying = false;

function playSong() {
  isPlaying = true;
  playEl.classList.replace("fa-play", "fa-pause");
  playEl.setAttribute("title", "pause");
  musicEl.play();
}
//pause
function pauseSong() {
  isPlaying = false;
  playEl.classList.replace("fa-pause", "fa-play");
  playEl.setAttribute("title", "play");

  musicEl.pause();
}


//func array
function loadSong(song) {
  titleEl.textContent = song.displayName;
  artistEl.textContent = song.artist;
  musicEl.src = `music/${song.name}.mp3`;
  imageEl.src = `img/${song.name}.jpg`;
}

//current
let songArray = 0;

//prev fnc
function prevSong() {
  songArray--; // songArray - 1
  if (songArray < 0) {
    songArray = songs.length - 1;
  }
  loadSong(songs[songArray]);
  playSong();
}

//func next song
function nextSong() {
  songArray++;
  if (songArray > songs.length - 1) {
    songArray = 0;
  }

  loadSong(songs[songArray]);
  playSong();
}

//onload
loadSong(songs[songArray]);

//progress bar update
function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progressEl.style.width = `${progressPercent}%`;

    //munites
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;

      //   console.log("seconds", durationSeconds);

      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
    }

    // }
    // current
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;

      currentEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }

 
}
 //func bar
 function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = musicEl;
    
    musicEl.currentTime = (clickX / width)* duration;
  }

playEl.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevEl.addEventListener("click", prevSong);
nextEl.addEventListener("click", nextSong);
musicEl.addEventListener("ended", nextSong);
musicEl.addEventListener("timeupdate", updateProgress);
progressEl.addEventListener("click",setProgress);
