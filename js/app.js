function app () {
    "use strict";

    bootstrap();

    function bootstrap() {
      getUserMedia();
    };
    function initWebsocket () {
      var ws = new WebSocket('ws://webcam.jasperchang.dev6.test.kkcorp:8008');
      return ws;
    }
    function getUserMedia () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      var constraints = {audio: false, video: true};
      var video = document.querySelector("video");
      var canvasOperate = document.querySelector('canvas');
      var ctxOperate = canvasOperate.getContext('2d');
      var canvasResult = document.getElementById('result');
      var ctxResult = canvasResult.getContext('2d');
      var isContinuous = true;

      function successCallback(stream) {
        var ws = initWebsocket();
        window.stream = stream; // stream available to console
        if (window.URL) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            var image = canvasOperate.toDataURL('image/png');
            processOneFrame();
        } else {
            video.src = stream;
        }
        ws.onopen = () => {
          ws.send(image);
        }
      }
      function errorCallback(error){
        console.log("navigator.getUserMedia error: ", error);
      }

      navigator.getUserMedia(constraints, successCallback, errorCallback);

      function processOneFrame() {
        // 將 video 元素的影像畫到一個 canvas 元素裡
        ctxOperate.drawImage(video, 0, 0, video.width, video. height); 
        // 從 canvas 元素裡拿出一個 ImageData 物件
        var imageData = ctxOperate.getImageData(0, 0, video.width, video.height);
        // 處理得到的 ImageData 物件

        // 將處理好的 ImageData 物件畫到另外一個 canvas 元素裡並且秀在畫面上
        ctxResult.putImageData(imageData, 0, 0);
        // 要求下一個影像畫面
        if (isContinuous) {
            requestAnimationFrame(processOneFrame);
        } else {
            return;
        }
      }
    }
}
