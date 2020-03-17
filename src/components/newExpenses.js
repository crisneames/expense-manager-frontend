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

  handleAddExpense(event) {
    event.preventDefault();
    this.state.item = [...this.state.item, ...this.state.otherItems];
    const profile = {
      date: this.state.date,
      item: this.state.item,
      category: this.state.category,
      description: this.state.description,
      cost: this.state.cost,
      total: this.state.total
    };
    console.log(profile);
    this.props.handleAddExpense(event);
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch(this.props.baseURL + "/expenses", {
        body: JSON.stringify({ title: this.state.date, url: this.state.item }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data = await response.json();
      this.props.handleAddExpense(data);
      this.setState({
        date: "",
        item: "",
        category: "",
        description: "",
        cost: "",
        total: ""
      });
    } catch (e) {
      console.error({ Error: e });
    }
  }

  render() {
    return (
      <div>
        <table className="table table-info">
          <tbody>
            <tr>
              <th>Date</th>
              <td><input type="date" id="date" name="date" onChange={this.handleChange} value={this.state.date} placeholder="Add Date" /></td>
            </tr>
            <tr>
              <th>Item</th>
              <td><input type="text" id="item" name="item" onChange={this.handleChange} value={this.state.item} placeholder="Add Item" /></td>
            </tr>
            <tr>
              <th>Category</th>
              <td><input type="text" id="category" name="category" onChange={this.handleChange} value={this.state.category} placeholder="Add Category" /></td>
            </tr>
            <tr>
              <th>Description</th>
              <td><input type="text"id="description"name="description" onChange={this.handleChange} value={this.state.description} placeholder="Add Description"/></td>
            </tr>
            <tr>
              <th>Cost</th>
              <td><input type="number" id="cost" name="cost" onChange={this.handleChange} value={this.state.cost} placeholder="Add Cost" /></td>
            </tr>
            <tr>
              <td>
              <input className="btn btn-danger add-button" type="submit" value="Add" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default NewExpenses;
