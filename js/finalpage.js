// Wait until the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Select the boat element by its ID
    const emergingBoat = document.getElementById("emergingBoat");

    /**
     * Listens for the end of an animation on the boat element.
     * When the 'emergeAnimation' finishes, it transitions the boat into a floating state.
     */
    emergingBoat.addEventListener("animationend", function (event) {
        // Check if the ended animation is specifically 'emergeAnimation'
        if (event.animationName === "emergeAnimation") {
            // Remove the 'emerging' class to prevent the animation from restarting
            emergingBoat.classList.remove("emerging");

            // Add the 'floating' class to smoothly transition into the floating animation
            emergingBoat.classList.add("floating");
        }
    });
});
