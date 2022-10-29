// --------------------------------------------------------------- Player 

class Player {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.w = 60
		this.h = 5
		this.lives = 5
		this.flickering = false
		this.cooldown = 15
		this.bullets = []

		this.isShooting = false
		this.direction='none';
		this.speed = 4;

		this.bulletType = 'single'
		this.cooldownSingle = 15;
		this.cooldownSnipe = 120;
		this.cooldownBomb = 210;
		this.cooldownShield = 210;

		this.bombLeft = 10;
		this.singleLeft = 10;
		this.snipeLeft = 20;
		this.shieldLeft = 4
		this.ammo;
		
		this.shotCount = 0;
	}
	
	// displays the player and lives 
	display() {
		
		image(playerImg, this.x, this.y, 25 * 7, 25 * 7)
		textAlign(LEFT, CENTER)
		textSize(24)
		fill(255, 234, 0)
		//text(`${this.lives} Lives Remaining`, 25, HEIGHT - 35)
		for ( let i = 0 ; i < this.lives ; i++){
			image(heart, 70 + this.w * i / 1.3, 50 , 30 , 30)
		}

		rectMode(LEFT);
		stroke(255, 234 , 0);
		strokeWeight(8);
		noFill();
		switch(this.bulletType){
			case 'single':
				rect(WIDTH - 320 , 50 , 110 , 60 , 10);
				break;
			case 'bomb':
				rect(WIDTH - 225 , 50 , 110 , 60 , 10);
				break;
			case 'shield':
				rect(WIDTH - 120 , 50 , 110 , 60 , 10);
				break;
		}
		noStroke();
		fill(255);

		image(playerBulletImg,WIDTH-350,50)
		text(`: ${this.singleLeft}`, WIDTH - 320, 50)

		image(playerBombImg,WIDTH-250,50)
		text(`: ${this.bombLeft}`, WIDTH - 220, 50)

		image(playerShieldImg,WIDTH-140,50, 45, 45)
		text(`: ${this.shieldLeft}`, WIDTH - 100, 50)

		imageMode(CENTER);
		image(armyManRun[4], WIDTH/2 - 100 , 50 , 50 , 50 );
		text(`${soldierSafeCount} / ${armyArray.length}`, WIDTH / 2 - 70, 50)


		switch(this.bulletType){
			case 'single':
				this.ammo = this.singleLeft;
				break;
			case 'bomb':
				this.ammo = this.bombLeft;
				break;
			case 'snipe':
				this.ammo = this.snipeLeft;
				break;
			case 'shield':
				this.ammo = this.shieldLeft;
				break;
		}

	}
	
	// what happens when player gets hit: decrements lives + hit animation
	async handleHit() {
		if (this.lives >= 0) {
			for (let i = 0; i < 3; i++) {
				noLoop()
				
				p.display()
				fill(25, 25, 73, 150)
				rect(this.x, this.y, 75, 75)
				await sleep(200)
				
				p.display()
				fill(25, 25, 73)
				rect(this.x, this.y, 75, 75)
				await sleep(100)
			}
			p.display()
			p.flickering = false
			this.lives--
		}
		loop()
	}
	
	// moves the player
	move() {

		if (this.direction === 'left' && this.x > this.w/2) {
		  this.x -= this.speed;
		}
		if (this.direction === 'right' && this.x < width - this.w/2) {
		  this.x += this.speed;
		}
	}

	changeDirection(direction) {
		this.direction = direction;
	}
	
	// decrements cooldown and adds new bullet to player when cooldown ends and mouse is pressed
	shoot() {
		if (this.cooldown > 0) 
			this.cooldown--
		
		if (this.cooldown === 0 && this.isShooting && this.ammo > 0) {

			switch(this.bulletType){
				case 'single':
					this.bullets.push(new Bullet(this.x, this.y - this.h / 2, 'player'))
					this.singleLeft--
					this.cooldown = this.cooldownSingle;
					break;
				case 'bomb':
					this.bullets.push(new Bullet(this.x, this.y - this.h / 2, 'bomb'))
					this.cooldown = this.cooldownBomb;
					this.bombLeft--
					break;
					case 'snipe':
						this.bullets.push(new Bullet(this.x, this.y - this.h / 2, 'snipe'))
						this.cooldown = this.cooldownSnipe;
						this.snipeLeft--
						break;
					case 'shield':
						this.bullets.push(new Bullet(this.x, this.y - this.h * 9, 'shield'))
						this.cooldown = this.cooldownShield;
						this.shieldLeft--
						break;
			}

		}
	}
}

