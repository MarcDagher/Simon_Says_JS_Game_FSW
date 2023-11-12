const green_btn = document.getElementById("green")
const red_btn = document.getElementById("red")
const yellow_btn = document.getElementById("yellow")
const blue_btn = document.getElementById("blue")
const buttons = [green_btn, red_btn, yellow_btn, blue_btn]

const green_sound = document.getElementById("green_sound")
const red_sound = document.getElementById("red_sound")
const yellow_sound = document.getElementById("yellow_sound")
const blue_sound = document.getElementById("blue_sound")

const body = document.getElementsByTagName("body")[0]

let title = document.getElementById("level-title")
let level = 1
let game_colors = []
let user_list_of_colors = []



// Main Function 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
body.addEventListener("keypress", Start_Game)

function Start_Game (list_of_colors, current_level) {
  list_of_colors = game_colors
  current_level = level 

  title.innerHTML = `level ${level}`
  game_colors = Generate_Color_Info_and_Effects(list_of_colors) // returns a new color and stores it in game_colors
  user_list_of_colors = []
  Get_Users_Results() // pushes event trigger element to user_list_of_colors
  setTimeout(()=>Check_User_Results(user_list_of_colors, current_level),1000 +  level*300) // compares list elements
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//Helper Functions Section

// Returns adjusted list
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
  document.addEventListener("click", find_element)
}
// adjusts user_list_of_colors
function find_element (e){ 
  let element = e.target.id
  let pressed_btn = document.getElementById(element) 
  user_list_of_colors.push(element) 
  Give_Color_Sound_Effect(pressed_btn) 
}

// Compare lists after click: EndGame or Continue game 
function Check_User_Results(){
  for (i=0; i<level; i++) { 
    console.log(level, user_list_of_colors, game_colors)
    if(user_list_of_colors[i] != game_colors[i]){
      End_Game()
      return
    }
  }
    level++
    Start_Game(game_colors, level)
}

// Display game-over effects and reset values
function End_Game() {
  body.classList.toggle("game-over")
  document.getElementById("wrong").play()
  setTimeout(() => {body.classList.toggle("game-over")}, 150) 
  document.removeEventListener("click", find_element)
  game_colors = []
  level = 1
  title.innerHTML = `Press Any Key to Start`
}