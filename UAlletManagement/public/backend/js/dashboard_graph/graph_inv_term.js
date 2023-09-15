let xhr5 = new XMLHttpRequest();
xhr5.responseType = "json";
xhr5.onload = function () {
    if (xhr5.status != 200) {
        window.alert("Error " + xhr5.status + ": " + xhr5.statusText);
    } else {

        //debugger;
        var invs = [];
        var finals = [];
        var nomes = [];
        for (var inves in xhr5.response) {
            invs.push(xhr5.response[inves]["Inicial"]);

            if (xhr5.response[inves]["Final"] == null) {
                finals.push(0);
            } else {
                finals.push(xhr5.response[inves]["Final"]);
            }
            nomes.push(xhr5.response[inves]["Nome"]);
        }

        if (invs.length == 0 || finals.length == 0 || nomes.length == 0) {
            document.getElementById('inv_term').innerHTML = '<p class="m-20">Sem dados para Apresentar!</p>';
        } else {
            var options = {
                series: [{
                    name: 'Inicial',
                    data: invs
                }, {
                    name: 'Final',
                    data: finals
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
                    categories: nomes,

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
            var chart = new ApexCharts(document.querySelector("#inv_term"), options);
            chart.render();
        }
    }
};

xhr5.open("GET", "/investment/getdatainvestall", true);
xhr5.send();