// --------------------------------------------------------------- ARMY MAN - TIMER
class ArmyMan{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.w = 45;
		this.h = 50;
		this.speed = 0.7;
		//this.speed = 5;
		this.lives = 1;
		this.isAlive = true;
		this.isSafe = false;

		this.animCounter = 0;
		this.animImg = 0;
	}

	display(){
		// display lives on top of armyMan

		for (let i = 0 ; i < this.lives; i++){
			image(heart, this.x - this.w/2  + this.w/2 * i, this.y - this.h, this.w/2, this.h/2)
		}
		this.animCounter++
		image(armyManRun[this.animImg],this.x, this.y, this.w, this.h)
		if(this.animCounter >= 8){
			this.animImg ++;
			this.animCounter = 0;
			if(this.animImg > 1){
				this.animImg = 0;
			}
		}

	}

	move(){
		if(this.isAlive){
			this.x += this.speed;
		}
	}
	
	async handleHit() {
		if (this.lives > 0) {
			for (let i = 0; i < 3; i++) {
				noLoop()
				
				this.display()
				fill(25, 25, 73, 150)
				rect(this.x, this.y, 75, 75)
				await sleep(200)
				
				this.display()
				fill(25, 25, 73)
				rect(this.x, this.y, 75, 75)
				await sleep(100)
			}
			this.display()
			this.flickering = false
			this.lives--
		}
		loop()
	}

}
// --------------------------------------------------------------- Bullet

class Bullet {
	constructor(x, y, type) {
		this.x = x
		this.y = y
		this.w = 5
		this.h = 15
		this.type = type
		this.hit = 0;
	}
	
	// displays bullet based on who shoots it
	display() {
		/* hitbox */
		fill(230)
		noStroke()
		//rect(this.x, this.y, this.w, this.h)
		imageMode(CENTER)
		if (this.type === 'player') {
			image(playerBulletImg, this.x, this.y)
		}if (this.type === 'enemy') {
			image(enemyBulletImg, this.x, this.y)
		} if (this.type === 'bomb') {
			image(playerBombImg, this.x, this.y)
		} if (this.type === 'shield') {
			image(playerShieldImg, this.x, this.y, 60, 60)
			this.w = 45
			//rect(this.x, this.y, this.w, this.h)
		}
	}
	
	// updates position of the bullet based on who shoots it
	update() {
		if (this.type === 'player') {
			this.y -= 5
		}
		if (this.type === 'enemy') {
			this.y += 5
		}
		if (this.type === 'bomb') {
			this.y -= 5
		}
		if (this.type === 'snipe') {
			this.y -= 18
		}
		if (this.type === 'shield') {
			this.x = p.x;
		}
	}
	
	// returns true when bullet is colliding with obj and false otherwise
	isColliding(obj) {
		let xdist = dist(obj.x, 0, this.x, 0)
		let ydist = dist(obj.y, 0, this.y, 0)
		
		if (xdist < obj.w / 2 + this.w / 2 && ydist < obj.h / 2 + this.h / 2) {
			return true
		}
		return false
	}
	
	// returns true when off screen and false otherwise
	outOfBounds() {
		if (this.y < 0 || this.y > WIDTH) {
			return true
		} else {
			return false
		}
	}
}

// --------------------------------------------------------------- Enemy 

