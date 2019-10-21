# javascript-music-player

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
