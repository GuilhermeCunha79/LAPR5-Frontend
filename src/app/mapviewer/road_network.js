import * as THREE from 'three';
import { FontLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'https://unpkg.com/three@0.146.0/examples/jsm/geometries/TextGeometry.js';

import Warehouse from "./warehouse.js";

export default class RoadNetwork {
    constructor(warehouseData) {

        this.warehouseArray = [];

        // Create Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x34583d, 0.005);
        this.scene.background = new THREE.CubeTextureLoader().load([
            'skybox/xpos.png',
            'skybox/xneg.png',
            'skybox/ypos.png',
            'skybox/yneg.png',
            'skybox/zpos.png',
            'skybox/zneg.png'
        ]);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 90, 0);

        window.addEventListener('resize', event => this.windowResize(event));

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

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

    sceneSetup(warehouseData) {

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
        sun.shadow.camera.left = -60;
        sun.shadow.camera.right = 60;

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
        this.add3DTitle();
    }

    // Draws solid lines
    drawSolidLines(points, material) {

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this.scene.add(new THREE.LineSegments(geometry, material));
    }

    // Draws dotted lines
    drawDottedLines(points, material) {

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

        let points, tempPoints, geometry, mesh;

        const normals = new Float32Array([
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ]);
        const indexes = [
            0, 2, 1,
            1, 2, 3,
            2, 6, 3,
            3, 6, 7,
            6, 4, 7,
            7, 4, 5
        ];

        for (let i = 0; i < this.warehouseArray.length - 1; i++) {
            for (let j = 0; j < this.warehouseArray[i].links.length; j++) {

                const warehouseO = this.warehouseArray[i];
                const warehouseD = this.warehouseArray[this.warehouseArray[i].links[j]];

                const lengthO = warehouseO.radius * 1.5;
                const lengthD = warehouseD.radius * 1.5;
                const width = 0.45;

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

                points = [
                    new THREE.Vector3(warehouseO.position.x + crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z + crossDirection.z * (width / 2)),
                    new THREE.Vector3(warehouseO.position.x - crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z - crossDirection.z * (width / 2))
                ];

                points.push(
                    new THREE.Vector3(points[0].x + direction.x * lengthO, warehouseO.position.y, points[0].z + direction.z * lengthO),
                    new THREE.Vector3(points[1].x + direction.x * lengthO, warehouseO.position.y, points[1].z + direction.z * lengthO)
                );

                points.push(
                    new THREE.Vector3(warehouseD.position.x + crossDirection.x * (width / 2), warehouseD.position.y, warehouseD.position.z + crossDirection.z * (width / 2)),
                    new THREE.Vector3(warehouseD.position.x - crossDirection.x * (width / 2), warehouseD.position.y, warehouseD.position.z - crossDirection.z * (width / 2))
                );

                points.push(
                    new THREE.Vector3(points[4].x - direction.x * lengthD, warehouseD.position.y, points[4].z - direction.z * lengthD),
                    new THREE.Vector3(points[5].x - direction.x * lengthD, warehouseD.position.y, points[5].z - direction.z * lengthD)
                );

                const totalLength = lengthO + Math.sqrt(Math.pow(points[6].x - points[2].x, 2) + Math.pow(points[6].z - points[2].z, 2)) + lengthD;

                const uvs = new Float32Array([
                    0.0, 1.0,
                    1.0, 1.0,

                    0.0, 1 - (lengthO / totalLength),
                    1.0, 1 - (lengthO / totalLength),

                    0.0, 0.0,
                    1.0, 0.0,

                    0.0, lengthD / totalLength,
                    1.0, lengthD / totalLength
                ]);

                /*points =   [new THREE.Vector3(warehouseO.position.x + crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z + crossDirection.z * (width / 2))]; // 0
                points.push(new THREE.Vector3(points[0].x + direction.x * lengthO, warehouseO.position.y, points[0].z + direction.z * lengthO)); // 1
                points.push(new THREE.Vector3(warehouseO.position.x - crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z - crossDirection.z * (width / 2))); // 3
                
                points.push(new THREE.Vector3(points[0].x + direction.x * lengthO, warehouseO.position.y, points[0].z + direction.z * lengthO)); // 1
                points.push(new THREE.Vector3(points[2].x + direction.x * lengthO, warehouseO.position.y, points[2].z + direction.z * lengthO)); // 2
                points.push(new THREE.Vector3(warehouseO.position.x - crossDirection.x * (width / 2), warehouseO.position.y, warehouseO.position.z - crossDirection.z * (width / 2))); // 3

                tempPoints =   [new THREE.Vector3(warehouseD.position.x + crossDirection.x * (width / 2), warehouseD.position.y, warehouseD.position.z + crossDirection.z * (width / 2))]; // 6
                tempPoints.push(new THREE.Vector3(tempPoints[0].x - direction.x * lengthD, warehouseD.position.y, tempPoints[0].z - direction.z * lengthD)); // 4
                tempPoints.push(new THREE.Vector3(warehouseD.position.x - crossDirection.x * (width / 2), warehouseD.position.y, warehouseD.position.z - crossDirection.z * (width / 2))); // 7
                tempPoints.push(new THREE.Vector3(tempPoints[2].x - direction.x * lengthD, warehouseD.position.y, tempPoints[2].z - direction.z * lengthD)); // 5

                points.push(new THREE.Vector3(points[0].x + direction.x * lengthO, warehouseO.position.y, points[0].z + direction.z * lengthO)); // 1
                points.push(tempPoints[1]); // 4
                points.push(new THREE.Vector3(points[2].x + direction.x * lengthO, warehouseO.position.y, points[2].z + direction.z * lengthO)); // 2

                points.push(tempPoints[1]); // 4
                points.push(tempPoints[3]); // 5
                points.push(new THREE.Vector3(points[2].x + direction.x * lengthO, warehouseO.position.y, points[2].z + direction.z * lengthO)); // 2

                points.push(tempPoints[1]); // 4
                points.push(tempPoints[0]); // 6
                points.push(tempPoints[3]); // 5

                points.push(tempPoints[0]); // 6
                points.push(tempPoints[2]); // 7
                points.push(tempPoints[3]); // 5

                const uvs = new Float32Array([
                    0.0, 1.0,
                    0.0, 1 - (lengthO / totalLength),
                    1.0, 1.0,

                    0.0, 1 - (lengthO / totalLength),
                    1.0, 1 - (lengthO / totalLength),
                    1.0, 1.0,

                    0.0, 1 - (lengthO / totalLength),
                    0.0, lengthO / totalLength,
                    1.0, 1 - (lengthO / totalLength),

                    0.0, lengthO / totalLength,
                    1.0, lengthO / totalLength,
                    1.0, 1 - (lengthO / totalLength),

                    0.0, 1 - (lengthO / totalLength),
                    0.0, 0.0,
                    1.0, lengthO / totalLength,

                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, lengthO / totalLength,
                ]);*/

                // Geometry
                geometry = new THREE.BufferGeometry().setFromPoints(points);
                geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
                geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
                geometry.setIndex(indexes);

                // Material
                const texture = new THREE.TextureLoader().load("textures/road.jpg");

                texture.magFilter = THREE.LinearFilter;
                texture.minFilter = THREE.LinearMipMapLinearFilter;

                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, totalLength * (1 / 0.45));

                const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });

                // Mesh
                mesh = new THREE.Mesh(geometry, material);
                mesh.receiveShadow = true;
                mesh.castShadow = true;

                this.scene.add(mesh);
            }
        }
    }

    // Imports and adds a trees to the scene
    createTrees(array) {

        const loader = new GLTFLoader();

        array.forEach((pos) => {
            loader.load('models/tree1.gltf', (model) => {

                model.scene.traverse((node) => {
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
    add3DTitle() {
        new FontLoader().load('https://unpkg.com/three@0.146.0/examples/fonts/droid/droid_sans_regular.typeface.json', (font) => {

            const geometry = new TextGeometry('EletricGo', {
                height: 1,
                size: 20,
                font: font
            });

            const material = new THREE.MeshStandardMaterial({ color: 0x141414 });
            const mesh = new THREE.Mesh(geometry, material);

            //mesh.position.set(-40, -0.2, -15);
            mesh.position.set(-55, -0.2, -9);
            mesh.rotation.set(Math.PI / 2, 0, 0);

            this.scene.add(mesh);
        });
    }

    // Updates the camera aspect ratio and the renderer size when the window is resized
    windowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Renders the next frame of the scene
    update() {

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
