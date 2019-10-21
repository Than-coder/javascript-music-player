class Player {
  constructor(audio,config){
    this.audio = null;
    // button
    this.nextBtn = null;
    this.prevBtn = null;
    this.playBtn = null;
    // header
    this.playerHeader = null;
    // controller
    this.timeSlider = null;
    this.speakerSlider = null;
    this.currentTime = null;
    this.durationTime = null;
    this.speaker = null;
    // footer
    this.playerShowList = null;
    // mp3 array
    this.songs = null;
    this.currentSongName = null;
    this.path = null;
    this.volume = 0.3;
    this.index = 0;
    this.songLoop = null;

    return new Promise((resolve,reject)=>{
      try{
        if(!audio) throw 'audio object not found!';
        this.audio = audio;

        if(!config) throw 'Please set config';
        const { 
          songs,
          path,
          volume,
          loop,
          playerShowList,
          playerHeader,
          timeSlider,
          speakerSlider,
          currentTime,
          durationTime,
          speaker,
          nextBtn,
          prevBtn,
          playBtn
        } = config;
        if(!songs) throw 'please set songs \'songs\' ';
        if(!path) throw 'please set file path \'\\path\'  ';
        if(volume){
          this.volume = volume;
        }

        this.songs = songs;
        this.path = path;
        this.songLoop = loop
        this.playerShowList = playerShowList;
        this.playerHeader = playerHeader;
        this.timeSlider = timeSlider;
        this.speakerSlider = speakerSlider;
        this.currentTime = currentTime;
        this.durationTime = durationTime;
        this.speaker = speaker;
        this.nextBtn = nextBtn;
        this.prevBtn = prevBtn;
        this.playBtn = playBtn;

        //send player class
        resolve(this);
        //init
        this.Init();
        this.UI();
        this.EventListener();
      }catch(err){
        reject(err);
      }
    })
  }

  Play = (e) =>{
    if(this.audio.paused){
      this.audio.play();
      this.playBtn.innerText = 'Paused';
    }else{
      this.audio.pause();  
      this.playBtn.innerText = 'Play';      
    }
    this.UI();
  }

  Init = () =>{
    this.audio.src = `${this.path}/${this.songs[this.index].filename}`;
    this.audio.volume = this.volume;
    this.currentSongName = `${this.songs[this.index].name}`;
    this.playerHeader.innerHTML = this.currentSongName;
    //class ui  
    this.UI();
    this.audio.onloadeddata = ()=>{
      this.Timer();
    }
  }
  
  UI = () =>{
    // show footer
    let li = '';
    this.songs.forEach((s,i) =>{
      li += `<li 
      data-filename="${s.filename}"
      data-index="${i}"
      class="${s.name === this.currentSongName ? 'current-song':null}">${s.name}</li>`;
    });
    //show list
    this.playerShowList.innerHTML = li;
  
    // time slider
    this.timeSlider.value = 0;
    this.speakerSlider.value = this.volume;
    this.Timer();
  } 

  Timer = () =>{
    let cur = this.audio.currentTime;
    let dur = this.audio.duration;
    // dur
    let durM = Math.round(dur/60);
    let durS = Math.round(dur%60);
    // cur
    let curM = Math.round(cur/60);
    let curS = Math.round(cur%60);
    // slider
    let slider = Math.round((100/dur)*cur);    

    //show dur
    this.durationTime.innerHTML = `${setZero(durM)}:${setZero(durS)}`;
    this.currentTime.innerHTML = `${setZero(curM)}:${setZero(curS)}`;
    // show time slider
    this.timeSlider.value = slider;

    //check mp3 play
    let interval;
    if(!this.audio.paused){
      interval =setTimeout(()=>{
        this.Timer();
      },1000);
    }else{
      clearTimeout(interval);
    }
    //song loop
    if(this.audio.ended){
      this.index++;

      if(this.index === this.songs.length){
        this.index = 0;
        this.Init();
        if(this.songLoop){
          this.Play();
        }else{
          this.playBtn.innerText = 'Play';
        }
      }else{
        this.Init();
        this.Play();
      }
      
     
    }
    
  }

  Next = () =>{
    this.index++;
    if(this.index === this.songs.length){
      this.index = 0;
    }
    this.Init();
  }
  Prev = () =>{
    if(this.index === 0 ){
      this.index = this.songs.length -1;
    }else{
      this.index --;
    }
    this.Init();
  }
  changeTimeSlider = value =>{
    let dur = this.audio.duration;
    let cur = (dur/100) * value;
    this.audio.currentTime = cur;
    //UI
    this.UI();
  }
  speakerSliderChange = value =>{
    this.volume = value;
    this.audio.volume = value;
    this.speakerSlider.value = value;
  }

  playerShowListClick = (index,name,filename) =>{
    this.index = index;
    this.currentSongName = name;
    //ui
    this.Init();
    this.Play();
  }
  //player event listener
  EventListener = () =>{
    //play btn
    this.playBtn.addEventListener('click',e =>{
      //play 
      this.Play(e.target);
    });
    //next btn
    this.nextBtn.addEventListener('click',e =>{
      //play 
      this.Next();
      this.Play();
    });
    //prev btn
    this.prevBtn.addEventListener('click',e =>{
      //play 
      this.Prev();
      this.Play();
    });
    //time slider
    this.timeSlider.addEventListener('input',e =>{
      this.changeTimeSlider(e.target.value);
    });
    //song list
    this.playerShowList.addEventListener('click',e =>{
      let index = parseInt(e.target.dataset.index);
      let filename = e.target.dataset.filename;
      let name = e.target.innerText;
      //click
      this.playerShowListClick(index,name,filename);
    });
    //song speaker slider
    this.speakerSlider.addEventListener('input',e =>{
      this.speakerSliderChange(e.target.value)
    });
  };
};

//set zero
function setZero(data){
  return `${data < 10 ? `0${data}`:data}`;
}