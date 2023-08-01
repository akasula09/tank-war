
class Sprite {
    constructor(scene, image, width, height, controls) {
        this.scene = scene;
        this.image = new Image();
        this.image.onload = function() {
            // code to execute after the image has loaded
        };
         
        this.image.src = image;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.moveAngle = 0;
        this.speed = 0;
        this.health = 100;

        // add event listener for keydown event
        document.addEventListener("keydown", (event) => {
            if (controls === "arrows") {
                switch (event.key) {
                    case "ArrowLeft":
                        this.x -= 10;
                        break;
                    case "ArrowRight":
                        this.x += 10;
                        break;
                    case "ArrowUp":
                        this.y -= 10;
                        break;
                    case "ArrowDown":
                        this.y += 10;
                        break;
                }
            } else if (controls === "wasd") {
                switch (event.key) {
                    case "a":
                        this.x -= 10;
                        break;
                    case "d":
                        this.x += 10;
                        break;
                    case "w":
                        this.y -= 10;
                        break;
                    case "s":
                        this.y += 10;
                        break;
                }
            }
        });
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 20, this.width, 10);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 20, this.width * (this.health / 100), 10);
    }

    setMoveAngle(degrees) {
        this.moveAngle = degrees * Math.PI / 180;
    }

    setSpeed(pixelsPerFrame) {
        this.speed = pixelsPerFrame;
    }

    update() {
        this.x += Math.cos(this.moveAngle) * this.speed;
        this.y += Math.sin(this.moveAngle) * this.speed;
        this.scene.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collidesWith(missile) {
        return missile.x >= this.x && missile.x <= this.x + this.width && missile.y >= this.y && missile.y <= this.y + this.height;
    }
}
class Scene {
    constructor(updateFunction) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.updateFunction = updateFunction;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    start() {
        setInterval(this.updateFunction, 20);
    }
}