class Enemy {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.w = 45
		this.h = 45

		this.respawnTime = 900;
		this.timeRemain = 0
		this.isAlive = true
	}
	
	// displays enemy
	display() {
		/* hitbox */
		// noFill()
		// strokeWeight(0.5)
		// stroke(255)
		// rect(this.x, this.y, this.w, this.h)
		// strokeWeight(1)
		
		if(this.isAlive){
			image(enemyImg, this.x, this.y, this.w * 2.3, this.h * 2.3)
		}else{
			image(enemyDestroyedImg, this.x, this.y, this.w, this. h)
			this.timeRemain--;
			if(this.timeRemain <= 0) this.isAlive = true;
		}

	}
}

let totalScore = 0;

// displays the starting screen before the game
function startScreen() {
	background(25, 25, 103)
	
	
	
	
	
	
	/* button content and other text */
	
	if(!tutorial){
		// decorative images 
		push()
		rotate(PI/4)
		translate(20, -170)
		image(playerImg, 0, 0, 300, 300)
		pop()
		
		push()
		rotate(2*PI - PI/4)
		translate(250, 535)
		image(playerImg, 0, 0, 300, 300)
		pop()
		
		image(enemyImg, 310, 555, 250, 250)
		/* starts game when button is pressed */
		if (dist(mouseX, 0, WIDTH / 2, 0) <= 275 && dist(0, mouseY, 0, HEIGHT / 2 + 145) <= 30) {
			fill(35, 35, 113)
			noStroke()
			rect(WIDTH / 2, HEIGHT / 2 + 145, 550, 60, 20)
			
			if (mouseIsPressed) {
				//started = true
				tutorial = true
			}
		}
		if (dist(mouseX, 0, WIDTH / 2, 0) <= 275 && dist(0, mouseY, 0, HEIGHT / 2 + 205) <= 30) {
			fill(35, 35, 113)
			noStroke()
			rect(WIDTH / 2, HEIGHT / 2 + 205, 550, 60, 20)
			
			if (mouseIsPressed) {
				started = true
				tutorial = false
			}
		}

		textSize(75)
		fill(255, 234, 0)
		textAlign(CENTER, CENTER)
		text('El mundo te necesita!', WIDTH / 2, HEIGHT / 4 - 60)
		fill(222)
		textSize(35)
		text('- usa tu nave y Protege las tropas en tierra', WIDTH / 2, HEIGHT / 4 + 120)
		text('- sobrevive hasta que el soldado', WIDTH / 2, HEIGHT / 4 + 160)
		text('cruce la pantalla', WIDTH / 2, HEIGHT / 4 + 200)
		text('- cuidado! no te quedes sin balas', WIDTH / 2, HEIGHT / 4 + 240)
		fill(255, 234, 0)
		text('controles', WIDTH / 2, HEIGHT / 2 + 140)
		text('click aqui para empezar', WIDTH / 2, HEIGHT / 2 + 200)
		
	} else{
		imageMode(LEFT)
		image(tutorialmg[tutorialCount],0 , 0)

		if(mouseIsPressed){
			if(tutorialCount === 0 ){
				mouseIsPressed = false;
				tutorialCount = 1;
			} else if(tutorialCount === 1 ){
				mouseIsPressed = false;
				tutorialCount = 2;
			} else if(tutorialCount === 2 ){
				mouseIsPressed = false;
				tutorialCount = 3;
			}
			else if(tutorialCount === 3 ){
				started = true
				tutorial = false
			}
		}
	}
}

