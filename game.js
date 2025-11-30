//              menu
const menu = document.getElementById('menu');
const startBtn = document.getElementById('startBtn');
const canvasWrapper = document.getElementById('canvas-wrapper');
const instructionOverlay = document.getElementById('instructionOverlay');
const startGameBtn = document.getElementById('startGameBtn');
let gamerunning = true;
console.log("mam nadzieję żę gierka jakkolwiek się spodoba"); console.log(":p"); console.log("~ osiem");
const stage2Btn = document.getElementById('startStage2Btn');
const score_write = document.getElementById('score1');
const score2 = document.getElementById('score2')
let current_presents = 0;
let cought_presents = 0;
const body = document.getElementById("body");
const ending1 = document.getElementById("ending1");
const ending2 = document.getElementById("ending2");
const ending3 = document.getElementById("ending3");
stage2Btn.addEventListener('click', () => {
    document.getElementById('stage2Overlay').style.display = 'none';
    score_write.style.display="none";
    score2.style.display="flex"
    body.style.backgroundImage='url(assets/pictures/presentsdrop.png)'
    canvasWrapper.style.backgroundColor = 'rgb(17,19,54)';
    // Boże jedyny 💀
    current_presents = score;    
    score2.innerHTML = "prezenty: " + current_presents;
    cought_presents = score;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameloop2();
});

startBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    canvasWrapper.style.display = 'block';
    score2.style.display = "none";
    instructionOverlay.style.display = 'flex';
    canvasWrapper.style.backgroundColor="rgb(135,108,37)"
    document.getElementById('body').style.backgroundImage = 'url(assets/pictures/workshop.png)'
});
startGameBtn.addEventListener('click', () => {
    instructionOverlay.style.display = 'none';
    gameloop();

    if (!interval) {
        interval = setInterval(() => {
            if (!gamerunning) {
            clearInterval(interval);
            interval = null;
            return;
        }
            t++;
            presents.push(new Present());
            
        }, Math.floor((Math.random() * 3000) + 1500));
    }
});

//              gra
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const keys = {
    left: false,
    right: false
};

document.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
});

