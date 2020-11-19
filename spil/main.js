

let canvas = document.querySelector("#canvas"); 
let ctx = canvas.getContext('2d'); 





let bigman = new Image(); 
bigman.src= 'images/bigman.png'; 

let meat = new Image(); 
meat.src= 'images/meat.png'; 

let BBQ = new Image(); 
BBQ.src= 'images/bbq.png'; 

let dirtwall = new Image(); 
dirtwall.src= 'images/dirt.jpg'; 

let grass = new Image(); 
grass.src= 'images/grass.png'; 

maze = 

[
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,4,0,1,1,1,3,0],
    [0,1,0,0,0,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,0,1,0,0,0,1,1,0],
    [0,1,0,1,0,4,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,1,0,0],
    [0,1,1,4,0,2,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
]

let tileSize = 50; 

let playerPosition = {x:9, y:9};

// tiles 

let dirtwalls = 0; 
let graes = 1;
let storfyr = 2;
let grill = 3;
let koed = 4; 


ctx.drawImage(bigman,9*tileSize,9*tileSize,tileSize,tileSize);

function drawMaze(){

    for(let y= 0; y < maze.length; y++){

      for(let x = 0; x < maze[y].length; x++){

        if(maze[y][x] === dirtwalls){
            ctx.drawImage(dirtwall,x*tileSize,y*tileSize,tileSize,tileSize);

        }else if(maze[y][x] === graes){
            ctx.drawImage(grass,x*tileSize,y*tileSize,tileSize,tileSize);

        }else if(maze[y][x] === storfyr){
            playerPosition.x = x; 
            playerPosition.y = y; 
            ctx.drawImage(bigman,x*tileSize,y*tileSize,tileSize,tileSize);

        }else if(maze[y][x] === grill){
           ctx.drawImage(BBQ,x*tileSize,y*tileSize,tileSize,tileSize);

        }else if(maze[y][x] === koed){
            ctx.drawImage(meat,x*tileSize,y*tileSize,tileSize,tileSize);
        }

        

      }
    }

}



canvas.style.display="none"; 

//Timer
let seconds = 10;
document.querySelector('#time-display').innerText = seconds;
let time;

let mazeName = document.querySelector('#mazename');

//Starter spillet
startgame.addEventListener('click', playgame);
function playgame(){
    //viser spillet
    canvas.style.display = "block";

    //Fjerner knappen
    startgame.style.display ="none";


    //Starter timeren
    time = setInterval(function () {
        seconds -= 1;
        document.querySelector('#time-display').innerText = seconds;
        
        //Time up - dÃ¸d
        if(seconds == 0){
            gameover();
        };
    
    }, 1000);
};



//GAME OVER!
function gameover(){
    canvas.style.display = "none";
    mazeName.innerHTML="Game Over";

    //gameover teksten vises ikke
    let gameover = document.querySelector('#gameover');

    if(seconds == 0 ){
        gameover.innerHTML = "<span>You ran out of time.</span>";
        hahaha();
    }; 

    clearInterval(time);    
};






function walk(){

    let gameSound = new Audio('gamesounds/walking2.wav');
    gameSound.play();

}

function collect(){
    let audio = new Audio('gamesounds/walk.wav');
    audio.play();
}

function vinder(){
    canvas.style.display = "none";
    sejrtext.innerHTML="Tillykke, du har vundet spillet!";
     
    let vinder = document.querySelector('#sejrtext');

    container.style.display = "none";
 }


function grillsound(){
    let audio = new Audio('gamesounds/grillsound.wav');
    audio.play();
}



function hahaha(){
    let audio = new Audio('gamesounds/hahaha.wav');
    audio.play();
}



function walkable(targetTile) {
    if (targetTile === koed || targetTile === graes || targetTile === grill) {
        return true;
    } else {
        return false;
    }
}




let score = 0; 




window.addEventListener('keydown', (e) => {
    let targetTile;
    switch (e.keyCode) {
        case 37: //left
            targetTile = maze[playerPosition.y][playerPosition.x - 1];
            if (walkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x - 1] = storfyr; //players nye position
                maze[playerPosition.y][playerPosition.x] = graes;
                drawMaze();
                walk();
                if (targetTile === koed) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "Meat: " + score;
                }
            }
            break;
        case 39: //Right
            targetTile = maze[playerPosition.y][playerPosition.x + 1];
            if (walkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x + 1] = storfyr; //players nye position
                maze[playerPosition.y][playerPosition.x] = graes;
                drawMaze();

                walk();
                if (targetTile === koed) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "Meat: " + score;
                }
                else if (targetTile === grill && score >=3){
                    vinder();
                    grillsound(); 
                }
            }
            break;
        case 38: //Up
            targetTile = maze[playerPosition.y - 1][playerPosition.x];
            if (walkable(targetTile)) {
                maze[playerPosition.y - 1][playerPosition.x] = storfyr; //players nye position
                maze[playerPosition.y][playerPosition.x] = graes;
                drawMaze();
                walk();
                if (targetTile === koed) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "Meat: " + score;
                }
            }
            break;
        case 40: //down
            targetTile = maze[playerPosition.y + 1][playerPosition.x];
            if (walkable(targetTile)) {
                maze[playerPosition.y + 1][playerPosition.x] = storfyr; //players nye position
                maze[playerPosition.y][playerPosition.x] = graes;
                drawMaze();
                walk();
                if (targetTile === koed) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "Meat: " + score;
                }
            }
            break;
    }

    //left 37

    // up 38

    //right 39

    //down 40

    console.log(score);
})


window.addEventListener("load", drawMaze);







