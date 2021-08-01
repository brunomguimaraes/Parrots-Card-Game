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

backFaces.sort(comparator);

function comparator(){
    return 0.5 - Math.random();
}

function duplicateCards(){
    let doubleCards = [];
    for(let i = 0; i < totalCards/2; i++){
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
    for(let i = 0; i < totalCards; i++){
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



