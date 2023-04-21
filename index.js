const captureBtn = document.getElementById("capture-btn");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const constraints = { audio: false, video: { facingMode: "user" } };

function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
    })
    .catch(function(err) {
      console.log("Error accessing camera:", err);
    });
}

function stopCamera() {
  video.pause();
  video.srcObject.getTracks().forEach(function(track) {
    track.stop();
  });
}

function captureImage() {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/png");
  console.log(dataUrl); // do something with the image data URL
}

captureBtn.addEventListener("click", function() {
  startCamera();
  setTimeout(captureImage, 1000); // wait 1 second for camera to start
  setTimeout(stopCamera, 2000); // wait 2 seconds before stopping camera
});