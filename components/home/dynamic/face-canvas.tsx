import { useGLTF } from '@react-three/drei/core/useGLTF'
import useEventListener from '@use-it/event-listener'
import dynamic from 'next/dynamic'
import React, { HTMLAttributes, Suspense, useRef, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import { Group, PerspectiveCamera, Vector2, MathUtils } from 'three'
import BackgroundCircles from '../../../public/background-circle.svg'
import styles from './face-canvas.module.scss'

const deg = MathUtils.degToRad

export const FaceCanvas = dynamic(async () => {
    const { Canvas } = await import('react-three-fiber')

    // TODO: Use Tailwind breakpoints to manipulate canvas style

    return (props?: HTMLAttributes<HTMLDivElement> & { showAxesHelper: boolean }) => {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
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
                        { props.showAxesHelper && <InnerCanvas /> }
                        <axesHelper position={[0,0,4]} />
                    </Canvas>
                </div>
            </div>
        )
    }
}, { ssr: false })

const InnerCanvas = () => {
    const { camera, gl } = useThree()

    const face = useRef<Group>()
    const perspectiveCamera = camera as PerspectiveCamera;

    var distance = 1
    var vFov = (camera as PerspectiveCamera).fov * Math.PI / 180
    var planeHeight = (2 * Math.tan(vFov / 2) * distance)
    var planeWidth = planeHeight * perspectiveCamera.aspect

    const [mousePoint, setMousePoint] = useState(new Vector2(0,0))

    useEventListener('mousemove', (event : MouseEvent) => {
        const windowWidth = window.innerWidth / 2
        const windowHeight = window.innerHeight / 2

        const mouseX = (event.x - windowWidth) / windowWidth
        const mouseY = (windowHeight - event.y) / windowHeight
        const vector = new Vector2(mouseX, mouseY)
        setMousePoint(vector);
    })

    useFrame(({ camera }) => {
        face.current.lookAt(mousePoint.x, mousePoint.y, camera.position.z)
        gl.shadowMap.type = THREE.PCFSoftShadowMap
        gl.shadowMap.enabled = true
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
                    //shadow-bias={0.001}
                    //shadow-radius={4}
                    shadowCameraNear={0}
                    shadowCameraFar={40}
                    castShadow 
                    />
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
