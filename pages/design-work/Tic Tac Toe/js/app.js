//Created a variable to act as a counter
let counter = 0;

//Retrieved all of the text boxes in the svg tag by id
let winRect = document.getElementById("winRect");
let winText = document.getElementById("winText");
let scoreText = document.getElementById("scoreText");

//Created a Space class to represent each box on the game board
class Space {
    constructor(id, element, fill, fillType) {
      this.id = id; //the html id of the svg rect tag
      this.element = element; //result of document.getElementById
      this.fill = fill; //boolean of whether the space has been filled or not
      this.fillType = fillType; //either X or O or none
    }

    //This method changes the space image to either X or O and calls the win method
    fillSpace(box, type) {
        if(counter > 8) {
            //Checks to make sure that the counter is less than 8, if not it calls the win method and returns
            myBoard.win();
            return;
        } else if (type == "O") {
            //Checks to see if the player type is "O", if so it changes the rectangle that was clicked
            //to the O image
            box.setAttribute("xlink:href", "oPlayer.png"); 
        } else if (type == "X") {
            //Changes the rectangle that was clicked to the X image
            box.setAttribute("xlink:href", "xPlayer.png");  
        }
        this.fill = true;
        myBoard.win();

        //Adds one to the counter variable
        counter++;
    }
}

//Created a Board class to represent the whole game board
class Board {
    constructor(size, grid) {
      this.size = size;
      this.grid = grid;
    }

    //This method uses a mixture of if statements and operations to contantly check if there are three in a row
    win() {
        //large if statement to check win conditions
        if ((this.grid[0].fillType == "O" && this.grid[1].fillType == "O" && this.grid[2].fillType == "O") ||
            (this.grid[3].fillType == "O" && this.grid[4].fillType == "O" && this.grid[5].fillType == "O") ||
            (this.grid[6].fillType == "O" && this.grid[7].fillType == "O" && this.grid[8].fillType == "O") ||
            (this.grid[0].fillType == "O" && this.grid[4].fillType == "O" && this.grid[8].fillType == "O") ||
            (this.grid[2].fillType == "O" && this.grid[4].fillType == "O" && this.grid[6].fillType == "O") ||
            (this.grid[0].fillType == "O" && this.grid[3].fillType == "O" && this.grid[6].fillType == "O") ||
            (this.grid[1].fillType == "O" && this.grid[4].fillType == "O" && this.grid[7].fillType == "O") ||
            (this.grid[2].fillType == "O" && this.grid[5].fillType == "O" && this.grid[8].fillType == "O")) {

            //If player "O" has won, it adds one to their score, sets the counter automatially to 9, and displays the win screen    
            player2.score++;
            counter = 9;
            winText.innerHTML = "O Wins!";
            winRect.removeAttribute("display");
            TweenMax.from(winRect, {duration: 1, opacity: 0});
            scoreText.innerHTML = person1 + " (X): " + player1.score + "\n" + person2 + " (O): " + player2.score;

        } else if ((this.grid[0].fillType == "X" && this.grid[1].fillType == "X" && this.grid[2].fillType == "X") ||
                   (this.grid[3].fillType == "X" && this.grid[4].fillType == "X" && this.grid[5].fillType == "X") ||
                   (this.grid[6].fillType == "X" && this.grid[7].fillType == "X" && this.grid[8].fillType == "X") ||
                   (this.grid[0].fillType == "X" && this.grid[4].fillType == "X" && this.grid[8].fillType == "X") ||
                   (this.grid[2].fillType == "X" && this.grid[4].fillType == "X" && this.grid[6].fillType == "X") ||
                   (this.grid[0].fillType == "X" && this.grid[3].fillType == "X" && this.grid[6].fillType == "X") ||
                   (this.grid[1].fillType == "X" && this.grid[4].fillType == "X" && this.grid[7].fillType == "X") ||
                   (this.grid[2].fillType == "X" && this.grid[5].fillType == "X" && this.grid[8].fillType == "X")) {
                  
                   //If player "X" has won, it adds one to their score, sets the counter automatially to 9, and displays the win screen    
                   player1.score++;
                   counter = 9;
                   winText.innerHTML = "X Wins!";
                   winRect.removeAttribute("display");
                   TweenMax.from(winRect, {duration: 1, opacity: 0});

                   scoreText.innerHTML = person1 + " (X): " + player1.score + "\n" + person2 + " (O): " + player2.score;
        } else if (counter > 7) {

                   //If neither player has won after 9 moves, it directly displays the end screen
                   console.log("Cat Game!");
                   winText.style.fontSize = 130;
                   winText.innerHTML = "Cat Game!";
                   winRect.removeAttribute("display");
                   TweenMax.from(winRect, {duration: 1, opacity: 0});
        }
    }

