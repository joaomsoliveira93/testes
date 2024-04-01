let xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.onload = function () {
    if (xhr.status != 200) {
        window.alert("Error " + xhr.status + ": " + xhr.statusText);
    } else {
        //debugger;
        var valCatini = [];
        var valCatfin = [];
        var nomCat = [];
        for (var inves in xhr.response) {
            if (xhr.response[inves]["totalInicial"] == null) {
                valCatini.push(0);
            } else {
                valCatini.push(xhr.response[inves]["totalInicial"]);
            }
            if (xhr.response[inves]["totalFinal"] == null) {
                valCatfin.push(0);
            } else {
                valCatfin.push(xhr.response[inves]["totalFinal"]);
            }
            nomCat.push(xhr.response[inves]["catName"]);
        }
        if (valCatini.length == 0 || valCatfin.length == 0 || nomCat.length == 0) {
            document.getElementById('investimentos').innerHTML = '<p class="m-20">Sem dados para Apresentar!</p>';
        } else {
            var options = {
                series: [{
                    name: 'Inicial',
                    data: valCatini
                }, {
                    name: 'Final',
                    data: valCatfin
                }],
                chart: {
                    type: 'bar',
                    foreColor: "#bac0c7",
                    height: '100%',
                    toolbar: {
                        show: true,
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '25%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val + "€"
                  }
                },
                grid: {
                    show: true,
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['transparent']
                },
                colors: ['#00870e', '#ff6600'],
                xaxis: {
                    categories: nomCat,
    
                },
                yaxis: {
    
                },
                legend: {
                    show: false,
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "€"
                        }
                    },
                    marker: {
                        show: false,
                    },
                }
            };
            var chart = new ApexCharts(document.querySelector("#investimentos"), options);
            chart.render();
        }
    }
};

xhr.open("GET", "/mywallet/investment/getdatainvest", true);
xhr.send();
