
const audioControls = document.getElementById("audioElement")

const fileInput = document.getElementById("fileSelect") // This is where we select the file needed as the audio source

const audio1 = new Audio();
const audioCtx = new AudioContext();
let audioSource;
let audioAnalyser:any;
let audioURL:any;


// Loading the audio file
fileInput?.addEventListener("change", ()=>{
  const file = event?.target.files[0]
  if(file){
    audioURL = URL.createObjectURL(file)
  }
  audio1.src = audioURL
})

let bufferLength:any;
let dataArray:any = [];
let barHeight;

audioControls?.addEventListener("play", () => {
  if (audio1.paused) {
    audio1.play();
    audioCtx.resume()
    audioSource = audioCtx.createMediaElementSource(audio1);
    audioAnalyser = audioCtx.createAnalyser();
    audioSource.connect(audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);
    audioAnalyser.fftSize = 128;
    bufferLength = audioAnalyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  } 
});
audioControls?.addEventListener("pause", () => {
  if(!audio1.paused){
    audio1.pause()
  }
})

export {
  audioControls,
  audio1,
  audioCtx,
  audioSource,
  audioAnalyser,
  bufferLength,
  dataArray,
  barHeight,
};