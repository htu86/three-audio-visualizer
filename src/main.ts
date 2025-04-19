import * as THREE from 'three';
import {renderer, scene, updateScene} from './render'
import { audioAnalyser, dataArray, bufferLength } from './audio';

document.body.appendChild(renderer.domElement);

const cubeSpacing = 1.2
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const boxGeometryMaterial = new THREE.MeshPhongMaterial({color:0xFFAD00})

const cubes: THREE.Mesh[] = [];
for (let i = 0; i < 64; i++) {
  const cube = new THREE.Mesh(boxGeometry, boxGeometryMaterial); // Create a new cube for each iteration
  cube.position.set(i * cubeSpacing, 0, 0); // Space them out by 1.2 units
  scene.add(cube);
  cubes.push(cube)
}

// Functions to animate
function animate() {
  requestAnimationFrame(animate);

  if (audioAnalyser) {
    audioAnalyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      const height = dataArray[i] / 15;
      console.log(height);
      cubes[i].scale.set(1,height,1)
      cubes[i].position.y = height / 2 // This condition allows the cube to be scaled from 1 side
    }
  }
  updateScene()
}
animate()