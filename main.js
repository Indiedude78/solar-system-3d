//import styles
import './style.css';

//import three js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xfdfbd3, 1, 1000);
light.position.set(5, 5, 5);

const pointLight = new THREE.PointLight(0xfdfbd3);
pointLight.position.set(10, 20, -70);

scene.add(light, pointLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);

// const gridHelper = new THREE.GridHelper(200, 50);

// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);


const controls = new OrbitControls(camera, renderer.domElement);

camera.position.x = 125
camera.position.y = 125
camera.position.z = 125

function addStars() {
    let maxLimit = 500;
    let minLimit = -500;
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffceee,
        side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    let x, y, z;
    x = Math.floor(Math.random() * (maxLimit - minLimit + 1) + minLimit);
    y = Math.floor(Math.random() * (maxLimit - minLimit + 1) + minLimit);
    z = Math.floor(Math.random() * (maxLimit - minLimit + 1) + minLimit);
    sphere.position.set(x, y, z);
    scene.add(sphere);
}

for (let i = 0; i < 500; i++) {
    addStars();
}

function createPlanet({ radius, color, xOffset, zOffset, image }) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(image),
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(xOffset, 0, zOffset);
    return sphere;
}

const planetProps = {
    mercury: {
        radius: 0.38,
        color: 0x758490,
        xOffset: 0,
        zOffset: 0,
        image: '/textures/mercury.jpg'
    },
    venus: {
        radius: 0.95,
        color: 0xffcc00,
        xOffset: 0,
        zOffset: -10,
        image: '/textures/venus.jpg'
    },
    earth: {
        radius: 1,
        color: 0x1560bd,
        xOffset: 0,
        zOffset: -25,
        image: '/textures/earth.jpg'
    },
    mars: {
        radius: 0.53,
        color: 0xff0000,
        xOffset: 0,
        zOffset: -35,
        image: '/textures/mars.jpg'
    },
    jupiter: {
        radius: 11.2,
        color: 0xffcc00,
        xOffset: 0,
        zOffset: -60,
        image: '/textures/jupiter.jpg'
    },
    saturn: {
        radius: 9.45,
        color: 0xffcc00,
        xOffset: 0,
        zOffset: -95,
        image: '/textures/saturn.jpg'
    },
    uranus: {
        radius: 4,
        color: 0x1560bd,
        xOffset: 0,
        zOffset: -120,
        image: '/textures/uranus.jpg'
    },
    neptune: {
        radius: 3.88,
        color: 0x1560bd,
        xOffset: 0,
        zOffset: -140,
        image: '/textures/neptune.jpg'
    }
};

let planetArray = [];

Object.entries(planetProps).forEach(([key, value]) => {
    let planetObj = createPlanet({ radius: value.radius, color: value.color, xOffset: value.xOffset, zOffset: value.zOffset, image: value.image });
    planetArray.push(planetObj);
    scene.add(planetObj);
})

//Add sun
const sun = createPlanet({ radius: 40, color: 0xffcc00, xOffset: 0, zOffset: 65, image: '/textures/sun.jpg' });
scene.add(sun);


function animate() {
    requestAnimationFrame(animate);
    planetArray.forEach(planet => {
        planet.rotation.y += 0.001;
        planet.rotation.x += 0.001;
    })

    sun.rotation.y += 0.005;
    renderer.render(scene, camera);
    controls.update();
}
animate();


document.body.onscroll = function () {
    const t = document.body.getBoundingClientRect().top;
    if (t < 0) {
        camera.position.z = 125 + -t * -1;
    }
    else {
        camera.position.z = 125;
    }
}