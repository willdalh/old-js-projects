var colors = [0x0035c4, 0xcb0707, 0xd8a704];

var tileMaterial = new THREE.MeshPhongMaterial({color: colors[Math.floor(Math.random()*colors.length)], side: THREE.DoubleSide});

var playerMaterial = new THREE.MeshPhongMaterial({color: 0x005c00, shading: THREE.FlatShading});



function Player(x, y, z){
    this.vel = new THREE.Vector3(0, 0.3, 0);
    this.acc = new THREE.Vector3(0, 0, 0);
    var geometry = new THREE.CylinderGeometry(0.9, 0.9, 1.5, 8);
    
    this.mesh = new THREE.Mesh(geometry, playerMaterial);
    this.mesh.frustumCulled = true;
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    this.falling = false;
    
    this.mesh.rotation.x += Math.PI/2
    
    this.addToScene = function(){
        scene.add(this.mesh);
    }
    this.update = function(){
        this.vel.add(this.acc);
        this.mesh.position.add(this.vel);
        this.acc.multiply(new THREE.Vector3(0, 0, 0));
        
        this.vel.x /= 1.05;
        
        
    }
    
    this.applyForce = function(force){
        this.acc.add(force);
        
    }
    
    this.bounce = function(){
        if (this.mesh.position.z <= -9.25){
            this.mesh.position.z = -9.25;
            this.vel.z = 0;
        
        }
    }
    
    this.intersects = function(mesh){
        if (this.mesh.position.x > mesh.position.x-w/2-0.2 && this.mesh.position.x < mesh.position.x + w/2+0.2 && this.mesh.position.y > mesh.position.y - w/2-0.2 && this.mesh.position.y < mesh.position.y + w/2+0.2 && this.mesh.position.z > mesh.position.z-0.2){
            return true;
        }
        else{
            return false;
        }
    }
}





function Tile(x, y, z){
    this.filled = true;

    

    this.w = 5;

    var geometry = new THREE.PlaneGeometry(5, 5, 2, 2);

    this.mesh = new THREE.Mesh(geometry, tileMaterial);



    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;

    
    this.update = function(){
        
        if (random() < 0.17){
            this.filled = false;
        }
        else{
            this.filled = true;
        }
        

        if (this.filled){
            this.mesh.visible = true;
        }
        else{
            this.mesh.visible = false;
        }
    }

    
    this.addToScene = function(){
        scene.add(this.mesh);
        this.mesh.geometry.normalsNeedUpdate = true;
        this.mesh.geometry.computeFaceNormals();
    }



}