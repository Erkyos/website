let time = performance.now();

class Mass {
    constructor(x, y, radius, speed, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.mass = mass;
        this.pos_list = [];

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
        this.pos_list.push([this.x,this.y])
        console.log((this.speed[0]**2 + this.speed[1])**(1/2))
        // ---------------
        console.log(this.x,this.y)
    }

    draw(ctx) {
        draw_circle(ctx, this.x,this.y,this.radius,"#ffffff")
        
    }
}

function draw_circle(ctx,x,y,radius,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
        x,
        y,
        radius,
        0,
        2*Math.PI
        );
        ctx.fill();

}
function update() {
    const now = performance.now();
    const dt = (now - time)/1000;

    time = now;

    test_circle.update(dt);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1e1e21";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    
    test_circle.draw(ctx);
    requestAnimationFrame(update);



}


//const bouton = document.getElementById("test_but");
//bouton.addEventListener("click", test);
const canvas = document.getElementById("simu");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const test_circle = new Mass(200,200,10,[150,150],10)
update();



function test() {
    alert("Test Sucessfull !");
}


