import * as THREE from 'three';
import { GUI } from 'lil-gui';  

let scene, camera, renderer, house, ground, trees = [];
let pointLight;


class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }

  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(value) {
    this.object[this.prop].set(value);
  }
}

init();

function init() {
 
  scene = new THREE.Scene();

  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  
  pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(5, 10, 5);
  pointLight.castShadow = true;
  scene.add(pointLight);

  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  
  createHouse();
  
  
  createGround();

  
  createTrees();

  
  createGUI();

  
  window.addEventListener('resize', onWindowResize, false);

  animate();
}


function createHouse() {
  const textureLoader = new THREE.TextureLoader();
  const houseTexture = textureLoader.load('/textures/color-brick.jpg');
  const roofTexture = textureLoader.load('/textures/roof-texture.png');

  
  const houseGeometry = new THREE.BoxGeometry(4, 4, 4);
  const houseMaterial = new THREE.MeshStandardMaterial({ map: houseTexture });
  house = new THREE.Mesh(houseGeometry, houseMaterial);
  house.castShadow = true;
  house.receiveShadow = true;
  scene.add(house);

  
  const roofGeometry = new THREE.ConeGeometry(3, 2, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 3.5;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  roof.receiveShadow = true;
  scene.add(roof);
}


function createGround() {
  const textureLoader = new THREE.TextureLoader();
  const grassTexture = textureLoader.load('/textures/color.jpg');
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(10, 10);

  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: grassTexture,
    side: THREE.DoubleSide
  });

  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;
  ground.receiveShadow = true;
  scene.add(ground);
}


function createTrees() {
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 8);
  const foliageGeometry = new THREE.SphereGeometry(2, 8, 8);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });

  for (let i = 0; i < 5; i++) {
    const tree = new THREE.Object3D();

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2.5;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 7;
    foliage.castShadow = true;
    foliage.receiveShadow = true;
    tree.add(foliage);

    tree.position.set(Math.random() * 30 - 15, 0, Math.random() * 30 - 15);
    trees.push(tree);
    scene.add(tree);
  }
}


function createGUI() {
  const gui = new GUI();

  
  const lightFolder = gui.addFolder('Light Controls');
  lightFolder.open();

  
  lightFolder.add(pointLight, 'intensity', 0, 5).name('Light Intensity');

  
  lightFolder.add(pointLight.position, 'x', -20, 20).name('Position X');
  lightFolder.add(pointLight.position, 'y', -20, 20).name('Position Y');
  lightFolder.add(pointLight.position, 'z', -20, 20).name('Position Z');

  
  lightFolder.addColor(new ColorGUIHelper(pointLight, 'color'), 'value').name('Light Color');
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}