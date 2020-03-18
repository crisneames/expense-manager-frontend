import React from "react";

class NewExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const expense = {
      date: this.state.date,
      item: this.state.item,
      category: this.state.category,
      description: this.state.description,
      cost: this.state.cost,
      total: this.state.total
    };
    console.log(expense);
    this.setState({
      date: "",
      item: "",
      category: "",
      description: "",
      cost: "",
      total: ""
    });
    this.props.handleExpenseAdded(expense);
  }

  render() {
    return (
      <div>
        <table className="table table-warning">
          <tbody>
            <tr>
              <th>Date</th>
              <td>
                <input type="date" id="date" name="date" onChange={this.handleChange} value={this.state.date} placeholder="Add Date" />
              </td>
            </tr>
            <tr>
              <th>Item</th>
              <td>
                <input type="text" id="item" name="item" onChange={this.handleChange} value={this.state.item} placeholder="Add Item" />
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>
                <input
                  type="text"
                  id="category"
                  name="category"
                  onChange={this.handleChange}
                  value={this.state.category}
                  placeholder="Add Category"
                />
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <input
                  type="text"
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                  placeholder="Add Description"
                />
              </td>
            </tr>
            <tr>
              <th>Cost</th>
              <td>
                <input type="number" id="cost" name="cost" onChange={this.handleChange} value={this.state.cost} placeholder="Add Cost" />
              </td>
            </tr>
            <tr>
              <td>
              <button className="btn btn-info btn-right" onClick={this.handleSubmit}>
                Add new expense
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default NewExpenses;
