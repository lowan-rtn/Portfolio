export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>Lowan Reutin</h1>
        <p className="tag">Développeur · Projets · Portfolio</p>
      </header>

      <section className="about">
        <h2>À propos</h2>
        <p>Bonjour — je m'appelle Lowan. Voici quelques projets et coordonnées.</p>
      </section>

      <section className="projects">
        <h2>Projets</h2>
        <ul>
          <li>
            <a href="#">UrbexMap — projet full‑stack (Next/Express/Postgres)</a>
          </li>
          <li>
            <a href="#">AssistAim — outil assistif (C++ / DirectX)</a>
          </li>
          <li>
            <a href="#">Autre projet</a>
          </li>
        </ul>
      </section>

      <section className="contact">
        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:lowan.rtn@icloud.com">lowan.rtn@icloud.com</a>
        </p>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Lowan</footer>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color: var(--text);
        }
        .hero {
          text-align: center;
          padding: 40px 0;
        }
        h1 { font-size: 2.2rem; margin: 0 }
        .tag { color: var(--muted); margin-top: 8px }
        h2 { margin-top: 36px; }
        a { color: var(--link); text-decoration: none }
        a:hover { text-decoration: underline }
        ul { padding-left: 1.2rem }
        .footer { text-align: center; margin: 60px 0 20px; color: var(--muted) }
        :root {
          --bg: #0b0b0b;
          --text: #eaeaea;
          --muted: #9a9a9a;
          --link: #7dd3fc;
        }
        @media (prefers-color-scheme: light) {
          :root { --bg: #ffffff; --text: #111111; --muted: #666666; --link: #0ea5e9 }
        }
        main { background: var(--bg); min-height: 100vh; }
      `}</style>
    </main>
  )
}
