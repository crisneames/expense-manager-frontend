import React from "react";
import CurrencyFormat from "react-currency-format";
import NewExpenses from "./components/NewExpenses.js";
import ShowExpenses from "./components/ShowExpenses";

import "./App.css";

let baseURL = process.env.REACT_APP_BASEURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}

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
    this.showExpenses = this.showExpenses.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleAddExpense() {
    this.setState({
      addExpense: true
    });
  }

  handleExpenseAdded(expense) {
    this.setState({ addExpense: false });
    try {
      const newData = [expense, ...this.state.expenses];
      this.setState({
        expenses: newData,
        total: this.state.total + Number(expense.cost)
      });
    } catch (e) {
      console.error(e);
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
          <ShowExpenses expense={this.state.selectedExpense} handleBack={this.handleCancel} />
        ) : (
          <div>
            <div className="main-list">
              <table className="table table-warning">
                <thead class="thead-dark">
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
                              this.deleteExpense(expense._id);
                            }}
                          >
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
