/* 
    c = trebol
    d = diamons
    h = corazones
    s = espadas
*/

let deck = [];
const tipoCarta = ['C', 'D', 'H', 'S'];
const cartaEspecial = ['A', 'J', 'Q', 'K'];

/* Referencias */
const btnPedirCarta = document.querySelector('#new-card');
const btnNewGame = document.querySelector('#nuevo-game');
const btnStop = document.querySelector('#stop');

const smalls = document.querySelectorAll('small');

const divCartaJugador = document.querySelector('#jugador-cartas');
const divCartaComputadora = document.querySelector('#computadora-cartas');

/* Acumuludor */
let pJugador = 0;
let pComputadora = 0;

/* Funcion de Crear Deck */
const crearDeck = () => {

    /* Este for crea las cartas del 2 al 10 ,cualquier tipo */
    for (let i = 2; i <= 10; i++) {
        for (let carta of tipoCarta) {
            deck.push(i + carta);
        }
    }

    /* For crea las cartas para las especiales asignandoles un tipo */
    for (let carta of tipoCarta) {
        for (let esp of cartaEspecial) {
            deck.push(esp + carta);
        }
    }

    /* Revolotear el deck */
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

/* Esta funcion permite tomar una carta */
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas en el Deck'
    }

    const carta = deck.pop();
    return carta;
}
//pedirCarta()

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1); /* Elimina el ultimo valor 2D => 2 */
    return (valor === 'A') ? 11 :
        isNaN(valor) ? 10 : Number(valor);
}

const mostrarCarta = (carta) => {
    // <img class="carta" src="assets/img/3D.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/img/${carta}.png`;
    divCartaJugador.appendChild(imgCarta);
}

/* Logica de Computadora */
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();

        pComputadora += valorCarta(carta)
        smalls[1].textContent = pComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/img/${carta}.png`;
        divCartaComputadora.appendChild(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((pComputadora <= puntosMinimos) && puntosMinimos <= 21);

    setTimeout(() => {
        if (pComputadora === puntosMinimos) {
            alert('Empate')
        } else if (pComputadora > 21) {
            alert('Jugador Gana')
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana')
        } else {
            alert('Computadora Gana')
        }
    }, 2000);
}


/* Evento Click */
btnPedirCarta.addEventListener('click', () => {

    const carta = pedirCarta();

    pJugador += valorCarta(carta)
    smalls[0].textContent = pJugador;
    mostrarCarta(carta);

    if (pJugador > 21) {
        btnPedirCarta.disabled = true;
        btnStop.disabled = true;
        turnoComputadora(pJugador);
    } else if (pJugador === 21) {
        btnPedirCarta.disabled = true;
        turnoComputadora(pJugador);
    }


})

btnStop.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnStop.disabled = true;
    turnoComputadora(pJugador);
})


/* New Game */
btnNewGame.addEventListener('click', () => {

    deck = [];
    pComputadora = 0;
    pJugador = 0;
    smalls[0].textContent = 0;
    smalls[1].textContent = 0;
    btnPedirCarta.disabled = false;
    btnStop.disabled = false;
    deck = crearDeck();
    divCartaComputadora.innerHTML = '';
    divCartaJugador.innerHTML = '';

})