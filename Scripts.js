document.addEventListener('DOMContentLoaded', () => {
    const twitterLink = document.getElementById('twitter-link');
    const claimButton = document.getElementById('claim-button');
    const animation = document.getElementById('animation');

    twitterLink.addEventListener('click', (event) => {
        // No longer prevent default, so link redirects properly
        // Hide Twitter button
        twitterLink.classList.add('hidden');

        // Show animation
        animation.classList.remove('hidden');

        // Simulate awarding points
        setTimeout(() => {
            // Hide animation
            animation.classList.add('hidden');

            // Show claim button
            claimButton.classList.remove('hidden');
        }, 2000); // Adjust timing to match animation duration
    });

    claimButton.addEventListener('click', () => {
        alert('You have been awarded 500 Roar points!');
        // You can add logic here to handle awarding points on the server or in local storage
    });
});
