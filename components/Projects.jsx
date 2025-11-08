import { motion } from 'framer-motion'
import Card from './Card'

const items = [
  { title: 'UrbexMap', desc: 'Cartographie privée — Next.js, Leaflet, Express, Postgres', tags:['Next.js','Leaflet','Docker'] },
  { title: 'AssistAim', desc: 'Outil assistif — C++ / DirectX', tags:['C++','DX11'] },
  { title: 'Portfolio', desc: 'Ce site — Next.js + Tailwind + Framer Motion', tags:['Next.js','Tailwind','Motion'] },
]

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold">Projets</h2>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden:{}, show:{ transition:{ staggerChildren: 0.07 } } }}
        className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {items.map((p, i)=>(
          <motion.div key={i} variants={{ hidden:{ opacity:0, y:12 }, show:{ opacity:1, y:0 } }}>
            <Card {...p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
