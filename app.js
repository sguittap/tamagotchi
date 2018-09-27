const game = {
}

class tamagotchi {
    constructor(name){
        this.name = 'name';
        this.hunger = 0;
        this.tired = 0;
        this.boredom = 0;
        this.age = 1; 
        this.alive = true;
        this.evolved = false;  
    }
};

let pet = new tamagotchi();
let seconds = 0;

//functions
const createActionButtons=()=>{
    $('.actionButtons').append('<button class="food">FOOD</button>');
    $('.actionButtons').append('<button class="sleep">SLEEP</button>');
    $('.actionButtons').append('<button class="play">PLAY</button>');
};

const createStatus=()=>{
    $('.status').append('<div class="hunger">Hunger:<span class="hungerText"></span> </div>');
    $('.status').append('<div class="tired">Tired:<span class="tiredText"></span> </div>');
    $('.status').append('<div class="bored">Bored:<span class="boredText"></span> </div>');
    $('.status').append('<div class="age">Age:<span class="ageText"></span> </div>')
};

const death = ()=>{
    pet.alive = false;
    $('.status').empty();
    $('.actionButtons').empty()
    $('.monster').empty()
    $('.monster').append('<h2>' + `${pet.name} has died` + '</h2>')
    $('.monster').append('<img id="dead" src="https://i.imgur.com/jLKVwBr.gif"/>');
    clearInterval(game.timer);
};

const evolve=()=>{
    pet.evolved= true;
    if(pet.hunger < 6 && pet.tired < 6 && pet.boredom <6){
        $('.monster').empty()
        $('.monster').append('<img class="evo1" src="http://38.media.tumblr.com/8f8a50cfbec8e9574696e1493f76060b/tumblr_mq3fxxwYPY1rmu6i5o1_500.gif"/>');
        alert(`${pet.name} IS EVOLVING!!`)
    }else{
        $('.monster').empty()
        $('.monster').append('<img class="evo2" src="https://media.giphy.com/media/z3hGOo6KmATh6/giphy.gif"/>');
        alert(`${pet.name} IS EVOLVING!!`)
    }
    $('body').append('<h2 class="evolveMessage">' +`${pet.name} has evolved` + '</h2>')
};

const eventTimer = ()=>{
    seconds++;
    if(pet.age === 6 && pet.evolved === false){
            //evolve();
    }
    if(seconds % 5 === 0){
        pet.hunger++
        $('.hungerText').text(pet.hunger);
    }
    if(seconds % 5 === 0){
        pet.tired++;
        $('.tiredText').text(pet.tired);
    }
    if(seconds % 5 === 0){
        pet.boredom++;
        $('.boredText').text(pet.boredom);
    }
    if(seconds % 10 === 0){
        pet.age++;
        $('.ageText').text(pet.age);
    }
    if(pet.age % 20 === 0){
        pet.age++;
        }
    if(pet.hunger >= 15 || pet.tired >= 15 || pet.boredom >= 15 || pet.age >= 7){
        //death();
        }
};

const moveLeft=()=>{
    if(pet.alive === true){
        $(".monster").animate({"margin-left": "-500"}, 5000, moveLeftCenter);
    function moveLeftCenter() {
        $(".monster").animate({"margin-left": "+500"}, 5000, moveLeft);
        }
    }
};
   
//Game function
const runGame=()=>{
    $('.start-container').remove();
    $('#eggRoll').remove();
    $('.monster').append('<img id="first-monster" src="http://rs971.pbsrc.com/albums/ae193/DigitalDestinyClan/Digimon%20and%20Icon%20Sprites/Hex%20Code%20Digimon/Coronamonblueflame.gif~c200"/>');
    //moveLeft();
    createStatus();
    createActionButtons();
    game.timer = setInterval(eventTimer, 500);
};

//start game button
$('#start-game').on('click', ()=>{
    const $nameInput = $('input').val();
    pet.name = $nameInput;
    runGame();
})

//Event listener
$(document).on('click','.food',function(){  
    if(pet.hunger >= 2){
        pet.hunger -= 2;
        //pet.tired -= 1;
    }else {
        alert('Nah bruh, Im not hungry');
        return; 
    }
    $('.hungerText').text(pet.hunger);
})

$(document).on('click','.sleep',function(){
    if(pet.tired >= 2){
        pet.tired -= 2;
        //pet.boredom -= 1;
    }else{
        alert('Im not that sleepy')
        return;
    }
    $('.tiredText').text(pet.tired);
})

$(document).on('click','.play',function(){
    if(pet.boredom >= 5){
        pet.boredom -= 5;
        //pet.hunger += 1;
        //pet.tired += 1
    }else{
        alert('I dont wanna play right now')
        return;
    }
    $('.boredText').text(pet.boredom);
})

