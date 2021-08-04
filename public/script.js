// import * as THREE from './threejs-loader/three.js/build/three.js';
import * as OrbitControls from './threejs-loader/three.js/examples/js/controls/OrbitControls.js';
import * as GLTFLoader from './threejs-loader/three.js/examples/js/loaders/GLTFLoader.js';
// import { GUI } from './threejs-loader/three.js/examples/jsm/libs/dat.gui.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#C8DEFF');

const color = 0xfcd75d;
const intensity = 2.3;
const distance = 40;
const light = new THREE.PointLight(color, intensity, distance);
light.position.set(-1.4, 6.2, 4.5);
scene.add(light);

// const gui = new GUI();
// gui.add(light, 'intensity', 0, 20, 0.01);
// gui.add(light.position, 'x', -10, 10);
// gui.add(light.position, 'z', -10, 10);
// gui.add(light.position, 'y', 0, 10);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 2;
camera.position.x = 1;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls( camera, renderer.domElement );

const loader = new THREE.GLTFLoader();
loader.load('/blender-files/baseModel.glb', function (gltf) {
    console.log(gltf);
    scene.add(gltf.scene);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
