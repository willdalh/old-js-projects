            function Satellitt(x, y, radius, stationary, mass, affectRadius, velx, vely){
                
                this.pos = createVector(x, y);
                this.vel = createVector(velx, vely);
                this.acc = createVector(0, 0);
                
                this.affectRadius = affectRadius;
                this.radius = radius;
                this.gravity = mass;
                
                
                
                this.stationary = stationary;
                
                this.trailHistory = [];
                
                this.color = 255 - parseInt(map(this.gravity, 0, 20, 0, 255));
                
                this.applyForce = function (gravity){
                    this.acc.add(gravity);
                }
                this.update = function (){
                    if (stationary){
                        this.acc.mult(0);
                    }
                    else{
                    this.acc = createVector(this.acc.x/this.gravity, this.acc.y/this.gravity);
                    this.vel.add(this.acc);
                    
                    this.pos.add(this.vel);
                    this.acc.mult(0);
                    }
                }
                
                this.split = function(velx, vely){
                    var antallNye = Math.floor(random(2, 4));
                    
                    for (var i = 0; i < antallNye; i++){
                        satellitter.push(new Satellitt(this.pos.x, this.pos.y, this.radius*1/Math.sqrt(antallNye), false, this.gravity/antallNye, this.affectRadius/antallNye, velx/antallNye, vely/antallNye));
                    }
                    
                    
                   
                }
                
                
                this.collide = function (){
                    this.vel.x *= -0.5;
                    this.vel.y *= -0.5;
                }
                
                this.bounce = function (){
                    if ((this.pos.x > (width - this.radius))){
                        
                        
                        this.vel.x *= -0.5;
                        this.pos.x = (width-this.radius);
                        
                        
                    }
                    
                    
                    if ((this.pos.x < this.radius)){
                        
                        
                        this.vel.x *= -0.5;
                        this.pos.x = this.radius;
                    }
                    
                    if (this.pos.y > (height - this.radius)){
                        this.vel.y *= -0.5;
                        this.pos.y = height-this.radius;
                    }
                    
                    if (this.pos.y < this.radius){
                        this.vel.y *= -0.5;
                        this.pos.y = this.radius;
                    }
                    
                } 
                this.trail = function(){
                    if (this.trailHistory.length > 7){
                        this.trailHistory.shift();
                    }
                    this.trailHistory.push({x: this.pos.x, y: this.pos.y});
                    
                    for (var i = 0; i < this.trailHistory.length; i++){
                        var alpha = map(i, 0, this.trailHistory.length, 0, 1);
                        fill('rgba(0, 0, ' + this.color + ', '+ alpha+')');
                        ellipse(this.trailHistory[i].x, this.trailHistory[i].y, this.radius*(2*i/this.trailHistory.length), this.radius*(2*i/this.trailHistory.length));
                    }
                }
                this.show = function (){
                    if (this.stationary){
                        fill('rgb('+ this.color+ ', 0, 0)');
                        
                    }
                    else{
                        
                        
                        fill('rgb(0, 0, ' + this.color +')');
                    }
                    ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
                }
                
                
            }


    
           