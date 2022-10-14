var hoverEffect = function (opts) {
    var vertex = `varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

    var fragment = `
        varying vec2 vUv;

        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        // uniform float time;
        // uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;

        // vec2 rotate(vec2 v, float a) {
        //  float s = sin(a);
        //  float c = cos(a);
        //  mat2 m = mat2(c, -s, s, c);
        //  return m * v;
        // }

        void main() {

            vec2 uv = vUv;

            // uv -= 0.5;
            // vec2 rotUV = rotate(uv, _rot);
            // uv += 0.5;

            vec4 disp = texture2D(disp, uv);

            vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
    `;

    var parent = opts.parent || console.warn('no parent');
    var dispImage =
        opts.displacementImage || console.warn('displacement image missing');
    var image1 = opts.image1 || console.warn('first image missing');
    var image2 = opts.image2 || console.warn('second image missing');
    var image3 = opts.image3 || console.warn('image missing');
    var image4 = opts.image4 || console.warn('image missing');
    var image5 = opts.image5 || console.warn('image missing');
    var image6 = opts.image6 || console.warn('image missing');
    var intensity = opts.intensity || 1;
    var speedIn = opts.speedIn || 1.6;
    var speedOut = opts.speedOut || 1.2;
    var userHover = opts.hover === undefined ? true : opts.hover;
    var easing = opts.easing || Expo.easeOut;

    var mobileAndTabletcheck = function () {
        var check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    var scene = new THREE.Scene();

    var camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
    );

    camera.position.z = 1;

    var renderer = new THREE.WebGLRenderer({
        antialias: false,
        // alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0.0);

    if ($(window).width() <= 767) {
        /* SP */
        renderer.setSize(767, 767);
    } else {
        /* PC */
        var slideWbuf = parent.offsetWidth / 16;
        var slideHbuf = parent.offsetHeight / 9;

        if (slideHbuf < slideWbuf) {
            var slideWset = parent.offsetWidth;
            var slideHset = slideWbuf * 9;
        } else {
            var slideHset = parent.offsetHeight;
            var slideWset = slideHbuf * 16;
        }

        renderer.setSize(slideWset, slideHset);
    }
    /*
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    */
    parent.appendChild(renderer.domElement);

    // var addToGPU = function(t) {
    //     renderer.setTexture2D(t, 0);
    // };

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    var texture1 = loader.load(image1);
    var texture2 = loader.load(image2);
    var texture3 = loader.load(image3);
    var texture4 = loader.load(image4);
    var texture5 = loader.load(image5);
    var texture6 = loader.load(image6);

    var disp = loader.load(dispImage);
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    texture1.magFilter =
        texture2.magFilter =
        texture3.magFilter =
        texture4.magFilter =
        texture5.magFilter =
        texture6.magFilter =
            THREE.LinearFilter;
    texture1.minFilter =
        texture2.minFilter =
        texture3.minFilter =
        texture4.minFilter =
        texture5.minFilter =
        texture6.minFilter =
            THREE.LinearFilter;
    texture1.minFilter =
        texture2.minFilter =
        texture3.minFilter =
        texture4.minFilter =
        texture5.minFilter =
        texture6.minFilter =
            THREE.LinearFilter;

    texture1.anisotropy = renderer.getMaxAnisotropy();
    texture2.anisotropy = renderer.getMaxAnisotropy();
    texture3.anisotropy = renderer.getMaxAnisotropy();
    texture4.anisotropy = renderer.getMaxAnisotropy();
    texture5.anisotropy = renderer.getMaxAnisotropy();
    texture6.anisotropy = renderer.getMaxAnisotropy();

    var mat = new THREE.ShaderMaterial({
        uniforms: {
            effectFactor: {
                type: 'f',
                value: intensity,
            },
            dispFactor: {
                type: 'f',
                value: 0.0,
            },
            texture: {
                type: 't',
                value: texture1,
            },
            texture2: {
                type: 't',
                value: texture2,
            },
            texture3: {
                type: 't',
                value: texture3,
            },
            texture4: {
                type: 't',
                value: texture4,
            },
            texture5: {
                type: 't',
                value: texture5,
            },
            texture6: {
                type: 't',
                value: texture6,
            },
            disp: {
                type: 't',
                value: disp,
            },
        },

        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
    });

    var geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    var object = new THREE.Mesh(geometry, mat);
    scene.add(object);

    var slideFlg = 0;
    setInterval(function () {
        /* addEvents(); */
        if (!slideFlg) {
            slideFlg = 1;
            TweenMax.to(mat.uniforms.texture, 0, {
                value: texture1,
            });
            TweenMax.to(mat.uniforms.texture2, 0, {
                value: texture2,
            });
            TweenMax.to(mat.uniforms.dispFactor, speedIn, {
                value: 1,
                ease: easing,
            });
        } else if (slideFlg == 1) {
            slideFlg = 2;
            TweenMax.to(mat.uniforms.texture, 0, {
                value: texture3,
            });
            TweenMax.to(mat.uniforms.texture2, 0, {
                value: texture2,
            });
            TweenMax.to(mat.uniforms.dispFactor, speedOut, {
                value: 0,
                ease: easing,
            });
        } else if (slideFlg == 2) {
            slideFlg = 3;
            TweenMax.to(mat.uniforms.texture, 0, {
                value: texture3,
            });
            TweenMax.to(mat.uniforms.texture2, 0, {
                value: texture4,
            });
            TweenMax.to(mat.uniforms.dispFactor, speedIn, {
                value: 1,
                ease: easing,
            });
        } else if (slideFlg == 3) {
            slideFlg = 4;
            TweenMax.to(mat.uniforms.texture, 0, {
                value: texture5,
            });
            TweenMax.to(mat.uniforms.texture2, 0, {
                value: texture4,
            });
            TweenMax.to(mat.uniforms.dispFactor, speedOut, {
                value: 0,
                ease: easing,
            });
        } else if (slideFlg == 4) {
            slideFlg = 5;
            TweenMax.to(mat.uniforms.texture, 0, {
                value: texture5,
            });
            TweenMax.to(mat.uniforms.texture2, 0, {
                value: texture6,
            });
            TweenMax.to(mat.uniforms.dispFactor, speedIn, {
                value: 1,
                ease: easing,
            });
        } else {
            slideFlg = 0;
            TweenMax.to(mat.uniforms.texture, 0, {
                value: texture1,
            });
            TweenMax.to(mat.uniforms.texture2, 0, {
                value: texture6,
            });
            TweenMax.to(mat.uniforms.dispFactor, speedOut, {
                value: 0,
                ease: easing,
            });
        }
    }, 5000);

    window.addEventListener('resize', function (e) {
        if ($(window).width() <= 767) {
            /* SP */
            renderer.setSize(767, 767);
        } else {
            /* PC */
            var slideWbuf = parent.offsetWidth / 16;
            var slideHbuf = parent.offsetHeight / 9;

            if (slideHbuf < slideWbuf) {
                var slideWset = parent.offsetWidth;
                var slideHset = slideWbuf * 9;
            } else {
                var slideHset = parent.offsetHeight;
                var slideWset = slideHbuf * 16;
            }
            renderer.setSize(slideWset, slideHset);
        }
        /*renderer.setSize(parent.offsetWidth, parent.offsetHeight);*/
    });

    var animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
};
