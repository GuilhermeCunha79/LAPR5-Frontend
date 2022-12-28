import {Component, AfterViewInit} from '@angular/core';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import Warehouse from "./src/warehouse";

@Component({
  selector: 'app-road-network',
  templateUrl: './road-network.component.html',
  styleUrls: ['./road-network.component.css']
})

export class RoadNetworkComponent implements AfterViewInit {

  constructor() {
  }

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  private warehouseArray: Warehouse[];

  private createScene(warehouseData: any[]) {

    this.warehouseArray = [];

    // Create Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x34583d, 0.005);
    this.scene.background = new THREE.CubeTextureLoader().load([
      '/assets/skybox/xpos.png',
      '/assets/skybox/xneg.png',
      '/assets/skybox/ypos.png',
      '/assets/skybox/yneg.png',
      '/assets/skybox/zpos.png',
      '/assets/skybox/zneg.png'
    ]);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight-90), 0.1, 10000);
    this.camera.position.set(0, 90, 0);

    window.addEventListener('resize', () => this.windowResize());

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight-90);

    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.enabled = true;

    document.body.appendChild(this.renderer.domElement);

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    this.controls.maxPolarAngle = Math.PI;
    this.controls.target.set(0, 2, 0);
    this.controls.update();

    // Scene
    this.sceneSetup(warehouseData);
  }

  sceneSetup(warehouseData: any[]) {

    let mesh;

    //////////////
    // Lighting //
    //////////////
    this.scene.add(new THREE.AmbientLight(0x404040));

    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(25, 50, 25);

    sun.castShadow = true;

    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;

    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    sun.shadow.camera.left = -75;
    sun.shadow.camera.right = 75;

    this.scene.add(sun);

    ////////////////////////////
    // Create the graph plane //
    ////////////////////////////
    mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(77, 77, 0.1, 64),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );

    mesh.position.y = -0.1;
    mesh.receiveShadow = true;

    this.scene.add(mesh);

    /////////////////////////////////////////////////////////
    // Create a slightly larger plane to serve as a border //
    /////////////////////////////////////////////////////////
    mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(78, 78, 0.1, 64),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    );

    mesh.position.y = -0.2;

    this.scene.add(mesh);

    ///////////////////////////
    // Draw solid axis lines //
    ///////////////////////////
    this.drawSolidLines([
      new THREE.Vector3(0, 0, 70),
      new THREE.Vector3(0, 0, -70),
      new THREE.Vector3(70, 0, 0),
      new THREE.Vector3(-70, 0, 0)
    ], new THREE.LineBasicMaterial({ color: 0x000000 }));

    //////////////////////////////
    // Draw dashed helper lines //
    //////////////////////////////
    this.drawDottedLines([
      [new THREE.Vector3(-60, 0, 39.5), new THREE.Vector3(-60, 0, -40)],
      [new THREE.Vector3(-50, 0, 49.5), new THREE.Vector3(-50, 0, -50)],
      [new THREE.Vector3(-40, 0, 59.5), new THREE.Vector3(-40, 0, -60)],
      [new THREE.Vector3(-30, 0, 59.5), new THREE.Vector3(-30, 0, -60)],
      [new THREE.Vector3(-20, 0, 69.5), new THREE.Vector3(-20, 0, -70)],
      [new THREE.Vector3(-10, 0, 69.5), new THREE.Vector3(-10, 0, -70)],
      [new THREE.Vector3(60, 0, 39.5), new THREE.Vector3(60, 0, -40)],
      [new THREE.Vector3(50, 0, 49.5), new THREE.Vector3(50, 0, -50)],
      [new THREE.Vector3(40, 0, 59.5), new THREE.Vector3(40, 0, -60)],
      [new THREE.Vector3(30, 0, 59.5), new THREE.Vector3(30, 0, -60)],
      [new THREE.Vector3(20, 0, 69.5), new THREE.Vector3(20, 0, -70)],
      [new THREE.Vector3(10, 0, 69.5), new THREE.Vector3(10, 0, -70)],
      [new THREE.Vector3(39.5, 0, -60), new THREE.Vector3(-40, 0, -60)],
      [new THREE.Vector3(49.5, 0, -50), new THREE.Vector3(-50, 0, -50)],
      [new THREE.Vector3(59.5, 0, -40), new THREE.Vector3(-60, 0, -40)],
      [new THREE.Vector3(59.5, 0, -30), new THREE.Vector3(-60, 0, -30)],
      [new THREE.Vector3(69.5, 0, -20), new THREE.Vector3(-70, 0, -20)],
      [new THREE.Vector3(69.5, 0, -10), new THREE.Vector3(-70, 0, -10)],
      [new THREE.Vector3(39.5, 0, 60), new THREE.Vector3(-40, 0, 60)],
      [new THREE.Vector3(49.5, 0, 50), new THREE.Vector3(-50, 0, 50)],
      [new THREE.Vector3(59.5, 0, 40), new THREE.Vector3(-60, 0, 40)],
      [new THREE.Vector3(59.5, 0, 30), new THREE.Vector3(-60, 0, 30)],
      [new THREE.Vector3(69.5, 0, 20), new THREE.Vector3(-70, 0, 20)],
      [new THREE.Vector3(69.5, 0, 10), new THREE.Vector3(-70, 0, 10)]
    ], new THREE.LineDashedMaterial({
      color: 0xa0a0a0,
      dashSize: 4,
      gapSize: 1
    }));

    ///////////////////////////
    // Create the warehouses //
    ///////////////////////////
    warehouseData.forEach(obj => {
      const warehouse = new Warehouse(obj);
      this.warehouseArray.push(warehouse);
      this.scene.add(warehouse.object);
    });

    ////////////////////////////////
    // Create the warehouse links //
    ////////////////////////////////
    this.createLinks();

    //////////////////
    // Create trees //
    //////////////////
    this.createTrees([
      new THREE.Vector3(-1, 0, 12.6),
      new THREE.Vector3(-16.3, 0, 12.4),
      new THREE.Vector3(5.8, 0, 28.8),
      new THREE.Vector3(-3.9, 0, 42),
      new THREE.Vector3(-9.6, 0, 58.6),
      new THREE.Vector3(15.8, 0, 54.7),
      new THREE.Vector3(-30.6, 0, 21.4),
      new THREE.Vector3(-23.1, 0, 36.2),
      new THREE.Vector3(-31.6, 0, 53.7),
      new THREE.Vector3(-53.2, 0, 7.9),
      new THREE.Vector3(-55.4, 0, 31.9),
      new THREE.Vector3(-41.7, 0, 36.9),
      new THREE.Vector3(-45.9, 0, 48.9),
      new THREE.Vector3(-12.1, 0, 25.8),
      new THREE.Vector3(-36, 0, 4.4),
      new THREE.Vector3(-53.1, 0, -10.2),
      new THREE.Vector3(20.6, 0, 37.1),
      new THREE.Vector3(32.4, 0, 50)
    ]);

    //////////////
    // 3D Title //
    //////////////
    this.add3DTitle(
      new THREE.MeshStandardMaterial({ color: 0x141414 })
    );
  }

  // Draws solid lines
  drawSolidLines(points: any[], material: THREE.LineBasicMaterial) {

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.scene.add(new THREE.LineSegments(geometry, material));
  }

  // Draws dotted lines
  drawDottedLines(points: any[], material: THREE.LineDashedMaterial) {

    let geometry, line;

    for (let i = 0; i < points.length; i++) {
      geometry = new THREE.BufferGeometry().setFromPoints(points[i]);
      line = new THREE.LineSegments(geometry, material);
      line.computeLineDistances();
      this.scene.add(line);
    }
  }

  // Creates all the links between each warehouse
  createLinks() {
    for (let i = 0; i < this.warehouseArray.length - 1; i++) {
      for (let j = 0; j < this.warehouseArray[i].links.length; j++) {

        const warehouseO = this.warehouseArray[i];
        const warehouseD = this.warehouseArray[this.warehouseArray[i].links[j]];

        const width = 0.45;
        const lengthO = warehouseO.radius * 1.5;
        const lengthD = warehouseD.radius * 1.5;

        const direction = new THREE.Vector3(
          warehouseD.position.x - warehouseO.position.x,
          0,
          warehouseD.position.z - warehouseO.position.z
        ).clampLength(0, 1);

        const crossDirection = new THREE.Vector3(
          direction.x,
          0,
          direction.z
        ).cross(new THREE.Vector3(0, 1, 0));

        const pointsTemp = [
          new THREE.Vector3(warehouseO.position.x + crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z + crossDirection.z * (width / 2)),
          new THREE.Vector3(warehouseO.position.x - crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z - crossDirection.z * (width / 2))
        ];

        pointsTemp.push(
          new THREE.Vector3(pointsTemp[0].x + direction.x * lengthO, warehouseO.position.y, pointsTemp[0].z + direction.z * lengthO),
          new THREE.Vector3(pointsTemp[1].x + direction.x * lengthO, warehouseO.position.y, pointsTemp[1].z + direction.z * lengthO)
        );

        pointsTemp.push(
          new THREE.Vector3(warehouseD.position.x + crossDirection.x * (width / 2), warehouseD.position.y, warehouseD.position.z + crossDirection.z * (width / 2)),
          new THREE.Vector3(warehouseD.position.x - crossDirection.x * (width / 2), warehouseD.position.y, warehouseD.position.z - crossDirection.z * (width / 2))
        );

        pointsTemp.push(
          new THREE.Vector3(pointsTemp[4].x - direction.x * lengthD, warehouseD.position.y, pointsTemp[4].z - direction.z * lengthD),
          new THREE.Vector3(pointsTemp[5].x - direction.x * lengthD, warehouseD.position.y, pointsTemp[5].z - direction.z * lengthD)
        );

        const totalLength = lengthO + Math.sqrt(Math.pow(pointsTemp[6].x - pointsTemp[2].x, 2) + Math.pow(pointsTemp[6].z - pointsTemp[2].z, 2)) + lengthD;

        const pointsFinal = [
          pointsTemp[0],
          pointsTemp[1],
          pointsTemp[2],
          pointsTemp[3],

          pointsTemp[2],
          pointsTemp[3],
          pointsTemp[6],
          pointsTemp[7],

          pointsTemp[6],
          pointsTemp[7],
          pointsTemp[4],
          pointsTemp[5]
        ];

        const normals = new Float32Array([
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,

          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,

          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0,
          0.0, 1.0, 0.0
        ]);

        const uvs = new Float32Array([
          0.0, 1.0,
          1.0, 1.0,
          0.0, 1 - (lengthO / totalLength),
          1.0, 1 - (lengthO / totalLength),

          0.0, 1 - (lengthO / totalLength),
          1.0, 1 - (lengthO / totalLength),
          0.0, lengthD / totalLength,
          1.0, lengthD / totalLength,

          0.0, lengthD / totalLength,
          1.0, lengthD / totalLength,
          0.0, 0.0,
          1.0, 0.0
        ]);

        const indexes = [
          0, 2, 1,
          2, 3, 1,
          4, 6, 5,
          6, 7, 5,
          8, 10, 9,
          10, 11, 9
        ];

        // Geometry
        const geometry = new THREE.BufferGeometry().setFromPoints(pointsFinal);
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.setIndex(indexes);

        // Material
        const texture = new THREE.TextureLoader().load("/assets/textures/road.jpg");

        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(1, totalLength * (1 / 0.45));

        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          map: texture
        });

        // Mesh
        const mesh = new THREE.Mesh(geometry, material);
        //mesh.receiveShadow = true; // TODO:Look into this
        mesh.castShadow = true;

        this.scene.add(mesh);
      }
    }
  }

  // Imports and adds a trees to the scene
  createTrees(array: THREE.Vector3[]) {

    const loader = new GLTFLoader();

    array.forEach((pos) => {
      loader.load('/assets/models/tree1.gltf', (model) => {

        model.scene.traverse((node) => {
          // @ts-ignore
          if (node.isMesh) node.castShadow = true;
        });

        const mesh = model.scene;

        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.scale.set(0.5, 0.5, 0.5);

        this.scene.add(mesh);
      });
    });
  }

  // Creates 3D text object displayed under the graph
  add3DTitle(material: THREE.MeshStandardMaterial) {
    new FontLoader().load('https://unpkg.com/three@0.146.0/examples/fonts/droid/droid_sans_regular.typeface.json', (font) => {

      const geometry = new TextGeometry('EletricGo', {
        height: 1,
        size: 20,
        font: font
      });

      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(-55, -0.2, -9);
      mesh.rotation.set(Math.PI / 2, 0, 0);

      this.scene.add(mesh);
    });
  }

  // Updates the camera aspect ratio and the renderer size when the window is resized
  windowResize() {

    this.camera.aspect = window.innerWidth / (window.innerHeight-90);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight-90);
  }

  private startRenderingLoop(){

    let component: RoadNetworkComponent = this;

    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit(): void {
    this.createScene([
      { "id": 1, "name": "Arouca", "lat": 40.9321, "lon": 8.2451, "alt": 250, "links": [6, 13] },                          // 0
      { "id": 2, "name": "Espinho", "lat": 41.0072, "lon": 8.6410, "alt": 550, "links": [4, 9, 16] },                      // 1
      { "id": 3, "name": "Gondomar", "lat": 42.1115, "lon": 8.7613, "alt": 200, "links": [3, 8, 10, 12] },                 // 2
      { "id": 4, "name": "Maia", "lat": 41.2279, "lon": 8.6210, "alt": 700, "links": [4, 7, 12, 15, 16] },                 // 3
      { "id": 5, "name": "Matosinhos", "lat": 41.1844, "lon": 8.6963, "alt": 350, "links": [15] },                         // 4
      { "id": 6, "name": "Oliveira de Azeméis", "lat": 40.8387, "lon": 8.4770, "alt": 750, "links": [9, 11, 13] },         // 5
      { "id": 7, "name": "Paredes", "lat": 41.2052, "lon": 8.3304, "alt": 0, "links": [10, 13, 14] },                      // 6
      { "id": 8, "name": "Porto", "lat": 41.1579, "lon": 8.6291, "alt": 600, "links": [16] },                              // 7
      { "id": 9, "name": "Póvoa de Varzim", "lat": 41.3804, "lon": 8.7609, "alt": 400, "links": [15] },                    // 8
      { "id": 10, "name": "Santa Maria da Feira", "lat": 40.9268, "lon": 8.5483, "alt": 100, "links": [11, 12, 14, 16] },  // 9
      { "id": 11, "name": "Santo Tirso", "lat": 41.3431, "lon": 8.4738, "alt": 650, "links": [12, 14] },                   // 10
      { "id": 12, "name": "São João da Madeira", "lat": 40.9005, "lon": 8.4907, "alt": 300, "links": [13, 14] },           // 11
      { "id": 13, "name": "Trofa", "lat": 41.3391, "lon": 8.5600, "alt": 450, "links": [14] },                             // 12
      { "id": 14, "name": "Vale de Cambra", "lat": 40.8430, "lon": 8.3956, "alt": 50, "links": [] },                       // 13
      { "id": 15, "name": "Valongo", "lat": 41.1887, "lon": 8.4983, "alt": 800, "links": [] },                             // 14
      { "id": 16, "name": "Vila do Conde", "lat": 41.3517, "lon": 8.7479, "alt": 150, "links": [] },                       // 15
      { "id": 17, "name": "Vila Nova de Gaia", "lat": 41.1239, "lon": 8.6118, "alt": 500, "links": [] }                    // 16
    ]);
    this.startRenderingLoop();
  }
}
