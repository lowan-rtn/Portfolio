export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-wide text-sm text-white/90 hover:text-white">LOWAN</a>
        <div className="flex gap-4 text-sm">
          <a href="#projects" className="text-white/70 hover:text-white">Projets</a>
          <a href="#about" className="text-white/70 hover:text-white">À propos</a>
          <a href="#contact" className="text-white/70 hover:text-white">Contact</a>
        </div>
      </nav>
    </header>
  )
}
