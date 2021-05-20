import React from "react";
import Chart from "chart.js/auto";

class DoughnutChart extends React.PureComponent {
    componentDidMount() {
        var ctx = document.getElementById("d_chart");
        var chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Active", "Recovered", "Deaths"],
                datasets: [{
                    label: `Total cases in ${this.props.state}`,
                    data: [this.props.active, this.props.recovered, this.props.deceased],
                    backgroundColor: [
                        "rgba(0, 0, 255, 0.8)",
                        "rgba(0, 150, 0, 0.8)",
                        "rgba(225, 0, 0, 0.8)"
                    ]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }

    render() {
        return(
            <canvas id="d_chart"></canvas>
        )
    }
}

export default DoughnutChart;