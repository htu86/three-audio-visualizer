import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const sceneCanvas = document.getElementById("mainScene") as HTMLCanvasElement | null;
if (!sceneCanvas) {
  throw new Error("Canvas element with id 'mainScene' not found");
}

// Basic config
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: sceneCanvas});
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
const scene = new THREE.Scene();


// Some extra renderer rules for better resolution
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

//Camera config
camera.position.set(0,10,30)
camera.translateX(38.4)
const controls = new OrbitControls(camera, renderer.domElement)
controls.target = new THREE.Vector3(38.4, 5 , 0);
controls.enableDamping = true;

// Light setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(ambientLight);

const rectLight = new THREE.RectAreaLight(0xffffff, 100.0,100,5);
rectLight.position.set(38.4, 20, 0);
rectLight.rotateX(-1.5708)

window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Adding the scene objects
scene.add(ambientLight,rectLight)

// Render the scene
export function updateScene(){
  renderer.render(scene, camera);
  controls.update()
}

export {renderer,camera,scene}