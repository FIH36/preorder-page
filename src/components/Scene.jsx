import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Glasses } from "./Glasses";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
        return (
            <>
{/*                 <OrbitControls/> */}
                <PerspectiveCamera fov={45} near={.1} makeDefault position={[0,0,10]} />
                <Environment preset="city" />
                <Glasses />
{/*                 <axesHelper args={[500]} /> */}
            </>
        )
    };