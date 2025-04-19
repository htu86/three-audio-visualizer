const fileInput = document.getElementById("fileSelect") as HTMLInputElement;
const audioElement = document.getElementById("audioElement") as HTMLAudioElement;

let audioCtx: AudioContext;
let audioSource: MediaElementAudioSourceNode;
let audioAnalyser: AnalyserNode;
let bufferLength: number;
let dataArray: Uint8Array;
let barHeight: number;

fileInput?.addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const audioURL = URL.createObjectURL(file);
    audioElement.src = audioURL;
    audioElement.load();
  }
});

audioElement?.addEventListener("play", () => {
  // Create AudioContext on user interaction
  if (!audioCtx) {
    audioCtx = new AudioContext();
    audioSource = audioCtx.createMediaElementSource(audioElement);
    audioAnalyser = audioCtx.createAnalyser();

    audioSource.connect(audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);
    audioAnalyser.fftSize = 128;

    bufferLength = audioAnalyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
});
audioElement?.addEventListener("pause", () => {
  if(!audioElement.paused){
    audioElement.pause()
  }
})

export {
  audioCtx,
  audioSource,
  audioAnalyser,
  bufferLength,
  dataArray,
  barHeight,
};