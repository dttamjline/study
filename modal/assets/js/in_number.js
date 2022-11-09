

// //////////////////////////////////////////
// //modal open and close
// //////////////////////////////////////////
$(".c-modal__overlay").on("click", function (event) {
    const target = $(event.target);
    if (!target.is(".c-modal__container, .c-modal__container *")) {
      $(".c-modal").removeClass("show");
    }
  });
  $(".btn__modal").on("click", function (event) {
    event.preventDefault();
    if (!$(".c-modal").hasClass("show")) {
      let id = $(this).attr("data-id");
      $("#" + id).addClass("show");
    }
  });
  $(".c-modal__close").on("click", function (event) {
    event.preventDefault();
    $(".c-modal").removeClass("show");
  });
  


$(".c-chart").each(function(){
    let data=[]
    let color=[]
    $(this).find('.number_small').each(function(){
        data.push($(this).data('num'))
        color.push($(this).data('color'))
    })    

    var ctx = $(this).find('.chart_canvas');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: data,
                backgroundColor: color,
                
                borderWidth: 0,
            }]
        },
    
        options: {
            animation: {
                duration: 0 // disable animate
            },
            responsive: true,
            maintainAspectRatio: false, //Fix break layout when using version 2
            events: [],//  disable hover background
            plugins: {
            tooltip: {
                enabled: false //   disable tooltips
            }
            }
        }
    });
    console.log(data)
})