class Ball{
    constructor(x, y, z, c){
        this.pos = createVector(x,y,z);
        this.c = c;
        this.a = createVector(0,0);
        this.v = createVector(0,0);
        this.antiBall = random(1) > 0.5;
        if(this.antiBall){
            this.c = createVector(255,128,0);
        } else{
            this.c = createVector(0,128,255);
        }
    }

    draw(){
        fill(this.c.x, this.c.y, this.c.z);
        stroke(this.c.x, this.c.y, this.c.z);
        strokeWeight(4);
        point(this.pos.x, this.pos.y, this.pos.z);
        //line(this.pos.x, this.pos.y, this.v.x+this.pos.x, this.v.y+this.pos.y);
        strokeWeight(1);
    }

    move(){        
        this.v.add(this.a);
        this.v.add(p5.Vector.mag(this.pos.x-width/2, this.pos.y-height/2));
        if(this.antiBall){
            this.pos.sub(this.v);
        } else{
            this.pos.add(this.v);
        }
    }
}

function randomBall(){
    const tempVec = p5.Vector.fromAngles(random(2*PI), random(2*PI)).mult(random(radius));
    return new Ball(tempVec.x, tempVec.y, tempVec.z, randomColor());
}

function randomColor(){
    return {r:random(255), g:random(255), b:random(255)};
}
