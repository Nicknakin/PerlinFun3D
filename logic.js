/*jshint esversion: 6 */

let offSet;
let offSetStart;
let increment;
let dims;
let time = 0;
let balls;
let numBalls = 200;
let maxSpeed = 4;
let radius = 400;
var backgroundImage;

function setup(){
    var canvas = createCanvas(windowWidth*0.95, windowHeight*0.95, WEBGL);
    offSet = createVector(0,0,0);
    offSetStart = createVector(100,100,100);
    increment = createVector(0.001, 0.001, 0.001);
    dims = createVector(1,1,1);

    balls = new Array(numBalls).fill().map(() =>  randomBall());

    noiseDetail(4);
    background(0);
}

function draw(){
    orbitControl();  
    background(0);
    pointLight(255,255,255,0,0,0);
    stroke(64,64,64,16);
    noFill();
    ellipsoid(radius, radius, radius);
    balls.forEach((ball) => {
        const noiseSeed = createVector(ball.pos.x/dims.x*increment.x+offSetStart.x, ball.pos.y/dims.y*increment.y+offSetStart.y, ball.pos.z/dims.z*increment.z+offSetStart.z);
        const noiseAngleRaw = noise(noiseSeed.x, noiseSeed.y, noiseSeed.z);
        const noiseAngle2Raw = noise(noiseSeed.x*PI+100000, noiseSeed.y*PI + 1000000, noiseSeed.z*PI + 10000000);
        const noiseAngle = map(noiseAngleRaw, 0, 1, -8*PI, 8*PI);
        const noiseAngle2 = map(noiseAngle2Raw, 0, 1, -8*PI, 8*PI);
        const noiseVector = p5.Vector.fromAngles(noiseAngle, noiseAngle2);
        ball.v = noiseVector.mult(maxSpeed);
        ball.move();
        ball.draw();
        if(ball.pos.mag() >= radius){
            ball.pos = p5.Vector.fromAngles(random(2*PI), random(2*PI)).mult(random(radius));
            ball.v = ball.v.mult(0);
        }
    });
}