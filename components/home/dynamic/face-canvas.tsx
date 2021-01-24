import { useGLTF } from '@react-three/drei/core/useGLTF'
import dynamic from 'next/dynamic'
import React, { HTMLAttributes, Suspense } from 'react'
import { ContainerProps, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

export const FaceCanvas = dynamic(async () => {
    const { Canvas } = await import('react-three-fiber')

    return (props?: HTMLAttributes<HTMLDivElement>) => {
        return (
            <Canvas {...props} camera={{ position: [6.5, 0, 0], fov: 30 }} shadowMap>
                <InnerCanvas/>
            </Canvas>
        ) as any
    }
}, { ssr: false })

const InnerCanvas = () => {
    
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

function HeadAndHair() {
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
