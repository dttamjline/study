var ctx = $('#chart_ctx');
const setting = {
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
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [5, 29, 52, 14],
            backgroundColor: [
                '#6E86CB',
                '#2A3E76',
                '#37529C',
                '#4867BE'
            ],

            borderWidth: 0,
        }]
    },
    options: setting
});

$('.p-in-numbers__chart .c-chart__item--i01 .number_small > span').html(myChart.data.datasets[0].data[0]);
$('.p-in-numbers__chart .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[1]);
$('.p-in-numbers__chart .c-chart__item--i03 .number_small > span').html(myChart.data.datasets[0].data[2]);
$('.p-in-numbers__chart .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[3]);

///////////////////////////////////
//Chart for modal
///////////////////////////////////
var ctx = $('#chart_modal01');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [5, 29, 52, 14],
            backgroundColor: [
                '#6E86CB',
                '#2A3E76',
                '#37529C',
                '#4867BE'
            ],

            borderWidth: 0,
        }]
    },
    options: setting
});
$('.modal__chart01 .c-chart__item--i01 .number_small > span').html(myChart.data.datasets[0].data[0]);
$('.modal__chart01 .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[1]);
$('.modal__chart01 .c-chart__item--i03 .number_small > span').html(myChart.data.datasets[0].data[2]);
$('.modal__chart01 .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[3]);


var ctx = $('#chart_modal02');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [5, 29, 52, 14],
            backgroundColor: [
                '#6E86CB',
                '#2A3E76',
                '#37529C',
                '#4867BE'
            ],

            borderWidth: 0,
        }]
    },
    options: setting
});
$('.modal__chart02 .c-chart__item--i01 .number_small > span').html(myChart.data.datasets[0].data[0]);
$('.modal__chart02 .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[1]);
$('.modal__chart02 .c-chart__item--i03 .number_small > span').html(myChart.data.datasets[0].data[2]);
$('.modal__chart02 .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[3]);



var ctx = $('#chart_modal03');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [5, 29, 52, 14],
            backgroundColor: [
                '#6E86CB',
                '#2A3E76',
                '#37529C',
                '#4867BE'
            ],

            borderWidth: 0,
        }]
    },
    options: setting
});
$('.modal__chart03 .c-chart__item--i01 .number_small > span').html(myChart.data.datasets[0].data[0]);
$('.modal__chart03 .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[1]);
$('.modal__chart03 .c-chart__item--i03 .number_small > span').html(myChart.data.datasets[0].data[2]);
$('.modal__chart03 .c-chart__item--i04 .number_small > span').html(myChart.data.datasets[0].data[3]);


//////////////////////////////////////////
//modal open and close
//////////////////////////////////////////
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
  


