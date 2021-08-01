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

backFaces.sort(comparator);

function comparator(){
    return 0.5 - Math.random();
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
    totalCards = Number(prompt("Com quantas cartas quer jogar?"));    
    while ((totalCards % 2 !== 0) || (totalCards < 4) || (totalCards > 14)) {
        totalCards = Number(prompt("Com quantas cartas quer jogar?"));
    }

    let container = document.querySelector(".container");
    let doubleCards = duplicateCards();

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
}
startGame()

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
        if (pairsCards[0]  === pairsCards[1]){
            checked1.classList.remove("check1");  
            checked2.classList.remove("check2");
            checked2.classList.add("disabled");
            checked1.classList.add("disabled");                           
        } else {
            setTimeout(function(){
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


