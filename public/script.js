import * as OrbitControls from './threejs-loader/examples/js/controls/OrbitControls.js';
import * as GLTFLoader from './threejs-loader/examples/js/loaders/GLTFLoader.js';
// import { GUI } from './threejs-loader/examples/jsm/libs/dat.gui.module.js';

let flagSonido = 0;

const div = document.getElementById('testing');

// Create a new scene and add background color
const scene = new THREE.Scene();
scene.background = new THREE.Color('#C8DEFF');

// Create new light element
const color = 0xfcd75d;
const intensity = 2.3;
const distance = 40;
const light = new THREE.PointLight(color, intensity, distance);
light.position.set(-1.4, 6.2, 4.5);
scene.add(light);

// GUI for the light positioning control
// const gui = new GUI();
// gui.add(light, 'intensity', 0, 20, 0.01);
// gui.add(light.position, 'x', -10, 10);
// gui.add(light.position, 'z', -10, 10);
// gui.add(light.position, 'y', 0, 10);

// Create new camera and position it
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 2;
camera.position.x = 1;

// Create renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight - div.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Create camera control for the mouse
const controls = new THREE.OrbitControls( camera, renderer.domElement );

// Model loader
const loader = new THREE.GLTFLoader();
loader.load('/blender-files/baseModel.glb', function (gltf) {
    console.log(gltf);
    scene.add(gltf.scene);
});

// Audio loader
div.addEventListener('click', function () {
    if (flagSonido == 0) {
        const audioListener = new THREE.AudioListener();
        camera.add( audioListener );
        const sound = new THREE.Audio( audioListener );
        scene.add( sound );
        const soundloader = new THREE.AudioLoader();
        soundloader.load('sounds/ambientSounds.mp3', function ( audioBuffer ) {
            sound.setBuffer( audioBuffer );
            sound.setLoop(true);
            sound.setVolume(1);
            sound.play();
        }, function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        }, function ( err ) {
            console.log( 'An error happened' );
        });
        flagSonido = 1;
    }

});

// Function for rendering the whole scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
