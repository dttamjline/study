////////////////////////////////////////////
//By javascript
////////////////////////////////////////////

//const element = document.querySelectorAll('.js_animated');
// const isInView = (element) => {
//     const distanceAbove = 0;
//     const distanceBelow = 150;
//     const rect = element.getBoundingClientRect();
//     const elementHeight = element.offsetHeight;
//     return (
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight - distanceBelow
//     );
// };
// window.addEventListener('scroll', () => {
//     element.forEach(function (item) {
//         if (isInView(item)) {
//             item.classList.add('animated');
//         } else {
//             item.classList.remove('animated');
//         }
//     });
// });

////////////////////////////////////////////
//By jquery
////////////////////////////////////////////

var $animation_elements = $('.js_animated');
var $window = $(window);

function check_if_in_view() {
var window_height = $window.height();
var window_top_position = $window.scrollTop();
var window_bottom_position = (window_top_position + window_height);

$.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('animated');
  
    } else {
        $element.removeClass('animated');
    }
});
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

