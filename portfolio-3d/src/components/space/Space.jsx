import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Cloud, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import SpaceStation from './SpaceStation'

function SpaceEnvironment() {
  const starsRef = useRef()
  const [activeModule, setActiveModule] = useState(null)

  const handleModuleClick = useCallback((moduleName) => {
    console.log(`Module clicked: ${moduleName}`)
    setActiveModule(moduleName)
    // Ici nous ajouterons l'animation de la caméra vers le module
  }, [])

  useFrame((state, delta) => {
    // Rotation lente des étoiles
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02
      starsRef.current.rotation.x += delta * 0.01
    }
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

      {/* Station Spatiale */}
      <SpaceStation onModuleClick={handleModuleClick} />
    </>
  )
}

export default function Space() {
  return (
    <Canvas style={{ background: '#000008' }}>
      {/* Camera et contrôles */}
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={10}
        maxDistance={30}
        rotateSpeed={0.5}
      />

      {/* Lumières */}
      <ambientLight intensity={0.4} />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#000000"
        intensity={0.5}
      />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#88ccff" />
      <pointLight position={[0, 0, 15]} intensity={1} color="#4fc3f7" />
      <pointLight position={[0, 0, -15]} intensity={0.8} color="#ffffff" />
      
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
