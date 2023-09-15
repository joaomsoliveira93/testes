let xhr3 = new XMLHttpRequest();
xhr3.responseType = "json";
xhr3.onload = function() {
    if (xhr3.status != 200) {
        window.alert("Error " + xhr3.status + ": " + xhr3.statusText);
    } else {
        //debugger;
        var totalCat = [];
        var nomCate = [];
        for (var inves in xhr3.response) {
            totalCat.push(xhr3.response[inves]["totalDesp"]);
            nomCate.push(xhr3.response[inves]["catName"]);
        }
        if (totalCat.length == 0 || nomCate.length == 0) {
            document.getElementById('despcategorias').innerHTML = 'Sem dados para Apresentar!';
        } else {
            var options = {
                series: totalCat,
                labels: nomCate,
                chart: {
                    foreColor: '#FFFFFF',
                    width: "100%",
                    type: 'donut',
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                    return opts.w.config.series[opts.seriesIndex] + "€"
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: "100%"
                        },
                        legend: {
                            show: false
                        }
                    }
                }],
                legend: {
                    position: 'bottom',
                },
            };

            var chart = new ApexCharts(document.querySelector("#despcategorias"), options);
            chart.render();
        }
    }
};

xhr3.open("GET", "/category/getdatadespcategory", true);
xhr3.send();