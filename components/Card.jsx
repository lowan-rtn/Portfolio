import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function Card({ title, desc, href, tags=[] }) {
  const ref = useRef(null)

  function handleMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${py * -6}deg`)
    el.style.setProperty('--ry', `${px *  8}deg`)
  }
  function reset() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group relative rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-violet/40 shadow-neon transition-colors will-change-transform"
      style={{ transform: 'perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0))' }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ boxShadow: '0 0 64px rgba(124,46,255,0.35) inset' }} />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map(t => (
          <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">{t}</span>
        ))}
      </div>
    </motion.a>
  )
}
