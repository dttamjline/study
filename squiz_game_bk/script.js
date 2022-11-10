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
    let value = '0xcccccc';
    let colorValue = parseInt ( value.replace("#","0x"), 16 );
    var colored = new THREE.Color( colorValue );
    for (let i = 0; i < length; i++) {
        const geometry = new THREE.SphereGeometry(
            plane_scale,
            plane_scale,
            plane_scale
        );
        const material = new THREE.MeshBasicMaterial({
        
            color:colored,
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


const btn = document.querySelector('.btn_play');
const btn_playAgain = document.querySelector('.btn_playAgain');
const intro = document.querySelector('.box_intro');
const over = document.querySelector('.box_over');
const body = document.querySelector('.frame');

function setState(){
    // clearInterval(time)

    let time = setInterval(function() {
        let animalBottom = parseInt(window.getComputedStyle(animal).getPropertyValue("bottom"));
        let treeLeft = parseInt(window.getComputedStyle(tree).getPropertyValue("left"));
        // console.log(treeLeft)
       if(treeLeft<40 && treeLeft>-40 && animalBottom<=78){
        
            document.getElementById("score").innerHTML = Math.floor(counter/100);
            counter=0;
            tree.classList.remove('active');
            over.classList.add('show');
        
            clearInterval(time);
            console.log('11')
        }
       
        else{
            counter++;
            console.log('22')
            document.getElementById("current_score").innerHTML = Math.floor(counter/100);
        }
    

    }, 10);

}
function setJump(){
    if(animal.classList == "animate")
    {
        return
    }
    animal.classList.add("animate");

    setTimeout(function(){
        animal.classList.remove("animate");
    },1000);
}
body.onclick = function(){
    setJump();
}
function reset(){
    intro.classList.add('hide');
    over.classList.remove('show');
    document.getElementById("current_score").innerHTML = 0;
    tree.classList.add('active');
}
btn.onclick = function(){
    reset();
    setState();
}
btn_playAgain.onclick = function(){
    reset();
    setState();
}

document.body.onkeyup = function(e) {
if (e.key == " " ||
    e.code == "Space" ||      
    e.keyCode == 32      
) {
    setJump();
}
}
1