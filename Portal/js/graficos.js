async function loadgraph1() {
    let config = new Object();
    config.exportEnabled = false;
    config.animationEnabled = true;
    config.theme = "light2";
    config.subtitles = [{ text: "Click en la leyenda para ocultar o mostrar las barras" }];
    config.axisX = { title: "Sabores de Pasteles" }
    config.toolTip = { shared: false };
    config.legend = {
        cursor: "pointer",
        itemclick: toggleDataSeries
    };

    let response = await fetch("http://localhost:3000/graph/1", {
        method: "GET",
    });
    var values = await response.json();
    let result = [];

    for (let tamaño of Object.keys(values)) {
        let data = {};
        data.type = "column";
        data.name = tamaño + " Porciones";
        data.showInLegend = true;
        data.yValueFormatString = "#,##0.# Cotizaciones";
        data.dataPoints = [];

        for (let masa of Object.keys(values[tamaño])) {
            data.dataPoints.push({ label: masa, y: parseInt(values[tamaño][masa]) });
        }
        result.push(data);
    }

    config.data = result;

    var chart = new CanvasJS.Chart("chartContainer", config);
    chart.render();

}


async function loadgraph2() {
    var totalCotizaciones = 0;
    let response = await fetch("http://localhost:3000/graph/2", {
        method: "GET",
    });
    var values = await response.json();
    let dataPoints = [];
    for (let relleno of Object.keys(values)) {
        let elements = { y: values[relleno], name: relleno };
        dataPoints.push(elements);
        totalCotizaciones += values[relleno];
    }

    console.log(dataPoints);

    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light2",
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalCotizaciones * 100) + "%";
            }
        },
        data: [{

            explodeOnClick: true,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "New vs Returning Visitors",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: dataPoints
        }]
    };
    var chart = new CanvasJS.Chart("chartContainer1", newVSReturningVisitorsOptions);
    chart.render();
}


async function loadgraph3() {
    let meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciempre"]

    let response = await fetch("http://localhost:3000/graph/3", {
        method: "GET",
    });
    var values = await response.json();
    data = [];
    for(let year of Object.keys(values)){
        for(let month of Object.keys(values[year])){
            let element = {};
            element.label = year + " " + meses[month];
            element.y = parseInt(values[year][month]);
            data.push(element);
        }
    }


    var chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        axisY: {
            title: "Número de Cotizaciones"
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "spline",
            dataPoints: data
        }]
    });

    chart.render();
}

function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

document.addEventListener('DOMContentLoaded', function () {
    loadgraph1();
    loadgraph2();
    loadgraph3();
})