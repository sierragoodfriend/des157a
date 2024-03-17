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
    const middleColumnContainer = document.querySelector(`#flexWrapColumns`);
    const actionArea = document.querySelector(`#action`);
    const quitBtn = document.querySelector(`#quit`);
    const winnerPopUp = document.querySelector(`#youWon`);
    const displayDice = document.querySelector(`#dice`);

    const diceRollSound = new Audio(`sounds/dice.mp3`);
    const pigSound1 = new Audio(`sounds/pigGrunt1.mp3`);
    const pigSound2 = new Audio(`sounds/pigGrunt2.mp3`);
    const snakeEyesBuzzerSound = new Audio(`sounds/wrongBuzzer.mp3`);
    const backgroundMusicSound = new Audio(`sounds/backgroundMusic.mp3`);
    const trumpetSound = new Audio(`sounds/winningTrumpets.mp3`);

    console.log(`rawr`);

    const gameData = {
        dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 'images/4die.png', 'images/5die.png', 'images/6die.png'],
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
        // make background music play when game starts
        backgroundMusicSound.play();
        backgroundMusicSound.loop = true;

        //display player score containers
        player1Score.style.display = `block`;
        player2Score.style.display = `block`;

        //new styles for header
        h1Playing.style.width = `100%`;
        h1Playing.style.backgroundColor = `rgb(234, 199, 235)`;

        //remove footer styles
        footer.style.height = `6vh`;

        //remove outer column classes
        player1.classList.remove(`outerColumns`); 
        player2.classList.remove(`outerColumns`);

        //round score styles
        scorePerRound.style.backgroundColor = `rgba(212, 138, 213, 0.64)`;
        scorePerRound.style.border = `4px rgb(212, 138, 213) solid`;
        scorePerRound.style.width = `200px`;
        scorePerRound.style.height = `40px`;
        scorePerRound.style.fontSize = `80px`;
        scorePerRound.style.color = `rgb(79, 29, 67)`;
        scorePerRound.style.paddingTop = `40px`;
        scorePerRound.style.marginTop = `35px`;
        scorePerRound.style.fontFamily = `"Anta", sans-serif`;

        //Update player 1 and 2 scores for HTML
        updatePlayerScore();

        //put pigs on the page
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
        player1Score.innerHTML = `Player 1<br>${gameData.score[0]}`;
        player2Score.innerHTML = `Player 2<br>${gameData.score[1]}`;
            //take off class that makes round score 0px
            scorePerRound.classList.remove(`shrinkRoundScore`);

            //reset round score;
            scorePerRound.innerHTML = 0;

            //remove class that expands player score so it can get added again
            if(gameData.index === 0) {
                player2Score.classList.remove(`playerScoreExpandContrast`);
            } else {
                player1Score.classList.remove(`playerScoreExpandContrast`);
            }

            //when 1 or snake eyes is rolled, margins have to change to center the die, so these margin edits correct the spacing afterwards to continue game play
            displayDice.style.marginTop = `0px`;
            quitBtn.style.marginTop = `85.5px`;

            //stop displaying dice after a players turn
            displayDice.innerHTML = ``;

            //keep spacing the same for where quit btn and other btns are
            h1Playing.style.marginBottom = `83.3px`;
            middleColumnContainer.style.marginBottom = `50px`;

            //reset margin-top for quit button in case 1 was rolled
            quitBtn.style.marginTop = `15px`;

            //add & delete class animation on pigs depending on whose turn it is
            const currentPlayer = document.querySelector(`#inGamePigImg${gameData.index}`);
            currentPlayer.classList.add(`playingPigAnimation`);
            const otherPlayer = document.querySelector(`#inGamePigImg${gameData.index === 0 ? 1 : 0}`); //turn off other animation – returns 1 (condition is true) if gameData.index = 0, and 0 if otherwise (gameData.index = 1)
            otherPlayer.classList.remove(`playingPigAnimation`);

            h1Playing.innerHTML = `${gameData.players[gameData.index]}'s turn`; //change turns 

            actionArea.innerHTML = `<button class="roll">Roll Dice!</button>`;

            document.querySelector(`.roll`).addEventListener(`mousedown`, function(){
            diceRollSound.play();
            });

            document.querySelector(`.roll`).addEventListener(`click`, function(){
            throwDice();
            });
    };

    //spacing needs to change when buttons are taken out (which avoids glitching if player spam clicks)
    function editSpacingDiceAndQuitButtons() {
        //edit margin bottom of dice images so dice are centered
        displayDice.style.marginTop = `45px`;

        //margin-top for quit btn so spacing doesn't change when 1 is rolled
        quitBtn.style.marginTop = `45.5px`;
    }

    //runs through all possible dice rolls and their consequences / affect on scoring
    function throwDice(){
        //header and flexcontainer (for roundscore area) has less margin bottom so lower buttons can fit
        h1Playing.style.marginBottom = `40.3px`;
        middleColumnContainer.style.marginBottom = `0px`;

        //math for rolls of die when they're thrown
        gameData.roll1 = Math.floor(Math.random() * 6 + 1); //Math.floor() rounds down
        gameData.roll2 = Math.floor(Math.random() * 6 + 1); //gives nums between 1-6

        displayDice.innerHTML = `<img src="${gameData.dice[gameData.roll1 - 1]}"><img src="${gameData.dice[gameData.roll2 - 1]}">`; //show dice rolled on page
        gameData.rollSum = gameData.roll1 + gameData.roll2; //total of that roll

        if(gameData.rollSum === 2){
            //if snake eyes are rolled take away buttons to avoid glitching
            actionArea.innerHTML = ``;

            editSpacingDiceAndQuitButtons();

            //make snake eyes buzzer play
            snakeEyesBuzzerSound.play();

            h1Playing.innerHTML = `SNAKE EYES!`
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); 
            scorePerRound.innerHTML = 0; //set roundSum scoring back to

            gameData.roundSum[gameData.index] = 0; //reset middle num

            //Update player 1 and 2 scores for HTML
            updatePlayerScore();
            
            setTimeout(switchingPlayers, 2000);

        } else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            //if 1 is rolled take away buttons to avoid glitching
            actionArea.innerHTML = ``;

            editSpacingDiceAndQuitButtons();

            //edit look of header
            h1Playing.innerHTML = `A 1 was rolled`

            scorePerRound.innerHTML = 0; //set roundSum scoring back to zero

            gameData.roundSum[gameData.index] = 0; //reset middle num

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switch players

            setTimeout(switchingPlayers, 1100);

        } else {

            h1Playing.innerHTML = `You rolled a ${gameData.rollSum}`

            gameData.roundSum[gameData.index] += gameData.rollSum; //calculate roundSum

            scorePerRound.innerHTML = `${gameData.roundSum[gameData.index]}`; //show roundsum in middle column

            updatePlayerScore();
;
            actionArea.innerHTML = `<button id="rollagain" class="roll">Roll Again!</button><button id="pass" class="roll">Pass</button>`;

            //sound for rolling dice again
            document.querySelector(`#rollagain`).addEventListener(`mousedown`, function(){
            diceRollSound.play();
            });

            //roll again button
            document.querySelector(`#rollagain`).addEventListener(`click`, function(){
            throwDice();
            });

            //Pass button – passing a turn adds your roundSum score to your total score up at the top
            document.querySelector(`#pass`).addEventListener(`click`, function(){
                //take away roll again/pass buttons
                actionArea.innerHTML = ``;

                editSpacingDiceAndQuitButtons();

                h1Playing.innerHTML = `switching players...`;

                gameData.score[gameData.index] += gameData.roundSum[gameData.index]; //score equal to the round sum when passing
                gameData.roundSum[gameData.index] = 0;
                const currentPlayerScore = gameData.index === 0 ? player1Score : player2Score; //if it's player 1's turn, currentPlayerScore = player1Score, if not, then currentPlayerScore = player2Score
                currentPlayerScore.innerHTML = gameData.score;
                [gameData.index]; //update score array & HTML on page
                gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switch players

                //shrink the round score (0px font size) –> it will be reset to zero on set up turn
                scorePerRound.classList.add(`shrinkRoundScore`);

                //depending on who's turn it is, add the class that makes the player score expand and contrast
                if(gameData.index === 0) {
                    player2Score.classList.add(`playerScoreExpandContrast`);
                } else {
                    player1Score.classList.add(`playerScoreExpandContrast`);
                }
                updatePlayerScore();
                setTimeout(switchingPlayers, 1000)
            });
        }
    }

    function switchingPlayers() {
        //play pig sound
        if(gameData.index === 0) {
            pigSound1.play();
        } else if(gameData.index === 1){
            pigSound2.play();
        }

        h1Playing.innerHTML = `switching players...`
        setTimeout(setUpTurn, 1100);
    }

    function updatePlayerScore() {
        //check winning condition here
        //have pop-up display flex instead of hidden
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            //play winning trumpet sound!
            backgroundMusicSound.pause();
            trumpetSound.play();

            winnerPopUp.innerHTML = `Congrats ${gameData.players[gameData.index]}, you won with ${gameData.score[gameData.index]} points!<img src="images/youWonPig.png" alt="You won!" id="winningPigStyles"><button class="goHome">Play Again!</button>`;
            winnerPopUp.style.display = `flex`;

            //declare go home btn after it's added to html
            const goHomeBtn = document.querySelector(`.goHome`);

            goHomeBtn.addEventListener(`click`, function(){
                location.reload();
            });
        } else {
            //displays and updates player scores
            player1Score.innerHTML = `Player 1<br>${gameData.score[0]}`;
            player2Score.innerHTML = `Player 2<br>${gameData.score[1]}`;
        }
    }
 
})();











