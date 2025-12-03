// Žaidimo būsena
const game = {
    playerName: '',
    difficulty: 'medium',
    moves: 0,
    matchedPairs: 0,
    totalPairs: 0,
    startTime: null,
    timerInterval: null,
    flippedCards: [],
    canFlip: true
};

// Emoji simboliai kortelėms (galima naudoti bet kokius simbolius)
const symbols = {
    easy: ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸'],
    medium: ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎹'],
    hard: ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎹', '🎲', '🎰', '🎳', '🎣']
};

// DOM elementai
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const winScreen = document.getElementById('winScreen');
const playerNameInput = document.getElementById('playerName');
const difficultySelect = document.getElementById('difficulty');
const startButton = document.getElementById('startButton');
const quitButton = document.getElementById('quitButton');
const playAgainButton = document.getElementById('playAgainButton');
const mainMenuButton = document.getElementById('mainMenuButton');
const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const pairsDisplay = document.getElementById('pairs');
const timerDisplay = document.getElementById('timer');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const currentDifficultyDisplay = document.getElementById('currentDifficulty');

// Nielsen euristikos principai:
// 1. Visibility of system status - rodomas laikas, ėjimai, poros
// 2. Match between system and real world - aiškūs lietuviški pavadinimai
// 3. User control and freedom - galima baigti žaidimą bet kada
// 4. Consistency and standards - standartinė kortelių žaidimo logika
// 5. Error prevention - negalima spauskite daugiau nei 2 korteles vienu metu
// 6. Recognition rather than recall - visos būsenos rodomos ekrane
// 7. Flexibility and efficiency - skirtingi sunkumo lygiai
// 8. Aesthetic and minimalist design - švarus, aiškus dizainas

// Inicializavimas
document.addEventListener('DOMContentLoaded', () => {
    loadBestScores();
    setupEventListeners();
    
    // Automatiškai įkelti vardą iš localStorage (jei yra)
    const savedName = localStorage.getItem('lastPlayerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
});

function setupEventListeners() {
    startButton.addEventListener('click', startGame);
    quitButton.addEventListener('click', quitGame);
    playAgainButton.addEventListener('click', playAgain);
    mainMenuButton.addEventListener('click', showMainMenu);
    
    // Enter klavišas pradeda žaidimą
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startGame();
    });
}

function startGame() {
    // Validacija
    const name = playerNameInput.value.trim();
    if (!name) {
        playerNameInput.focus();
        playerNameInput.style.borderColor = 'red';
        setTimeout(() => playerNameInput.style.borderColor = '', 2000);
        return;
    }
    
    // Išsaugoti vardą
    game.playerName = name;
    localStorage.setItem('lastPlayerName', name);
    
    game.difficulty = difficultySelect.value;
    game.moves = 0;
    game.matchedPairs = 0;
    game.startTime = Date.now();
    game.canFlip = true;
    
    // Nustatyti porų skaičių pagal sunkumą
    switch(game.difficulty) {
        case 'easy':
            game.totalPairs = 6;
            break;
        case 'medium':
            game.totalPairs = 8;
            break;
        case 'hard':
            game.totalPairs = 12;
            break;
    }
    
    // Atnaujinti UI
    currentPlayerDisplay.textContent = game.playerName;
    currentDifficultyDisplay.textContent = getDifficultyName(game.difficulty);
    movesDisplay.textContent = '0';
    pairsDisplay.textContent = `0/${game.totalPairs}`;
    
    // Sukurti žaidimo lentą
    createBoard();
    
    // Pradėti laikmatį
    startTimer();
    
    // Rodyti žaidimo ekraną
    showScreen('game');
}

function getDifficultyName(difficulty) {
    const names = {
        easy: 'Lengvas',
        medium: 'Vidutinis',
        hard: 'Sunkus'
    };
    return names[difficulty] || difficulty;
}

