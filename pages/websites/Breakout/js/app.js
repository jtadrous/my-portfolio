//Julie Tadrous
//N220
//4.29.19

//ball
let xPos = 40;
let yPos = 300;
let xVel = 5;
let yVel = 5;
let ball = 0;
//end ball

//paddle
let rectX = 0;
let rectSpeed = 0;
let paddle = 0;
//end paddle

//blocks
let grid = [];
let colors = ["red", "orange", "green", "yellow"];
let x = 0;
let y = 30;
let num = 0;
let shade = 0;
let score = 0;
let frame = 0;
//end blocks

function setup(){
    createCanvas(500,600);
    noStroke();
    createBlocks();
}

function draw(){
    background(0);

    //displays the grid of blocks on the screen
    for (let i = 0; i < grid.length; i++){
        grid[i].update();
    }

    //start ball bounce
    if (xPos >= 500 || xPos <= 0){
        xVel *= (-1);
    }

    if (yPos <= 0){
        yVel *= (-1);
    }

    xPos += xVel;
    yPos += yVel;

    ball = new Circle();
    ball.update();
    //end ball bounce

    //start paddle
    rectSpeed = 0;

    //allows the paddle to move left and right using the keyboard
    if (rectX + 50 >= 500){
        if(keyIsDown(LEFT_ARROW)) {
		    rectSpeed = -5;
        }
        if(keyIsDown(RIGHT_ARROW)) {
		    rectSpeed = 0;
        }
    } else {
        if(keyIsDown(LEFT_ARROW)) {
		    rectSpeed = -5;
        }
        if(keyIsDown(RIGHT_ARROW)) {
		    rectSpeed = 5;
        }
    }

    if (rectX <= 0){
        if(keyIsDown(LEFT_ARROW)) {
		    rectSpeed = 0;
        }
        if(keyIsDown(RIGHT_ARROW)) {
		    rectSpeed = 5;
        }
    } 
    
    rectX += rectSpeed;
    paddle = new Paddle();
    paddle.update();

    //checks the hit test for the paddle and the ball
    let check1 = hitTest(xPos, yPos, 10, rectX, 550, 50, 20);
    if (check1 == true){
        yVel *= (-1);
    }
    //end paddle

    //checks the hit test for the blocks and the ball
    for (let i = 0; i < grid.length; i++){
        let check2 = hitTest(xPos, yPos, 10, grid[i].x, grid[i].y, 50, 20);
        if (check2 == true){
            grid.splice(i, 1);
            yVel *= (-1);
            score++;
        }
    }
    
    //resets the blocks to continue play after all of the blocks have been removed
    if (grid.length <= 0){
        frame++;
        xVel = 0;
        yVel = 0;
        fill(255);
        textSize(20);
        text("You Won!", 400, 22);

        if(frame == 300){
            createBlocks();
            xPos = 40;
            yPos = 300;
            xVel = 5;
            yVel = 5;
            frame = 0;
            score = 0;
        }
        
    }

    //resets the blocks to continue play if the ball falls off the grid
    if (yPos >= 600){
        frame++;
        xVel = 0;
        yVel = 0;
        fill(255);
        textSize(20);
        text("You Lost!", 400, 22);

        if(frame == 300){
            createBlocks();
            xPos = 40;
            yPos = 300;
            xVel = 5;
            yVel = 5;
            frame = 0;
            score = 0;
        }
    }

    //displays the score text
    fill(255);
    textSize(15);
    text("Score: " + score, 10, 20);
}

function Paddle(){
    this.width = 70;
    this.height = 20;
    this.fill = "#4286f4";
    this.x = rectX;
    this.y = 550;

    this.update = function(){
        fill(this.fill);
        rect(this.x, this.y, this.width, this.height);
    }
}

function Rect(){
    this.width = 52;
    this.height = 20;
    this.fill = shade;
    this.x = x;
    this.y = y;

    this.update = function(){
        fill(this.fill);
        rect(this.x, this.y, this.width, this.height);
    }
}

function Circle(){
    this.radius = 10;
    this.fill = 255;
    this.x = xPos;
    this.y = yPos;

    this.update = function(){
        fill(this.fill);
        circle(this.x, this.y, this.radius);
    }
}

function createBlocks(){
    for (let i = 0; i < colors.length; i++){
        for (let i = 0; i < 8; i++){
            shade = colors[num];
            let block = new Rect();
            grid.push(block);
            x = x + 64;
        }
        num++;
        y = y + 30;
        x = 0;
    }
    num = 0;
    x = 0;
    y = 30;
}

function hitTest(pointX, pointY, radius, rectX, rectY, rectW, rectH) {
	if(pointX + radius > rectX && pointX - radius < rectX+rectW) {
		if(pointY + radius > rectY && pointY - radius < rectY+rectH) {
			return true;
		}
	}
	return false;
}