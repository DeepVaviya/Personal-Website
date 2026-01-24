const range = document.getElementById("inputRange");
let secretNumber = Math.floor(Math.random() * range.valueAsNumber) + 1;
let chance = 3;

document.querySelector(".check").addEventListener("click", function () {

  const guess = Number(document.querySelector(".guess").value);

  let message = document.querySelector(".message");
  message.classList.remove("new-range");

  // Added Sound Effect to button click
  let audio = new Audio("sounds/button-click.mp3");
  audio.play();

  //If no number is entered
  if (!guess) {
    message.textContent = "abbe saale number toh daal 👺";
  }
  //If number is guessed correctly
  else if (guess == secretNumber) {
    
    message.textContent = "Wahhh! Congrats";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".guess").disabled = true;
    document.querySelector("#check").disabled = true;
  }
  //if guess greater than secret number
  else if (guess > secretNumber) {
    if (chance >  1) {
      message.textContent = "📈 Too High!";
      chance--;
      document.querySelector(".chance").textContent = chance;
      wrongAnswer();
    } else {
      message.textContent = "😒 haar gaya na, Wapas try kar 😉";
      document.querySelector(".chance").textContent = "0";
      document.querySelector(".number").textContent = "Secret Number " + secretNumber + " Tha";
      document.querySelector(".guess").disabled = true;
      document.querySelector("#check").disabled = true;
    }
  }
  //If guess less than secret number
  else if (guess < secretNumber) {
    if (chance > 1) {
      message.textContent = "📉 Too Low!";
      chance--;
      document.querySelector(".chance").textContent = chance;
      wrongAnswer();
    } else {
      let audio = new Audio("sounds/shit.mp3");
      message.textContent = "😒 haar gaya na, Wapas try kar 😉";
      document.querySelector(".chance").textContent = "0";
      document.querySelector(".number").textContent = "Secret Number " + secretNumber + " Tha";

      document.querySelector(".guess").disabled = true;
      document.querySelector("#check").disabled = true;
  }
  
  }
});

document.querySelector(".again").addEventListener("click", function () {
  // Reload the page
  location.reload();
});

//Added functionality to enable user to use enter key to guess the number
const input = document.getElementById("inputGuess");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("check").click();
  }
})

range.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    
    const newrange = event.target.value;
    let message = document.querySelector(".message");
    let audio = new Audio("sounds/button-click.mp3");
    audio.play();

    if(newrange < 20) {
      message.classList.remove("new-range");
      message.textContent = "Enter range more then 20 !";
    } 
    else {
      document.getElementById("inputRange").value = newrange;
      secretNumber = Math.floor(Math.random() * newrange) + 1;
      message.textContent = "Yo.. uh set a new range 🚀";
      message.classList.add("new-range");
    }
  }
})