// displays the ending screen when player loses the game
function loseScreen() {
	const bulletScore = p.singleLeft * 1.5;
	const bombScore = p.bombLeft * 25;
	const shieldScore = p.shieldLeft * 50;
	const accuracyScore = (bulletScore + bombScore + shieldScore) * (floor(enemiesKilled / (p.shotCount + 1)));
	const shipScore = p.lives * 200;
	const soldierScore = soldierSafeCount * 250;
	const loseScore = -2000;
	const enemyScore = enemiesKilled * 100

	const totalScore = bulletScore + bombScore + shipScore + accuracyScore + soldierScore + loseScore;
	
	background(25, 25, 103)
	textSize(90)
	fill(255, 234, 0)
	textAlign(CENTER, CENTER)
	text('YOU LOSE', WIDTH / 2, HEIGHT / 3)
	textAlign(LEFT, CENTER)
	textSize(30)
	fill(222)
	text(`Balas ...... ${p.singleLeft} =  $ ${converts(bulletScore)}`, 50, HEIGHT / 2)
	text(`Bombas ...... ${p.bombLeft} =  $ ${converts(bombScore)}`, 50, HEIGHT / 2 + 40)
	text(`Escudos ...... ${p.shieldLeft} =  $ ${converts(shieldScore)}`, 50, HEIGHT / 2 + 80)
	text(`Punteria ...... ${floor(enemiesKilled / (p.shotCount + 1) * 100)} % =  $ ${converts(accuracyScore)}`, 50, HEIGHT / 2 + 120)

	text(`Nave ...... ${p.lives} =  $ ${converts(shipScore)}`, WIDTH / 2, HEIGHT / 2)
	text(`Soldados ...... ${soldierSafeCount} =  $ ${converts(soldierScore)}`, WIDTH / 2, HEIGHT / 2 + 40)
	text(`Perdiste ...... =  $ ${converts(loseScore)}`, WIDTH / 2, HEIGHT / 2 + 80)
	text(`Enemigos ...... ${enemiesKilled} % =  $ ${enemiesKilled}`, WIDTH / 2, HEIGHT / 2 + 120)

	textAlign(CENTER, CENTER)
	fill(255, 234 , 0)
	textSize(40)
	text(`TOTAL = $ ${converts(totalScore)}`, WIDTH / 2, HEIGHT / 2 + 240)
}

function converts(score) {
	return ((score *200) / 4000)*100
}
function loseScreen() {
	const bulletScore = p.singleLeft * 1.5;
	const bombScore = p.bombLeft * 25;
	const shieldScore = p.shieldLeft * 50;
	const accuracyScore = (bulletScore + bombScore + shieldScore) * (floor(enemiesKilled / (p.shotCount + 1)));
	const shipScore = p.lives * 200;
	const soldierScore = soldierSafeCount * 250;
	const loseScore = -2000;
	const enemyScore = enemiesKilled * 100

	totalScore = bulletScore + bombScore + shipScore + accuracyScore + soldierScore + loseScore;
	
	background(25, 25, 103)
	textSize(90)
	fill(255, 234, 0)
	textAlign(CENTER, CENTER)
	text('YOU LOSE', WIDTH / 2, HEIGHT / 3)
	textAlign(LEFT, CENTER)
	textSize(30)
	fill(222)
	text(`Balas ...... ${p.singleLeft} =  $ ${converts(bulletScore)}`, 50, HEIGHT / 2)
	text(`Bombas ...... ${p.bombLeft} =  $ ${converts(bombScore)}`, 50, HEIGHT / 2 + 40)
	text(`Escudos ...... ${p.shieldLeft} =  $ ${converts(shieldScore)}`, 50, HEIGHT / 2 + 80)
	text(`Punteria ...... ${floor(enemiesKilled / (p.shotCount + 1) * 100)} % =  $ ${converts(accuracyScore)}`, 50, HEIGHT / 2 + 120)

	text(`Nave ...... ${p.lives} =  $ ${converts(shipScore)}`, WIDTH / 2, HEIGHT / 2)
	text(`Soldados ...... ${soldierSafeCount} =  $ ${converts(soldierScore)}`, WIDTH / 2, HEIGHT / 2 + 40)
	text(`Perdiste ...... =  $ ${converts(loseScore)}`, WIDTH / 2, HEIGHT / 2 + 80)
	text(`Enemigos ...... ${enemiesKilled} % =  $ ${enemiesKilled}`, WIDTH / 2, HEIGHT / 2 + 120)

	textAlign(CENTER, CENTER)
	fill(255, 234 , 0)
	textSize(40)
	text(`TOTAL = $ ${converts(totalScore)}`, WIDTH / 2, HEIGHT / 2 + 240)
}

