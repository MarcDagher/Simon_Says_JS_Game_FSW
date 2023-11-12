// define button constants 
const green_btn = document.getElementById("green")
const red_btn = document.getElementById("red")
const yellow_btn = document.getElementById("yellow")
const blue_btn = document.getElementById("blue")
const buttons = [green_btn, red_btn, yellow_btn, blue_btn]

//define audio constants
const green_sound = document.getElementById("green_sound")
const red_sound = document.getElementById("red_sound")
const yellow_sound = document.getElementById("yellow_sound")
const blue_sound = document.getElementById("blue_sound")

const body = document.getElementsByTagName("body")[0]

//define changing and reusable function attributes 
let title = document.getElementById("level-title")
let level = 1
let game_colors = []
let user_list_of_colors = []
let end_game = false

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//               Defining Section Done
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

body.addEventListener("keypress", Start_Game)

function Start_Game (list_of_colors, current_level) {
  list_of_colors = game_colors
  current_level = level 

  title.innerHTML = `level ${level}`
  game_colors = Generate_Color_Info_and_Effects(list_of_colors)
  // ^^^ list + new color to compare with user's list. 
  user_list_of_colors = []
  Get_Users_Results()
  setTimeout(()=>Check_User_Results(user_list_of_colors, current_level), 800 +  level*500)
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//               Helper Functions Section
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// takes list_of_colors and randomly displays the color's effects
// adds color id to the list and Returns adjusted list
function Generate_Color_Info_and_Effects(list_of_colors) {
  let button = buttons[Math.floor(Math.random()*buttons.length)]
  Give_Color_Sound_Effect(button)
  list_of_colors.push(button.id) 
  return list_of_colors // to compare it with user's answers
}


function Give_Color_Sound_Effect(button) {
  button.classList.toggle("pressed")
  button.children[0].play() // favicon error
  setTimeout(() => {button.classList.toggle("pressed")}, 40)
}

function  Get_Users_Results (){
  document.addEventListener("click", find_element)// find element
}
function find_element (e){ 
  let element = e.target.id // get id
  let pressed_btn = document.getElementById(element) // get element
  user_list_of_colors.push(element) // push to list
  Give_Color_Sound_Effect(pressed_btn) // sound/display effects
}


function Check_User_Results(){
  for (i=0; i<level; i++) { // check if lists are equal
    console.log(level, user_list_of_colors, game_colors)
    if(user_list_of_colors[i] != game_colors[i]){
      end_game = true
      End_Game()
      return
    }
  }
    level++
    Start_Game(game_colors, level)
}

function End_Game() {
  body.classList.toggle("game-over")
  document.getElementById("wrong").play()
  setTimeout(() => {body.classList.toggle("game-over")}, 150) 
  document.removeEventListener("click", find_element)
  game_colors = []
  user_list_of_colors = []
  level = 1
}