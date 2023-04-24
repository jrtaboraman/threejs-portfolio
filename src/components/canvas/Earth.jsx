import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = ({ isMobile }) => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[50, 0, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        shadow-mapSize={1024}
      />
      <spotLight
        position={[0, 100, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        shadow-mapSize={1024}
      />
      <spotLight
        position={[-30, -50, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        shadow-mapSize={1024}
      />
      <spotLight
        position={[-30, -30, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={earth.scene}
        scale={isMobile ? 3 : 2}
        position-y={isMobile ? -3.9 : -2.5}
        rotation-y={0}
      />
    </mesh>
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
