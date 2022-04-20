var cards = ["aardvark.png", "aardvark.png", "baboon.png", "baboon.png", "bat.png", "bat.png", "bongo.png", "bongo.png", "buffalo.png", "buffalo.png", "cheetah.png", "cheetah.png", "elephant.png", "elephant.png", "hare.png", "hare.png", "pangolin.png", "pangolin.png", "wildDog.png", "wildDog.png",];

var clicks = 0; // liczba kliknięć
var indexesOfClicks = []; //tablica zapisująca klikane obrazki. Dwa elementy dodane, żeby pierwszy kliknięty obrazek było z czym porównać i na pewno nie będzie pary
var matches = 0; //liczba trafionych par. Przy 10 się wygrywa
var guessedIndexes = []; //zapisuje indeksy zgadniętych kart, żeby nie mogły być one klikane ponownie już po zgadnięciu
var notRepeatingNumbers = []; //losowa kolejność obrazków,

function generateBoard(){
    boardContent=''; //pusta plansza

    for (var i=0; i<cards.length; i++){
    boardContent+='<div class="card" id="c'+i+'" onclick="reveal(this.id)"></div>'
    document.getElementById("board").innerHTML = boardContent;
    }

    clicks = 0;
    indexesOfClicks = [];
    matches = 0;
    guessedIndexes = [];
    notRepeatingNumbers = [];

    assignNumbers();
    turncounter();
    // Generowanie zapełnionej tablicy oraz zerowanie liczników i zmiennych (zarówno na początku, jak i po kliknięciu "Play again")
}
function assignNumbers(){
       for (let i=0; i<cards.length; i++){
        var randomNumber = Math.floor(Math.random()*cards.length);
        if (notRepeatingNumbers.includes(randomNumber) == false){
            notRepeatingNumbers.push(randomNumber);
        }
        else{
         i--;   
        }
        // Wyświetlenie obrazków zamiast karty "Africa.png"   
    } 
}

function reveal(clickedCardID){
    setTimeout(showCard, 150, clickedCardID); //pokazuje kartę w momencie obrotu karty o 90 st.
   
    document.querySelector('#'+clickedCardID).style.transform = "rotateY(180deg)"; //obraca kartę o 180 st.

    clicks++; //liczba kliknięć. Co 2 kliknięcia sprawdzamy, czy odkryliśmy parę pasujących obrazków
    turncounter(); // aktualizacja wskazania licznika tur

    indexesOfClicks.push(clickedCardID.charAt(1)+clickedCardID.charAt(2)); //zapisujemy kliknięcia w tablicy

    var nrLastClick = indexesOfClicks[indexesOfClicks.length-1]; //nr ostatniego kliknięcia
    var nrPenultimateClick = indexesOfClicks[indexesOfClicks.length-2]; //nr przedostatniego kliknięcia

    var pictureIndex1 = notRepeatingNumbers[nrLastClick];
    var pictureIndex2 = notRepeatingNumbers[nrPenultimateClick];

    if (cards[pictureIndex1] == cards[pictureIndex2] && nrLastClick != nrPenultimateClick){
        if(clicks%2==0){
         matches++;

        guessedIndexes.push(nrPenultimateClick, nrLastClick);//dodaje indeksy zgadniętych kart do tablicy, żeby potem nie móc ich klikać ponownie

        hide_guessed_card("c"+nrPenultimateClick);
        hide_guessed_card("c"+nrLastClick); // chowanie zgadniętych kart

        indexesOfClicks = [];
        //kasuje indeksy każdej pary, żeby nie dało się trafić obrazków w różnych parach
        }
    }
    else{
        if(clicks%2==0){
        disable_click();// blokuje możliwość kliknięcia w obrazki dopóki są odsłonięte
        
        indexesOfClicks = [];
        //kasuje indeksy każdej pary, żeby nie dało się trafić obrazków w różnych parach
        setTimeout('enable_click()',1000); // odblokowuje możliwość kliknięcia
        setTimeout('disable_guessed_cards()',1000); // uniemożliwia klikanie w już zgadniętą kartę
        setTimeout('hide("c'+nrLastClick+'")',1000);
        setTimeout('hide("c'+nrPenultimateClick+'")',1000); // chowa niezgadnięte karty
        }
    }
    
    if (matches==10){
        setTimeout(win,1000);
        setTimeout(playAgain,1000);
        // co w przypadku wygranej        
    }
}

function showCard ( clickedCardID){
    document.getElementById(clickedCardID).innerHTML = "<img src = img/" + cards[notRepeatingNumbers[clickedCardID.charAt(1)+clickedCardID.charAt(2)]] + ">"; //Odkrycie klikniętego obrazka (pobranie cyfr z ID klikniętego obrazka)
}

function hide(clickedCardID){ //obraca kartę i chowa nietrafiony obrazek po 150ms 
    document.querySelector('#'+clickedCardID).style.transform = "rotateY(0deg)";
    setTimeout(hideWithDelay, 150, clickedCardID); 
}

function hideWithDelay(clickedCardID){
    document.getElementById(clickedCardID).innerHTML = "<img src = img/africa.png>";
    // chowa niezgadnięty obrazek
}

function disable_click(){
    for (i=0;i<20;i++){
        var card = document.getElementById("c"+i);
        card.style.pointerEvents = "none";
        // blokuje możliwość klikania w inne karty gdy 2 są odłonięte
    }
}

function enable_click(){
    for(i=0;i<20;i++){
        var card = document.getElementById("c"+i);
        card.style.pointerEvents = "auto";   
        // oblokowuje możliwość klikania w karty po odłonięciu dwóch
    }
}

function hide_guessed_card(clickedCardID){
    var card = document.getElementById(clickedCardID);
    card.style.opacity = 0;
    card.style.transform = "rotateY(90deg)"
    card.onclick = "none";
    card.style.pointerEvents = "none";
    // chowa zgadnięte karty
}

function disable_guessed_cards(){
    for (i=0;i<guessedIndexes.length;i++){
        var card = document.getElementById("c"+guessedIndexes[i]);
        card.style.pointerEvents = "none";  
        // uniemożliwia klikanie w zgadniętą już wcześniej kartę
    }
}

function turncounter(){
    document.getElementById("counter").innerHTML = Math.floor(clicks/2);
    // licznik tur
}

function win(){
    document.getElementById("board").innerHTML = "<p>You won!</p>"
    // co w przypadku wygranej
}
function playAgain(){
    document.getElementById("playagain").innerHTML = "<p> Play again? </p>"
    document.getElementById("playagain").addEventListener("click", generateBoard)
    // jakbyśmy chcieli zagrać jeszcze raz
}




