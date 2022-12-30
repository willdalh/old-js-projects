var colors = ["#df374a", "#80b540", "#009d8d", "#eeb904", "#c0c026", "#e10074", "#eb245f", "#1674bc"];
function Ball(x){

    this.pos = createVector(x, height-10);
    this.vel = createVector(0, 0);
    this.radius = 6;



    this.update = function (){
        this.pos.add(this.vel);

    }

    this.show = function(){
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.radius*2, this.radius*2);
        pop();
    }
    
    this.hitFloor = false;

    this.bounce = function (){
        if ((this.pos.x > (width - this.radius))){


            this.vel.x *= -1;
            this.pos.x = (width-this.radius);


        }


        if ((this.pos.x < this.radius)){


            this.vel.x *= -1;
            this.pos.x = this.radius;
        }

        if (this.pos.y > (height)){
            this.hitFloor = true;
        }

        if (this.pos.y < this.radius){
            this.vel.y *= -1;
            this.pos.y = this.radius;
        }

    } 

    this.shoot = function(vector){
        this.vel.x = vector.x;
        this.vel.y = vector.y;
    }
    
    this.collide = function (tall){
        if (tall.indexOf(1) != -1){


            this.vel.x *= -1;
            


        }


        if (tall.indexOf(2) != -1){


            this.vel.x *= -1;
            
        }

        if (tall.indexOf(3) != -1){
            this.vel.y *= -1;
        }

        if (tall.indexOf(4) != -1){
            this.vel.y *= -1;
            
        }

     
        
        
//        var angle = p5.Vector.angleBetween(normalvector, this.vel);
//        this.vel.rotate(TWO_PI - 2*angle);
    }
}



function Obstacle(x, y, hits){
    this.pos = createVector(x, y);
    this.hits = hits;
    this.w = 62;
    
    
    this.color = random(colors);
    
    this.destroyed = function(){
        if (this.hits == 0){
            return true;
        }
    } 
    
    this.show = function (){
        push();
        
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        
        fill(this.color);
        rect(0, 0, this.w, this.w);
        fill(51);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(20);
        text(this.hits, 0, 0);
        
        pop();
    }
}