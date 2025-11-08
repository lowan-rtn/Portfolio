import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="top" className="max-w-6xl mx-auto px-4 pt-20 pb-10 md:pt-28 md:pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight"
      >
        Lowan Reutin
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-3 text-lg md:text-xl text-white/80"
      >
        Passionné par le code, le design et l’impact.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-6 flex flex-wrap gap-3"
      >
        <a href="#projects" className="px-5 py-2.5 rounded-lg bg-violet text-white font-medium shadow-neon hover:shadow-neonSoft transition-shadow">Voir mes projets</a>
        <a href="#contact" className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/15 border border-white/10">Me contacter</a>
      </motion.div>
    </section>
  )
}
