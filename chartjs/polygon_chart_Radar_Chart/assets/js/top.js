$(function () {
    'use strict';
    //Click switch page
    const btn = '.c_btn__link';
    let href = '';
    $(btn).click(function () {
        href = $(this).attr('href');
        $('.c_section').removeClass('show');
        $(href).addClass('show');
    });

    //Get sum selection
    let p01 = '',
        p02 = '',
        p03 = '',
        p04 = '',
        p05 = '',
        num = 0;

    window.onload = function () {
        /*from www  . j  a  v a2 s.c  om*/
        var radarOptions = {
            scaleLineWidth: 16,
            scaleLineColor: '#EEEEEE',
        };
    };
    $('.c_btn__result').on('click', function () {
        const data = {
            labels: [
                '水タイプ',
                '金タイプ',
                '木タイプ',
                '火タイプ',
                '土タイプ',
            ],
            datasets: [
                {
                    label: 'ttt',
                    data: [
                        parseInt(p01),
                        parseInt(p02),
                        parseInt(p03),
                        parseInt(p04),
                        parseInt(p05),
                    ],
                    fill: true,

                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                },
            ],
        };

        const config = {
            type: 'radar',
            data: data,

            options: {
                scale: {
                    min: 0,
                    max: 10,
                },
                scales: {
                    r: {
                        grid: {
                            color: '#000',
                            display: true,
                        },

                        // pointLabels: {
                        //     color: 'red',
                        // },
                        angleLines: {
                            color: '#000',
                            display: true,
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#000',
                            backdropColor: '#8fdbff', //background of number
                        },
                        scaleLineColor: '#EEEEEE',
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: 'rgb(255, 99, 132)',
                        },
                    },
                },
            },
        };
        const myChart = new Chart(document.getElementById('myChart'), config);
    });
    //Read excel file

    const result_info = '.result__info';
    (async () => {
        let workbook = XLSX.read(
            await (await fetch('./assets/excel/test.xlsx')).arrayBuffer()
        );
        let worksheet = workbook.SheetNames;
        worksheet.forEach((name) => {
            let html = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
            console.log(html);
            let template = '<div>';
            html.map(function (item, index) {
                return (template += `<p>${item.Content}</p>`);
                // console.log(item);
            });
            template += '</div>';
            $(result_info).html(template);
        });
        // console.log(workbook);
    })();
});
