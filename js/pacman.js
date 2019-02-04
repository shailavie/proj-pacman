var gPacman;
var gPacmanDegree = 0;
var PACMAN = '<img style="transform: rotate(0deg)"  width="20px" src="img/Pacman.png">';



function createPacman(board) {
	// debugger;
	gPacman = {
		location: getRandomEmptyCell(), //getRandomFoodCell(),   //
		isSuper: false
	};
	board[gPacman.location.i][gPacman.location.j] = PACMAN;
}




function movePacman(eventKeyboard) {
	if (!gGame.isOn) return;

	var nextLocation = getNextLocation(eventKeyboard);
	if (!nextLocation) return;

	var nextCell = gBoard[nextLocation.i][nextLocation.j];

	if (nextCell === WALL) return;

	switch (nextCell) {
		case CHERRY:
			updateModelAndDom(nextLocation);
			updateScore(10);
			break;
		case FOOD:
			updateScore(1);
			gCollectedItems++
			if (gCollectedItems === gItemsToCollect) gameOver('Well Done! You won!');
			updateModelAndDom(nextLocation);
			break;
		case POWER_FOOD:
			if (!gGame.isPowerOn) { //MEANS POWER MODE IS OFF
				gCollectedItems++
				powerModeOn();
				updateModelAndDom(nextLocation);
			} else return;
			break;
		case GHOST:
			updateModelAndDom(nextLocation);
			if (!gGame.isPowerOn) {
				gameOver('You stepped on a ghost!')
				renderCell(gPacman.location, EMPTY);
				break;
			} else {
				var ghost = getGameElementByLocation({ i: nextLocation.i, j: nextLocation.j });
				killGhost(ghost);
			} break;
		case EMPTY: //You must include ALL cell content options!
			updateModelAndDom(nextLocation);
			break;
		default:
			updateModelAndDom(nextLocation);
	}
	console.table(gBoard);
	updateModelAndDom(nextLocation);
	addEmptyLocation(nextLocation);
	updateAllEmptyCells();
	isBoardCleared();
}


function updateModelAndDom(nextLocation) {
	addEmptyLocation(nextLocation);
	// console.log('empty cells : ', gEmptyCells)

	// Update the model to reflect movement
	gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

	// Update the DOM
	renderCell(gPacman.location, EMPTY);

	// Update the pacman MODEL to new location  
	gPacman.location = nextLocation
	gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

	// Render updated model to the DOM
	renderCell(gPacman.location, PACMAN);
}



function getGameElementByLocation(location) {
	var res = null;
	res = gBoard[location.i][location.j];
	console.log('i am ghost :', res);
	return res;
}



function powerModeOn() {
	console.log('POWER MODE ON!');
	GHOST_FREQ = 100;
	document.querySelector('header h2').innerText = 'POWER MODE ON!'
	clearInterval(gIntervalGhosts);
	gIntervalGhosts = setInterval(moveGhosts, GHOST_FREQ);
	gGame.isPowerOn = true;
	setTimeout(powerModeOff, 5000);
}



function powerModeOff() {
	console.log('POWER MODE OFFFFFF!');
	setTimeout(() =>{
		document.querySelector('header h2').innerText = ''
	}, 2000);
	document.querySelector('header h2').innerText = 'POWER MODE OFF.. RUN!!';
	GHOST_FREQ = 500;
	clearInterval(gIntervalGhosts);
	gIntervalGhosts = setInterval(moveGhosts, GHOST_FREQ);
	gGame.isPowerOn = false;
}



function getNextLocation(keyboardEvent) {
	// var elPacman = document.querySelector('.pacman');
	// console.log('elPacman ', elPacman)
	var nextLocation = {
		i: gPacman.location.i,
		j: gPacman.location.j
	};

	switch (keyboardEvent.code) {
		case 'ArrowUp':
			nextLocation.i--;
			gPacmanDegree = 270;
			rotatePacman(gPacmanDegree);
			break;
		case 'ArrowDown':
			nextLocation.i++;
			gPacmanDegree = 90;
			rotatePacman(gPacmanDegree);
			break;
		case 'ArrowLeft':
			nextLocation.j--;
			gPacmanDegree = 180;
			rotatePacman(gPacmanDegree);
			break;
		case 'ArrowRight':
			nextLocation.j++;
			gPacmanDegree = 0;
			rotatePacman(gPacmanDegree);
			break;
		default: return null;
	}
	return nextLocation;
}



function rotatePacman(deg){
	PACMAN = `<img  style="transform: rotate(${deg}deg)" id="pacman" width="20px" src="img/Pacman.png">`;
}




function renderCell(location, value) {
	// Select the elCell and set the value
	var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
	elCell.innerHTML = value;
}

