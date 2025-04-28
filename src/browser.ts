// Function to check which browser 

export function checkBrowser(){
  let supportedBrowsers:string[] = ["Chrome", "Firefox", "Opera"];
  let isSupported: boolean = false;
  let browserString = window.navigator.userAgent;
  const volumeSlider = document.getElementById("volumeControl")

  // Check if the browserString matches to atleast one of the supported browsers
  supportedBrowsers.some(browser => browserString.includes(browser)) ? isSupported = true : isSupported;

  if(isSupported){
    volumeSlider?.setAttribute('style', 'display: none;');
  }
}