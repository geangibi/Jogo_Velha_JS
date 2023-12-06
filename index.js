let currentPlayer = "X"; // Você pode iniciar com X ou Y
let playerMoment = ""; // Adicionamos uma variável para armazenar o jogador da vez

function insertSymbol(button) {
    const dataValue = button.getAttribute("data-value");

    // verifica se o campo já foi marcado
    if (button.textContent === "") {
        button.textContent = currentPlayer;

        checkWinner();

        // Troca entre o Jogador X e O 
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        // Atualiza o jogador da vez
        updatePlayerMoment();
    } else {
        alert("Esse campo já foi marcado, por favor marque outra peça");
    }
}

document.getElementById('addPlayer').addEventListener('click', addPlayer);

function addPlayer() {
    const playerOneName = document.getElementById('playerOne').value;
    const playerTwoName = document.getElementById('playerTwo').value;

    // Inicialmente, playerMoment será igual a playerOneName
    playerMoment = playerOneName;

    const title = document.createElement('text');
    const playersList = document.getElementById('players');
    const listItemOne = document.createElement('li');
    const listItemTwo = document.createElement('li');
    const playerMomentTitle = document.createElement('text');
    const playerMomentDisplay = document.createElement('li'); // Elemento para exibir o jogador da vez

    title.innerText = 'Jogadores:';
    playerMomentTitle.innerText = 'Jogador da vez:';
    listItemOne.textContent = '1° JOGADOR: ' + playerOneName;
    listItemTwo.textContent = '2° JOGADOR: ' + playerTwoName;
    playerMomentDisplay.textContent = playerMoment; // Inicialmente, exibimos o jogador da vez

    playersList.appendChild(title);
    playersList.appendChild(listItemOne);
    playersList.appendChild(listItemTwo);
    playersList.appendChild(playerMomentTitle);
    playersList.appendChild(playerMomentDisplay);
}

function updatePlayerMoment() {
    // Atualiza o jogador da vez no elemento HTML correspondente
    const playerMomentDisplay = document.querySelector('#players li:nth-child(5)');
    playerMoment = currentPlayer === "X" ? document.getElementById('playerOne').value : document.getElementById('playerTwo').value;
    playerMomentDisplay.textContent = playerMoment;
}

function clearGame() {
    // Clear the game board
    const buttons = document.querySelectorAll('.key');
    buttons.forEach(button => {
        button.textContent = "";
        button.style.color = '';
        button.style.backgroundColor = '';
    });


    // Limpa o nome dos jogadores
    const playerOneInput = document.getElementById('playerOne');
    const playerTwoInput = document.getElementById('playerTwo');
    const playersList = document.getElementById('players');

    playerOneInput.value = "";
    playerTwoInput.value = "";

    const title = playersList.querySelector('text');
    const listItemOne = playersList.querySelector('li:nth-child(2)');
    const listItemTwo = playersList.querySelector('li:nth-child(3)');
    const playerMomentTitle = playersList.querySelector('text:nth-child(4)'); // Atualizado para a 4ª posição
    const playerMomentDisplay = playersList.querySelector('li:nth-child(5)'); // Atualizado para a 5ª posição


        playersList.removeChild(title);
        playersList.removeChild(listItemOne);
        playersList.removeChild(listItemTwo);
        playersList.removeChild(playerMomentTitle);
        playersList.removeChild(playerMomentDisplay);
   
}

// Reinciiar o jogo
document.getElementById('restart').addEventListener('click', clearGame);

function checkWinner() {
    const buttons = document.querySelectorAll('.key');
    const board = [];

    // Crie uma matriz representando o tabuleiro atual
    buttons.forEach(function(button) {
        board.push(button.textContent);
    });

    // Define as combinações vencedoras
    const matrizGanhador = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Verifique se alguma combinação vencedora foi alcançada
    for (const combo of matrizGanhador) { 
        const [a, b, c] = combo; // Extrai o valor do comba em um array 
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`Parabéns! O jogador(a) ${playerMoment} venceu!`);
            //clearGame(); // Adicione esta linha se quiser reiniciar o jogo após alguém ganhar
            collorWinner(a, b, c)
            return;
        }
    }

    // Se todas as células estiverem preenchidas e nenhuma combinação vencedora for encontrada, é um empate
    if (board.every(function(cell) {
        return cell !== "";
    })) {
        alert("O jogo terminou em empate!");
        clearGame(); // Adicione esta linha se quiser reiniciar o jogo após um empate
    }
}

function collorWinner(a, b, c) {
    const cells = document.querySelectorAll('.key');
    cells[a].style.color = '#dd0606';
    cells[b].style.color = '#dd0606';
    cells[c].style.color = '#dd0606';

    cells[a].style.backgroundColor = '#f1f5f9';
    cells[b].style.backgroundColor = '#f1f5f9';
    cells[c].style.backgroundColor = '#f1f5f9';

  

}

