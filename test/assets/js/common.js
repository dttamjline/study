$(function () {
    'use strict';
    const obj = {
        del: 0,
        init: function () {
            //this.initFadeIn();
            this.curtainsBg();
            this.buttonAnimate();
            this.hoverZoomImg();
            this.hoverButtonMore();
            this.toTop();
            this.smoothScroll();
            this.anchorScroll();
        },
        curtainsBg: function(){
// set up our WebGL context and append the canvas to our wrapper
const curtains = new Curtains({
    container: "canvas",
    pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
});

curtains.onRender(() => {
    // update our planes deformation
    // increase/decrease the effect
    scrollEffect = curtains.lerp(scrollEffect, 0, 0.075);

    // update our number of planes drawn debug value
   // debugElement.innerText = planeDrawn;
}).onScroll(() => {
    // get scroll deltas to apply the effect on scroll
    const delta = curtains.getScrollDeltas();

    // invert value for the effect
    delta.y = -delta.y;

    // threshold
    if(delta.y > 60) {
        delta.y = 60;
    }
    else if(delta.y < -60) {
        delta.y = -60;
    }

    if(Math.abs(delta.y) > Math.abs(scrollEffect)) {
        scrollEffect = curtains.lerp(scrollEffect, delta.y, 0.5);
    }

    // update the plane positions during scroll
    for(let i = 0; i < planes.length; i++) {
        // apply additional translation, scale and rotation
        applyPlanesParallax(i);
    }

}).onError(() => {
    // we will add a class to the document body to display original images
    document.body.classList.add("no-curtains", "planes-loaded");
}).onContextLost(() => {
    // on context lost, try to restore the context
    curtains.restoreContext();
});

// we will keep track of all our planes in an array
const planes = [];
let scrollEffect = 0;

// get our planes elements
const planeElements = document.getElementsByClassName("plane");

// keep track of the number of plane we're currently drawing
//const debugElement = document.getElementById("debug-value");
// we need to fill the counter with all our planes
let planeDrawn = planeElements.length;

const vs = `
    precision mediump float;

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 planeTextureMatrix;

    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform float uScrollEffect;

    void main() {
        vec3 vertexPosition = aVertexPosition;

        // cool effect on scroll
        vertexPosition.x += sin((vertexPosition.y / 1.5 + 1.0) * 3.141592) * (sin(uScrollEffect / 2000.0));

        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

        // varyings
        vVertexPosition = vertexPosition;
        vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    }
`;

const fs = `
    precision mediump float;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D planeTexture;

    void main( void ) {
        // just display our texture
        gl_FragColor = texture2D(planeTexture, vTextureCoord);
    }
`;

const params = {
    vertexShader: vs,
    fragmentShader: fs,
    widthSegments: 10,
    heightSegments: 10,
    uniforms: {
        scrollEffect: {
            name: "uScrollEffect",
            type: "1f",
            value: 0,
        },
    },
};

// add our planes and handle them
for(let i = 0; i < planeElements.length; i++) {
    const plane = new Plane(curtains, planeElements[i], params);

    planes.push(plane);

    handlePlanes(i);
}

// handle all the planes
function handlePlanes(index) {
    const plane = planes[index];

    plane.onReady(() => {

        // apply parallax on load
        applyPlanesParallax(index);

        // once everything is ready, display everything
        if(index === planes.length - 1) {
            document.body.classList.add("planes-loaded");
        }

    }).onAfterResize(() => {
        // apply new parallax values after resize
        applyPlanesParallax(index);
    }).onRender(() => {
        // new way: we just have to change the rotation and scale properties directly!
        // apply the rotation
        plane.rotation.z = Math.abs(scrollEffect) / 750;

        // scale plane and its texture
        plane.scale.y = 1 + Math.abs(scrollEffect) / 300;
        plane.textures[0].scale.y = 1 + Math.abs(scrollEffect) / 150;

        /*
        // old way: using setRotation and setScale
        plane.setRotation(new Vec3(0, 0, scrollEffect / 750));
        plane.setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 300));
        plane.textures[0].setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 150));
        */

        // update the uniform
        plane.uniforms.scrollEffect.value = scrollEffect;
    }).onReEnterView(() => {
        // plane is drawn again
        planeDrawn++;
    }).onLeaveView(() => {
        // plane is not drawn anymore
        planeDrawn--;
    });
}

function applyPlanesParallax(index) {
    // calculate the parallax effect
    // get our window size
    const sceneBoundingRect = curtains.getBoundingRect();
    // get our plane center coordinate
    const planeBoundingRect = planes[index].getBoundingRect();
    const planeOffsetTop = planeBoundingRect.top + planeBoundingRect.height / 2;
    // get a float value based on window height (0 means the plane is centered)
    const parallaxEffect = (planeOffsetTop - sceneBoundingRect.height / 2) / sceneBoundingRect.height;

    // apply the parallax effect
    planes[index].relativeTranslation.y = parallaxEffect * sceneBoundingRect.height / 4;

    /*
    // old way using setRelativeTranslation
    planes[index].setRelativeTranslation(new Vec3(0, parallaxEffect * (sceneBoundingRect.height / 4)));
     */
}
        },
        // curtainsBg: function () {
        //     let _this = this;
        //     if ($(window).width() > 767) {
        //         // set up our WebGL context and append the canvas to our wrapper
        //         const curtains = new Curtains({
        //             container: 'canvas',
        //             antialias: false, // render targets will disable default antialiasing anyway
        //             pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
        //         });

        //         curtains
        //             .onRender(() => {
        //                 // update our planes deformation
        //                 // increase/decrease the effect
        //                 planesDeformations = curtains.lerp(
        //                     planesDeformations,
        //                     0,
        //                     0.1
        //                 );
        //             })
        //             .onScroll(() => {
        //                 // get scroll deltas to apply the effect on scroll
        //                 const delta = curtains.getScrollDeltas();

        //                 // invert value for the effect
        //                 delta.y = -delta.y;

        //                 // threshold
        //                 if (delta.y > 60) {
        //                     delta.y = 60;
        //                 } else if (delta.y < -60) {
        //                     delta.y = -60;
        //                 }
                     
        //                 if (Math.abs(delta.y) > Math.abs(planesDeformations)) {
        //                     planesDeformations = curtains.lerp(
        //                         planesDeformations,
        //                         delta.y,
        //                         0.5
        //                     );
        //                 }
        //             })
        //             .onError(() => {
        //                 // we will add a class to the document body to display original images
        //                 document.body.classList.add(
        //                     'no-curtains',
        //                     'planes-loaded'
        //                 );
        //             })
        //             .onContextLost(() => {
        //                 // on context lost, try to restore the context
        //                 curtains.restoreContext();
        //             });

        //         // we will keep track of all our planes in an array
        //         const planes = [];
        //         let planesDeformations = 0;

        //         // get our planes elements
        //         let planeElements =
        //             document.getElementsByClassName('js_curtains_bg');

        //         // all planes will have the same parameters
        //         const params = {
        //             vertexShader:
        //                 '\n\t\t\t\tprecision mediump float;\n\n\t\t\t\t// default mandatory variables\n\t\t\t\tattribute vec3 aVertexPosition;\n\t\t\t\tattribute vec2 aTextureCoord;\n\n\t\t\t\tuniform mat4 uMVMatrix;\n\t\t\t\tuniform mat4 uPMatrix;\n\n\t\t\t\tuniform mat4 planeTextureMatrix;\n\n\t\t\t\t// custom variables\n\t\t\t\tvarying vec3 vVertexPosition;\n\t\t\t\tvarying vec2 vTextureCoord;\n\n\t\t\t\tuniform float uPlaneDeformation;\n\t\t\t\tuniform float uTime;\n\n\t\t\t\tuniform float uMouseTime;\n\t\t\t\tuniform vec2 uMousePosition;\n\t\t\t\tuniform float uMouseMoveStrength;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec3 vertexPosition = aVertexPosition;\n\n\t\t\t\t\t// hover\n\t\t\t\t\tvertexPosition.x += sin((vertexPosition.y / 1.2 + 0.2) * sin(uMouseTime / 30.0) * 10.0)/ 400.0;\n\t\t\t\t\tvertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uMouseTime / 2000.0));\n\t\t\t\t\t// vertexPosition.z +=  sin(uMouseTime / 8000.0);\n\n\t\t\t\t\t// effect on scroll\n\t\t\t\t\tvertexPosition.x += sin((vertexPosition.y / 1.2 + 0.2) * sin(uTime / 30.0) * 10.0) * (sin(uPlaneDeformation / 5000.0));\n\t\t\t\t\tvertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 300.0));\n\t\t\t\t\t// vertexPosition.z +=  sin(uTime / 100.0) * sin(uPlaneDeformation / 300.0);\n\n\t\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);\n\n\t\t\t\t\t// varyings\n\t\t\t\t\tvVertexPosition = vertexPosition;\n\t\t\t\t\tvTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;\n\t\t\t\t}\n\t\t\t',
        //             fragmentShader:
        //                 '\n\t\t\tprecision mediump float;\n\n\t\t\tvarying vec3 vVertexPosition;\n\t\t\tvarying vec2 vTextureCoord;\n\n\t\t\tuniform sampler2D planeTexture;\n\n\t\t\tvoid main( void ) {\n\t\t\t\t// just display our texture\n\t\t\t\tgl_FragColor = texture2D(planeTexture, vTextureCoord);\n\t\t\t}\n\t\t',
        //             widthSegments: 10,
        //             heightSegments: 10,
        //             drawCheckMargins: {
        //                 top: 100,
        //                 right: 0,
        //                 bottom: 100,
        //                 left: 0,
        //             },
        //             uniforms: {
        //                 planeDeformation: {
        //                     name: 'uPlaneDeformation',
        //                     type: '1f',
        //                     value: 0,
        //                 },
        //             },
        //         };

        //         // add our planes and handle them

        //         for (let i = 0; i < planeElements.length; i++) {
        //             //planes.push(curtains.addPlane(planeElements[i], params));
        //             planes.push(new Plane(curtains, planeElements[i], params));

        //             handlePlanes(i);
        //         }

        //         // handle all the planes
        //         function handlePlanes(index) {
        //             const plane = planes[index];
        //             // check if our plane is defined and use it
        //             plane
        //                 .onError(() => {
        //                     console.log('plane error', plane);
        //                 })
        //                 .onReady(() => {
        //                     // once everything is ready, display everything
        //                     if (index === planes.length - 1) {
        //                         //console.log(_this.del);
        //                         setTimeout(function () {
        //                             document.body.classList.add(
        //                                 'planes-loaded'
        //                             );
        //                         }, _this.del);
        //                     }
        //                 })
        //                 .onRender(() => {
        //                     // update the uniform
        //                     plane.uniforms.planeDeformation.value =
        //                         planesDeformations;
        //                 });
        //         }
        //     }
        // },
        buttonAnimate: function () {
            const _ = $('.js_hover_wave');
            _.map((a, b) => {
                const __ = $(b);
                let _text = __.text().trim().split('');

                let _html = '';
                _text.map((b, c) => {
                    _html += `<i style="transition-delay: ${c * 0.05}s">${
                        b === ' ' ? '&nbsp;' : b
                    } </i>`;
                });

                __.html(_html);
            });
        },
        hoverZoomImg: function () {
            const _ = $('#canvas');
            let __ = null;
            $('.js_hover_zoom')
                .on('mouseenter', function () {
                    _.css({ opacity: 0 });
                    $(this)
                        .parents('.container')
                        .find('.js_img_zoom')
                        .addClass('is_zoom');
                })
                .on('mouseleave', function () {
                    clearTimeout(__);
                    __ = setTimeout(function () {
                        _.css({ opacity: 1 });
                    }, 700);
                    $(this)
                        .parents('.container')
                        .find('.js_img_zoom')
                        .removeClass('is_zoom');
                });
        },
        hoverButtonMore: function () {
            const _ = $('.js_more_hover'),
                jsMoreFixed = $('.js_more_fixed');
            _.on('mouseenter', function () {
                jsMoreFixed.addClass('is_hover');
            })
                .on('mousemove', function (e) {
                    let _ww = window.innerWidth;
                    if (_ww < 768) return false;
                    let _x = e.clientX,
                        _y = e.clientY;
                    jsMoreFixed.css({
                        top: _y,
                        left: _x,
                    });
                })
                .on('mouseleave', function () {
                    jsMoreFixed.removeClass('is_hover');
                });
        },
        initFadeIn: function () {
            const _ = $('.wow'),
                _this = this;
            // console.log(_this.del);
            if (_.length > 0) {
                _.map((a, b) => {
                    const __ = $(b);
                    let _t = __.offset().top;
                    if (_t + __.innerHeight() < window.scrollY) {
                        __.removeClass('wow');
                        $('.js_curtains_bg img').css({ opacity: 0 });
                    }
                    if (
                        _t >= window.scrollY &&
                        _t < window.scrollY + window.innerHeight
                    ) {
                        _this.del += 1100;
                    }
                });
                new WOW().init();
            }
        },

        //Totop
        toTop: function () {
            $('#to_top').hide();
            $(window).on('load scroll', function () {
                if ($(this).scrollTop() > 100) {
                    $('#to_top').fadeIn();
                } else {
                    $('#to_top').fadeOut();
                }
            });
            $('#to_top').click(function () {
                $('html,body').animate(
                    {
                        scrollTop: 0,
                    },
                    800
                );
                return false;
            });
        },

        //smoothScroll
        smoothScroll: function () {
            $(window).on('load', function () {
                $('a[href^="#"]').click(function () {
                    const getID = $(this).attr('href');
                    const wWidth = $(window).width();
                    if (getID.length > 1) {
                        if ($($(this).attr('href')).length) {
                            const p = $($(this).attr('href')).offset();
                            if (wWidth < 768) {
                                $('html,body').animate(
                                    { scrollTop: p.top - 70 },
                                    800
                                );
                            } else {
                                $('html,body').animate(
                                    { scrollTop: p.top - 120 },
                                    800
                                );
                            }
                        }
                    }
                    return false;
                });
            });
        },
        // Anchor scroll
        anchorScroll: function () {
            $(window).on('load', function () {
                const hash1 = location.hash;
                const root = 'html, body';
                if (hash1 !== '') {
                    const top = $(hash1).offset().top;
                    if ($(window).width() > 767) {
                        $(root).animate({ scrollTop: top - 120 }, 800);
                    } else {
                        $(root).animate({ scrollTop: top - 70 }, 800);
                    }
                }
            });
        },
    };
    $(window).on('load', function () {
        obj.init();
    });
});
