var network;

function sq(x) {
  return x*x;
}

var running = false;

canvas1 = document.getElementById("inputs");
ctx1= canvas1.getContext('2d');

canvas2 = document.getElementById("neurons");
ctx2 = canvas2.getContext('2d');

canvas3 = document.getElementById("tracks");
ctx3 = canvas3.getContext('2d');

canvas4 = document.getElementById("colors");
ctx4 = canvas4.getContext('2d');

function dist(p1x, p1y, p2x, p2y) {
  return Math.sqrt(sq(p1x-p2x) + sq(p1y-p2y));
}

class Vector {
  constructor(e1, e2) {
    this.elements = new Array(2);
    this.elements[0] = e1;
    this.elements[1] = e2;
  }
}

class Neuron {

  constructor(i,j,scale) {
    var n; // Length of weight vector
    this.i = i;
    this.j = j;
    this.scale = scale;
    this.w1 = Math.random();
    this.w2 = Math.random();
  }

  display() {
    ctx2.beginPath();
    ctx2.arc(this.w1*canvas2.width,this.w2*canvas2.height,2,0,2*Math.PI,true);
    ctx2.stroke(); 

    ctx4.fillStyle = 'rgb('+256*this.w1+','+256*this.w2+',0)';
    ctx4.fillRect(this.scale*this.i,this.scale*this.j,this.scale,this.scale);
    if (this == trackedNeuron){
      ctx4.strokeStyle = "white";
      ctx4.lineWidth = 2;
      ctx4.strokeRect(this.scale*this.i,this.scale*this.j,this.scale-1,this.scale-1); // -1 bcause lineWidth = 2
    }
  }
}

class Network {
  constructor(length, width) {
    this.size = {'x': length, 'y': width};
    var i,j;
    let scale=canvas4.width/this.size.x;
    this.neurons = new Array(length);
    for (i=0;i<length;i++) {
      this.neurons[i] = new Array(width);
      for (j=0;j<width;j++) {
        this.neurons[i][j] = new Neuron(i,j,scale);
      }
    }
    this.eta = 0.125;
  }

  update() {
    var i, j, mini = this.size.x+1, minj = this.size.y+1, mindist = 2;

    for (i=0;i<this.size.x;i++) {
      for (j=0;j<this.size.y;j++) {
        var d = dist(i1,i2,this.neurons[i][j].w1,this.neurons[i][j].w2);
        if (d < mindist) {
          mindist = d;
          mini = i;
          minj = j;
        }
      }
    }
    for (i=Math.max(0,mini-1);i<=Math.min(mini+1,this.size.x-1);i++) {
      for (j=Math.max(0,minj-1);j<=Math.min(minj+1,this.size.y-1);j++) {
        this.neurons[i][j].w1 += this.eta*(i1 - this.neurons[i][j].w1);
        this.neurons[i][j].w2 += this.eta*(i2 - this.neurons[i][j].w2);
      }
    }
  }

  displayNodes() {
    this.neurons.forEach( row => row.forEach( node => node.display() ) );
  }

  displayConnections() {
    var i,j;
    ctx2.fillStyle = "lavender";
    ctx2.fillRect(0,0,canvas2.width,canvas2.height);
    ctx2.strokeStyle = 'red';
    // Display connections
    for (i=0;i<this.size.x;i++) {
      for (j=0;j<this.size.y;j++) {
        if (i<this.size.x-1) {
          this.drawConnection(this.neurons[i][j],this.neurons[i+1][j]);
        }
        if (j<this.size.y-1) {
          this.drawConnection(this.neurons[i][j],this.neurons[i][j+1]);
        }
      }
    }
  }

  drawConnection(neuron1, neuron2) {
    ctx2.beginPath();
    ctx2.moveTo(neuron1.w1*canvas2.width,neuron1.w2*canvas2.height);
    ctx2.lineTo(neuron2.w1*canvas2.width,neuron2.w2*canvas2.height);
    ctx2.stroke();
  }

  displayTracks() {
    // Add segment to neuron track
    ctx3.lineTo(canvas3.width*trackedNeuron.w1,canvas3.height*trackedNeuron.w2);
    ctx3.stroke();
    ctx3.beginPath();
    ctx3.moveTo(canvas3.width*trackedNeuron.w1,canvas3.height*trackedNeuron.w2);
  }

