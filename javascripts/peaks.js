var PEAKS = PEAKS || {};

PEAKS.Main = (function() {
  var canvas  = $("#peaks"),
      ctx = canvas.get(0).getContext("2d"),
      peakLayers = [
        {
          vertexes: 2,
          minNumber: 2,
          maxHeight: 300,
          colors: ["#483018", "#BDAA71", "#F0E6DD"], // http://www.colourlovers.com/palette/738730/Simple_Kitchen
        },
        {
          vertexes: 2,
          minNumber: 5,
          maxHeight: 100,
          colors: ["#234D20", "#77AB59", "#C9DF8A", "#F0F7DA"], // http://www.colourlovers.com/palette/385992/Spring_Wedding
        },
      ]

  function setup() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    clearCanvas();

    for(p in peakLayers) {
      for(var i = 0; i < window.innerWidth;) {
        var particles = [],
            limit = Math.floor(Math.random() * window.innerWidth/peakLayers[p].minNumber);

        particles.push({ x: i,         y: window.innerHeight });
        particles.push({ x: i + limit, y: window.innerHeight });

        for(var j = 0; j < peakLayers[p].vertexes; j++) {
          particles.push({
            x: i + Math.floor(Math.random() * limit),
            y: window.innerHeight - peakLayers[p].maxHeight + Math.floor(Math.random() * peakLayers[p].maxHeight),
          });
        }

        drawTriangles(particles, peakLayers[p].colors);

        i += limit;
      }
    }
  }

  function drawTriangles(particles, colors) {
    var triangles = Triangulate(particles);

    for (var t in triangles) {
      var color = colors[Math.floor(Math.random() * (colors.length - 1))];
      drawTriangle(triangles[t], color);
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#FEFEFE";
    ctx.fillRect(0, 0, canvas.width(), canvas.height());
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
