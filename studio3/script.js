(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector(`#startButton`);
    const h1Playing = document.querySelector(`#h1HomePage`);
    const footer = document.querySelector(`.footerStyles`); 
    const player1Score = document.querySelector(`#player1ScoreContainer`);
    const player2Score = document.querySelector(`#player2ScoreContainer`);
    const player1 = document.querySelector(`#leftColumn`); 
    const player2 = document.querySelector(`#rightColumn`);
    const scorePerRound = document.querySelector(`#middleColumn`);
    const actionArea = document.querySelector(`#action`);
    const quitBtn = document.querySelector(`#quit`);
    // const winner = document.querySelector(`#winnerPopUp`);

    const displayDice = document.querySelector(`#dice`);

    const gameData = {
        dice: ['images/1die.jpg', 'images/2die.jpg', 'images/3die.jpg', 'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        roundSum: [0, 0], //added round sum
        index: 0,
        gameEnd: 49
    };

    //function that starts & sets up the game when clicking start on home page
    startGame.addEventListener(`click`, function(){
        //new styles for header
        h1Playing.style.width = `100%`;
        h1Playing.style.height = `100px`;
        h1Playing.style.backgroundColor = `rgb(234, 199, 235)`;

        //remove footer styles
        footer.style.display = `none`;

        //remove outer column classes
        player1.classList.remove(`outerColumns`); 
        player2.classList.remove(`outerColumns`);

        //middle column styles
        scorePerRound.style.backgroundColor = `rgba(212, 138, 213, 0.64)`;
        scorePerRound.style.border = `4px rgb(212, 138, 213) solid`;
        scorePerRound.style.width = `200px`;
        scorePerRound.style.height = `40px`;
        scorePerRound.style.fontSize = `80px`;
        scorePerRound.style.color = `rgb(79, 29, 67)`;
        scorePerRound.style.paddingTop = `40px`;
        scorePerRound.style.marginTop = `35px`;
        
        //Update player 1 and 2 scores for HTML
        updatePlayerScore();

        player1.innerHTML = `<img src="images/pigImgLeft.png" id="inGamePigImg0" alt="Cute Pig 1" width="230.7" height="206.9">`; //replace left side
        player2.innerHTML = `<img src="images/pigImgRight.png" id="inGamePigImg1" alt="Cute Pig 2" width="230.7" height="206.9">`; //replace right side
        //middle column

        scorePerRound.innerHTML = `${gameData.roundSum[gameData.index]}`; //show roundsum in middle column

        //make quit button appear during game play
        quitBtn.classList.remove(`displayQuit`);
        quitBtn.addEventListener(`click`, function(){
            location.reload();
        })
        setUpTurn();
    });

    //Announces who's turn it is, and adds roll dice button – throwDice(); gets run when Roll Dice! is pressed
    function setUpTurn(){

            //add & delete class animation on pigs depending on whose turn it is
            const currentPlayer = document.querySelector(`#inGamePigImg${gameData.index}`);
            currentPlayer.classList.add(`playingPigAnimation`);
            const otherPlayer = document.querySelector(`#inGamePigImg${gameData.index === 0 ? 1 : 0}`); //turn off other animation – returns 1 (condition is true) if gameData.index = 0, and 0 if otherwise (gameData.index = 1)
            otherPlayer.classList.remove(`playingPigAnimation`);

            h1Playing.innerHTML = `${gameData.players[gameData.index]}'s turn`; //change turns 

            actionArea.innerHTML = `<button class="roll">Roll Dice !</button>`;

            document.querySelector(`.roll`).addEventListener(`click`, function(){

            throwDice();
        })
    };

    //runs through all possible dice rolls and their consequences / affect on scoring
    function throwDice(){
        actionArea.innerHTML = ``;
        gameData.roll1 = Math.floor(Math.random() * 6 + 1); //Math.floor() rounds down
        gameData.roll2 = Math.floor(Math.random() * 6 + 1); //gives nums between 1-6
        displayDice.innerHTML = `<img src="${gameData.dice[gameData.roll1 - 1]}"><img src="${gameData.dice[gameData.roll2 - 1]}">`; //show dice rolled on page
        gameData.rollSum = gameData.roll1 + gameData.roll2; //total of that roll

        if(gameData.rollSum === 2){
            //edit look of header
            h1Playing.innerHTML = `SNAKE EYES!`
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); 
            scorePerRound.innerHTML = 0; //set roundSum scoring back to

            gameData.roundSum[gameData.index] = 0; //reset middle num

            //Update player 1 and 2 scores for HTML
            updatePlayerScore();
            
            setTimeout(setUpTurn, 2000);

        } else if(gameData.roll1 === 1 || gameData.roll2 === 1){

            //edit look of header
            h1Playing.innerHTML = `A 1 was rolled`

            scorePerRound.innerHTML = 0; //set roundSum scoring back to zero

            gameData.roundSum[gameData.index] = 0; //reset middle num

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switch players

            setTimeout(setUpTurn, 2000);

        } else {

            h1Playing.innerHTML = `You rolled a ${gameData.rollSum}`

            gameData.roundSum[gameData.index] += gameData.rollSum; //calculate roundSum

            scorePerRound.innerHTML = `${gameData.roundSum[gameData.index]}`; //show roundsum in middle column

            updatePlayerScore();
;
            actionArea.innerHTML = `<button id="rollagain" class="roll">Roll Again?</button><button id="pass" class="roll">Pass</button>`;

            //roll again button
            document.querySelector(`#rollagain`).addEventListener(`click`, function(){

                setUpTurn();

            });

            //Pass button – passing a turn adds your roundSum score to your total score up at the top
            document.querySelector(`#pass`).addEventListener(`click`, function(){
                gameData.score[gameData.index] += gameData.roundSum[gameData.index]; //score equal to the round sum when passing
                gameData.roundSum[gameData.index] = 0;
                const currentPlayerScore = gameData.index === 0 ? player1Score : player2Score; //if it's player 1's turn, currentPlayerScore = player1Score, if not, then currentPlayerScore = player2Score
                currentPlayerScore.innerHTML = gameData.score
                updatePlayerScore();
                [gameData.index]; //update score array & HTML on page
                gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switch players
                scorePerRound.innerHTML = 0;
                setUpTurn();
            });

            console.log(gameData.score);
        }
    }

    function updatePlayerScore() {
        player1Score.innerHTML = `Player 1<br>${gameData.score[0]}`; 
        player2Score.innerHTML = `Player 2<br>${gameData.score[1]}`;
    }

    //still to create fix winning condition

})();



// reload 
// gameControl.innerHTML += `<button id="quit">Wanna Quit?</button>`;

//         document.getElementById(`quit`).addEventListener(`click`, function(){
//             location.reload();
//         });