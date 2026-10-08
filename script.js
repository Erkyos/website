let time = performance.now();

class Mass {
    constructor(x, y, radius, speed, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.mass = mass;

    }
    update(dt) {
        this.x += this.speed[0]*dt;
        this.y += this.speed[1]*dt;
        
        // Borders Managment 
        if (canvas.width - this.x <= canvas.width*0.1) {
            this.speed = [this.speed[0] - (3000000* (1/(canvas.width - this.x)**2))*dt, this.speed[1]]
        }
        if (this.x <= canvas.width*0.1) {
            this.speed = [this.speed[0] + (3000000* (1/(this.x)**2))*dt, this.speed[1]]
        }
        if (canvas.height - this.y <= canvas.height*0.1) {
            this.speed = [this.speed[0], this.speed[1] - (3000000* (1/(canvas.height - this.y)**2))*dt]
        }
        if (this.y <= canvas.height*0.1) {
            this.speed = [this.speed[0], this.speed[1] + (3000000* (1/(this.y)**2))*dt]
        }
        if (this.x >= canvas.width || this.x <= 0)  {
            this.speed[0]*= -1
        } 
        if (this.y >= canvas.height || this.y <= 0)  {
            this.speed[1]*= -1
        } 
        // ---------------
    }

    interaction(other){
        const dist = ((this.x - other.x)**2 + (this.y - other.y)**2)**(1/2)
        const dir_angle = Math.atan2((other.x - this.x),(other.y - this.y))
        
        if (dist <= 0.4*(canvas.width**2 + canvas.height**2)*(1/2) && dist >= 20){
            this.speed = [
                this.speed[0] + other.mass*(8000*Math.sin(dir_angle)/(dist**2))/this.mass,
                this.speed[1] + other.mass*(8000*Math.cos(dir_angle)/(dist**2))/this.mass
            ]
        }

    }

    draw(ctx) {
        draw_circle(ctx, this.x,this.y,this.radius,"#ffffff",3)
        
    }
}

class BlackHole {
    constructor(x, y, mass) {
        this.x = x;
        this.y = y;
        this.mass = mass;

    }
    update(dt) {}

    interaction(other){}

    draw(ctx) {   
    }
}



function draw_circle(ctx,x,y,radius,color, width) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
        x,
        y,
        radius,
        0,
        2*Math.PI
        );
    if (width != 0){
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.stroke();
    } else {
        ctx.fill();
    }

}


function update() {
    const now = performance.now();
    const dt = (now - time)/1000;

    time = now;


    for (mass of masses){
        mass.update(dt)
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1e1e21";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    draw_circle(ctx,canvas.width/2,canvas.height/2,25,"#000000",3)
    draw_circle(ctx,canvas.width/2,canvas.height/2,18,"#000000",0)
    for (mass of masses){
        for (mass2 of masses){
            if (mass2 != mass){
                mass.interaction(mass2)
            }
        }

    }
    for (mass of masses){
        mass.draw(ctx)
    }
    requestAnimationFrame(update);



}

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}
//const bouton = document.getElementById("test_but");
//bouton.addEventListener("click", test);
const canvas = document.getElementById("simu");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const test_circle = new Mass(200,200,canvas.width/100,[100,100],1)
const test_circle2 = new Mass(600,200,canvas.width/100,[120,-90],1)
const test_circle3 = new Mass(600,500,canvas.width/100,[100,-100],1)
const sun = new BlackHole(canvas.width/2,canvas.height/2,7)

let masses = [test_circle,test_circle2,test_circle3, sun]

const blackholeImg = new Image();
blackholeImg.src = "assets/blackhole.png";

window.addEventListener('resize', resize);
update();





function test() {
    alert("Test Sucessfull !");
}



