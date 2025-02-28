document.addEventListener('DOMContentLoaded', () => {
    const feelingButtons = document.querySelectorAll('.feeling-btn');

    feelingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isSelected = button.dataset.selected === 'true';

            if (isSelected) {
                button.classList.remove('selected');
                button.dataset.selected = 'false';
            } else {
                button.classList.add('selected');
                button.dataset.selected = 'true';
            }
        });
    });

    const submitButton = document.getElementById('submit-mood');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedFeelings = Array.from(feelingButtons)
            .filter(button => button.dataset.selected === 'true')
            .map(button => button.textContent);
        console.log('Selected Feelings:', selectedFeelings);
    });
});