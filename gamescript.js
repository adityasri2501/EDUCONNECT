console.log("Game Hub Script Loaded!");

document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function (event) {
        if (this.classList.contains('disabled')) {
            event.preventDefault();
            alert("This game is not available yet. Please check back soon!");
        } else {
            console.log(`Attempting to play game: ${this.href}`);
        }
    });
});
