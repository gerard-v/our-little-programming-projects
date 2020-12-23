function sq(x) {
  return x*x;
}

function dist(p1x, p1y, p2x, p2y) {
  return Math.sqrt(sq(p1x-p2x) + sq(p1y-p2y));
}

class Neuron {
  constructor() {
    var n; // Length of weight vector
    this.w1 = Math.random();
    this.w2 = Math.random();
  }
}

network = new Array(8);
for (i=0;i<8;i++) {
  network[i] = new Array(8);
  for (j=0;j<8;j++) {
    network[i][j] = new Neuron();
  }
}
trackedNeuron = network[randrange(8)][randrange(8)];

console.log(network);

canvas1 = document.getElementById("inputs");
ctx1= canvas1.getContext('2d');
ctx1.fillStyle = "navajowhite";
ctx1.fillRect(0,0,canvas1.width,canvas1.height);

canvas2 = document.getElementById("neurons");
ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = "lavender";
ctx2.fillRect(0,0,canvas2.width,canvas2.height);

canvas3 = document.getElementById("tracks");
ctx3 = canvas3.getContext('2d');
ctx3.fillStyle = "oldlace";
ctx3.fillRect(0,0,canvas3.width,canvas3.height);
ctx3.strokeStyle = "black";
ctx3.beginPath();
ctx3.moveTo(255*trackedNeuron.w1,255*trackedNeuron.w2);
ctx3.arc(trackedNeuron.w1*255,trackedNeuron.w2*255,2,0,2*Math.PI,true);
ctx3.stroke();

canvas4 = document.getElementById("colors");
ctx4 = canvas4.getContext('2d');
ctx4.fillStyle = "black";
ctx4.fillRect(0,0,canvas4.width,canvas4.height);
display();


function randrange(n) {
  return Math.floor(n*Math.random());
}

stepsize = 100;
eta = 0.125;

document.getElementById("eta").onchange = function (e) {
  eta = (e.target.value==0) ? 0 : Math.pow(2,(e.target.value-10));
  console.log(eta);
}

document.getElementById("stepsize").onchange = function (e) {
  stepsize = e.target.value;
}

canvas2.onclick = function(e) {
  console.log(e.offsetX,e.offsetY);
  for (i=0; i<8; i++) {
    for (j=0; j<8; j++) {
      testneuron = network[i][j];
      if (dist(255*testneuron.w1,255*testneuron.w2,e.offsetX,e.offsetY)<=2){
        console.log(testneuron);
        ctx3.stroke();
        ctx3.fillRect(0,0,canvas3.width,canvas3.height);
        // ctx3.strokeStyle = "black";
        trackedNeuron = testneuron;
        ctx3.beginPath();
        ctx3.moveTo(255*trackedNeuron.w1,255*trackedNeuron.w2);
        ctx3.arc(trackedNeuron.w1*255,trackedNeuron.w2*255,2,0,2*Math.PI,true);
        ctx3.stroke();
        ctx3.beginPath();
        ctx3.moveTo(255*trackedNeuron.w1,255*trackedNeuron.w2);
      }
    }
  }
}

document.getElementById("step").onclick = function () {
  for (n=0; n<stepsize; n++) {
    mindist = 2;
    mini = 9;
    minj = 9;
    i1 = Math.random();
    i2 = Math.random();
    while (dist(i1,i2,0.5,0.5) > 0.2) {
      i1 = Math.random();
      i2 = Math.random();
    }
    ctx1.beginPath();
    ctx1.arc(i1*255,i2*255,0.3,0,2*Math.PI,true);
    ctx1.stroke(); 

    for (i=0;i<8;i++) {
      for (j=0;j<8;j++) {
        var d = dist(i1,i2,network[i][j].w1,network[i][j].w2);
        if (d < mindist) {
          mindist = d;
          mini = i;
          minj = j;
        }
      }
    }
    for (i=Math.max(0,mini-1);i<=Math.min(mini+1,7);i++) {
      for (j=Math.max(0,minj-1);j<=Math.min(minj+1,7);j++) {
        network[i][j].w1 += eta*(i1 - network[i][j].w1);
        network[i][j].w2 += eta*(i2 - network[i][j].w2);
      }
    }
  }
  display();
}

function display() {
  ctx2.fillStyle = "lavender";
  ctx2.fillRect(0,0,canvas2.width,canvas2.height);
  for (i=0;i<8;i++) {
    for (j=0;j<8;j++) {
      ctx2.beginPath();
      ctx2.arc(network[i][j].w1*255,network[i][j].w2*255,2,0,2*Math.PI,true);
      ctx2.stroke(); 
    }
  }
  for (i=0;i<8;i++) {
    for (j=0;j<8;j++) {
      if (i<7) {
        ctx2.strokeStyle = 'red';
        ctx2.beginPath();
        ctx2.moveTo(network[i][j].w1*255,network[i][j].w2*255);
        ctx2.lineTo(network[i+1][j].w1*255,network[i+1][j].w2*255);
        ctx2.stroke();
      }
      if (j<7) {
        ctx2.beginPath();
        ctx2.moveTo(network[i][j].w1*255,network[i][j].w2*255);
        ctx2.lineTo(network[i][j+1].w1*255,network[i][j+1].w2*255);
        ctx2.stroke();
      }
    }
  }
  ctx3.lineTo(255*trackedNeuron.w1,255*trackedNeuron.w2);
  ctx3.stroke();
  ctx3.beginPath();
  ctx3.moveTo(255*trackedNeuron.w1,255*trackedNeuron.w2);

  for (i=0;i<8;i++) {
    for (j=0;j<8;j++) {
      var n = network[i][j];
      ctx4.fillStyle = 'rgb('+Math.floor(255*n.w1)+','+Math.floor(255*n.w2)+',0)';
      ctx4.fillRect(32*i,32*j,32,32);
    }
  }

}

