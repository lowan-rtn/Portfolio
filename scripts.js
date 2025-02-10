document.addEventListener("DOMContentLoaded", function () {
    const modeToggle = document.getElementById("mode-toggle");
    const body = document.body;
    
    // Vérifier le mode actuel dans le localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        modeToggle.classList.add("dark-mode");
    }

    modeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        modeToggle.classList.toggle("dark-mode");
        
        // Enregistrer la préférence de l'utilisateur
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
