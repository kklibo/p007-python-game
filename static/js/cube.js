// Initialize Three.js scene with error handling
let scene, camera, renderer, spaceship, arena;
let moveSpeed = 0.05;
let rotationSpeed = 0.02;
let velocity = new THREE.Vector3(0, 0, 0);
let maxSpeed = 0.1;
let friction = 0.98;
const keys = {};

// Main initialization function
function init() {
    try {
        // Create scene
        scene = new THREE.Scene();
        
        // Create camera (3rd person chase camera)
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 3, 5); // Position camera behind and above spaceship
        
        // Create renderer with antialiasing
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000); // Space background
        
        // Add renderer to DOM
        const container = document.getElementById('cube-container');
        if (!container) {
            throw new Error("Container element 'cube-container' not found");
        }
        container.appendChild(renderer.domElement);
        
        // Add lighting
        addLighting();
        
        // Create circular arena
        createArena();
        
        // Create spaceship
        createSpaceship();
        
        // Set up event listeners
        setupEventListeners();
        
        // Start animation loop
        animate();
        console.log("3D spaceship game initialized successfully");
    } catch (error) {
        console.error("Error initializing 3D scene:", error);
        displayErrorMessage(error.message);
    }
}

// Add lighting to the scene
function addLighting() {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Directional light for shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights around the arena for dramatic effect
    const pointLight1 = new THREE.PointLight(0x3366ff, 0.5, 20);
    pointLight1.position.set(10, 5, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff3366, 0.5, 20);
    pointLight2.position.set(-10, 5, 0);
    scene.add(pointLight2);
}

// Create circular arena
function createArena() {
    const arenaRadius = 15;
    const arenaGeometry = new THREE.CircleGeometry(arenaRadius, 64);
    const arenaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.7,
        metalness: 0.1,
    });
    arena = new THREE.Mesh(arenaGeometry, arenaMaterial);
    arena.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    scene.add(arena);
    
    // Add grid pattern to arena
    const gridHelper = new THREE.GridHelper(arenaRadius * 2, 20, 0x0000ff, 0x808080);
    gridHelper.position.y = 0.01; // Slightly above the arena to prevent z-fighting
    scene.add(gridHelper);
    
    // Add arena boundary
    const ringGeometry = new THREE.TorusGeometry(arenaRadius, 0.2, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00aaff,
        emissive: 0x0044aa,
        roughness: 0.3,
        metalness: 0.8 
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2; // Rotate to be horizontal
    scene.add(ring);
}

// Create spaceship
function createSpaceship() {
    // Create a simple spaceship
    const bodyGeometry = new THREE.ConeGeometry(0.5, 1.5, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        roughness: 0.3,
        metalness: 0.8
    });
    
    // Rotate the cone to point forward (z-axis)
    bodyGeometry.rotateX(Math.PI / 2);
    
    spaceship = new THREE.Mesh(bodyGeometry, bodyMaterial);
    spaceship.position.y = 0.5; // Lift slightly above the arena
    scene.add(spaceship);
    
    // Add wings to the spaceship
    const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
    const wingMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        roughness: 0.5,
        metalness: 0.5
    });
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.5, 0, 0);
    spaceship.add(leftWing);
    
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.5, 0, 0);
    spaceship.add(rightWing);
    
    // Add engine glow effect
    const engineGlow = new THREE.PointLight(0xff6600, 1, 2);
    engineGlow.position.set(0, 0, 0.8);
    spaceship.add(engineGlow);
}

// Set up event listeners for keyboard and window resize
function setupEventListeners() {
    // Handle key controls
    document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
        
        // Prevent default behavior for arrow keys to avoid page scrolling
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }
    });
    
    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
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

// Update spaceship position and rotation based on controls
function updateSpaceship() {
    // Rotation controls
    if (keys['ArrowLeft']) {
        spaceship.rotation.y += rotationSpeed;
    }
    if (keys['ArrowRight']) {
        spaceship.rotation.y -= rotationSpeed;
    }
    
    // Movement controls
    if (keys['ArrowUp']) {
        // Calculate forward direction based on spaceship's rotation
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(spaceship.quaternion);
        
        // Apply acceleration in the direction the spaceship is facing
        velocity.x += direction.x * moveSpeed;
        velocity.z += direction.z * moveSpeed;
    }
    if (keys['ArrowDown']) {
        // Calculate backward direction based on spaceship's rotation
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(spaceship.quaternion);
        
        // Apply deceleration in the opposite direction
        velocity.x -= direction.x * moveSpeed * 0.5;
        velocity.z -= direction.z * moveSpeed * 0.5;
    }
    
    // Apply friction to gradually slow down
    velocity.x *= friction;
    velocity.z *= friction;
    
    // Limit maximum speed
    const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    if (currentSpeed > maxSpeed) {
        velocity.x = (velocity.x / currentSpeed) * maxSpeed;
        velocity.z = (velocity.z / currentSpeed) * maxSpeed;
    }
    
    // Update position
    spaceship.position.x += velocity.x;
    spaceship.position.z += velocity.z;
    
    // Keep spaceship within arena boundaries
    const arenaRadius = 15;
    const distanceFromCenter = Math.sqrt(
        spaceship.position.x * spaceship.position.x + 
        spaceship.position.z * spaceship.position.z
    );
    
    if (distanceFromCenter > arenaRadius - 0.75) {
        // Bounce back from the boundary
        const bounceDirection = new THREE.Vector3(
            -spaceship.position.x, 
            0, 
            -spaceship.position.z
        ).normalize();
        
        velocity.x = bounceDirection.x * currentSpeed * 0.5;
        velocity.z = bounceDirection.z * currentSpeed * 0.5;
        
        // Move back within bounds
        const adjustment = (arenaRadius - 0.75) / distanceFromCenter;
        spaceship.position.x *= adjustment;
        spaceship.position.z *= adjustment;
    }
}

// Update camera to follow spaceship
function updateCamera() {
    // Calculate camera target position (behind and above the spaceship)
    const cameraOffset = new THREE.Vector3(0, 3, 5);
    cameraOffset.applyQuaternion(spaceship.quaternion);
    
    // Apply smoothing for camera movement
    camera.position.x = spaceship.position.x + cameraOffset.x;
    camera.position.y = spaceship.position.y + cameraOffset.y;
    camera.position.z = spaceship.position.z + cameraOffset.z;
    
    // Look at the spaceship
    camera.lookAt(spaceship.position);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (spaceship) {
        updateSpaceship();
        updateCamera();
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
                <h3>Error initializing 3D scene</h3>
                <p>${message}</p>
                <p>Please check the browser console for more information.</p>
            </div>
        `;
    }
}

// Initialize the scene when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 