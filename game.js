let resetBtn = document.querySelector(".resetBtn");
let boxes = document.querySelectorAll(".box");
let undoBtn = document.querySelector(".undo");
let newGame = document.querySelector(".newGame");
let msgDiv = document.querySelector(".hide");
let msg = document.querySelector("#msg");
let msgDiv2 = document.querySelector(".hide");
let container = document.querySelector("#container");

let turnO = true; 
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8], 
];

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const reset = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgDiv.setAttribute("class","hide"); 
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "X";
            turnO = false ;
        } else {
            box.innerText = "O";
            turnO = true ;
        }
        box.disabled = true;
        count++;
        let win = checkWinner();
        
        if(count === 9 && !win) {
        msgDiv.setAttribute("class","show");
            msg.innerText = "Match Draw";
            
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [pos1, pos2, pos3] = pattern;
        let val1 = boxes[pos1].innerText;
        let val2 = boxes[pos2].innerText;
        let val3 = boxes[pos3].innerText;
        
        if (val1 === val2 && val2 === val3 && val1 !== '') {
            winner();
            disabledBoxes();
        }       
    }    
}    
 
const winner = (win) => {
    msgDiv.setAttribute("class","show");
    msg.innerText = "You WON!";
}



resetBtn.addEventListener("click", reset);
newGame.addEventListener("click", reset);
undoBtn.addEventListener("click", undoMove);
