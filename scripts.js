// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');

// ===== NAVIGATION ET MENU MOBILE =====
function initNavigation() {
    // Menu hamburger mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navigation active au scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });

        // Effet de transparence de la navbar
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// ===== FILTRES DE PROJETS =====
function initProjectFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat, .contact-method');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== ANIMATION DES BARRES DE COMPÉTENCES =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Validation côté client
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulation d'envoi (remplacer par votre backend)
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        try {
            // Simuler un délai d'envoi
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Ici, vous pouvez intégrer un service comme Formspree, Netlify Forms, ou votre backend
            showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== VALIDATION EMAIL =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info', title = '') {
    // Créer le conteneur de toast s'il n'existe pas
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Créer le toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = getNotificationIcon(type);
    const titleText = title || getNotificationTitle(type);
    
    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${titleText}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Ajouter le toast
    toastContainer.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

function getNotificationTitle(type) {
    switch (type) {
        case 'success': return 'Succès';
        case 'error': return 'Erreur';
        case 'warning': return 'Attention';
        case 'info': return 'Information';
        default: return 'Notification';
    }
}

// ===== ANIMATION DU CODE =====
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// ===== COMPTEUR ANIMÉ =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== EFFET DE TYPING =====
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Démarrer l'effet après un délai
    setTimeout(typeWriter, 500);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Ajuster pour la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const hamburger = document.getElementById('hamburger');
                    if (hamburger) hamburger.classList.remove('active');
                }
            }
        });
    });
}

// ===== PERFORMANCE ET OPTIMISATION =====
function initPerformanceOptimizations() {
    // Lazy loading pour les images (si ajoutées plus tard)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Préchargement des polices
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
}

// ===== GESTION DES ERREURS =====
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Erreur JavaScript:', e.error);
        // Ici vous pourriez envoyer l'erreur à un service de monitoring
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promesse rejetée:', e.reason);
        e.preventDefault();
    });
}

