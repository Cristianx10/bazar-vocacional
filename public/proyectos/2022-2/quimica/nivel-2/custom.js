
oActivity.setInit(()=>{
var game = document.querySelector(".game");
var basket = document.querySelector(".basket");
var elements = document.querySelector(".elements");
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
var baskeBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));
const scoreContainer = document.getElementById('score');
const formuleContainer = document.getElementById('compounds');
const goalContainer = document.getElementById('goal');
const amountContainer = document.getElementById('amount');
const values = [100, 150, 200, 250];
const compounds = [
    { text: "H2O", value: 800 },
    { text: "C3H402", value: 1500 },
    { text: "C2H5OH", value: 750 }
];
const colorClasses = {
    H2O: "purple",
    C3H402: "orange",
    C2H5OH: "blue",
}
var currentCompound = 0;
var currentAmount = 0;


//let score = parseInt(localStorage.getItem("score"));

let score = 0;
score = oActivity.getState("score")[0]();

console.log("puntaje: ", score)

let timer = 0;

//cambiar nivel
function changeLevel3() {
    oActivity.addState("time2", timer)
   // localStorage.setItem("time2", timer);
    oActivity.redirect('/proyectos/2022-2/quimica/nivel-3/index.html')
}

function saveScore(score) {
    oActivity.addState("score", parseInt(score))
   // localStorage.setItem("score", score);
}


function updateDisplayedScore() {
    scoreContainer.innerHTML = "";
    scoreContainer.innerHTML = '' + score;
}

function updateDisplayCompounds() {
    formuleContainer.innerHTML = compounds[currentCompound].text;
}

function updateDisplayGoal() {
    goalContainer.innerHTML = compounds[currentCompound].value;
}

function updateDisplaAmount() {
    amountContainer.innerHTML = "" + currentAmount;
}

updateDisplayCompounds();
updateDisplayGoal();
updateDisplaAmount();

function moveBasketLeft() {
    if (basketLeft > 0) {
        basketLeft -= 15;
        basket.style.left = basketLeft + 'px';
    }

}

function moveBasketRight() {
    if (basketLeft < 0) {
        basketLeft += 15;
        basket.style.left = basketLeft + 'px';

    }
    basketLeft += 15;
    basket.style.left = basketLeft + 'px';

}

function control(e) {
    if (e.key == "ArrowLeft") {
        moveBasketLeft();
    }
    if (e.key == "ArrowRight") {
        moveBasketRight();
    }
}

//contador de tiemp
var timeoutHandle;
function countdown(minutes, seconds) {
    function tick() {
        timer = minutes + ': ' + seconds;
        var counter = document.getElementById("timer");
        counter.innerHTML =
            minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--;
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {

                setTimeout(function () {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
        }


        if (minutes == 0 && seconds == -1) {
            timer = true;
            saveScore(score);
            changeLevel3();

        }
    }
    tick();
}

countdown(1, 05);


function generateElements() {
    const bottomLimit = 1500;
    var elementBottom = 1050;
    var elementLeft = Math.floor(Math.random() * game.clientWidth);
    var element = document.createElement('div');
    const value = values[Math.floor(Math.random() * values.length)];
    const selectedCompound = compounds[Math.floor(Math.random() * compounds.length)].text;
    element.innerHTML = `
        <p>${value}ml</p>
        <p>${selectedCompound}</p>
    `;
    element.style.setProperty('font-size', `${value / 10}px`);
    element.classList.add("element", colorClasses[selectedCompound]);
    elements.appendChild(element);
    var fallInterval = setInterval(fallDownElement, 25)


    function fallDownElement() {
        //Jugador agarra elemento
        if (elementBottom < baskeBottom + 50 && elementBottom > baskeBottom && elementLeft > basketLeft - 30 && elementLeft < basketLeft + 80) {
            elements.removeChild(element);
            clearInterval(fallInterval);

            if (selectedCompound === compounds[currentCompound].text) {
                currentAmount += value;

                if (currentAmount >= compounds[currentCompound].value) {
                    currentAmount = 0;
                    score += 10;
                    updateDisplayedScore();

                    if (currentCompound < compounds.length - 1) {
                        currentCompound++;
                        updateDisplayCompounds();
                        updateDisplayGoal();
                    } else {
                        saveScore(score);
                        changeLevel3();
                    }
                }

                updateDisplaAmount();
            } else {
                score -= 5;

            }
        }

        elementBottom -= 5;
        element.style.bottom = elementBottom + 'px';
        element.style.left = elementLeft + 'px';

        if (element.getBoundingClientRect().top > bottomLimit) {
            elements.removeChild(element);
            clearInterval(fallInterval);
        }
    }

    element.style.bottom = elementBottom + 'px';
    setTimeout(generateElements, 700)
}
generateElements();

document.addEventListener("keydown", control);
})