function converts(score) {
	return ((score *200) / 4000)*100
}


function subirFinal() {
	oActivity.addState("balas", p.singleLeft);
		oActivity.addState("bombas", p.bombLeft);
		oActivity.addState("escudos", p.shieldLeft);
		oActivity.addState("vidas", p.lives);
		oActivity.addState("enemigos", enemiesKilled);
		oActivity.addResult([{ id: CARRERAS.ADMINISTRACION_EMPRESA, value: totalScore}]);
		oActivity.finish();
}
// displays the ending screen when player wins the game
function winScreen() {
	const bulletScore = p.singleLeft * 1.5;
	const bombScore = p.bombLeft * 25;
	const shieldScore = p.shieldLeft * 50;
	const accuracyScore = (bulletScore + bombScore + shieldScore) * (floor(enemiesKilled / (p.shotCount + 1)));
	const shipScore = p.lives * 200;
	const soldierScore = soldierSafeCount * 250;
	const winScore = 2000;
	const enemyScore = enemiesKilled * 100

	const totalScore = bulletScore + bombScore + shipScore + accuracyScore + soldierScore + winScore;
	
	background(25, 25, 103)
	textSize(90)
	fill(255, 234, 0)
	textAlign(CENTER, CENTER)
	text('YOU WIN', WIDTH / 2, HEIGHT / 3)
	textAlign(LEFT, CENTER)
	textSize(30)
	fill(222)
	text(`Balas ...... ${p.singleLeft} =  $ ${converts(bulletScore)}`, 50, HEIGHT / 2)
	text(`Bombas ...... ${p.bombLeft} =  $ ${converts(bombScore)}`, 50, HEIGHT / 2 + 40)
	text(`Escudos ...... ${p.shieldLeft} =  $ ${converts(shieldScore)}`, 50, HEIGHT / 2 + 80)
	text(`Punteria ...... ${floor(enemiesKilled / (p.shotCount + 1) * 100)} % =  $ ${converts(accuracyScore)}`, 50, HEIGHT / 2 + 120)

	text(`Nave ...... ${p.lives} =  $ ${converts(shipScore)}`, WIDTH / 2, HEIGHT / 2)
	text(`Soldados ...... ${soldierSafeCount} =  $ ${converts(soldierScore)}`, WIDTH / 2, HEIGHT / 2 + 40)
	text(`Perdiste ...... =  $ ${converts(winScore)}`, WIDTH / 2, HEIGHT / 2 + 80)
	text(`Enemigos ...... ${enemiesKilled} % =  $ ${enemiesKilled}`, WIDTH / 2, HEIGHT / 2 + 120)

	textAlign(CENTER, CENTER)
	fill(255, 234 , 0)
	textSize(40)
	text(`TOTAL = $ ${converts(totalScore)}`, WIDTH / 2, HEIGHT / 2 + 240)

	
}

// --------------------------------------------------------------- Game 

const WIDTH = 900
const HEIGHT = 750
let tutorialCount = 0;

let p = new Player(WIDTH / 2, HEIGHT - 100)
let armyMan = new ArmyMan();
let armyArray = [];
let enemies = []
let enemyBullets = []
let started = false
let tutorial = false
let font
let enemyBulletImg, playerBulletImg, playerImg, enemyImg, enemyDestroyedImg, heart, playerShieldImg
let armyManRun = [];
let tutorialmg = [];
let = enemiesKilled = 0;

let bulletLevel = 9;
let soldierSafeCount = 0;

