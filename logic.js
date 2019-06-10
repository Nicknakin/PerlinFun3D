/*jshint esversion: 6 */

let offSet;
let offSetStart;
let increment;
let dims;
let time = 0;
let balls;
let numBalls = 200;
let maxSpeed = 1;

var backgroundImage;

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    offSet = createVector(0,0,0);
    offSetStart = createVector(100,100,100);
    increment = createVector(0.01, 0.01, 0.01);
    dims = createVector(1,1,1);

    balls = new Array(numBalls).fill().map(() =>  randomBall());

    noiseDetail(8);
    background(0);
}

function draw(){
    orbitControl();  
    background(0);
    balls.forEach((ball) => {
        const noiseSeed = createVector(ball.pos.x/dims.x*increment.x+offSetStart.x, ball.pos.y/dims.y*increment.y+offSetStart.y, ball.pos.z/dims.z*increment.z+offSetStart.z);
        
        const noiseAngleRaw = noise(noiseSeed.x, noiseSeed.y, noiseSeed.z);
        const noiseAngle2Raw = noise(noiseSeed.x+100000, noiseSeed.y + 1000000, noiseSeed.z + 10000000);
        const noiseAngle = map(noiseAngleRaw, 0, 1, -PI, PI);
        const noiseAngle2 = map(noiseAngle2Raw, 0, 1, -PI, PI);
        const noiseVector = p5.Vector.fromAngles(noiseAngle, noiseAngle2);
        ball.v = noiseVector.mult(maxSpeed);
        ball.move();
        ball.draw();
        if(ball.pos.mag() >= 400){
            ball.pos = p5.Vector.fromAngles(random(2*PI), random(2*PI)).mult(random(400));
            ball.v = ball.v.mult(0);
        }
    });
}