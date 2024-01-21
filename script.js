let startbutton = document.getElementById("start-button");
let stopbutton = document.getElementById("stop-button");
let inputTextArea = document.getElementById("voice-input-text");
let outputTextArea = document.getElementById("voice-output-text");
let inputCopyButton = document.getElementById("input-copy-button");
let outputCopyButton = document.getElementById("output-copy-button");
let inputBoxText = "";
let outputBoxText = "";

let recognition = new webkitSpeechRecognition();
recognition.maxDuration = 600000;

recognition.lang = "en-US";
recognition.onresult = function (event) {
  let text = event.results[0][0].transcript;
  changeInputTextArea(text);
  text = text.toLowerCase();
  startbutton.innerText = "Start 🎙️";
  search(text);
};

startbutton.addEventListener("click", async () => {
  startbutton.innerText = " Listening ";
  try {
//     // Request audio permissions
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     // Initialize AudioContext
//     audioContext = new AudioContext();
//     const source = audioContext.createMediaStreamSource(mediaStream);

//     // Now you can use 'source' for audio processing or recording
//     console.log(source);
    recognition.start();
  } catch (error) {
    if (
      error.name === "NotAllowedError" ||
      error.name === "PermissionDismissedError"
    ) {
      
      // Provide user feedback
      startbutton.innerText = "Permission Denied";
      const extensionOrigin = chrome.runtime.getURL("");
      chrome.tabs.create({
        url: `chrome://settings/content/siteDetails?site=${encodeURIComponent(
          extensionOrigin
        )}`,
      });
      setTimeout(() => {
        startbutton.innerText = "Start 🎙️";
      }, 2000);
    } else {
      console.error("Error accessing microphone:", error);
      startbutton.innerText = "Start 🎙️";
    }
  }
});
stopbutton.addEventListener("click", () => {
  startbutton.innerText = "Start 🎙️";

  // Stop audio capture
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }

  // Stop speech recognition
  recognition.stop();
});

const changeInputTextArea = (newText) => {
  inputBoxText = capitalizeText(newText);
  inputTextArea.innerText = capitalizeText(newText);
};
const changeOutputTextArea = (newText) => {
  outputBoxText = capitalizeText(newText);
  outputTextArea.innerText = capitalizeText(newText);
};

inputCopyButton.addEventListener("click", function () {
  copyToClipboard(inputBoxText);
  inputCopyButton.innerText = "✔️";
  setTimeout(() => {
    inputCopyButton.innerText = "copy";
  }, 3000);
});
outputCopyButton.addEventListener("click", () => {
  copyToClipboard(outputBoxText);
  outputCopyButton.innerText = "✔️";
  setTimeout(() => {
    outputCopyButton.innerText = "copy";
  }, 3000);
});
