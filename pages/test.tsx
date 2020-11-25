
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { EdgesGeometry, Geometry, WireframeGeometry } from 'three'

const DynamicElement = dynamic(async () => {
    try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')
        const { Canvas, useLoader } = await import('react-three-fiber')
    
        const loader = new GLTFLoader()
        const gltf = await loader.loadAsync('./models/myface.glb') as GLTF
        const mesh = gltf.scene.getObjectByName('FaceBuilderHead') as any

        const material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#2a2a2a'), roughness: 0, metalness: 0.0 })
        const lineGeo = new EdgesGeometry( mesh.geometry )
        var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );

        return () => (
            <Canvas camera={{ position: [3, 0, 0] }} style={{minHeight: "100vh", backgroundColor: "#000"}}>
                <ambientLight intensity={1} />
                <pointLight position={[40, 40, 40]} />
                <lineSegments geometry={lineGeo} material={mat} position={[0,0,1.5]} rotation={[0, 1.75*Math.PI/2, 0]} />
            </Canvas>
        ) as any
        //<mesh name="Object_0" position={[0,0,1.5]} rotation={[0, 1.5*Math.PI/2, 0]} geometry={mesh.geometry} material={material}/>
    } catch (err) {
        return () => (<div>
            {JSON.stringify(err, null, '\n')}
        </div>)
    }

}, { ssr: false })

export default function Test() {
    return (
        <>
            <DynamicElement />
        </>
    )
}
  