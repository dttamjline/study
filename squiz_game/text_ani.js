var new_speed=100;

$('.title h2').t({
speed:100,
typing:
  function(e){
   new_speed-=2;
   e.s(new_speed);
   }
});