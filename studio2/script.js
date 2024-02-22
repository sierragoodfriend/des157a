(function(){
    'use strict';

    let currentImage = 0;
    let currentPin = 0;

    const myPhotos = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg"];
    const myPins = ["pin1.png", "pin2.png", "pin3.png", "pin4.png", "pin5.png", "pin6.png", "pin7.png", ];

    const container = document.querySelector(`#content`);

    const nextBtn = document.querySelector(`#next`);
    const prevBtn = document.querySelector(`#previous`);

    nextBtn.addEventListener(`click`, function(event){
        event.preventDefault();

        currentPin++;
        if(currentPin > myPins.length - 1){
            currentPin = 0
        }

        currentImage++;
        if(currentImage > (myPhotos.length - 1)){
            currentImage = 0;
        }

        swapImg();
        swapPin(); 
    });

    prevBtn.addEventListener(`click`, function(event){
        event.preventDefault();

        currentPin--;
        if(currentPin < 0){
            currentPin = myPins.length - 1;
        }

        currentImage--;
        if(currentImage < 0){
            currentImage = myPhotos.length - 1;
        }

        swapImg();
    });

    function swapImg(){
        const newSlide = document.createElement(`img`);
        newSlide.src = `slides/${myPhotos[currentImage]}`;
        newSlide.className = `fadeinimg`;
        container.appendChild(newSlide);

        if(container.children.length > 2){
            container.removeChild(container.children[0]);
        }
    };

    function swapPin(){
        const newPin = document.createElement(`img`);
        newPin.src = `pins/${myPins[currentPin]}`;
        newPin.className = `pinStyles`;
        container.appendChild(newPin);

        if(container.children.length > 2){
            container.removeChild(container.children[0]);
        }
    };

})();