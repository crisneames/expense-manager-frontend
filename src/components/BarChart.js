import React, { Component } from "react";
import Chart from "chart.js";

class BarChart extends Component {
  componentDidMount() {
    if (this.props.expenses && this.props.expenses.length) {
      this.getData();
    }
  }

  componentDidUpdate() {
    this.getData();
  }

  getData() {
    const chartData = this.prepareData(this.props.expenses);
    this.createChart(chartData);
  }

  prepareData(data) {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Avg high expenses",
          data: []
        },
        {
          label: "Avg low expenses",
          data: []
        }
      ]
    };
    data = data || [];
    data.forEach(expense => {
      chartData.labels.push(expense.date);
      chartData.datasets[0].data.push(expense.cost);
    });

    return chartData;
  }

  createChart(data) {
    const canvas = document.querySelector("#expenses");
    const context = canvas.getContext('2d');
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    new Chart(canvas, {
      type: "line",
      data: data
    });
  }

  render() {
    return (
      <div className="bg-light font-weight-bolder">
        <canvas id="expenses" width="300" height="100"></canvas>
      </div>
    );
  }
}

export default BarChart;
