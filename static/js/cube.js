// Initialize Three.js scene with error handling
let scene, camera, renderer, cube;
let rotationSpeedX = 0;
let rotationSpeedY = 0;
const rotationIncrement = 0.02;
const friction = 0.95;

// Main initialization function
function init() {
    try {
        // Create scene
        scene = new THREE.Scene();
        
        // Create camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer with antialiasing
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xf0f0f0);
        
        // Add renderer to DOM
        const container = document.getElementById('cube-container');
        if (!container) {
            throw new Error("Container element 'cube-container' not found");
        }
        container.appendChild(renderer.domElement);
        
        // Create cube geometry
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        // Use basic materials for maximum compatibility
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0xff0000 }), // red
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // green
            new THREE.MeshBasicMaterial({ color: 0x0000ff }), // blue
            new THREE.MeshBasicMaterial({ color: 0xffff00 }), // yellow
            new THREE.MeshBasicMaterial({ color: 0xff00ff }), // magenta
            new THREE.MeshBasicMaterial({ color: 0x00ffff })  // cyan
        ];
        
        // Create cube with materials
        cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        // Add some ambient light just in case
        try {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
        } catch (lightError) {
            console.log("Note: Ambient light not supported, but cube will still render");
        }
        
        // Set up event listeners
        setupEventListeners();
        
        // Start animation loop
        animate();
        console.log("3D cube initialized successfully");
    } catch (error) {
        console.error("Error initializing 3D scene:", error);
        displayErrorMessage(error.message);
    }
}

// Set up event listeners for keyboard and window resize
function setupEventListeners() {
    // Handle arrow key controls
    document.addEventListener('keydown', (event) => {
        // Prevent default behavior for arrow keys
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
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (cube) {
        // Apply rotation based on speeds
        cube.rotation.x += rotationSpeedX;
        cube.rotation.y += rotationSpeedY;
        
        // Apply friction to gradually slow down rotation
        rotationSpeedX *= friction;
        rotationSpeedY *= friction;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Display error message on the page
function displayErrorMessage(message) {
    const container = document.getElementById('cube-container');
    if (container) {
        container.innerHTML = `
            <div style="color: red; padding: 20px; text-align: center;">
                <h3>Error initializing 3D cube</h3>
                <p>${message}</p>
                <p>Please check the browser console for more information.</p>
            </div>
        `;
    }
}

// Initialize the scene when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 