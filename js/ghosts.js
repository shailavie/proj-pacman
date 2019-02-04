const GHOST = 'ᗣ' //'&#9781;';    //'<img width="20px" src="img/yaron.png">';
var GHOST_FREQ = 1000;
var gNextGhostID = 100;
var gIntervalGhosts;
var gGhosts;



function createGhost(board) {
    var ghost = {
        id: gNextGhostID++,
        location:  getRandomEmptyCell(),   // getRandomFoodCell(),
        currCellContent: FOOD,   //FOOD,
        color: [getRandomColor(),'#0023ee'],
        isPower: true
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}




function createGhosts(board, num) {
    // Empty the gGhosts array, create some ghosts
    gGhosts = [];

    for (let i = 0; i <= num; i++) {
        createGhost(board)
    }

    // Run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, GHOST_FREQ)
}




function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j,
        }

        var nextCell = gBoard[nextLocation.i][nextLocation.j]

        // If GHOST return
        if (nextCell === GHOST) {
            // console.log('bow chicka wow wow (Ghost on Ghost action)');
            return;
        }

        // If WALL return
        if (nextCell === WALL) {
            // console.log('Stupid Ghost Hitting a Wall');
            return;
        }

        // DETECT gameOver
        if (nextCell === PACMAN && !gGame.isPowerOn) {
            gameOver('A ghost caught you! Loser...');
        } else if (nextCell === PACMAN && gGame.isPowerOn) {
            killGhost(ghost);
            console.log('Ghost is ironically dead again : ', ghost)
        }

        // Set back what we stepped on
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // Move the ghost MODEL
        ghost.currCellContent = nextCell;
        ghost.location = nextLocation
        gBoard[ghost.location.i][ghost.location.j] = GHOST;

        // Updade the DOM 
        renderCell(ghost.location, getGhostHTML(ghost))
        // renderGhost(ghost.location, GHOST, ghost.color);
    }
}




function getGhostIdxById(id) {
    var idx = 0;
    for (let i = 0; i < gGhosts.length; i++) {
        if (id === gGhosts[i].id) idx = i;
    }
    return idx;
}


// Killing a ghost 
function killGhost(ghost) {
    var ghostIdx = getGhostIdxById(ghost.id);
    // renderCell(ghost.location,PACMAN);
    gGhosts.splice(ghostIdx,1);
}


// There are 4 options where to go
function getMoveDiff() {
    // return { i: getRandomIntInclusive(-1, 1), j: getRandomIntInclusive(-1, 1) }
    var opts = [{ i: 0, j: 1 }, { i: 1, j: 0 }, { i: -1, j: 0 }, { i: 0, j: -1 }];
    return opts[getRandomIntInclusive(0, opts.length - 1)];
}



function getGhostHTML(ghost) {
    var ghostColor = (gGame.isPowerOn)? ghost.color[1] : ghost.color[0];
    return `<span style="font-size:30px ;color: ${ghostColor}">${GHOST}</span>`
}






