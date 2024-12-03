// Hides all dots
function hideAll() {
    allDots.forEach(dot => dot.classList.add("hidden"));
}

// Shows one on the die
function showOne(die) {
    centerDots[die].classList.remove("hidden");
}

// Shows two on the die
function showTwo(die) {
    topRightDots[die].classList.remove("hidden");
    bottomLeftDots[die].classList.remove("hidden");
}

// Shows three on the die
function showThree(die) {
    showOne(die);
    showTwo(die);
}

// Shows four on the die
function showFour(die) {
    showTwo(die)
    
    topLeftDots[die].classList.remove("hidden");
    bottomRightDots[die].classList.remove("hidden");
}

// Shows five on the die
function showFive(die) {
    showFour(die);
    showOne(die);
}

// Shows six on the die
function showSix(die) {
    showFour(die);

    centerLeftDots[die].classList.remove("hidden");
    centerRightDots[die].classList.remove("hidden");
}

// Returns the correct show value function
function getShowValue(value) {
    switch (value) {
        case 1:
            return showOne;
        case 2:
            return showTwo;
        case 3:
            return showThree;
        case 4:
            return showFour;
        case 5:
            return showFive;
        case 6:
            return showSix;
    }
}

// Displays the random numbers on the dice
function displayFace(value1, value2) {
    hideAll();

    getShowValue(value1)(0);
    getShowValue(value2)(1);
}

// Generates a random number for each die, triggers the rolling animation and displays the values
function rollDice() {
    btn.disabled = true;  // Disable button to prevent timing issues
    subheading.textContent = "Rolling...";

    // Generate random values
    const value1 = Math.ceil(Math.random() * 6);
    const value2 = Math.ceil(Math.random() * 6);

    const totalValue = value1 + value2;
    
    // Delay face update until after the roll animation starts
    setTimeout(() => {
        displayFace(value1, value2);
    }, 200);

    // Delay text update until after roll animation finishes
    setTimeout(() => {
        subheading.textContent = totalValue === 8 || totalValue === 11 ? 
            `You rolled an ${totalValue}!`: `You rolled a ${totalValue}!`;
    }, 1250)

    // Roll animation
    dice.forEach(die => {
        die.style.transition = "transform 1.2s ease-out";
        die.style.transform = "rotate(360deg)";

        // Reset transformation for next roll
        setTimeout(() => {
            die.style.transition = "none";
            die.style.transform = "rotate(0deg)";
            btn.disabled = false;  // Re-enable button
        }, 1200);
    });
}

// Elements
const dice = document.querySelectorAll(".die");

const allDots = document.querySelectorAll(".dot");

const topLeftDots = document.querySelectorAll("div.top.left");
const topRightDots = document.querySelectorAll("div.top.right");

const centerLeftDots = document.querySelectorAll("div.center-y.left");
const centerDots = document.querySelectorAll("div.center-y.center-x");
const centerRightDots = document.querySelectorAll("div.center-y.right");

const bottomLeftDots = document.querySelectorAll("div.bottom.left");
const bottomRightDots = document.querySelectorAll("div.bottom.right");

const subheading = document.getElementById("subheading");

const btn = document.getElementById("roll-btn");
btn.addEventListener("click", rollDice);