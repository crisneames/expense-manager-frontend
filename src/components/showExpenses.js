<<<<<<< HEAD

=======
import React from "react";

class ShowExpenses extends React.Component {
  render() {
    const expense = this.props.expense;
    return (
      <div>
        <table className="table table-warning">
          <thead className="thead-dark">
          <tr>
            <th>{expense.item}</th>
            <th></th>
          </tr>
          </thead>
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
          </tbody>
        </table>
        <button className="btn btn-info" onClick={this.props.handleBack}>Cancel</button>
        <button className="btn btn-danger pull-right" onClick={() => {this.DeleteExpense(expense._id)}}>Delete</button>
        <button className="btn btn-info pull-right" onClick={() => {this.EditExpense(expense._id)}}>Edit</button>
      </div>
    );
  }
}

export default ShowExpenses;
>>>>>>> d479ebcb87658bc9c5cac13490084b1fc2e30b03