  display() {
    this.displayConnections();
    this.displayNodes();
    this.displayTracks();
  }

}

function initialize(size) {
  network = new Network(size,size);

  trackedNeuron = network.neurons[randrange(size)][randrange(size)];

  console.log(network);

  ctx1.fillStyle = "navajowhite";
  ctx1.fillRect(0,0,canvas1.width,canvas1.height);

  ctx2.fillStyle = "lavender";
  ctx2.fillRect(0,0,canvas2.width,canvas2.height);

  ctx3.fillStyle = "oldlace";
  ctx3.fillRect(0,0,canvas3.width,canvas3.height);
  ctx3.strokeStyle = "black";
  ctx3.beginPath();
  ctx3.moveTo(canvas3.width*trackedNeuron.w1,canvas3.height*trackedNeuron.w2);
  ctx3.arc(trackedNeuron.w1*canvas3.width,trackedNeuron.w2*canvas3.height,2,0,2*Math.PI,true);
  ctx3.stroke();

  ctx4.fillStyle = "black";
  ctx4.fillRect(0,0,canvas4.width,canvas4.height);
  network.display();
}

function randrange(n) {
  return Math.floor(n*Math.random());
}

stepsize = 100;

document.getElementById("eta").onchange = function (e) {
  network.eta = (e.target.value==0) ? 0 : Math.pow(2,(e.target.value-10));
  console.log(network.eta);
}

document.getElementById("stepsize").onchange = function (e) {
  stepsize = e.target.value;
}

canvas2.onclick = function(e) {
  console.log(e.offsetX,e.offsetY);
  for (i=0; i<network.size.x; i++) {
    for (j=0; j<network.size.y; j++) {
      testneuron = network.neurons[i][j];
      let X = canvas3.width*testneuron.w1;
      let Y = canvas3.height*testneuron.w2;
      if (dist(canvas2.width*testneuron.w1,canvas2.height*testneuron.w2,e.offsetX,e.offsetY)<=2){
        console.log(testneuron);
        ctx3.stroke();
        ctx3.fillRect(0,0,canvas3.width,canvas3.height);
        // ctx3.strokeStyle = "black";
        trackedNeuron = testneuron;
        ctx3.beginPath();
        ctx3.moveTo(X,Y);
        ctx3.arc(X,Y,2,0,2*Math.PI,true);
        ctx3.stroke();
        ctx3.beginPath();
        ctx3.moveTo(X,Y);
        network.display();
      }
    }
  }
}

canvas4.onclick = function(e) {
  let squareSizeHor = canvas4.width/network.size.x;
  let squareSizeVer = canvas4.height/network.size.y;
  console.log(e.offsetX,e.offsetY);
  trackedNeuron = network.neurons[Math.floor(e.offsetX/squareSizeHor)][Math.floor(e.offsetY/squareSizeVer)];
  network.display();
}

  
function getInputShape() {
  var radioButtons = document.getElementsByName("shape");
  for (choice of radioButtons)
    if (choice.checked)
      return choice.value;
}

function generateInput() {
    i1 = Math.random();
    i2 = Math.random();
/**/
    if (getInputShape() == "circle") {
      while (dist(i1,i2,0.5,0.5) > 0.2) {
        i1 = Math.random();
        i2 = Math.random();
      }
    }
/**/
  return new Vector(i1,i2);
}

document.getElementById("new").onclick = function () {
  initialize(document.getElementById("size").value);
}

document.getElementById("step").onclick = function () {
  if (running) {
    running = false;
  }
  else {
    running = true;
    simulationLoop();
  }
}

function simulationLoop() {
  var input;
  for (var n=0; n<stepsize; n++) {
    input = generateInput();
    ctx1.beginPath();
    ctx1.arc(input.elements[0]*ctx1.canvas.width,input.elements[1]*ctx1.canvas.height,0.3,0,2*Math.PI,true);
    ctx1.stroke(); 

    network.update();
  }
  network.display();
  if (running)
    requestAnimationFrame(simulationLoop); // Weghalen indien setInterval() gebruikt
}

// trackedNeuron is being referenced in neuron.display(), so:
var trackedNeuron = new Neuron(0,0,0); // Is this really necessary?

initialize(8);

