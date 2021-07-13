let songList = [
    {
        Name:"KAISE HUA",
        Singer:"Vishal Mishra",
        songId: "KaiseHua.mp3",
        songImg: "KaiseHua.jpg"
    },{
        Name:"LOVE STORY",
        Singer:"Taylor Swift",
        songId: "LoveStory.mp3",
        songImg: "LoveStory.jpg"
    },{
        Name:"Enchanted",
        Singer:"Taylor Swift",
        songId: "Enchanted.mp3",
        songImg: "Enchanted.jpg"
    }];
 
let song = document.getElementById("song");
let songName = document.getElementById("songName");
let singerName = document.getElementById("singerName");
let songImg = document.getElementById("songPic");
let prev = document.getElementById("prev");
let play = document.getElementById("play");
let next = document.getElementById("next");
let Id = 0;
let playlistLen = songList.length;
let timeProgress = document.getElementById("timeProgress");
let runtime = document.getElementById("runtime");
let totalTime = document.getElementById("totalTime");
let fullBar = document.getElementById("fullBar");
let mute = document.getElementById("mute");
 
const songInfo = (idVal)=>{
    songData = songList[idVal];
    songName.innerHTML=songData.Name;
    singerName.innerHTML=songData.Singer;
    songImg.setAttribute("src","Images/" + songData.songImg);
    song.setAttribute("src","Music/" + songData.songId);
}
 
const playMusic = ()=>{
    if(play.firstChild.classList[1] == "fa-play-circle"){
        song.pause();
        songImg.classList.remove("rotate");
    }else{
        song.play();
        songImg.classList.add("rotate");
    }
}
 
prev.addEventListener('click',()=>{
    Id = (Id+playlistLen-1)%playlistLen;
    songInfo(Id);
    playMusic()
})
 
next.addEventListener('click',()=>{
    Id = (Id+1)%playlistLen;
    songInfo(Id);
    playMusic();
});
 
play.addEventListener('click',function(){
    if(this.firstChild.classList[1] == "fa-play-circle"){
        this.firstChild.classList.add("fa-pause-circle");
        this.firstChild.classList.remove("fa-play-circle");
        playMusic()
    }else{
        this.firstChild.classList.add("fa-play-circle");
        this.firstChild.classList.remove("fa-pause-circle");
        playMusic()}
    });

song.addEventListener("timeupdate",(event)=>{
    const {currentTime,duration} = event.target;
    let minutes = Math.floor(currentTime/60);
    let seconds = Math.floor(currentTime%60);
    let totMin = Math.floor(duration/60);
    let totSec = Math.floor(duration%60);
    timeProgress.style.width = `${100*(currentTime/duration)}%`;
    if(seconds<10){
        runtime.innerHTML = `${minutes}:0${seconds}`;
    }else{
        runtime.innerHTML = `${minutes}:${seconds}`;
    }
    if(duration){
        if(totSec<10){
            totalTime.innerHTML = `${totMin}:0${totSec}`;
        }else{
            totalTime.innerHTML = `${totMin}:${totSec}`;
        }
    }
    if(currentTime==duration){
        next.click();
    }
})
    
    
//Touch and go to point
fullBar.addEventListener('click',(event)=>{
    const {offsetX} = event;
    const {clientWidth} = event.target;
    const duration = song.duration;
    song.currentTime = (offsetX/clientWidth)*duration;
    timeProgress.style.width = `${100*(offsetX/clientWidth)}%`
})
    
//Mute Feature
    
isMute = false
mute.addEventListener('click',function(){
    if(!isMute){
        this.classList.remove('fa-volume-up');
        this.classList.add('fa-volume-off');
        song.muted=true;
        isMute = true;
    }else{
        this.classList.remove('fa-volume-off');
        this.classList.add('fa-volume-up');
        song.muted=false;
        isMute = false;
    }
})
    
