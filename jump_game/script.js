window.addEventListener('load', init);

// specify canvas size
const width = window.innerWidth;
const height = window.innerHeight;

function init() {
    // create a scene
    const scene = new THREE.Scene();

    // make a camera
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 500, 1000); // Specify camera location with x,y,z coordinates

    // create a renderer
    const canvasElement = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: true, // antialiasing
        alpha: true,
    });
    renderer.setSize(width, height);

    // make a light
    const light = new THREE.DirectionalLight(0xffffff, 1); // directional light source (color, intensity of light)
    light.position.set(0, 0, 0);
    scene.add(light);

    // make a 3d object
    const x_size = window.innerWidth;
    const y_size = window.innerHeight;
    const length = 300;
    const plane_scale = 4;
    const plane = [];

    for (let i = 0; i < length; i++) {
        const geometry = new THREE.SphereGeometry(
            plane_scale,
            plane_scale,
            plane_scale
        );
        const material = new THREE.MeshBasicMaterial({
            color: '0xcccccc',
            opacity: 0.5,
            transparent: true,
        });
        plane[i] = new THREE.Mesh(geometry, material);

        // random arrangement
        plane[i].position.x = x_size * (Math.random() - 0.5);
        plane[i].position.y = y_size * (Math.random() - 0.5);
        plane[i].position.z = x_size * (Math.random() - 0.5);

        // add plane to array
        scene.add(plane[i]);
    }

    function random(min, max) {
        let rand = Math.floor(min + (max - min + 1) * Math.random());
        return rand;
    }

    tick();
    function tick() {
        for (let i = 0; i < length; i++) {
            // move geometry from bottom to top
            plane[i].position.x += random(-5, 5) * 0.1;
            plane[i].position.y += 2.5;
            plane[i].position.z += random(-5, 5) * 0.1;
            if (plane[i].position.y > height) {
                // Return to initial position when the position of the geometry is greater than the height of the window
                plane[i].position.x = x_size * (Math.random() - 0.5);
                plane[i].position.y = 0;
                plane[i].position.z = x_size * (Math.random() - 0.5);
            }
        }

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    // animation
    function start() {
        renderer.render(scene, camera);
    }
    start();
}





const animal = document.getElementById("animal");
const tree = document.getElementById("tree");
let counter=0;


const btn = document.querySelector('.btn');
const body = document.querySelector('.wrapper');
body.onclick = function(){
    if(animal.classList == "animate"){return}
    animal.classList.add("animate");
    setTimeout(function(){
        animal.classList.remove("animate");
    },1000);
}

btn.onclick = function(){
    tree.classList.add('active');
    this.style.display = 'none';

    setInterval(function() {
        var animalBottom = parseInt(window.getComputedStyle(animal).getPropertyValue("bottom"));
        var treeLeft = parseInt(window.getComputedStyle(tree).getPropertyValue("left"));
        if(treeLeft<40 && treeLeft>-40 && animalBottom<=78){
            tree.style.animation = "none";
           // alert("Game Over. score: "+Math.floor(counter/100));
            counter=0;
            tree.style.animation = "tree 2s infinite linear";
        }else{
            counter++;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        }
    }, 10);
}

