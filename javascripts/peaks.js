var PEAKS = PEAKS || {};

PEAKS.Main = (function() {
  var canvas  = document.getElementById('peaks'),
      ctx = canvas.getContext("2d"),
      peakLayers = [
        {
          vertexes: 2,
          number: 3,
          maxHeight: 300,
          colors: ["#483018", "#BDAA71", "#F0E6DD"], // http://www.colourlovers.com/palette/738730/Simple_Kitchen
        },
        {
          vertexes: 2,
          number: 7,
          maxHeight: 100,
          colors: ["#234D20", "#77AB59", "#C9DF8A", "#F0F7DA"], // http://www.colourlovers.com/palette/385992/Spring_Wedding
        },
      ]

  function setup() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    clearCanvas();
    generateAndDrawTriangles();
  }

  function random(upperLimit) {
    return Math.floor(Math.random() * upperLimit);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#FEFEFE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function generateAndDrawTriangles() {
    for(var p = 0; p < peakLayers.length; p++) {
      var sectorWidth = window.innerWidth/peakLayers[p].number,
          x0 = 0,
          x1 = 0;

      for(var i = 0; i < peakLayers[p].number; i++) {
        var particles = [];
        x0 = x1;
        x1 = (i+1 == peakLayers[p].number) ? window.innerWidth : (sectorWidth*i) + random(sectorWidth);

        particles.push({ x: x0, y: window.innerHeight });
        particles.push({ x: x1, y: window.innerHeight });

        for(var j = 0; j < peakLayers[p].vertexes; j++) {
          particles.push({
            x: x0 + random(x1 - x0),
            y: window.innerHeight - peakLayers[p].maxHeight + random(peakLayers[p].maxHeight),
          });
        }

        drawTriangles(particles, peakLayers[p].colors);
      }
    }
  }

  function drawTriangles(particles, colors) {
    var triangles = Triangulate(particles);

    for (var t in triangles) {
      var color = colors[random(colors.length - 1)];
      drawTriangle(triangles[t], color);
    }
  }

  function drawTriangle(triangle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(triangle.v0.x, triangle.v0.y);
    ctx.lineTo(triangle.v1.x, triangle.v1.y);
    ctx.lineTo(triangle.v2.x, triangle.v2.y);
    ctx.closePath();
    ctx.fill();
  }

  setup();
})();
