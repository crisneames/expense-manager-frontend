
import React from "react";

class ShowExpenses extends React.Component {
  render() {
    const expense = this.props.expense;
    return (
      <div>
        <table className="table table-info">
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
        <button className="btn btn-danger pull-right" onClick={(event) => {event.preventDefault(); this.props.handleDelete(expense)}}>Delete</button>
        <button className="btn btn-info pull-right" onClick={(event) =>
            { event.preventDefault(); this.props.handleEdit()}}>Edit</button>
      </div>
    );
  }
}

export default ShowExpenses;
