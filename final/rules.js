(function(){

    'use strict'

    console.log(`meow`);

    const nextBtn = document.querySelector(`#next`);
    const prevBtn = document.querySelector(`#prev`);
    const rulesContent = document.querySelector(`#rulesText`);
    const pageNumber = document.querySelector(`#h2Rules`);
    const rules = [
        `<ul>
        <li>Players: 2</li>
        <li>Goal: Be the first player to score 50+ points!</li>
        </ul>`,

        `<ul>
            <li>Players take turns rolling the dice.</li>
            <li>
                There are two conditions that can harm a player:
                <ul><br>
                <div id=flexHarmfulRules>
                    <div class="flexRuleImg">
                    <li>If either dice is a one, the player loses all the points they earned that round, and end their turn.</li>
                    <img src="images/1die.png" alt="1 Die" class="diceImagesRulesPg">
                    </div>
                    <div class="flexRuleImg">
                    <li>If both dice are a one (snake eyes), the player loses all points that they have earned throughout the game, and end their turn.</li>
                    <div>
                    <img src="images/1die.png" alt="1 Die" class="diceImagesRulesPg">
                    <img src="images/1die.png" alt="1 Die" class="diceImagesRulesPg">
                    </div>
                    </div>
                </div>
                </ul>
            </li>
        </ul>`,

        `<ul
            <li>If neither of these conditions occur, the total of the dice will be added to the player's score for that round.</li>
            <li>Round scores accumulate in this box:</li>
            <img src="images/roundScore.png" alt="Round Score" width="300px" height="172px" id=flexRoundScoreRules>
        </ul>`,

        `<ul>
            <li>
                The player can then choose to:
            </li><br>
                <ul>
                <div id="centerPg4Rules">
                    <li class="takeAwayListStyle"><div class="rulesBtnExample">Roll Again!</div> </li>
                    <li class="takeAwayListStyle">OR</li>
                    <li class="takeAwayListStyle"><div class="rulesBtnExample">Pass</div> their turn</li><br>
                <div>
                </ul>
            <li>Upon passing, the points the player has earned in that round will be added to their total score</li>
        </ul>`,

        `<ul>
            <li>Remember, if you roll a 1, the points you've earned during your turn will be lost. Sometimes it can be smart to pass your turn and keep those points safe!</li>
        </ul>`,

        `<ul>
            <li>And that's it! Have fun ツ</li>
        </ul>`
    ];
    const pageNum = [`1`, `2`, `3`, `4`, `5`, `6`]; //page number
    let ruleIndex = 0;

    //html on page changes with buttons
    nextBtn.addEventListener(`click`, function(){
        if(ruleIndex < rules.length - 1){
            ruleIndex++;
            rulesContent.innerHTML = rules[ruleIndex];
            //page number changes
            pageNumber.innerHTML = pageNum[ruleIndex];
        } else {
            ruleIndex = 0;
            rulesContent.innerHTML = rules[ruleIndex];
            //page num back to 1 as well
            pageNumber.innerHTML = pageNum[ruleIndex];
        }
    });

    prevBtn.addEventListener(`click`, function(){
        if(ruleIndex > 0){
            ruleIndex--;
            rulesContent.innerHTML = rules[ruleIndex];
            pageNumber.innerHTML = pageNum[ruleIndex];
        } else {
            ruleIndex = rules.length - 1;
            rulesContent.innerHTML = rules[ruleIndex];
            pageNumber.innerHTML = pageNum[ruleIndex];
        }
    });

})();