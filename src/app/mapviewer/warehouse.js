import * as THREE from 'three';

export default class Warehouse {
    constructor(warehouse) {

        this.links = warehouse.links;
        this.object = new THREE.Group();
        this.radius = 0.75 + this.links.length * 0.15;

        let geometry, material, mesh;

        // Create the main circle that represents the warehouse
        geometry = new THREE.CylinderGeometry(this.radius, this.radius, 0.1, 10);
        material = new THREE.MeshStandardMaterial({ color: 0x004961 });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y += 0.1;

        mesh.receiveShadow = true;
        mesh.castShadow = true;

        this.object.add(mesh);

        // Create a slightly larger circle to serve as a border
        geometry = new THREE.CylinderGeometry(this.radius * 1.2, this.radius * 1.2, 0.1, 10);
        material = new THREE.MeshStandardMaterial({ color: 0x000000 });
        mesh = new THREE.Mesh(geometry, material);

        mesh.receiveShadow = true;
        mesh.castShadow = true;

        this.object.add(mesh);
    }
}
