// import * as THREE from './threejs-loader/three.js/build/three.js';
import * as OrbitControls from './threejs-loader/three.js/examples/js/controls/OrbitControls.js';
import * as GLTFLoader from './threejs-loader/three.js/examples/js/loaders/GLTFLoader.js';
// import { GUI } from './threejs-loader/three.js/examples/jsm/libs/dat.gui.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#c8deff');

const color = 0xFFFFFF;
const intensity = 1.7;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5.9, -3, 0);
scene.add(light);
scene.add(light.target);

// const gui = new GUI();
// gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
// gui.add(light, 'intensity', 0, 2, 0.01);
// gui.add(light.target.position, 'x', -10, 10);
// gui.add(light.target.position, 'z', -10, 10);
// gui.add(light.target.position, 'y', 0, 10);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -0.2;
camera.position.y = 1;
camera.position.x = 2.2;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls( camera, renderer.domElement );

const loader = new THREE.GLTFLoader();
loader.load('/blender-files/baseModel.gltf', function (gltf) {
    scene.add(gltf.scene);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
