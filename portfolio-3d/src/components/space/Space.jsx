import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Cloud } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'

function SpaceEnvironment() {
  const starsRef = useRef()

  useFrame((state, delta) => {
    // Rotation lente des étoiles
    starsRef.current.rotation.y += delta * 0.02
    starsRef.current.rotation.x += delta * 0.01
  })

  return (
    <>
      {/* Étoiles en arrière-plan */}
      <Stars 
        ref={starsRef}
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Nébuleuses */}
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={20}
        depth={1.5}
        segments={20}
        color="#88c"
        position={[-10, 10, -15]}
      />
      <Cloud
        opacity={0.3}
        speed={0.2}
        width={15}
        depth={2}
        segments={15}
        color="#c8a"
        position={[10, -5, -20]}
      />
    </>
  )
}

export default function Space() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{ background: '#000008' }}
    >
      {/* Lumières */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#fff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#88c" />
      
      {/* Environnement spatial */}
      <SpaceEnvironment />

      {/* Effets visuels */}
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.5}
        />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  )
}
