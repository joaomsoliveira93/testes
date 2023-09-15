let xhr2 = new XMLHttpRequest();
xhr2.responseType = "json";
xhr2.onload = function() {
    if (xhr2.status != 200) {
        window.alert("Error " + xhr2.status + ": " + xhr2.statusText);
    } else {
        //debugger;
        var totalCat = [];
        var nomCate = [];
        for (var inves in xhr2.response) {
            totalCat.push(xhr2.response[inves]["totalInv"]);
            nomCate.push(xhr2.response[inves]["catName"]);
        }
        if (totalCat.length == 0 || nomCate.length == 0) {
            document.getElementById('invcategorias').innerHTML = 'Sem dados para Apresentar!';
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

            var chart = new ApexCharts(document.querySelector("#invcategorias"), options);
            chart.render();
        }
    }
};

xhr2.open("GET", "/category/getdatainvcategory", true);
xhr2.send();