import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { useFrame } from 'react-three-fiber'
import { HeadAndHair } from './dynamic/head-hair'

export const Home3DBackground = dynamic(async () => {
    const { Canvas } = await import('react-three-fiber')

    return () => {
        return (
            <Canvas camera={{ position: [6.5, 0, 0], fov: 30 }} shadowMap>
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
        <group>
            <group>
                <ambientLight intensity={0.5} />
                <directionalLight 
                    position={[40, 40, 40]} 
                    intensity={1}
                    castShadow/>
            </group>
            <Suspense fallback={null}>
                <group position={[1, 0, -1]}>
                    <HeadAndHair />
                    <mesh rotation={[0, Math.PI * 0.5, 0]} position={[0,0,0]} receiveShadow>
                        <circleGeometry args={[2.75, 128]} />
                        <meshBasicMaterial color="lightblue" />
                    </mesh>
                </group>
            </Suspense>
        </group>
    )
}
