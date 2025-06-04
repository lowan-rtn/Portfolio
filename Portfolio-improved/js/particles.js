// particles.js configuration
if (window.innerWidth > 768) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ['#9b59b6','#3498db','#ffffff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.7, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' }
      },
      modes: { repulse: { distance: 100 } }
    },
    retina_detect: true
  });
}
