// THREE.js setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// generate a model based on the text
function generate(word) {

    while (scene.children.length > 1) {
        scene.remove(scene.children[1]);
    }

    const lower = word.toLowerCase();
    let base;

    // choose body shape
    if (lower.includes("tiger") || lower.includes("cat") || lower.includes("wolf")) {
        base = new THREE.SphereGeometry(1.2, 32, 32);
    } else if (lower.includes("castle")) {
        base = new THREE.BoxGeometry(2, 1.5, 2);
    } else if (lower.includes("robot") || lower.includes("mech")) {
        base = new THREE.BoxGeometry(1.5, 2, 1.5);
    } else if (lower.includes("spaceship") || lower.includes("ship")) {
        base = new THREE.ConeGeometry(1.2, 3, 24);
    } else {
        base = new THREE.IcosahedronGeometry(1.3);
    }

    const material = new THREE.MeshStandardMaterial({
        color: word.length * 544123 % 0xffffff
    });

    const core = new THREE.Mesh(base, material);
    scene.add(core);

    let spikes = 15;

    if (lower.includes("tiger")) spikes = 8;
    if (lower.includes("dragon")) spikes = 40;
    if (lower.includes("castle")) spikes = 6;
    if (lower.includes("robot")) spikes = 10;

    for (let i = 0; i < spikes; i++) {
        const spikeGeo = new THREE.ConeGeometry(rand(0.1, 0.4), rand(0.4, 1.4), 8);
        const spikeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });

        const spike = new THREE.Mesh(spikeGeo, spikeMat);

        let x = rand(-1, 1);
        let y = rand(-1, 1);
        let z = rand(-1, 1);
        const len = Math.sqrt(x*x + y*y + z*z);
        x /= len; y /= len; z /= len;

        spike.position.set(x * 1.8, y * 1.8, z * 1.8);
        spike.lookAt(0, 0, 0);

        scene.add(spike);
    }
}

document.getElementById("generate").onclick = () => {
    const text = document.getElementById("prompt").value;
    if (text.trim().length > 0) {
        generate(text);
    }
};

function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.003;
    renderer.render(scene, camera);
}

animate();
