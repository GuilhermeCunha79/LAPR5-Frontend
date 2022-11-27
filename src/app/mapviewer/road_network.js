import * as THREE from 'three';

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
