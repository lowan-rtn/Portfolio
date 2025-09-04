export function initAnimations() {
    // Animation des skills au scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const projectCards = document.querySelectorAll('.project-card');
    const achievementCards = document.querySelectorAll('.achievement-card');

    const options = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe les barres de compétences
    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // Observe les cartes de projets
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observe les cartes de réalisations
    achievementCards.forEach(card => {
        observer.observe(card);
    });

    // Animation du scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
