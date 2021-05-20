import React from "react";
import Chart from "chart.js/auto";

class BarChart extends React.PureComponent {
    componentDidMount() {
        const DATA = {...this.props.data};
        if(DATA.Unknown) delete DATA.Unknown;
        var ctx = document.getElementById("b_chart");
        let labels = [], datasets = [];
        switch(this.props.page) {
            case "home": {
                labels = Object.keys(DATA).map(key => DATA[key].statename);
                datasets = [{
                    label: "Active",
                    data: Object.keys(DATA).map(key => DATA[key].activeState),
                    backgroundColor: "rgba(0, 0, 255, 0.8)"
                },
                {
                    label: "Recovered",
                    data: Object.keys(DATA).map(key => DATA[key].recoveredState),
                    backgroundColor: "rgba(0, 150, 0, 0.8)"
                },
                {
                    label: "Deaths",
                    data: Object.keys(DATA).map(key => DATA[key].deceasedState),
                    backgroundColor: "rgba(225, 0, 0, 0.8)"
                }];
                break;
            }

            case "state": {
                labels = Object.keys(DATA);
                datasets = [{
                    label: "Active",
                    data: Object.keys(DATA).map(key => DATA[key].active),
                    backgroundColor: "rgba(0, 0, 255, 0.8)"
                },
                {
                    label: "Recovered",
                    data: Object.keys(DATA).map(key => DATA[key].recovered),
                    backgroundColor: "rgba(0, 150, 0, 0.8)"
                },
                {
                    label: "Deaths",
                    data: Object.keys(DATA).map(key => DATA[key].deceased),
                    backgroundColor: "rgba(225, 0, 0, 0.8)"
                }];
                break;
            }
        }
        var chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: datasets
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
            <canvas id="b_chart" width="500" height="500"></canvas>
        )
    }
}

export default BarChart;