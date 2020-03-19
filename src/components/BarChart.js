import React, { Component } from 'react';
import Chart from 'chart.js'

let baseURL = process.env.REACT_APP_BASEURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}
  baseURL = "https://expense-manager-one-backend.herokuapp.com/expense"


class BarChart extends Component {

  componentDidMount () {
     this.getData()
  }
  getData() {
    fetch(baseURL +'/')
      .then(response => response.json())
      .then(jData => this.prepareData(jData))
      .then(data => this.createChart(data))
  }
  prepareData (data) {
    const chartData = {
        labels: [],
        datasets: [
            {
                label: 'Avg high expenses',
                data: []
            },
            {
              label: 'Avg low expenses',
              data:[]
            }
        ]
    }

    data.forEach(expense => {
        chartData.labels.push(expense.date)
        chartData.datasets[0].data.push(expense.cost)
    })
    return chartData
}
createChart (data) {
    const ctx = document.querySelector('#expenses')
    new Chart(ctx, {
        type: 'line',
        data: data,
    })
}


  render () {
    return (
      <>
        <h1>Expenses</h1>
        <canvas id="expenses" width="300" height="100"></canvas>
      </>
    )
  }
}

export default BarChart
