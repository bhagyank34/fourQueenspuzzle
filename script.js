const boardSize=4;
const board = document.getElementById('chessboard');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let queens = []; // it stores queen position as row and col


//initialize the board
function createBoard(){

  for(let row = 0; row < boardSize; row++){
    for(let col =0 ;col < boardSize; col++){

      const cell = document.createElement('div');
      cell.className = 'cell';

       if(( row + col )%2 === 0){
        cell.style.backgroundColor='#f0d9b5';
       }else{
        cell.style.backgroundColor='#b58863';
       }

       cell.dataset.row = row;
       cell.dataset.col = col;
       board.appendChild(cell);

       cell.addEventListener('click',()=>
        placeQueen(row,col));
      
    }
  }
}

// check.. position is valid
function isValidMove(row,col){
  return !queens.some(
    (queen)=>
      queen.row === row||//same row
      queen.col ===col||//same col

      Math.abs(queen.row-row) === Math.abs(queen.col-col)//diagonal
  );
}

//place a queen on the board
function placeQueen(row,col){
  if(queens.some((queen)=>queen.row ===row && queen.col === col)){
   
    //double-click to remove the queen
    removeQueen(row,col);
    return;
  }
  let hasValidMove=false;
  for(let i=0;i<boardSize;i++){
  for(let j=0;j<boardSize;j++){
    if(isValidMove(i,j)){
        hasValidMove=true;
        break;
    }
  }
  if(hasValidMove)break;
  }
  if(!hasValidMove){
    message.textContent='Dead end! Game over.';
    message.style.color="red"
    return;
  }  
  


  // valid the placement
  if (!isValidMove(row,col)){
    message.textContent='invalid Move! try again';
   setTimeout(()=>{
      message.textContent='';
    },2000);//it clear msg after 2 seconds
    return;
  }

  message.textContent='';
  queens.push({row,col});
  updateBoard();

  // check if the game is complete
  if(queens.length === 4){
    message.textContent='Success! All 4 queens are placed';
  }
}
//Remove a queen from the board
function removeQueen(row,col){
  queens = queens.filter((queen)=>queen.row !==row && queen.col !== col);
  updateBoard();
  message.textContent='Queen removed.Place another.';
}

// Update the board display
function updateBoard(){
  document.querySelectorAll('.cell').forEach((cell)=>{
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    cell.innerHTML ='';

    if(queens.some((queen)=>queen.row === row && queen.col === col)){
      const queenIcon = document.createElement('div');
      queenIcon.className = 'queen';
      queenIcon.textContent = '♕';
      cell.appendChild(queenIcon);
    }
  });
}

resetButton.addEventListener('click',()=>{
  queens = [];
  message.textContent = '';
  updateBoard();
});

createBoard();