function createBoard() {
    gameBoard.innerHTML = '';
    gameBoard.className = `game-board ${game.difficulty}`;
    
    // Gauti simbolius pagal sunkumą
    const selectedSymbols = symbols[game.difficulty];
    
    // Sukurti poras (kiekvienas simbolis po 2 kartus)
    const cards = [...selectedSymbols, ...selectedSymbols];
    
    // Išmaišyti korteles
    shuffleArray(cards);
    
    // Sukurti korteles DOM'e
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-face card-back">❓</div>
            <div class="card-face card-front">${symbol}</div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(card) {
    // Negalima versti jei:
    // - jau verčiamos 2 kortelės
    // - kortelė jau apversta
    // - kortelė jau surasta
    if (!game.canFlip || 
        card.classList.contains('flipped') || 
        card.classList.contains('matched')) {
        return;
    }
    
    // Apversti kortelę
    card.classList.add('flipped');
    game.flippedCards.push(card);
    
    // Jei apverstos 2 kortelės
    if (game.flippedCards.length === 2) {
        game.canFlip = false;
        game.moves++;
        movesDisplay.textContent = game.moves;
        
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = game.flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;
    
    if (symbol1 === symbol2) {
        // SUTAMPA!
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            game.matchedPairs++;
            pairsDisplay.textContent = `${game.matchedPairs}/${game.totalPairs}`;
            
            game.flippedCards = [];
            game.canFlip = true;
            
            // Patikrinti ar laimėta
            if (game.matchedPairs === game.totalPairs) {
                setTimeout(() => endGame(), 500);
            }
        }, 600);
    } else {
        // NESUTAMPA
        setTimeout(() => {
            card1.classList.add('wrong');
            card2.classList.add('wrong');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'wrong');
                card2.classList.remove('flipped', 'wrong');
                game.flippedCards = [];
                game.canFlip = true;
            }, 500);
        }, 800);
    }
}

function startTimer() {
    game.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - game.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (game.timerInterval) {
        clearInterval(game.timerInterval);
        game.timerInterval = null;
    }
}

function endGame() {
    stopTimer();
    
    const timeSeconds = Math.floor((Date.now() - game.startTime) / 1000);
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Skaičiuoti taškus (mažiau ėjimų ir laiko = daugiau taškų)
    const baseScore = 10000;
    const movesPenalty = game.moves * 50;
    const timePenalty = timeSeconds * 10;
    const difficultyBonus = game.difficulty === 'hard' ? 2000 : 
                           game.difficulty === 'medium' ? 1000 : 0;
    const score = Math.max(0, baseScore - movesPenalty - timePenalty + difficultyBonus);
    
    // Išsaugoti rezultatą
    saveScore(score, timeSeconds);
    
    // Rodyti rezultatus
    document.getElementById('winMessage').innerHTML = 
        `<p><strong>${game.playerName}</strong>, puikiai sužaidei!</p>`;
    document.getElementById('finalMoves').textContent = game.moves;
    document.getElementById('finalTime').textContent = timeString;
    document.getElementById('finalScore').textContent = Math.round(score);
    
    showScreen('win');
}

function saveScore(score, timeSeconds) {
    // Gauti esamus rezultatus iš sessionStorage
    let scores = JSON.parse(sessionStorage.getItem('memoryGameScores') || '[]');
    
    // Pridėti naują rezultatą
    scores.push({
        name: game.playerName,
        difficulty: game.difficulty,
        moves: game.moves,
        time: timeSeconds,
        score: Math.round(score),
        date: new Date().toISOString()
    });
    
    // Rūšiuoti pagal taškus (didėjančia tvarka)
    scores.sort((a, b) => b.score - a.score);
    
    // Saugoti tik top 10
    scores = scores.slice(0, 10);
    
    sessionStorage.setItem('memoryGameScores', JSON.stringify(scores));
}

function loadBestScores() {
    const scores = JSON.parse(sessionStorage.getItem('memoryGameScores') || '[]');
    const container = document.getElementById('scoresContainer');
    
    if (scores.length === 0) {
        container.innerHTML = '<p class="no-scores">Dar nėra rezultatų</p>';
        return;
    }
    
    container.innerHTML = scores.map((score, index) => {
        const minutes = Math.floor(score.time / 60);
        const seconds = score.time % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        return `
            <div class="score-item">
                <span class="score-rank">${index + 1}.</span>
                <span class="score-name">${score.name}</span>
                <span class="score-details">
                    ${getDifficultyName(score.difficulty)} | 
                    ${score.moves} ėj. | 
                    ${timeString} | 
                    <strong>${score.score} tšk.</strong>
                </span>
            </div>
        `;
    }).join('');
}

function quitGame() {
    if (confirm('Ar tikrai norite baigti žaidimą?')) {
        stopTimer();
        showMainMenu();
    }
}

function playAgain() {
    startGame();
}

function showMainMenu() {
    stopTimer();
    loadBestScores();
    showScreen('start');
}

function showScreen(screenName) {
    startScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    winScreen.classList.remove('active');
    
    switch(screenName) {
        case 'start':
            startScreen.classList.add('active');
            break;
        case 'game':
            gameScreen.classList.add('active');
            break;
        case 'win':
            winScreen.classList.add('active');
            break;
    }
}

// Papildoma funkcija - nuvalyti rezultatus (testavimui)
function clearScores() {
    sessionStorage.removeItem('memoryGameScores');
    loadBestScores();
}

// Galima iškviesti konsolėje: clearScores()
