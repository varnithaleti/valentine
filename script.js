const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const playground = document.getElementById('button-playground');
const statusText = document.getElementById('status-text');
const questionCard = document.getElementById('question-card');
const successCard = document.getElementById('success-card');
const madPhoto = document.getElementById('mad-photo');

let yesScale = 1;
let slideIndex = 0;

const messages = [
    "nice try, rakshu hehe!",
    "you missed! 💨",
    "is your mouse broken? 😉",
    "say 'Yes' pwease..❤️",
    "Error 404: 'No' not found",
    "I'm getting faster! 😈"
];

function moveNoButton() {
    // 1. Make No button absolute so it can jump
    noBtn.style.position = 'absolute';

    // 2. Get playground dimensions
    const pRect = playground.getBoundingClientRect();
    const bRect = noBtn.getBoundingClientRect();

    // 3. Calculate max coordinates within playground
    const maxX = pRect.width - bRect.width;
    const maxY = pRect.height - bRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // 4. Apply new position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // 5. Inflate Yes button
    yesScale += 0.2; // Grows 20% each time
    yesBtn.style.transform = `scale(${yesScale})`;

    // 6. Flash mad photo and change message
    triggerMadPhoto();
    statusText.innerText = messages[Math.floor(Math.random() * messages.length)];
}

function triggerMadPhoto() {
    madPhoto.classList.remove('flash-animation');
    void madPhoto.offsetWidth; // Force reflow
    madPhoto.classList.add('flash-animation');
}

function showSlides() {
    let slides = document.getElementsByClassName("couple-img");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000);
}

// Listeners
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
    questionCard.style.display = 'none';
    successCard.classList.remove('hidden');
    showSlides();
});