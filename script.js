const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const statusText = document.getElementById('status-text');
const questionCard = document.getElementById('question-card');
const successCard = document.getElementById('success-card');
const madPhoto = document.getElementById('mad-photo');

let slideIndex = 0;
const messages = [
    "umm, let's talk about this...",
    "you missed! 💨",
    "nice try, rakshu hehe!",
    "Error 404: 'No' not found",
    "is your mouse broken? 😉",
    "say 'Yes' pwease..❤️",
    "don't be like that! 🥺"
];

function moveNoButton() {
    // 1. Get the dimensions of the white card
    const card = document.getElementById('question-card');
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    // 2. Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 3. Calculate max possible coordinates (card size minus button size)
    // We add a small buffer (20px) so it doesn't touch the very edge
    const maxX = cardWidth - btnWidth - 20;
    const maxY = cardHeight - btnHeight - 20;

    // 4. Generate random coordinates within the card
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    // 5. Apply the new position relative to the card
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Update the funny messages as before
    if (statusText) {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        statusText.innerText = randomMsg;
    }

    triggerMadPhoto();
}

function triggerMadPhoto() {
    madPhoto.classList.remove('flash-animation');
    void madPhoto.offsetWidth; // Trigger reflow
    madPhoto.classList.add('flash-animation');
}

function showSlides() {
    let slides = document.getElementsByClassName("couple-img");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); 
}

// Add listeners for both mouse (PC) and touch (mobile)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents clicking the button on mobile
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    questionCard.style.display = 'none';
    successCard.classList.remove('hidden');
    showSlides();
});