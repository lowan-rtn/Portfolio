import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <main>
      <Background />
      <Navbar />
      <Hero />
      <Projects />

      <section id="about" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold">À propos</h2>
        <p className="mt-3 text-white/80 max-w-3xl">
          Je conçois des interfaces propres et des systèmes fiables. Mon objectif : livrer vite,
          propre, et utile. J’aime Next.js, Tailwind, Docker, Postgres et un bon setup DevOps.
        </p>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
        <p className="mt-3 text-white/80">Écris-moi : <a className="text-violet hover:underline" href="mailto:lowan.rtn@icloud.com">lowan.rtn@icloud.com</a></p>
      </section>

      <footer className="text-center text-white/50 py-10 text-sm">© {new Date().getFullYear()} Lowan</footer>
    </main>
  )
}
