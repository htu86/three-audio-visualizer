import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const sceneCanvas = document.getElementById("mainScene") as HTMLCanvasElement | null;
if (!sceneCanvas) {
  throw new Error("Canvas element with id 'mainScene' not found");
}

// Basic config
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: sceneCanvas});
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 100 );
const scene = new THREE.Scene();

// Some extra renderer rules
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x222222);
renderer.shadowMap.enabled = true;

camera.position.set(0,5,30)
camera.translateX(38.4)

// const controls = new OrbitControls(camera, renderer.domElement)


// Light setup
const light = new THREE.DirectionalLight(0xffffff,0.5)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
light.position.set(-1, 2, 2)

// Adding the scene objects
scene.add(light, ambientLight)

export function updateScene(){
  // controls.update();
  renderer.render(scene, camera);
}

export {renderer,camera,scene}