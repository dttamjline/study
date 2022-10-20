

$(function() {
  "use strict";
  var obj = {
      init: function() {
          this.smoothScroll();
          this.anchorScroll();
          this.Gnavi();
          this.toTop();
          this.topSlide();
          this.checkInView();
      },
      toTop: function() {
        $("#totop").hide();
          $(window).on("load scroll",function () {
          if ($(this).scrollTop() > 100) {
          $('#totop').fadeIn();
          } else {
            $('#totop').fadeOut();
          }
        });
      },

      //smoothScroll
      smoothScroll: function() {
          $(window).on("load", function() {
              $('a[href^="#"]').click(function() {
                  var wWidth = $(window).width();
                  if ($($(this).attr("href")).length) {
                      var p = $($(this).attr("href")).offset();
                     
                      $(".menu_icon").removeClass("active");
                      if (wWidth <= 768) {
                          $("html,body").animate({
                                  scrollTop: p.top - 70,
                              },
                              800
                          );
                          $("#gnavi").stop().slideUp();
                      } else {
                          $("#gnavi").removeAttr('style');
                          if($("#gnavi").hasClass('fixed')){
                              $('html,body').animate({ scrollTop: p.top - 150}, 800);
                          }
                          else{
                              $('html,body').animate({ scrollTop: p.top - 200}, 800);
                          }
                      }
                  }
                  return false;
              });
          });
      },
      // Anchor scroll
      anchorScroll: function() {
          $(window).on("load", function() {
              var hash1 = location.hash;
              var $root = $("html, body");
              if (hash1 !== "") {
                  var top01 = $(hash1).offset().top;
                  if ($(window).width() > 768) {
                      if($("#gnavi").hasClass('fixed')){
                          $('html,body').animate({ scrollTop: top01 - 150}, 800);
                      }
                      else{
                          $('html,body').animate({ scrollTop: top01 - 200}, 800);
                      }
                  
                  } else {
                      $root.animate({
                              scrollTop: top01 - 70,
                          },
                          800
                      );
                  }
              }
          });
      },
      //Gnavi
      Gnavi: function() {
          $('.over').mouseenter(function(){
      if($(this).hasClass('flag')){
        return false;
      } else {
        $(this).find('.sub_menu').stop().fadeIn();
      }
    });
    $('.over').mouseleave(function(){
      if($(this).hasClass('flag')){
        return false;
      } else {
        $(this).find('.sub_menu').stop().fadeOut();
      }
          });
          $('.over a').click(function () {
              var parent = $(this).parent();
              if (parent.hasClass('flag')) {
                  if (parent.hasClass('active')) {
                      parent.removeClass('active');
                      parent.find('.sub_menu').stop().slideUp();
                  } else {
                      parent.removeClass('active');
                      parent.find('.sub_menu').stop().slideToggle();
                      parent.stop().toggleClass('active');
                  }
              }
          });
  
  
          $('.menu_icon').click(function() {
              if ($(this).hasClass('active')) {
                  $('.menu_icon').removeClass('active');
                  $('#gnavi').slideUp();
                  $('.sub_menu').stop().slideUp();
                  $('.over').removeClass('active');
              } else {
                  $(this).toggleClass('active');
                  $('#gnavi').stop().slideToggle(300);
              }
          });


          $(window).on("resize load scroll", function() {
              var vW = $(window).width();
              var pTop = $(window).scrollTop();
              var fCallH = $(".f_call").outerHeight();
              if (vW <= 768) {
                  if (pTop > 0) {
                      $("#footer").css("marginBottom", fCallH);
                  } else {
                      $("#footer").css("marginBottom", "");
                  }
              } else {
                  $("#footer").removeAttr("style");
              }
          });
          $(window).on('resize load scroll', function () {
              var vW = $(window).width();
              var pTop = $(window).scrollTop();
              var manviH = $("#mainvisual").outerHeight();
              var hTop = $(".h_main").outerHeight();
              var hGnavi =$("#gnavi").outerHeight();
              var hHeaderPC = manviH + hTop + hGnavi - 100;
              if(vW > 768){
                  if(pTop >  hHeaderPC){;
                      $("#gnavi").addClass("fixed");
                  }
                  else{
                      $("#gnavi").removeClass("fixed");
                  }
              }
              else{
                  $("#gnavi").removeClass("fixed");
              }
        
          });
          $(window).bind("load resize", function() {
              var vW = $(window).width();
              if (vW > 768) {
                  $(".menu_icon").removeClass('active')
                  $('.over').removeClass('flag');
                  $('.over').removeClass('active');
                  $("#gnavi").removeAttr('style');

                  $('.sub_menu').removeAttr('style');
              } else {
                  $('.over').addClass('flag');
              }
          });
      },
      topSlide:function(){
        $(".kirepillow_mv_slide").slick({
            dots: false,
            infinite: false,
            speed: 1500,
            pauseOnHover: false,
            pauseOnFocuse: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            arrows: false,
            fade: false,
            variableWidth: true,
      
          });
    
      },
      checkInView:function(){
        let fadeInTarget = document.querySelectorAll('.fadeIn');
        window.addEventListener('scroll', () => {
          for (let i = 0; i < fadeInTarget.length; i++){
            const rect = fadeInTarget[i].getBoundingClientRect().top;
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            const offset = rect + scroll;
            const windowHeight = window.innerHeight;
            if (scroll > offset - windowHeight + 150) {
              fadeInTarget[i].classList.add('scrollIn');
            }
          }
        });
      }
  };

  obj.init();
});

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

