import React from 'react'
import { Line } from 'react-chartjs-2';

const PerChart = ({data,title}) => {
    let chart1_2_options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
        },
        responsive: true,
        scales: {
            yAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(29,140,248,0.0)",
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 60,
                        suggestedMax: 125,
                        padding: 20,
                        fontColor: "#9a9a9a",
                    },
                },
            ],
            xAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(29,140,248,0.1)",
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9a9a9a",
                    },
                },
            ],
        },
    };
    let chartExample1 = {

        data1: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

            return {
                labels: data.labels,
                datasets: [
                    {
                        label: `total_occupancy_${title}`,
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: data.values,
                    },
                ],
            };
        },
        options: chart1_2_options,
    };
    return (
        <Line
            data={chartExample1['data1']}
            options={chartExample1.options}
        />
    )
}

export default PerChart
