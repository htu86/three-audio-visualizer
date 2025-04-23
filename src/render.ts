import * as THREE from 'three'

const sceneCanvas = document.getElementById("mainScene") as HTMLCanvasElement | null;
if (!sceneCanvas) {
  throw new Error("Canvas element with id 'mainScene' not found");
}

// Basic config
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: sceneCanvas});
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
const scene = new THREE.Scene();

// Some extra renderer rules
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.set(0,10,30)
camera.translateX(38.4)

// Light setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(0, 1, 1); 
directionalLight.translateX(38.4)

const directionalLight2 = new THREE.RectAreaLight(0xffffff, 100.0,100,5);
directionalLight2.position.set(38.4, 20, 0);
directionalLight2.rotateX(-1.5708)
scene.add(directionalLight,directionalLight2);

// Adding the scene objects
scene.add(ambientLight,directionalLight)

export function updateScene(){
  renderer.render(scene, camera);
}

export {renderer,camera,scene}