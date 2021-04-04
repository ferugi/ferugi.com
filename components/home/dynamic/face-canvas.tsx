import { useGLTF } from '@react-three/drei/core/useGLTF'
import useEventListener from '@use-it/event-listener'
import dynamic from 'next/dynamic'
import React, { HTMLAttributes, Suspense, useRef, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import { Group, Mesh, PerspectiveCamera, Vector3 } from 'three'

const deg = THREE.MathUtils.degToRad;

export const FaceCanvas = dynamic(async () => {
    const { Canvas } = await import('react-three-fiber')

    // TODO: Use Tailwind breakpoints to manipulate canvas style

    return (props?: HTMLAttributes<HTMLDivElement>) => {
        return (
            <Canvas style={{ 
                    position: 'absolute', 
                    width: '100vh', 
                    height: '100vh', 
                    right: 0, 
                    top: 0 }} 
                {...props} 
                camera={{ position: [6.5, 0, 0], fov: 30 }} 
                shadowMap>
                <InnerCanvas />
            </Canvas>
        ) as any
    }
}, { ssr: false })

const InnerCanvas = () => {
    const { camera } = useThree()


    const screenMesh = useRef<Mesh>()
    const face = useRef<Group>()
    const perspectiveCamera = camera as PerspectiveCamera;

    var distance = 1
    var vFov = (camera as PerspectiveCamera).fov * Math.PI / 180
    var planeHeight = (2 * Math.tan(vFov / 2) * distance)
    var planeWidth = planeHeight * perspectiveCamera.aspect

    const [mousePoint, setMousePoint] = useState(new Vector3(10,0,0))

    useEventListener('mousemove', (event : MouseEvent) => {
        const windowWidth = window.innerWidth / 2
        const windowHeight = window.innerHeight / 2

        const mouseX = (windowWidth - event.x) / windowWidth
        const mouseY = (windowHeight - event.y) / windowHeight
        const vector = new Vector3(10, mouseY, mouseX)
        setMousePoint(vector);
    })

    useFrame(() => {
        face.current.lookAt(mousePoint)
    })
    
    return  (
        <group>
            <group>
                <ambientLight intensity={0.5} />
                <directionalLight 
                    position={[40, 40, 40]} 
                    intensity={1}
                    castShadow/>
            </group>
            <Suspense fallback={null}>
                <group ref={face} position={[0, 0, 0]} rotation={[0,0,0]}>
                    <HeadAndHair />
                </group>
            </Suspense>
            <mesh ref={screenMesh} rotation={[0,deg(90),0]} position={[5.5,0,0]} visible={false}>
                <planeGeometry args={[planeWidth, planeHeight]} />
            </mesh>
        </group>
    )
}

const HeadAndHair = () => {
    const { scene } = useGLTF('./models/myface.glb')
    
    const head = scene.getObjectByName('Head') as any
    const hair = scene.getObjectByName('Hair') as any

    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#fff'), roughness: 1, metalness: 0 })
    
    return (
        <group position={[0, -0.25, 0]} rotation={[0, -deg(15), 0]}>
            <mesh name="head" geometry={head.geometry} material={material} receiveShadow castShadow />
            <mesh name="hair" scale={[1.05, 1.05, 1.05]} position={[0, -0.05, 0]} geometry={hair.geometry} material={material} receiveShadow castShadow />
        </group>
    )
}
