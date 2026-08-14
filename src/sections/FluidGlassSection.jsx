/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, Suspense } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  MeshTransmissionMaterial,
  Text,
  Environment,
  Float,
} from '@react-three/drei';
import { easing } from 'maath';

// ============================================================
// FLUID GLASS — Adapted from React Bits (reactbits.dev)
// Uses a procedural icosahedron instead of external GLB models,
// keeping the beautiful transmission material effect.
// ============================================================

const GlassObject = memo(function GlassObject({ children }) {
  const meshRef = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Follow pointer smoothly
    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    easing.damp3(meshRef.current.position, [destX, destY, 15], 0.15, delta);

    // Gentle rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    // Render scene to buffer for refraction
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={meshRef} scale={0.35}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.25}
          thickness={4}
          anisotropy={0.15}
          chromaticAberration={0.12}
          roughness={0}
          transmission={1}
          color="#ffffff"
          attenuationColor="#c4b5fd"
          attenuationDistance={0.6}
        />
      </mesh>
    </>
  );
});

function SceneContent() {
  const { viewport } = useThree();

  return (
    <>
      {/* Floating text labels */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <Text
          position={[-viewport.width * 0.2, viewport.height * 0.15, 0]}
          fontSize={Math.min(viewport.width * 0.08, 0.5)}
          color="#c4b5fd"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          Fluid
        </Text>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <Text
          position={[viewport.width * 0.15, -viewport.height * 0.12, 2]}
          fontSize={Math.min(viewport.width * 0.08, 0.5)}
          color="#818cf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          Glass
        </Text>
      </Float>

      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.5}>
        <Text
          position={[0, viewport.height * 0.3, 4]}
          fontSize={Math.min(viewport.width * 0.04, 0.25)}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          React Bits
        </Text>
      </Float>

      {/* Decorative shapes behind the glass */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-1.2, 0.5, -2]}>
          <torusGeometry args={[0.3, 0.12, 16, 32]} />
          <meshStandardMaterial color="#7c3aed" roughness={0.3} metalness={0.6} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[1, -0.3, -1]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh position={[0.5, 0.8, -3]}>
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.25} metalness={0.7} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[-0.8, -0.7, -2.5]}>
          <tetrahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#a78bfa" roughness={0.3} metalness={0.5} />
        </mesh>
      </Float>
    </>
  );
}

export default function FluidGlassSection() {
  return (
    <div className="w-full h-full relative" style={{ background: '#0f0a1a' }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: false, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0f0a1a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#7c3aed" />
        <pointLight position={[3, 2, -1]} intensity={0.4} color="#6366f1" />
        <Suspense fallback={null}>
          <GlassObject>
            <SceneContent />
          </GlassObject>
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Overlay info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-heading font-semibold text-white/40 uppercase tracking-[0.12em]">
            React Bits
          </span>
          <span className="text-[13px] font-medium text-white/70">
            Fluid Glass Effect
          </span>
        </div>
        <span className="text-[10px] text-white/30 font-mono">
          move cursor to interact
        </span>
      </div>
    </div>
  );
}
