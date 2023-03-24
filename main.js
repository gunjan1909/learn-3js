import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

//scene
const scene = new THREE.Scene();
//create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
// material
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.5,
});
// mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
// 50 - view angle
camera.position.z = 20;
scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resize
window.addEventListener("resize", () => {
  //updates sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({
  defaults: {
    duration: 1,
  },
});
const tl2 = gsap.timeline({
  defaults: {
    duration: 5,
  },
});

tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl2.fromTo(".title", { opacity: 0 }, { opacity: 1 });

//mouse animation color
let mouseDown = false;
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});
window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    const x = e.clientX / sizes.width;
    const y = e.clientY / sizes.height;
    material.color.setHSL(x, 1, y);
  }
});
