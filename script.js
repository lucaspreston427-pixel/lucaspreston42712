// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container").appendChild(renderer.domElement);

camera.position.z = 6;

// Lights
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);

// Random spiky monster generator
function generateModel() {
    // Clear previous models
    while (scene.children.length > 1) {
        scene.remove(scene.children[1]);
    }

    // Core sphere
    const coreGeo = new THREE.SphereGeometry(1, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x44ccff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Make spikes around it
    for (let i = 0; i < 60; i++) {
        const spikeGeo = new THREE.ConeGeometry(
            Math.random() * 0.2 + 0.05,
            Math.random() * 1.5 + 0.5,
            8
        );
        const spikeMat = new THREE.MeshStandardMaterial({ color: 0xff4444 });
        const spike = new THREE.Mesh(spikeGeo, spikeMat);

        // Random direction
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        let z = Math.random() * 2 - 1;

        // Normalize
        const len = Math.sqrt(x * x + y * y + z * z);
        x /= len;
        y /= len;
        z /= len;

        // Position
        spike.position.set(x * 1.4, y * 1.4, z * 1.4);

        // Point spike outward
        spike.lookAt(0, 0, 0);

        scene.add(spike);
    }
}

// Button for generating models
document.getElementById("spawn").onclick = generateModel;

generateModel(); // First model

// Animation
function animate() {
    requestAnimationFrame(animate);

    scene.rotation.y += 0.003;

    renderer.render(scene, camera);
}

animate();