function preload() {
	font = loadFont('upheavtt.ttf')
	enemyBulletImg = loadImage('./enemy-bullet.png')
	playerBulletImg = loadImage('./player-bullet.png')
	playerBombImg = loadImage('./missile.png')
	playerImg = loadImage('./player2.png')
	enemyImg = loadImage('./enemy2.png')
	enemyDestroyedImg = loadImage('./destroyedEnemy.png')
	heart = loadImage('./live.png')
	playerShieldImg = loadImage('./shield.png')
	for( let i = 0; i < 5; i++){
		armyManRun[i] = loadImage('./run' + i + '.png');
	}
	for ( let i = 0 ; i < 4 ; i++){
		tutorialmg[i] = loadImage('./frame' + i + '.png')
	}
}

function setup() {
	createCanvas(WIDTH, HEIGHT);
	rectMode(CENTER)
	textFont(font)
	
	// enemy creation -- upside-down triangle
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 12; j++) {
			//if (i < 12 - j*2)
				enemies.push(new Enemy((j + 1) * 70 /* + j * 70 */, 50 + (i + 1) * 70))
		}
	}
	for (let i = 0; i < 6; i++){
		armyArray.push(new ArmyMan( i * (-WIDTH/2 + 100), HEIGHT - 25))
	}
}

function draw() {
	background(25, 25, 73)
	fill(255, 234, 0)
	rect(WIDTH - 15, HEIGHT - 25, 30, 70)
	
	/* displays starting screen before game */
	if (!started) {
		startScreen()
		return
	}
	
	/* handles player bullets */
	for (let i = 0; i < p.bullets.length; i++) {
		p.bullets[i].update()
		p.bullets[i].display()
		for (let j = 0; j < enemies.length; j++) { 
			if (p.bullets[i].isColliding(enemies[j])) { // removes bullet and enemy when enemy is hit
				if(enemies[j].isAlive){
					enemies[j].isAlive = false;
					enemies[j].timeRemain = enemies[j].respawnTime;
					switch(p.bullets[i].type){
						case 'bomb':
							if(j === 11 || j === 23 || j === 35){
								enemies[j-1].isAlive = false;
								enemiesKilled++
								enemies[j-1].timeRemain = enemies[j-1].respawnTime;
							} else if (j === 12 || j === 24 || j === 0){
								enemies[j+1].isAlive = false;
								enemiesKilled++;
								enemies[j+1].timeRemain = enemies[j+1].respawnTime;
							} else {
							enemies[j-1].isAlive = false;
							enemies[j-1].timeRemain = enemies[j-1].respawnTime;
							enemies[j+1].isAlive = false;
							enemies[j+1].timeRemain = enemies[j+1].respawnTime;
							enemiesKilled += 2 ;
							}
							if(j > 11){
								enemies[j-12].isAlive = false;
								enemies[j-12].timeRemain = enemies[j-12].respawnTime;
							}
						break;
					}
					p.bullets.splice(i, 1)
					enemiesKilled++;
				}
				break
			} else if (p.bullets[i].outOfBounds()) { // removes bullet when off screen
				p.bullets.splice(i, 1)
				break
			}
		}
	}
	
	/* handles player */
	p.move()
	p.shoot()
	p.display()

	for(let i = 0; i < armyArray.length; i++){
		armyArray[i].display();
		armyArray[i].move();
		if(!armyArray[i].isSafe && armyArray[i].x > WIDTH - armyArray[i].w){
			soldierSafeCount++;
			armyArray[i].isSafe= true;
			print('holiwis')
		}
	}
	/* handles enemies */
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].display()
		
		/* random gen of enemy bullets w/ cap, prob. based on # enemies left --- recordar numero 20--- */

		/*if (enemyBullets.length < 10 && floor(random(0, enemies.length * 10)) === 0 ) {
			let index = floor(random(0, enemies.length))
			if(enemies[index].isAlive) enemyBullets.push(new Bullet(enemies[index].x, enemies[index].y + enemies[index].h / 2 + 15 / 2, 'enemy'))
		}*/

		/* generation of bullets randomly and based in last armyMan position */


		if (enemyBullets.length < 28 - (bulletLevel * 2) && floor(random(0, enemies.length * (10 + bulletLevel))) === 0 ) {
			let index = floor(random(0, enemies.length))
			if(enemies[index].isAlive) enemyBullets.push(new Bullet(enemies[index].x, enemies[index].y + enemies[index].h / 2 + 15 / 2, 'enemy'))
		}
	}
	
	/* handles enemy bullets */
	for (let i = 0; i < enemyBullets.length; i++) {
		enemyBullets[i].update()
		enemyBullets[i].display()
		if (enemyBullets[i].isColliding(p)) { // player is hit, enemy bullet is removed
			p.handleHit()
			enemyBullets.splice(i, 1)
		}


		for(let j = 0; j < armyArray.length; j++){
			if(enemyBullets[i].isColliding(armyArray[j])){
				if(armyArray[j].lives > 0){
					armyArray[j].lives--
				} else{
					armyArray[j].handleHit();
					armyArray.splice(j,1);
					//j=0;
					bulletLevel --;
				}
				enemyBullets.splice(i,1)
				break;
			}
		}
		for(let j = 0 ; j < p.bullets.length ; j++){
			if(enemyBullets[i].isColliding(p.bullets[j])){

				if(p.bullets[j].type === 'shield'){
					if(p.bullets[j].hit < 4){
						p.bullets[j].hit++;
						p.singleLeft += 2;
						enemyBullets.splice(i,1);
						i=0;
					} else {
						p.bullets.splice(j,1)
						enemyBullets.splice(i,1)
						i=0;
					}
				} else { 
					p.bullets.splice(j,1)
					enemyBullets.splice(i,1)
					i=0;
				}
			}
		}

		if (enemyBullets[i].outOfBounds()) { // removes bullet when off screen
			enemyBullets.splice(i, 1)
			i = 0;
		}
	}
	
	/* displays winning and losing screens where appropriate */
	for(let i = 0; i < armyArray.length; i++){

	}
	if (p.lives < 0 || armyArray.length === 0) {
		
		loseScreen()
		enemyBullets = [];
		enemies = [];

	} else if (armyArray[armyArray.length-1].x >= WIDTH - armyMan.w) {
		winScreen()
		enemyBullets = [];
		enemies = [];
	}
}

