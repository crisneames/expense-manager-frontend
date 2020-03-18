import React from "react";

class ShowExpenses extends React.Component {
  render() {
    const expense = this.props.expense;
    return (
      <div>
        <h1>Expense: {expense.item}</h1>
        <table className="table table-warning">
          <tbody>
            <tr>
              <th>Date</th>
              <td>{expense.date}</td>
            </tr>
            <tr>
              <th>Item</th>
              <td>{expense.item}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{expense.category}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{expense.description}</td>
            </tr>
            <tr>
              <th>Cost</th>
              <td>{expense.cost}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{expense.total}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-info" onClick={this.props.handleBack}>
          Cancel
        </button>
      </div>
    );
  }
}

export default ShowExpenses;
