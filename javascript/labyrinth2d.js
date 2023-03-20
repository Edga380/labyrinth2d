const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 960;
const CANVAS_HEIGHT = canvas.height = 640;
//Coordinates 0,0 start in the middle of canvas
ctx.translate(CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
//player object
var player = {x: -280, y: 0, size: 10, speed: 1, color: "#27204d"};
//Line object
var line_object = {sx: 0, ex: 0, sy: 0, ey: 0, axis: "none"};
//Map01
var door_to_next_stage = [[10, 10], [-190, -190], [10, -30], [10, 10], [210, -30], [130, 130], [170, -230],
                          [-70, -110], [170, -150], [-230, 10]];
//player position in different stages
var player_positions = [[-270, 10], [270, 220], [-220, -270], [-20, 270], [-270, -20], [-270, -220], [270, 180],
                        [-270, 220], [-270, -140], [-270, 140]]
//
var maps = [
/*Map01*/[[-240, -240, -240, -20, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-240, -240, 20, 240, "v"],[-240, -200, -20, -20, "h"],
[-200, -200, -200, -20, "v"],[-200, 200, -200, -200, "h"],[200, 200, -200, 200, "v"],
[-200, 200, 200, 200, "h"],[-200, -200, 20, 200, "v"],[-200, -160, -80, -80, "h"],
[-160, -160, -160, 160, "v"],[-120, 160, -160, -160, "h"],[160, 160, -160, 160, "v"],
[-160, 160, 160, 160, "h"],[-160, 60, -120, -120, "h"],[100, 120, -120, -120, "h"],
[-120, -80, -80, -80, "h"],[-40, 120, -80, -80, "h"],[120, 120, -120, 120, "v"],
[-120, -120, -80, 120, "v"],[-120, 120, 120, 120, "h"],[-80, -80, -40, 80, "v"],
[-80, 80, -40, -40, "h"],[80, 80, -40, 80, "v"],[-80, -20, 80, 80, "h"],
[20, 80, 80, 80, "h"],[-40, -40, 0, 40, "v"],[0, 40, 0, 0, "h"],
[40, 40, 0, 40, "v"],[-40, 40, 40, 40, "h"]],
/*Map02*/
[[-240, -240, -240, 240, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 200, 0, "v"],
[-240, 240, 240, 240, "h"],[-200, 240, 200, 200, "h"],[200, 200, -240, 160, "v"],
[-200, 200, 160, 160, "h"],[-200, 200, -200, -200, "h"],[-200, -200, -200, 120, "v"],
[-160, 160, 120, 120, "h"],[-160, -160, -120, 120, "v"],[-160, 160, -120, -120, "h"],
[-200, 160, -160, -160, "h"],[160, 160, -160, -80, "v"],[-120, 120, -80, -80, "h"],
[120, 120, -80, -40, "v"],[-80, 200, -40, -40, "h"],[-160, 120, 0, 0, "h"],
[-80, 200, 40, 40, "h"],[-120, -120, -80, -40, "v"],[-120, -120, 40, 120, "v"],
[-80, -80, 40, 80, "v"],[-40, -40, 80, 120, "v"],[0, 0, 40, 80, "v"],
[40, 40, 80, 120, "v"],[40, 160, 80, 80, "h"]],
/*Map03*/
[[-240, -240, -240, 240, "v"],[-200, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-200, -200, -200, 200, "v"],[-200, 200, -200, -200, "h"],
[200, 200, -240, -200, "v"],[200, 200, -160, 200, "v"],[-200, 200, 200, 200, "h"],
[-200, 160, 160, 160, "h"],[-160, -160, -160, 120, "v"],[-160, 160, -160, -160, "h"],
[160, 160, -160, 120, "v"],[-120, 120, -120, -120, "h"],[-80, 160, 120, 120, "h"],
[-120, -120, -120, 160, "v"],[-120, 120, 80, 80, "h"],[120, 120, -40, 80, "v"],
[-80, 160, -80, -80, "h"],[-80, -80, -80, 40, "v"],[-40, 120, -40, -40, "h"],
[-80, 80, 40, 40, "h"],[-40, -40, -40, 0, "v"],[40, 40, -40, 0, "v"],
[0, 0, -40, 40, "v"],[80, 80, 0, 40, "v"]],
/*Map04*/
[[-240, -240, -240, 240, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[0, 240, 240, 240, "h"],[-240, -40, 240, 240, "h"],[-40, -40, 40, 240, "v"],
[0, 0, 80, 240, "v"],[-40, 40, 40, 40, "h"],[40, 40, -200, 40, "v"],
[40, 200, -200, -200, "h"],[0, 80, 80, 80, "h"],[80, 80, -160, 80, "v"],
[80, 160, -160, -160, "h"],[160, 160, -160, 160, "v"],[200, 200, -200, 200, "v"],
[120, 200, 200, 200, "h"],[120, 120, -120, 200, "v"],[40, 120, 120, 120, "h"],
[0, 80, 160, 160, "h"],[40, 120, 200, 200, "h"],[0, 0, -240, -40, "v"],
[-200, -40, -40, -40, "h"],[-40, 40, 0, 0, "h"],[-40, -40, -40, 0, "v"],
[-160, 0, -80, -80, "h"],[-200, -200, -120, -40, "v"],[-200, -40, -120, -120, "h"],
[-40, -40, -200, -120, "v"],[-160, -40, -200, -200, "h"],[-200, -200, -240, -160, "v"],
[-200, -80, -160, -160, "h"],[-240, -120, 0, 0, "h"],[-120, -120, 0, 160, "v"],
[-80, -80, -40, 200, "v"],[-200, -80, 200, 200, "h"],[-200, -200, 40, 200, "v"],
[-160, -120, 160, 160, "h"],[-200, -160, 120, 120, "h"],[-160, -120, 80, 80, "h"],
[-200, -160, 40, 40, "h"]],
/*Map05*/
[[-240, -240, -240, -40, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-240, -240, 0, 240, "v"],[-240, 80, 0, 0, "h"],
[-240, 80, -40, -40, "h"],[120, 120, -200, 200, "v"],[80, 80, 0, 160, "v"],
[-200, 120, 200, 200, "h"],[40, 40, 160, 200, "v"],[-160, 40, 160, 160, "h"],
[40, 40, 40, 120, "v"],[-200, 40, 120, 120, "h"],[-240, -200, 160, 160, "h"],
[0, 0, 0, 80, "v"],[-160, 0, 80, 80, "h"],[-200, -200, 40, 120, "v"],
[-200, -40, 40, 40, "h"],[-120, 120, -80, -80, "h"],[-120, -120, -160, -80, "v"],
[-160, -160, -120, -40, "v"],[-200, -120, -160, -160, "h"],[-200, -200, -160, -80, "v"],
[-240, -80, -200, -200, "h"],[-80, -80, -200, -120, "v"],[-40, 80, -120, -120, "h"],
[-40, -40, -200, -120, "v"],[80, 80, -200, -120, "v"],[-40, 80, -200, -200, "h"],
[160, 240, 0, 0, "h"],[120, 200, 40, 40, "h"],[160, 240, 80, 80, "h"],
[160, 160, 80, 160, "v"],[200, 200, 120, 200, "v"],[120, 200, 200, 200, "h"],
[120, 200, -40, -40, "h"],[200, 200, -160, -40, "v"],[160, 160, -200, -80, "v"],
[160, 240, -200, -200, "h"],[80, 120, -160, -160, "h"],[-80, -80, 120, 160, "v"],
[0, 0, -240, -200, "v"]],
/*Map06*/
[[-240, -240, -200, 240, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-240, 160, -200, -200, "h"],[160, 160, -200, -120, "v"],
[120, 160, -120, -120, "h"],[120, 120, -160, -120, "v"],[-240, 80, -160, -160, "h"],
[80, 80, -160, -80, "v"],[80, 160, -80, -80, "h"],[200, 200, -200, 0, "v"],
[40, 200, -40, -40, "h"],[80, 200, 0, 0, "h"],[40, 40, -120, -40, "v"],
[-80, 40, -120, -120, "h"],[-80, -80, -120, 40, "v"],[-120, -120, -120, 80, "v"],
[-120, -40, 80, 80, "h"],[-40, -40, 0, 80, "v"],[-40, -40, -40, -80, "v"],
[-80, -40, -40, -40, "h"],[-40, 0, -80, -80, "h"],[0, 0, -80, 120, "v"],
[-80, 0, 120, 120, "h"],[-80, -80, 120, 160, "v"],[-80, 40, 160, 160, "h"],
[0, 0, 160, 200, "v"],[0, 80, 200, 200, "h"],[-40, -40, 200, 240, "v"],
[-120, -40, 200, 200, "h"],[-200, -120, 160, 160, "h"],[-200, -200, 160, 200, "v"],
[-160, -160, 200, 240, "v"],[-120, -120, 120, 160, "v"],[-200, -120, 120, 120, "h"],
[-160, -160, -40, 120, "v"],[-200, -200, -120, 80, "v"],[-160, -160, -160, -80, "v"],
[40, 40, 0, 160, "v"],[80, 80, 80, 200, "v"],[40, 200, 40, 40, "h"],
[80, 240, 80, 80, "h"],[120, 200, 200, 200, "h"],[120, 120, 120, 200, "v"],
[200, 200, 120, 200, "v"],[80, 160, 120, 120, "h"],[160, 160, 120, 160, "v"]],
/*Map07*/
[[-240, -240, -240, 240, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 160, "v"],
[-240, 240, 240, 240, "h"],[240, 240, 200, 240, "v"],[200, 240, 160, 160, "h"],
[200, 200, 160, 200, "v"],[120, 200, 200, 200, "h"],[80, 80, 160, 240, "v"],
[80, 160, 160, 160, "h"],[-40, 200, 120, 120, "h"],[40, 40, 160, 200, "v"],
[-80, 40, 160, 160, "h"],[-200, 0, 200, 200, "h"],[-200, -120, 160, 160, "h"],
[-120, -120, 0, 200, "v"],[-120, -80, 120, 120, "h"],[-200, -200, 40, 120, "v"],
[-160, -160, -40, 120, "v"],[-200, -160, 0, 0, "h"],[-200, -200, -200, -40, "v"],
[-80, -80, 0, 80, "v"],[-200, -120, -80, -80, "h"],[-200, -80, -200, -200, "h"],
[-160, -160, -160, -120, "v"],[-40, -40, -240, -160, "v"],[-80, -80, -160, -80, "v"],
[-160, -80, -160, -160, "h"],[-120, -120, -120, -80, "v"],[-40, 40, -160, -160, "h"],
[-80, 40, -120, -120, "h"],[-40, -40, -80, 40, "v"],[-160, -40, -40, -40, "h"],
[-80, 40, 80, 80, "h"],[40, 40, -80, 80, "v"],[-40, 0, 40, 40, "h"],
[0, 40, 0, 0, "h"],[-40, 0, -40, -40, "h"],[0, 40, -80, -80, "h"],
[120, 120, -80, 120, "v"],[160, 160, -120, 80, "v"],[160, 200, 80, 80, "h"],
[40, 80, 80, 80, "h"],[40, 120, -40, -40, "h"],[40, 80, 0, 0, "h"],
[40, 80, -80, -80, "h"],[80, 120, 40, 40, "h"],[0, 0, -120, -80, "v"],
[80, 80, -200, -80, "v"],[0, 120, -200, -200, "h"],[120, 160, -120, -120, "h"],
[120, 120, -160, -120, "v"],[160, 160, -240, -160, "v"],[120, 200, -80, -80, "h"],
[200, 240, -40, -40, "h"],[160, 200, 0, 0, "h"],[200, 240, 40, 40, "h"],
[160, 200, -120, -120, "h"],[200, 200, -240, -120, "v"]],
/*Map08*/
[[-240, -240, -240, 200, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-240, 200, 200, 200, "h"],[-200, 160, 160, 160, "h"],
[200, 200, -200, 200, "v"],[160, 160, -160, 160, "v"],[120, 200, -200, -200, "h"],
[120, 120, -200, -160, "v"],[80, 80, -240, -120, "v"],[-80, 160, -120, -120, "h"],
[-240, -160, 120, 120, "h"],[-120, -120, -200, 160, "v"],[-200, -120, -200, -200, "h"],
[-160, -160, -160, 120, "v"],[-200, -200, -200, 80, "v"],[-80, 40, -200, -200, "h"],
[-80, -80, -200, 0, "v"],[-80, 0, 0, 0, "h"],[-80, -80, 40, 120, "v"],
[-80, 0, 40, 40, "h"],[-40, 0, 120, 120, "h"],[-40, -40, 80, 120, "v"],
[0, 0, 40, 80, "v"],[0, 0, 120, 160, "v"],[40, 120, 120, 120, "h"],
[0, 40, 80, 80, "h"],[40, 40, 80, 120, "v"],[80, 160, 80, 80, "h"],
[0, 120, 40, 40, "h"],[120, 120, -80, 40, "v"],[-80, 120, -80, -80, "h"],
[-40, 120, -40, -40, "h"],[40, 120, 0, 0, "h"],[-40, 80, -160, -160, "h"]],
/*Map09*/
[[-240, -240, -240, -160, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-240, -240, -120, 240, "v"],[-200, -200, -200, -160, "v"],
[-200, -160, -200, -200, "h"],[-200, -120, -160, -160, "h"],[-120, -120, -240, -160, "v"],
[-200, -200, -120, 40, "v"],[-240, -200, 0, 0, "h"],[-200, -200, 80, 160, "v"],
[-240, -200, 120, 120, "h"],[-200, -120, 200, 200, "h"],[-160, -160, 80, 160, "v"],
[-200, -40, 80, 80, "h"],[-120, 0, 120, 120, "h"],[-120, -120, 120, 200, "v"],
[-80, -80, 160, 200, "v"],[-40, -40, 200, 240, "v"],[-80, -40, 200, 200, "h"],
[-40, 40, 160, 160, "h"],[-160, -160, -160, 40, "v"],[-120, -120, -120, 80, "v"],
[-120, -80, -120, -120, "h"],[-80, -80, -160, -40, "v"],[-80, 0, -200, -200, "h"],
[-80, -40, -160, -160, "h"],[-80, 0, -80, -80, "h"],[0, 0, -200, -80, "v"],
[-40, 0, -120, -120, "h"],[-80, -80, 0, 40, "v"],[-80, 0, 40, 40, "h"],
[0, 0, 40, 120, "v"],[-80, -40, 0, 0, "h"],[-40, -40, -40, 0, "v"],
[0, 120, -160, -160, "h"],[40, 200, -200, -200, "h"],[160, 160, -240, -120, "v"],
[200, 200, -160, -40, "v"],[40, 200, -120, -120, "h"],[0, 40, -80, -80, "h"],
[40, 80, -40, -40, "h"],[80, 120, 0, 0, "h"],[40, 40, -80, -40, "v"],
[80, 80, -120, -80, "v"],[120, 120, -120, 0, "v"],[80, 80, 0, 80, "v"],
[40, 40, -40, 40, "v"],[0, 80, 80, 80, "h"],[0, 0, -80, 0, "v"],
[160, 160, -80, 80, "v"],[120, 160, 40, 40, "h"],[0, 120, 200, 200, "h"],
[80, 80, 120, 200, "v"],[40, 40, 80, 160, "v"],[80, 200, 160, 160, "h"],
[160, 160, 200, 240, "v"],[200, 200, 120, 200, "v"],[120, 120, 40, 160, "v"],
[160, 200, 120, 120, "h"],[160, 240, 80, 80, "h"],[160, 200, 0, 0, "h"],
[200, 240, 40, 40, "h"]],
/*Map10*/
[[-240, -240, -240, 120, "v"],[-240, 240, -240, -240, "h"],[240, 240, -240, 240, "v"],
[-240, 240, 240, 240, "h"],[-240, -240, 160, 240, "v"],[-200, -200, 160, 200, "v"],
[-200, -200, 80, 160, "v"],[-200, -160, 160, 160, "h"],[-160, -160, 120, 160, "v"],
[-160, -80, 120, 120, "h"],[-160, -120, 200, 200, "h"],[-120, -120, 160, 240, "v"],
[-240, -160, 40, 40, "h"],[-120, -120, 0, 80, "v"],[-160, -120, 80, 80, "h"],
[-120, -40, 40, 40, "h"],[-80, -80, 120, 200, "v"],[-80, -40, 80, 80, "h"],
[-40, -40, 80, 160, "v"],[-80, 0, 200, 200, "h"],[-40, 0, 120, 120, "h"],
[0, 0, 120, 200, "v"],[-160, -160, -40, 40, "v"],[-240, -200, 0, 0, "h"],
[-200, -200, -120, -40, "v"],[-160, -160, -160, -80, "v"],[-200, -160, -80, -80, "h"],
[-240, -200, -160, -160, "h"],[-200, -200, -200, -160, "v"],[-160, -40, -200, -200, "h"],
[-160, -80, -160, -160, "h"],[-120, -120, -200, -40, "v"],[0, 120, 160, 160, "h"],
[160, 160, 120, 240, "v"],[120, 120, 160, 200, "v"],[80, 80, 200, 240, "v"],
[40, 40, 200, 240, "v"],[200, 200, 40, 200, "v"],[0, 160, 80, 80, "h"],
[120, 120, 80, 120, "v"],[80, 80, 120, 160, "v"],[40, 40, 80, 120, "v"],
[80, 80, 0, 80, "v"],[-80, 200, 0, 0, "h"],[120, 240, 40, 40, "h"],
[0, 0, 0, 40, "v"],[40, 40, 40, 80, "v"],[-80, -80, -40, 0, "v"],
[-40, -40, -160, -40, "v"],[-80, -80, -120, -80, "v"],[-40, 200, -40, -40, "h"],
[200, 200, -160, -40, "v"],[-40, 200, -200, -200, "h"],[0, 0, -200, -120, "v"],
[-40, 120, -80, -80, "h"],[160, 160, -120, -40, "v"],[0, 120, -120, -120, "h"],
[0, 200, -160, -160, "h"],[-200, -160, -40, -40, "h"],[40, 40, -40, 0, "v"]],
];

var playerMoveLeft = false;
var playerMoveRight = false;
var playerMoveUp = false;
var playerMoveDown = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//
var minutes = 5;
var seconds = 0;
var timer_x = 0;
var timer_y = -265;
var stop_timer;
//
var play_game = false;
var game_finished = false;
var you_lose = false;
//
var current_stage = 0;
var max_stages = 10;
var stage_text_x = 0;
var stage_text_y = -285;
//Buttons
document.getElementById("start_button").onclick = function(){
    document.getElementById("mainCanvas").style.visibility = "visible";
    document.getElementById("start_page").style.visibility = "hidden";
    play_game = true;
    Timer();
};

document.getElementById("play_again_button").onclick = function(){
    document.getElementById("start_page").style.visibility = "visible";
    document.getElementById("you_win_page").style.visibility = "hidden";
    play_game = false;
    game_finished = false;
    you_lose = false;
    clearInterval(stop_timer);
    minutes = 5;
    seconds = 0;
    player.x = -270;
    player.y = 0;
    current_stage = 0;
};

document.getElementById("retry_button").onclick = function(){
    document.getElementById("you_lose_page").style.visibility = "hidden";
    document.getElementById("mainCanvas").style.visibility = "visible";
    play_game = true;
    game_finished = false;
    you_lose = false;
    clearInterval(stop_timer);
    minutes = 5;
    seconds = 0;
    player.x = -270;
    player.y = 0;
    current_stage = 0;
    Timer();
};
//DELETE THIS
function DELETE_THIS(){
    player.x = player_positions[current_stage][0];
    player.y = player_positions[current_stage][1];
}
DELETE_THIS();
// Update
function Update(){
    ctx.clearRect((CANVAS_WIDTH / 2) * -1, (CANVAS_HEIGHT / 2) * -1, CANVAS_WIDTH, CANVAS_HEIGHT);
    Timer_text();
    Stage_Text();
    if(play_game == true){
        Draw_Map();
        Draw_Next_Stage_Door();
        Boundaries();
        PlayerMovement();
        Boundaries();
        Draw_Player(player.x, player.y, player.size, player.color);
    }
    else if(you_lose == true){
        document.getElementById("mainCanvas").style.visibility = "hidden";
        document.getElementById("you_lose_page").style.visibility = "visible";
    }
    if(player.x > door_to_next_stage[current_stage][0] && player.x < door_to_next_stage[current_stage][0] + 20 && 
        player.y > door_to_next_stage[current_stage][1] && player.y < door_to_next_stage[current_stage][1] + 20 && game_finished == false){
        if(current_stage == 9){
            game_finished = true;
        }
        else{
            current_stage++;
            player.x = player_positions[current_stage][0];
            player.y = player_positions[current_stage][1];
        }
    }
    else if(game_finished == true){
        document.getElementById("mainCanvas").style.visibility = "hidden";
        document.getElementById("you_win_page").style.visibility = "visible";
        document.getElementById("timer-text").innerHTML = "Time left: " + minutes + ":" + seconds;
        clearInterval(stop_timer);
    }
    //
    requestAnimationFrame(Update);
};
Update();
//Maps are being drawn here
//Checing if player is touching the lines
function Draw_Map(){
    for (let row2 = 0; row2 < this.maps[current_stage].length; row2++){
        line_object = {sx: this.maps[current_stage][row2][0], ex: this.maps[current_stage][row2][1], sy: this.maps[current_stage][row2][2], 
            ey: this.maps[current_stage][row2][3], axis: this.maps[current_stage][row2][4]};
            //
            Compare_Coordinates(line_object.sx , line_object.ex, line_object.sy, line_object.ey, line_object.axis);
            //
            ctx.beginPath();
            ctx.moveTo(line_object.sx, line_object.sy);
            ctx.lineTo(line_object.ex, line_object.ey);
            ctx.strokeStyle = "#13084dff";
            ctx.stroke();
            ctx.fill();
    }
}
//
function Draw_Next_Stage_Door(){
    ctx.fillRect(door_to_next_stage[current_stage][0], door_to_next_stage[current_stage][1], 20, 20);
}
//
function Timer(){
    stop_timer = setInterval(function(){
        if(minutes == 0 && seconds == 0){
            play_game = false;
            you_lose = true;
        }
        else if(seconds == 0){
            seconds = 60;
            minutes--;
        }
        seconds--;
    }, 1000);
}
//timer text
function Timer_text(){
    ctx.font="20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Timer: " + minutes + ":" + seconds, timer_x, timer_y);
};
//Stage text
function Stage_Text(){
    ctx.font="20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Stage: " + (current_stage + 1) + "/" + max_stages, stage_text_x, stage_text_y);
};
//DrawPlayer
function Draw_Player(x, y, size, color){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};
//Check for collisions between circle and line
function Circle_Line_Collision(circle_obj_size, line_sx, line_ex, line_sy, line_ey){
    //First find right angle triangle sides lengh
    var ca = player.y - line_sy;
    var cb = player.x - line_sx;
    var cc = Math.sqrt(ca * ca + cb * cb);
    //
    var ba = line_ey - player.y;
    var bb = player.x - line_ex;
    var bc = Math.sqrt(ba * ba + bb * bb);
    //
    var aa = line_ey - line_sy;
    var ab = line_ex - line_sx;
    var ac = Math.sqrt(aa * aa + ab * ab);
    //Scalene traingle sides a b c
    var a = ac;
    var b = bc;
    var c = cc;
    //
    //cos A = (b2 + c2 − a2) / 2bc
    var asquare = Math.pow(a,2);
    var baquare = Math.pow(b,2);
    var csquare = Math.pow(c,2);
    var twobc = 2 * b * c;
    var Aangle = (baquare + csquare - asquare)/ twobc;
    var A = Math.acos(Aangle);
    //
    //cos B = (c2 + a2 − b2)/2ca
    var twoca = 2 * c * a;
    var Bangle = (csquare + asquare - baquare)/ twoca;
    var B = Math.acos(Bangle);
    //
    var C = 180 - (A * 180/Math.PI) - (B * 180/Math.PI);
    //Now we find (h) distance between line and circle
    //s = perimeter of triangle
    var s = (a + b + c) / 2;
    var Area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
    var h = (Area * 2) / a;
    //
    if(h - 1 < circle_obj_size && B * 180/Math.PI < 130 && C < 130){
        return true;
    }
    else{
        return false;
    }
};
//Compares player and the line coordinates to check if player is hitting the line or not
function Compare_Coordinates(line_sx, line_ex, line_sy, line_ey, line_axis){
    if(line_axis == "h" && Circle_Line_Collision(player.size, line_sx, line_ex, line_sy, line_ey) == true &&
    player.x > line_sx && player.x < line_ex && player.y < line_sy){
        playerMoveDown = false;
    }
    else if(line_axis == "h" && Circle_Line_Collision(player.size, line_sx, line_ex, line_sy, line_ey) == true &&
    player.x > line_sx && player.x < line_ex && player.y > line_sy){
        playerMoveUp = false;
    }
    else if(line_axis == "v" && Circle_Line_Collision(player.size, line_sx, line_ex, line_sy, line_ey) == true &&
    player.y > line_sy - player.size && player.y < line_ey + player.size && player.x < line_sx){
        playerMoveRight = false;
    }
    else if(line_axis == "v" && Circle_Line_Collision(player.size, line_sx, line_ex, line_sy, line_ey) == true &&
    player.y > line_sy - player.size && player.y < line_ey + player.size && player.x > line_sx){
        playerMoveLeft = false;
    }
    //
    if(line_axis == "v" && player.y <= line_ey + (player.size - 1) && player.y >= line_ey - (player.size - 1) &&
    player.x <= line_sx + (player.size - 1) && player.x >= line_sx - (player.size - 1)){
        playerMoveUp = false;
    }    
    else if(line_axis == "v" && player.y <= line_sy + (player.size - 1) && player.y >= line_sy - (player.size - 1) &&
    player.x <= line_sx + (player.size - 1) && player.x >= line_sx - (player.size - 1)){
        playerMoveDown = false;
    }
    else if(line_axis == "h" && player.x <= line_ex + (player.size - 1) && player.x >= line_ex - (player.size - 1) &&
    player.y <= line_sy + (player.size - 1) && player.y >= line_sy - (player.size - 1)){
        playerMoveLeft = false;
    }
    else if(line_axis == "h" && player.x >= line_sx - (player.size - 1) && player.x <= line_sx + (player.size - 1) &&
    player.y <= line_sy + (player.size - 1) && player.y >= line_sy - (player.size - 1)){
        playerMoveRight = false;
    }
};

