import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../../components/Loader";

 const Computers = ({ isMobile }) => {
  const computer = useGLTF("public/desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1.85} groundColor='white' />
      <spotLight
        position={[-20, 20, 10]}
        angle={0.45}
        penumbra={1}
        intensity={0.60}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={29} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.9 : 1.45}
        position={isMobile ? [-0.1, -4.49, -1.6] : [1.45, -2.05, -3.2]}
        rotation={[0.01, -0.4, -0.1]}
      />
    </mesh>
  );
};

export const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[6, 2]}
      camera={{ position: [20, 3, 5], fov: 24 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;