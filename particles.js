// configuration de particles.js pour un effet stellaire interactif
particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 80, // nombre de particules
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          // couleurs des particules : bleu, violet et blanc
          "value": ["#3498db", "#9b59b6", "#ffffff"]
        },
        "shape": {
          "type": "circle" // forme circulaire
        },
        "opacity": {
          "value": 0.8,
          "random": false
        },
        "size": {
          "value": 3,
          "random": true
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse" // effet de répulsion au survol
          },
          "onclick": {
            "enable": true,
            "mode": "push" // ajout de particules au clic
          },
          "resize": true
        },
        "modes": {
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    }
  );
  