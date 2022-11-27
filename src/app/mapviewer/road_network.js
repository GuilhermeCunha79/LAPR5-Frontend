import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js';

import Warehouse from "./warehouse.js";

export default class RoadNetwork {
    constructor(warehouseData) {

        this.warehouseArray = [];

        // Create Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 90, 0);

        window.addEventListener('resize', event => this.windowResize(event));

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

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

        ////////////////////////////
        // Create the graph plane //
        ////////////////////////////
        mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(77, 77, 0.1, 64),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );

        mesh.position.y = -0.1;

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
