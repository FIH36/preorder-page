import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Glasses(props) {
  const { nodes, materials } = useGLTF('/glasses.glb')
  return (
    <group scale={[35,35,35]} position={[-4.9, -0.5, 0]} {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_1_Plastic_0.geometry}
          material={materials.Plastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2_Plastic_0.geometry}
          material={materials.Plastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3_Plastic_0.geometry}
          material={materials.Plastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4_Glass_0.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5_Glass_0.geometry}
          material={materials.Glass}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/glasses.glb')