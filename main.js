function $(data){
  return document.querySelector(data);
}

// const audio = new Audio();
const audio = new Audio();
//song array 
//songs = [
//   {
//     name:'songe name',
//     filename:'song file name'
//   }
// ]
const songs = [
  {
    name:'The Chainsmokers - Closer ft. Halsey',
    filename:'song_1.mp3'
  },
  {
    name:'The_Wanted___We_Own_The_Night',
    filename:'song_2.mp3'
  }
];
// player config file
const config = {
  songs,
  path:'/mp3',
  volume:0.3,
  loop:false,
  playerShowList: $('.player-footer'),
  timeSlider: $('.time-slider'),
  speakerSlider: $('.speaker-slider'),
  currentTime: $('.cur-time'),
  durationTime: $('.dur-time'),
  speaker: '',
  nextBtn: $('.next-btn'),
  prevBtn: $('.prev-btn'),
  playBtn: $('.play-btn'),
  playerHeader:$('.player-header')
}
//player class
new Player(audio,config)
  .then(player =>{

  })
  .catch(err =>{
    console.error(err);
  });

