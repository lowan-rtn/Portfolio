import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder } from '@react-three/drei'

function SpaceStation({ onModuleClick }) {
  const stationRef = useRef()

  useFrame((state) => {
    // Légère rotation flottante
    if (stationRef.current) {
      stationRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  // Matériaux de base pour la station
  const baseMaterial = {
    metalness: 0.6,
    roughness: 0.2,
    color: '#78909c',
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.95
  }

  // Matériau pour les fenêtres/accents
  const accentMaterial = {
    metalness: 0.9,
    roughness: 0.1,
    emissive: '#64b5f6',
    emissiveIntensity: 2.0,
    color: '#bbdefb',
    transparent: true,
    opacity: 0.9
  }

  // Matériau pour le hub central
  const hubMaterial = {
    metalness: 0.7,
    roughness: 0.2,
    color: '#90a4ae',
    envMapIntensity: 1.2,
    transparent: true,
    opacity: 0.95
  }

  // Création des instances de matériaux
  const baseStandardMaterial = <meshPhysicalMaterial {...baseMaterial} />
  const accentStandardMaterial = <meshPhysicalMaterial {...accentMaterial} />
  const hubStandardMaterial = <meshPhysicalMaterial {...hubMaterial} />

  return (
    <group ref={stationRef} position={[0, 0, 0]}>
      {/* Module central (Hub) */}
      {/* Module central (Hub) */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]} onClick={() => onModuleClick('hub')}>
        {hubStandardMaterial}
      </Sphere>
      
      {/* Bande d'accent autour du hub */}
      <Cylinder
        args={[2.1, 2.1, 0.3, 32]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}>
        {accentStandardMaterial}
      </Cylinder>

      {/* Module Projets */}
      <group position={[4, 0, 0]} onClick={() => onModuleClick('projects')}>
        <Box args={[3, 2, 2]}>
          {baseStandardMaterial}
        </Box>
        <Sphere args={[0.3, 16, 16]} position={[1.5, 0, 0]}>
          {accentStandardMaterial}
        </Sphere>
      </group>

      {/* Module Compétences */}
      <group position={[-4, 0, 0]} onClick={() => onModuleClick('skills')}>
        <Box args={[3, 2, 2]}>
          {baseStandardMaterial}
        </Box>
        <Sphere args={[0.3, 16, 16]} position={[-1.5, 0, 0]}>
          {accentStandardMaterial}
        </Sphere>
      </group>

      {/* Module Blog/Articles */}
      <group position={[0, 4, 0]} onClick={() => onModuleClick('blog')}>
        <Box args={[2, 3, 2]}>
          {baseStandardMaterial}
        </Box>
        <Sphere args={[0.3, 16, 16]} position={[0, 1.5, 0]}>
          {accentStandardMaterial}
        </Sphere>
      </group>

      {/* Module Contact */}
      <group position={[0, -4, 0]} onClick={() => onModuleClick('contact')}>
        <Box args={[2, 3, 2]}>
          {baseStandardMaterial}
        </Box>
        <Sphere args={[0.3, 16, 16]} position={[0, -1.5, 0]}>
          {accentStandardMaterial}
        </Sphere>
      </group>

      {/* Tubes de connexion */}
      <Cylinder 
        args={[0.3, 0.3, 4, 16]} 
        position={[2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}>
        {baseStandardMaterial}
      </Cylinder>
      <Cylinder 
        args={[0.3, 0.3, 4, 16]} 
        position={[-2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}>
        {baseStandardMaterial}
      </Cylinder>
      <Cylinder 
        args={[0.3, 0.3, 4, 16]} 
        position={[0, 2, 0]}>
        {baseStandardMaterial}
      </Cylinder>
      <Cylinder 
        args={[0.3, 0.3, 4, 16]} 
        position={[0, -2, 0]}>
        {baseStandardMaterial}
      </Cylinder>
    </group>
  )
}

export default SpaceStation
