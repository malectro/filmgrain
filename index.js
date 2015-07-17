var benchmarks = {};
var HIGH = 9999999999;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

window.addEventListener('resize', setDimensions);
setDimensions();

var image = new Image();
image.src = 'fez.png';
image.addEventListener('load', function () {
  drawImage(image);
  draw();
});

function draw() {
  randomize(10);
  window.requestAnimationFrame(draw);
}

function randomize(amount) {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  var noise;
  for (var i = 0; i < data.length; i += 4) {
    noise = Math.floor(Math.random() * 2 * amount) - amount;
    data[i] = clamp(data[i] + noise, 0, 255);
    data[i + 1] = clamp(data[i + 1] + noise, 0, 255);
    data[i + 2] = clamp(data[i + 2] + noise, 0, 255);
  }

  ctx.putImageData(imageData, 0, 0);
}

function drawImage(image) {
  // TODO(kyle): have the image 'cover' the space and not distort
  ctx.clearRect(0, 0, HIGH, HIGH);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function setDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}



function clamp(value, min, max) {
  if (value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  }
  return value;
}

function benchmark(tag, text) {
  if (text) {
    var start = benchmarks[tag];
    if (start) {
      console.log((new Date()) - start, text);
    } else {
      console.log(new Date(), text);
    }
  } else {
    benchmarks[tag] = new Date();
  }
}

