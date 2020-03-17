import React from "react";
import NewExpenses from "./components/NewExpenses.js";

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
      expenses: [
        {
          date: '2020-03-01',
          item: 'salary',
          category: 'income',
          cost: 3000,
          total: 3000
        }
      ]
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleAddExpense(expense) {
    if (!expense || !expense.item) {
      return;
    }
    const copyExpenses = [expense, ...this.state.expenses];
    this.setState({
      expenses: copyExpenses,
      date: "",
      item: "",
      category: "",
      cost: "",
      total: ""
    });
  }

  render() {
    return (
      <div className="container main-page">
        <h1>Expense Manager</h1>
        <div className="main-list">
          <table className="table table-info">
            <tbody className="table-warning">
              {this.state.expenses.map(expense => {
                return (
                  <tr key={expense.date}>
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
        </div>
        <NewExpenses handleAddExpense={this.handleAddExpense} baseURL={baseURL} />
      </div>
    );
  }
}

export default App;
