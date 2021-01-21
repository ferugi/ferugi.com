import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function HeadAndHair() {
    const { scene } = useGLTF('./models/myface.glb')
    
    const head = scene.getObjectByName('Head') as any
    const hair = scene.getObjectByName('Hair') as any

    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#fff'), roughness: 1, metalness: 0 })
    
    return (
        <group position={[0, -0.25, 0]} rotation={[0, (Math.PI * 0.35), 0]}>
            <mesh name="head" geometry={head.geometry} material={material} receiveShadow castShadow />
            <mesh name="hair" scale={[1.05, 1.05, 1.05]} position={[0, -0.05, 0]} geometry={hair.geometry} material={material} receiveShadow castShadow />
        </group>
    )
}

