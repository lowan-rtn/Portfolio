export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_10%,rgba(124,46,255,0.12),transparent_40%),radial-gradient(900px_circle_at_80%_20%,rgba(214,107,255,0.10),transparent_45%),radial-gradient(1000px_circle_at_50%_80%,rgba(124,46,255,0.18),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet/50 animate-float"
            style={{
              left: `${(i * 67) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-12px) }
          100% { transform: translateY(0) }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
