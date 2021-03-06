import React from 'react';

export default class EditExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.expense.date,
            item: this.props.expense.item,
            category: this.props.expense.category,
            description: this.props.expense.description,
            cost: this.props.expense.cost
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value });
    }

    handleSubmit(event) {
        event.preventDefault()
        const expense = {
            ...this.props.expense,
            date: this.state.date,
            item: this.state.item,
            category: this.state.category,
            description: this.state.description,
            cost: this.state.cost
        }
        console.log(expense);
        this.props.handleSubmit(expense)
}

    render() {
        return (
            <div>
            <table className="table table-info">
              <tbody>
                <tr>
                  <th>Date</th>
                  <td>
                    <input type="date" id="date" name="date"  onChange={this.handleChange} value={this.state.date} placeholder={this.state.date} />
                  </td>
                </tr>
                <tr>
                  <th>Item</th>
                  <td>
                    <input type="text" id="item" name="item" required onChange={this.handleChange} value={this.state.item} placeholder={this.state.item} />
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
                      placeholder={this.state.category}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    <textarea
                      type="text-area"
                      id="description"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      placeholder={this.state.description}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th>Cost</th>
                  <td>
                    <input type="number" id="cost" name="cost" onChange={this.handleChange} value={this.state.cost} placeholder={this.state.cost} />
                  </td>
                </tr>
              </tbody>
            </table>
              <button className="btn btn-info btn-right" onClick={this.handleSubmit}>
                Update Expense
              </button>
              <button className="btn btn-info" onClick={this.props.handleCancel}>Cancel</button>
          </div>
        )
    }
}
