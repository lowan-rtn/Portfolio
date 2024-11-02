// Détecter le mode de préférence du navigateur
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Vérifier si l'utilisateur a une préférence enregistrée
const currentMode = localStorage.getItem("theme");

if (currentMode === "dark") {
    document.body.classList.add("dark-mode");
} else if (currentMode === "light") {
    document.body.classList.remove("dark-mode");
} else if (prefersDarkScheme.matches) {
    // Si pas de préférence enregistrée, utiliser le mode du navigateur
    document.body.classList.add("dark-mode");
}

// Ajouter un écouteur d'événement au bouton
document.getElementById("mode-toggle").addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }
});


document.querySelectorAll('.social-media a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut
        const url = this.href; // Récupère l'URL du lien

        // Animation (vous pouvez ajouter une classe CSS ou un style)
        this.classList.add('clicked');
        
        // Délai avant redirection
        setTimeout(() => {
            window.location.href = url; // Redirige après l'animation
        }, 300); // Délai en millisecondes (300ms ici)
    });
});
