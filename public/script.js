// import * as THREE from './threejs-loader/three.js/build/three.js';
import * as OrbitControls from './threejs-loader/three.js/examples/js/controls/OrbitControls.js';
import * as GLTFLoader from './threejs-loader/three.js/examples/js/loaders/GLTFLoader.js';
import { GUI } from './threejs-loader/three.js/examples/jsm/libs/dat.gui.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#c8deff');

const color = 0xf9c970;
const intensity = 3.8;
const distance = 0;
const light = new THREE.PointLight(color, intensity, distance);
light.position.set(-1.81, 2.1, 3.8);
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
