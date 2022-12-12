$(function () {
    'use strict';
    var obj = {
        init: function () {
            this.topSlider();
            // this.initAnimate();
        },
        topSlider: function () {
            const prev_arrow = '<div class="slick-prev"></div>',
                next_arrow = '<div class="slick-next"></div>';
            $('.production_slide').slick({
                dots: true,
                infinite: true,
                speed: 800,
                autoplay: false,
                autoplaySpeed: 3000,
                arrows: true,
                fade: false,
                draggable: true,
                prevArrow: prev_arrow,
                nextArrow: next_arrow,
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true,
                cssEase: 'linear',
                centerMode: true,
            });
        },
        // initAnimate: function () {
        //     if ($('.wow').length > 0) {
        //         new WOW().init();
        //     }
        // },
    };
    obj.init();
});

function drawpie2() {
    let dataPie = [25.56, 13.53, 10.53, 9.77, 12.03, 5.26, 15.79, 7.52];
    let colors = [
        '#76B872',
        '#95BB00',
        '#F17C14',
        '#E0231A',
        '#DC000C',
        '#C1006D',
        '#BD0071',
        '#753E8C',
    ];

    let namepie = [
        '家族と過ごす',
        '映画・音楽鑑賞',
        'ゲーム',
        'スポーツ・筋トレ',
        '飲み会・飲酒',
        '買い物',
        '寝る',
        'その他',
    ];
    let trans = [
        {
            x: 30,
            y: -50,
        },
        {
            x: 40,
            y: 40,
        },
        {
            x: 10,
            y: 90,
        },
        {
            x: -140,
            y: 100,
        },
        {
            x: -150,
            y: 60,
        },
        {
            x: -120,
            y: 10,
        },
        {
            x: -100,
            y: -40,
        },
        {
            x: -80,
            y: -100,
        },
    ];

    let sizes = {
        innerRadius: 196 / 2 - 50, // set size of cicle small
        outerRadius: 196 / 2,
    };

    let durations = {
        entryAnimation: 2000,
    };
    d3.select('#pie2').html('');
    let generator = d3.pie().sort(null);

    let chart = generator(dataPie);

    let arcs = d3
        .select('#pie2')
        .append('g')
        .attr('class', 'group_path')
        .attr('transform', 'translate(150, 120)')
        .selectAll('path')
        .data(chart)
        .enter()
        .append('path')
        .style('fill', (d, i) => colors[i])
        .style('opacity', 0.24);
    d3.select('#pie2')
        .append('g')
        .attr('class', 'group_text')
        .attr('transform', 'translate(150, 120)')
        .selectAll('text')
        .data(namepie)
        .enter()
        .append('text')
        .attr('fill', '#4B4E61')
        .text((d, i) => d)
        .attr('transform', (d, i) => `translate(${trans[i].x}, ${trans[i].y})`)
        .style('opacity', 0)
        .transition()
        .delay(1000)
        .duration(1000)
        .styleTween('opacity', () => {
            return (t) => t;
        });

    let angleInterpolation = d3.interpolate(
        generator.startAngle()(),
        generator.endAngle()()
    );

    let innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
    let outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);
    let arc = d3.arc();
    arcs.transition()
        .duration(durations.entryAnimation)
        .attrTween('d', (d) => {
            let originalEnd = d.endAngle;
            return (t) => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return '';
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });

    d3.select('#pie2')
        .transition()
        .duration(durations.entryAnimation)
        .tween('arcRadii', () => {
            return (t) =>
                arc
                    .innerRadius(innerRadiusInterpolation(t))
                    .outerRadius(outerRadiusInterpolation(t));
        });

    //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
}

drawpie2();
