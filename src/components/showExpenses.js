import React from "react";

class ShowExpenses extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <div>
        <h1>Expense: {expense.item}</h1>
        <table className="table table-info">
          <tbody>
            <tr>
              <th>Date</th>
              <td>{this.state.date}</td>
            </tr>
            <tr>
              <th>Item</th>
              <td>{this.state.item}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{this.state.category}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{this.state.description}</td>
            </tr>
            <tr>
              <th>Cost</th>
              <td>{this.state.cost}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{this.state.total}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-warning" onClick={this.props.handleBack}>
          Cancel
        </button>
      </div>
    );
  }
}

export default ShowExpenses;
