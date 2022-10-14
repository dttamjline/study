$(function(){
    "use strict";
    var ojbect= {
        init: function(){
            this.slider();
        },
        slider: function () {
            Array.from(document.querySelectorAll('.top_slide__img')).forEach((el) => {
            	const imgs = Array.from(el.querySelectorAll('img'));
            	new hoverEffect({
            		parent: el,
            		intensity: el.dataset.intensity || undefined,
            		speedIn: el.dataset.speedin || undefined,
            		speedOut: el.dataset.speedout || undefined,
            		easing: el.dataset.easing || undefined,
            		hover: el.dataset.hover || undefined,
            		image1: imgs[0].getAttribute('src'),
            		image2: imgs[1].getAttribute('src'),
                    image3: imgs[2].getAttribute('src'),
                    image4: imgs[3].getAttribute('src'),
            		image5: imgs[4].getAttribute('src'),
            		image6: imgs[5].getAttribute('src'),
            		displacementImage: el.dataset.displacement
            	});
            });
        },
       
    };
    ojbect.init();
});