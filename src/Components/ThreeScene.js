// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const ThreeScene = () => {
//   const mountRef = useRef(null);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     // Gestion du redimensionnement
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     // Configuration de la scène
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0);
    
//     // Caméra adaptative
//     const camera = new THREE.PerspectiveCamera(
//       50,
//       windowSize.width / (windowSize.height * 0.7),
//       0.1,
//       1000
//     );
//     camera.position.set(0, 2, 5);

//     // Rendu avec antialiasing
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(windowSize.width, windowSize.height * 0.7);
//     renderer.shadowMap.enabled = true;
//     mountRef.current.appendChild(renderer.domElement);

//     // Contrôles orbitaux pour l'interactivité
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;

//     // Lumière ambiante
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     // Lumière directionnelle pour les ombres
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(5, 10, 7);
//     directionalLight.castShadow = true;
//     directionalLight.shadow.mapSize.width = 1024;
//     directionalLight.shadow.mapSize.height = 1024;
//     scene.add(directionalLight);

//     // Création du camion
//     const createTruck = () => {
//       const truckGroup = new THREE.Group();

//       // Couleurs du camion
//       const primaryColor = 0x2c3e50; // Bleu foncé
//       const secondaryColor = 0xe74c3c; // Rouge
//       const windowColor = 0x3498db; // Bleu clair
//       const wheelColor = 0x2c3e50; // Noir

//       // Cabine
//       const cabinGeometry = new THREE.BoxGeometry(1.5, 1, 1.2);
//       const cabinMaterial = new THREE.MeshPhongMaterial({ color: primaryColor });
//       const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
//       cabin.position.set(0, 0.6, 0);
//       cabin.castShadow = true;
//       truckGroup.add(cabin);

//       // Fenêtres de la cabine
//       const windowGeometry = new THREE.BoxGeometry(1.3, 0.6, 0.05);
//       const windowMaterial = new THREE.MeshPhongMaterial({ 
//         color: windowColor,
//         transparent: true,
//         opacity: 0.7
//       });
      
//       const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
//       leftWindow.position.set(-0.76, 0.7, 0);
//       truckGroup.add(leftWindow);
      
//       const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
//       rightWindow.position.set(0.76, 0.7, 0);
//       truckGroup.add(rightWindow);

//       // Pare-brise
//       const windshieldGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.05);
//       const windshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
//       windshield.position.set(0, 0.7, 0.61);
//       windshield.rotation.x = Math.PI / 6;
//       truckGroup.add(windshield);

//       // Remorque
//       const trailerGeometry = new THREE.BoxGeometry(2.5, 1.2, 1.5);
//       const trailerMaterial = new THREE.MeshPhongMaterial({ color: secondaryColor });
//       const trailer = new THREE.Mesh(trailerGeometry, trailerMaterial);
//       trailer.position.set(-1.8, 0.5, 0);
//       trailer.castShadow = true;
//       truckGroup.add(trailer);

//       // Roues
//       const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
//       const wheelMaterial = new THREE.MeshPhongMaterial({ color: wheelColor });
      
//       // Roues avant
//       const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
//       wheelFL.position.set(0.6, -0.3, 0.7);
//       wheelFL.rotation.z = Math.PI / 2;
//       truckGroup.add(wheelFL);
      
//       const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
//       wheelFR.position.set(0.6, -0.3, -0.7);
//       wheelFR.rotation.z = Math.PI / 2;
//       truckGroup.add(wheelFR);

//       // Roues arrière
//       const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
//       wheelRL.position.set(-0.8, -0.3, 0.7);
//       wheelRL.rotation.z = Math.PI / 2;
//       truckGroup.add(wheelRL);
      
//       const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);
//       wheelRR.position.set(-0.8, -0.3, -0.7);
//       wheelRR.rotation.z = Math.PI / 2;
//       truckGroup.add(wheelRR);

//       // Roues de la remorque
//       const wheelTL = new THREE.Mesh(wheelGeometry, wheelMaterial);
//       wheelTL.position.set(-2.5, -0.3, 0.7);
//       wheelTL.rotation.z = Math.PI / 2;
//       truckGroup.add(wheelTL);
      
//       const wheelTR = new THREE.Mesh(wheelGeometry, wheelMaterial);
//       wheelTR.position.set(-2.5, -0.3, -0.7);
//       wheelTR.rotation.z = Math.PI / 2;
//       truckGroup.add(wheelTR);

//       // Détails du camion
//       const createDetail = (position, size, color) => {
//         const geometry = new THREE.BoxGeometry(...size);
//         const material = new THREE.MeshPhongMaterial({ color });
//         const mesh = new THREE.Mesh(geometry, material);
//         mesh.position.set(...position);
//         truckGroup.add(mesh);
//       };

//       // Phares avant
//       createDetail([0.75, 0.5, 0.8], [0.1, 0.1, 0.1], 0xf39c12);
//       createDetail([0.75, 0.5, -0.8], [0.1, 0.1, 0.1], 0xf39c12);

//       // Logo de l'entreprise (simplifié)
//       const logoGeometry = new THREE.SphereGeometry(0.15, 32, 32);
//       const logoMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
//       const logo = new THREE.Mesh(logoGeometry, logoMaterial);
//       logo.position.set(0.75, 0.8, 0);
//       truckGroup.add(logo);

//       // Texte "ElectroTruck" sur la remorque
//       const loader = new THREE.TextureLoader();
//       loader.load('https://via.placeholder.com/512x256/2c3e50/e74c3c?text=ElectroTruck', (texture) => {
//         const textMaterial = new THREE.MeshBasicMaterial({ 
//           map: texture,
//           transparent: true
//         });
//         const textGeometry = new THREE.PlaneGeometry(1.5, 0.5);
//         const text = new THREE.Mesh(textGeometry, textMaterial);
//         text.position.set(-1.8, 1.1, 0.76);
//         text.rotation.y = Math.PI / 2;
//         truckGroup.add(text);
//       });

//       return truckGroup;
//     };

//     const truck = createTruck();
//     scene.add(truck);

//     // Sol
//     const groundGeometry = new THREE.PlaneGeometry(20, 20);
//     const groundMaterial = new THREE.MeshStandardMaterial({ 
//       color: 0x95a5a6,
//       roughness: 0.8,
//       metalness: 0.2
//     });
//     const ground = new THREE.Mesh(groundGeometry, groundMaterial);
//     ground.rotation.x = -Math.PI / 2;
//     ground.position.y = -0.5;
//     ground.receiveShadow = true;
//     scene.add(ground);

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Nettoyage
//     return () => {
//       if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, [windowSize]);

//   return (
//     <div style={{ 
//       width: '100%', 
//       height: '70vh',
//       position: 'relative',
//       overflow: 'hidden'
//     }} ref={mountRef}>
//       <div style={{
//         position: 'absolute',
//         bottom: '20px',
//         left: '20px',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         color: 'white',
//         padding: '10px',
//         borderRadius: '5px',
//         zIndex: 100
//       }}>
//         Faites glisser pour tourner autour du camion | Molette pour zoomer
//       </div>
//     </div>
//   );
// };

// export default ThreeScene;