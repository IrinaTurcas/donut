import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Model from './Donut.js'
import './App.css'

function intersectionsFilter(intersections) {
  return intersections?.length ? [intersections[0]] : intersections
}

export default function App() {
  const [active, setActive] = useState(null)
  const selected = active ? [active] : undefined

  return (
    <>
      <Canvas 
          style={{ background: "transparent", height: "100%", width: "100%" }} 
          camera={{ fov: 70, position: [0.1, 0.1, 0.1] }}
          raycaster={{ filter: intersectionsFilter }}
          >
        <ambientLight intensity={1}/>
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Model setActive={setActive}/>
        </Suspense>
        <OrbitControls enableZoom={false}/>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={10} width={1000} />
        </EffectComposer>
      </Canvas>
      <div className="overlay">
        <div className="title">
          <span className="stroked text">Donut&nbsp;</span>
          <span className="donut" onClick={() => console.log("Gogoasa")}>🍩</span>
        </div>
      </div>
    </>
  );
}
