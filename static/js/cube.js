// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set up renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Create cube with lighting for better visibility
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Use MeshPhongMaterial instead of MeshBasicMaterial for better appearance
const materials = [
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // red
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // green
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // blue
    new THREE.MeshPhongMaterial({ color: 0xffff00 }), // yellow
    new THREE.MeshPhongMaterial({ color: 0xff00ff }), // magenta
    new THREE.MeshPhongMaterial({ color: 0x00ffff }), // cyan
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Position camera
camera.position.z = 5;

// Rotation speeds
let rotationSpeedX = 0;
let rotationSpeedY = 0;
const rotationIncrement = 0.02;
const friction = 0.95;

// Handle arrow key controls
document.addEventListener('keydown', (event) => {
    // Prevent default behavior for arrow keys to avoid page scrolling
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
    }
    
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

// Start animation with error handling
try {
    animate();
    console.log("3D cube animation started successfully");
} catch (error) {
    console.error("Error starting animation:", error);
} 