// /* h1 styles that are specific to Rules Page 
// see the .h1HomePageaAndRules class rules in the homepage section for other styles */
// #h1Rules {
//     width: 400px;
//     margin-bottom: 40px;
//     font-size: 50px;
//     padding: 10px;
//     text-align: center;
//     height: 60px;
//     width: 400px;
// }

// /* Main element of rules page
// pig image and buttons go next to each other with grid */
// #rules {
//     font-family: "Cute Font", sans-serif;
//     font-weight: 400;
//     font-size: 32px;
//     line-height: 32px;
//     margin-top: -70px; /* makes text higher up towards h1 */
//     display: grid;
//     grid-template-columns: 3fr 1fr; /* text column = 75% */
//     min-width: 900px;
//     margin-left: 50px;
// }

// /* sections of grid layout on rules page in main */
// #textSection, #imageSection {
//     padding: 30px 10px 10px 15px;
// }

// #rulesPigStyles {
//     margin-top: 120px;
// }

// .buttonsRulesPage {
//     display: inline-block;
//     margin: 20px 0px 0px 50px;
//     color: rgb(79, 29, 67);
//     background-color: rgb(253, 196, 205);
//     font-size: 34px;
//     padding: 15px;
//     outline: black solid 1px;
//     border-radius: 10px;
//     margin-bottom: 20px;
// }

// .buttonsRulesPage:hover {
//     cursor: pointer;
//     box-shadow: 5px 5px 5px rgba(79, 29, 67, 0.574);
// }
