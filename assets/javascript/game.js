// Returns a random integer between min and max (both included)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var game = {
    wins: 0,
    losses: 0,
    randomNumber: 0,
    totalScore: 0,

    updateStats: function () {
        $("#wins").text(this.wins);
        $("#losses").text(this.losses);
        $("#random-number").text(this.randomNumber);
        $("#total-score").text(this.totalScore);
    },

    restartGame: function () {
        this.randomNumber = getRandomInt(19, 120);
        this.totalScore = 0;

        // Assigns the number of point to each crystal button. `this` here 
        // refers to the crystal buttons
        $(".crystal-button").each(function () {
            $(this).attr("number-points", getRandomInt(1, 12));
        });

        this.updateStats();
    },

    updateScore: function (numberPoints) {
        this.totalScore += numberPoints;
        this.updateStats();
    },

    checkWinLose: function () {
        if (this.totalScore === this.randomNumber) {
            this.wins++;
            this.restartGame();
            
        } else if (this.totalScore > this.randomNumber) {
            this.losses++;
            this.restartGame();
            
        } else {
            return;
        }
    }
}

// Starts the game
game.restartGame();

$(".crystal-button").click(function () {
    // `this` here refers to the crystal buttons
    var numberPoints = parseInt($(this).attr("number-points"));

    game.updateScore(numberPoints);

    game.checkWinLose();
});