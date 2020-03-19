import React from "react";
import BarChart from './components/BarChart.js'
import CurrencyFormat from "react-currency-format";
import NewExpenses from "./components/newExpenses";
import ShowExpenses from "./components/showExpenses";
import EditExpenses from "./components/editExpenses";


import "./App.css";

let baseURL = process.env.REACT_APP_BASEURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}
  baseURL = "https://expense-manager-one-backend.herokuapp.com/expense"


// console.log("current base URL:", baseURL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      addExpense: false,
      showExpenses: false,
      expenses: []
    };


    this.handleExpenseAdded = this.handleExpenseAdded.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.showExpenses = this.showExpenses.bind(this);
  }

  componentDidMount () {
     this.getData()
  }
  getData() {
    fetch(baseURL +'/')
      .then(response => response.json())
      .then(jData => {
        this.setState({
          expenses: jData.sort((a,b) => Date.parse(a.date)- Date.parse(b.date))
        })
      })

  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleAddExpense() {
    this.setState({
      addExpense: true
    });
  }

  async handleExpenseAdded(expense) {
    this.setState({ addExpense: false });
    try {

      let response = await fetch(baseURL + "/", {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newExpense = await response.json();
      const newData = [newExpense, ...this.state.expenses];
      this.setState({
        expenses: newData.sort((a,b) => Date.parse(a.date)- Date.parse(b.date)),
        total: this.state.total + Number(expense.cost)
      });
    } catch (e) {
      console.error(e);
    }
  }
  async handleEditExpense(expense) {
      this.setState({ });
      try {
          let response = await fetch(baseURL + '/expense/' + expense._id, {
              method: 'PUT',
              body: JSON.stringify({expense}),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          let updatedExpense = await response.json()
          const foundExpense = this.state.expenses.findIndex(foundExpense)
      } catch(e){

      }
  }

  showExpenses(event, index) {
    event.preventDefault();
    const expense = this.state.expenses[index];
    this.setState({
      showExpenses: true,
      selectedExpense: expense
    });
  }

  async deleteExpense (id, i){
      alert('Noooooooo!')
     console.log('I made a delete request to here:', `${baseURL}/expense/${id}`)
     try{
     // let response = await fetch(baseURL + '/expense/' + id, {
     //     method: 'DELETE'
     // })
     // let data = await response.json()
     // console.log(data);
     const foundExpense = i
          // this.state.expenses.findIndex(expense =>
          // expense._id === id)
          const copyExpenses =
          [...this.state.expenses]
          copyExpenses.splice(foundExpense, 1)
          this.setState({expenses: copyExpenses})
     } catch(e){
         console.error(e);
     }
     }

  handleCancel() {
    this.setState({
      addExpense: false,
      editExpense: false,
      showExpenses: false,
      selectedExpense: null
    });
  }

  render() {
    return (
      <div className="container main-page">
        <h1>Expense Manager</h1>
        <BarChart expenses={this.state.expenses} />
        {this.state.addExpense ? (
          <NewExpenses handleExpenseAdded={this.handleExpenseAdded} data={this.state.data} handleCancel={this.handleCancel} />
        ) : this.state.showExpenses ? (
          <ShowExpenses expense={this.state.selectedExpense} handleBack={this.handleCancel} />
        ) : (
          <div>
            <div className="main-list">
              <table className="table table-warning">
                <thead className="thead-dark">
                  <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.expenses.sort((a,b) => Date.parse(a.date)- Date.parse(b.date)).map((expense, i) => {
                    const currentIndex = i;
                    return (
                      <tr>
                        <td>
                          <a href="#show" onClick={event => this.showExpenses(event, currentIndex)}>
                            {expense.date}
                          </a>
                        </td>
                        <td>{expense.item}</td>
                        <td>{expense.category}</td>
                        <td>
                          <CurrencyFormat displayType="text" thousandSeparator={true} prefix={"$"} value={expense.cost} />
                        </td>
                        <td className="text-right mb-3">
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              this.handleEditExpense();
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          </td>
                          <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                                console.log(i);
                              this.deleteExpense(expense._id, i);
                          }}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-warning font-weight-bolder">
                  <tr>
                    <td colSpan="3">Total Expenditure:</td>
                    <td>
                      <CurrencyFormat displayType="text" thousandSeparator={true} prefix={"$"} value={this.state.total} />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
              <button className="btn btn-info" onClick={this.handleAddExpense}>
                Add new expense
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
