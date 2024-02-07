(function(){
'use strict';

const madLibArticle = document.querySelector(`#madlib`);
const formTag = document.querySelector(`form`);
const btn = document.querySelector(`button`);
const nonPopUpElements = document.querySelector(`#flexbox-container`);


formTag.addEventListener(`submit`, function(event){

    event.preventDefault();

    const restaurant = document.querySelector(`#restaurant`).value;
    const adj1 = document.querySelector(`#adj1`).value;
    const color = document.querySelector(`#color`).value;
    const adj2 = document.querySelector(`#adj2`).value;
    const sauce = document.querySelector(`#sauce`).value;
    const personalitytrait = document.querySelector(`#personalitytrait`).value;
    const number = document.querySelector(`#number`).value;
    const dessert = document.querySelector(`#dessert`).value;
    const animal = document.querySelector(`#animal`).value;
    const car = document.querySelector(`#car`).value;
    const adj3 = document.querySelector(`#adj3`).value;
    const willwont = document.querySelector(`#willwont`).value;

    let myText;
    if(restaurant == ``) {
        myText = `Please provide the name of a restaurant`;
        document.querySelector(`#restaurant`).focus();
    } else if(adj1 == ``) {
        myText = `Please provide an adjective`;
        document.querySelector(`#adj1`).focus();
    } else if(color == ``) {
        myText = `Please provide a color`;
        document.querySelector(`#color`).focus();
    } else if(adj2 == ``) {
        myText = `Please provide an adjective`;
        document.querySelector(`#adj2`).focus();
    } else if(sauce == ``) {
        myText = `Please provide a type of sauce`;
        document.querySelector(`#sauce`).focus();
    } else if(personalitytrait == ``) {
        myText = `Please provide a personality trait`;
        document.querySelector(`#personalitytrait`).focus();
    } else if(number == ``) {
        myText = `Please provide a number`;
        document.querySelector(`#number`).focus();
    } else if(dessert == ``) {
        myText = `Please provide a dessert`;
        document.querySelector(`#dessert`).focus();
    } else if(animal == ``) {
        myText = `Please provide an animal`;
        document.querySelector(`#animal`).focus();
    } else if(car == ``) {
        myText = `Please provide a type of car`;
        document.querySelector(`#car`).focus();
    } else if(adj3 == ``) {
        myText = `Please provide an adjective`;
        document.querySelector(`#adj3`).focus();
    } else if(willwont == ``) {
        myText = `Please select "will" or "won't"`;
        document.querySelector(`#willwont`).focus();
    } else {

        madLibArticle.className = `madlibstyles`;
        madLibArticle.style.color = `black`;
        nonPopUpElements.style.opacity = `0%`;
        
        document.querySelector(`#overlay`).style.display = `block`;
        document.querySelector(`button`).style.display = `block`;
   
        myText = `Eating at ${restaurant} is a ${adj1} experience.
        The interior of the restaurant is 100% ${color}, and weirdly ${adj2}.
        The wait staff are particularly ${personalitytrait}. They made sure my food always arrived within ${number} minutes of ordering, and they even gave me an extra side of ${sauce} for my ${dessert}. Unfortunately, they don’t allow pets, so my ${animal} had to wait in my ${car}. Overall, I had a ${adj3} experience here, and ${willwont} be coming back again!`

        document.querySelector(`#restaurant`).value = ``;
        document.querySelector(`#adj1`).value = ``;
        document.querySelector(`#color`).value = ``;
        document.querySelector(`#adj2`).value = ``;
        document.querySelector(`#sauce`).value = ``;
        document.querySelector(`#personalitytrait`).value = ``;
        document.querySelector(`#number`).value = ``;
        document.querySelector(`#dessert`).value = ``;
        document.querySelector(`#animal`).value = ``;
        document.querySelector(`#car`).value = ``;
        document.querySelector(`#adj3`).value = ``;
        document.querySelector(`#willwont`).value = ``;
    }

    btn.addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector(`#overlay`).style.display = `none`;
        document.querySelector(`button`).style.display = `none`;
        madLibArticle.classList.remove(`madlibstyles`);
        madLibArticle.innerHTML = ``;
        madLibArticle.style.color = `rgb(249, 249, 130)`;
        nonPopUpElements.style.opacity = `100%`;
    });

    madLibArticle.innerHTML = myText;


});


})();