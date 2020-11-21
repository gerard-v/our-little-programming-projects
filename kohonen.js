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

console.log(network);

canvas1 = document.getElementById("inputs");
ctx1= canvas1.getContext('2d');
ctx1.fillStyle = "navajowhite";
ctx1.fillRect(0,0,canvas1.width,canvas1.height);

canvas2 = document.getElementById("neurons");
ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = "lavender";
ctx2.fillRect(0,0,canvas2.width,canvas2.height);

// TODO: functie van maken!!!
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
      ctx2.strokeStyle = 'rgba(0.1,0.1,0.3,0.6)';
      ctx2.beginPath();
      ctx2.moveTo(network[i][j].w1,network[i][j].w2);
      ctx2.lineTo(network[i+1][j].w1,network[i+1][j].w2);
      ctx2.stroke();
    }
    if (j<7) {
      ctx2.beginPath();
      ctx2.moveTo(network[i][j].w1,network[i][j].w2);
      ctx2.lineTo(network[i][j+1].w1,network[i][j+1].w2);
      ctx2.stroke();
    }
  }
}

eta = 0.1;
mindist = 2;
mini = 9;
minj = 9;
for (n=0; n<10000; n++) {
  i1 = Math.random();
  i2 = Math.random();
  ctx1.beginPath();
  ctx1.arc(i1*255,i2*255,1,0,2*Math.PI,true);
  ctx1.stroke(); 

  for (i=0;i<8;i++) {
    for (j=0;j<8;j++) {
      dist = Math.pow(i1-network[i][j].w1,2);
      dist += Math.pow(i2-network[i][j].w2,2);
      if (dist < mindist) {
        mindist = dist;
        mini = i;
        minj = j;
      }
    }
  }
  for (i=Math.min(0,i-1);i<Math.min(i+1,7);i++) {
    for (j=Math.min(0,j-1);j<Math.min(j+1,7);j++) {
      network[i][j].w1 += eta*(i1 - network[i][j].w1);
      network[i][j].w2 += eta*(i2 - network[i][j].w2);
    }
  }
// TODO: functie van maken!!!
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
      ctx2.strokeStyle = 'rgba(0.1,0.1,0.3,0.6)';
      ctx2.beginPath();
      ctx2.moveTo(network[i][j].w1,network[i][j].w2);
      ctx2.lineTo(network[i+1][j].w1,network[i+1][j].w2);
      ctx2.stroke();
    }
    if (j<7) {
      ctx2.beginPath();
      ctx2.moveTo(network[i][j].w1,network[i][j].w2);
      ctx2.lineTo(network[i][j+1].w1,network[i][j+1].w2);
      ctx2.stroke();
    }
  }
}
  
}
/*
    n = Math.sqrt(this.w1*this.w1 + this.w2*this.w2);
    this.w1 /= n;
    this.w2 /= n;
*/
