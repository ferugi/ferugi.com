import { useGLTF } from '@react-three/drei/core/useGLTF'
import useEventListener from '@use-it/event-listener'
import dynamic from 'next/dynamic'
import React, { HTMLAttributes, Suspense, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { Group, Vector2, MathUtils } from 'three'
import BackgroundCircles from '../../../public/background-circle.svg'
import styles from './face-canvas.module.scss'

const deg = MathUtils.degToRad

export const FaceCanvas = dynamic(async () => {
    const { Canvas } = await import('react-three-fiber')

    return (props?: HTMLAttributes<HTMLDivElement> & { showAxesHelper: boolean }) => {
        return (
            <>
                <BackgroundCircles className={styles.backgroundCircles} />
                <Canvas
                    {...props}
                    camera={{ position: [0, 0, 7.5], fov: 36 }}
                    style={{ position: 'absolute' }}
                    shadowMap
                    gl={{
                        alpha: true,
                        antialias: true 
                    }}>
                    <InnerCanvas />
                    { props.showAxesHelper && <axesHelper position={[0,0,4]} /> }
                </Canvas>
            </>
        )
    }
}, { ssr: false })

const InnerCanvas = () => {

    const idleTarget = new Vector2(0,0);

    const [lastMousePoint, setLastMousePoint] = useState(new Vector2(0,0))
    const [mousePoint, setMousePoint] = useState(new Vector2(0,0))
    const [currentlyLookingAt, setCurrentlyLookingAt] = useState(new Vector2(0,0))
    const [mouseLastMoved, setMouseLastMoved] = useState(0)

    useEventListener('mousemove', (event : MouseEvent) => {
        const windowWidth = window.innerWidth / 2
        const windowHeight = window.innerHeight / 2

        const mouseX = (event.x - windowWidth) / windowWidth
        const mouseY = (windowHeight - event.y) / windowHeight
        const vector = new Vector2(mouseX, mouseY)

        setMousePoint(vector);
        setMouseLastMoved(Date.now())
    })

    const face = useRef<Group>()

    useFrame(({ camera }) => {

        let targetToLookAt = currentlyLookingAt;

        // mouse is moving
        if (mousePoint !== lastMousePoint) {
            const alpha = Math.min(
                currentlyLookingAt.distanceTo(mousePoint) * 0.2  + 0.01,
                currentlyLookingAt.distanceTo(idleTarget) * 0.2  + 0.01,
                1
            )

            // target to look at = somewhere between current position and mouse
            targetToLookAt = currentlyLookingAt.lerp(mousePoint, alpha);
        }
        // mouse is not moving
        else if ((mouseLastMoved + 350) < Date.now()) {
            const alpha = Math.min(
                currentlyLookingAt.distanceTo(mousePoint) * 0.02 + 0.01,
                currentlyLookingAt.distanceTo(idleTarget) * 0.02 + 0.01,
                1
            )

            // target to look at is somewhere between current position and idle position
            targetToLookAt = currentlyLookingAt.lerp(idleTarget, alpha);
        }

        if (!!face.current) {
            face.current.lookAt(targetToLookAt.x, targetToLookAt.y, camera.position.z);
        }

        setCurrentlyLookingAt(targetToLookAt);
        setLastMousePoint(mousePoint);
    })
    
    return  (
        <group>
            <group>
                <ambientLight intensity={0.5} />
                <directionalLight 
                    position={[-5, 5, 5]} 
                    intensity={1}
                    shadow-mapSize-height={2048}
                    shadow-mapSize-width={2048}
                    shadowCameraNear={0}
                    shadowCameraFar={40}
                    castShadow />
            </group>
            <Suspense fallback={null}>
                <group ref={face}>
                    <HeadAndHair />
                </group>
            </Suspense>
        </group>
    )
}

const HeadAndHair = () => {
    const { scene } = useGLTF('./models/myface.glb')
    
    const head = scene.getObjectByName('Head') as any
    const hair = scene.getObjectByName('Hair') as any

    const material = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color('#fff'), 
        roughness: 1,
        blending: THREE.NoBlending
    })
    
    return (
        <group position={[0, -0.25, 0]} rotation={[0, deg(-10), 0]} visible={true}>
            <mesh name="head" geometry={head.geometry} material={material} receiveShadow castShadow />
            <mesh name="hair" scale={[1.05, 1.05, 1.05]} position={[0, -0.05, 0]} geometry={hair.geometry}
                material={material} receiveShadow castShadow />
        </group>
    )
}
