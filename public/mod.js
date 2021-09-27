///---user code
//const uName =prompt('Apna naam likh')
////
 var socket = io();
//getting video grid
const videoGrid=document.getElementById('video-grid');
const myPeer = new Peer()
//creating vid element to append to the div
const myVideo = document.createElement('video');
myVideo.muted=true;
//taking input from browser

    //when user is coonected a msg is displayed to host 
    socket.on('user-connected',(userID,uName)=>{
        console.log('user connected ' + userID);
        console.log('user name is '+uName)
        connectToNewUser(userID,stream);
    })

    })
//making global uName
var uNamex;

//peer conection
myPeer.on('open',id=>{
    //test
    console.log('socket pper connection working');
    //test name
    let uName = prompt('Naam likh apna')
    socket.emit('join-room',ROOM_ID,id,uName)
  //  console.log('my id '+id)
  uNamex=uName;
})
//


//msg functionality
var form = document.getElementById('form');
  var input = document.getElementById('input');
  var messages = document.getElementById('messages');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value ,uNamex);
      input.value = '';
    }
  });
  //
  socket.on('chat message', function(msg,userName) {
    var item = document.createElement('li');
    //test code
    var h4 =document.createElement('h4')
    h4.innerHTML=userName;
    //div ok
    var div = document.createElement("div");


div.style.color = "black";
div.className = 'msg_box'
//div.innerHTML = msg;

item.appendChild(div);
div.appendChild(h4)
var p = document.createElement('p')
p.innerHTML=msg;
div.appendChild(p)
    //
    //item.textContent = msg;
   
    messages.appendChild(item);
    //window.scrollTo(0, document.body.scrollHeight);
   // window.scrollTo(0,document.querySelector(".main__right").scrollHeight);
  // let cont =document.getElementsByClassName('main_chat_window')
  
    console.log(msg + ' new msg')
  });
//msg functionality completed

//----------------------------------button controls
//--------mute button for audio
let muteToggle =()=>{
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
      
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
      
    }
    
}

//extra function for audio button control
const setUnmuteButton = () => {
    let html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main_mute_button').innerHTML = html;
  }
const setMuteButton=()=>{
    let html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main_mute_button').innerHTML = html;
}
//----------end of audio 

//-----------------------video controls
const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  //helper function
  const setPlayVideo=()=>{
   
        const html = `
        <i class="unmute fas fa-video-slash"></i>
          <span>Play Video</span>
        `
        document.querySelector('.main_video_button').innerHTML = html;
      
  }
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main_video_button').innerHTML = html;
  }
  //--------------end of vid button



//functions
addVideoStream=(video,stream)=>{
    //test
    console.log('added to stream')
    video.srcObject=stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
        videoGrid.append(video)
}

const connectToNewUser=(userID,stream)=>{
    //calling 
    //console.log(userID+'makiing call')
    const call= myPeer.call(userID,stream);
    //test
   
    console.log('i am calling !')
    const video=document.createElement('video')
    call.on('stream',userVideoStream=>{
        console.log('makiwerwer call')
        addVideoStream(video,userVideoStream)
    })
    call.on('close',()=>{
        video.remove()
    })

    //random git code

    

    
}