document.addEventListener('keyup', e => {
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

// klasa prezentu 

class Present {
    constructor() {
        this.width = 16;
        this.height = 23;
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.frame = 0;
        this.speed = 1;
        if (t >= 10 && t < 20) this.speed = 1.5;
        if (t >= 20 && t < 25) this.speed = 2;
        if (t >= 25 && t < 30) this.speed = 3;
        if (t >= 30) this.speed = 4;

        this.update = () => {
            this.frame++;
            if (this.frame % 1 === 0) {
                this.y += this.speed;
            }
        }

        this.draw = () => {
             ctx.drawImage(document.getElementById('present'), this.x, this.y, this.width, this.height)
        }
    }
}

//klasa Mikołaja

class Santa {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.width = 32;
        this.height = 35;
        this.frame = 0;
        this.movementSpeed = 3 * 2;

        this.update = () => {
            

            if (this.x < 0) this.x = 0;
            if (this.x + 30 > canvas.width)
                this.x = canvas.width - 30;
        }

        this.draw = () => {
            ctx.drawImage(document.getElementById('santa'), this.x, this.y, this.width, this.height)
        }
    }
}

//klasa czapki mikołaja (idk)

class Hat {
    constructor() {
        this.width = 32;
        this.height = 14;
        this.frame = 0;
        this.movementSpeed = 30;

        this.update = () => {
            this.x = santa.x;
            this.y = santa.y - this.height;

            if (this.x < 0) this.x = 0;
            if (this.x + this.width > canvas.width)
                this.x = canvas.width - this.width;
        }

        this.draw = () => {
            ctx.drawImage(document.getElementById('santahat'), this.x, this.y, this.width, this.height)
       
        }
    }
}

// zmienne
const presents = [];
let t = 0;
let interval = null;

const santa = new Santa();
const hat = new Hat();

let score = 0;
score_write.innerHTML = "wynik: " + score;

// łapanie prezentów
function isColliding(present, hat) {
    return (
        present.x < hat.x + hat.width &&
        present.x + present.width > hat.x &&
        present.y < hat.y + hat.height &&
        present.y + present.height > hat.y
    );
}

// pętla gry
let frame = 0;
function gameloop() {

    frame++;
    if (frame % 2 === 0) {
        if (keys.left) santa.x -= santa.movementSpeed;
        if (keys.right) santa.x += santa.movementSpeed;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = presents.length - 1; i >= 0; i--) {
        const present = presents[i];
        present.update();
        present.draw();

        if (present.y + present.height >= canvas.height) {
        gamerunning = false;   
        document.getElementById('stage2Overlay').style.display = 'flex'; 
        return; 
        
    }

        if (isColliding(present, hat)) {
            score++;
            score_write.innerHTML = "wynik: " + score;
            presents.splice(i, 1);
        }
        
    }

    santa.update();
    santa.draw();
    hat.update();
    hat.draw();

    requestAnimationFrame(gameloop);
}
let presentstodrop = [];
let hit = 0;
//kontrolki
    let canDrop = true
    document.addEventListener('keydown', e => {
    if (e.code === "Space" && canDrop) {
        dropPresent();
        canDrop = false; 
    }
});
    document.addEventListener('keyup', e => {
    if (e.code === "Space") {
        canDrop = true; 
    }
});
    
//sanie
    class Sleight{
        constructor(){
        this.width = 120;
        this.height = 60;
        this.x = canvas.width - 160;
        this.y = 40;
        this.frame = 0;
        this.baseY = this.y;     
        this.amplitude = 5;    
        this.speedY = 0.05;      

        this.update = () => {
            this.frame++;
            
            if(this.frame % 4 === 0){
            this.y = this.baseY + Math.sin(this.frame * this.speedY) * this.amplitude;    
            }
            

            if (this.x < 0) this.x = 0;
            if (this.x + 30 > canvas.width)
                this.x = canvas.width + 60;
        }

        this.draw = () => {
            ctx.drawImage(document.getElementById('sleight'), this.x, this.y, this.width, this.height)
        }
    }
    }
//renifery
    class Reindeers{
        constructor(){
        this.width = 80;
        this.height = 60;
        this.frame = 0;
        this.movementSpeed = 30;

        this.update = () => {
            this.x = sleight.x - this.width;
            this.y = sleight.y;

            if (this.x < 0) this.x = 0;
            if (this.x + this.width > canvas.width)
                this.x = canvas.width - this.width;
        }

        this.draw = () => {
            ctx.drawImage(document.getElementById('reindeer'), this.x, this.y, this.width, this.height)
        }
    }
    }

    //komin
    class Chimney {
    constructor() {
    let chimney_speed = 1; 
    this.width = 30;
    this.height = 40;
    this.x = 0;
    this.y = canvas.height - this.height;
    this.speedX = chimney_speed;

    
    this.topX = this.x - this.width / 2;
    this.topY = this.y - 10;
    this.topWidth = this.width * 2;
    this.topHeight = 10;
    }

    update() {
    this.x += this.speedX;
    this.topX = this.x - this.width / 2;
    this.topY = this.y - 10;
    }

    draw() {
        ctx.drawImage(document.getElementById('kominspod'), this.x, this.y, this.width, this.height)
       ctx.drawImage(document.getElementById('KominGora'), this.x + -this.width/2, this.y - 10, this.width*2, 10)
    
    }
}
    
//prezenty od mikolaja
    class Presenttodrop {
    constructor(x, y) {
        this.width = 16;
        this.height = 23;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.ySpeed = 2;
    }

    update() {
        this.frame++;
        if (this.frame % 2 === 0) {
            this.y += this.ySpeed;
        }
    }

    draw() {
        ctx.drawImage(document.getElementById('present'), this.x, this.y, this.width, this.height)
    }
}

    
    const sleight = new Sleight();
    const reindeers = new Reindeers();

    const chimneys = [];
    let spawnInterval = 3000;


    function spawnChimney() {
    chimneys.push(new Chimney());

    spawnInterval = Math.max(1000, spawnInterval + 100);

    setTimeout(spawnChimney, spawnInterval);
    }


   function dropPresent() {
    if(current_presents > 0){
        const p = new Presenttodrop(sleight.x + 50, sleight.y + 60);   
        presentstodrop.push(p);

        current_presents--;
        score2.innerHTML = "prezenty: " + current_presents; 
    }
}

//teścik szablonu
function isCollidingRect(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}





function gameloop2() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.y = 0; 
    this.x = 0;


    sleight.update();
    sleight.draw();

    reindeers.update();
    reindeers.draw();

    for (let i = presentstodrop.length - 1; i >= 0; i--) {

    const presenttodrop = presentstodrop[i];
    presenttodrop.update();
    presenttodrop.draw();
      
    if (presenttodrop.y + presenttodrop.height >= canvas.height + presenttodrop.height) {
        presentstodrop.splice(i, 1);
    }
    
    for (let j = chimneys.length - 1; j >= 0; j--) {
        const chimney = chimneys[j];
        if (isCollidingRect(presenttodrop, {x: chimney.topX, y: chimney.topY, width: chimney.topWidth, height: chimney.topHeight})) {
            presentstodrop.splice(i, 1);
            hit++;
            console.log(hit);
            break;
        }
    }
    }
     for (let i = chimneys.length - 1; i >= 0; i--) {
        chimneys[i].update();
        chimneys[i].draw();
        if (chimneys[i].x > canvas.width) {
            chimneys.splice(i, 1); 
        }
    }
    //no i zakończenia
    if (current_presents === 0 && presentstodrop.length === 0) {
    console.log("KONIEC GRY!");
    score2.style.display='none';
    gamerunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasWrapper.style.display = 'none';
    body.style.backgroundImage = 'none';
    if(hit === 0){
        score2.style.display='none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasWrapper.style.display = 'none';
        ending1.style.display = 'flex'
        document.getElementById("wynik1").innerHTML = "złapane prezenty: " + cought_presents;
    }else if(hit >= 1 && hit <= 29){
        ending2.style.display = 'flex'
        document.getElementById("wynik2").innerHTML = "<li><ol>złapane prezenty: " + cought_presents + "</ol><ol>prezenty które trafiły do dzieci: " + hit + "</ol></li>";
    }else if(hit >= 30){
        ending3.style.display = 'flex'
        document.getElementById("wynik3").innerHTML = "<li><ol>złapane prezenty: " + cought_presents + "</ol><ol>prezenty które trafiły do dzieci: " + hit + "</ol></li>";
    }
    return;
    }

    requestAnimationFrame(gameloop2);
}

spawnChimney();

console.write("Kłaniam się pięknie, dzięki za odsłuch")