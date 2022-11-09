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
    $('input[type="checkbox"]').change(function () {
        let id = $(this).parents('.c_section').attr('id');
        num = $('#' + id).find('input:checked').length;
        if (num) {
            $('#' + id)
                .find(btn)
                .removeClass('disabled');
        } else {
            $('#' + id)
                .find(btn)
                .addClass('disabled');
        }
        //console.log($('#' + id).find('input:checked').length);
        switch (id) {
            case 'q_check01':
                p01 = num;
                break;
            case 'q_check02':
                p02 = num;
                break;
            case 'q_check03':
                p03 = num;
                break;
            case 'q_check04':
                p04 = num;
                break;
            case 'q_check05':
                p05 = num;
                break;
        }
    });
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
                scales: {
                    r: {
                        grid: {
                            color: '#000',
                            display: false,
                        },
                        // pointLabels: {
                        //     color: 'red',
                        // },
                        angleLines: {
                            color: '#000',
                            display: false,
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#000',
                            backdropColor: '#8fdbff', //background of number
                        },
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

    const result_info = '.result_info';
    (async () => {
        let workbook = XLSX.read(
            await (await fetch('./assets/excel/test.xlsx')).arrayBuffer()
        );
        let worksheet = workbook.SheetNames;
        worksheet.forEach((name) => {
            let html = XLSX.utils.sheet_to_html(workbook.Sheets[name]);
            $(result_info).html(html);
        });
        console.log(workbook);
    })();
});
