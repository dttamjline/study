$(function () {
    "use strict";
    const obj = {
        init: function () {
            this.smoothScroll();
            this.gnavi();
            this.animation();
        },

        smoothScroll: function () {
            $('a[href^="#"]').click(function () {
                if ($($(this).attr('href')).length) {
                    let pos = $($(this).attr('href')).offset().top;
                    loadAnchor(pos);
                }
            });

            $(window).on('load', function () {
                let hash = location.hash;
                if (hash !== '') {
                    let pos = $(hash).offset().top;
                    loadAnchor(pos);
                }
            });

            if ($('.mw_wp_form_input .error').length || $('.mw_wp_form_confirm').length || $('.mw_wp_form_complete').length) {
                let pos = $('.contact_ttl').offset().top;
                loadAnchor(pos);
            }

            function loadAnchor (pos) {
                let $root = $('html, body');
                if ($(window).width() > 768) {
                    $root.animate({
                        scrollTop: pos - 135
                    }, 600);
                } else {
                    $root.animate({
                        scrollTop: pos - 100
                    }, 600);
                }
            }
        },
        gnavi: function () {
            $('.over').mouseenter(function () {
				if (!$('.over').hasClass('flag')) {
					$(this).find('.sub').stop().fadeIn();
				}
			}).mouseleave(function () {
				if (!$('.over').hasClass('flag')) {
					$(this).find('.sub').stop().fadeOut();
				}
			});
            $('.has_sub a').click(function () {
                var parent = $(this).parent();
                if (parent.hasClass('active')) {
                    parent.removeClass('active');
                    parent.find('.sub').stop().slideUp();
                } else {
                    parent.removeClass('active');
                    parent.find('.sub').stop().slideToggle();
                    parent.stop().toggleClass('active');
                }
            });
            $(window).on('resize load scroll', function () {
                var hHeader = $(".c-header").outerHeight();
                var pTop = $(window).scrollTop();
                if(pTop >  hHeader){
                    $(".c-header").addClass("fixed");
                }
                else{
                    $(".c-header").removeClass("fixed");
                }
            });
          
            $('.menu_icon').click(function() {
                if ($(this).hasClass('active')) {
                    $('.menu_icon').removeClass('active');
                    $('#c-header__spNav').slideUp();
                    $('.sub').stop().slideUp();
                    $('.has_sub').removeClass('active');
                    $("body").removeClass("overflow");

                } else {
                    $(this).toggleClass('active');
                    $("body").toggleClass("overflow");
                    $('#c-header__spNav').stop().slideToggle(300);
                }
            });
        
            $(window).bind("load resize", function() {
                var vW = $(window).width();
                if (vW >= 768) {
                    $(".menu_icon").removeClass('active')
                    $('.has_sub').removeClass('active');
                    $("#c-header__spNav").removeAttr('style');
                    $('.sub').removeAttr('style');
                    $(".c-header").removeClass("c-header__sp");
                } 
                else{
                    $(".c-header").addClass("c-header__sp");
                }
            });
            $("#c-header__spNav").on('resize load scroll', function () {
                var vW = $(window).width();
                if (vW < 768) {
                    var pTop = $("#c-header__spNav").scrollTop();
                    var hTop = $(".c-header").outerHeight();
                    if(pTop >  hTop){;
                        $(".c-header").addClass("fixed_sp");
                    }
                    else{
                        $(".c-header").removeClass("fixed_sp");
                    }
                }
              
            });
        },
        animation: function () {
            if ($(".wow").length > 0) {
				new WOW().init();
			}
        },

    };

    obj.init();
});

/*screen 320 -> 375*/
!(function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
      const value =
        window.outerWidth > 375
          ? 'width=device-width,initial-scale=1'
          : 'width=375';
      if (viewport.getAttribute('content') !== value) {
        viewport.setAttribute('content', value);
      }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();
  })();
/*Stop scroll content on mobile when click open menu*/
$(document).ready(function () {
    (function () {
    
        var _overlay = document.getElementById('c-header__spNav');
        var _clientY = null; 
        _overlay.addEventListener('touchstart', function (event) {
            if (event.targetTouches.length === 1) {
                _clientY = event.targetTouches[0].clientY;
            }
        }, false);

        _overlay.addEventListener('touchmove', function (event) {
            if (event.targetTouches.length === 1) {
                disableRubberBand(event);
            }
        }, false);

        function disableRubberBand(event) {
            var clientY = event.targetTouches[0].clientY - _clientY;
            if (_overlay.scrollTop === 0 && clientY > 0) {
                event.preventDefault();
            }
            if (isOverlayTotallyScrolled() && clientY < 0) {
                event.preventDefault();
            }
        }

        function isOverlayTotallyScrolled() {
            return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
        }
    }())
});