function Boundaries(){
    if(player.x <= (canvas.width / 2) * -1 + player.size){
        playerMoveLeft = false;
    }
    if(player.x >= (canvas.width / 2) - player.size){
        playerMoveRight = false;
    }
    if(player.y <= (CANVAS_HEIGHT / 2) * -1 + player.size){
        playerMoveUp = false;
    }
    if(player.y >= CANVAS_HEIGHT / 2 - player.size){
        playerMoveDown = false;
    }
};

function PlayerMovement(){
    if(playerMoveLeft == true){
        player.x -= player.speed;
    }
    else if(playerMoveRight == true){
        player.x += player.speed;
    }
    else if(playerMoveUp == true){
        player.y -= player.speed;
    }
    else if(playerMoveDown == true){
        player.y += player.speed;
    }
};

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        playerMoveRight = true;
        player.color = "#5c1010";
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        playerMoveLeft = true;
        player.color = "#076e4f";
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        playerMoveUp = true;
        player.color = "#05457d";
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        playerMoveDown = true;
        player.color = "#7d3905";
    }
};

function keyUpHandler(e) {
    player.color = "#27204d";
    if(e.key == "Right" || e.key == "ArrowRight") {
        playerMoveRight = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        playerMoveLeft = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        playerMoveUp = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        playerMoveDown = false;
    }
};
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);