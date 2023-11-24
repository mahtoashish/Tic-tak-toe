let btnRef = document.querySelectorAll(".button-option ");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
// winning pattern array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// player'X' plays first
let xTurn = true;
let count = 0;


// Display all Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // enable popup
    popupRef.classList.remove("hide");
};

// Enable all  buttons (for New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable popup
    popupRef.classList.add("hide");
};



// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }
    else {
        msgRef.innerHTML = "&#x1F389 <br> 'O' Wins";
    }
};

// function for draw
const drawFunction=()=>{
    disableButtons() ;
    msgRef.innerHTML="&#x1F60F <br> It's a Draw!";
};
// New game
newgameBtn.addEventListener("click", () => {
    count = 0;  
    enableButtons();
});
restartBtn.addEventListener("click",()=>{
    count=0;
    enableButtons();
});

// 

// winlogic
const winChecker = () => {
    // loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        // check if element are filled
        // If 3 empty element are same and whole give winas would
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                // If all the butoons have same values the pass the value to winfunction
                winFunction(element1);
            }
        }
    }
};
// display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // display X
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;
            // display O
            element.innerText = "O";
            element.disabled = true;
        }

        // Increment count on each click
        count += 1;
        if (count == 9) {
            drawFunction();
            // It's draw since there are a total of 9 block
        }
        // Check for win on every click
        winChecker();
    });
});

// Enable buttons and disable buttons
window.onload=enableButtons;