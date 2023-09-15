let xhr1 = new XMLHttpRequest();
xhr1.responseType = "json";
xhr1.onload = function () {
    if (xhr1.status != 200) {
        window.alert("Error " + xhr1.status + ": " + xhr1.statusText);
    } else {
        //debugger;
        var valEx = [];
        var nomEx = [];
        for (var exp in xhr1.response) {
            valEx.push(xhr1.response[exp]["monExpense"]);
            nomEx.push(xhr1.response[exp]["titExpense"]);
        }
        if (valEx.length == 0 || nomEx.length == 0) {
            document.getElementById('pagamentos').innerHTML = '<p class="m-20">Sem dados para Apresentar!</p>';
        } else {
            var options = {
                series: [{
                    data: valEx
                }],
                chart: {
                    foreColor: '#FFFFFF',
                    type: 'bar',
                    height: '100%'
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                    return val + "€"
                    }
                },
                xaxis: {
                    categories: nomEx,
                }
            };
            var chart = new ApexCharts(document.querySelector("#pagamentos"), options);
            chart.render();
        }
    }
};

xhr1.open("GET", "/expense/getdataexpense", true);
xhr1.send();
