// Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
// Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
// Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
// Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.

// BONUS (facoltativo): all'inizio del gioco, il programma chiede all'utente il livello di difficoltà:
// 0 = l'intervallo di numeri possibili è tra 1 e 100
// 1 = l'intervallo di numeri possibili è tra 1 e 80
// 2 = l'intervallo di numeri possibili è tra 1 e 50
// In ogni caso, le mine sono sempre 16.

var difficolta = 0;
var maxNumeri = 0;
var numBombe = 16;
var listaMine = [];
var numeriChiamati = [];
var inputNumber = 0;
var isBombaTrovata = false;

// Ciclo di richiesta di difficoltà del gioco
do{
    difficolta = parseInt(prompt('Inserisci 0 per difficoltà FACILE\nInserisci 1 per difficoltà MEDIA\nInserisci 2 per difficoltà DIFFICILE'));
} while (difficolta != 0 && difficolta != 1 && difficolta != 2 )

if (difficolta == 0 ){
    // 0 = l'intervallo di numeri possibili è tra 1 e 100
    maxNumeri = 100;
    console.log("Difficoltà selezionata: FACILE");
} else if (difficolta == 1 ){
    // 1 = l'intervallo di numeri possibili è tra 1 e 80
    maxNumeri = 80;
    console.log("Difficoltà selezionata: MEDIA");
} else if (difficolta == 2 ){
    // 2 = l'intervallo di numeri possibili è tra 1 e 50
    maxNumeri = 50;
    console.log("Difficoltà selezionata: DIFFICILE");
}

var punteggioMax = maxNumeri - numBombe;
console.log("Punteggio Massimo: " + punteggioMax);


// Ciclo di generazione di 16 numeri casuali diversi tra 1 e 100 ed inserirli nell array
while (listaMine.length < numBombe){

    var minaRandom = generatoreNumCasuale(maxNumeri);

    // Se il numero generato non è presente nel array delle mine, inseriscilo
    if (listaMine.includes(minaRandom) == false){
        listaMine.push(minaRandom);
    }
}

console.log("Lista numeri mine: " + listaMine);

// Chiedere un numero all'utente e verificare se corrisponde ad un numero-mina
// Se è presente il gioco finisce e comunica la sconfitta al giocatore
// Se non è presente aumentare il punteggio del giocatore di 1 e chiedere un altro numero

do {
    inputNumber = parseInt( prompt('Inserisci un numero da 1 a ' + maxNumeri) );

    // Variabile di controllo per vedere se ha scelto un input non valido
    var isNumeroValido = isValidInput(inputNumber, maxNumeri);
    // Variabile di controllo per vedere se ha scelto un numero-mina
    var isGameOver = isInTheArray( inputNumber, listaMine);
    // Variabile di controllo per vedere se ha scelto un numero già chiamato
    var isRepited = isInTheArray( inputNumber, numeriChiamati);

    if (isNumeroValido == false){
        alert("Numero inserito non valido");
    } else if (isGameOver == true) {
        isBombaTrovata = true;
        alert("HAI PERSO! Hai totalizzato " + numeriChiamati.length + " punti!" );
    } else if (isRepited == false) {
        numeriChiamati.push(inputNumber)
        console.log("Inserito numero: " + inputNumber);
        console.log("Lista numeri chiamati: " + numeriChiamati);
    } else {
        alert("Numero " + inputNumber + " già presente!");
    }

} while ( isBombaTrovata == false && numeriChiamati.length < punteggioMax )



// ********************** Funzioni

// Controllo di validità su num input
function isValidInput(userInput, maxRange){
    if (isNaN(userInput)){
        return false;
    } else if (userInput < 0){
        return false;
    } else if (userInput > maxRange){
        return false;
    } else {
        return true;
    }
}

// General numero casuale
function generatoreNumCasuale(max){
    return Math.floor( Math.random(max) * 100 ) + 1;
}

// Verifica se un numero è presente nel array delle mine
function isInTheArray( selectedNumber, arrayInvolved){
    if (arrayInvolved.includes(selectedNumber) == true){
        return true;
    } else {
        return false;
    }
}
