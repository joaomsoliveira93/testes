let xhr4 = new XMLHttpRequest();
xhr4.responseType = "json";
xhr4.onload = function() {
    if (xhr4.status != 200) {
        window.alert("Error " + xhr4.status + ": " + xhr4.statusText);
    } else {
        //debugger;
        var totalCate = [];
        var nomeCate = [];
        for (var inves in xhr4.response){
            totalCate.push(xhr4.response[inves]["totalCate"]);
            nomeCate.push(xhr4.response[inves]["catName"]);
        }
        if(totalCate.length==0 || nomeCate.length==0){
            document.getElementById('reccategorias').innerHTML='Sem dados para Apresentar!';
        }else{     
            var options = {
                series: totalCate,
                labels: nomeCate,
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
            
            var chart = new ApexCharts(document.querySelector("#reccategorias"), options);
            chart.render();
        }
        
    }
};

xhr4.open("GET", "/category/getdatarevenue", true);
xhr4.send();