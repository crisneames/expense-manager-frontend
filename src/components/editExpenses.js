import React from 'react';

export default class EditExpenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.currentExpenses.date,
            item: this.props.currentExpenses.item,
            category: this.props.currentExpenses.category,
            description: this.props.currentExpenses.description,
            cost: this.props.currentExpenses.cost
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.currentExpense.map(expense => {
            this.state.expenses.push(expense)
        })
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value });
    }

    handleSubmit(event) {
        event.preventDefault()
        const expense = {
            date: this.state.date,
            item: this.state.item,
            category: this.state.category,
            description: this.state.description,
            cost: this.state.cost
        }
}
        handleEditExpense(expense, id) {
            
            this.state.expenses = [...this.state.expenses]
                const expense = {
                      date: this.state.date,
                      item: this.state.item,
                      category: this.state.category,
                      description: this.state.description,
                      cost: this.state.cost
                  };
                  this.props.editExpense(expense) ;

              } catch(e){
                  console.error(e)
              }

    render() {
        const expense = this.props.expense;
        return (
            <div>
            <table className="table table-warning">
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
              <button className="btn btn-info btn-right" onClick={this.handleEditExpense}>
                Edit expense
              </button>
              <button className="btn btn-info" onClick={this.props.handleBack}>Cancel</button>
          </div>
        )
    }
}
