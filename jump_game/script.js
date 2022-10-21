const animal = document.getElementById("animal");
const tree = document.getElementById("tree");
var counter=0;

function jump(){
    if(animal.classList == "animate"){return}
    animal.classList.add("animate");
    setTimeout(function(){
        animal.classList.remove("animate");
    },300);
}
const checkDead = setInterval(function() {
   
    var animalBottom = parseInt(window.getComputedStyle(animal).getPropertyValue("bottom"));
    var treeLeft = parseInt(window.getComputedStyle(tree).getPropertyValue("left"));
    if(treeLeft<40 && treeLeft>-40 && animalBottom<=71){
        tree.style.animation = "none";
        //  alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        tree.style.animation = "tree 2s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);