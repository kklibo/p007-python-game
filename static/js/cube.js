// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set up renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Create cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // red
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // green
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // blue
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // yellow
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // magenta
    new THREE.MeshBasicMaterial({ color: 0x00ffff }), // cyan
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Rotation speeds
let rotationSpeedX = 0;
let rotationSpeedY = 0;
const rotationIncrement = 0.02;
const friction = 0.95;

// Handle arrow key controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            rotationSpeedX -= rotationIncrement;
            break;
        case 'ArrowDown':
            rotationSpeedX += rotationIncrement;
            break;
        case 'ArrowLeft':
            rotationSpeedY -= rotationIncrement;
            break;
        case 'ArrowRight':
            rotationSpeedY += rotationIncrement;
            break;
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Apply rotation based on speeds
    cube.rotation.x += rotationSpeedX;
    cube.rotation.y += rotationSpeedY;
    
    // Apply friction to gradually slow down rotation
    rotationSpeedX *= friction;
    rotationSpeedY *= friction;
    
    renderer.render(scene, camera);
}

// Start animation
animate(); 