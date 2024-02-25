
const cell = document.querySelectorAll('.cell');
const container = document.querySelector('.container')
let currentPlay = 'X';
let gameEnded= false
cell.forEach(cell => {
    cell.addEventListener('click', play);
});
function play(event) {
    if (!gameEnded && event.target.textContent === '') {
        event.target.textContent = currentPlay;
        currentPlay = currentPlay === 'X' ? 'O' : 'X';
        winnerPlay();
    }
}
function winnerPlay() {
    let check = false;
    let winningPlayer = '';
    const columns = [
        [cell[0].textContent, cell[1].textContent, cell[2].textContent],
        [cell[3].textContent, cell[4].textContent, cell[5].textContent],
        [cell[6].textContent, cell[7].textContent, cell[8].textContent]
    ];
    for (const column of columns) {
        if (column[0] !== '' && column.every(element => element === column[0])) {
            check = true;
            winningPlayer = column[0];
            break;
        }
    }
    const rows = [
        [cell[0].textContent, cell[3].textContent, cell[6].textContent],
        [cell[1].textContent, cell[4].textContent, cell[7].textContent],
        [cell[2].textContent, cell[5].textContent, cell[8].textContent]
    ];
    for (const row of rows) {
        if (row[0] !== '' && row.every(element => element === row[0])) {
            check = true;
            winningPlayer = row[0];
            break;
        }
    }
    const diagonals = [
        [cell[0].textContent, cell[4].textContent, cell[8].textContent],
        [cell[2].textContent, cell[4].textContent, cell[6].textContent]
    ];
    for (const diagonal of diagonals) {
        if (diagonal[0] !== '' && diagonal.every(element => element === diagonal[0])) {
            check = true;
            winningPlayer = diagonal[0]; 
            break;
        }
    }
    const allCellsFilled = Array.from(cell).every(cell => cell.textContent !== '');
    if (allCellsFilled && !check) {
        let textWinner = document.createElement('h2');
        textWinner.textContent = 'Tie! No Winner';
        document.body.appendChild(textWinner);
        const containerButton = document.createElement('section');
        const button = document.createElement('button');
        button.textContent = 'Play Again?';
        containerButton.appendChild(button);
        document.body.appendChild(containerButton);
        button.addEventListener('click', playAgain);
        gameEnded = true;
        disableCell();
    }
    if (check) {
        let textWinner = document.createElement('h2');
        textWinner.textContent = winningPlayer === 'X' ? 'Player Winner 1' : 'Player Winner 2';
        document.body.appendChild(textWinner)
        const containerButton = document.createElement('section');
        const button = document.createElement('button');
        button.textContent = 'Play Again?';
        containerButton.appendChild(button);
        document.body.appendChild(containerButton);
        button.addEventListener('click', playAgain);
        gameEnded = true;
        disableCell();
    } 
}
function disableCell(){
    cell.forEach(cell=> {
        cell.removeEventListener('click',play)
    })
}
const playAgain = () => {
    const winnerHeader = document.querySelector('h2');
    if (winnerHeader) {
        winnerHeader.remove();
    }
    const containerButton = document.querySelector('section');
    if (containerButton) {
        containerButton.remove();
    }
    cell.forEach(cell => {
        cell.textContent = '';
    });
    gameEnded = false;
    cell.forEach(cell => {
        cell.addEventListener('click', play);
    });
}



