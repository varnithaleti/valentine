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
    "say 'Yes' pwease..❤️",];

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40) + 20;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Secret Message update
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    statusText.innerText = randomMsg;

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
noBtn.addEventListener('click', moveNoButton);

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