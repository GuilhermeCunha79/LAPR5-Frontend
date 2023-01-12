import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default class Truck {

  public object: THREE.Group;
  public position: THREE.Vector3;
  public direction: number;
  public acceleration: number;

  constructor() {

    this.object = new THREE.Group();
    this.position = new THREE.Vector3(-4.7, 4.22, -9.16);
    this.direction = 42.5;
    this.acceleration = 0;

    this.createTruck();

    // Sets the position and rotation of the truck
    this.updatePosition();
  }

  updatePosition() {
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.object.rotation.set(0, THREE.MathUtils.degToRad(this.direction - 90), 0);
  }

  // Creates the truck model
  createTruck() {

    new GLTFLoader().load('/assets/models/truck1.gltf', (model) => {

      model.scene.traverse((node) => {
        // @ts-ignore
        if (node.isMesh) node.castShadow = true;
      });

      const mesh = model.scene;
      mesh.position.y = 1.05;
      const scaleFactor = 0.0018;
      mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
      this.object.add(mesh);
    });
  }
}
