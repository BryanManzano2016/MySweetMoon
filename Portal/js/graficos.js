
window.onload = function () {

    //GRAFICO BARRAS SABORES VS TAMAÑOS DE TORTAS
    let config = new Object();
    config.exportEnabled = false;
    config.animationEnabled = true;
    config.theme = "light2";
    config.subtitles = [{text: "Click en la leyenda para ocultar o mostrar las barras"}];
    config.axisX = {title: "Sabores de Pasteles"}
    config.toolTip= {shared: false};
    config.legend= {
        cursor: "pointer",
        itemclick: toggleDataSeries
    };
    config.data = [{
        type: "column",
        name: "20 Porciones",
        showInLegend: true,      
        yValueFormatString: "#,##0.# Cotizaciones",
        dataPoints: [
            { label: "Chocolate",  y: 10 },
            { label: "Naranja", y: 2 },
            { label: "Vainilla", y: 5 },
            { label: "Amaretto",  y: 1 }
        ]
    },
    {
        type: "column",
        name: "10 porciones",
        showInLegend: true,
        yValueFormatString: "#,##0.# Cotizaciones",
        dataPoints: [
            { label: "Chocolate",  y: 15 },
            { label: "Naranja", y: 5 },
            { label: "Vainilla", y: 10 },
            { label: "Amaretto",  y: 4 }
        ]
    },
    {
        type: "column",
        name: "15 porciones",
        showInLegend: true,
        yValueFormatString: "#,##0.# Cotizaciones",
        dataPoints: [
            { label: "Chocolate",  y: 20 },
            { label: "Naranja", y: 6 },
            { label: "Vainilla", y: 8 },
            { label: "Amaretto",  y: 5 }
        ]
    }];

    console.log(config);
    var chart = new CanvasJS.Chart("chartContainer", config);
    chart.render();
    
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }


    //GAFRICO PORCENTAJE DE TIPO DE RELLENO DE TORTA

    var totalCotizaciones = 91;
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
            dataPoints: [
                { y: 44, name: "Manjar", color: "#DF7970" }, 
                { y: 28, name: "Mermelada", color: "#546BC1" },
                { y: 19, name: "Brigadeiro", color: "#52CD9F" }
            ]
        }]
    };
    
    var chart = new CanvasJS.Chart("chartContainer1", newVSReturningVisitorsOptions);
    chart.render();
    
    }