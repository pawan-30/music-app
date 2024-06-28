console.log("Welcome to Apple Music");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let loopButton = document.getElementById('loop');
let shuffleButton = document.getElementById('shuffle');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "52 BARS", filePath: "Songs/1.mp3", coverPath: "Cover/fouryou.jpg"},
    {songName: "Admirin You", filePath: "Songs/2.mp3", coverPath: "Cover/mm.jpg"},
    {songName: "Champion's Anthem", filePath: "Songs/3.mp3", coverPath: "Cover/mm.jpg"},
    {songName: "Fallin Apart", filePath: "Songs/4.mp3", coverPath: "Cover/fouryou.jpg"},
    {songName: "God Damn", filePath: "Songs/5.mp3", coverPath: "Cover/etr.jpg"},
    {songName: "Goin Off", filePath: "Songs/6.mp3", coverPath: "Cover/gf.jpg"},
    {songName: "Nothing Lasts", filePath: "Songs/7.mp3", coverPath: "Cover/sd.jpg"},
    {songName: "Soflty", filePath: "Songs/8.mp3", coverPath: "Cover/mm.jpg"},
    {songName: "Top Class/Overseas", filePath: "Songs/9.mp3", coverPath: "Cover/sd.jpg"},
    {songName: "Winning Speech", filePath: "Songs/10.mp3", coverPath: "Cover/ws.jpg"},
]

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Loop functionality
loopButton.addEventListener('click', () => {
    if(audioElement.loop){
        audioElement.loop = false;
        loopButton.classList.remove('loop-active');
    } else {
        audioElement.loop = true;
        loopButton.classList.add('loop-active');
    }
})

// Shuffle functionality
shuffleButton.addEventListener('click', () => {
    let shuffledIndex = Math.floor(Math.random() * songs.length);
    audioElement.src = songs[shuffledIndex].filePath;
    masterSongName.innerText = songs[shuffledIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songIndex = shuffledIndex;
});
