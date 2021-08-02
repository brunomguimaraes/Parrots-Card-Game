let totalCards;
let backFaces = [
    "src='assets/bobrossparrot.gif'", 
    "src='assets/explodyparrot.gif'", 
    "src='assets/fiestaparrot.gif'",
    "src='assets/metalparrot.gif' ",
    "src='assets/revertitparrot.gif'",
    "src='assets/unicornparrot.gif'",
    "src='assets/tripletsparrot.gif'"
] 
let pairsCards = [0, 0];
let checked1;
let checked2;
let clickCount = 1;
let backFaceSelection1;
let frontFaceSelection1;
let backFaceSelection2;
let frontFaceSelection2;
let hits = 0;
let chronometer = 0;
let idInterval;
let userName;
let divRanking;
let table;
let scorepoints = 0;
let ranking = [];

backFaces.sort(comparator);

function comparator() {
    return 0.5 - Math.random();
}

function comparatorScore(a, b) {    
    if(a.score > b.score){
        return -1;
    }
    else if(a.score < b.score){
        return 1;
    }
    return 0;
}

function duplicateCards() {
    let doubleCards = [];
    for(let i = 0; i < totalCards/2; i++) {
        doubleCards.push(backFaces[i]);
        doubleCards.push(backFaces[i]);
    }
    doubleCards.sort(comparator);
    return doubleCards;
}

function startGame() {   
    userName = prompt("Qual nome você quer que apareça no ranking?");
    totalCards = Number(prompt("Com quantas cartas quer jogar?\nDigite um número par de 4 a 14."));    
    while ((totalCards % 2 !== 0) || (totalCards < 4) || (totalCards > 14)) {
        totalCards = Number(prompt("Com quantas cartas quer jogar?\nDigite um número par de 4 a 14."));
    }
    
    let container = document.querySelector(".container");
    let doubleCards = duplicateCards();

    container.innerHTML = "";

    for(let i = 0; i < totalCards; i++) {
        container.innerHTML += `
            <div class="card" onclick="cardRotation(this)">
                <div class="front-face">
                    <img class="parrots" src="assets/front.png" alt="Parrot">
                </div>
                <div class="back-face">
                    <img class="parrots" ${doubleCards[i]} alt="Parrot">
                </div>
            </div>
        `;
    }        
    duplicateCards();  

    setInterval(() => {
        addScore();
    }, 1000);
}
startGame()

function time() {
    idInterval = setInterval(addSeconds, 1000);
}
    
function addSeconds() {
    chronometer++;        
    const divChronometer = document.querySelector(".chronometer");
    divChronometer.innerHTML = chronometer;
}
time();

function cardRotation (element) {    
    if (clickCount % 2 !== 0) {       
        checked1 = element;
        checked1.classList.add("check1");   
        checked1.classList.add("disabled"); 
        backFaceSelection1 = document.querySelector(".card.check1 .back-face");
        backFaceSelection1.classList.add("back-face-rotation");
        frontFaceSelection1 = document.querySelector(".card.check1 .front-face");
        frontFaceSelection1.classList.add("front-face-rotation");
        pairsCards[0] = document.querySelector(".card.check1 .back-face img").getAttribute("src");        
    } else {
        checked2 = element;
        checked2.classList.add("check2");
        checked2.classList.add("disabled");         
        backFaceSelection2 = document.querySelector(".card.check2 .back-face");
        backFaceSelection2.classList.add("back-face-rotation");
        frontFaceSelection2 = document.querySelector(".card.check2 .front-face");
        frontFaceSelection2.classList.add("front-face-rotation");        
        pairsCards[1] = document.querySelector(".card.check2 .back-face img").getAttribute("src");        
    } 

    if (clickCount % 2 === 0) {
        if (pairsCards[0]  === pairsCards[1]) {
            checked1.classList.remove("check1");  
            checked2.classList.remove("check2");
            checked2.classList.add("disabled");
            checked1.classList.add("disabled");
            hits++;           
            setTimeout(function() {
                finishGame();
            }, 1000);               
        } else {
            setTimeout(function() {
                backFaceSelection1.classList.remove("back-face-rotation");
                frontFaceSelection1.classList.remove("front-face-rotation");
                backFaceSelection2.classList.remove("back-face-rotation");
                frontFaceSelection2.classList.remove("front-face-rotation");
                checked1.classList.remove("check1");  
                checked2.classList.remove("check2");
                checked2.classList.remove("disabled");
                checked1.classList.remove("disabled");    
            }, 1000);
        }
    }
        clickCount ++;      
 }


function addScore() {

    if (totalCards === 4) {        
        if (chronometer <= 6) {
            scorepoints = (hits * 10) + 10;
        } else {
            scorepoints = (hits * 10) + (10 - (chronometer-6));
        }
    } 
    if (totalCards === 6) {
        if (chronometer <= 9) {
            scorepoints = (hits * 12) + 15;
        } else {
            scorepoints = (hits * 12) + (15 - (chronometer-9));
        }
    }
   
    if (totalCards === 8) {
        if (chronometer <= 12) {
            scorepoints = (hits * 14) + 20;
        } else {
            scorepoints = (hits * 14) + (20 - (chronometer-12));
        }
    } 
    
    if (totalCards === 10) {
        if (chronometer <= 15) {
        scorepoints = (hits * 16) + 30;
        } else {
            scorepoints = (hits * 16) + (30 - (chronometer-15));
        }
    }
    
    if (totalCards === 12) {
        if (chronometer <= 18) {
            scorepoints = (hits * 18) + 40;
        } else {
            scorepoints = (hits * 18) + (40 - (chronometer-18));
        }
    } 
    if (totalCards === 14) {
        if (chronometer <= 21) {
            scorepoints = (hits * 20) + 50;
        } else {
            scorepoints = (hits * 20) + (50 - (chronometer-21));
        }
    } 

    const divScorePoints = document.querySelector(".score-points");
    divScorePoints.innerHTML = scorepoints;
    return scorepoints;
}

function finishGame() {
     if (hits === (totalCards / 2)) {
        clearInterval(idInterval)
        alert(`Você ganhou em ${clickCount - 1} jogadas com o tempo de ${chronometer} segundos!\nPontuação total: ${scorepoints} diamantes.`);
        let user = {
            name: userName, 
            cards: totalCards,
            time: chronometer,
            score: scorepoints
        }        

        ranking.push(user);
        rank();
        setTimeout(function() {
            restartGame();;
        }, 4000);                 
     }     
 }
 
 function rank() {
    ranking.sort(comparatorScore);
    divRanking = document.querySelector(".ranking");
    divRanking.classList.remove("none");
    table = document.querySelector("table");
    table.innerHTML = `<tr>
                        <th></th>
                        <th class="titulos">Name</th>
                        <th class="titulos">Cards</th>
                        <th class="titulos">Time</th>
                        <th class="titulos">Score</th>
                      </tr>`;
    for(let i = 0; i < ranking.length; i++) {
        table.innerHTML+=`<tr>
                        <td class="position">${i + 1}</td>
                        <td>${ranking[i].name}</td>
                        <td>${ranking[i].cards}</td>
                        <td>${ranking[i].time}</td>
                        <td>${ranking[i].score}</td>
                      </tr>`;
    }    
 }

 function restartGame() {
    let answer = prompt("Deseja reiniciar a partida?\nDigite s (sim) ou n (não).").toUpperCase()
    if ((answer === "SIM") || (answer === "S") ) {
        clickCount = 1;
        hits = 0;
        chronometer = 0;  
        divRanking.classList.add("none"); 
        backFaces.sort(comparator);         
        startGame();
        time();
    }        
 }
