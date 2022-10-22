let video = document.getElementById("video");

function getMedia() {
  let contraints = {
    video: { width: 640, height: 360 },
    audio: false,
  };

  let promise = navigator.mediaDevices.getUserMedia(contraints);
  promise
    .then(function (mediaStream) {
      video.srcObject = mediaStream;
      video.play();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function takePhoto() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, 640, 360);
}

function Download() {
  let type = "jpg";
  var imgdata = canvas.toDataURL(type);

  var fixtype = function (type) {
    type = type.toLocaleLowerCase().replace(/jpg/i, "jpeg");
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return "image/" + r;
  };

  imgdata = imgdata.replace(fixtype(type), "image/octet-stream");

  var savaFile = function (data, filename) {
    var save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = data;
    save_link.download = filename;

    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    save_link.dispatchEvent(event);
  };

  let result = Math.floor(Math.random() * 99999999);

  let filename = "img_" + new Date().getSeconds() + result + "." + type;

  savaFile(imgdata, filename);

  $.ajax({
    type: "POST",

    url: "/identify",

    data: { name: filename },

    dataType: "json",

    success: function (data) {
      console.log("success");
      console.log(data);
    },
    error: function (error) {
      console.log("error");
      console.log(error);
    },
  });
}
