const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const statusText = document.getElementById('status-text');
const questionCard = document.getElementById('question-card');
const successCard = document.getElementById('success-card');
const madPhoto = document.getElementById('mad-photo');
const buttonContainer = document.querySelector('.buttons');

let slideIndex = 0;
let inflationLevel = 1; // Starting scale for Yes button

const messages = [
    "umm, let's talk about this...",
    "you missed! 💨",
    "nice try, rakshu hehe!",
    "Error 404: 'No' not found",
    "is your mouse broken? 😉",
    "say 'Yes' pwease..❤️",
    "better not say no...😈"
];

function moveNoButton() {
    // 1. Calculate boundaries based on the container, not the window
    const containerWidth = buttonContainer.offsetWidth;
    const containerHeight = buttonContainer.offsetHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = containerWidth - btnWidth;
    const maxY = containerHeight - btnHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // 2. Move the No button within the white card
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // 3. Inflate the Yes button
    inflationLevel += 0.15; // Grows by 15% each time
    yesBtn.style.transform = `scale(${inflationLevel})`;

    // 4. Update secret message
    if (statusText) {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        statusText.innerText = randomMsg;
    }

    triggerMadPhoto();
}

function triggerMadPhoto() {
    madPhoto.classList.remove('flash-animation');
    void madPhoto.offsetWidth; 
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

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
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