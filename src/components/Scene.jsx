// /** @jsxImportSource @emotion/react */
// import { useEffect, useRef, useState } from "react";
// import styled from "@emotion/styled";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//
// export default function Scene() {
//   const containerRef = useRef(null);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const [rotateY, setRotateY] = useState(0);
//
//   // 스크롤에 따른 회전 효과
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const rotation = scrollY * 0.001; // 회전 속도 조절
//       setRotateY(rotation);
//     };
//
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//
//   // Three.js 설정
//   useEffect(() => {
//     if (!containerRef.current) return;
//
//     // 렌더러 설정
//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     containerRef.current.appendChild(renderer.domElement);
//
//     // 씬 설정
//     const scene = new THREE.Scene();
//     scene.background = null;
//
//     // 카메라 설정
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       100,
//     );
//     camera.position.z = 3;
//     camera.position.y = 0.5;
//
//     // 조명 설정
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
//
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(2, 2, 2);
//     scene.add(directionalLight);
//
//     const rimLight = new THREE.DirectionalLight(0x4a9eff, 2);
//     rimLight.position.set(-2, 2, -2);
//     scene.add(rimLight);
//
//     // 모델 로더
//     const loader = new GLTFLoader();
//
//     // 3D 모델 로드
//     // 참고: 실제 모델 파일이 필요합니다. 아래는 예시입니다.
//     try {
//       loader.load(
//         "/glasses.glb", // 실제 모델 경로로 수정
//         (gltf) => {
//           const model = gltf.scene;
//           model.scale.set(1, 1, 1);
//           model.position.set(0, 0, 0);
//           scene.add(model);
//           setModelLoaded(true);
//
//           // 모델 머티리얼에 반사 효과 추가
//           model.traverse((child) => {
//             if (child.isMesh) {
//               if (child.material) {
//                 child.material.envMapIntensity = 1;
//                 child.material.needsUpdate = true;
//               }
//             }
//           });
//         },
//         (xhr) => {
//           console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//         },
//         (error) => {
//           console.error("모델 로드 에러:", error);
//
//           // 모델 로드 실패 시 대체 박스 표시
//           const geometry = new THREE.BoxGeometry(1.5, 0.5, 0.5);
//           const material = new THREE.MeshPhongMaterial({
//             color: 0x4a9eff,
//             transparent: true,
//             opacity: 0.8,
//             shininess: 90,
//           });
//           const box = new THREE.Mesh(geometry, material);
//           scene.add(box);
//           setModelLoaded(true);
//         },
//       );
//     } catch (error) {
//       console.error("모델 로드 시도 중 오류:", error);
//
//       // 오류 발생 시 대체 박스 표시
//       const geometry = new THREE.BoxGeometry(1.5, 0.5, 0.5);
//       const material = new THREE.MeshPhongMaterial({
//         color: 0x4a9eff,
//         transparent: true,
//         opacity: 0.8,
//         shininess: 90,
//       });
//       const box = new THREE.Mesh(geometry, material);
//       scene.add(box);
//       setModelLoaded(true);
//     }
//
//     // 컨트롤러 설정 (개발용)
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.enableZoom = false;
//     controls.enablePan = false;
//     controls.autoRotate = false;
//
//     // 애니메이션 루프
//     const animate = () => {
//       requestAnimationFrame(animate);
//
//       // 스크롤에 따른 회전
//       if (scene.children.length > 2) {
//         // 조명 다음 3번째 객체가 모델
//         scene.children[3].rotation.y = rotateY;
//       }
//
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();
//
//     // 반응형 처리
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);
//
//     // 정리 함수
//     return () => {
//       window.removeEventListener("resize", handleResize);
//
//       // 모든 리소스 정리
//       scene.traverse((object) => {
//         if (object.geometry) object.geometry.dispose();
//
//         if (object.material) {
//           if (Array.isArray(object.material)) {
//             object.material.forEach((material) => material.dispose());
//           } else {
//             object.material.dispose();
//           }
//         }
//       });
//
//       renderer.dispose();
//       controls.dispose();
//
//       if (
//         containerRef.current &&
//         containerRef.current.contains(renderer.domElement)
//       ) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, [rotateY]);
//
//   return (
//     <Container ref={containerRef}>
//       {!modelLoaded && <LoadingText>Loading 3D Model...</LoadingText>}
//     </Container>
//   );
// }
//
// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 2;
// `;
//
// const LoadingText = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: white;
//   font-size: 1.2rem;
//   font-weight: bold;
// `;
