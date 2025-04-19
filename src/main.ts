import * as THREE from 'three';
import {renderer, scene, updateScene} from './render'
import { audioAnalyser, dataArray, bufferLength } from './audio';

document.body.appendChild(renderer.domElement);

const cubeSpacing = 1.2
const boxGeometry = new THREE.BoxGeometry(1,1,1)

const cubes: THREE.Mesh[] = [];
for (let i = 0; i < 64; i++) {
  // Calculate a gradient color based on the cube's index
  const hue = 270 - (i / 64) * 30;
  const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
  
  // Create a unique material for each cube with the gradient color
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color, // Match emissive color for a glow effect
    emissiveIntensity: 1.2, // Adjust as needed
    roughness: 1,
    metalness: 0.7,
  });

  const cube = new THREE.Mesh(boxGeometry, cubeMaterial); // Assign the unique material
  cube.position.set(i * cubeSpacing, 0, 0); // Space them out by 1.2 units
  scene.add(cube);
  cubes.push(cube);
}

// Functions to animate
function animate() {
  requestAnimationFrame(animate);

  if (audioAnalyser) {
    audioAnalyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      const height = dataArray[i] / 15;
      cubes[i].scale.set(1,height,1)
      cubes[i].position.y = height / 2 // This condition allows the cube to be scaled from 1 side
    }
  }
  updateScene()
}
animate()