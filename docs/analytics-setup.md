# 📊 Analytics et Monitoring

## Option 1 : Google Analytics (Gratuit)

### Ajouter dans le <head> de index.html
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Option 2 : Analytics Simple (Recommandé)

### Créer analytics.js
```javascript
// analytics.js
class PortfolioAnalytics {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
    }

    // Générer un ID de session unique
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Tracker un événement
    trackEvent(eventName, data = {}) {
        const event = {
            event: eventName,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            url: window.location.href,
            userAgent: navigator.userAgent,
            data: data
        };

        this.events.push(event);
        this.saveToLocalStorage();
        this.sendToServer(event);
    }

    // Tracker les clics sur les projets
    trackProjectClick(projectName) {
        this.trackEvent('project_click', { project: projectName });
    }

    // Tracker les soumissions de formulaire
    trackFormSubmission(formType) {
        this.trackEvent('form_submission', { form: formType });
    }

    // Tracker le temps passé sur le site
    trackTimeOnSite() {
        const timeSpent = Date.now() - this.startTime;
        this.trackEvent('time_on_site', { duration: timeSpent });
    }

    // Sauvegarder en localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('portfolio_analytics', JSON.stringify(this.events));
        } catch (error) {
            console.log('Impossible de sauvegarder les analytics');
        }
    }

    // Envoyer au serveur (optionnel)
    sendToServer(event) {
        // Ici vous pouvez envoyer à votre backend
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event)
        // });
    }

    // Obtenir les statistiques
    getStats() {
        const stats = {
            totalEvents: this.events.length,
            sessionDuration: Date.now() - this.startTime,
            pageViews: this.events.filter(e => e.event === 'page_view').length,
            projectClicks: this.events.filter(e => e.event === 'project_click').length,
            formSubmissions: this.events.filter(e => e.event === 'form_submission').length
        };
        return stats;
    }
}

// Initialiser les analytics
const analytics = new PortfolioAnalytics();

// Tracker les événements automatiquement
document.addEventListener('DOMContentLoaded', () => {
    // Tracker la vue de page
    analytics.trackEvent('page_view', { 
        page: window.location.pathname,
        title: document.title 
    });

    // Tracker les clics sur les projets
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.querySelector('h3')?.textContent || 'Projet inconnu';
            analytics.trackProjectClick(projectName);
        });
    });

    // Tracker les soumissions de formulaire
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            const formType = form.id || 'form_generique';
            analytics.trackFormSubmission(formType);
        });
    });

    // Tracker le temps passé avant de quitter
    window.addEventListener('beforeunload', () => {
        analytics.trackTimeOnSite();
    });
});
```

## Option 3 : Dashboard Analytics Simple

### Créer dashboard.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Analytics - Portfolio</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            margin: 0;
            padding: 20px;
        }
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: #1a1a1a;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #333;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #3498db;
        }
        .stat-label {
            color: #bdc3c7;
            margin-top: 5px;
        }
        .chart-container {
            background: #1a1a1a;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>📊 Dashboard Analytics</h1>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalVisits">0</div>
                <div class="stat-label">Visites totales</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="avgTime">0s</div>
                <div class="stat-label">Temps moyen</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="projectClicks">0</div>
                <div class="stat-label">Clics projets</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="formSubmissions">0</div>
                <div class="stat-label">Formulaires envoyés</div>
            </div>
        </div>

        <div class="chart-container">
            <h3>📈 Événements récents</h3>
            <div id="recentEvents"></div>
        </div>
    </div>

    <script src="analytics.js"></script>
    <script>
        // Afficher les statistiques
        function displayStats() {
            const stats = analytics.getStats();
            
            document.getElementById('totalVisits').textContent = stats.pageViews;
            document.getElementById('avgTime').textContent = Math.round(stats.sessionDuration / 1000) + 's';
            document.getElementById('projectClicks').textContent = stats.projectClicks;
            document.getElementById('formSubmissions').textContent = stats.formSubmissions;

            // Afficher les événements récents
            const recentEvents = analytics.events.slice(-10).reverse();
            const eventsHtml = recentEvents.map(event => 
                `<div style="padding: 10px; border-bottom: 1px solid #333;">
                    <strong>${event.event}</strong> - ${new Date(event.timestamp).toLocaleString()}
                    ${event.data ? `<br><small>${JSON.stringify(event.data)}</small>` : ''}
                </div>`
            ).join('');
            
            document.getElementById('recentEvents').innerHTML = eventsHtml;
        }

        // Mettre à jour toutes les 5 secondes
        setInterval(displayStats, 5000);
        displayStats();
    </script>
</body>
</html>
```

## Option 4 : Monitoring de Performance

### Ajouter dans scripts.js
```javascript
// Monitoring de performance
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Mesurer le temps de chargement
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.loadTime = loadTime;
            
            // Envoyer les métriques
            this.sendMetrics({
                type: 'performance',
                loadTime: loadTime,
                url: window.location.href
            });
        });

        // Mesurer les Core Web Vitals
        if ('PerformanceObserver' in window) {
            // LCP (Largest Contentful Paint)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // FID (First Input Delay)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // CLS (Cumulative Layout Shift)
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cls = clsValue;
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }

    sendMetrics(metrics) {
        // Envoyer à votre backend ou service d'analytics
        console.log('Métriques de performance:', metrics);
    }
}

// Initialiser le monitoring
const performanceMonitor = new PerformanceMonitor();
``` 