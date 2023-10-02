console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let currentTimeDisplay = document.getElementById("currentTimeDisplay");
let durationDisplay = document.getElementById("durationDisplay");
let gif = document.getElementById("gif");
let songNameNearGif = document.getElementById("songNameNearGif");
let songItems = Array.from(document.getElementsByClassName("songitem"));

let songs = [
  {
    SongName: "Let Me Love You",
    filePath: "Let-Me-Love-You_320(PaglaSongs).mp3",
    CoverPath: "th (1).jpg",
  },
  {
    SongName: "cheques",
    filePath: "Cheques_320(PaglaSongs).mp3",
    CoverPath: "th (2).jpg",
  },
  {
    SongName: "Heeriye-Heeriye",
    filePath: "Heeriye-Heeriye-Aa_320(PaglaSongs).mp3",
    CoverPath: "th.jpg",
  },
  {
    SongName: "pasoori",
    filePath: "Pasoori-(Lofi-remix)_320(PaglaSongs).mp3",
    CoverPath: "th (4).jpg",
  },
  {
    SongName: "Teriyan-Adavaan",
    filePath: "Teriyan-Adavaan_320(PaglaSongs).mp3",
    CoverPath: "th (6).jpg",
  },
];

songs.forEach((song, i) => {
  let songItem = songItems[i];
  let imgElement = songItem.querySelector("img");
  let songnameElement = songItem.querySelector(".songName");

  if (imgElement && songnameElement) {
    imgElement.src = song.CoverPath;
    songnameElement.textContent = song.SongName;
  }
});

function playSong() {
  audioElement.src = songs[songIndex].filePath;
  audioElement.play().catch(error => {
    console.error("Autoplay prevented:", error);
  });
}

playSong();

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play().catch(error => {
      console.error("Autoplay prevented:", error);
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

function updateProgressBar() {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;

  if (!isNaN(duration)) {
    const progressPercentage = (currentTime / duration) * 100;
    myProgressBar.value = progressPercentage;

    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
  }

  requestAnimationFrame(updateProgressBar);
}

updateProgressBar();

myProgressBar.addEventListener("click", (event) => {
  const clickX = event.clientX - myProgressBar.getBoundingClientRect().left;
  const progressBarWidth = myProgressBar.clientWidth;
  const seekPercentage = (clickX / progressBarWidth) * 100;
  const seekTime = (seekPercentage / 100) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.add('fa-solid', 'fa-circle-play', 'fa-xl');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    e.target.classList.remove('fa-solid', 'fa-circle-play', 'fa-xl');
    e.target.classList.add('fa-solid', 'fa-circle-pause', 'fa-xl');
    playSongByIndex(songItems.indexOf(e.currentTarget));
  });
});

function playSongByIndex(index) {
  audioElement.pause();
  audioElement.currentTime = 0;
  songIndex = index;
  playSong();
  updatePlayPauseIcons();
  updateSongNameNearGif();
}

function updatePlayPauseIcons() {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    if (i === songIndex) {
      element.classList.remove('fa-circle-play');
      element.classList.add('fa-circle-pause');
    } else {
      element.classList.remove('fa-circle-pause');
      element.classList.add('fa-circle-play');
    }
  });
}

function updateSongNameNearGif() {
  songNameNearGif.textContent = songs[songIndex].SongName;
}

audioElement.addEventListener('timeupdate', () => {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;

  if (!isNaN(duration)) {
    const progressPercentage = (currentTime / duration) * 100;
    myProgressBar.value = progressPercentage;

    currentTimeDisplay.textContent = formatTime(currentTime);
  }
});

function updatePlayPauseIcon() {
  const isPaused = audioElement.paused;
  const playPauseIconClass = isPaused ? 'fa-circle-play' : 'fa-circle-pause';

  const currentSongContainer = songItems[songIndex];
  const playPauseIcon = currentSongContainer.querySelector('.songItemPlay i');
  playPauseIcon.className = `fa-solid ${playPauseIconClass} fa-xl`;
}

audioElement.addEventListener('play', () => {
  updatePlayPauseIcon();
});

audioElement.addEventListener('pause', () => {
  updatePlayPauseIcon();
});

songItems.forEach((songItem, index) => {
  songItem.addEventListener('click', () => {
    playSongByIndex(index);
  });
});

// Add this line to your script
let songInfoElement = document.querySelector('.songinfo');

// ...

// Wherever you update the song, set the text content of the song info
function playSongByIndex(index) {
  songIndex = index;
  playSong();
  // Other code...

  // Update the song name near the gif
  updateSongInfo();
}

// ...

// Function to update the song name near the gif
function updateSongInfo() {
  const currentSong = songs[songIndex];
  if (currentSong) {
    songInfoElement.textContent = currentSong.SongName;
  }
}

// ...

// Call this function whenever you change the song
updateSongInfo();
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");

nextButton.addEventListener("click", () => {
  playNextSong();
});

prevButton.addEventListener("click", () => {
  playPreviousSong();
});

function playNextSong() {
  songIndex = (songIndex + 1) % songs.length;
  playSongByIndex(songIndex);
}

function playPreviousSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSongByIndex(songIndex);
}