function mousePressed(){
	if (p.lives < 0 || armyArray.length === 0) {
		subirFinal()
	} else if(armyArray[armyArray.length-1].x >= WIDTH - armyMan.w) {
		subirFinal()
	}
	
}

// --------------------------------------------------------------- Timing

function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

// --------------------------------------------------------------- Move Player
function keyPressed() {

	// player single shot
	if (keyCode === LEFT_ARROW) {
		p.changeDirection('left');
	  }
	  if (keyCode === RIGHT_ARROW) {
		p.changeDirection('right');
	  }
	  if (keyCode === UP_ARROW /* && armyMan.x < WIDTH - armyMan.w */) {
		p.isShooting = true;
		p.shoot();
		p.shotCount++;
	  	p.isShooting = false;
	  }
	  switch(key){
		case '1':
			p.bulletType = 'single'
			if(p.cooldown > p.cooldownSingle) p.cooldown = p.cooldownSingle;
			break;
		case '2':
			p.bulletType = 'bomb'
			if(p.cooldown > p.cooldownSnipe) p.cooldown = p.cooldownSnipe;
			break;
		case '3':
			p.bulletType = 'shield'
			p.cooldown = 0
			break;
		case 'z':
			p.bulletType = 'snipe'
			p.cooldown = 0
			break;
	  }
	
	
	if ((keyCode === RETURN || keyCode === ENTER) && gameOverBool) {
	  reset();
	}

	return false; // prevents default browser behaviors
}
  
function keyReleased(){
	p.changeDirection('none');
	return false; // prevents default browser behaviors

}

