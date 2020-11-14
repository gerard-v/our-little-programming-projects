class Neuron {
  constructor() {
    var n; // Length of weight vector
    this.w1 = 255*Math.random();
    this.w2 = 255*Math.random();
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

canvas = document.getElementById("neurons");
ctx = canvas.getContext('2d');
ctx.fillStyle = "lavender";
ctx.fillRect(0,0,canvas.width,canvas.height);

for (i=0;i<8;i++) {
  for (j=0;j<8;j++) {
    ctx.beginPath();
    ctx.arc(2*network[i][j].w1,2*network[i][j].w2,5,0,2*Math.PI,true);
    ctx.stroke(); 
  }
}
/*
    n = Math.sqrt(this.w1*this.w1 + this.w2*this.w2);
    this.w1 /= n;
    this.w2 /= n;
*/
