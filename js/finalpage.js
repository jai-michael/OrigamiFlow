document.addEventListener('DOMContentLoaded', function() {
    const emergingBoat = document.getElementById('emergingBoat');

    emergingBoat.addEventListener('animationend', function(event) {
        if (event.animationName === 'emergeAnimation') {
            // Remove the 'emerging' class to avoid resetting the animation
            emergingBoat.classList.remove('emerging');

            // Add 'floating' to smoothly transition into the floating movement
            emergingBoat.classList.add('floating');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('completeJournalBtn');

    // Example functionality: Reload the page when the button is clicked
    button.addEventListener('click', function() {
        window.location.reload(); // Refreshes the page to start a new journal entry
    });
});