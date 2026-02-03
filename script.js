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
    // Switch to fixed positioning so it moves relative to the whole screen
    noBtn.style.position = 'fixed';
    
    const padding = 50; // Keep away from edges
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Update secret message
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