// ===== FONCTIONS UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== GESTION DU THÈME =====
function initTheme() {
    try {
        // Récupérer le thème sauvegardé ou utiliser le thème par défaut
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        // Gestionnaire d'événement pour le toggle
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Gérer le localStorage avec try-catch pour les restrictions de sécurité
            try {
                localStorage.setItem('theme', newTheme);
            } catch (error) {
                console.log('Impossible de sauvegarder le thème (mode privé ou restrictions)');
            }
            
            updateThemeIcon(newTheme);
            
            // Animation de transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    } catch (error) {
        console.log('Erreur lors de l\'initialisation du thème:', error);
        // Fallback : forcer le thème sombre
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== STATISTIQUES GITHUB =====
async function initGitHubStats() {
    try {
        // Vérifier si on est en mode fichier local
        if (window.location.protocol === 'file:') {
            console.log('Mode fichier local détecté, utilisation des valeurs par défaut');
            setDefaultGitHubStats();
            return;
        }

        const username = 'lololepro17';
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Mettre à jour les statistiques
        document.getElementById('repoCount').textContent = userData.public_repos || '--';
        document.getElementById('starCount').textContent = '--'; // Nécessite une API différente
        document.getElementById('forkCount').textContent = '--'; // Nécessite une API différente
        
        // Animation des nombres
        animateNumber('repoCount', userData.public_repos || 0);
        
    } catch (error) {
        console.log('Erreur lors du chargement des stats GitHub:', error);
        setDefaultGitHubStats();
    }
}

function setDefaultGitHubStats() {
    // En cas d'erreur ou mode local, afficher des valeurs par défaut
    const repoCountElement = document.getElementById('repoCount');
    const starCountElement = document.getElementById('starCount');
    const forkCountElement = document.getElementById('forkCount');
    
    if (repoCountElement) repoCountElement.textContent = '6+';
    if (starCountElement) starCountElement.textContent = '--';
    if (forkCountElement) forkCountElement.textContent = '--';
}

// ===== COMPTEUR DE VISITEURS =====
function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitorCount');
    if (!visitorCountElement) return;

    // Récupérer le compteur depuis localStorage
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    
    // Sauvegarder le nouveau compteur
    try {
        localStorage.setItem('visitorCount', visitorCount.toString());
    } catch (error) {
        console.log('Impossible de sauvegarder le compteur de visiteurs');
    }

    // Animer le compteur
    animateNumber('visitorCount', visitorCount);
}

// ===== RECHERCHE BLOG =====
function initBlogSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!searchInput) return; // Pas sur la page blog
    
    let currentFilter = 'all';
    let searchTerm = '';
    
    // Données des articles pour la recherche
    const articlesData = [
        {
            element: blogCards[0],
            title: 'Découverte du Machine Learning avec Python',
            content: 'Exploration des bases du machine learning à travers mon projet CryptoPriceForecast. Découvrez comment j\'ai implémenté des algorithmes de prédiction pour les cryptomonnaies.',
            tags: ['Machine Learning', 'Python', 'Data Science'],
            category: 'python'
        },
        {
            element: blogCards[1],
            title: 'Créer des jeux en Python : Mon expérience',
            content: 'Retour sur la création de mes jeux Puissance 4 et Motus. Les défis techniques rencontrés et les solutions apportées.',
            tags: ['Python', 'Jeux', 'Logique'],
            category: 'python'
        },
        {
            element: blogCards[2],
            title: 'Design moderne pour portfolio développeur',
            content: 'Comment j\'ai créé ce portfolio avec des animations fluides et un design responsive. Les techniques CSS et JavaScript utilisées.',
            tags: ['CSS', 'JavaScript', 'Design'],
            category: 'web'
        },
        {
            element: blogCards[3],
            title: 'Visualisation d\'algorithmes de tri',
            content: 'Création d\'une application web pour visualiser les algorithmes de tri en temps réel. L\'importance de la pédagogie dans le développement.',
            tags: ['Algorithmes', 'Visualisation', 'Pédagogie'],
            category: 'algorithmes'
        }
    ];
    
    // Fonction de recherche
    function performSearch() {
        const searchLower = searchTerm.toLowerCase();
        const filterLower = currentFilter.toLowerCase();
        
        articlesData.forEach((article, index) => {
            const matchesSearch = searchTerm === '' || 
                article.title.toLowerCase().includes(searchLower) ||
                article.content.toLowerCase().includes(searchLower) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchLower));
            
            const matchesFilter = currentFilter === 'all' || article.category === filterLower;
            
            if (matchesSearch && matchesFilter) {
                article.element.classList.remove('hidden');
                article.element.classList.add('fade-in');
            } else {
                article.element.classList.add('hidden');
                article.element.classList.remove('fade-in');
            }
        });
        
        // Afficher/masquer le bouton clear
        clearSearch.style.display = searchTerm ? 'block' : 'none';
    }
    
    // Événements de recherche
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        performSearch();
    });
    
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchTerm = '';
        performSearch();
        searchInput.focus();
    });
    
    // Événements de filtres
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            performSearch();
        });
    });
    
    // Recherche avec Entrée
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    const current = parseInt(element.textContent) || 0;
    const increment = (target - current) / 30;
    let currentValue = current;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= target) || 
            (increment < 0 && currentValue <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 50);
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initialisé');
    
    // Vérifier que tous les éléments nécessaires existent
    const requiredElements = {
        navbar: document.getElementById('navbar'),
        hamburger: document.getElementById('hamburger'),
        navMenu: document.getElementById('nav-menu'),
        themeToggle: document.getElementById('themeToggle'),
        contactForm: document.getElementById('contactForm')
    };
    
    // Initialiser toutes les fonctionnalités avec vérification
    if (requiredElements.themeToggle) initTheme();
    if (requiredElements.navbar) initNavigation();
    if (document.querySelectorAll('.filter-btn').length > 0) initProjectFilters();
    initScrollAnimations();
    if (document.querySelectorAll('.skill-progress').length > 0) initSkillBars();
    if (requiredElements.contactForm) initContactForm();
    initCodeAnimation();
    if (document.querySelectorAll('.stat-number').length > 0) initCounters();
    initTypingEffect();
    initSmoothScroll();
    initGitHubStats();
    initVisitorCounter();
    initBlogSearch();
    initPerformanceOptimizations();
    initErrorHandling();

    // Optimiser le scroll avec throttle
    const throttledScroll = throttle(() => {
        // Logique de scroll optimisée si nécessaire
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScroll);
});

// ===== EXPORT POUR UTILISATION EXTERNE =====
window.PortfolioApp = {
    showNotification,
    initNavigation,
    initProjectFilters,
    initContactForm
}; 