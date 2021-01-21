import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { useFrame } from 'react-three-fiber'
import { HeadAndHair } from './dynamic/test-component'

export const Home3DBackground = dynamic(async () => {
    const { Canvas } = await import('react-three-fiber')

    return () => {
        return (
            <Canvas camera={{ position: [6.25, 0, 0], fov: 30 }} shadowMap>
                <InnerBackground/>
            </Canvas>
        ) as any
    }
}, { ssr: false })

const InnerBackground = () => {
    
    useFrame(({ camera, mouse }) => {
        camera.position.z = (mouse.x * window.innerWidth) / 4000;
        camera.position.y = -(mouse.y * window.innerHeight) / 4000;
    })

    return (
        <group position={[1, -.25, -1]}>
            <ambientLight intensity={0.6} />
            <directionalLight 
                position={[40, 40, 40]} 
                intensity={1} 
                castShadow/>
            <Suspense fallback={null}>
                <HeadAndHair />
            </Suspense>
            <mesh rotation={[0, Math.PI * 0.5, 0]} position={[0,0,1]} receiveShadow>
                <circleGeometry args={[4, 64]} />
                <meshBasicMaterial color="lightblue" />
            </mesh>
        </group>
    )
}
