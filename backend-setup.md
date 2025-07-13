# 🔧 Guide Backend Sécurisé

## Option 1 : Services Tiers (Recommandé)

### Formspree (Gratuit)
```html
<!-- Remplacer dans index.html -->
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Envoyer</button>
</form>
```

### Netlify Forms (Gratuit)
```html
<!-- Ajouter data-netlify="true" -->
<form name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- vos champs -->
</form>
```

### EmailJS (Gratuit)
```javascript
// Dans scripts.js
emailjs.init("VOTRE_USER_ID");
emailjs.send("service_id", "template_id", {
    name: "Nom",
    email: "email@example.com",
    message: "Message"
});
```

## Option 2 : Backend Simple

### Node.js + Express
```javascript
// server.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 requêtes max
});

app.use(helmet());
app.use('/contact', limiter);

app.post('/contact', (req, res) => {
    // Validation et envoi d'email
});
```

### Python + Flask
```python
# app.py
from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address)

@app.route('/contact', methods=['POST'])
@limiter.limit("5 per minute")
def contact():
    # Validation et envoi
    return jsonify({"success": True})
```

## Option 3 : Serverless Functions

### Vercel Functions
```javascript
// api/contact.js
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Validation et envoi
    res.status(200).json({ success: true });
}
```

### Netlify Functions
```javascript
// functions/contact.js
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not allowed' };
    }
    
    // Validation et envoi
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
``` 