    //This method resets the board by removing the "O" and "X" images and setting the counter back at 0
    resetIt() {
        //loops through the grid property of the board
        for (let i = 0; i < this.size; i++) {
            counter = 0;
            this.grid[i].element.setAttribute("xlink:href", "data:img/png;base64,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");
            
            //sets everything (like fill, fill type, and turn) to false or none
            this.grid[i].fill = false;
            this.grid[i].fillType = "none";
            player2.turn = false;
            player1.turn = true;
            winText.style.fontSize = 170;
            winRect.setAttribute("display", "none");  
        }
    }
}

//Created a Player class to represent both players in the game
class Player {
    constructor(score, name, type, turn) {
      this.score = score;
      this.name = name; //string entered in the prompt box
      this.type = type; //either X or O
      this.turn = turn; //boolean of whether it is currently their turn
    }

    //This method take in the id of a space rectangle and initiates a player's turn
    takeTurn(square) {
        let box = document.getElementById(square);
        if (box.getAttribute("xlink:href") == "oPlayer.png" || box.getAttribute("xlink:href") == "xPlayer.png") {
            //Checks to see if the element already has the X or O image, if so then it returns
            return;
        } else if (this.type == "O") {
            for (let i = 0; i < board.length; i++) {
                if (board[i].id == square) {
                    board[i].fillType = this.type;
                    board[i].fillSpace(box, this.type);
                }
            }

            //updates player's turn property
            player2.turn = false;
            player1.turn = true;
        } else {
            for (let i = 0; i < board.length; i++) {
                if (board[i].id == square) {
                    board[i].fillType = this.type;
                    board[i].fillSpace(box, this.type);
                }
            }

            //updates player's turn property
            player1.turn = false;
            player2.turn = true;
        }
    }
}

//Information
let size = 9;
let board = [];

//loops through the board array and makes a new space object for each box
for (let i = 0; i < size; i++) {
    let varName = "Rectangle_" + i;
    let el = document.getElementById(varName);
    let mySpace = new Space(varName, el, false, "none");
    board.push(mySpace);
}

//creates a new board object
let myBoard = new Board(size, board);
console.log(myBoard);

//adds an event listener to the "Play Again!" button to the resetIt() method
let reButton = document.getElementById("reset");
reButton.addEventListener('click', function () {
    myBoard.resetIt();
});

//two prompts to get the names of each player
var person1 = prompt("Player X: Please enter your name.", "Player 1");
var person2 = prompt("Player O: Please enter your name.", "Player 2");
scoreText.innerHTML = person1 + " (X): 0" + "\n" + person2 + " (O): 0";

//creates two new player objects
let player1 = new Player(0, person1, "X", true);
let player2 = new Player(0, person2, "O", false);
console.log(player1);
console.log(player2);

//a function with event as the parameter to get the space clicked and call the takeTurn() method
function move(event) {
    let square = event.target.getAttribute("id");
    if(player2.turn == true) {
        player2.takeTurn(square);
    } else {
        player1.takeTurn(square);
    }
}

//loops through the board array and adds an event listener to each box for the move() method
for (let i = 0; i < board.length; i++) {
    let space = board[i].element;
    space.addEventListener("click", move);
}