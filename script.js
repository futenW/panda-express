let panda = document.getElementById("panda");
let startScreen = document.getElementById("startScreen");
let score = document.getElementById("score");

let currentScore = 0;
let currentBamboos = [];
let currentBombs = [];

const onMouseMove = (e) =>{
    if ((e.pageX > 130 && e.pageX < 1280) && (e.pageY > 70 && e.pageY < 750)) {
        panda.style.left = e.pageX - 150 + 'px';
        panda.style.top = e.pageY - 80 + 'px';
    }
}

function start(e) {
    // press space to start
    if (e.keyCode == 32) {
        startScreen.remove();
        score.innerHTML = "Score: 0";
        document.addEventListener('mousemove', onMouseMove);
        setInterval(dropBamboo, 100);
        setInterval(dropBomb, 5000);
        setInterval(eatBamboo, 10);
        setInterval(hitBomb, 10);
    }
}

function eatBamboo() {
    for (let i = 0; i < currentBamboos.length; i++) {
        let bambooX = parseInt(window.getComputedStyle(currentBamboos[i]).getPropertyValue("left"));
        let bambooY = parseInt(window.getComputedStyle(currentBamboos[i]).getPropertyValue("top"));
        let pandaX = parseInt(window.getComputedStyle(panda).getPropertyValue("left"));;
        let pandaY = parseInt(window.getComputedStyle(panda).getPropertyValue("top"));
        if ((pandaX > bambooX && pandaX < bambooX+80) && (pandaY > bambooY && pandaY < bambooY+80) ||
            (pandaX+100 > bambooX && pandaX+100 < bambooX+80) && (pandaY > bambooY && pandaY < bambooY+80) ||
            (pandaX > bambooX && pandaX < bambooX+80) && (pandaY+100 > bambooY && pandaY+100 < bambooY+80) ||
            (pandaX+100 > bambooX && pandaX+100 < bambooX+80) && (pandaY+100 > bambooY && pandaY+100 < bambooY+80)) {
            currentBamboos[i].remove();
            currentScore++;
            score.innerHTML = "Score: " + currentScore;
        }
    }
}

function hitBomb() {
    for (let i = 0; i < currentBombs.length; i++) {
        let bombX = parseInt(window.getComputedStyle(currentBombs[i]).getPropertyValue("left"));
        let bombY = parseInt(window.getComputedStyle(currentBombs[i]).getPropertyValue("top"));
        let pandaX = parseInt(window.getComputedStyle(panda).getPropertyValue("left"));;
        let pandaY = parseInt(window.getComputedStyle(panda).getPropertyValue("top"));
        if ((pandaX > bombX && pandaX < bombX+80) && (pandaY > bombY && pandaY < bombY+80) ||
            (pandaX+100 > bombX && pandaX+100 < bombX+80) && (pandaY > bombY && pandaY < bombY+80) ||
            (pandaX > bombX && pandaX < bombX+80) && (pandaY+100 > bombY && pandaY+100 < bombY+80) ||
            (pandaX+100 > bombX && pandaX+100 < bombX+80) && (pandaY+100 > bombY && pandaY+100 < bombY+80)) {
            currentBombs[i].remove();
            currentScore = 0;
            score.innerHTML = "Score: " + currentScore;
            alert("You lost, Loser");
        }
    }
}

function dropBamboo() {
    var bamboo = document.createElement("div");
    bamboo.classList.add("bamboo");
    canvas.appendChild(bamboo);
    bamboo.style.left = Math.random() * 1160 - 10 + "px";
    currentBamboos.push(bamboo);
    setTimeout(function() {bamboo.remove();}, 1850);
}

function dropBomb() {
    var bomb = document.createElement("div");
    bomb.classList.add("bomb");
    canvas.appendChild(bomb);
    bomb.style.left = Math.random() * 1160 - 10 + "px";
    currentBombs.push(bomb);
    setTimeout(function() {bomb.remove();}, 2800);
}

document.onkeydown = start;