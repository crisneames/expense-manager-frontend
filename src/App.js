import React from "react";
import CurrencyFormat from "react-currency-format";
import NewExpenses from "./components/newExpenses";
import ShowExpenses from "./components/showExpenses";
import EditExpenses from "./components/editExpenses";

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
      editExpense: false,
      expenses: []
    };


    this.handleExpenseAdded = this.handleExpenseAdded.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
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

  async handleEditSubmit(expense) {
      this.setState({
          foundExpense: expense
       });
      try {
          let response = await fetch(`${baseURL}/expense/${bookmark._id}`, {
        body: JSON.stringify(bookmark),
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
          // const updatedData = [...this.state.expenses];
          //   // const foundExpense =
          //   //   this.state.expenses.findIndex(expense =>
          //   //   expense._id === id)
              const copyExpenses =
               [...this.state.expenses]
               copyExpenses[foundExpense] = updatedData
               console.log(updatedData)
               this.setState(expense)
        }catch(e){
            console.error(e)
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

  editExpense(event, index) {
      event.preventDefault();
      const expense = this.state.expenses[index];
      this.setState({
          editExpense: true,
          selectedExpense: expense
      })
  }

  async deleteExpense (id, i){
      alert('Noooooooo!')
     console.log('I made a delete request to here:', `${baseURL}/expense/${id}`)
     try{
     // let response = await fetch(baseURL + '/expense/' + id, {
     //     method: 'DELETE'
     // })
     // let data = await response.json()
     // console.log(data);
     const foundExpense = i
          // this.state.expenses.findIndex(expense =>
          // expense._id === id)
          const copyExpenses =
          [...this.state.expenses]
          copyExpenses.splice(foundExpense, 1)
          this.setState({expenses: copyExpenses})
     } catch(e){
         console.error(e);
     }
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
      ) : this.state.editExpenses ? (
          <EditExpenses expense={this.state.selectedExpense} handleCancel={this.handleCancel} handleSubmit={this.handleEditExpense} />
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
                            onClick={event =>
                              this.handleEditExpense(event, currentIndex)
                            }
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          </td>
                          <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                                console.log(i);
                              this.deleteExpense(expense._id, i);
                          }}>
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
