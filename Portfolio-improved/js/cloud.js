// cloud.js : animation de fumée sur canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 200;
const speed = 0.5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initialisation des particules autour des bords
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let radius = Math.random() * Math.max(canvas.width, canvas.height) / 2 + Math.max(canvas.width, canvas.height) / 2;
        let x = canvas.width / 2 + Math.cos(angle) * radius;
        let y = canvas.height / 2 + Math.sin(angle) * radius;
        particles.push({ x, y, radius: Math.random() * 5 + 1, angle });
    }
}

// animation des particules
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
        p.angle += speed * 0.01;
        p.x = canvas.width / 2 + Math.cos(p.angle) * (Math.max(canvas.width, canvas.height));
        p.y = canvas.height / 2 + Math.sin(p.angle) * (Math.max(canvas.width, canvas.height));
    });
    requestAnimationFrame(animate);
}

// ajustement au redimensionnement
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// lancement
initParticles();
animate();
