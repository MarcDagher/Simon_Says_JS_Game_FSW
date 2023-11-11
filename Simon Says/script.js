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
let colors = []

// Game Initiated
body.addEventListener("keypress", Start_Game)

function Start_Game (list_of_colors, current_level) {
  list_of_colors = colors
  current_level = level 

  title.innerHTML = `level ${level}`
  Generate_Color_Info_and_Effects(list_of_colors)
}

function Generate_Color_Info_and_Effects(list_of_colors) {
  let button = buttons[Math.floor(Math.random()*buttons.length)]
  Give_Color_Sound_Effect(button)

  console.log(button)
}


function Give_Color_Sound_Effect(button) {
  button.classList.toggle("pressed")
  button.children[0].play() // favicon error
  setTimeout(() => {button.classList.toggle("pressed")}, 40)
}