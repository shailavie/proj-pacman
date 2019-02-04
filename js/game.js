'use strict';
// const WALL = '#';
const WALL = `<span style="color: blue">▢</span>`;

// const FOOD = '.';
const FOOD = `<span style="color: white; font-size:20px">•</span>`;
const EMPTY = ' ';
const POWER_FOOD = `<span style="color: red; font-size:40px">❧</span>`;;
const CHERRY = '🍒';

//Model
var gBoardSize;
var gBoard;
var gGame = {
	score: 0,
	isOn: false,
	isPowerOn: false
};
var gItemsToCollect;
var gCollectedItems;
var gPowerFood;
var gEmptyCells;
var gCherryInterval;
var gAudioBallCollected = new Audio('sound/Pacman-sound.mp3')


function init() {
	toggleEndModal();
	gEmptyCells = [];
	gPowerFood = 4;
	gItemsToCollect = 0;
	gCollectedItems = 0;
	gGame.score = 0;
	updateScore(0);
	gBoardSize = 10;
	gBoard = buildBoard();

	// Game elements creation and random placing 
	createWalls();
	createPacman(gBoard);
	createGhosts(gBoard, 2);
	createPowerFood(gBoard, gPowerFood);
	createFood(gBoard);

	renderBoard(gBoard, '.board-container');
	gGame.isOn = true;
	if (gCherryInterval) clearInterval(gCherryInterval);
	gCherryInterval = setInterval(createCherry, 5000);

}




function updateAllEmptyCells() {
	for (let i = 1; i <= gBoard.length - 1; i++) {
		for (let j = 1; j <= gBoard[0].length - 1; j++) {
			if (gBoard[i][j] === EMPTY) {
				var emptyLocation = {
					i: i,
					j: j
				}
				gEmptyCells.push(emptyLocation);
			}
		}
	}
}


function addEmptyLocation(pos) {
	var emptyLocation = {
		i: pos.i,
		j: pos.j
	}
	gEmptyCells.push(emptyLocation);
}


function createWalls() {
	var insideWalls = (gBoardSize * 4 - 4) / 6;
	// console.log('expecting ', insideWalls,' inside walls');
	for (let i = 0; i < insideWalls; i++) {
		var randCell = getRandomFloorPos();
		gBoard[randCell.i][randCell.j] = WALL;
	}
}







function createCherry() {
	var pos = getRandomEmptyCell();
	gBoard[pos.i][pos.j] = CHERRY;
	renderCell(pos, CHERRY);
}


function isBoardCleared() {
	var res = true;
	for (let i = 0; i <= gBoard.length-1; i++) {
		for (let j = 0; j <= gBoard[0].length-1; j++) {
			if (gBoard[i][j] === FOOD || gBoard[i][j] === POWER_FOOD) {
				res = false;
				return res;
			}
		}
	}
	// console.log('Board is cleared? ', res);
	if (res) gameOver('You\'ve collected all the food, well done!');
	return res;
}




function createPowerFood(board, num) {
	for (let i = 1; i <= num; i++) {
		var pos = getRandomEmptyCell();
		board[pos.i][pos.j] = POWER_FOOD
		gItemsToCollect++
	}
	// console.log('done with power food items :', gItemsToCollect);
}



function createFood() {
	for (let i = 0; i <= gBoard.length - 1; i++) {
		for (let j = 0; j <= gBoard.length - 1; j++) {
			if (isCellEmpty({ i: i, j: j })) {
				gBoard[i][j] = FOOD;
				gItemsToCollect++
			}
		}
	}
	// console.log('Done placing food items :', gItemsToCollect);
}




function buildBoard() {
	var SIZE = gBoardSize;
	var board = [];
	for (var i = 0; i < SIZE; i++) {
		board.push([]);
		for (var j = 0; j < SIZE; j++) {
			if (i === 0 || i === SIZE - 1 ||
				j === 0 || j === SIZE - 1) {
				board[i][j] = WALL;
			} else {
				board[i][j] = EMPTY;
				var emptyLocation = { i: i, j: j };
				addEmptyLocation(emptyLocation);
			}
		}
	}
	return board;
}


function updateScore(value) {
	// Update both the model and the dom for the score
	gGame.score += value;
	document.querySelector('header h3 span').innerText = gGame.score;
}


function renderBoard(mat, selector) {
	// var strHTML = '<table border="0"><tbody>';
	var strHTML = '<table ><tbody>';
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < mat[0].length; j++) {
			var cell = mat[i][j];
			var className = 'cell cell' + i + '-' + j;
			strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
		}
		strHTML += '</tr>'
	}
	strHTML += '</tbody></table>';
	var elContainer = document.querySelector(selector);
	elContainer.innerHTML = strHTML;
}



// RENDER A CELL IN THE DOM
function renderCell(location, value) {
	// Select the elCell and set the value
	var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
	elCell.innerHTML = value;
}




// GAME OVER
function gameOver(msg) {
	gAudioBallCollected.play();
	var elEndMsg = document.querySelector('h2');
	elEndMsg.innerText = msg;
	console.log('Game Over');
	gGame.isOn = false;
	clearInterval(gIntervalGhosts);
	gIntervalGhosts = 0;
	toggleEndModal();
}




function toggleEndModal() {
	var elEndModal = document.querySelector('.end-modal-container');
	elEndModal.classList.toggle('hide');
	var elBody = document.querySelector('.board-container');
	elBody.classList.toggle('blur');
}



function getRandomEmptyCell() {
	var pos = { i: 1, j: 1 };
	if (gEmptyCells.length === 0) return pos; //qa destroy after
	var randomIdx = getRandomIntInclusive(0, gEmptyCells.length - 1)
	pos = gEmptyCells[randomIdx];
	gEmptyCells.splice(randomIdx, 1);
	return pos;
}




function getRandomFoodCell() {
	var validCell = false;
	var cellLocation = { i: 1, j: 1 };
	var count = 0;
	while (!validCell && count < gBoard.length ** 2) {
		var randI = getRandomIntInclusive(1, gBoard.length - 1);
		var randJ = getRandomIntInclusive(1, gBoard.length - 1);
		cellLocation = { i: randI, j: randJ };
		if (gBoard[randI][randJ] === FOOD) validCell = true;
		count++
	}
	return cellLocation
}




function getRandomFloorPos() {
	var pos = {
		i: getRandomIntInclusive(1, gBoard.length - 1),
		j: getRandomIntInclusive(1, gBoard[0].length - 1)
	}
	return pos;
}




function isCellEmpty(pos) {
	var cell = gBoard[pos.i][pos.j];
	return (cell === EMPTY || cell === '');
}



function countItemOnboard(item) {
	var count = 0;
	for (let i = 1; i <= gBoard.length - 1; i++) {
		for (let j = 1; j <= gBoard.length - 1; j++) {
			if (gBoard[i][j] === item) count++
		}
	}
	// console.log('Total count of ', item, ' on board :', count);
	return count;
}