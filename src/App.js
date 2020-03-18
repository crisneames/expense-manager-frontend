import React from "react";
import NewExpenses from "./components/NewExpenses.js";
import ShowExpenses from "./components/ShowExpenses";

import "./App.css";
let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}

console.log("current base URL:", baseURL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addExpense: false,
      showExpenses: false,
      expenses: []
    };

    this.handleExpenseAdded = this.handleExpenseAdded.bind(this);
    this.handlehandleCancel = this.handleCancel.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleShowExpenses = this.handleShowExpenses.bind(this);
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
      // let response = await fetch(baseURL + "/expense-manager-frontend-app", {
      //   body: JSON.stringify(expense),
      //   headers: {
      //     "Content-Type": "application/json"q
      //   }
      // });
      // let newData = await response.json();
      const newData= [expense, ...this.state.expenses];
      this.setState({ expenses: newData });
    } catch (e) {
      console.error(e);
    }
  }

  handleShowExpenses(index) {
    const expense = this.state.expense[index];
    this.setState({
      showExpenses: true,
      selectedExpense: expense
    });
  }

  showExpenses(event, index) {
    event.preventDefault();
    this.props.handleShowExpenses(index);
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
        {this.state.addExpense ? (
          <NewExpenses handleExpenseAdded={this.handleExpenseAdded} data={this.state.data} handleCancel={this.handleCancel} />
        ) : this.state.showExpenses ? (
          <ShowExpenses expense={this.state.selectedExpense} handleBack={this.handleBack} />
        ) : (
          <div>
            <div className="main-list">
              <table className="table table-warning">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Item</td>
                    <td>Category</td>
                    <td>cost</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody className="table-warning">
                  {this.state.expenses.map(expense => {
                    return (
                      <tr>
                        <td>{expense.date}</td>
                        <td>
                          <a href={expense.item}>{expense.item}</a>
                        </td>
                        <td>{expense.category}</td>
                        <td>{expense.cost}</td>
                        <td>{expense.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
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
